# Deployment Guide - agents.tips

## Repository

**GitHub:** https://github.com/Arnarsson/agents-tips

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account and project
- Vercel account (for deployment)

## Environment Variables

Create `.env.local` for local development (already in `.gitignore`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics, etc.
```

## Local Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Build for production (test build)
npm run build
# or
pnpm build
```

## Vercel Deployment

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import from GitHub: `Arnarsson/agents-tips`
3. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

## Build Configuration

The project uses:
- **Framework:** Next.js 15.5.1 (with Turbopack)
- **Rendering:** Mix of Static (SSG), Server-side (SSR), and Partial Prerender (PPR)
- **Environment:** `.env.local` for local development

## Build Output

Successful build generates:
- 18 static pages
- Dynamic routes for products, categories, labels, tags
- Admin panel routes
- Auth routes
- API routes

**Build Stats:**
- First Load JS: ~128 kB shared
- Middleware: ~57.6 kB
- Individual pages: 234 KB - 331 KB

## Post-Deployment

1. **Verify Environment Variables** in Vercel dashboard
2. **Test Core Features:**
   - Homepage loading
   - Product browsing
   - Search functionality
   - Auth flows (if enabled)
   - Admin panel (if accessible)
3. **Check Database Connection** - ensure Supabase is accessible
4. **Monitor Build Logs** for any warnings or errors

## Database Setup

If deploying fresh:

1. Run Supabase migrations:
   ```bash
   # Apply migrations from supabase/migrations/
   supabase db push
   ```

2. Seed initial data (if needed):
   ```bash
   # Run seed script if available
   npm run seed
   ```

## Domain Configuration

1. In Vercel project settings → Domains
2. Add custom domain: `agents.tips`
3. Configure DNS records as instructed by Vercel
4. Wait for DNS propagation (~5-60 minutes)

## Troubleshooting

### Build Fails

- Check environment variables are set correctly
- Verify Supabase connection is working
- Check for TypeScript errors: `npm run type-check`
- Review build logs in Vercel dashboard

### Runtime Errors

- Check Vercel Function Logs
- Verify environment variables in production
- Test API routes individually
- Check Supabase logs for database errors

## Monitoring

- **Vercel Analytics:** Automatic (if enabled)
- **Supabase Dashboard:** Monitor database queries
- **Error Tracking:** Set up Sentry or similar (optional)

## Rollback

If deployment fails:
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "Promote to Production"

---

**Last Updated:** 2026-01-27
**Deployed From:** `master` branch
