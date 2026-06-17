# Agent.tips Content Machine Plan

Agent.tips is moving from a static AI agents directory into a tool, repo, workflow, and editorial intelligence engine.

## Positioning

- **Agent.tips** is the database, SEO system, and public product.
- **Arnarsson** is the editorial alter ego and operator voice.
- **Tools** are the evergreen SEO pages.
- **Watch** is the live radar for repos, tools, and workflow signals.
- **Briefs** are the Arnarsson editorial layer.
- **Workflows** are the practical recipes that make the site defensible.

## Core Routes

```text
/tools       Evergreen tool profiles
/watch       Fresh repo/tool/workflow trend radar
/briefs      Arnarsson briefs and field notes
/workflows   Practical agent stack recipes
/compare     High-intent comparison pages
```

The existing database can keep the `products` table for now. The public language should say "tools."

The public routes must stay useful before Supabase is configured. Starter
Watch items, Briefs, Workflows, and Comparisons live in
`lib/content-machine/public-content.ts` and are replaced by Supabase data when
published rows exist.

## Editorial Rule

Use Ben's Bites and similar feeds for source discovery, editorial structure, topic patterns, and link intelligence. Do not copy prose, recurring phrasing, jokes, or signature voice.

```text
Ben's Bites discovers signal.
Arnarsson explains what it means.
Agent.tips turns it into durable tool and workflow pages.
```

## Flywheel

```text
discover sources
-> extract links, repos, tools, and topics
-> normalize candidates
-> enrich and score
-> save to review queue
-> publish to Watch
-> promote important items to Tools
-> assemble Arnarsson Briefs
-> link briefs back into tools, workflows, categories, and comparisons
```

## Arnarsson Voice

Nordic, direct, practical, skeptical of hype. Field notes from someone building systems, not a marketer summarizing AI news.

Brief sections:

```text
The Signal
Toolmarks
Workflow Rune
Repo Watch
Operator Notes
```

## Data Model Slice

Initial new tables:

```text
sources
source_items
watch_items
briefs
brief_items
workflows
```

Status values should keep publishing human-reviewed:

```text
new
reviewed
promoted
rejected
draft
published
```

## Operating Rule

```text
Watch discovers.
Arnarsson explains.
Tools rank.
Workflows convert.
Newsletter retains.
```

## Local Runbook

Required env vars before running imports:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
CRON_SECRET
```

Apply `supabase/migrations/20260201000000_content_machine.sql`, then regenerate
`db/supabase/types.ts` from the live Supabase schema. Until the generated types
include the content-machine tables, the import/admin code intentionally casts
new table queries through the generic Supabase client.

Run import manually:

```bash
curl -X POST http://localhost:3004/api/content-machine/import \
  -H "Authorization: Bearer $CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"sources":["github","bens-bites"],"github_query":"topic:ai-agent"}'
```

Production cron calls `/api/content-machine/import` daily through `vercel.json`.
Repeat imports refresh metadata but preserve human review state for source
items and Watch rows.
