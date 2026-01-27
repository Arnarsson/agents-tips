# Deployment Guide — agents.tips

## Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Create Supabase project at [supabase.com](https://supabase.com)
- [ ] Copy project URL and anon key
- [ ] Run migrations: `supabase db push`
- [ ] Create first user via Supabase Auth
- [ ] Seed AI agents (replace `{{USER_ID}}` in migration file)

### 2. Environment Variables
Create `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-secret-key

# Optional
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_GA_ID=
```

### 3. Domain Setup
- [ ] Purchase `agents.tips` domain
- [ ] Configure DNS for Vercel

---

## Vercel Deployment

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/agents-tips)

### Manual Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/agents-tips.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Select Next.js framework (auto-detected)

3. **Configure Environment Variables**
   Add all variables from `.env.local` in Vercel dashboard:
   - Project Settings → Environment Variables
   - Add all `NEXT_PUBLIC_*` and other vars

4. **Deploy**
   - Click "Deploy"
   - First build takes ~2-3 minutes
   - Domain: `agents-tips.vercel.app`

5. **Custom Domain**
   - Project Settings → Domains
   - Add `agents.tips`
   - Configure DNS (A/CNAME records provided by Vercel)

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Homepage loads: `https://agents.tips`
- [ ] Products page works: `https://agents.tips/products`
- [ ] Submit form accessible: `https://agents.tips/submit-new`
- [ ] Auth flow works (sign up, login)
- [ ] Sitemap: `https://agents.tips/sitemap.xml`
- [ ] Robots.txt: `https://agents.tips/robots.txt`

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Submit to Bing Webmaster Tools
- [ ] Check structured data with [Rich Results Test](https://search.google.com/test/rich-results)

### 3. Analytics
- [ ] Add Google Analytics ID to env vars
- [ ] Configure Vercel Analytics (automatic)
- [ ] Set up Supabase Analytics (optional)

### 4. Social Media
- [ ] Create Twitter account: [@agents_tips](https://twitter.com/agents_tips)
- [ ] Create GitHub org: [github.com/agents-tips](https://github.com/agents-tips)
- [ ] Add social links to footer

---

## Monitoring

### Performance
- Vercel Analytics → Real-time metrics
- Web Vitals → Core Web Vitals scores
- Lighthouse → Run audits

### Database
- Supabase Dashboard → Monitoring
- Check connection pool usage
- Monitor query performance

### Errors
- Vercel Logs → Runtime errors
- Supabase Logs → Database errors
- Set up error tracking (Sentry, LogRocket)

---

## Scaling

### Traffic Spikes
- Vercel auto-scales (serverless)
- Supabase connection pooling handles load
- CDN caching for static assets

### Database
- Supabase Free: 500MB, good for ~1000 products
- Upgrade to Pro for more capacity
- Add indexes for large datasets

### Costs
- **Vercel Free**: 100GB bandwidth/month (sufficient for MVP)
- **Supabase Free**: 500MB database, 2GB bandwidth
- **Expected costs**: $0-20/month for first 10K visitors

---

## Backup & Recovery

### Database Backups
- Supabase Pro: Daily automatic backups
- Manual backup:
  ```bash
  supabase db dump -f backup.sql
  ```

### Code Backups
- GitHub is source of truth
- Tag releases: `git tag v1.0.0`
- Vercel keeps deployment history

---

## Updating

### Content Updates
- Add new AI agents via UI: `/submit-new`
- Or directly in Supabase dashboard

### Code Updates
```bash
# Make changes
git add .
git commit -m "feat: new feature"
git push

# Vercel auto-deploys from main branch
```

### Database Migrations
```bash
# Create new migration
supabase migration new my_feature

# Edit SQL file in supabase/migrations/

# Test locally
supabase db reset

# Deploy
supabase db push
```

---

## Troubleshooting

### Build Fails
```bash
# Check logs in Vercel dashboard
# Common issues:
- Missing environment variables
- TypeScript errors
- Dependency conflicts

# Fix locally first
pnpm build
```

### 500 Errors
- Check Supabase connection
- Verify RLS policies
- Check Vercel logs

### Slow Performance
- Enable ISR (Incremental Static Regeneration)
- Add database indexes
- Optimize images (use Next.js Image)

---

## Security

### API Keys
- Never commit `.env.local`
- Rotate keys regularly
- Use Vercel environment variables

### RLS Policies
- Supabase Row Level Security enabled
- Only approved products visible to public
- Admin actions require `is_claims_admin()`

### Rate Limiting
- Vercel edge middleware for rate limiting
- Supabase connection limits
- Add Cloudflare for DDoS protection

---

## Next Steps After Launch

1. **Content**
   - Add 50+ more AI agents
   - Write comparison guides (Cursor vs Windsurf, etc.)
   - Create "Best AI Agents for X" lists

2. **Features**
   - User reviews & ratings
   - Comparison tool (side-by-side)
   - Newsletter signup
   - AI agent recommendations

3. **Marketing**
   - Launch on Product Hunt
   - Post on HackerNews
   - Share on Twitter/LinkedIn
   - SEO content marketing

4. **Monetization**
   - Affiliate links
   - Sponsored listings
   - Premium placements
   - Newsletter ads

---

**Ready to deploy?**
```bash
git push origin main
```

Watch your site go live at https://agents.tips 🚀
