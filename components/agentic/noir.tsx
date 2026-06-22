import type { ReactNode } from "react"
import { Activity, Bot, GitBranch, Radar, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

// Editorial replacement for the old dark "noir" surfaces. Token-based so it
// adapts to light + dark automatically.

export function NoirBackdrop({ className }: { className?: string }) {
  // Kept as a no-op for API compatibility; editorial surfaces use flat tokens.
  return <div aria-hidden="true" className={cn("hidden", className)} />
}

export function SignalBadge({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode
  tone?: "green" | "amber" | "cyan"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export function NoirPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      <div className="relative">{children}</div>
    </section>
  )
}

export function NoirCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  )
}

export function AgentStackPreview({ className }: { className?: string }) {
  const cards = [
    { icon: Radar, label: "Watch", title: "Repo signal", meta: "trend 82" },
    { icon: Bot, label: "Review", title: "Human pass", meta: "notes locked" },
    {
      icon: GitBranch,
      label: "Workflow",
      title: "Reusable recipe",
      meta: "ship path",
    },
  ]

  return (
    <div className={cn("relative min-h-[320px] w-full", className)}>
      <div className="absolute inset-0 rounded-2xl border border-border bg-secondary/50" />
      <div className="relative grid h-full gap-3 p-4">
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
          <div>
            <div className="text-xs uppercase text-muted-foreground">
              content machine
            </div>
            <div className="mt-1 font-mono text-sm text-primary">
              discover → review → publish
            </div>
          </div>
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div className="grid gap-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md border border-border bg-secondary p-2">
                  <card.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">
                    {card.label}
                  </div>
                  <div className="mt-1 font-medium text-foreground">
                    {card.title}
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    {card.meta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Arnarsson brief ready
          </div>
        </div>
      </div>
    </div>
  )
}
