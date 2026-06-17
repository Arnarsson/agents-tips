export type PublicWatchItem = {
  id: string
  title: string
  description: string | null
  source_url: string
  ecosystem: string | null
  language: string | null
  stars_24h: number | null
  trend_score: number | null
  authority_score: number | null
  tags: string[] | null
}

export type PublicBriefItem = {
  id: string
  section: string
  title: string
  commentary: string
  sort_order: number
}

export type PublicBrief = {
  id: string
  slug: string
  issue_number: number | null
  title: string
  subtitle: string | null
  summary: string | null
  body: string | null
  published_at: string | null
  brief_items: PublicBriefItem[]
}

export type PublicWorkflow = {
  id: string
  slug: string
  title: string
  summary: string | null
  body: string | null
  tags: string[] | null
}

export type PublicComparison = {
  id: string
  slug: string
  title: string
  status: string
  summary: string
  dimensions: string[]
  body: string
}

export const starterWatchItems: PublicWatchItem[] = [
  {
    id: "starter-coding-agent-routing",
    title: "Coding agents are becoming routing problems",
    description:
      "The interesting work is moving from single prompts into choosing which agent, context window, repo scope, and verification path should handle the job.",
    source_url: "/workflows/coding-agent-routing-checklist",
    ecosystem: "workflow",
    language: null,
    stars_24h: null,
    trend_score: 82,
    authority_score: 74,
    tags: ["coding-agents", "routing", "verification"],
  },
  {
    id: "starter-mcp-operational-layer",
    title: "MCP is turning tool access into an operations layer",
    description:
      "The useful question is no longer whether an agent can call tools. It is whether the tool surface is narrow, observable, reversible, and worth trusting.",
    source_url: "/workflows/mcp-server-review",
    ecosystem: "infrastructure",
    language: "TypeScript",
    stars_24h: null,
    trend_score: 76,
    authority_score: 68,
    tags: ["mcp", "tooling", "ops"],
  },
  {
    id: "starter-human-review-queue",
    title: "Human review is still the publishing moat",
    description:
      "Discovery can be automated. Publishing should stay reviewed, because the value is the judgment layer between a noisy feed and a durable tool page.",
    source_url: "/briefs/first-field-note",
    ecosystem: "editorial",
    language: null,
    stars_24h: null,
    trend_score: 71,
    authority_score: 80,
    tags: ["review-queue", "editorial", "seo"],
  },
]

