import Link from "next/link"
import { createClient } from "@/db/supabase/server"
import { ArrowRight, Feather, Radio } from "lucide-react"

import {
  starterBriefs,
  type PublicBrief,
} from "@/lib/content-machine/public-content"
import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Arnarsson Briefs | Agent.tips",
  description:
    "Field notes for the agent stack: tools, workflows, repos, and signals from Arnarsson.",
}

async function getBriefs(): Promise<PublicBrief[]> {
  if (!hasEnvVars) {
    return starterBriefs
  }

  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from("briefs")
    .select("id,slug,issue_number,title,subtitle,summary,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching briefs:", error)
    return starterBriefs
  }

  return data?.length
    ? data.map((brief: Omit<PublicBrief, "body" | "brief_items">) => ({
        ...brief,
        body: null,
        brief_items: [],
      }))
    : starterBriefs
}

export default async function BriefsPage() {
  const briefs = await getBriefs()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Feather className="h-4 w-4" />
          Filed by Arnarsson
        </div>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Field notes for the agent stack.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Arnarsson Briefs turn Watch signals into original commentary,
            workflow notes, and durable links back into Agent.tips tools.
          </p>
        </div>
      </section>

      {briefs.length === 0 ? (
        <section className="rounded-lg border border-dashed p-8">
          <Badge variant="secondary">Draft format</Badge>
          <h2 className="mt-3 text-2xl font-semibold">
            No published briefs yet.
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The first production issue will be assembled from approved Watch
            items, promoted tools, and original operator notes.
          </p>
          <Button asChild className="mt-5" variant="outline">
            <Link href="/watch">
              Open Watch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      ) : (
        <section className="grid gap-4">
          {briefs.map((brief) => (
            <Link
              key={brief.id}
              href={`/briefs/${brief.slug}`}
              className="group"
            >
              <article className="rounded-lg border bg-card p-5 transition-colors hover:bg-muted/30">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary">
                    {brief.issue_number ? `#${brief.issue_number}` : "Brief"}
                  </Badge>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-primary">
                  {brief.title}
                </h2>
                {brief.subtitle || brief.summary ? (
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {brief.subtitle || brief.summary}
                  </p>
                ) : null}
              </article>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
