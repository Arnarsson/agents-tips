# Editorial System — Weekly Publishing Cadence

**Goal:** 2 articles/week on autopilot (1 deep review + 1 news roundup)  
**Voice:** Sven's builder perspective — technical, hands-on, honest, no corporate fluff  
**Linear Issue:** [7-206](https://linear.app/atlas-intelligence/issue/7-206/weekly-editorial-publishing-cadence-svens-voice)

---

## Publishing Schedule

### Weekly Cadence
- **Monday**: News Roundup (what happened in AI agents last week)
- **Thursday**: Deep Review (hands-on tool review, comparison, or guide)

### Monthly Rotation
- Week 1: Tool deep-dive (single product)
- Week 2: Comparison article (X vs Y vs Z)
- Week 3: How-to guide (workflow/use case)
- Week 4: Industry analysis (trends, predictions)

---

## Content Calendar (Next 12 Weeks)

### January 2026
- ✅ **Jan 27** (Mon): Clawdbot case study [PUBLISHED]
- **Jan 30** (Thu): **Cursor vs Windsurf vs Continue** (comparison)

### February 2026
**Week 1 (Feb 3-6)**
- Feb 3 (Mon): **News Roundup #1** — Weekly AI agent launches
- Feb 6 (Thu): **GitHub Copilot Workspace deep-dive** (tool review)

**Week 2 (Feb 10-13)**
- Feb 10 (Mon): **News Roundup #2**
- Feb 13 (Thu): **AutoGPT vs CrewAI vs LangGraph** (comparison)

**Week 3 (Feb 17-20)**
- Feb 17 (Mon): **News Roundup #3**
- Feb 20 (Thu): **Building a Personal Agent Stack** (how-to guide)

**Week 4 (Feb 24-27)**
- Feb 24 (Mon): **News Roundup #4**
- Feb 27 (Thu): **State of AI Agents Q1 2026** (industry analysis)

### March 2026
**Week 1 (Mar 3-6)**
- Mar 3 (Mon): **News Roundup #5**
- Mar 6 (Thu): **Devin Review** — Is it worth the hype? (tool review)

**Week 2 (Mar 10-13)**
- Mar 10 (Mon): **News Roundup #6**
- Mar 13 (Thu): **ChatGPT vs Claude vs Gemini for Coding** (comparison)

**Week 3 (Mar 17-20)**
- Mar 17 (Mon): **News Roundup #7**
- Mar 20 (Thu): **Using AI Agents for API Integration Work** (how-to)

**Week 4 (Mar 24-27)**
- Mar 24 (Mon): **News Roundup #8**
- Mar 27 (Thu): **Why AI Agents Are Replacing SaaS Tools** (analysis)

### April 2026
**Week 1 (Mar 31 - Apr 3)**
- Mar 31 (Mon): **News Roundup #9**
- Apr 3 (Thu): **Windsurf Review** — Flow mode vs Cursor composer (tool review)

**Week 2 (Apr 7-10)**
- Apr 7 (Mon): **News Roundup #10**
- Apr 10 (Thu): **Aider vs CodeGPT vs Cody** (comparison)

**Week 3 (Apr 14-17)**
- Apr 14 (Mon): **News Roundup #11**
- Apr 17 (Thu): **Building a Content Pipeline with AI Agents** (how-to)

**Week 4 (Apr 21-24)**
- Apr 21 (Mon): **News Roundup #12**
- Apr 24 (Thu): **The End of Prompt Engineering** (opinion/analysis)

---

## Content Templates

### Template 1: Deep Review
→ See `content/templates/deep-review-template.md`

Key sections:
- What it does (clear, simple)
- Who it's for (honest targeting)
- Real-world testing (hands-on experience)
- What works / What doesn't (balanced)
- Trade-offs (honest limitations)
- Comparison to alternatives
- Verdict (actionable recommendation)

**Length:** 1500-2500 words  
**Reading time:** 8-15 min  
**Voice:** Technical builder who's actually used it

---

### Template 2: News Roundup
→ See `content/templates/news-roundup-template.md`

Key sections:
- Editor's pick (1 standout story)
- New launches (3-5 products)
- Updates & funding (2-3 items)
- Sven's take (1 opinionated commentary)
- One more thing (wild card)

**Length:** 800-1200 words  
**Reading time:** 5-7 min  
**Voice:** Fast-paced, opinionated, no fluff

---

## Voice Guidelines

### Sven's Voice DNA
✅ **DO:**
- Write like you're explaining to a technical friend over coffee
- Use specific examples from your own experience
- Be honest about limitations and trade-offs
- Call out marketing BS when you see it
- Share real costs, real setup time, real frustrations
- Use "I" and "you" (conversational, not corporate)
- Include actual code/commands when relevant

❌ **DON'T:**
- Use corporate speak ("leverage", "synergy", "revolutionary")
- Make blanket claims ("best", "perfect", "game-changer")
- Hide sponsored content (we don't do undisclosed ads)
- Oversell tools (honesty > hype)
- Write like a press release
- Use passive voice excessively

### Tone Principles
1. **Technical but accessible** — Explain complex concepts simply
2. **Honest > hyped** — Real experience, not marketing copy
3. **Builder perspective** — "Here's what I actually built with it"
4. **Opinionated** — Have a take, don't sit on the fence
5. **Helpful** — Reader should walk away knowing what to do

### Example Transformations
❌ **Corporate:** "This revolutionary platform leverages cutting-edge AI to transform your workflow"  
✅ **Sven:** "This tool uses Claude to automate code reviews. It works, but setup takes 2 hours and costs $20/month."

❌ **Generic:** "Many users find this helpful for various tasks"  
✅ **Sven:** "I used this to refactor 50 API endpoints. Saved me 3 days, but it screwed up error handling twice."

---

## Content Workflow

### Weekly Process

#### Monday (News Roundup)
**9:00 AM** — Automated discovery runs (via `pnpm discover`)
- Pulls HN, GitHub Trending, Product Hunt, AI Twitter
- Outputs JSON of potential stories

**10:00 AM** — Mason enriches & drafts roundup
- Filters top 10 stories
- Generates draft using template
- Saves to `content/articles/roundup-YYYY-MM-DD.md`

**11:00 AM** — Sven reviews & edits
- 15-30 min review
- Add personal takes
- Polish intro/outro

**12:00 PM** — Publish
- Run `pnpm publish:article roundup-YYYY-MM-DD`
- Auto-posts to Twitter, LinkedIn
- Triggers newsletter queue

---

#### Thursday (Deep Review)
**Tuesday 9:00 AM** — Topic selection
- Pick from calendar (pre-planned)
- Or from trending tools this week

**Tuesday 10:00 AM - Wednesday 5:00 PM** — Hands-on testing
- Install/use the tool for real work
- Take notes, screenshots, code samples
- Document what works, what doesn't

**Thursday 9:00 AM** — Mason drafts initial structure
- Uses template + Sven's notes
- Fills in technical details
- Generates comparisons

**Thursday 11:00 AM** — Sven rewrites & adds voice
- 1-2 hours editing
- Add personal experiences
- Punch up intro/conclusion
- Verify all claims

**Thursday 2:00 PM** — Publish
- Same distribution as Monday

---

## Distribution Checklist

Every article must:
- [ ] Published on agents.tips
- [ ] RSS feed updated
- [ ] Tweeted from @agentstips
- [ ] Posted on Sven's LinkedIn (with personal intro)
- [ ] Cross-posted to dev.to (optional, if relevant)
- [ ] Added to newsletter queue (if weekly newsletter running)
- [ ] Internal linked to 2-3 related agent pages

---

## Quality Checklist

Before publishing:
- [ ] Title is clear and specific (not clickbait)
- [ ] Excerpt is compelling (150 chars)
- [ ] Reading time is accurate
- [ ] All links work
- [ ] Images/screenshots are optimized (WebP, <100KB)
- [ ] Code blocks use proper syntax highlighting
- [ ] SEO metadata complete (title, description, OG image)
- [ ] No typos (run through Grammarly or similar)
- [ ] Voice sounds like Sven (not AI slop)

---

## Success Metrics

Track weekly:
- **Pageviews** per article
- **Time on page** (target: >3 min)
- **Social shares** (Twitter, LinkedIn)
- **Backlinks** from other sites
- **Newsletter signups** from article CTAs

Monthly goals:
- 10K pageviews/month by March
- 5 backlinks/month from quality sites
- 500 newsletter subscribers by April

---

## Content Ideas Backlog

### Tool Deep-Dives
- Cursor vs Windsurf vs Continue
- Devin review (worth $500/month?)
- GitHub Copilot Workspace
- Windsurf flow mode
- Aider (terminal-based coding)
- CodeGPT vs Cody
- Replit Agent
- v0.dev for UI generation
- Bolt.new vs Lovable
- Pythagora (full-stack agent)

### Comparisons
- AutoGPT vs CrewAI vs LangGraph
- ChatGPT vs Claude vs Gemini for coding
- Open source vs commercial agents
- Local LLMs vs API services

### How-To Guides
- Building a personal agent stack
- Setting up Clawdbot for daily workflow
- Using AI agents for API integration
- Automating content with AI agents
- AI-powered code review workflow

### Industry Analysis
- State of AI Agents Q1 2026
- Why agents are replacing SaaS
- The end of prompt engineering
- AI agents for solo developers
- The $20/month AI stack

---

## Automation

### Current Setup
- **Discovery**: `pnpm discover` (runs via cron)
- **Drafting**: Mason via Clawdbot agent CLI
- **Publishing**: Manual (Sven reviews)
- **Distribution**: Semi-automated (scripts + manual social)

### Future Enhancements
- [ ] Automatic draft generation (Mason writes first draft)
- [ ] One-click publish flow (script handles all distribution)
- [ ] A/B testing titles (track CTR)
- [ ] Auto-generate OG images (via @vercel/og)
- [ ] Schedule posts in advance (queue system)
- [ ] Auto-crosspost to Medium, dev.to, HackerNoon

---

## Notes

- This is v1. Adjust based on what resonates with readers.
- Priority: consistency over perfection. Ship weekly.
- Voice > polish. Better to be authentic than perfectly edited.
- Track what works. Double down on popular topics.

---

**Mason (worker): Editorial system documented. Ready to draft first articles.**
