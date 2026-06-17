# agents.tips CC handoff — 2026-06-17

## Objective
Turn `agents.tips` into a high-intent decision surface for AI tools: discover → compare → trust → convert → return.

## SMART contract

**S — Specific**
- Scope: homepage, compare pages, watch pages, workflows pages, Danish wedge, submit/newsletter conversion paths.
- Non-goals: generic blog expansion, random feature inflation, unrelated admin/internal refactors.

**M — Measurable**
- Baseline routes verified live:
  - `/` renders the new home surface.
  - `/compare` returns `200` and renders comparison content.
  - `/watch` returns `200` and renders signal content.
  - `/workflows` returns `200` and renders workflow content.
  - `/dk` returns `200` and renders the Danish wedge.
  - `/tools` initially returned `404`, then propagated to `200` on the live edge.
- Build status: `bun run build` passed.
- Git state: clean working tree on `master`, pushed to `origin/master` at `6668fe1`.

**A — Attainable**
- The repo already has the route structure and content machine pieces needed for the first milestone.
- This is a funnel/positioning problem, not a blank-slate rewrite.

**R — Relevant**
- The user outcome is stronger discovery, better decisions, and more conversions on the live site.

**T — Time-bound**
- First milestone: 7 days for the core loop and baseline lift.
- Second milestone: 30 days for SEO + conversion signal.

**Exit condition**
- `agents.tips` has a verified discover→compare→convert loop live, with the key routes indexable, the funnel instrumented, and at least one core conversion metric improved versus baseline.

## Baseline evidence

| Metric | Current | Target |
|---|---:|---:|
| Build | pass | pass |
| Home route | live | live |
| Compare route | 200 / rendered | 200 / rendered |
| Watch route | 200 / rendered | 200 / rendered |
| Workflows route | 200 / rendered | 200 / rendered |
| Danish wedge | 200 / rendered | 200 / rendered |
| `/tools` propagation | briefly 404, then 200 | stable 200 |

## Current verified state
- Commit: `6668fe1` — `feat: ship agents.tips refresh`
- Branch: `master`
- Remote: `origin/master` pushed
- Working tree: clean
- Local build: passed
- Live pages checked in browser:
  - `https://www.agents.tips/`
  - `https://www.agents.tips/compare`
  - `https://www.agents.tips/watch`
  - `https://www.agents.tips/workflows`
  - `https://www.agents.tips/dk`
  - `https://www.agents.tips/tools`

## Known risks
- No live analytics/CTR baseline has been measured yet.
- SEO lift and conversion lift still need instrumentation, not just page presence.
- The site is live, but route visibility can lag briefly behind deploys/CDN propagation.

## Starting levers
1. Homepage CTA hierarchy.
2. Comparison pages for high-intent searches.
3. Watch pages as repeat-visit signals.
4. Workflows pages as practical recipes.
5. Danish SEO wedge.
6. Submit/newsletter conversion cleanup.

## Exact commands already proven
```bash
bun install
bun run build
git status --short --branch
```

## Recommended next commands for CC
1. Measure funnel baseline:
   - home → compare CTR
   - home → watch CTR
   - submit/newsletter conversion rate
2. Identify the weakest high-intent page and tighten it first.
3. Add instrumentation before any wider content expansion.

## Immediate next command
```bash
bun run build
```
Then re-open the live URLs above and record any route or copy gaps before changing more pages.
