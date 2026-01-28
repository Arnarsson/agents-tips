# agents.tips Redesign Concept

## Executive Summary
Transform agents.tips from a generic directory into **the definitive AI agents hub** — combining Every.to's editorial elegance, Ben's Bites newsletter-first approach, and a curated directory experience.

---

## Design Direction: "The AI Agent Authority"
*Every.to meets Ben's Bites*

### Core Principles
1. **Dark + Elegant** — Every.to's sophisticated dark mode
2. **Editorial-first** — Content is king (reviews, guides, comparisons)
3. **Newsletter-driven** — Growth engine like Ben's Bites
4. **Directory + Discovery** — Curated, filterable, community-powered
5. **Typography-forward** — Satoshi font, generous spacing

---

## Visual Identity

### Color Palette
```css
/* Background layers */
--bg-base: #0a0a0a;
--bg-elevated: #141414;
--bg-card: #1a1a1a;
--bg-hover: #222222;

/* Accent - Electric Purple/Blue gradient */
--accent-primary: #8b5cf6;    /* Purple */
--accent-secondary: #3b82f6;  /* Blue */
--accent-gradient: linear-gradient(135deg, #8b5cf6, #3b82f6);

/* Text */
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #52525b;

/* Status colors */
--status-live: #22c55e;
--status-new: #f59e0b;
--status-featured: #ec4899;
```

### Typography — Satoshi
- **Headlines:** Satoshi Black (900) — bold, confident, modern
- **Subheads:** Satoshi Bold (700)
- **Body:** Satoshi Regular (400) — excellent readability
- **Mono:** JetBrains Mono — for stats, code, technical details

```css
/* Import from Fontshare */
@import url('./fonts/satoshi.css');

--font-sans: 'Satoshi Variable', 'Satoshi', system-ui, sans-serif;
```

### Key Visual Elements
1. **Glow effects** on cards (subtle purple/blue ambient glow on hover)
2. **Glassmorphism** for modals and overlays
3. **Dot grid background** (subtle, like Linear)
4. **Gradient borders** on featured items

---

## Page Structure

### Homepage — "The Grid"

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Search (⌘K) | Categories | Sign In          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HERO BENTO (3 cols)                                │   │
│  │  ┌─────────────┬─────────────┬─────────────┐       │   │
│  │  │ Featured    │ "20+ agents"│ Quick Stats │       │   │
│  │  │ Agent Card  │ animated    │ Total views │       │   │
│  │  │ (large)     │ counter     │ This week   │       │   │
│  │  ├─────────────┴─────────────┼─────────────┤       │   │
│  │  │ Search bar (prominent)    │ Categories  │       │   │
│  │  │ "Find your perfect agent" │ Quick links │       │   │
│  │  └───────────────────────────┴─────────────┘       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  TRENDING NOW ────────────────────────────────────────────  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Clawdbot│ │ Cursor │ │ Devin  │ │Windsurf│ │ Claude │   │
│  │  🔥+12%│ │  📈+8% │ │  ⭐New │ │  🚀Hot │ │  ✨Top │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                             │
│  BROWSE BY CATEGORY ──────────────────────────────────────  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ 🤖 Coding    │ │ 📝 Writing   │ │ 🎨 Creative  │       │
│  │ Assistants   │ │ Assistants   │ │ Tools        │       │
│  │ 12 agents    │ │ 8 agents     │ │ 5 agents     │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                             │
│  ALL AGENTS ──────────────────────────────────────────────  │
│  [Grid of agent cards with filters on left]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Agent Card Component

```
┌────────────────────────────────────────┐
│  [Logo]  Agent Name            ⭐ 4.8  │
│          @handle                       │
│                                        │
│  One-liner description that hooks      │
│  you immediately...                    │
│                                        │
│  ┌─────┐ ┌─────┐ ┌─────┐             │
│  │ IDE │ │ API │ │ Free│             │
│  └─────┘ └─────┘ └─────┘             │
│                                        │
│  👁 1.2k views    💾 Save    → Visit  │
└────────────────────────────────────────┘
```

---

## Key Interactions

### Command Palette (⌘K)
Like Raycast — instant search across:
- Agents
- Categories
- Actions (Submit, Compare, etc.)

### Agent Comparison Mode
Select 2-3 agents → Side-by-side comparison table

### Quick Filters
Sticky filter bar:
- Pricing: Free | Freemium | Paid
- Platform: Web | Mac | Windows | Linux | CLI
- Category: Coding | Writing | Research | Creative

---

## Differentiators from Current Design

| Current | Redesign |
|---------|----------|
| Light mode default | Dark mode default |
| Generic hero section | Bento grid with live data |
| Basic card grid | Interactive cards with glow |
| No keyboard nav | Full ⌘K command palette |
| Static filters | Smart, persistent filters |
| No comparison | Agent comparison mode |

---

## Implementation Phases

### Phase 1: Foundation (2-3 days)
- [ ] New color system + dark theme
- [ ] Updated typography scale
- [ ] Card component redesign
- [ ] Basic bento grid homepage

### Phase 2: Interactions (2-3 days)
- [ ] Command palette (⌘K)
- [ ] Card hover animations
- [ ] Filter persistence
- [ ] View transitions

### Phase 3: Features (3-4 days)
- [ ] Agent comparison mode
- [ ] User reviews/ratings
- [ ] "Collections" (curated lists)
- [ ] Newsletter redesign

---

## Inspiration Screenshots to Review
- Linear.app homepage (bento grid)
- Raycast.com (dark mode, keyboard focus)
- Vercel.com (clean, developer-focused)
- Arc.net (playful gradients)

---

## Questions for Sven
1. Keep sidebar nav or go full-width?
2. How prominent should newsletter CTA be?
3. Any must-have features for launch?
4. Timeline preference?
