# agents.tips Launch Checklist

**Date:** 2026-01-28
**Status:** Ready to Deploy (pending Supabase production setup)

## ✅ Completed

### 1. 20 Curated AI Agents
All 20 agents seeded in SQL migration file:

| Agent | Category | Featured |
|-------|----------|----------|
| Clawdbot | coding_agents | ✅ |
| Cursor | coding_agents | ✅ |
| Windsurf | coding_agents | ✅ |
| Claude Code | coding_agents | ✅ |
| Codex CLI | coding_agents | ❌ |
| Devin | autonomous_agents | ✅ |
| GitHub Copilot | code_completion | ✅ |
| AutoGPT | autonomous_agents | ✅ |
| LangChain | agent_frameworks | ✅ |
| CrewAI | agent_frameworks | ✅ |
| Aider | coding_agents | ✅ |
| Continue.dev | code_completion | ❌ |
| Replit Agent | app_builders | ✅ |
| v0 by Vercel | app_builders | ✅ |
| Bolt.new | app_builders | ✅ |
| Lovable | app_builders | ❌ |
| Codeium | code_completion | ❌ |
| Tabnine | code_completion | ❌ |
| AgentGPT | autonomous_agents | ❌ |
| Phidata | agent_frameworks | ❌ |

### 2. Content Quality
- ✅ Builder-focused descriptions (not corporate BS)
- ✅ Pros/cons for each agent
- ✅ Accurate pricing/access info
- ✅ Working website URLs

### 3. Database Schema
- ✅ Products table with proper columns
- ✅ Categories, tags, labels tables
- ✅ Affiliate tracking support
- ✅ user_id made nullable for Content Machine

### 4. Seed Files Created
- `supabase/migrations/20260130000000_seed_20_launch_agents.sql` - Main seed file

## 🔴 Blockers - Action Required

### Production Supabase Setup

The Vercel deployment currently has **placeholder Supabase credentials**. Need to:

1. **Create Supabase Project** (if not exists)
   ```bash
   # Go to https://supabase.com/dashboard
   # Create new project: "agents-tips-prod"
   # Note the Project URL and API keys
   ```

2. **Apply Migrations**
   ```bash
   # Link project
   supabase link --project-ref <your-project-ref>
   
   # Push migrations
   supabase db push
   ```

3. **Seed the 20 Agents**
   ```bash
   # Option A: Via CLI (after linking)
   psql "$SUPABASE_DB_URL" -f supabase/migrations/20260130000000_seed_20_launch_agents.sql
   
   # Option B: Via Supabase Dashboard
   # 1. Go to SQL Editor
   # 2. Paste contents of seed file
   # 3. Run
   ```

4. **Update Vercel Environment Variables**
   ```bash
   # Set real values in Vercel Dashboard or CLI:
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY production
   vercel env add SUPABASE_SECRET_KEY production  # If needed
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Verification Steps

After deployment:

- [ ] Site loads at https://agents.tips
- [ ] Homepage shows 20+ agents
- [ ] Search works (type "cursor" or "devin")
- [ ] Category filters work (coding_agents, app_builders, etc.)
- [ ] Individual agent pages load (/products/cursor)
- [ ] Submit form works
- [ ] Newsletter signup works

## Quick Seed Command (for local testing)

```bash
cd /home/sven/Documents/agents-tips
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -f supabase/migrations/20260130000000_seed_20_launch_agents.sql
```

## Local Dev Verification

Local database already seeded. To verify:
```bash
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -c "SELECT codename, categories FROM products WHERE categories IN ('coding_agents', 'autonomous_agents', 'agent_frameworks', 'code_completion', 'app_builders') ORDER BY codename;"
```

---

**Next Step:** Sven needs to:
1. Create production Supabase project (or use existing)
2. Share project reference OR run the setup commands above
3. Trigger Vercel redeploy

Once Supabase is connected, the 20 agents will be live.
