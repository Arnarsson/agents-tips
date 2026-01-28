# agents.tips Writing Style Guide

> "No one wants to read AI slop" — The north star

## Voice DNA

We blend three voices:

| Source | What we take |
|--------|--------------|
| **Claudelog** | Personal, story-driven, authentic developer energy ("I was gassed!") |
| **Ben's Bites** | Casual, scannable, newsletter-friendly, community feel |
| **Every.to** | Thoughtful analysis, polished prose, editorial depth |

**Result:** Opinionated friend who actually uses these tools, not a corporate content farm.

---

## The Anti-Slop Checklist

Before publishing, ask:

- [ ] Would a human actually say this out loud?
- [ ] Did I share a real opinion or just describe features?
- [ ] Is there a specific detail only someone who used it would know?
- [ ] Would I send this to a friend? (not "share with my network")
- [ ] Did I cut the filler words? (utilize → use, leverage → use, facilitate → help)

---

## Banned Phrases (AI Slop Indicators)

❌ **Never use:**
- "In today's fast-paced world..."
- "It's worth noting that..."
- "At the end of the day..."
- "This begs the question..."
- "First and foremost..."
- "In conclusion..."
- "Utilize" (just say "use")
- "Leverage" (just say "use")
- "Delve into" 
- "Dive deep"
- "Game-changer" (unless truly is)
- "Revolutionize"
- "Cutting-edge"
- "Seamlessly"
- "Robust"
- "Synergy"
- "Empower"
- "Unlock" (as in "unlock potential")
- "Navigate" (as in "navigate challenges")
- "Landscape" (as in "AI landscape")

---

## Voice Principles

### 1. First Person, Real Opinions
```
❌ "Cursor is a popular AI coding assistant that many developers find useful."

✅ "I switched to Cursor three months ago. My take: it's great for quick edits, 
    but Claude Code still wins for anything complex."
```

### 2. Specific > Generic
```
❌ "Claude Code offers powerful multi-file editing capabilities."

✅ "Claude Code rewrote 47 files in my monorepo in one shot. 
    Took 3 minutes. I watched it happen in the terminal like a psycho."
```

### 3. Honest Trade-offs
```
❌ "Windsurf provides an excellent development experience."

✅ "Windsurf's autocomplete is addictive. The downside? 
    It's so fast you stop thinking. I caught myself accepting 
    suggestions I didn't understand."
```

### 4. Story Over Specs
```
❌ "Devin can handle complex software engineering tasks autonomously."

✅ "I gave Devin a bug that had stumped me for two days. 
    It found the issue in 20 minutes — a race condition I'd 
    never have spotted. Then it introduced two new bugs fixing it. 
    Classic."
```

### 5. Casual Doesn't Mean Sloppy
```
❌ "gonna be honest this tool kinda slaps ngl"

✅ "Genuinely impressed. This is the first AI tool that made me 
    rethink my workflow, not just speed it up."
```

---

## Content Types & Tone

### Agent Reviews
- **Length:** 800-1500 words
- **Structure:** Hook → What it does → My experience → Who it's for → Verdict
- **Tone:** Friend reviewing a tool over coffee
- **Must include:** At least one specific personal anecdote

### Comparisons (X vs Y)
- **Length:** 1000-2000 words  
- **Structure:** Quick verdict up top → Detailed breakdown → Use case recommendations
- **Tone:** Opinionated referee
- **Must include:** Clear winner for specific use cases (no "it depends" cop-outs)

### Weekly Digest
- **Length:** 500-800 words (scannable)
- **Structure:** 3-5 highlights → Quick takes → One deep thought
- **Tone:** Ben's Bites energy — casual, link-heavy, newsletter-native
- **Must include:** At least one hot take

### Guides/Tutorials
- **Length:** 1500-3000 words
- **Structure:** Problem → Solution → Step-by-step → Gotchas → Next steps
- **Tone:** Patient teacher who's made all the mistakes
- **Must include:** Real code/screenshots, common pitfalls

---

## Formatting Rules

### Headlines
- Specific > clever
- Numbers work: "5 Things I Learned After 30 Days with Cursor"
- Questions work: "Is Claude Code Worth $200/month?"
- Avoid clickbait: "You Won't BELIEVE..." ❌

### Paragraphs
- 2-4 sentences max
- One idea per paragraph
- White space is your friend

### Lists
- Use them liberally for scanning
- Parallel structure
- Front-load the important word

### Links
- Descriptive anchor text
- Link to specific pages, not homepages
- External links open in new tab

---

## The "Read Aloud" Test

Before publishing, read it out loud. If you:
- Stumble on a phrase → rewrite it
- Sound like a robot → add personality  
- Bore yourself → cut it
- Cringe → delete and start over

---

## Examples of Good Writing

### Claudelog Style (Personal, Story-driven)
> "When I first experienced Claude Code, it struck me like a wrecking ball. 
> Unlike the copy-paste workflows that define most AI coding tools, this was 
> different. I was gassed! It indicated its plan with tick boxes, communicated 
> progress, and asked permission. However, when I tried to compile—errors."

### Ben's Bites Style (Quick, Casual)
> "Three things worth your time today:
> 1. **Cursor shipped multi-file edits** — finally. It's good.
> 2. **OpenAI's new model** — incremental, not revolutionary  
> 3. **This tweet thread** on agent architectures — best explanation I've seen"

### Every.to Style (Thoughtful, Analytical)
> "The boring businesses will dominate the AI era. Not the companies with the 
> best models—the ones that own what AI has to flow through. Distribution beats 
> capability. It always has. The question is whether we've learned that lesson yet."

---

## Content Machine Instructions

When generating content, the system prompt should include:

```
You are writing for agents.tips, an AI agents directory with editorial ambitions.

Voice: Opinionated developer friend, not corporate content farm.
Style: Claudelog's authenticity + Ben's Bites scannability + Every.to depth.

RULES:
1. First person, real opinions
2. Specific details over generic claims
3. Honest trade-offs (nothing is perfect)
4. Story over specs
5. No banned phrases (see list)
6. Read-aloud test: would you say this to a friend?

BEFORE WRITING, ask yourself:
- What's my actual opinion?
- What specific detail proves I've used this?
- What's the honest downside?
```

---

## Quality Bar

Every piece should be something you'd:
1. Actually read yourself
2. Send to a developer friend
3. Be proud to put your name on

If it doesn't hit all three → don't publish.
