import { FileText, GitBranch, Plus, Radio } from "lucide-react"

import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  createBrief,
  createWatchItem,
  createWorkflow,
  listContentMachineItems,
  promoteSourceItemToWatch,
  promoteWatchItemToWorkflow,
  publishBrief,
  publishWorkflow,
  reviewWatchItem,
  runImportNow,
} from "./actions"

export const dynamic = "force-dynamic"

export default async function ContentMachinePage() {
  if (!hasEnvVars) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Radio className="h-4 w-4" />
            Content Machine
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Supabase env vars are not loaded.
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Add the local Supabase URL and anon key before using the admin
            review queue. Public Watch, Briefs, Workflows, and Compare pages
            will continue to render starter content.
          </p>
        </section>
      </main>
    )
  }

  const { sourceItems, watchItems, briefs, workflows } =
    await listContentMachineItems()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Radio className="h-4 w-4" />
          Content Machine
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Agent.tips content machine
          </h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Ingest source intelligence, review Watch candidates, draft briefs,
            and promote durable workflows.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <ImportForm />
        <CreateWatchItemForm />
        <CreateBriefForm />
        <CreateWorkflowForm />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Watch Queue</CardTitle>
            <CardDescription>
              Reviewed and promotable agent signals.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {watchItems.length === 0 ? (
              <EmptyState>No watch items yet.</EmptyState>
            ) : (
              watchItems.map((item: any) => (
                <div key={item.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="outline">{item.status}</Badge>
                      <h3 className="mt-2 font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <form action={promoteWatchItemToWorkflow}>
                      <input type="hidden" name="id" value={item.id} />
                      <Button size="sm" type="submit" variant="outline">
                        Workflow
                      </Button>
                    </form>
                  </div>
                  <form action={reviewWatchItem} className="mt-3 flex gap-2">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="status" value="reviewed" />
                    <Input name="review_notes" placeholder="Review notes" />
                    <Button size="sm" type="submit">
                      Review
                    </Button>
                  </form>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Briefs</CardTitle>
            <CardDescription>
              Drafts and published Arnarsson briefs.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {briefs.length === 0 ? (
              <EmptyState>No briefs yet.</EmptyState>
            ) : (
              briefs.map((brief: any) => (
                <div key={brief.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="secondary">{brief.status}</Badge>
                      <h3 className="mt-2 font-medium">{brief.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        /briefs/{brief.slug}
                      </p>
                    </div>
                    {brief.status !== "published" ? (
                      <form action={publishBrief}>
                        <input type="hidden" name="id" value={brief.id} />
                        <Button size="sm" type="submit" variant="outline">
                          Publish
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source Items</CardTitle>
            <CardDescription>Metadata-only ingestion queue.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {sourceItems.length === 0 ? (
              <EmptyState>No source items yet.</EmptyState>
            ) : (
              sourceItems.map((item: any) => (
                <div key={item.id} className="rounded-lg border p-3">
                  <Badge variant="outline">{item.status}</Badge>
                  <h3 className="mt-2 font-medium">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.source_name || item.source_url}
                  </p>
                  <form action={promoteSourceItemToWatch} className="mt-3">
                    <input type="hidden" name="id" value={item.id} />
                    <Button size="sm" type="submit" variant="outline">
                      Promote to Watch
                    </Button>
                  </form>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
            <CardDescription>Workflow publishing queue.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {workflows.length === 0 ? (
              <EmptyState>No workflows yet.</EmptyState>
            ) : (
              workflows.map((workflow: any) => (
                <div key={workflow.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="secondary">{workflow.status}</Badge>
                      <h3 className="mt-2 font-medium">{workflow.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        /workflows/{workflow.slug}
                      </p>
                    </div>
                    {workflow.status !== "published" ? (
                      <form action={publishWorkflow}>
                        <input type="hidden" name="id" value={workflow.id} />
                        <Button size="sm" type="submit" variant="outline">
                          Publish
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function ImportForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={runImportNow} className="grid gap-3">
          <Field name="source" label="Source" placeholder="github" />
          <Field name="github_query" label="GitHub query" />
          <Button type="submit">Run import</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CreateWatchItemForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Watch item
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createWatchItem} className="grid gap-3">
          <Field name="title" label="Title" required />
          <Field name="source_url" label="Source URL" required />
          <Field name="source" label="Source" placeholder="manual" />
          <Field name="ecosystem" label="Ecosystem" />
          <Field name="language" label="Language" />
          <Field name="tags" label="Tags" placeholder="routing, llm-infra" />
          <Textarea name="description" placeholder="Short review summary" />
          <Button type="submit">Create reviewed item</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CreateBriefForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Brief
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createBrief} className="grid gap-3">
          <Field name="title" label="Title" required />
          <Field name="slug" label="Slug" />
          <Field name="subtitle" label="Subtitle" />
          <Textarea name="summary" placeholder="Public summary" />
          <Textarea name="body" placeholder="Markdown body" />
          <Button type="submit">Create draft brief</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CreateWorkflowForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          Workflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createWorkflow} className="grid gap-3">
          <Field name="title" label="Title" required />
          <Field name="slug" label="Slug" />
          <Field name="tags" label="Tags" />
          <Textarea name="summary" placeholder="Public summary" />
          <Textarea name="body" placeholder="Markdown body" />
          <Button type="submit">Create draft workflow</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({
  name,
  label,
  placeholder,
  required,
}: {
  name: string
  label: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
      {children}
    </div>
  )
}
