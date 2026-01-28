# agents.tips Content Machine Prompts

## Overview

Templates for AI-generated content that doesn't read like AI-generated content.

**North star:** "No one wants to read AI slop"

## Available Templates

| Template | Use For | Output Length |
|----------|---------|---------------|
| [agent-review.md](./agent-review.md) | Deep-dive reviews | 800-1500 words |
| [comparison.md](./comparison.md) | X vs Y comparisons | 1000-2000 words |
| [weekly-digest.md](./weekly-digest.md) | Newsletter digest | 500-800 words |

## Style Foundation

All templates inherit from [`/WRITING-STYLE-GUIDE.md`](../../WRITING-STYLE-GUIDE.md)

**Voice DNA:**
- Claudelog's authenticity
- Ben's Bites scannability
- Every.to editorial depth

## Usage

Each template includes:
1. **System prompt** — Personality and rules
2. **Content structure** — Markdown skeleton
3. **Example output** — What good looks like
4. **Input variables** — JSON schema for Content Machine

## Quality Check

Before publishing any generated content:

- [ ] Read aloud test passed
- [ ] No banned phrases
- [ ] Contains specific anecdote/detail
- [ ] Has clear opinion/verdict
- [ ] Honest trade-offs mentioned
- [ ] Would send to a friend

## Coming Soon

- `guide.md` — How-to tutorials
- `news-bite.md` — Quick takes on launches
- `interview.md` — Q&A format
- `roundup.md` — "Best X for Y" lists
