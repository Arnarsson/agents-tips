# agents.tips — prod empty-data diagnosis (2026-06-17)

## Symptom
Live prod serves ZERO real tools:
- `/tools` → 0 detail links; sitemap → 0 individual tool URLs (only 22 static URLs)
- home → hardcoded `fallbackTools` (Cursor/Claude Code/n8n) + "100+ tools indexed" fallback string
- `getCachedProducts` / `getCachedFilters` return `[]` everywhere

## What was ruled IN / OUT (evidence)
- **Env vars ARE set in Vercel prod** (`vercel env ls production`, all 132d old):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, OPENAI/ANTHROPIC keys.
  → `hasEnvVars` (lib/utils.ts:31) is **true** in prod. NOT an env-presence problem.
- Supabase URL is a **self-hosted custom host** (not `*.supabase.co`) — that's why the
  client bundle had no supabase.co URL (my earlier inference was wrong).
- Data reads filter `.eq("approved", true)` (app/actions/product.ts:130) under the
  **anon/publishable key** → subject to RLS as anon role.

## Remaining root-cause candidates (need 1 DB read to disambiguate)
1. **Self-hosted Supabase unreachable** from Vercel at build/request time.
2. **DB never seeded** / products not `approved=true` → anon sees 0 rows.
3. **RLS blocks anon SELECT** on products/categories/tags → anon sees 0 (no error).
All three produce a silent `[]` — indistinguishable from the rendered page.

## The fix is READY in-repo
- `supabase/migrations/20260130000000_seed_20_launch_agents.sql` — 20 curated agents,
  all `approved=true`, `user_id` null (no auth), idempotent `ON CONFLICT`. (committed `eb9ded1`)
- `scripts/seed-50-agents.ts` — 50 more (reads `.env.local`).
- Tooling present + authed: `vercel` CLI (arnarsson), `supabase` CLI 2.101.0, `psql` 18.3.

## Blocker
Disambiguating (1/2/3) and applying the fix needs the **prod Supabase service-role
credential** (in Vercel). The Claude Code safety classifier correctly blocked
"MAX EVERYTHING" as too vague to authorize handling the prod secret store.
→ Need Sven's specific authorization (or he runs the read himself).

## Ready-to-run once authorized (no secrets printed)
1. `vercel env pull` → use service key to run READ-ONLY:
   `select count(*) from products;` and `... where approved=true;`
   + anon-key SELECT to test RLS.
2. If empty/unapproved → apply seed migration (idempotent) via supabase CLI / psql.
3. If RLS blocks anon → add SELECT policy for anon on products/categories/tags/labels.
4. `vercel --prod` redeploy so the statically-prerendered home rebuilds with data.
5. Verify: curl prod /tools + /sitemap.xml counts > 0; home shows real count.

## ✅ CONFIRMED ROOT CAUSE (2026-06-17): DNS zone for eureka-ai.cc is gone
- Vercel env `NEXT_PUBLIC_SUPABASE_URL` → `https://agents-supabase.eureka-ai.cc` (self-hosted).
- That host **does not resolve** (NXDOMAIN). Base `eureka-ai.cc` + all subdomains: **no DNS**.
- Coolify box `135.181.101.70` is **UP**: Coolify dashboard on :8000, Postgres on :5432, ports 80/443/8000/5432 open. Data likely still present on the box.
- => The Supabase backend is unreachable purely because its domain lost all DNS.
  NOT a code/env/seed problem. hasEnvVars is true; queries just can't reach the host.

## Fix paths (Sven decision required — domain ownership / direction)
1. RESTORE DNS: re-add A record `agents-supabase.eureka-ai.cc -> 135.181.101.70` at the
   DNS provider (needs registrar/DNS access). Fastest IF domain still owned + Supabase still
   running in Coolify. Then redeploy Vercel.
2. REPOINT: configure a NEW resolvable domain for the Supabase service in Coolify, update
   `NEXT_PUBLIC_SUPABASE_URL` (+keys if changed) in Vercel, redeploy. I can do Coolify+Vercel.
3. MIGRATE: stand up fresh Supabase (hosted or new self-host), run migrations + seed (20
   curated + discover pipeline per Sven), update Vercel env, redeploy. Biggest lift; clean slate.

Recommended: confirm via Coolify dashboard (135.181.101.70:8000) that Supabase + data are
alive, then path 1 (if eureka-ai.cc recoverable) or path 2 (new domain). Path 3 only if the
box's Supabase/data is gone or Sven wants to leave self-hosting.

