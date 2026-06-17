# agents.tips Danish + Nordics SEO Attack Plan

> **For Hermes:** Use this as the working plan for agents.tips content and site structure.

**Goal:** Win Danish AI-intent traffic first, then expand into the Nordics with localized pages that convert.

**Architecture:** One English canonical SEO spine with country-specific satellites. Denmark is the first wedge because the market already has meaningful AI adoption and the search space is fragmented enough to win with better structure, trust, and local language. The site should funnel discovery into comparison pages, tool pages, workflow pages, and brief pages, with clear internal linking and hreflang for localization.

**Tech Stack:** Next.js app router, Supabase-backed directory data, `briefs`/`compare`/`workflows`/`tools` content types, sitemap generation, metadata templates.

---

## What we know from research

### Market signal
- Denmark already has enough AI adoption to support commercial intent.
- Competitor pages in Danish already target:
  - `AI værktøjer`
  - `ChatGPT alternativer`
  - `AI agent`
  - `AI kundeservice`
  - `AI marketing`
  - `AI softwareudvikling`
- Nordic adoption is strong enough to justify a regional rollout after Denmark.

### Current site surface on agents.tips
- `\/briefs` — editorial market intelligence
- `\/compare` — decision pages
- `\/workflows` — practical implementation pages
- `\/tools` — directory / category pages
- `\/products` — product inventory surface
- `\/submit-new` — supply acquisition
- `\/watch` — signal intake

### Strong existing content themes in the repo
- coding assistants
- autonomous agents
- workflow automation
- dev tools
- AI frameworks
- chat assistants
- research agents
- content creation
- open source / free / freemium / self-hosted
- CLI / VS Code / web app / desktop app / browser extension

---

## Relevant keyword universe

### 1) Core English hub keywords
These are the global umbrella terms that should anchor the site:
- AI agents
- AI agent directory
- AI tools
- AI tools directory
- coding assistants
- automation tools
- agentic workflows
- compare AI tools
- best AI agents
- AI software tools
- AI workflow tools

### 2) Danish head terms
These are the first market wedge:
- AI værktøjer
- AI-værktøjer
- AI agent
- AI-agenter
- AI assistenter
- kunstig intelligens værktøjer
- ChatGPT alternativer
- AI til virksomheder
- AI værktøjer til virksomheder
- AI værktøjer Danmark
- AI i praksis
- danske AI værktøjer
- europæiske AI alternativer
- GDPR-sikre AI værktøjer

### 3) Danish use-case keywords
These should become vertical landing pages:
- AI til marketing
- AI til SEO
- AI til kundeservice
- AI til salg
- AI til HR
- AI til økonomi
- AI til e-commerce
- AI til bureauer
- AI til konsulenter
- AI til softwareudvikling
- AI til møder
- AI til content creation
- AI til research

### 4) Danish comparison keywords
These are high-conversion pages:
- Cursor vs Claude Code
- Cursor vs GitHub Copilot
- Claude Code vs Copilot
- ChatGPT vs Claude
- ChatGPT alternativer til virksomheder
- AI agent vs chatbot
- AI værktøjer gratis
- AI værktøjer til små virksomheder
- AI værktøjer til teams

### 5) Nordic country variants
Use these for local satellites:
- Sweden: AI-verktyg, AI-agenter, ChatGPT-alternativ, AI för företag
- Norway: AI-verktøy, AI-agenter, ChatGPT-alternativer, AI for bedrifter
- Finland: tekoäly työkalut, AI-työkalut, ChatGPT-vaihtoehdot, tekoäly yrityksille

### 6) Intent modifiers that matter
These should be combined with the above terms:
- gratis / free
- open source
- self-hosted
- enterprise
- GDPR
- EU-hosted
- browser
- CLI
- VS Code
- terminal
- automation
- comparison
- alternatives
- for businesses / for companies

### 7) Brand / tool comparison keywords
These should map to comparison pages and tool pages:
- Cursor
- Claude Code
- GitHub Copilot
- Windsurf
- Aider
- Continue
- Devin
- OpenAI Codex
- AutoGPT
- LangChain
- CrewAI
- Replit Agent
- Gemini Code Assist
- Tabnine
- Bolt
- v0
- Lovable
- Cody
- Supermaven

---

## What to attack first

### Priority 1: Denmark
The goal is not to “cover AI.” The goal is to own the local buying intent.

#### Pages to build first
1. `\/denmark` or `\/dk` hub
2. `\/compare\/cursor-vs-claude-code-vs-copilot`
3. `\/compare\/chatgpt-vs-claude-vs-gemini`
4. `\/compare\/ai-vaerktoejer-for-virksomheder`
5. `\/workflows\/ai-til-marketing`
6. `\/workflows\/ai-til-kundeservice`
7. `\/workflows\/ai-til-softwareudvikling`
8. `\/briefs\/danmark-seo-wedge`

#### Why these first
- They match real Danish search language.
- They are commercial, not informational fluff.
- Competitors already prove demand exists.
- The SERP is fragmented enough to win with better page design and stronger trust signals.

### Priority 2: Nordic expansion
After Denmark, create localized hub pages for:
- Sweden
- Norway
- Finland

Each country should get:
- a hub page
- a comparison page set
- 3–5 vertical use-case pages
- localized metadata and copy

