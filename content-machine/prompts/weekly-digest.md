# Content Machine: Weekly Digest Template

## System Prompt

```
You are writing the weekly digest for agents.tips newsletter.

VOICE: Ben's Bites energy — casual, scannable, opinionated. Like a smart friend catching you up.

FORMAT: Newsletter-native. Short paragraphs, lots of links, easy to skim on mobile.

MUST INCLUDE:
- At least one hot take
- At least one "under the radar" pick
- Clear hierarchy (what matters most → least)

BANNED:
- Long paragraphs
- Passive voice
- All standard AI slop phrases
- Being boring
```

## Content Structure

```markdown
# agents.tips weekly · {Date Range}

{One punchy line about the week. Set the tone.}

---

## 🔥 The Big One

**{Headline news/release}**

{2-3 sentences. Why it matters. Link.}

{Your hot take in 1 sentence. Be opinionated.}

---

## 📦 New Agents This Week

**{Agent 1}** — {One-line description}
{What caught our eye. Link.}

**{Agent 2}** — {One-line description}
{What caught our eye. Link.}

**{Agent 3}** — {One-line description}
{What caught our eye. Link.}

---

## 📈 Trending on agents.tips

1. **{Agent}** — {Why it's trending}
2. **{Agent}** — {Why it's trending}
3. **{Agent}** — {Why it's trending}

---

## 🎯 Under the Radar

**{Agent or tool most people missed}**

{Why it's worth your attention. Specific use case.}

[Check it out →]({link})

---

## 💭 One Thought

{A brief observation, prediction, or opinion about AI agents. 2-3 sentences max.}

---

## 🔗 Quick Links

- {Interesting article} — [Link]
- {Useful resource} — [Link]
- {Tool update} — [Link]

---

That's it for this week. If you found something cool, [submit it](/submit).

— Sven

[Twitter]() · [agents.tips]()
```

## Example Output

```markdown
# agents.tips weekly · Jan 22-28, 2026

OpenAI dropped GPT-5.2, Anthropic shipped Claude Cowork, and everyone's arguing about whether coding agents will replace devs. (Spoiler: they won't. But they'll replace devs who don't use them.)

---

## 🔥 The Big One

**Claude Cowork is Claude Code for the rest of us**

Anthropic launched a web-based version of Claude Code. No terminal required. Point it at a GitHub repo, describe what you want, watch it work. [Try it →](https://claude.ai/cowork)

My take: The UX is rough, but the direction is right. Agentic workflows shouldn't require a CS degree.

---

## 📦 New Agents This Week

**Cora** — AI email assistant
Finally, an AI that handles email without being annoying. $15/month. Surprisingly good at prioritization. [Link](https://cora.computer)

**Monologue** — Voice dictation that works
3x faster than typing. Actually understands developer terminology. The "just talk to your computer" dream is getting real. [Link](https://monologue.to)

**Leela** — Code review agent
Runs 13 AI reviewers in parallel on every PR. Caught a critical bug in my side project that I definitely would've shipped. [Link]()

---

## 📈 Trending on agents.tips

1. **Cursor** — Multi-file edits finally shipped. The gap with Claude Code is closing.
2. **Windsurf** — Price drop to $10/month. Best value in the market?
3. **Devin** — Still polarizing. Either "the future" or "overhyped demo" depending on who you ask.

---

## 🎯 Under the Radar

**Sparkle — AI file organizer**

Your Downloads folder is a war crime. Sparkle watches your folders and auto-organizes files using AI. Sounds simple. Works shockingly well.

I've been using it for a week. My Desktop has never been cleaner. And I didn't have to think about it once.

[Check it out →](https://makeitsparkle.co)

---

## 💭 One Thought

The best AI tools in 2026 don't try to replace you. They handle the parts of your job you hate so you can focus on the parts you love. That's the difference between "AI assistant" and "AI replacement."

---

## 🔗 Quick Links

- "How I Use Claude Code to Ship Like a Team of Five" — [Every.to](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five)
- Cursor 0.45 release notes — [Changelog](https://cursor.sh/changelog)
- Why agents need memory — [Thread](https://twitter.com/)

---

That's it for this week. If you found something cool, [submit it](/submit).

— Sven

[Twitter](https://twitter.com/agents_tips) · [agents.tips](https://agents.tips)
```

## Input Variables

```json
{
  "date_range": "Jan 22-28, 2026",
  "big_story": {
    "headline": "Claude Cowork is Claude Code for the rest of us",
    "summary": "Web-based Claude Code, no terminal required",
    "link": "https://claude.ai/cowork",
    "hot_take": "UX is rough, but direction is right"
  },
  "new_agents": [
    {"name": "Cora", "tagline": "AI email assistant", "note": "Good at prioritization"},
    {"name": "Monologue", "tagline": "Voice dictation", "note": "Understands dev terminology"},
    {"name": "Leela", "tagline": "Code review agent", "note": "13 AI reviewers in parallel"}
  ],
  "trending": [
    {"name": "Cursor", "reason": "Multi-file edits shipped"},
    {"name": "Windsurf", "reason": "Price drop to $10/month"},
    {"name": "Devin", "reason": "Still polarizing"}
  ],
  "under_radar": {
    "name": "Sparkle",
    "description": "AI file organizer",
    "personal_note": "Desktop never cleaner"
  },
  "one_thought": "Best AI tools handle parts you hate so you can focus on parts you love",
  "quick_links": [
    {"title": "How I Use Claude Code to Ship Like a Team of Five", "source": "Every.to"},
    {"title": "Cursor 0.45 release notes", "source": "Changelog"}
  ]
}
```