export const starterBriefs: PublicBrief[] = [
  {
    id: "starter-first-field-note",
    slug: "first-field-note",
    issue_number: 1,
    title: "The agent stack needs fewer demos and better checks",
    subtitle:
      "A field note on routing, review queues, and why Watch should feed Tools instead of replacing it.",
    summary:
      "The first Arnarsson brief sets the shape: Watch discovers signal, Tools rank it, and Workflows turn it into something a builder can reuse.",
    published_at: "2026-05-27T00:00:00.000Z",
    body: `## The Signal

Most agent coverage still treats every launch like a standalone event. That is useful for awareness, but weak for builders. The better pattern is to track what keeps showing up across repos, product pages, and operator notes.

## Toolmarks

The durable pages should stay in Tools. A tool profile can rank, collect examples, and absorb updates over time. Watch is the intake queue, not the final destination.

## Workflow Rune

Every promising signal needs one practical recipe attached to it: what to try, what to measure, and what would make you reject it after an hour.

## Operator Notes

Ben's Bites and similar feeds are good discovery inputs. The value here is the second pass: original judgment, clean provenance, and a review step before anything becomes canonical.`,
    brief_items: [
      {
        id: "starter-first-field-note-signal",
        section: "the_signal",
        title: "Discovery is cheap. Judgment is scarce.",
        commentary:
          "The content machine should collect links and metadata aggressively, then slow down before publication.",
        sort_order: 1,
      },
      {
        id: "starter-first-field-note-workflow",
        section: "workflow_rune",
        title: "Promote only when there is a reusable recipe.",
        commentary:
          "A Watch item becomes more valuable when it explains how a builder would test, combine, or reject the tool.",
        sort_order: 2,
      },
    ],
  },
  {
    id: "starter-denmark-seo-wedge",
    slug: "denmark-seo-wedge",
    issue_number: 2,
    title: "Danmark er indgangen: vind den danske AI-intent først",
    subtitle:
      "Markedet er klart, sproget er skarpt, og konkurrencen er stadig fragmenteret.",
    summary:
      "Danmark er det bedste første marked for agents.tips: høj AI-adoption, stærk lokal intent og et klart åbent felt for danske sammenligninger.",
    published_at: "2026-06-16T00:00:00.000Z",
    body: `## Hvad data siger

Danmark er allerede langt inde i AI-adoption. DI’s analyse siger, at omkring en tredjedel af virksomhederne bruger AI i dag, og at andelen skal ramme halvdelen i 2025. Statistics Sweden’s 2026 AI release viser også, at Danmark lå øverst i Norden med 42% enterprise AI-brug i 2025.

Det betyder noget, fordi det her ikke er et undervisningsmarked. Det er et marked, der leder efter den næste bedre løsning.

## Hvor den danske søgeintention samler sig

De stærkeste intents er praktiske og lokale:

- **AI værktøjer** / **AI-værktøjer**
- **AI agent** / **AI agenter**
- **ChatGPT alternativer**
- **AI til marketing**, **SEO**, **kundeservice**, **salg**, **HR**, **økonomi**
- **GDPR / europæiske alternativer**
- **AI til danske virksomheder**

De live SERP’er viser allerede danske listicles, sammenligninger og niche-guides. Det betyder, at keyword-settet er ægte, men markedet er stadig fragmenteret nok til, at en renere directory kan vinde.

## Hvor vi kan vinde trafik først

1. **Lokaliserede comparison pages**
   - Cursor vs Claude Code vs Copilot
   - ChatGPT-alternativer til danske teams
   - AI-værktøjer til marketing, økonomi, support og drift

2. **Landesider**
   - Danmark hub med danske keywords i titles, H1’er og metadata
   - SME-fokuserede sider med trust, ROI og compliance

3. **Use-case sider med dansk vinkel**
   - AI til bureauer
   - AI til e-commerce
   - AI til konsulenter
   - AI til softwareteams

4. **Compliance/trust content**
   - GDPR-venlig AI
   - Europæiske alternativer
   - Hvad man skal kigge efter i hosted vs self-hosted værktøjer

## Den site-struktur, der bør rangere

- agents.tips/briefs → market intelligence and editorial conviction
- agents.tips/tools → the directory itself
- agents.tips/compare → high-intent decisions
- agents.tips/workflows → practical implementation pages
- agents.tips/submit-new → supply-side acquisition

## Hvorfor det virker

Det danske marked har nok adoption til at gøre det relevant, nok sprogspecificitet til at skille sig fra globale generiske sider, og nok compliance-uro til at belønne en troværdig kurator. Det er åbningen.

## Sources

- [DI: Halvdelen af virksomhederne anvender kunstig intelligens i 2025](https://www.danskindustri.dk/globalassets/politik-og-analyser/opa-analyser/2025/halvdelen-af-virksomhederne-anvender-kunstig-intelligens-i-2025.pdf?v=260615)
- [Statistics Sweden: Use of AI growing in both the enterprise sector and among the population](https://www.scb.se/en/finding-statistics/statistics-by-subject-area/research-and-the-digital-society/ovrigt/artificial-intelligence-in-sweden/pong/statistical-news/artificial-intelligence-in-sweden-2026)
- [Statistics Finland: Of enterprises 38 per cent used Artificial Intelligence technologies in 2025](https://stat.fi/en/publication/cm1hnps701dbm07w59uo0jw6u)`,
    brief_items: [
      {
        id: "starter-denmark-seo-wedge-market",
        section: "market_read",
        title: "Denmark already has enough AI adoption to support commercial intent.",
        commentary:
          "We are not trying to educate a cold market; we are intercepting buyers who already know the category and are now choosing between tools.",
        sort_order: 1,
      },
      {
        id: "starter-denmark-seo-wedge-traffic",
        section: "traffic_wedge",
        title: "Win the Danish-language long tail before fighting the broad English head terms.",
        commentary:
          "A directory with Danish metadata, compliance framing, and comparison pages can outrank generic global listicles on local queries.",
        sort_order: 2,
      },
    ],
  },
  {
    id: "starter-nordics-traffic-map",
    slug: "nordics-traffic-map",
    issue_number: 3,
    title: "Nordics næste: brug en engelsk hub og lokale satellitter",
    subtitle:
      "Udvid land for land uden at kopiere den samme side i fire dialekter.",
    summary:
      "Sverige, Finland og Norge er alle stærke follow-on markeder, når Danmark er live; trikset er at lokalisere intent, ikke bare oversætte.",
    published_at: "2026-06-16T00:00:00.000Z",
    body: `## Den regionale form

Nordics er usædvanligt klar til AI-discovery. I de seneste officielle releases viste Sverige 35% enterprise AI-brug i 2025, Finland 38% og Norge 29% i SCB’s sammenligningstabel. Det er nok aktivitet til dedikerede landesider og comparisons.

## Hvordan søgeadfærden skifter på tværs af regionen

- **Danmark**: stærkeste mulighed for danske og trust-tunge sider.
- **Sverige**: stærk B2B-adoption og plads til engelsk-first comparison pages.
- **Finland**: meget god enterprise AI-adoption; lokalsprog betyder noget, men engelske sider kan stadig fungere til tech- og business-queries.
- **Norge**: lidt lavere adoption, men gode muligheder omkring praktiske use cases og lokale business workflows.

## Hvor vi kan vinde

### 1) Engelsk hub, lokale satellitter
Brug ét centralt editorial framework og spin landesider ud, der målretter:

- AI tools in Denmark
- AI tools in Sweden
- AI tools in Finland
- AI tools in Norway

### 2) Vertikale sider
Det samme værktøj kan rangere for forskellige ting i forskellige lande. Eksempler:

- AI for marketing
- AI for customer service
- AI for software teams
- AI for finance and administration
- AI for education and knowledge work

### 3) Local trust signals
Each country page should answer:

- Is it GDPR-safe?
- Is it hosted in Europe?
- Does it support Danish/Swedish/Finnish/Norwegian use cases?
- Is there a self-hosted or enterprise path?

## Traffic priority

1. Denmark
2. Sweden
3. Finland
4. Norway

That sequence gives us the best blend of adoption, language fit, and search clarity.

## What the site should publish next

- One country hub per market
- One comparison page per high-intent tool choice
- One use-case brief per industry
- One workflow page per repeatable buying decision

## Sources

- [Statistics Sweden: Use of AI growing in both the enterprise sector and among the population](https://www.scb.se/en/finding-statistics/statistics-by-subject-area/research-and-the-digital-society/ovrigt/artificial-intelligence-in-sweden/pong/statistical-news/artificial-intelligence-in-sweden-2026)
- [Statistics Finland: Of enterprises 38 per cent used Artificial Intelligence technologies in 2025](https://stat.fi/en/publication/cm1hnps701dbm07w59uo0jw6u)
- [Statistics Sweden comparison table in the same release: Denmark 42%, Finland 38%, Sweden 35%, Norway 29%](https://www.scb.se/en/finding-statistics/statistics-by-subject-area/research-and-the-digital-society/ovrigt/artificial-intelligence-in-sweden/pong/statistical-news/artificial-intelligence-in-sweden-2026)`,
    brief_items: [
      {
        id: "starter-nordics-traffic-map-market",
        section: "regional_read",
        title: "The Nordics are one cluster, but the entry points are not identical.",
        commentary:
          "We should use one shared product spine and localize the pages that carry the search intent.",
        sort_order: 1,
      },
      {
        id: "starter-nordics-traffic-map-playbook",
        section: "expansion_playbook",
        title: "English hub first, local-language pages second.",
        commentary:
          "That keeps the editorial workload sane while still letting us rank on the market-specific queries that actually convert.",
        sort_order: 2,
      },
    ],
  },
]

