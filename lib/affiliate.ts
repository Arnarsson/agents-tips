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
 * 
 * Task 7-203: Phase 1 - Foundation affiliate partnerships
 */
export const AFFILIATE_CONFIGS: AffiliateConfig = {
  // === PHASE 1: PRIORITY AFFILIATES (7-203) ===
  
  // Cursor - AI Code Editor
  "cursor-composer": {
    // TODO: Sign up at cursor.sh (check for partner/affiliate program)
    // Update with actual affiliate tag once enrolled
    affiliateTag: "ref=agentstips", // PLACEHOLDER - Update with actual tag
    utmCampaign: "cursor_partnership",
  },
  
  // Windsurf - Agentic IDE by Codeium
  windsurf: {
    // TODO: Check Codeium partner program at codeium.com/partners
    // Update with actual affiliate tag once enrolled
    affiliateTag: "ref=agentstips", // PLACEHOLDER - Update with actual tag
    utmCampaign: "windsurf_partnership",
  },
  
  // ElevenLabs - AI Voice Generation
  // ✅ Has confirmed affiliate program: elevenlabs.io/affiliates (22% for 12 months)
  elevenlabs: {
    // TODO: Sign up at https://elevenlabs.io/affiliates
    // Get unique affiliate link or ref code
    affiliateTag: "ref=XXXX", // REPLACE with actual ElevenLabs affiliate code
    utmCampaign: "elevenlabs_partnership",
  },
  
  // Jasper - AI Content Platform
  jasper: {
    // TODO: Contact Jasper for partnership opportunities
    // Check jasper.ai for affiliate/partner program
    affiliateTag: "ref=XXXX", // REPLACE with actual Jasper affiliate code
    utmCampaign: "jasper_partnership",
  },
  
  // Copy.ai - AI Writing Assistant
  "copy-ai": {
    // TODO: Contact Copy.ai for affiliate program
    // Previous affiliate page not found, may need direct contact
    affiliateTag: "ref=XXXX", // REPLACE with actual Copy.ai affiliate code
    utmCampaign: "copyai_partnership",
  },
  
  // Make - Visual Automation Platform (formerly Integromat)
  make: {
    // TODO: Sign up at make.com/en/partners
    // Note: May require integration partner status, not traditional affiliate
    affiliateTag: "ref=XXXX", // REPLACE with actual Make referral code
    utmCampaign: "make_partnership",
  },
  
  // Zapier - Workflow Automation
  "zapier-ai": {
    // TODO: Zapier has Integration Partner Program (for app builders)
    // For referral marketing, contact Zapier directly
    // See: zapier.com/developer-platform/partner-program
    affiliateTag: "ref=XXXX", // REPLACE with actual Zapier referral code
    utmCampaign: "zapier_partnership",
  },
  
  // === EXISTING CONFIGURATIONS ===
  
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
