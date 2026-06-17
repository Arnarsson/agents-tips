import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/db/supabase/server"
import { ArrowLeft, Calendar, Feather } from "lucide-react"
import ReactMarkdown from "react-markdown"

import {
  getStarterBrief,
  type PublicBrief,
} from "@/lib/content-machine/public-content"
import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!hasEnvVars) {
    const brief = getStarterBrief(slug)
    return {
      title: brief?.title
        ? `${brief.title} | Agent.tips`
        : "Brief | Agent.tips",
      description: brief?.summary ?? "Field notes for the agent stack.",
    }
  }

  const supabase = await createClient()
  const { data } = await (supabase as any)
    .from("briefs")
    .select("title,summary")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  return {
    title: data?.title ? `${data.title} | Agent.tips` : "Brief | Agent.tips",
    description: data?.summary ?? "Field notes for the agent stack.",
  }
}

async function getBrief(slug: string): Promise<PublicBrief | null> {
  if (!hasEnvVars) {
    return getStarterBrief(slug)
  }

  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from("briefs")
    .select(
      "id,slug,issue_number,title,subtitle,summary,body,published_at,brief_items(id,section,title,commentary,sort_order)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .order("sort_order", { foreignTable: "brief_items", ascending: true })
    .single()

  if (error || !data) {
    return getStarterBrief(slug)
  }

  return data
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brief = await getBrief(slug)

  if (!brief) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <Link
        href="/briefs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to briefs
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Feather className="h-4 w-4" />
          <span>Arnarsson Brief</span>
          {brief.issue_number ? <Badge>#{brief.issue_number}</Badge> : null}
          {brief.published_at ? (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(brief.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          ) : null}
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {brief.title}
          </h1>
          {brief.subtitle || brief.summary ? (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {brief.subtitle || brief.summary}
            </p>
          ) : null}
        </div>
      </header>

      {brief.body ? (
        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <ReactMarkdown>{brief.body}</ReactMarkdown>
        </article>
      ) : null}

      {brief.brief_items.length > 0 ? (
        <section className="grid gap-4">
          {brief.brief_items.map((item) => (
            <article key={item.id} className="rounded-lg border p-5">
              <Badge variant="outline">
                {item.section.replaceAll("_", " ")}
              </Badge>
              <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                {item.commentary}
              </p>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  )
}
