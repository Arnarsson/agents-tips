import type { ReactNode } from "react"
import { Activity, Bot, GitBranch, Radar, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

export function NoirBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <div className="agentic-grid absolute inset-0" />
      <div className="agentic-scan absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/60 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent" />
    </div>
  )
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
  const tones = {
    green: "border-lime-300/30 bg-lime-300/10 text-lime-100",
    amber: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    cyan: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_16px_currentColor]" />
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
        "relative overflow-hidden rounded-xl border border-white/10 bg-[#050606] shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <NoirBackdrop />
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
        "group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-lime-300/35 hover:bg-white/[0.06]",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  )
}

export function AgentStackPreview({ className }: { className?: string }) {
  const cards = [
    {
      icon: Radar,
      label: "Watch",
      title: "Repo signal",
      meta: "trend 82",
      tone: "text-lime-200",
    },
    {
      icon: Bot,
      label: "Review",
      title: "Human pass",
      meta: "notes locked",
      tone: "text-amber-200",
    },
    {
      icon: GitBranch,
      label: "Workflow",
      title: "Reusable recipe",
      meta: "ship path",
      tone: "text-cyan-200",
    },
  ]

  return (
    <div className={cn("relative min-h-[320px] w-full", className)}>
      <NoirBackdrop className="rounded-xl" />
      <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#030404]/80" />
      <div className="relative grid h-full gap-3 p-4">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-4 py-3">
          <div>
            <div className="text-xs uppercase text-muted-foreground">
              content machine
            </div>
            <div className="mt-1 font-mono text-sm text-lime-100">
              discover → review → publish
            </div>
          </div>
          <Activity className="h-5 w-5 text-lime-200" />
        </div>
        <div className="grid gap-3">
          {cards.map((card, index) => (
            <div
              key={card.label}
              className="agentic-card-lift rounded-lg border border-white/10 bg-white/[0.04] p-4"
              style={{ animationDelay: `${index * 130}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md border border-white/10 bg-black/40 p-2">
                  <card.icon className={cn("h-4 w-4", card.tone)} />
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
        <div className="rounded-lg border border-lime-300/20 bg-lime-300/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-lime-100">
            <Sparkles className="h-4 w-4" />
            Arnarsson brief ready
          </div>
        </div>
      </div>
    </div>
  )
}
