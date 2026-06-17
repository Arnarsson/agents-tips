import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, GitCompareArrows } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { getStarterComparison } from "@/lib/content-machine/public-content"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const comparison = getStarterComparison(slug)

  return {
    title: comparison?.title
      ? `${comparison.title} | Agent.tips`
      : "Compare Agent Tools | Agent.tips",
    description:
      comparison?.summary ??
      "Practical comparison guides for AI agents and agent infrastructure.",
  }
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const comparison = getStarterComparison(slug)

  if (!comparison) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <Link
        href="/compare"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to compare
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <GitCompareArrows className="h-4 w-4" />
          <span>Agent.tips Compare</span>
          <Badge variant="secondary">{comparison.status}</Badge>
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {comparison.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {comparison.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {comparison.dimensions.map((dimension) => (
            <Badge key={dimension} variant="outline">
              {dimension}
            </Badge>
          ))}
        </div>
      </header>

      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <ReactMarkdown>{comparison.body}</ReactMarkdown>
      </article>
    </main>
  )
}
