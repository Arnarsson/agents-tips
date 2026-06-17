# Agentic UI System

Reusable visual language for agent directories, workflow tools, and editorial
ops products.

## Direction

Utility first. The interface should feel like a command surface for scanning,
deciding, and acting, not a decorative landing page.

## Core Pieces

- `ConsoleShell`: full directory/app surface with moss texture, grid, and
  command-console framing.
- `ConsolePanel`: reusable glass/noir panel for search, result lists, filters,
  comparison surfaces, and workflow rails.
- `ConsolePill`: compact status/metadata chip for counts, modes, and freshness.
- `ConsoleIcon`: consistent icon container with lime/cyan/muted tones.
- `ConsoleLinkCard`: interactive route card for watch, compare, workflow, and
  action rails.
- `DirectorySearch`: command-style search with keyboard navigation, URL-backed
  state, real suggestions, and useful fallback paths.
- `ToolRow`: compact listing preview for ranked recommendations and adjacent
  starting points.

Source:

```text
components/agentic/console.tsx
components/directory-search.tsx
components/hero.tsx
app/globals.css
```

## Rules

- Search is the primary CTA for directories.
- Cards must expose useful metadata before prose.
- First-screen metadata must be actionable: filters, fit checks, evaluation
  rows, and workflow hints should route to a useful next step.
- Motion clarifies system state: scan, ingest, promote, publish.
- Effects stay behind content and must respect `prefers-reduced-motion`.
- Use dark surfaces with lime, amber, and cyan accents. Do not let the UI become
  a purple gradient SaaS page.
- Keep radii controlled: compact cards stay tight, command/search surfaces can
  be slightly softer when the hit target benefits.
- Every decorative component must still carry utility: status, routing, metric,
  or workflow meaning.

## Page Patterns

- Directory home: command hero, search, signal preview, then listings.
- Watch: signal header, dense reviewed items, metrics on the right.
- Compare: decision cards, dimensions, short calls.
- Briefs: editorial note, section badges, source/provenance links.
- Workflows: recipe cards, checks, reject conditions.

## Cult UI Pro Inspiration

The direction borrows the useful categories from Cult UI Pro rather than copying
its source: animated cards/search/badges, agent suggestion stacks, warp/noise
hero treatment, comparison texture blocks, and directory-template utility.
