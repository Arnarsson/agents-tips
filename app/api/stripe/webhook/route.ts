import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"

import { createAdminClient } from "@/db/supabase/admin"
import { getTier, isStripeConfigured, stripe } from "@/lib/stripe"

export const dynamic = "force-dynamic"

/**
 * Stripe webhook. Verifies the signature, then on a completed checkout marks
 * the sponsorship active and (for featured/category tiers) flips the product
 * to featured with an expiry. Requires STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get("stripe-signature")
  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 })
  }

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err)
    return NextResponse.json({ error: "bad_signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const tier = getTier(session.metadata?.tier ?? "")
  if (!tier) {
    return NextResponse.json({ received: true, note: "unknown_tier" })
  }

  const admin = createAdminClient()
  if (!admin) {
    console.error("Webhook: admin client unavailable (missing service role)")
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 })
  }

  const productId = session.metadata?.product_id || null
  const category = session.metadata?.category || null
  const now = new Date()
  const periodEnd =
    tier.featuredDays > 0
      ? new Date(now.getTime() + tier.featuredDays * 86_400_000)
      : null

  // 1. Record the sale (idempotent on stripe_session_id).
  const { error: ledgerError } = await admin.from("sponsorships").upsert(
    {
      product_id: productId,
      tier: tier.id,
      category,
      status: "active",
      amount: session.amount_total,
      currency: session.currency ?? "usd",
      buyer_email: session.customer_details?.email ?? session.customer_email,
      stripe_session_id: session.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      stripe_subscription_id:
        typeof session.subscription === "string"
          ? session.subscription
          : null,
      period_start: now.toISOString(),
      period_end: periodEnd?.toISOString() ?? null,
      updated_at: now.toISOString(),
    },
    { onConflict: "stripe_session_id" }
  )

  if (ledgerError) {
    console.error("Webhook: failed to record sponsorship:", ledgerError)
    return NextResponse.json({ error: "ledger_write_failed" }, { status: 500 })
  }

  // 2. Grant the placement for featured/category tiers.
  if (productId && tier.featuredDays > 0) {
    const { error: productError } = await admin
      .from("products")
      .update({
        featured: true,
        featured_until: periodEnd?.toISOString() ?? null,
        sponsor_tier: tier.id,
      })
      .eq("id", productId)

    if (productError) {
      console.error("Webhook: failed to feature product:", productError)
      // Sale is recorded; surface the failure for retry/manual fix.
      return NextResponse.json(
        { error: "feature_update_failed" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
