import Link from "next/link"
import { createClient } from "@/db/supabase/server"
import { ArrowUpRight, Eye, GitBranch, Star } from "lucide-react"

import {
  starterWatchItems,
  type PublicWatchItem,
} from "@/lib/content-machine/public-content"
import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NoirCard, NoirPanel, SignalBadge } from "@/components/agentic/noir"

export const metadata = {
  title: "Watch | Agent.tips",
  description:
    "Fresh repos, tools, and workflow signals moving through the agent stack.",
}

async function getWatchItems(): Promise<PublicWatchItem[]> {
  if (!hasEnvVars) {
    return starterWatchItems
  }

  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from("watch_items")
    .select(
      "id,title,description,source_url,ecosystem,language,stars_24h,trend_score,authority_score,tags"
    )
    .in("status", ["reviewed", "promoted"])
    .order("trend_score", { ascending: false })
    .limit(24)

  if (error) {
    console.error("Error fetching watch items:", error)
    return starterWatchItems
  }

  return data?.length ? data : starterWatchItems
}

export default async function WatchPage() {
  const watchItems = await getWatchItems()

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <NoirPanel>
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap gap-2">
            <SignalBadge>
              <Eye className="h-3.5 w-3.5" />
              Agent.tips Watch
            </SignalBadge>
            <SignalBadge tone="cyan">reviewed signal only</SignalBadge>
          </div>
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="agentic-text-sheen text-4xl font-black leading-none md:text-6xl">
              Fresh signals for the agent stack.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Watch tracks repos, tools, workflows, and infrastructure that may
              become future tool profiles, workflows, or Arnarsson brief items.
            </p>
          </div>
        </div>
      </NoirPanel>

      <section className="grid gap-4">
        {watchItems.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8">
            <h2 className="text-xl font-semibold">Watch is warming up.</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Reviewed repos and agent-stack signals will appear here after the
              content machine import runs.
            </p>
          </div>
        ) : (
          watchItems.map((item) => (
            <NoirCard key={item.id}>
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.ecosystem ? (
                      <Badge variant="secondary">{item.ecosystem}</Badge>
                    ) : null}
                    {item.language ? (
                      <Badge variant="outline">{item.language}</Badge>
                    ) : null}
                    {(item.tags ?? []).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h2>
                    {item.description ? (
                      <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid min-w-56 grid-cols-3 gap-2 text-center md:grid-cols-1">
                  <Metric
                    icon={Star}
                    label="24h stars"
                    value={item.stars_24h ?? 0}
                  />
                  <Metric
                    icon={ArrowUpRight}
                    label="trend"
                    value={item.trend_score ?? 0}
                  />
                  <Metric
                    icon={GitBranch}
                    label="authority"
                    value={item.authority_score ?? 0}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={item.source_url}
                    target={
                      item.source_url.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.source_url.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                  >
                    View source
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/briefs">Add to Arnarsson brief</Link>
                </Button>
              </div>
            </NoirCard>
          ))
        )}
      </section>
    </main>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Star
  label: string
  value: number
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/30 p-3">
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  )
}
