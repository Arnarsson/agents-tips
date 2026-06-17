# agents.tips goal-loop receipts — 2026-06-17

Goal: instrument funnel + first lift + indexability hardening, deploy to prod, canary.
Source contract: `docs/handover/2026-06-17-cc-handoff.md`

## Baseline (measured before any edit)

### Routes (live, `curl -o /dev/null -w %{http_code}`)
| Route | Code |
|---|---|
| `/` | 200 |
| `/compare` | 200 |
| `/watch` | 200 |
| `/workflows` | 200 |
| `/dk` | 200 |
| `/tools` | 200 (404 flap from handoff has propagated) |

### Indexability (live HTML)
- All 6 routes: no `noindex`, canonical present, unique `<title>`.
- robots.txt: `Allow: /`, sitemap referenced, key sections allowed.
- sitemap.xml: lists home/tools/watch/briefs/workflows/compare/dk.
- Gaps: compare/watch/workflows have title+description but **no page-specific `openGraph`** (OG title/desc inherits homepage default). `/submit-new` has **generic homepage title** and is **not noindexed** (auth-gated route).

### Instrumentation
- `@vercel/analytics` installed, `<Analytics/>` mounted in `app/layout.tsx`.
- SourceTrace `t.js` also loaded.
- **Zero custom funnel events** — no `va.track()` / capture anywhere. Funnel baseline = **0 events of every type** (none defined). This is the real gap.

### Build
- `bun run build` (Next 15.5.10, turbopack) → **passes**.

## Funnel event names (this change defines them)
| Event | Fires when | File |
|---|---|---|
| `home_cta_watch` | click Watch card on home | `components/hero.tsx` |
| `home_cta_compare` | click Compare card on home | `components/hero.tsx` |
| `home_cta_workflows` | click Workflows card on home | `components/hero.tsx` |
| `newsletter_signup` | newsletter subscribe success | `components/newsletter-signup.tsx` |
| `submit_completed` | agent submit success | `app/(protected)/submit-new/use-submit-form.ts` |

## Time-bound caveat
"At least one conversion metric improved vs baseline" needs days of live traffic
(7/30-day milestones in the contract). NOT loop-completable today. Baseline above
starts the clock; lift accrues in the Vercel Analytics dashboard.

## Progress log
- [x] instrumentation: `components/tracked-link.tsx` (new) + hero 3 cards + newsletter + submit hook → 5 events wired
- [x] indexability: compare/watch/workflows page-specific OG + canonical; `/submit-new` noindex + real title
- [x] lift: home "Decision paths" header on funnel-cards panel; `/compare` bottom conversion CTA (newsletter + Watch link)
- [x] verify local: `tsc --noEmit` pass, `next build` pass, `eslint` 0 errors (96 pre-existing warnings, none in changed files)
- (pending) prod deploy + canary
