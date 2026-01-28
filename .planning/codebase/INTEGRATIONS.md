# External Integrations

**Analysis Date:** 2026-01-28

## APIs & External Services

**AI/LLM Services:**
- Anthropic Claude API - AI enrichment for product submissions
  - SDK: `@ai-sdk/anthropic` 2.0.4
  - Models: `claude-3-5-haiku-20241022`, `claude-sonnet-4-20250514`
  - Auth: `ANTHROPIC_API_KEY`
  - Usage: `supabase/seed/src/stage-2-enrich/ai-client.ts`, `app/(protected)/submit-new/action.ts`
  - Purpose: Auto-tagging products, generating labels, content enrichment

- OpenAI GPT API - Alternative AI provider for product enrichment
  - SDK: `@ai-sdk/openai` 2.0.15
  - Models: `gpt-5-nano`, `gpt-5-mini`
  - Auth: `OPENAI_API_KEY`
  - Usage: `app/(protected)/submit-new/action.ts` (fallback if Anthropic unavailable)
  - Purpose: Same as Anthropic, provides cost/performance flexibility

**Email Service:**
- Resend - Email delivery and newsletter campaigns
  - SDK: `resend` 6.9.1
  - Auth: `RESEND_API_KEY`
  - From Address: `RESEND_FROM_EMAIL` (default: `newsletter@agents.tips`)
  - Usage: `app/api/newsletter/subscribe/route.ts`, `app/api/newsletter/drip/route.ts`
  - Purpose: Welcome emails, newsletter drip campaigns (Email 1, 2, 3 sequences)
  - Endpoint: `/api/newsletter/subscribe` - NEW subscriber welcome + Email 1
  - Endpoint: `/api/newsletter/drip` - Scheduled emails (Email 2 at day 3, Email 3 at day 7)

**Analytics & Tracking:**
- Vercel Analytics - Web analytics and performance monitoring
  - SDK: `@vercel/analytics/next` 1.5.0
  - Usage: `app/layout.tsx` via `<Analytics />` component
  - Purpose: Page views, performance metrics, user analytics
  - Env: No config required (automatic with Vercel deployment)

- Google Analytics - Optional GA tracking
  - Env: `NEXT_PUBLIC_GA_ID` (optional)
  - Usage: Not directly imported, likely via GTM or custom implementation

- Google Tag Manager - Optional event tracking
  - Env: `NEXT_PUBLIC_GTM_ID` (optional)

- Affiliate Click Tracking - Internal click analytics
  - Endpoint: `app/api/analytics/affiliate-click/route.ts` - POST
  - Storage: Records to `affiliate_clicks` table in Supabase
  - Data tracked: product_id, user_id, referrer, clicked_at timestamp
  - Purpose: Track outbound clicks to partner products

**Social Metadata:**
- Twitter/X - Social card integration
  - Config: `TWITTER_HANDLE` (@agents_tips)
  - Usage: OpenGraph and Twitter card metadata in `app/layout.tsx`

- Facebook - Social sharing
  - Config: `FACEBOOK_APP_ID`
  - Usage: Social metadata configuration

## Data Storage