### Priority 3: Internal authority loops
Tie everything together:
- `briefs` drives editorial conviction
- `compare` converts high-intent decision traffic
- `workflows` captures practical implementation traffic
- `tools`/`products` act as the directory layer
- `submit-new` brings in supply

---

## Content architecture that should rank

### A. Country hubs
Each hub should answer:
- What is the best AI stack for this country?
- Which tools are safe, compliant, and practical?
- Which tools fit SMEs vs teams vs enterprise?
- What should a buyer compare first?

### B. Comparison pages
Each comparison page should contain:
- winner by use case
- pricing / deployment / language / compliance
- screenshots or product evidence
- “when to choose this” sections
- FAQ blocks around the exact query intent

### C. Workflow pages
These are the mid-funnel pages that can rank for practical intent:
- how to implement
- what to measure
- what to avoid
- what the rollback path is

### D. Tool pages
Every tool page should be optimized for:
- name + category
- exact tags
- deployment model
- language support
- pricing model
- use-case relevance

### E. Briefs
Use briefs for market analysis, not generic blog posts.
Examples:
- why Denmark is the wedge
- what Nordics should come next
- which categories are over-served or under-served
- what the site should publish next

---

## SEO attack sequence

### Phase 1: Keyword map
Build a spreadsheet with columns:
- keyword
- country
- language
- intent
- page type
- difficulty estimate
- conversion value
- current competitor strength
- target URL

### Phase 2: Cluster and assign pages
Group keywords into:
- country hubs
- comparison pages
- use-case pages
- compliance pages
- brand pages
- directories

### Phase 3: Publish Denmark first
Start with pages that have:
- clear commercial intent
- obvious internal-link support
- strong local language match
- visible trust/compliance angle

### Phase 4: Build the Nordic expansion pattern
Clone the winning page structure, not the wording.
Localize:
- title
- H1
- body copy
- examples
- FAQs
- trust signals
- outbound references

### Phase 5: Add supporting content
Use briefs and workflows to feed the hub:
- strategy briefs
- implementation guides
- comparison explainers
- glossary pages

### Phase 6: Measure and prune
Track:
- impressions
- CTR
- rankings by country
- conversions to tool clicks / submissions
- pages that attract traffic but not action

Kill or merge pages that:
- overlap too much
- get impressions but no clicks
- don’t support a broader cluster

---

## Suggested initial site map

- `/briefs`
- `/compare`
- `/workflows`
- `/tools`
- `/products`
- `/dk` or `/denmark`
- `/se`
- `/no`
- `/fi`
- `/compare/cursor-vs-claude-code-vs-copilot`
- `/compare/chatgpt-vs-claude-vs-gemini`
- `/workflows/ai-til-marketing`
- `/workflows/ai-til-kundeservice`
- `/workflows/ai-til-softwareudvikling`
- `/tools/ai-vaerktoejer-for-virksomheder`

---

## What will probably win first

### Best Danish traffic bets
- AI værktøjer
- ChatGPT alternativer
- AI til virksomheder
- AI til marketing
- AI til kundeservice
- AI til softwareudvikling
- GDPR-sikre AI værktøjer
- AI værktøjer til små virksomheder
- AI værktøjer til teams

### Best Nordic follow-on bets
- AI tools for businesses
- AI-verktyg for företag
- AI-verktøy for bedrifter
- tekoäly työkalut yrityksille
- AI comparison pages by country

---

## Risks

- Broad English keywords are likely too competitive to start with.
- Generic listicles will be hard to beat without a local trust angle.
- Translating English pages without changing intent will underperform.
- Too many weak pages will dilute the directory.

---

## Non-negotiables

- One canonical SEO spine.
- Country pages must be localized, not copied.
- Every page must map to a real search intent.
- Every comparison page must have a decision angle.
- Every brief must feed a page type that can convert.
- Every page must link into the directory, not live alone.

---

## Source anchors used in research

- DI: https://www.danskindustri.dk/globalassets/politik-og-analyser/opa-analyser/2025/halvdelen-af-virksomhederne-anvender-kunstig-intelligens-i-2025.pdf?v=260615
- SCB AI release: https://www.scb.se/en/finding-statistics/statistics-by-subject-area/research-and-the-digital-society/ovrigt/artificial-intelligence-in-sweden/pong/statistical-news/artificial-intelligence-in-sweden-2026
- Statistics Finland: https://stat.fi/en/publication/cm1hnps701dbm07w59uo0jw6u
- Danish competitor examples from search results:
  - https://adtention.dk/ai-vaerktoejer-den-komplette-guide-til-20-vaerktoejer-danske-virksomheder-faktisk-kan-bruge
  - https://www.ai-foralle.dk/ai-vaerktoejer
  - https://skrivsikkert.dk/gratis-ai-paa-dansk-de-bedste-vaerktojer-2026
  - https://www.ai-foralle.dk/ai-vaerktoejer
  - https://jonathanloew.dk/ai-top-100
  - https://businesswith.dk/ai-varktojer
  - https://www.danskindustri.dk/vi-radgiver-dig/virksomhedsregler-og-varktojer/ai/styrk-din-forretning-med-ai/ai-agenter-hvad-er-de-og-hvordan-fungerer-de-helt-simpelt/

---

## Next step
Build the Denmark hub and the first three comparison pages, then wire them into briefs, workflows, and the directory navigation.
