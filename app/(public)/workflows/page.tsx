import Link from "next/link"
import { createClient } from "@/db/supabase/server"
import { ArrowRight, GitBranch } from "lucide-react"

import {
  starterWorkflows,
  type PublicWorkflow,
} from "@/lib/content-machine/public-content"
import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Workflows | Agent.tips",
  description:
    "Practical agent stack recipes promoted from Watch signals and field notes.",
  alternates: { canonical: "https://agents.tips/workflows" },
  openGraph: {
    title: "Workflows | Agent.tips",
    description:
      "Practical agent stack recipes promoted from Watch signals and field notes.",
    url: "https://agents.tips/workflows",
    type: "website",
    images: ["/og-image.png"],
  },
}

async function getWorkflows(): Promise<PublicWorkflow[]> {
  if (!hasEnvVars) {
    return starterWorkflows
  }

  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from("workflows")
    .select("id,slug,title,summary,tags")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching workflows:", error)
    return starterWorkflows
  }

  return data?.length
    ? data.map((workflow: Omit<PublicWorkflow, "body">) => ({
        ...workflow,
        body: null,
      }))
    : starterWorkflows
}

export default async function WorkflowsPage() {
  const workflows = await getWorkflows()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <GitBranch className="h-4 w-4" />
          Agent.tips Workflows
        </div>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Practical recipes for agent stacks.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Workflows turn Watch signals into usable stack patterns, checks, and
            operating notes.
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        {workflows.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8">
            <h2 className="text-xl font-semibold">
              No workflows published yet.
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Reviewed Watch items can be promoted into workflow recipes from
              the content-machine admin.
            </p>
          </div>
        ) : (
          workflows.map((workflow) => (
            <article
              key={workflow.id}
              className="rounded-lg border bg-card p-5"
            >
              <div className="flex flex-wrap gap-2">
                {(workflow.tags ?? []).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="mt-3 text-2xl font-semibold">{workflow.title}</h2>
              {workflow.summary ? (
                <p className="mt-2 leading-7 text-muted-foreground">
                  {workflow.summary}
                </p>
              ) : null}
              <Button asChild className="mt-5" size="sm" variant="outline">
                <Link href={`/workflows/${workflow.slug}`}>
                  Open workflow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
