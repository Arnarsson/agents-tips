import Link from "next/link"
import { ArrowRight, GitCompareArrows, ShieldCheck } from "lucide-react"

import { starterComparisons } from "@/lib/content-machine/public-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NoirCard, NoirPanel, SignalBadge } from "@/components/agentic/noir"
import { NewsletterSignup } from "@/components/newsletter-signup"

export const metadata = {
  title: "Compare Agent Tools | Agent.tips",
  description:
    "Practical comparison guides for AI agents, coding assistants, automation tools, and agent infrastructure.",
  alternates: { canonical: "https://agents.tips/compare" },
  openGraph: {
    title: "Compare Agent Tools | Agent.tips",
    description:
      "Practical comparison guides for AI agents, coding assistants, automation tools, and agent infrastructure.",
    url: "https://agents.tips/compare",
    type: "website",
    images: ["/og-image.png"],
  },
}

export default function ComparePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <NoirPanel>
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap gap-2">
            <SignalBadge tone="amber">
              <GitCompareArrows className="h-3.5 w-3.5" />
              Agent.tips Compare
            </SignalBadge>
            <SignalBadge>decision support</SignalBadge>
          </div>
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="agentic-text-sheen text-4xl font-black leading-none md:text-6xl">
              Clear calls between agent tools.
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Comparison pages turn Watch signals, tool profiles, and workflow
              notes into practical buying and build decisions.
            </p>
          </div>
        </div>
      </NoirPanel>

      <section className="grid gap-4 lg:grid-cols-3">
        {starterComparisons.map((comparison) => (
          <NoirCard key={comparison.title}>
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">{comparison.status}</Badge>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {comparison.title}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {comparison.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {comparison.dimensions.map((dimension) => (
                <Badge key={dimension} variant="outline">
                  {dimension}
                </Badge>
              ))}
            </div>
            <Button asChild className="mt-5" size="sm" variant="outline">
              <Link href={`/compare/${comparison.slug}`}>
                Open comparison
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </NoirCard>
        ))}
      </section>

      <NoirPanel>
        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl space-y-2">
            <SignalBadge tone="amber">
              <ShieldCheck className="h-3.5 w-3.5" />
              Stay decision-ready
            </SignalBadge>
            <h2 className="text-2xl font-semibold tracking-tight">
              Get new comparisons as they publish.
            </h2>
            <p className="leading-7 text-muted-foreground">
              Weekly agent-tool comparisons and the Watch signals behind them.
              Or jump straight to{" "}
              <Link href="/watch" className="text-foreground underline underline-offset-4">
                live Watch signals
              </Link>
              .
            </p>
          </div>
          <div className="w-full md:max-w-sm">
            <NewsletterSignup source="compare" variant="compact" />
          </div>
        </div>
      </NoirPanel>
    </main>
  )
}
