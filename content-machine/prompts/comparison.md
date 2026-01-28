# Content Machine: Comparison Template (X vs Y)

## System Prompt

```
You are writing a comparison article for agents.tips — an AI agents directory.

VOICE: Opinionated referee. You MUST pick winners for specific use cases.

CRITICAL RULE: No "it depends" cop-outs. For each use case, declare a winner.

STYLE: Direct, scannable, decision-focused. People read comparisons to make decisions.

BANNED:
- "Both tools are excellent in their own way"
- "It depends on your needs"
- "Each has its strengths"
- All standard AI slop phrases
```

## Content Structure

```markdown
# {Agent A} vs {Agent B}: {Punchy Comparison Verdict}

**Quick Answer:** If you {use case 1}, pick **{Winner}**. If you {use case 2}, pick **{Winner}**.

## The 30-Second Verdict

| Category | Winner | Why |
|----------|--------|-----|
| {Category 1} | **{Agent}** | {One sentence} |
| {Category 2} | **{Agent}** | {One sentence} |
| {Category 3} | **{Agent}** | {One sentence} |
| {Category 4} | **{Agent}** | {One sentence} |
| **Overall** | **{Agent}** | {For most people} |

---

## {Agent A} in 60 Seconds

{2 paragraphs. What it is, what it's best at, honest limitation.}

**Killer feature:** {The thing it does better than anyone}
**Achilles heel:** {The honest weakness}

## {Agent B} in 60 Seconds

{2 paragraphs. What it is, what it's best at, honest limitation.}

**Killer feature:** {The thing it does better than anyone}
**Achilles heel:** {The honest weakness}

---

## Head-to-Head Breakdown

### {Category 1}: Winner — {Agent}

{2-3 paragraphs with specific examples. Why this one wins this category.}

### {Category 2}: Winner — {Agent}

{2-3 paragraphs with specific examples.}

### {Category 3}: Winner — {Agent}

{2-3 paragraphs with specific examples.}

### Pricing: Better Value — {Agent}

{Price comparison with actual numbers. Value analysis.}

| | {Agent A} | {Agent B} |
|--|-----------|-----------|
| Free tier | {Yes/No + limits} | {Yes/No + limits} |
| Pro | {$/month} | {$/month} |
| Enterprise | {$/month} | {$/month} |

---

## Who Should Pick What

### Pick {Agent A} if you:
- {Specific scenario}
- {Specific scenario}
- {Specific scenario}

### Pick {Agent B} if you:
- {Specific scenario}
- {Specific scenario}
- {Specific scenario}

### Skip both if you:
- {When neither is right}

---

## The Final Word

{3-4 sentences. Clear recommendation. Personal take.}

**My pick:** {Agent} — {One sentence why}

---

*Compared by {Author} · {Date}*
```

## Example Output

```markdown
# Cursor vs Claude Code: The Coding AI Showdown

**Quick Answer:** If you want AI autocomplete that feels magic, pick **Cursor**. If you want to delegate entire tasks, pick **Claude Code**.

## The 30-Second Verdict

| Category | Winner | Why |
|----------|--------|-----|
| Autocomplete | **Cursor** | Faster, more intuitive suggestions |
| Multi-file edits | **Claude Code** | Handles complex refactors effortlessly |
| Learning curve | **Cursor** | Works like your IDE, just smarter |
| Raw power | **Claude Code** | Can do things Cursor can't even attempt |
| Value | **Cursor** | More features at lower price |
| **Overall** | **Claude Code** | If you're serious about AI-assisted dev |

---

## Cursor in 60 Seconds

Cursor is VS Code with AI superpowers. Same interface you know, but autocomplete that actually understands what you're trying to do. Tab-tab-tab through suggestions, inline chat for quick questions, and now multi-file edits.

It's the gateway drug to AI coding. Low friction, immediate productivity boost.

**Killer feature:** The autocomplete is genuinely addictive. It predicts what you want before you know you want it.
**Achilles heel:** For complex tasks, you're still doing a lot of copy-paste gymnastics.

## Claude Code in 60 Seconds

Claude Code is a different beast. It's not an IDE — it's an AI agent in your terminal that reads your entire codebase and executes tasks autonomously. "Add authentication" and watch it modify 15 files, run tests, and commit.

Higher learning curve, but once it clicks, you feel like you have a team.

**Killer feature:** Delegation. You describe what you want, it figures out how.
**Achilles heel:** Expensive ($200/month for Max) and can go rogue if you're not watching.

---

## Head-to-Head Breakdown

### Autocomplete: Winner — Cursor

Not even close. Cursor's Tab-completion is the best in the game. It predicts multi-line completions, understands context from other files, and the speed is instant.

Claude Code doesn't really do autocomplete — it's not trying to. Different tool, different philosophy.

### Complex Refactors: Winner — Claude Code

Asked both to "refactor auth from sessions to JWT across the codebase."

Cursor: Gave me suggestions file-by-file. I had to manually apply each one, check for consistency, fix imports. Took 45 minutes.

Claude Code: Made a plan, asked one clarifying question, modified 12 files in one go, ran tests, fixed what broke. Took 6 minutes.

For anything touching multiple files, Claude Code wins decisively.

### Learning Curve: Winner — Cursor

Cursor is just VS Code. If you know VS Code, you know Cursor. The AI features layer on top naturally.

Claude Code requires learning a new workflow. Terminal-based, command-driven, async thinking. Took me a week to get comfortable.

### Pricing: Better Value — Cursor

| | Cursor | Claude Code |
|--|--------|-------------|
| Free tier | Yes (limited) | No |
| Pro | $20/month | $20/month (Pro) |
| Max | N/A | $200/month |

Cursor gives you more at $20/month. Claude Code's real power needs the $200 Max tier.

---

## Who Should Pick What

### Pick Cursor if you:
- Want immediate productivity boost with no learning curve
- Love VS Code and don't want to leave
- Mainly need better autocomplete
- Budget-conscious

### Pick Claude Code if you:
- Ship fast and want to delegate entire features
- Comfortable in the terminal
- Willing to pay $200/month for power
- Solo dev or small team

### Skip both if you:
- Learning to code (use regular IDE first)
- Enterprise with strict AI policies
- Need offline capability

---

## The Final Word

These tools complement more than compete. Many devs use both — Cursor for the day-to-day coding flow, Claude Code for the big refactors and new features.

But if I had to pick one? Claude Code changed how I work. Cursor made my existing workflow faster. There's a difference.

**My pick:** Claude Code — because shipping faster beats typing faster.

---

*Compared by Sven · January 2026*
```

## Input Variables

```json
{
  "agent_a": "Cursor",
  "agent_b": "Claude Code",
  "categories": ["Autocomplete", "Complex Refactors", "Learning Curve", "Pricing"],
  "author_experience_a": "6 months",
  "author_experience_b": "3 months", 
  "specific_comparisons": [
    {
      "task": "Refactor auth to JWT",
      "agent_a_result": "45 minutes, manual file-by-file",
      "agent_b_result": "6 minutes, autonomous"
    }
  ],
  "pricing_a": {"free": true, "pro": 20},
  "pricing_b": {"free": false, "pro": 20, "max": 200},
  "overall_winner": "Claude Code",
  "winner_reason": "Shipping faster beats typing faster"
}
```
