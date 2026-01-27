/**
 * Affiliate link utilities for agents.tips
 * Handles affiliate URL generation, UTM tracking, and click tracking
 */

import type { Product } from "./types"

export interface AffiliateConfig {
  [key: string]: {
    baseUrl?: string
    affiliateTag?: string
    utmCampaign?: string
  }
}

/**
 * Affiliate configurations for different products
 * Add affiliate tags/params as partnerships are established
 */
export const AFFILIATE_CONFIGS: AffiliateConfig = {
  cursor: {
    affiliateTag: "ref=agentstips",
    utmCampaign: "cursor_partnership",
  },
  windsurf: {
    affiliateTag: "ref=agentstips",
    utmCampaign: "windsurf_partnership",
  },
  "github-copilot": {
    // GitHub Copilot doesn't have affiliate program yet
    utmCampaign: "github_copilot",
  },
  replit: {
    // Add Replit affiliate when available
    utmCampaign: "replit",
  },
  // Add more as partnerships are established
}

/**
 * Build a tracked external link with UTM parameters and affiliate tags
 */
export function buildAffiliateUrl(product: Product): string {
  const baseUrl = product.product_website
  const config = AFFILIATE_CONFIGS[product.codename]

  try {
    const url = new URL(baseUrl)

    // Add standard UTM parameters
    url.searchParams.set("utm_source", "agents.tips")
    url.searchParams.set("utm_medium", "directory")

    if (config) {
      // Add custom campaign if specified
      if (config.utmCampaign) {
        url.searchParams.set("utm_campaign", config.utmCampaign)
      }

      // Add affiliate tag if available
      if (config.affiliateTag) {
        const [param, value] = config.affiliateTag.split("=")
        url.searchParams.set(param, value)
      }
    } else {
      // Default campaign based on codename
      url.searchParams.set("utm_campaign", product.codename)
    }

    // Add product ID for tracking
    url.searchParams.set("utm_content", product.id)

    return url.toString()
  } catch (error) {
    console.error("Error building affiliate URL:", error)
    return baseUrl
  }
}

/**
 * Track affiliate link click
 * Called when user clicks "Visit Website" or external link
 */
export async function trackAffiliateClick(productId: string): Promise<void> {
  try {
    // Send tracking event to our API
    await fetch("/api/analytics/affiliate-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error("Failed to track affiliate click:", error)
  }
}

/**
 * Check if a product has an affiliate partnership
 */
export function hasAffiliatePartnership(codename: string): boolean {
  return Boolean(AFFILIATE_CONFIGS[codename]?.affiliateTag)
}

/**
 * Get affiliate commission info for display (if we want to show it)
 */
export function getAffiliateInfo(codename: string): string | null {
  if (!hasAffiliatePartnership(codename)) return null

  // Could return info like "We may earn a commission if you sign up"
  return "Affiliate link"
}
