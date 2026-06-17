"use server"

import "server-only"

import { revalidatePath } from "next/cache"
import { createClient } from "@/db/supabase/server"

import { runContentMachineImport } from "@/lib/content-machine/import"

type ReviewStatus = "new" | "reviewed" | "promoted" | "rejected"

async function requireAdmin() {
  const db = await createClient()
  const { data: authData } = await db.auth.getClaims()

  if (!authData?.claims?.app_metadata?.claims_admin) {
    throw new Error("Unauthorized")
  }

  return {
    db,
    userId: authData.claims.sub,
  }
}

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : ""
}

function asTags(value: FormDataEntryValue | null) {
  return asText(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function listContentMachineItems() {
  const { db } = await requireAdmin()
  const client = db as any

  const [sourceItems, watchItems, briefs, workflows] = await Promise.all([
    client
      .from("source_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25),
    client
      .from("watch_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25),
    client
      .from("briefs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25),
    client
      .from("workflows")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25),
  ])

  for (const result of [sourceItems, watchItems, briefs, workflows]) {
    if (result.error) {
      throw new Error(result.error.message)
    }
  }

  return {
    sourceItems: sourceItems.data ?? [],
    watchItems: watchItems.data ?? [],
    briefs: briefs.data ?? [],
    workflows: workflows.data ?? [],
  }
}

export async function reviewWatchItem(formData: FormData) {
  const id = asText(formData.get("id"))
  const status = asText(formData.get("status")) as ReviewStatus
  const reviewNotes = asText(formData.get("review_notes"))

  if (!id || !["new", "reviewed", "promoted", "rejected"].includes(status)) {
    throw new Error("Invalid review request")
  }

  const { db, userId } = await requireAdmin()
  const { error } = await (db as any)
    .from("watch_items")
    .update({
      status,
      review_notes: reviewNotes || null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId,
    })
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/watch")
}

export async function promoteSourceItemToWatch(formData: FormData) {
  const id = asText(formData.get("id"))

  if (!id) {
    throw new Error("Source item ID is required")
  }

  const { db, userId } = await requireAdmin()
  const client = db as any
  const { data: sourceItem, error: sourceItemError } = await client
    .from("source_items")
    .select("*")
    .eq("id", id)
    .single()

  if (sourceItemError || !sourceItem) {
    throw new Error(sourceItemError?.message || "Source item not found")
  }

  const metadata = sourceItem.metadata ?? {}
  const githubFullName =
    typeof metadata.github_full_name === "string"
      ? metadata.github_full_name
      : null
  const [repoOwner, repoName] = githubFullName?.includes("/")
    ? githubFullName.split("/", 2)
    : [null, null]

  const { error: watchError } = await client.from("watch_items").upsert(
    {
      source_item_id: sourceItem.id,
      source: sourceItem.source_name || "source-item",
      source_url: sourceItem.canonical_url || sourceItem.source_url,
      title: sourceItem.title,
      description:
        typeof metadata.github_description === "string"
          ? metadata.github_description
          : sourceItem.summary_for_internal_use,
      repo_owner: repoOwner,
      repo_name: repoName,
      language:
        typeof metadata.language === "string" ? metadata.language : null,
      stars:
        typeof metadata.github_stargazers_count === "number"
          ? metadata.github_stargazers_count
          : null,
      trend_score:
        typeof metadata.github_stargazers_count === "number"
          ? Math.min(metadata.github_stargazers_count, 100000)
          : 0,
      authority_score:
        typeof metadata.github_forks_count === "number"
          ? Math.min(metadata.github_forks_count * 2, 100000)
          : 0,
      ecosystem: sourceItem.source_name || null,
      tags: sourceItem.extracted_topics ?? [],
      status: "reviewed",
      metadata,
      provenance: {
        promoted_from: "source_items",
        source_item_id: sourceItem.id,
      },
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId,
      review_notes: "Promoted from source intelligence queue.",
    },
    { onConflict: "source_url" }
  )

  if (watchError) {
    throw new Error(watchError.message)
  }

  const { error: sourceError } = await client
    .from("source_items")
    .update({
      status: "promoted",
      promoted_at: new Date().toISOString(),
      promoted_by: userId,
    })
    .eq("id", id)

  if (sourceError) {
    throw new Error(sourceError.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/watch")
}

export async function createWatchItem(formData: FormData) {
  const title = asText(formData.get("title"))
  const sourceUrl = asText(formData.get("source_url"))

  if (!title || !sourceUrl) {
    throw new Error("Title and source URL are required")
  }

  const { db } = await requireAdmin()
  const { error } = await (db as any).from("watch_items").insert({
    title,
    source_url: sourceUrl,
    source: asText(formData.get("source")) || "manual",
    description: asText(formData.get("description")) || null,
    ecosystem: asText(formData.get("ecosystem")) || null,
    language: asText(formData.get("language")) || null,
    tags: asTags(formData.get("tags")),
    status: "reviewed",
    provenance: {
      adapter: "manual-admin",
      stored: "metadata_and_links_only",
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/watch")
}

export async function promoteWatchItemToWorkflow(formData: FormData) {
  const id = asText(formData.get("id"))

  if (!id) {
    throw new Error("Watch item ID is required")
  }

  const { db, userId } = await requireAdmin()
  const client = db as any
  const { data: item, error: itemError } = await client
    .from("watch_items")
    .select("*")
    .eq("id", id)
    .single()

  if (itemError || !item) {
    throw new Error(itemError?.message || "Watch item not found")
  }

  const slug = slugify(item.title)
  const { data: workflow, error: workflowError } = await client
    .from("workflows")
    .upsert(
      {
        slug,
        title: item.title,
        summary: item.description,
        status: "draft",
        source_watch_item_id: item.id,
        tags: item.tags ?? [],
        provenance: {
          promoted_from: "watch_items",
          watch_item_id: item.id,
        },
        reviewed_at: new Date().toISOString(),
        reviewed_by: userId,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single()

  if (workflowError) {
    throw new Error(workflowError.message)
  }

  const { error: watchError } = await client
    .from("watch_items")
    .update({
      status: "promoted",
      workflow_id: workflow?.id ?? null,
      promoted_at: new Date().toISOString(),
      promoted_by: userId,
    })
    .eq("id", id)

  if (watchError) {
    throw new Error(watchError.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/watch")
  revalidatePath("/workflows")
}

export async function createBrief(formData: FormData) {
  const title = asText(formData.get("title"))
  const slug = slugify(asText(formData.get("slug")) || title)

  if (!title || !slug) {
    throw new Error("Title is required")
  }

  const { db } = await requireAdmin()
  const { error } = await (db as any).from("briefs").insert({
    slug,
    title,
    subtitle: asText(formData.get("subtitle")) || null,
    summary: asText(formData.get("summary")) || null,
    body: asText(formData.get("body")) || null,
    status: "draft",
    provenance: {
      created_from: "admin-content-machine",
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/briefs")
}

export async function publishBrief(formData: FormData) {
  const id = asText(formData.get("id"))

  if (!id) {
    throw new Error("Brief ID is required")
  }

  const { db } = await requireAdmin()
  const { error } = await (db as any)
    .from("briefs")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/briefs")
}

export async function createWorkflow(formData: FormData) {
  const title = asText(formData.get("title"))
  const slug = slugify(asText(formData.get("slug")) || title)

  if (!title || !slug) {
    throw new Error("Title is required")
  }

  const { db } = await requireAdmin()
  const { error } = await (db as any).from("workflows").insert({
    slug,
    title,
    summary: asText(formData.get("summary")) || null,
    body: asText(formData.get("body")) || null,
    tags: asTags(formData.get("tags")),
    status: asText(formData.get("publish")) === "true" ? "published" : "draft",
    published_at:
      asText(formData.get("publish")) === "true"
        ? new Date().toISOString()
        : null,
    provenance: {
      created_from: "admin-content-machine",
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/workflows")
}

export async function publishWorkflow(formData: FormData) {
  const id = asText(formData.get("id"))

  if (!id) {
    throw new Error("Workflow ID is required")
  }

  const { db, userId } = await requireAdmin()
  const { error } = await (db as any)
    .from("workflows")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
      reviewed_by: userId,
    })
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/content-machine")
  revalidatePath("/workflows")
}

export async function runImportNow(formData: FormData) {
  await requireAdmin()

  const source = asText(formData.get("source"))
  const githubQuery = asText(formData.get("github_query"))
  const sources =
    source === "github" || source === "bens-bites"
      ? ([source] as ("github" | "bens-bites")[])
      : undefined

  await runContentMachineImport({
    sources,
    githubQuery: githubQuery || undefined,
  })

  revalidatePath("/admin/content-machine")
  revalidatePath("/watch")
  revalidatePath("/briefs")
}
