import { createHash } from "node:crypto"
import type { Json } from "@/db/supabase/types"
import * as cheerio from "cheerio"

type SourceType = "github" | "newsletter"

export type ContentMachineSourceItem = {
  sourceName: string
  sourceType: SourceType
  sourceUrl: string
  title: string
  publishedAt?: string | null
  extractedLinks: { title?: string; url: string }[]
  extractedTopics: string[]
  metadata: Record<string, unknown>
  provenance: {
    adapter: "github" | "bens-bites"
    scrape_policy: "metadata_only" | "links_only"
    attribution: string
  }
}

const BEN_NAVIGATION_TITLES = new Set([
  "home",
  "archive",
  "about",
  "community",
  "work with us",
])

type GitHubRepo = {
  id: number
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  pushed_at: string | null
  homepage: string | null
  topics?: string[]
  license?: { spdx_id?: string | null } | null
}

function asJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json
}

function contentHashFor(item: ContentMachineSourceItem) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        sourceUrl: item.sourceUrl,
        title: item.title,
        publishedAt: item.publishedAt ?? null,
        extractedLinks: item.extractedLinks,
        extractedTopics: item.extractedTopics,
      })
    )
    .digest("hex")
}

function inferNewsletterTopics(title: string) {
  const normalized = title.toLowerCase()
  const topics = new Set(["ai-news", "newsletter", "agent-signals"])

  if (normalized.includes("agent")) topics.add("agents")
  if (normalized.includes("mcp")) topics.add("mcp")
  if (normalized.includes("openclaw")) topics.add("coding-agents")
  if (normalized.includes("dev tool") || normalized.includes("developer")) {
    topics.add("developer-tools")
  }
  if (normalized.includes("model")) topics.add("models")
  if (normalized.includes("saas")) topics.add("saas")

  return Array.from(topics)
}

export function toSourceItemRow(item: ContentMachineSourceItem) {
  return {
    source_url: item.sourceUrl,
    source_name: item.sourceName,
    canonical_url: item.sourceUrl,
    content_hash: contentHashFor(item),
    title: item.title,
    published_at: item.publishedAt ?? null,
    extracted_links: asJson(item.extractedLinks),
    extracted_topics: item.extractedTopics,
    summary_for_internal_use: null,
    raw_payload: asJson({
      sourceName: item.sourceName,
      sourceType: item.sourceType,
      sourceUrl: item.sourceUrl,
      title: item.title,
      publishedAt: item.publishedAt ?? null,
      extractedLinks: item.extractedLinks,
      extractedTopics: item.extractedTopics,
      metadata: item.metadata,
      provenance: item.provenance,
    }),
    status: "new",
    metadata: asJson(item.metadata),
    provenance: asJson(item.provenance),
  }
}

export async function fetchGitHubContentMachineItems(
  query = "topic:ai-agent OR topic:llm-agent OR topic:ai-coding-agent"
): Promise<ContentMachineSourceItem[]> {
  const url = new URL("https://api.github.com/search/repositories")
  url.searchParams.set("q", query)
  url.searchParams.set("sort", "updated")
  url.searchParams.set("order", "desc")
  url.searchParams.set("per_page", "20")

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "agents-tips-content-machine",
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub import failed: ${response.status}`)
  }

  const payload = (await response.json()) as { items?: GitHubRepo[] }

  return (payload.items ?? []).map((repo) => ({
    sourceName: "GitHub Agent Topics",
    sourceType: "github",
    sourceUrl: repo.html_url,
    title: repo.full_name,
    publishedAt: repo.pushed_at,
    extractedLinks: [
      { title: "Repository", url: repo.html_url },
      ...(repo.homepage ? [{ title: "Homepage", url: repo.homepage }] : []),
    ],
    extractedTopics: [
      ...(repo.topics ?? []),
      ...(repo.language ? [repo.language.toLowerCase()] : []),
    ],
    metadata: {
      github_repo_id: repo.id,
      github_full_name: repo.full_name,
      github_url: repo.html_url,
      github_description: repo.description,
      github_stargazers_count: repo.stargazers_count,
      github_forks_count: repo.forks_count,
      github_open_issues_count: repo.open_issues_count,
      github_pushed_at: repo.pushed_at,
      github_license: repo.license?.spdx_id ?? null,
      homepage_url: repo.homepage,
      language: repo.language,
    },
    provenance: {
      adapter: "github",
      scrape_policy: "metadata_only",
      attribution: "GitHub public repository metadata",
    },
  }))
}

export async function fetchBensBitesContentMachineItems(): Promise<
  ContentMachineSourceItem[]
> {
  const archiveUrl = "https://www.bensbites.com/archive"
  const response = await fetch(archiveUrl, {
    headers: {
      "User-Agent": "agents-tips-content-machine",
    },
  })

  if (!response.ok) {
    throw new Error(`Ben's Bites import failed: ${response.status}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)
  const links = $("a")
    .map((_, element) => {
      const href = $(element).attr("href")
      const text = $(element).text().trim()

      if (!href) {
        return null
      }

      try {
        const link: { title?: string; url: string } = {
          title: text || undefined,
          url: new URL(href, archiveUrl).toString(),
        }

        return link
      } catch {
        return null
      }
    })
    .get()
    .filter((link): link is { title?: string; url: string } => Boolean(link))
    .filter((link) => {
      if (!link.title) return false

      const title = link.title.toLowerCase()
      const url = new URL(link.url)

      return (
        url.hostname === "www.bensbites.com" &&
        url.pathname.startsWith("/p/") &&
        !BEN_NAVIGATION_TITLES.has(title)
      )
    })

  const uniqueLinks = Array.from(
    new Map(links.map((link) => [link.url, link])).values()
  ).slice(0, 24)

  return uniqueLinks.map((link) => {
    const title = link.title ?? "Ben's Bites archive item"

    return {
      sourceName: "Ben's Bites Archive",
      sourceType: "newsletter",
      sourceUrl: link.url,
      title,
      extractedLinks: [{ title, url: link.url }],
      extractedTopics: inferNewsletterTopics(title),
      metadata: {
        archive_url: archiveUrl,
        fetched_at: new Date().toISOString(),
      },
      provenance: {
        adapter: "bens-bites",
        scrape_policy: "links_only",
        attribution:
          "Public Ben's Bites archive title and permalink metadata only",
      },
    }
  })
}
