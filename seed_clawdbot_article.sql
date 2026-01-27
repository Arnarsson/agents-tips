-- Seed the Clawdbot case study article

INSERT INTO public.articles (
  slug,
  title,
  subtitle,
  excerpt,
  content,
  content_type,
  author_id,
  reading_time_minutes,
  tags,
  published,
  featured,
  published_at,
  meta_title,
  meta_description
) VALUES (
  'clawdbot-case-study',
  'Clawdbot: Building a Self-Hosted AI Agent That Actually Works',
  'My experience building a 24/7 AI assistant with Claude — from idea to production',
  'Most AI coding assistants sit idle until you need them. Clawdbot is different: it runs 24/7, proactively manages tasks, and integrates deeply with your entire workflow. Here's what I learned building it.',
  '# Clawdbot: Building a Self-Hosted AI Agent That Actually Works

Most AI coding assistants sit idle until you need them. You open Cursor, type a prompt, get a response, maybe accept some code. Then it''s back to waiting.

**Clawdbot is different.** It runs 24/7 in the background, proactively manages tasks, monitors systems, and integrates with everything from Telegram to GitHub to your calendar. It''s not just a tool — it''s closer to having another developer on your team.

I built Clawdbot over the past few months as an experiment: *What if your AI assistant never slept?* Here''s what I learned.

## The Problem: AI Assistants Are Too Passive

Traditional coding assistants have a fundamental limitation: they''re **reactive**. You have to explicitly ask for help. This works fine for focused tasks like "refactor this function" or "explain this error." But it completely misses the majority of software work:

- Monitoring systems and catching issues before they blow up
- Remembering to follow up on that PR review you promised  
- Keeping track of what you were working on when you left yesterday
- Checking if your CI pipeline failed overnight
- Organizing scattered notes across files, emails, and chat

These aren''t coding problems. They''re **context and workflow problems**. And no amount of autocomplete fixes them.

## Enter Clawdbot: The Always-On Agent

Clawdbot runs as a daemon on your machine (or server). It''s built on Claude via Anthropic''s API, with a plugin architecture called "skills" that let it do pretty much anything:

- **Message you proactively** on Telegram, Signal, WhatsApp, or Discord
- **Monitor files and logs** for changes or errors
- **Manage cron jobs** and scheduled tasks
- **Control your browser** (via Playwright/Puppeteer)
- **Access your calendar, email, GitHub** — anything with an API
- **Remember context** across sessions with memory files

It''s like having a junior developer who:
- Never gets tired
- Remembers everything
- Works 24/7 without complaining
- Costs ~$20/month in API fees

## Architecture: Skills, Not Monoliths

The core insight behind Clawdbot is **modularity**. Instead of one massive "do everything" agent, it''s a small core with composable skills.

Each skill is a self-contained Node.js module with:
- Its own dependencies
- Its own documentation (SKILL.md)
- Its own tools and capabilities

Current skills include:
- **messaging**: Send/receive via Telegram, Signal, WhatsApp, Discord
- **browser**: Control web browsers for automation
- **camera**: Capture photos from connected devices  
- **screen**: Record screen activity
- **nodes**: Manage paired devices (phones, laptops)
- **calendar**: Read and create events
- **cron**: Schedule recurring tasks
- **files**: Read, write, search files

Want Clawdbot to check your inbox every hour? Install the `email` skill. Need it to monitor server logs? Add a `log-watcher` skill. It''s Lego blocks, not a walled garden.

## Real-World Use Cases

Here''s what I actually use Clawdbot for:

### 1. Proactive System Monitoring
Clawdbot checks my servers every 30 minutes. If disk usage spikes, if a service crashes, if API errors spike — it pings me on Telegram with context and suggested fixes.

Before Clawdbot, I''d discover these issues when users complained. Now I often fix them before anyone notices.

### 2. Meeting Notes and Follow-Ups
After every meeting, I dump my notes into a file. Clawdbot reads them, extracts action items, and creates Linear issues automatically. Then it reminds me about follow-ups if I don''t do them.

It''s like having an assistant who actually reads your notes.

### 3. Code Review Reminders
Clawdbot watches my GitHub notifications. If someone requests a review and I don''t respond in 24 hours, it reminds me. If I promise to review "tomorrow" in a comment, it literally reminds me tomorrow.

Turns out AI is really good at being annoying in helpful ways.

### 4. Daily Standup Summaries
Every morning, Clawdbot summarizes:
- What I shipped yesterday (from git commits)
- What''s on my calendar today
- Open PRs waiting for me
- Tasks I marked as "today" in Linear

It''s like having a personal assistant who actually knows what you''re working on.

## The Trade-offs: What You Give Up

Clawdbot isn''t perfect. Here''s what you sacrifice for the "always-on" model:

### Privacy
Clawdbot has access to *everything*. Your files, your messages, your calendar, your emails. If you''re not comfortable with an AI seeing your work, this isn''t for you.

(That''s why it''s self-hosted. Your data never leaves your machine unless you explicitly connect external APIs.)

### API Costs
Running Claude 24/7 isn''t free. My monthly bill is around $15-30 depending on how chatty I am. For reference:
- Heartbeat checks: ~$5/month
- Active conversations: ~$10-20/month  
- Heavy automation days: up to $50/month

Still cheaper than hiring someone.

### Setup Complexity
Clawdbot isn''t plug-and-play. You need:
- A server (or always-on machine)
- API keys for services you want to integrate  
- Basic command-line skills
- Time to configure skills and workflows

If you''re not technical, this is a non-starter. If you are, it''s empowering.

## Lessons Learned

Building Clawdbot taught me a lot about what makes AI agents *actually useful* vs. just impressive demos:

### 1. Context is Everything
The most valuable feature of Clawdbot isn''t its intelligence — it''s its memory. It remembers what you told it yesterday. It knows what project you''re working on. It understands your workflow.

Stateless AI (like ChatGPT) always starts from zero. Stateful agents build on history.

### 2. Proactive > Reactive
The best features of Clawdbot are the ones I *didn''t ask for*. The system monitoring that catches bugs before I notice. The reminder about a meeting 10 minutes before it starts. The summary of overnight activity when I wake up.

Reactive assistants wait to be asked. Proactive agents anticipate needs.

### 3. Autonomy Requires Trust
Letting an AI create GitHub issues, send messages, or modify files requires trust. I''ve had Clawdbot accidentally spam Telegram channels. I''ve had it create duplicate issues. I''ve had it misinterpret context and do the wrong thing.

But over time, I''ve learned to constrain it: "Ask before creating more than 3 issues." "Only send messages between 8 AM and 10 PM." "Don''t auto-commit code."

The right level of autonomy isn''t "full" — it''s "just enough to be helpful."

### 4. Voice Changes Everything
One unexpected discovery: voice output. Clawdbot can read messages aloud using ElevenLabs TTS. This sounds gimmicky, but it''s incredible for:
- Listening to long summaries while cooking
- Getting meeting reminders without looking at your phone  
- Bedtime stories for kids (yes, really)

Turns out AI that can *speak* feels way more like a real assistant.

## Who Should Use Clawdbot?

Clawdbot is for you if:
- You''re comfortable with the command line
- You value automation and workflows
- You''re okay with AI seeing your work  
- You want something more than autocomplete
- You''re willing to invest setup time for long-term gains

Clawdbot is *not* for you if:
- You want plug-and-play simplicity (use Cursor or GitHub Copilot)
- You''re not technical
- You''re privacy-paranoid about AI (fair)  
- You just need code completion

## The Future: Agents Everywhere

I think we''re at the beginning of a shift. The next generation of AI tools won''t be apps you open when you need help — they''ll be agents that run in the background, learning your workflows, anticipating your needs, and handling the boring stuff so you can focus on the interesting problems.

Clawdbot is my experiment in that direction. It''s rough around the edges, but it works. And it''s taught me that the future of AI isn''t just "better autocomplete" — it''s "AI that actually understands your life."

---

## Try It Yourself

Clawdbot is open source and self-hostable. If you want to try it:

**GitHub:** [github.com/cased/clawdbot](https://github.com/cased/clawdbot)  
**Docs:** [docs.clawdbot.dev](https://docs.clawdbot.dev)  
**Discord:** [discord.gg/clawdbot](https://discord.gg/clawdbot)

Fair warning: it''s not beginner-friendly yet. But if you''re technical and curious, it''s a fun rabbit hole.

---

**Questions? Thoughts?** Hit me up on Twitter [@svenarnarson](https://twitter.com/svenarnarson) or join the Clawdbot Discord. I''m always curious to hear how people are using (or breaking) it.

---

*This is part of our "Builder Reviews" series — deep-dives on AI tools from a hands-on developer perspective. No corporate speak, no sponsored fluff, just real experience. Next up: Cursor vs Windsurf vs Continue — which AI IDE actually ships code?*',
  'tool-review',
  '00000000-0000-0000-0000-000000000001',
  12,
  ARRAY['Clawdbot', 'Claude', 'Autonomous Agents', 'Self-Hosted', 'Case Study'],
  true,
  true,
  now(),
  'Clawdbot Case Study: Building a Self-Hosted AI Agent | agents.tips',
  'Deep-dive into building Clawdbot, a 24/7 AI agent built on Claude. Architecture, real-world use cases, trade-offs, and lessons learned from a builder''s perspective.'
) ON CONFLICT (slug) DO NOTHING;
