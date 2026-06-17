import type { ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

export function ConsoleShell({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050604] text-white shadow-[0_24px_110px_rgba(0,0,0,0.58)] md:rounded-[2rem]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: "url('/agentic-moss.svg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_12%,rgb(14_165_233/0.18),transparent_26%),radial-gradient(circle_at_20%_88%,rgb(132_204_22/0.16),transparent_30%),linear-gradient(110deg,rgb(0_0_0/0.28),rgb(0_0_0/0.76)_54%,rgb(0_0_0/0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-55" />
      <div className="relative z-10 grid grid-rows-[auto_1fr]">{children}</div>
    </section>
  )
}

export function ConsolePanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[1.2rem] border border-white/10 bg-black/46 p-3 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ConsolePill({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-100",
        className
      )}
    >
      {children}
    </span>
  )
}

export function ConsoleIcon({
  icon: Icon,
  tone = "lime",
  className,
}: {
  icon: ElementType
  tone?: "lime" | "cyan" | "muted"
  className?: string
}) {
  const tones = {
    lime: "border-lime-300/20 bg-lime-300/10 text-lime-200",
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    muted: "border-white/10 bg-white/[0.045] text-zinc-400",
  }

  return (
    <span
      className={cn(
        "grid h-9 w-9 place-items-center rounded-xl border",
        tones[tone],
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  )
}

export function ConsoleLinkCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "group block rounded-[1.2rem] border border-white/10 bg-black/48 p-4 backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-black/68",
        className
      )}
    >
      {children}
    </span>
  )
}
