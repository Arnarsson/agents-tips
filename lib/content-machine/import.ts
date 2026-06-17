import "server-only"

import type { Database, Json } from "@/db/supabase/types"
import {
  fetchBensBitesContentMachineItems,
  fetchGitHubContentMachineItems,
  toSourceItemRow,
  type ContentMachineSourceItem,
} from "@/supabase/seed/src/stage-0-discover/content-machine-sources"
import { createClient } from "@supabase/supabase-js"

type ImportSource = "github" | "bens-bites"

type ImportOptions = {
  sources?: ImportSource[]
  githubQuery?: string
}

type ImportResult = {
  sourceItems: number
  watchItems: number
  sources: ImportSource[]
}

type ExistingWatchItemState = {
  status?: string | null
  review_notes?: string | null
  reviewed_at?: string | null
  reviewed_by?: string | null
  promoted_at?: string | null
  promoted_by?: string | null
  workflow_id?: string | null
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Content machine import requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    )
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function sourceDefinitionFor(item: ContentMachineSourceItem) {
  if (item.sourceType === "github") {
    return {
      name: "GitHub Agent Topics",
      url: "https://api.github.com/search/repositories",
      source_type: "github",
      scrape_policy: "metadata_only",
      description: "GitHub repository search source for public repo metadata.",
      metadata: {
        adapter: "github",
        stores: "repo_metadata_only",
      },
    }
  }

  return {
    name: "Ben's Bites Archive",
    url: "https://www.bensbites.com/archive",
    source_type: "newsletter",
    scrape_policy: "links_only",
    description:
      "Newsletter archive source for metadata and outbound link discovery only.",
    metadata: {
      adapter: "bens-bites",
      stores: "metadata_and_links_only",
    },
  }
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null
}

function asNumber(value: unknown) {
  return typeof value === "number" ? value : null
}

function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json
}

function splitGitHubFullName(fullName: string | null) {
  if (!fullName || !fullName.includes("/")) {
    return { repo_owner: null, repo_name: null }
  }

  const [repo_owner, repo_name] = fullName.split("/", 2)
  return { repo_owner, repo_name }
}

function toWatchItemRow(item: ContentMachineSourceItem, sourceItemId?: string) {
  const githubFullName = asString(item.metadata.github_full_name)
  const { repo_owner, repo_name } = splitGitHubFullName(githubFullName)
  const stars = asNumber(item.metadata.github_stargazers_count)
  const forks = asNumber(item.metadata.github_forks_count)
  const openIssues = asNumber(item.metadata.github_open_issues_count)

  return {
    source_item_id: sourceItemId ?? null,
    source: item.provenance.adapter,
    source_url: item.sourceUrl,
    title: item.title,
    description: asString(item.metadata.github_description),
    repo_owner,
    repo_name,
    language: asString(item.metadata.language),
    stars,
    stars_24h: null,
    trend_score: Math.min(stars ?? 0, 100000),
    authority_score: Math.min((forks ?? 0) * 2 + (openIssues ?? 0), 100000),
    ecosystem: "github",
    tags: item.extractedTopics,
    status: "reviewed",
    github_repo_id: asNumber(item.metadata.github_repo_id),
    github_full_name: githubFullName,
    github_url: asString(item.metadata.github_url),
    github_description: asString(item.metadata.github_description),
    github_topics: item.extractedTopics,
    github_pushed_at: asString(item.metadata.github_pushed_at),
    github_stargazers_count: stars,
    github_forks_count: forks,
    github_open_issues_count: openIssues,
    github_license: asString(item.metadata.github_license),
    metadata: toJson(item.metadata),
    provenance: toJson(item.provenance),
    reviewed_at: new Date().toISOString(),
    review_notes: "Auto-reviewed public GitHub metadata import.",
  }
}

async function getExistingWatchItemState(
  db: any,
  sourceUrl: string
): Promise<ExistingWatchItemState | null> {
  const { data, error } = await db
    .from("watch_items")
    .select(
      "status,review_notes,reviewed_at,reviewed_by,promoted_at,promoted_by,workflow_id"
    )
    .eq("source_url", sourceUrl)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

function preserveWatchReviewState(
  row: ReturnType<typeof toWatchItemRow>,
  existing: ExistingWatchItemState | null
) {
  if (!existing) {
    return row
  }

  return {
    ...row,
    status: existing.status ?? row.status,
    review_notes: existing.review_notes ?? row.review_notes,
    reviewed_at: existing.reviewed_at ?? row.reviewed_at,
    reviewed_by: existing.reviewed_by ?? null,
    promoted_at: existing.promoted_at ?? null,
    promoted_by: existing.promoted_by ?? null,
    workflow_id: existing.workflow_id ?? null,
  }
}

async function fetchItems(options: ImportOptions) {
  const sources = options.sources ?? ["github", "bens-bites"]
  const batches = await Promise.all(
    sources.map(async (source) => {
      if (source === "github") {
        return fetchGitHubContentMachineItems(options.githubQuery)
      }

      return fetchBensBitesContentMachineItems()
    })
  )

  return batches.flat()
}

export async function runContentMachineImport(
  options: ImportOptions = {}
): Promise<ImportResult> {
  const db = createServiceClient() as any
  const items = await fetchItems(options)
  let sourceItems = 0
  let watchItems = 0

  for (const item of items) {
    const sourceDefinition = sourceDefinitionFor(item)
    const { data: source, error: sourceError } = await db
      .from("sources")
      .upsert(
        {
          ...sourceDefinition,
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "url" }
      )
      .select("id")
      .single()

    if (sourceError) {
      throw new Error(sourceError.message)
    }

    const { status: sourceItemStatus, ...sourceItemRow } = toSourceItemRow(item)
    void sourceItemStatus

    const { data: sourceItem, error: sourceItemError } = await db
      .from("source_items")
      .upsert(
        {
          ...sourceItemRow,
          extracted_links: toJson(item.extractedLinks),
          metadata: toJson(item.metadata),
          provenance: toJson(item.provenance),
          source_id: source.id,
        },
        { onConflict: "source_url" }
      )
      .select("id")
      .single()

    if (sourceItemError) {
      throw new Error(sourceItemError.message)
    }

    sourceItems += 1

    if (item.sourceType === "github") {
      const existing = await getExistingWatchItemState(db, item.sourceUrl)
      const { error: watchError } = await db
        .from("watch_items")
        .upsert(
          preserveWatchReviewState(
            toWatchItemRow(item, sourceItem.id),
            existing
          ),
          { onConflict: "source_url" }
        )

      if (watchError) {
        throw new Error(watchError.message)
      }

      watchItems += 1
    }
  }

  return {
    sourceItems,
    watchItems,
    sources: options.sources ?? ["github", "bens-bites"],
  }
}
