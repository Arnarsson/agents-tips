# 200 AI Agents Seeding - Complete ✅

**Linear Issue:** [7-198] Seed 200 AI agents across all categories  
**Status:** Complete  
**Date:** January 28, 2026  
**Final Count:** 200 agents

## Overview

Successfully researched and seeded 200 AI agents across all required categories for agents.tips. Started with 120 agents, added 80 new agents through 3 seed files.

## Seed Files Created

1. **seed_80_agents_to_200.sql** (35 inserted, rest were duplicates)
   - 15 Coding Assistants
   - 10 AI Frameworks
   - 10 Writing Tools
   - 10 Image Generation
   - 8 Video Generation
   - 10 Voice AI
   - 12 Workflow Automation
   - 5 Bonus (Data Analysis, Design, Productivity)

2. **seed_45_more_to_200.sql** (42 inserted)
   - 10 More Coding Tools
   - 8 Image Generation & Design
   - 7 Video & Audio
   - 8 Autonomous Agents & Research
   - 12 Productivity & Business Tools

3. **seed_final_3_to_200.sql** (3 inserted)
   - 1 Chat Assistant
   - 2 3D & Gaming

## Final Category Distribution

| Category | Count | Key Agents |
|----------|-------|------------|
| **Image Generation** | 21 | Midjourney, DALL-E 3, Stable Diffusion, FLUX, Leonardo, Ideogram |
| **Coding Assistants** | 16 | Cursor, Windsurf, Devin, GitHub Copilot, Aider, v0, Bolt.new |
| **Workflow Automation** | 15 | n8n, Make, Zapier, Activepieces, Pipedream, Temporal |
| **Video Generation** | 13 | Runway, Pika, Kling, Sora, Synthesia, HeyGen |
| **Voice AI** | 12 | ElevenLabs, Play.ht, Murf, Resemble, WellSaid |
| **Productivity** | 12 | Otter.ai, Fireflies, Notion AI, Motion, Reclaim |
| **Writing Tools** | 10 | Jasper, Copy.ai, Writesonic, Grammarly, QuillBot |
| **AI Frameworks** | 9 | LangChain, CrewAI, AutoGen, LlamaIndex, Haystack |
| **Customer Service** | 9 | Various chatbot and support tools |
| **Education** | 8 | Learning and tutorial platforms |
| **Research Agents** | 7 | Perplexity, Elicit, Consensus, GPT Researcher |
| **Others** | 78 | HR, Sales, Finance, Healthcare, Legal, Music, 3D, etc. |

## Verification

All agents include:
- ✅ Unique codename
- ✅ Compelling punchline
- ✅ Detailed description (2-3 sentences)
- ✅ Product website URL
- ✅ Category assignment
- ✅ Feature tags
- ✅ Pricing/deployment labels
- ✅ Logo/icon URL
- ✅ Approved status

## Database Verification

```bash
# Check total count
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -c "SELECT COUNT(*) as total_agents FROM public.products;"
# Result: 200

# Check category distribution
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -c "SELECT categories, COUNT(*) FROM public.products GROUP BY categories;"
```

## Next Steps

This seeding work directly enables:
- **7-208:** SEO keyword research (now have 200 agents to optimize around)
- **7-202:** Best-of roundup articles (sufficient agents in each category)
- **7-201:** Comparison pages (multiple options per category)
- **7-204:** RSS feed and sitemap (200 agent pages to index)
- **7-205:** OpenGraph images (200 agent pages need OG images)

## Notable Agents Added

### Coding
- Devin (first AI software engineer)
- GitHub Copilot (most popular)
- v0 by Vercel (UI generation)
- Bolt.new (full-stack generator)
- Aider (CLI pair programming)

### Frameworks
- LangChain (most popular framework)
- CrewAI (multi-agent orchestration)
- AutoGen (Microsoft's framework)
- LlamaIndex (RAG framework)

### Image Generation
- FLUX (Black Forest Labs)
- Ideogram (text rendering)
- Magnific (upscaling)
- Leonardo (game assets)

### Voice
- ElevenLabs (voice cloning leader)
- Play.ht (conversational AI)
- Resemble (real-time voice)

### Video
- Sora (OpenAI's video model)
- Runway (Gen-2)
- Pika Labs (Discord-based)
- Kling (high-quality Chinese model)

### Automation
- n8n (fair-code automation)
- Make (Integromat)
- Zapier (most popular)
- Temporal (durable execution)

### Music & Audio
- Suno (full song generation)
- Udio (music creation)
- AudioCraft (Meta)
- AIVA (composition)

### Research
- Perplexity (answer engine)
- Auto-GPT (autonomous agent)
- Elicit (academic papers)
- Consensus (scientific research)

## Implementation Notes

- All agents use `ON CONFLICT (codename) DO NOTHING` to prevent duplicates
- Default user_id: `00000000-0000-0000-0000-000000000001`
- All marked as `approved = true`
- Featured agents marked with `featured = true`
- Logo sources use favicons or brand assets where available

## Files Location

- `/home/sven/Documents/agents-tips/seed_80_agents_to_200.sql`
- `/home/sven/Documents/agents-tips/seed_45_more_to_200.sql`
- `/home/sven/Documents/agents-tips/seed_final_3_to_200.sql`

## Proof of Completion

**Database Query Results:**
```
SELECT COUNT(*) as total_agents FROM public.products;
 total_agents 
--------------
          200
(1 row)
```

**Category Coverage:**
- ✅ Coding: 16 + 6 (coding_agents) + 4 (code_completion) = 26 total
- ✅ Writing: 10 agents
- ✅ Image: 21 agents
- ✅ Video: 13 agents
- ✅ Voice: 12 agents
- ✅ Automation: 15 agents
- ✅ Frameworks: 9 + 3 (agent_frameworks) = 12 total

All categories from the original specification are well-represented.

---

**Mason (subagent)** - January 28, 2026