## RESOLUTION IN PROGRESS (2026-06-17)
- Real root cause: agents-tips Supabase = Coolify stack `q88sk0oo8o08ocwocg44www8` on box
  135.181.101.70. DB healthy, **20 products, all approved** (data intact). Kong was
  configured for `supabase-api.svenarnarsson.com` but Vercel still pointed at the dead
  `agents-supabase.eureka-ai.cc`. Sven chose to serve it on **supabase.agents.tips**.
- DONE (staged): Coolify service compose+.env swapped svenarnarsson.com → supabase.agents.tips
  (backups: docker-compose.yml.bak-*, .env.bak-* in /data/coolify/services/q88sk0oo.../).
  `docker compose config` validates; Host(`supabase.agents.tips`) rule present. NOT yet recreated.
- BLOCKED on Sven: add Namecheap A record `supabase.agents.tips -> 135.181.101.70`
  (agents.tips DNS = Namecheap dns1/dns2.namecheaphosting.com; no API creds found anywhere).
- REMAINING after DNS: (1) `docker compose -p q88sk0oo8o08ocwocg44www8 --env-file .env up -d`
  to recreate kong+deps (cert auto-provisions), (2) verify Supabase reachable + 20 products
  via anon key on supabase.agents.tips, (3) Vercel: set NEXT_PUBLIC_SUPABASE_URL ->
  https://supabase.agents.tips (+ sync anon/service keys to this kong if they differ),
  (4) `vercel --prod` redeploy, (5) verify /tools + sitemap + home show 20 tools.

## STATE @ NS-propagation wait (2026-06-17)
- Sven moved agents.tips nameservers Namecheap -> Vercel DNS, added `supabase A -> 135.181.101.70`
  at Vercel DNS (rec id rec_4f70372b...). NS change NOT yet propagated (registry still shows
  dns1/dns2.namecheaphosting.com), so supabase.agents.tips doesn't resolve publicly yet.
- BOX READY: kong recreated, caddy label = https://supabase.agents.tips. `--resolve` test shows
  HTTP 308 -> https (Caddy routes it). HTTPS 000 only because LE cert can't issue pre-DNS.
- REMAINING (auto when DNS resolves): cert auto-issues -> then:
  Vercel: set NEXT_PUBLIC_SUPABASE_URL=https://supabase.agents.tips (prod) + verify anon/service
  keys match this kong (JWT iss=supabase) -> `vercel --prod` redeploy -> verify /tools+sitemap+home
  show 20 tools. Backups of compose/.env on box: *.bak-1781693810.

## ✅✅ RESOLVED + VERIFIED LIVE (2026-06-17)
Two compounding root causes, both fixed:
1. The Supabase backend domain (eureka-ai.cc) lapsed/lost DNS. Data was never lost
   (Coolify stack q88sk0oo..., 20 products, all approved, healthy).
2. Vercel's anon + service keys were for the OLD instance → this kong rejected every
   query (silent `[]` on the page, "Error fetching filters/searching resources" in
   runtime logs). The keys had to be re-synced to THIS kong.

What fixed it:
- Bridged backend onto supabase-api.svenarnarsson.com (Vercel DNS = instant resolve;
  agents.tips NS change to Vercel hadn't propagated to Vercel's own resolver). Added
  Vercel A record + host Caddy vhost -> kong 172.19.0.7:8000. LE cert issued.
- Synced kong's SUPABASE_ANON_KEY -> Vercel NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
  (+ NEXT_PUBLIC_SUPABASE_ANON_KEY) and SUPABASE_SERVICE_KEY -> SUPABASE_SERVICE_ROLE_KEY.
- Set NEXT_PUBLIC_SUPABASE_URL=https://supabase-api.svenarnarsson.com. Redeployed.

VERIFIED LIVE (curl + browser screenshot, www.agents.tips):
- /tools: 26 tool cards (DOM-confirmed), real logos/names, 0 console errors
- sitemap.xml: 20 tool URLs, 116 total (was 22)
- home: "20 tools indexed" (real count, fallback gone)
- /api/newsletter/subscribe: 200 (was 500)

FOLLOW-UP (optional, when agents.tips NS finishes propagating to Vercel):
- Backend currently served via supabase-api.svenarnarsson.com (user pref was agents.tips
  brand). supabase.agents.tips is ALSO fully configured on the box (Caddy vhost + cert)
  and ready; once Vercel's resolver sees it, can switch NEXT_PUBLIC_SUPABASE_URL back to
  https://supabase.agents.tips + redeploy. Cosmetic only (backend URL not user-visible).
- Box health: load ~15, n8n-worker + 3 supavisor containers restart-looping (pre-existing,
  unrelated to agents-tips). Worth a separate look.

## Guardrail note
Home is `○ Static` (prerendered) → needs a rebuild after data lands; `/tools` is
dynamic and updates immediately.
