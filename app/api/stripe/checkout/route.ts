import { NextRequest, NextResponse } from "next/server"

import {
  getPriceId,
  getTier,
  isStripeConfigured,
  stripe,
} from "@/lib/stripe"

export const dynamic = "force-dynamic"

/**
 * Creates a Stripe Checkout Session for a tier and returns its URL.
 * POST { tier: "featured" | "category_sponsor" | ..., productId?, category?, email? }
 *
 * Until STRIPE_SECRET_KEY + price ids are set, responds 503 so the UI can fall
 * back to a mailto/contact flow.
 */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json(
      { error: "not_configured", message: "Checkout is not enabled yet." },
      { status: 503 }
    )
  }

  let body: {
    tier?: string
    productId?: string
    category?: string
    email?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const tier = getTier(body.tier ?? "")
  if (!tier) {
    return NextResponse.json({ error: "unknown_tier" }, { status: 400 })
  }

  const priceId = getPriceId(tier)
  if (!priceId) {
    return NextResponse.json(
      { error: "price_not_configured", message: `Set ${tier.priceEnv}.` },
      { status: 503 }
    )
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://agents.tips"

  try {
    const session = await stripe.checkout.sessions.create({
      mode: tier.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email,
      success_url: `${siteUrl}/advertise?status=success&tier=${tier.id}`,
      cancel_url: `${siteUrl}/advertise?status=canceled`,
      // Echoed back verbatim on the webhook so we know what was bought.
      metadata: {
        tier: tier.id,
        product_id: body.productId ?? "",
        category: body.category ?? "",
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe checkout error:", err)
    return NextResponse.json({ error: "stripe_error" }, { status: 502 })
  }
}
