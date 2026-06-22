import Stripe from "stripe"

/**
 * Server-only Stripe client. Returns null when STRIPE_SECRET_KEY is absent so
 * the app builds and runs (with checkout disabled) until keys are provided.
 */
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    })
  : null

export const isStripeConfigured = () => stripe !== null

/**
 * Paid tiers. Each maps to a Stripe Price created in the dashboard; the price
 * id is supplied via env so no secrets live in the repo. `mode` decides
 * subscription vs one-off (sponsored reviews are one-off).
 */
export type TierId =
  | "verified"
  | "featured"
  | "category_sponsor"
  | "sponsored_review"

export interface TierConfig {
  id: TierId
  label: string
  priceEnv: string
  mode: "subscription" | "payment"
  /** Days of featured placement granted on successful payment (0 = none). */
  featuredDays: number
}

export const TIERS: Record<TierId, TierConfig> = {
  verified: {
    id: "verified",
    label: "Verified Listing",
    priceEnv: "STRIPE_PRICE_VERIFIED",
    mode: "subscription",
    featuredDays: 0,
  },
  featured: {
    id: "featured",
    label: "Featured Listing",
    priceEnv: "STRIPE_PRICE_FEATURED",
    mode: "subscription",
    featuredDays: 31,
  },
  category_sponsor: {
    id: "category_sponsor",
    label: "Category Sponsorship",
    priceEnv: "STRIPE_PRICE_CATEGORY",
    mode: "subscription",
    featuredDays: 31,
  },
  sponsored_review: {
    id: "sponsored_review",
    label: "Sponsored Review",
    priceEnv: "STRIPE_PRICE_REVIEW",
    mode: "payment",
    featuredDays: 0,
  },
}

export function getTier(id: string): TierConfig | null {
  return (TIERS as Record<string, TierConfig>)[id] ?? null
}

export function getPriceId(tier: TierConfig): string | undefined {
  return process.env[tier.priceEnv]
}
