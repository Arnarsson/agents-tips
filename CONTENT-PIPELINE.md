# Automated Content Pipeline

This document describes the automated content discovery and publishing pipeline for agents.tips.

## Overview

The pipeline automatically discovers, crawls, enriches, and prepares new AI agents for publication. It runs weekly and generates a review queue for manual approval before going live.

## Pipeline Stages

### Stage 0: Discovery 🔍
**Script:** `pnpm discover` (or `pnpm discover:agents`)

Monitors multiple sources for new AI agents:
- **Hacker News** - AI agent discussions and launches
- **GitHub Trending** - Popular AI repositories by topic
- **Product Hunt** - AI category (requires manual config)

**Output:** List of URLs to crawl

### Stage 1: Crawl 🕷️
**Script:** `pnpm crawl` (included in `pnpm auto-pipeline`)

Uses Puppeteer to scrape discovered URLs:
- Extracts title, description, logo
- Captures H1/H2/H3 content for context
- Handles anti-bot protections with stealth mode

**Output:** Raw scraped data JSON files

### Stage 2: Enrich 🤖
**Script:** `pnpm enrich` (included in `pnpm auto-pipeline`)

Uses AI models (Claude/GPT) to:
- Generate structured product descriptions
- Extract features and capabilities
- Categorize and tag products
- Create SEO-optimized content

**Output:** Enriched data ready for review

### Stage 3: Review Queue 📋
**Manual step**

Enriched data is saved to `supabase/seed/src/stage-2-enrich/__data__/enriched-*.json`

Review checklist:
- [ ] Product description is accurate
- [ ] Categories and tags are appropriate
- [ ] Logo URL is valid
- [ ] Pricing information is correct
- [ ] No duplicate entries

### Stage 4: Seed Database 💾
**Script:** `pnpm enrich-seed`

Inserts approved products into Supabase database.

## Running the Pipeline

### One-time Discovery
```bash
pnpm discover
```

### Full Automated Pipeline
```bash
pnpm auto-pipeline
```

This runs:
1. Discovery (find new agents)
2. Crawl (scrape their websites)
3. Enrich (AI enhancement)
4. Save to review queue

### Weekly Automation

#### Option 1: System Cron (Linux/Mac)
```bash
# Add to crontab (edit with: crontab -e)
# Runs every Monday at 9 AM
0 9 * * 1 cd /home/sven/Documents/agents-tips && pnpm auto-pipeline >> /tmp/agents-tips-pipeline.log 2>&1
```

#### Option 2: Clawdbot Cron (if using Clawdbot)
```bash
# Add to Clawdbot HEARTBEAT.md or skills/cron
clawdbot cron add "0 9 * * 1" "cd /home/sven/Documents/agents-tips && pnpm auto-pipeline"
```

#### Option 3: GitHub Actions (CI/CD)

✅ Implemented in this repo as:
- `.github/workflows/agent-discovery.yml`

It runs weekly (and supports manual trigger) and uploads the discovery/crawl/enrichment JSON as workflow artifacts.

**Secrets to add in GitHub → Settings → Secrets and variables → Actions:**
- `ANTHROPIC_API_KEY` (recommended)
- or `OPENAI_API_KEY`
- optional: `PRODUCTHUNT_TOKEN` (when ProductHunt integration is implemented)


## Configuration

### Discovery Sources

Edit `supabase/seed/src/stage-0-discover/sources.ts` to customize:
- Search queries for Hacker News
- GitHub topics to monitor
- Filters and ranking criteria

### AI Models

Edit `supabase/seed/src/stage-2-enrich/ai-client.ts` to configure:
- Model selection (Claude, GPT, local)
- Temperature and parameters
- Cost optimization

### Crawling

Edit `supabase/seed/src/stage-1-crawl/index.ts` to adjust:
- Concurrency (default: 20)
- Timeouts
- Retry logic

## Goal

**Target:** 5 new listings per week on autopilot

With weekly automation:
- ~20-30 agents discovered weekly
- ~10-15 successfully crawled and enriched
- ~5 approved and published after review

## Analytics & Monitoring

Track pipeline performance:
```bash
# View discovery logs
cat supabase/seed/src/stage-0-discover/__data__/discovery-log.json

# View enriched data
ls -lh supabase/seed/src/stage-2-enrich/__data__/

# Check for errors
tail -f /tmp/agents-tips-pipeline.log
```

## Troubleshooting

### "No new agents discovered"
- Sources may be rate-limiting
- Check API connectivity
- Review search queries (may need updates)

### "Crawler failed"
- Ensure Chrome is installed: `pnpm install-browser`
- Check for anti-bot measures
- Reduce concurrency if timeouts occur

### "Enrichment failed"
- Verify ANTHROPIC_API_KEY or OPENAI_API_KEY in `.env.local`
- Check API rate limits
- Review AI model availability

## Future Enhancements

- [ ] Product Hunt API integration (requires OAuth)
- [ ] Twitter monitoring for AI agent launches
- [ ] Reddit r/LocalLLaMA and r/MachineLearning
- [ ] Automatic approval for high-confidence matches
- [ ] Email notifications for weekly discoveries
- [ ] Slack/Discord webhooks for review queue
