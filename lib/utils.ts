import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export const truncateString = (str: string, num: number) => {
  return str?.length > num ? `${str?.substring(0, num)}...` : str
}

// Full-slug overrides for tools whose proper name isn't a plain title-case
// of the slug (acronyms, brand casing, domain-style names).
const TOOL_NAME_OVERRIDES: Record<string, string> = {
  "openai-codex-cli": "OpenAI Codex CLI",
  "github-copilot": "GitHub Copilot",
  "v0-vercel": "v0 by Vercel",
  "bolt-new": "Bolt.new",
  "continue-dev": "Continue",
  "replit-agent": "Replit Agent",
  "claude-code": "Claude Code",
  autogpt: "AutoGPT",
  agentgpt: "AgentGPT",
  langchain: "LangChain",
  crewai: "CrewAI",
  n8n: "n8n",
}

// Per-token casing for acronyms when no full-slug override applies.
const TOOL_NAME_TOKENS: Record<string, string> = {
  ai: "AI",
  api: "API",
  cli: "CLI",
  ide: "IDE",
  ui: "UI",
  sdk: "SDK",
  mcp: "MCP",
  gpt: "GPT",
  db: "DB",
}

/**
 * Turn a tool codename/slug into a human-readable display name.
 * "claude-code" -> "Claude Code", "openai-codex-cli" -> "OpenAI Codex CLI".
 * Already-formatted names (with spaces/caps) pass through cleanly.
 */
export function formatToolName(codename: string | null | undefined): string {
  if (!codename) return ""
  const key = codename.toLowerCase().trim()
  if (TOOL_NAME_OVERRIDES[key]) return TOOL_NAME_OVERRIDES[key]
  return codename
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(
      (word) =>
        TOOL_NAME_TOKENS[word.toLowerCase()] ??
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY

/**
 * Updates URL search parameters for filters
 * @param currentParams - Current search params
 * @param updates - Object with filter updates
 * @returns New URLSearchParams instance
 */
export function updateFilterParams(
  currentParams: URLSearchParams,
  updates: {
    categories?: string[]
    labels?: string[]
    tags?: string[]
  }
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams)

  // Update categories
  if (updates.categories !== undefined) {
    if (updates.categories.length > 0) {
      newParams.set("categories", updates.categories.join(","))
    } else {
      newParams.delete("categories")
    }
  }

  // Update labels
  if (updates.labels !== undefined) {
    if (updates.labels.length > 0) {
      newParams.set("labels", updates.labels.join(","))
    } else {
      newParams.delete("labels")
    }
  }

  // Update tags
  if (updates.tags !== undefined) {
    if (updates.tags.length > 0) {
      newParams.set("tags", updates.tags.join(","))
    } else {
      newParams.delete("tags")
    }
  }

  return newParams
}
