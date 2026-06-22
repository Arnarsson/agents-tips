"use client"

import { ArrowUpRight } from "lucide-react"

import type { Product } from "@/lib/types"
import { buildAffiliateUrl, trackAffiliateClick } from "@/lib/affiliate"
import { cn } from "@/lib/utils"

export function VisitLink({
  product,
  label = "Visit",
  className,
}: {
  product: Product
  label?: string
  className?: string
}) {
  const href = buildAffiliateUrl(product)
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(e) => {
        e.stopPropagation()
        trackAffiliateClick(product.id).catch(() => {})
      }}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80",
        className
      )}
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}
