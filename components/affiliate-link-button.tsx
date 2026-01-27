"use client"

import { ExternalLink } from "lucide-react"

import type { Product } from "@/lib/types"
import { buildAffiliateUrl, trackAffiliateClick } from "@/lib/affiliate"

import { Button } from "./ui/button"

interface AffiliateLinkButtonProps {
  product: Product
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost"
  className?: string
}

export function AffiliateLinkButton({
  product,
  size = "sm",
  variant = "outline",
  className,
}: AffiliateLinkButtonProps) {
  const affiliateUrl = buildAffiliateUrl(product)

  const handleClick = () => {
    // Track the click
    trackAffiliateClick(product.id).catch((error) => {
      console.error("Failed to track affiliate click:", error)
    })
  }

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2"
        onClick={handleClick}
      >
        <span>Visit Site</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  )
}