export const starterWorkflows: PublicWorkflow[] = [
  {
    id: "starter-coding-agent-routing-checklist",
    slug: "coding-agent-routing-checklist",
    title: "Coding agent routing checklist",
    summary:
      "A practical review path for deciding when to use chat, an IDE agent, a repo agent, or a background automation.",
    tags: ["coding-agents", "review", "verification"],
    body: `## Use this when

You have more than one coding assistant available and the default choice is starting to matter.

## Checks

- Use chat for isolated explanations and small snippets.
- Use an IDE agent when the edit needs local context and quick human review.
- Use a repo agent when the task crosses files, tests, and pull request context.
- Use background automation only when the acceptance criteria are boring and testable.

## Reject it when

The agent cannot show a diff, cannot run the relevant check, or cannot explain the rollback path.`,
  },
  {
    id: "starter-ai-til-marketing",
    slug: "ai-til-marketing",
    title: "AI til marketing",
    summary:
      "Et praktisk workflow til at vælge mellem content, automation og research-værktøjer uden at drukne i dashboards.",
    tags: ["danish", "marketing", "workflow"],
    body: `## Brug den her når

Du skal finde den rigtige AI-stack til kampagner, content, lead-gen eller analyse.

## Tjek

- Kan værktøjet producere noget brugbart på dansk?
- Kan det kobles på eksisterende workflow uden at skabe ekstra manuel oprydning?
- Kan teamet måle effekt i output, tid sparet eller klik?
- Er der en klar fallback, hvis modellen fejler eller bliver for dyr?

## Drop den når

Det kun er en pæn demo uden setup, måling eller ejer.`,
  },
  {
    id: "starter-ai-til-kundeservice",
    slug: "ai-til-kundeservice",
    title: "AI til kundeservice",
    summary:
      "En dansk guide til support-automatisering, agent handoff og hvor human review stadig skal sidde i loopet.",
    tags: ["danish", "support", "ops"],
    body: `## Brug den her når

Du vil reducere svartid uden at miste kvalitet eller tone.

## Tjek

- Hvilke sager må AI svare på, og hvilke skal eskaleres?
- Kan du logge, hvad der blev sagt, og hvorfor?
- Er der en tydelig handoff til et menneske?
- Kan løsningen rulles tilbage hurtigt?

## Drop den når

Svarene bliver generiske, eller når systemet ikke kan forklare sine valg.`,
  },
  {
    id: "starter-ai-til-softwareudvikling",
    slug: "ai-til-softwareudvikling",
    title: "AI til softwareudvikling",
    summary:
      "Hvordan danske teams vælger mellem IDE, terminal og repo-agent uden at miste review-kontrollen.",
    tags: ["danish", "engineering", "coding-agents"],
    body: `## Brug den her når

Du skal vælge den rigtige assistant til bugfix, refactor eller repo-arbejde.

## Tjek

- Er opgaven lokal, repo-baseret eller batch-automatiseret?
- Kan værktøjet vise diff og forklare ændringerne?
- Er test- og rollback-pathen tydelig?
- Passer værktøjet til teamets eksisterende GitHub/IDE flow?

## Drop den når

Det ser hurtigt ud i demoen, men bliver dyrt i review og vedligehold.`,
  },
  {
    id: "starter-mcp-server-review",
    slug: "mcp-server-review",
    title: "MCP server review",
    summary:
      "A short operating checklist for deciding whether an MCP server should be trusted by an agent.",
    tags: ["mcp", "security", "ops"],
    body: `## Use this when

You are adding a new MCP server to an agent setup.

## Checks

- List every tool the server exposes.
- Confirm which tools can write, delete, spend money, or send messages.
- Prefer narrow tool scopes over broad admin access.
- Log tool calls where the result affects user data or production state.

## Reject it when

The server requires broad credentials for a narrow job, hides side effects, or cannot be disabled quickly.`,
  },
  {
    id: "starter-content-machine-review-queue",
    slug: "content-machine-review-queue",
    title: "Content machine review queue",
    summary:
      "A workflow for turning noisy discovery sources into reviewed Watch items, briefs, and durable tool pages.",
    tags: ["content-machine", "seo", "editorial"],
    body: `## Use this when

You want discovery to run often without letting raw feed content leak directly into published pages.

## Checks

- Store source URLs, titles, dates, extracted links, and metadata.
- Keep newsletter and feed sources as inspiration, not prose sources.
- Promote only items with a clear tool, workflow, or comparison destination.
- Add review notes before publication.

## Reject it when

The item only repeats launch copy, lacks a canonical source, or cannot become useful after the first news cycle.`,
  },
]

