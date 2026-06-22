"use client"

import { useState } from "react"

interface CheckoutButtonProps {
  tier: string
  label: string
  className?: string
  /** Where to send the buyer if Stripe checkout isn't enabled yet. */
  mailtoFallback: string
}

/**
 * Starts a Stripe Checkout session for a tier. While Stripe keys/prices are
 * not configured the API returns 503 and we transparently fall back to a
 * mailto contact flow — so the button works today and "just upgrades" to real
 * checkout the moment env vars land.
 */
export function CheckoutButton({
  tier,
  label,
  className,
  mailtoFallback,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      })

      if (res.ok) {
        const { url } = await res.json()
        if (url) {
          window.location.href = url
          return
        }
      }
      // Not configured / no price / error → contact flow.
      window.location.href = mailtoFallback
    } catch {
      window.location.href = mailtoFallback
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Starting checkout…" : label}
    </button>
  )
}
