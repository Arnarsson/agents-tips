import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/db/supabase/server"
import { ArrowLeft, GitBranch } from "lucide-react"
import ReactMarkdown from "react-markdown"

import {
  getStarterWorkflow,
  type PublicWorkflow,
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
    const workflow = getStarterWorkflow(slug)
    return {
      title: workflow?.title
        ? `${workflow.title} | Agent.tips`
        : "Workflow | Agent.tips",
      description:
        workflow?.summary ?? "Practical agent stack recipes from Agent.tips.",
    }
  }

  const supabase = await createClient()
  const { data } = await (supabase as any)
    .from("workflows")
    .select("title,summary")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  return {
    title: data?.title ? `${data.title} | Agent.tips` : "Workflow | Agent.tips",
    description:
      data?.summary ?? "Practical agent stack recipes from Agent.tips.",
  }
}

async function getWorkflow(slug: string): Promise<PublicWorkflow | null> {
  if (!hasEnvVars) {
    return getStarterWorkflow(slug)
  }

  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from("workflows")
    .select("id,slug,title,summary,body,tags")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !data) {
    return getStarterWorkflow(slug)
  }

  return data
}

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const workflow = await getWorkflow(slug)

  if (!workflow) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <Link
        href="/workflows"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workflows
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <GitBranch className="h-4 w-4" />
          <span>Agent.tips Workflow</span>
          {(workflow.tags ?? []).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {workflow.title}
          </h1>
          {workflow.summary ? (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {workflow.summary}
            </p>
          ) : null}
        </div>
      </header>

      {workflow.body ? (
        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <ReactMarkdown>{workflow.body}</ReactMarkdown>
        </article>
      ) : null}
    </main>
  )
}
