"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Vercel Analytics custom event name, e.g. "home_cta_compare". */
  event: string
  /** Optional event properties (strings/numbers/booleans only). */
  eventProps?: Record<string, string | number | boolean | null>
}

/**
 * A next/link that fires a Vercel Analytics custom event on click.
 * Tracking never blocks navigation — it is best-effort and swallows errors.
 */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        try {
          track(event, eventProps)
        } catch {
          // analytics must never break navigation
        }
        onClick?.(e)
      }}
    />
  )
}
