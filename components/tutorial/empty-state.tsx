"use client"

import Link from "next/link"
import { Binoculars, Send } from "lucide-react"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  isDev: boolean
}

export function EmptyState({ isDev }: EmptyStateProps) {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center px-4 py-16">
      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border bg-card">
          <Binoculars className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Agent.tips
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          No agents listed yet.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          New AI agents, coding assistants, automation tools, and workflow
          signals will appear here as they are reviewed.
        </p>
        {isDev ? (
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Local data is empty or unavailable. Production visitors should never
            see setup instructions here.
          </p>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/watch">Open Watch</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/submit-new">
              <Send className="mr-2 h-4 w-4" />
              Submit an Agent
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
