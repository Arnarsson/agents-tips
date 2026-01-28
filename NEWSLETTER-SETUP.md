# Newsletter Integration - Complete Setup Guide

## Overview

**Status:** ✅ Fully implemented (Linear #7-199)

The newsletter system is a **3-email welcome sequence** that captures leads and nurtures subscribers with valuable content.

---

## Architecture

### Components

1. **Frontend** (`components/newsletter-signup.tsx`)
   - 3 variants: `default`, `compact`, `inline`
   - Used on: Homepage, Agent pages, `/newsletter` landing page

2. **Backend API** (`app/api/newsletter/`)
   - `/subscribe` - Handles new signups + sends Email 1
   - `/drip` - Sends scheduled Emails 2 & 3 (triggered by cron)

3. **Email Templates** (`lib/email/welcome-sequence.ts`)
   - Email 1 (Day 0): Welcome + expectations
   - Email 2 (Day 3): Top 5 AI Agents (value delivery)
   - Email 3 (Day 7): Decision framework + community engagement

4. **Automation** (`.github/workflows/newsletter-drip.yml`)
   - GitHub Actions cron job (daily 10:00 UTC)
   - Sends Emails 2 & 3 to subscribers automatically

5. **Database** (`supabase/migrations/20260129000001_newsletter_subscribers.sql`)
   - Table: `newsletter_subscribers`
   - Tracks email, status, source, subscription date

---

## Setup Instructions

### 1. Environment Variables

Add to `.env.local` and Vercel:

```bash
# Resend API (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=newsletter@agents.tips

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=eyJxxx

# Cron job security (generate random string)
CRON_SECRET=<generate-random-32-char-string>
```

**Generate CRON_SECRET:**
```bash
openssl rand -hex 32
```

**Add to Vercel:**
```bash
cd /home/sven/Documents/agents-tips
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
vercel env add CRON_SECRET
```

### 2. GitHub Secrets

Add `CRON_SECRET` to GitHub repository secrets:

1. Go to: https://github.com/YOUR_USERNAME/agents-tips/settings/secrets/actions
2. Click "New repository secret"
3. Name: `CRON_SECRET`
4. Value: Same value as Vercel env var
5. Click "Add secret"

### 3. Verify Resend Domain

**Required for production emails:**

1. Go to https://resend.com/domains
2. Add domain: `agents.tips`
3. Add DNS records (SPF, DKIM, DMARC) to your domain provider
4. Verify domain in Resend dashboard

**Until domain is verified, use:** `onboarding@resend.dev` (for testing only)

### 4. Run Database Migration

```bash
cd /home/sven/Documents/agents-tips

# Apply migration locally
supabase db push

# Or run SQL manually in Supabase dashboard
cat supabase/migrations/20260129000001_newsletter_subscribers.sql | pbcopy
# Paste into Supabase SQL Editor
```

### 5. Deploy to Production

```bash
git add .
git commit -m "feat: Add 3-email welcome sequence (Linear #7-199)"
git push origin main

# Vercel will auto-deploy
```

---

## Email Sequence Flow

```
Day 0: User subscribes
└─> ✉️ Email 1: Welcome + expectations (immediate)
    Subject: "Welcome to agents.tips! Your AI tools journey starts here 🚀"

Day 3: Value delivery
└─> ✉️ Email 2: Top 5 AI Agents You Should Try
    Subject: "🔥 Top 5 AI Agents You Should Try This Week"
    Trigger: GitHub Actions cron (10:00 UTC daily)

Day 7: Engagement + community
└─> ✉️ Email 3: Decision framework + community invite
    Subject: "How to choose the right AI agent (framework inside)"
    Trigger: GitHub Actions cron (10:00 UTC daily)
```

---

## Testing

### Test Signup Flow (Local)

```bash
# 1. Start dev server
cd /home/sven/Documents/agents-tips
pnpm dev

# 2. Open http://localhost:3000
# 3. Scroll to newsletter signup
# 4. Enter your email + submit
# 5. Check Resend dashboard for Email 1
```

### Test Drip Campaign (API)

```bash
# Check how many subscribers would receive Email 2
curl "https://agents.tips/api/newsletter/drip?sequence=2"

# Check how many subscribers would receive Email 3
curl "https://agents.tips/api/newsletter/drip?sequence=3"

# Manually trigger Email 2 (requires CRON_SECRET)
curl -X POST https://agents.tips/api/newsletter/drip \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"sequence": 2}'

# Manually trigger Email 3
curl -X POST https://agents.tips/api/newsletter/drip \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"sequence": 3}'
```

### Test GitHub Actions Workflow

```bash
# Go to: https://github.com/YOUR_USERNAME/agents-tips/actions
# Click "Newsletter Drip Campaign"
# Click "Run workflow"
# Select sequence: 2, 3, or both
# Click "Run workflow"
# Check logs for success/failure
```

---

## Verification Checklist

**Before marking Linear #7-199 as Done:**

- [ ] Email 1 sends immediately on signup (test on prod)
- [ ] Email templates render correctly in Gmail/Outlook
- [ ] Unsubscribe links work (Resend auto-handles)
- [ ] GitHub Actions workflow runs successfully
- [ ] Email 2 sends to 3-day-old subscribers
- [ ] Email 3 sends to 7-day-old subscribers
- [ ] CRON_SECRET is set in Vercel + GitHub
- [ ] RESEND_API_KEY is set in Vercel
- [ ] Resend domain is verified (or using onboarding@resend.dev)
- [ ] No errors in Vercel logs after signup
- [ ] Newsletter signup works on:
  - [ ] Homepage (`/`)
  - [ ] Agent pages (`/products/cursor`)
  - [ ] Newsletter page (`/newsletter`)

---

## Monitoring

### Check Resend Dashboard
- https://resend.com/emails
- View sent emails, bounces, complaints

### Check Supabase
```sql
-- View all subscribers
SELECT * FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 100;

-- Count by status
SELECT status, COUNT(*) FROM newsletter_subscribers GROUP BY status;

-- Subscribers from last 7 days
SELECT * FROM newsletter_subscribers 
WHERE subscribed_at > NOW() - INTERVAL '7 days' 
ORDER BY subscribed_at DESC;

-- Check who should get Email 2 today
SELECT email, subscribed_at 
FROM newsletter_subscribers 
WHERE status = 'active' 
AND subscribed_at BETWEEN NOW() - INTERVAL '4 days' AND NOW() - INTERVAL '3 days';
```

### Check GitHub Actions Logs
- https://github.com/YOUR_USERNAME/agents-tips/actions
- Click "Newsletter Drip Campaign"
- View latest run logs

---

## Troubleshooting

### Email 1 not sending
- Check `RESEND_API_KEY` in Vercel env vars
- Check Resend dashboard for errors
- Verify `RESEND_FROM_EMAIL` is valid
- Check Vercel function logs: `vercel logs`

### Email 2/3 not sending
- Check GitHub Actions logs
- Verify `CRON_SECRET` matches in Vercel + GitHub
- Test manually via curl (see Testing section)
- Check Supabase for eligible subscribers

### Emails going to spam
- Verify Resend domain (SPF/DKIM/DMARC)
- Use custom domain, not `onboarding@resend.dev`
- Add unsubscribe link (Resend auto-adds)

### Rate limits
- Resend free tier: 100 emails/day, 10 emails/second
- Upgrade to paid plan if needed
- Drip endpoint has 100ms delay between sends

---

## Next Steps (Optional Enhancements)

**After Linear #7-199 is Done:**

1. **Analytics tracking**
   - Add UTM params to all email links
   - Track open rates in Resend
   - Track click-through rates

2. **Segmentation**
   - Track which agents users view
   - Send personalized content based on interests
   - Category-specific newsletters

3. **A/B testing**
   - Test subject lines
   - Test CTA placements
   - Test send times

4. **Weekly newsletter**
   - Create editorial newsletter (separate from drip)
   - Curate weekly agent roundups
   - Add community highlights

---

## File Structure

```
agents-tips/
├── app/
│   ├── api/
│   │   └── newsletter/
│   │       ├── subscribe/route.ts      # Signup endpoint + Email 1
│   │       └── drip/route.ts          # Scheduled Emails 2 & 3
│   ├── (public)/
│   │   └── newsletter/page.tsx        # Landing page
│   └── page.tsx                       # Homepage (includes NewsletterCTA)
├── components/
│   └── newsletter-signup.tsx          # Reusable signup component
├── lib/
│   └── email/
│       └── welcome-sequence.ts        # Email templates
├── supabase/
│   └── migrations/
│       └── 20260129000001_newsletter_subscribers.sql
└── .github/
    └── workflows/
        └── newsletter-drip.yml        # Cron automation
```

---

## Support

**Questions?** Check:
- Resend docs: https://resend.com/docs
- Supabase docs: https://supabase.com/docs
- GitHub Actions docs: https://docs.github.com/en/actions

**Issues?**
- Linear: https://linear.app/atlas-intelligence/issue/7-199
- Resend support: support@resend.com
