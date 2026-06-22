import type React from "react"
import Link from "next/link"
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bot,
  Braces,
  CheckCircle2,
  CircleDot,
  Clock3,
  GitCompareArrows,
  Layers3,
  LockKeyhole,
  Plus,
  Radar,
  Route,
  Search,
  ShieldCheck,
} from "lucide-react"

import type { Product } from "@/lib/types"
import { formatToolName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import {
  ConsoleIcon,
  ConsoleLinkCard,
  ConsolePanel,
  ConsolePill,
  ConsoleShell,
} from "@/components/agentic/console"

interface HeroProps {
  children?: React.ReactNode
  agentCount?: number
  products?: Product[]
  categories?: Array<[string, Product[]]>
  searchQuery?: string
}

type ConsoleTool = Pick<
  Product,
  | "id"
  | "codename"
  | "punchline"
  | "categories"
  | "labels"
  | "tags"
  | "view_count"
> & {
  href?: string
}

const fallbackTools = [
  {
    id: "cursor",
    href: "/tools?search=Cursor",
    codename: "Cursor",
    punchline: "IDE-native coding agent with repo context.",
    categories: "Coding",
    labels: ["review", "repo"],
    tags: ["coding", "agent"],
    view_count: 2840,
  },
  {
    id: "claude-code",
    href: "/tools?search=Claude%20Code",
    codename: "Claude Code",
    punchline: "Terminal-first agent for codebase changes.",
    categories: "Coding",
    labels: ["terminal", "local"],
    tags: ["coding", "cli"],
    view_count: 2310,
  },
  {
    id: "n8n",
    href: "/tools?search=n8n",
    codename: "n8n",
    punchline: "Agent workflows with visible automation paths.",
    categories: "Automation",
    labels: ["workflow", "self-host"],
    tags: ["automation", "mcp"],
    view_count: 1790,
  },
] satisfies ConsoleTool[]

const workflows = [
  {
    href: "/watch",
    icon: Radar,
    label: "Watch",
    detail: "Track new launches, repo motion, pricing shifts.",
    event: "home_cta_watch",
  },
  {
    href: "/compare",
    icon: GitCompareArrows,
    label: "Compare",
    detail: "Choose by control, cost, privacy, setup burden.",
    event: "home_cta_compare",
  },
  {
    href: "/workflows",
    icon: Route,
    label: "Workflows",
    detail: "Turn the right agent stack into a repeatable recipe.",
    event: "home_cta_workflows",
  },
]

const primaryRoutes = [
  { href: "/tools", label: "Tools" },
  { href: "/watch", label: "Watch" },
  { href: "/compare", label: "Compare" },
  { href: "/workflows", label: "Workflows" },
  { href: "/dk", label: "DK" },
]
const searchShortcuts = ["coding agents", "MCP", "automation", "research"]
const mobileActions = [
  { href: "/tools", icon: Search, label: "Browse" },
  { href: "/compare", icon: GitCompareArrows, label: "Compare" },
  { href: "/workflows", icon: Route, label: "Workflow" },
]
const stackFitRows = [
  { label: "API", href: "/tools?search=API" },
  { label: "Local", href: "/tools?search=local%20models" },
  { label: "MCP", href: "/tools?search=MCP" },
  { label: "Team", href: "/compare" },
]
const decisionRows = [
  {
    icon: Activity,
    label: "Fastest path",
    value: "repo agent + MCP",
    href: "/tools?search=coding%20agents",
  },
  {
    icon: LockKeyhole,
    label: "Private stack",
    value: "local model route",
    href: "/tools?search=local%20models",
  },
  {
    icon: Clock3,
    label: "Repeatable ops",
    value: "workflow automation",
    href: "/workflows",
  },
]

export function Hero({
  children,
  agentCount,
  products = [],
  categories = [],
  searchQuery = "",
}: HeroProps) {
  const displayCount = agentCount && agentCount > 0 ? `${agentCount}` : "100+"
  const hasSearch = searchQuery.trim().length > 0
  const hasMatches = products.length > 0
  const visibleTools =
    products.length > 0 ? products.slice(0, 3) : fallbackTools
  const categoryRows =
    categories.length > 0
      ? categories.slice(0, 4).map(([name, items]) => ({
          name,
          count: items.length,
        }))
      : [
          { name: "Coding", count: 41 },
          { name: "Automation", count: 32 },
          { name: "Research", count: 26 },
          { name: "Local models", count: 18 },
        ]

  return (
    <ConsoleShell>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <ConsoleIcon
            icon={Bot}
            className="shadow-[0_0_30px_rgba(190,242,100,0.18)]"
          />
          <span>
            <span className="block text-sm font-semibold leading-none">
              Agent.tips
            </span>
            <span className="mt-1 block text-xs text-zinc-500">
              agent directory console
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
            {primaryRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                {route.label}
              </Link>
            ))}
          </div>
          <Button
            asChild
            className="h-9 rounded-full bg-lime-300 px-4 text-sm font-semibold text-black hover:bg-lime-200"
          >
            <Link href="/submit-new">
              Submit
              <Plus className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 p-3 md:p-5 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_430px]">
        <section className="relative z-20 min-w-0 overflow-visible rounded-[1.45rem] border border-white/10 bg-black/32 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_24px_90px_rgba(0,0,0,0.38)] md:p-5">
          <div className="pointer-events-none absolute -right-20 -top-24 hidden h-96 w-96 opacity-70 md:block">
            <div className="agentic-halftone-orb absolute inset-0" />
          </div>
          <div className="relative grid gap-5 lg:grid-cols-[minmax(300px,0.66fr)_minmax(360px,0.74fr)]">
            <div className="grid content-start gap-4">
              <div>
                <ConsolePill className="bg-black/45">
                  <CircleDot className="h-3.5 w-3.5" />
                  {hasSearch
                    ? hasMatches
                      ? `${products.length} matches`
                      : "No exact match"
                    : `${displayCount} tools indexed`}
                </ConsolePill>
                <h1 className="mt-3 max-w-xl text-3xl font-black leading-[0.9] tracking-tight sm:text-4xl md:text-6xl lg:text-5xl xl:text-6xl">
                  Find the agent stack worth shipping.
                </h1>
              </div>

              <div className="relative rounded-[1.35rem] border border-lime-200/20 bg-black/72 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.52)]">
                {children}
              </div>

              <p className="hidden max-w-xl text-sm leading-6 text-zinc-300 sm:block md:text-base">
                {hasSearch
                  ? hasMatches
                    ? `Showing reviewed tools related to "${searchQuery}". Filter by stack shape or jump into a comparison path.`
                    : `No reviewed tools matched "${searchQuery}" yet. Use adjacent categories or fallback paths below.`
                  : "Search by job, scan the closest tools, compare trade-offs, and turn the shortlist into a repeatable workflow."}
              </p>

              <div className="grid gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    <Layers3 className="h-3.5 w-3.5 text-lime-200" />
                    Categories
                  </span>
                  <Link
                    href="/tools"
                    className="text-xs text-zinc-500 transition hover:text-lime-100"
                  >
                    all tools
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categoryRows.slice(0, 4).map((category) => (
                    <Link
                      key={category.name}
                      href={`/tools?search=${encodeURIComponent(
                        category.name
                      )}`}
                      className="flex min-h-10 items-center justify-between rounded-xl border border-white/10 bg-black/28 px-3 text-sm text-zinc-300 transition hover:border-lime-300/35 hover:bg-lime-300/10"
                    >
                      <span className="truncate">{category.name}</span>
                      <span className="ml-2 font-mono text-xs text-zinc-600">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:hidden">
                {mobileActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="grid min-h-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.045] px-2 text-center text-xs font-medium text-zinc-200 transition hover:border-lime-300/35 hover:bg-lime-300/10"
                  >
                    <action.icon className="mb-1 h-4 w-4 text-lime-200" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid min-w-0 content-start gap-4">
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050705]/84 shadow-[0_24px_100px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Radar className="h-4 w-4 text-lime-200" />
                    {hasSearch && !hasMatches
                      ? "Closest starting points"
                      : "Recommended tools"}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    live shortlist
                  </span>
                </div>
                {hasSearch && !hasMatches ? (
                  <div className="mx-3 mt-3 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-100">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    No exact review yet. These paths keep the decision moving.
                  </div>
                ) : null}
                <div className="grid gap-2 p-3">
                  {visibleTools.map((tool, index) => (
                    <ToolRow key={tool.id} index={index} tool={tool} />
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {searchShortcuts.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tools?search=${encodeURIComponent(tag)}`}
                    className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-sm text-zinc-300 transition hover:border-lime-300/35 hover:bg-lime-300/10 hover:text-lime-100"
                  >
                    <span className="inline-flex items-center gap-2 truncate">
                      <Search className="h-3.5 w-3.5 shrink-0" />
                      {tag}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <ConsolePanel className="relative overflow-hidden bg-[#0b0f0d]/86 p-0 shadow-[0_24px_90px_rgba(0,0,0,0.58)]">
            <div className="absolute -right-20 -top-20 h-72 w-72 opacity-80">
              <div className="agentic-halftone-orb absolute inset-0 scale-110" />
            </div>
            <div className="relative border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-cyan-200" />
                  Stack fit check
                </div>
                <Braces className="h-4 w-4 text-zinc-600" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {stackFitRows.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-2 py-1.5 text-center text-xs text-zinc-300 transition hover:border-cyan-200/35 hover:bg-cyan-200/10 hover:text-cyan-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative grid gap-2 p-3">
              <span className="flex items-center gap-2 px-1 pb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                <Route className="h-3.5 w-3.5 text-lime-200" />
                Decision paths
              </span>
              {workflows.map((item, index) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  event={item.event}
                >
                  <ConsoleLinkCard className="rounded-2xl bg-black/42 p-3">
                    <div className="grid grid-cols-[2rem_1fr_auto] items-center gap-3">
                      <span className="font-mono text-xs text-zinc-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 font-semibold">
                          <item.icon className="h-4 w-4 text-lime-200" />
                          {item.label}
                        </span>
                        <span className="mt-1 block truncate text-sm text-zinc-500">
                          {item.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-600 transition group-hover:text-lime-200" />
                    </div>
                  </ConsoleLinkCard>
                </TrackedLink>
              ))}
            </div>
          </ConsolePanel>

          <ConsolePanel className="p-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Decision lane</div>
              <Activity className="h-4 w-4 text-lime-200" />
            </div>
            <div className="grid gap-2">
              {decisionRows.map((row) => (
                <Link
                  key={row.label}
                  href={row.href}
                  className="group grid grid-cols-[2rem_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 transition hover:border-lime-300/35 hover:bg-lime-300/10"
                >
                  <ConsoleIcon
                    icon={row.icon}
                    tone="muted"
                    className="h-8 w-8 rounded-lg transition group-hover:border-lime-300/30 group-hover:text-lime-100"
                  />
                  <span className="min-w-0">
                    <span className="block text-xs text-zinc-500">
                      {row.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-zinc-200">
                      {row.value}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </ConsolePanel>
        </aside>
      </div>
    </ConsoleShell>
  )
}

function ToolRow({ tool, index }: { tool: ConsoleTool; index: number }) {
  const tags = [...(tool.labels || []), ...(tool.tags || [])].slice(0, 2)

  return (
    <Link
      href={tool.href || `/tools/${tool.id}`}
      className="group grid min-h-[74px] grid-cols-[2.25rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2.5 transition hover:border-lime-300/35 hover:bg-lime-300/10"
    >
      <span className="font-mono text-xs text-zinc-600">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-semibold text-white">
            {formatToolName(tool.codename)}
          </span>
          {tool.categories ? (
            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-zinc-500">
              {tool.categories}
            </span>
          ) : null}
        </span>
        <span className="mt-1.5 line-clamp-1 block text-sm text-zinc-400">
          {tool.punchline}
        </span>
        {tags.length > 0 ? (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </span>
      <span className="grid gap-2 justify-items-end">
        <span className="flex items-center gap-1 font-mono text-xs text-lime-100">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {(tool.view_count || 0).toLocaleString()}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] p-2 text-zinc-500 transition group-hover:bg-lime-300 group-hover:text-black">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  )
}
