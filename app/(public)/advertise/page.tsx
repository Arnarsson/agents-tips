import Link from "next/link"
import { Check, Crown, Megaphone, Sparkles, Star } from "lucide-react"

import { CheckoutButton } from "@/components/checkout-button"

export const metadata = {
  title: "Advertise on agents.tips — Featured Listings & Sponsorships",
  description:
    "Reach developers choosing their AI agent stack. Featured listings, category sponsorships, and sponsored reviews on agents.tips. Limited slots.",
  alternates: { canonical: "https://agents.tips/advertise" },
  openGraph: {
    title: "Advertise on agents.tips — Featured Listings & Sponsorships",
    description:
      "Reach developers choosing their AI agent stack. Featured listings, category sponsorships, and sponsored reviews.",
    url: "https://agents.tips/advertise",
    type: "website",
    images: ["/og-image.png"],
  },
}

// Featured listings are intentionally scarce — this drives pricing power and is
// honest at any traffic level (we sell placement, not promised clicks).
const FEATURED_SLOTS_TOTAL = 8
const FEATURED_SLOTS_TAKEN = 4
const FEATURED_SLOTS_LEFT = FEATURED_SLOTS_TOTAL - FEATURED_SLOTS_TAKEN

const TIERS = [
  {
    id: "verified",
    name: "Verified Listing",
    icon: Star,
    price: "$29",
    cadence: "/mo",
    annual: "$290/yr — 2 months free",
    audience: "Solo devs · indie tools · OSS with a paid tier",
    cta: "Claim your listing",
    featured: false,
    perks: [
      "Verified badge on your listing",
      "Claim & edit your own profile",
      "Logo + screenshots + up to 3 links",
      "Basic click analytics",
    ],
  },
  {
    id: "featured",
    name: "Featured Listing",
    icon: Sparkles,
    price: "$249",
    cadence: "/mo",
    annual: "$2,490/yr — 2 months free",
    audience: "Funded AI-tool vendors who want developer reach",
    cta: "Reserve a featured slot",
    featured: true,
    perks: [
      "Everything in Verified",
      "Top-of-category pin + homepage carousel",
      "“Featured” badge across the directory",
      "Full multimedia profile",
      "Inclusion in relevant comparison pages",
      "Monthly performance email",
    ],
  },
  {
    id: "category_sponsor",
    name: "Category Sponsorship",
    icon: Crown,
    price: "$750",
    cadence: "/mo",
    annual: "$7,500/yr — 2 months free",
    audience: "One vendor per category — exclusive ownership",
    cta: "Own a category",
    featured: false,
    perks: [
      "Exclusive “Sponsored by” on one category",
      "Pinned #1 placement in that category",
      "One sponsored comparison article / quarter",
      "Newsletter mention",
      "Logo in category navigation",
    ],
  },
]

export default function AdvertisePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
      {/* Hero */}
      <header className="flex flex-col gap-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-500">
          Advertise on agents.tips
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Reach developers at the moment they pick their agent stack
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          agents.tips is where engineers compare AI coding agents and automation
          tools before they commit. Put your tool in front of high-intent buyers
          with a featured listing, category sponsorship, or sponsored review.
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-medium">
            {FEATURED_SLOTS_LEFT} of {FEATURED_SLOTS_TOTAL} featured slots left
          </span>
        </div>
      </header>

      {/* Pricing tiers */}
      <section className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => {
          const Icon = tier.icon
          return (
            <div
              key={tier.name}
              className={`relative flex flex-col gap-5 rounded-2xl border p-6 ${
                tier.featured
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
                  : "border-border"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-semibold">{tier.name}</h2>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.cadence}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.annual}
                </p>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {tier.audience}
              </p>
              <ul className="flex flex-col gap-2.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton
                tier={tier.id}
                label={tier.cta}
                mailtoFallback={`mailto:hello@agents.tips?subject=agents.tips%20${encodeURIComponent(
                  tier.name
                )}`}
                className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${
                  tier.featured
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border border-border hover:bg-muted"
                }`}
              />
            </div>
          )
        })}
      </section>

      {/* À la carte */}
      <section className="flex flex-col gap-4 rounded-2xl border border-border p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Megaphone className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
          <div>
            <h2 className="text-lg font-semibold">
              Sponsored review or newsletter slot
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              No commitment. A dedicated, clearly-labelled sponsored review of
              your tool, or a top slot in the weekly newsletter. The lowest-risk
              way to try agents.tips before going recurring.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">$500</span>
            <span className="text-muted-foreground">/ placement</span>
          </div>
          <CheckoutButton
            tier="sponsored_review"
            label="Book a placement"
            mailtoFallback="mailto:hello@agents.tips?subject=agents.tips%20sponsored%20review"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
          />
        </div>
      </section>

      {/* Trust / close */}
      <section className="flex flex-col gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          We sell placement and scarcity, not promised clicks. Listings are
          clearly labelled. Editorial reviews stay independent.
        </p>
        <p className="text-sm">
          Questions or a custom package?{" "}
          <Link
            href="mailto:hello@agents.tips"
            className="font-semibold text-emerald-500 underline-offset-4 hover:underline"
          >
            hello@agents.tips
          </Link>
        </p>
      </section>
    </main>
  )
}