export const starterComparisons: PublicComparison[] = [
  {
    id: "starter-cursor-claude-code-copilot",
    slug: "cursor-vs-claude-code-vs-copilot",
    title: "Cursor vs Claude Code vs Copilot",
    status: "Starter",
    summary:
      "Best for deciding whether the next coding workflow belongs in the IDE, terminal, or pull request loop.",
    dimensions: ["context", "review", "cost", "team fit"],
    body: `## Short call

Use Cursor when the edit is local, visual, and benefits from IDE context. Use Claude Code when the work is repo-shaped and terminal-native. Use Copilot when the team wants the lowest-friction assistant inside an existing GitHub workflow.

## What to test

- Give each tool the same bug fix and count how much review work remains.
- Check whether it can explain the files it touched.
- Run the project tests before accepting the diff.
- Measure cost against actual merged work, not autocomplete volume.

## Watch for

The wrong tool will look fast in the first 10 minutes and expensive in the last 30. The review path matters more than the demo path.`,
  },
  {
    id: "starter-chatgpt-alternativer-for-virksomheder",
    slug: "chatgpt-alternativer-for-virksomheder",
    title: "ChatGPT alternativer for virksomheder",
    status: "Starter",
    summary:
      "En dansk beslutningsside til teams, der vil have mere kontrol, compliance eller bedre workflow-fit end et standard ChatGPT setup.",
    dimensions: ["GDPR", "teams", "pris", "kontrol"],
    body: `## Kort svar

Vælg ChatGPT når du vil have den bredeste general-purpose assistant. Vælg alternativer når du har brug for bedre compliance, bedre team-flow eller mindre vendor lock-in.

## Hvad du skal teste

- Kan løsningen bruges sikkert internt?
- Hvordan ser logging og audit ud?
- Passer prisen til teamets faktiske brug?
- Er der en tydelig rollefordeling mellem menneske og model?

## Pas på

Det billigste valg er sjældent det billigste i drift, hvis review og governance bliver en eftertanke.`,
  },
  {
    id: "starter-n8n-make-zapier",
    slug: "n8n-vs-make-vs-zapier-agent-workflows",
    title: "n8n vs Make vs Zapier for agent workflows",
    status: "Starter",
    summary:
      "Automation platforms are becoming agent control planes. The trade-off is speed versus ownership.",
    dimensions: ["hosting", "connectors", "AI steps", "ops"],
    body: `## Short call

Use Zapier for broad SaaS coverage and quick internal automation. Use Make when the flow needs visual branching and better operational shape. Use n8n when ownership, self-hosting, and custom agent steps matter.

## What to test

- Build one workflow with a model call, a database write, and an approval step.
- Check retry behavior and logs before judging the UI.
- Confirm where secrets live.
- Price the workflow at the expected monthly run volume.

## Watch for

Agent workflows fail in boring places: rate limits, missing approvals, weak logs, and unclear ownership of credentials.`,
  },
  {
    id: "starter-mcp-direct-api",
    slug: "mcp-servers-vs-direct-api-tools",
    title: "MCP servers vs direct API tools",
    status: "Workflow",
    summary:
      "Use this when deciding whether agent tool access should go through MCP or stay as a narrow integration.",
    dimensions: ["permissions", "logging", "scope", "rollback"],
    body: `## Short call

Use MCP when multiple clients need the same tool surface and the permissions can stay narrow. Use direct API tools when the integration is small, critical, and easier to audit in code.

## What to test

- List every write-capable tool exposed to the agent.
- Confirm logs show inputs, outputs, and side effects.
- Check whether a single action can spend money, delete data, or message users.
- Disable the server and verify the system fails closed.

## Watch for

Convenient tool access is not automatically good operations. A broad MCP server can turn a simple task into an oversized trust boundary.`,
  },
]

export function getStarterBrief(slug: string) {
  return starterBriefs.find((brief) => brief.slug === slug) ?? null
}

export function getStarterWorkflow(slug: string) {
  return starterWorkflows.find((workflow) => workflow.slug === slug) ?? null
}

export function getStarterComparison(slug: string) {
  return (
    starterComparisons.find((comparison) => comparison.slug === slug) ?? null
  )
}
