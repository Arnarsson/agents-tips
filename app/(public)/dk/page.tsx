import Link from "next/link"
import { ArrowRight, Languages, MapPinned, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Danmark | agents.tips",
  description:
    "Dansk AI-landingpage til værktøjer, sammenligninger og workflows med høj intent.",
  alternates: {
    canonical: "/dk",
  },
  openGraph: {
    locale: "da_DK",
    title: "Danmark | agents.tips",
    description:
      "Dansk AI-landingpage til værktøjer, sammenligninger og workflows med høj intent.",
  },
}

const highlights = [
  {
    title: "AI-værktøjer til virksomheder",
    href: "/compare/chatgpt-alternativer-for-virksomheder",
    detail: "Kontrol, GDPR og team-fit i samme beslutningsside.",
  },
  {
    title: "AI til marketing",
    href: "/workflows/ai-til-marketing",
    detail: "Content, automation og research uden støj.",
  },
  {
    title: "AI til kundeservice",
    href: "/workflows/ai-til-kundeservice",
    detail: "Support-automation med klar handoff til mennesker.",
  },
  {
    title: "AI til softwareudvikling",
    href: "/workflows/ai-til-softwareudvikling",
    detail: "IDE, terminal eller repo-agent — vælg rigtigt første gang.",
  },
]

export default function DenmarkPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Danmark først</Badge>
          <Badge variant="outline">Dansk SEO wedge</Badge>
        </div>
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPinned className="h-4 w-4" />
            agents.tips / dk
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Vind dansk AI-intent først.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Vi bygger den danske indgang til agents.tips med comparison pages,
            workflows og briefs, der matcher rigtig søgeintention — ikke fluffy
            generiske listicles.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/briefs/denmark-seo-wedge">
              Læs briefet
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/compare">
              Se comparison-siden
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-xl border bg-card p-5 transition hover:bg-muted/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="leading-7 text-muted-foreground">{item.detail}</p>
              </div>
              <Languages className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 rounded-2xl border bg-card p-6 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Hvad vi bygger</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            En dansk SEO-spine med landesider, comparisons og praktiske
            workflows.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Hvad der kommer først</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            AI-værktøjer til virksomheder, marketing, kundeservice og
            softwareudvikling.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Hvad det skal vinde</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Lokal intent, compliance-vinkel og nok struktur til at slå generiske
            internationale lister.
          </p>
        </div>
      </section>
    </main>
  )
}
