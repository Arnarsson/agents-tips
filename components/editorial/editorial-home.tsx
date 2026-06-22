import Link from "next/link"
import { Search } from "lucide-react"

import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { fromSnakeCase } from "@/lib/tag-label-utils"
import { NewsletterSignup } from "@/components/newsletter-signup"

import { EditorialHeader } from "./editorial-header"
import { EditorialCard } from "./editorial-card"

interface EditorialHomeProps {
  products: Product[]
  categories: Array<[string, Product[]]>
  searchQuery?: string
}

export function EditorialHome({
  products,
  categories,
  searchQuery = "",
}: EditorialHomeProps) {
  const hasSearch = searchQuery.trim().length > 0
  const featured = (
    products.filter((p) => p.featured).length > 0
      ? products.filter((p) => p.featured)
      : [...products].sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
  ).slice(0, 3)

  const categoryNames = categories.slice(0, 7).map(([name]) => name)

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <EditorialHeader />

        {/* hero */}
        <section className="py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            The AI agent directory · {products.length} reviewed
          </p>
          <h1 className="mt-4 font-serif text-[52px] font-medium leading-[0.9] tracking-tight md:text-[104px]">
            Find the agent stack
            <br />
            worth <span className="italic text-primary">shipping.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Hand-reviewed AI agents and coding tools, scored and compared. No
            pay-to-rank, no 50-tab research spiral.
          </p>
          <form action="/" className="mt-8 flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="search"
                defaultValue={searchQuery}
                placeholder="Search tools — e.g. coding agents, MCP, local models"
                className="w-full rounded-full border border-border bg-card py-3.5 pl-11 pr-5 text-base outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </section>

        {/* filter bar */}
        <div className="sticky top-0 z-20 -mx-6 flex items-center gap-3 overflow-x-auto border-y border-border bg-background/90 px-6 py-3 backdrop-blur">
          <Link
            href="/"
            className={cn(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition",
              !hasSearch
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </Link>
          {categoryNames.map((name) => {
            const active = searchQuery.toLowerCase() === name.toLowerCase()
            return (
              <Link
                key={name}
                href={`/?search=${encodeURIComponent(name)}`}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition",
                  active
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {fromSnakeCase(name)}
              </Link>
            )
          })}
        </div>

        {/* featured */}
        {featured.length > 0 && !hasSearch && (
          <section className="pt-10">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="font-serif text-xl">Featured</h2>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Sponsored
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {featured.map((p) => (
                <EditorialCard key={`feat-${p.id}`} product={p} featured />
              ))}
            </div>
          </section>
        )}

        {/* all tools */}
        <section className="pt-12">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-serif text-xl">
              {hasSearch ? `Results for “${searchQuery}”` : "All tools"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <EditorialCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted-foreground">
              No tools matched “{searchQuery}”. Try a broader term or{" "}
              <Link href="/" className="text-primary">
                browse all tools
              </Link>
              .
            </p>
          )}
        </section>

        {/* newsletter band */}
        <section className="my-12 rounded-3xl bg-foreground px-8 py-10 text-center text-background">
          <h2 className="font-serif text-3xl md:text-4xl">
            The best new agents, every week.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-background/70">
            Join 4,000+ builders. One short email, new tools scored. No spam.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <NewsletterSignup source="home-band" variant="compact" />
          </div>
        </section>

        {/* footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-sm text-muted-foreground md:flex-row">
          <span className="font-serif text-lg text-foreground">
            agents<span className="text-primary">.</span>tips
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/products">Tools</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/submit-new">Submit</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/feed.xml">RSS</Link>
          </div>
          <span>© 2026 agents.tips</span>
        </footer>
      </div>
    </div>
  )
}