**Databases:**
- Supabase PostgreSQL - Primary data persistence
  - Connection: `NEXT_PUBLIC_SUPABASE_URL` (https://your-project.supabase.co)
  - Client SDK: `@supabase/supabase-js` (latest)
  - Server wrapper: `@supabase/ssr` (latest)
  - Tables accessed:
    - `products` - Main product directory entries
    - `tags` - Product tags for filtering
    - `labels` - Product labels/classifications
    - `categories` - Product categories
    - `newsletter_subscribers` - Email subscriber list
    - `affiliate_clicks` - Click tracking data
  - Auth keys:
    - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` - Public/anon access
    - `SUPABASE_SECRET_KEY` - Server-side secret key
    - `SUPABASE_SERVICE_ROLE_KEY` - Admin operations
  - Migrations: `supabase/migrations/` - SQL schema definitions

**File Storage:**
- Supabase Storage - Image/file uploads
  - Bucket: `product-logos`
  - Purpose: Logo images for products
  - Usage: `app/(protected)/submit-new/action.ts` - File upload in product submission
  - Access: Public URL generation via `getPublicUrl()`
  - Image remotes configured: `**.supabase.co/storage/v1/object/public/product-logos/**/**`

**Caching:**
- SWR (client-side) - Data fetching with caching
  - SDK: `swr` 2.3.6
  - Purpose: Client-side data fetching and automatic revalidation

- Next.js Cache Tags - Server-side caching and revalidation
  - Usage: `revalidateTag("product-filters")` in form submissions
  - Purpose: Cache invalidation for category/filter data

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Custom authentication and session management
  - Implementation: OAuth, email/password, social providers (via Supabase)
  - Session handling: `db/supabase/server.ts`, `db/supabase/client.ts`
  - Middleware refresh: `middleware.ts` -> `db/supabase/middleware.ts`
  - User context:
    - `@/hooks/use-current-user-image.ts` - Current user profile image
    - `@/hooks/use-current-user-meta.ts` - Current user metadata
  - Components:
    - `components/auth-provider.tsx` - Auth context provider
    - `components/login-form.tsx` - Login UI
    - `components/sign-up-form.tsx` - Registration UI
    - `components/forgot-password-form.tsx` - Password recovery
    - `components/update-password-form.tsx` - Password change
  - Routes:
    - `app/(public)/auth/login/` - Login page
    - `app/(public)/auth/sign-up/` - Registration page
    - `app/(public)/auth/callback/` - OAuth callback handler
    - `app/(public)/auth/confirm/` - Email confirmation handler
    - `app/(public)/auth/forgot-password/` - Password reset request
    - `app/(public)/auth/update-password/` - Password change page

## Monitoring & Observability

**Error Tracking:**
- Console logging (tslog) - `tslog` 4.9.3 for structured logging
- Usage: Error logging in API routes, server actions, and async operations

**Logs:**
- Console output - Standard Node.js/Next.js logging
- Server-side errors logged with `console.error()`
- Client-side errors caught in try-catch blocks
- No external log aggregation configured

## CI/CD & Deployment

**Hosting:**
- Vercel - Primary deployment platform
  - Analytics integration: `@vercel/analytics/next` embedded
  - Environment: Production, staging via Vercel

**CI Pipeline:**
- GitHub Actions - Automated workflows in `.github/workflows/`
  - Scheduled cron jobs for newsletter drip campaigns
  - Agent discovery pipeline
  - CI checks and deployments

**Cron Jobs:**
- Newsletter Drip Endpoint: `app/api/newsletter/drip/route.ts`
  - Security: Bearer token validation (`CRON_SECRET`)
  - Triggers: GitHub Actions on schedule (daily 10:00 UTC reference in code)
  - Sequence 2: Sends on day 3 after subscription
  - Sequence 3: Sends on day 7 after subscription

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` - Public API key
- `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` - Server-side key
- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` - AI provider key (one required)
- `RESEND_API_KEY` - Email service key
- `CRON_SECRET` - Webhook/cron authentication token
- `ADMIN_SECRET` - Admin endpoint protection (checked in production)
- `RESEND_FROM_EMAIL` - Newsletter sender email

**Optional env vars:**
- `NEXT_PUBLIC_SITE_URL` - Site root URL (default from seo-config.ts)
- `NEXT_PUBLIC_SITE_NAME` - Site display name
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Site description
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
- `TWITTER_HANDLE` - Twitter handle for metadata
- `FACEBOOK_APP_ID` - Facebook app ID

**Secrets location:**
- Development: `.env.local` (git-ignored)
- Production: Vercel environment variables (configured in dashboard)
- Supabase: API keys managed in Supabase project settings

## Webhooks & Callbacks

**Incoming:**
- Email Confirmation: `app/(public)/auth/confirm/route.ts` - Email verification callback
- OAuth Callback: `app/(public)/auth/callback/route.ts` - OAuth provider callback

**Outgoing:**
- Newsletter Drip: `app/api/newsletter/drip/route.ts` - Cron-triggered endpoint (via GitHub Actions)
- Affiliate Click: `app/api/analytics/affiliate-click/route.ts` - Client-side tracking POST
- Supabase: Migrations and functions in database schema

## Web Scraping

**Scraping Framework:**
- Cheerio 1.1.2 - HTML parsing and content extraction
  - Location: `lib/scraper.ts` - `scrapeUrl()` function
  - Purpose: Extract title, meta description, content, links, images from websites
  - Usage: Product enrichment in `app/(protected)/submit-new/action.ts`

- Puppeteer 24.16.1 + Stealth Plugin - Headless browser automation
  - Installation: `npm run install-browser` or `postinstall` script
  - Purpose: Web crawling for seed scripts (discovery, crawl, enrich stages)
  - Usage: `supabase/seed/src/stage-1-crawl/` for data collection
  - Stealth mode: Bypasses anti-bot detection

- Crawlee 3.14.1 - Web scraping orchestration
  - Purpose: Coordinating large-scale scraping operations
  - Usage: Data pipeline for AI agent discovery and enrichment

---

*Integration audit: 2026-01-28*
