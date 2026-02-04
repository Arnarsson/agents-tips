# Buttondown Newsletter Integration - agents.tips

## Status
✅ **Integrated** - Signup form now adds directly to Buttondown list.

**Linear Issue:** 8cf55fa7-af72-469d-83de-b163b9f20e9b

## Quick Setup

### 1. Get Buttondown API Key
1. Sign up at [buttondown.email](https://buttondown.email)
2. Go to Account → API Keys
3. Copy your API key

### 2. Environment Variables
Add to `.env.local` and Vercel:

```
BUTTONDOWN_API_KEY=bt_xxxxxxxx
```

**Deploy to Vercel:**
```
vercel env add BUTTONDOWN_API_KEY production
```

### 3. (Optional) Set up Welcome Automation in Buttondown
1. In Buttondown → Automations
2. Create \"New subscriber\" trigger
3. Send welcome email (use Markdown templates from `lib/email/welcome-sequence.ts`)

### 4. Test Signup
```
cd /home/sven/Documents/2026/Inactive/agents-tips
pnpm dev
```
- Go to http://localhost:3000
- Submit newsletter form
- Check Buttondown dashboard → Subscribers

### 5. Deploy
```
git add .
git commit -m \"integrate: Buttondown newsletter signup (issue 8cf55fa7-af72-469d-83de-b163b9f20e9b)\"
git push
```
Vercel auto-deploys.

## Features Integrated
- ✅ Frontend form (`components/newsletter-signup.tsx`) - unchanged
- ✅ API: `/api/newsletter/subscribe` → Buttondown POST /subscribers
- ✅ Duplicate check + resubscribe handling
- ✅ Tags: source (homepage, agent page, etc.) + referrer
- ✅ Error handling + validation
- ✅ Status check endpoint (`GET /api/newsletter/subscribe?email=...`)

## Migration Notes
- Removed Supabase `newsletter_subscribers` dependency
- Removed Resend welcome email (use Buttondown automation)
- Drip campaign: Use Buttondown Automations or scheduled campaigns
- No more GitHub Actions cron needed

## Remove Legacy Files (Optional)
```
rm app/api/newsletter/drip/route.ts
rm .github/workflows/newsletter-drip.yml
rm supabase/migrations/*newsletter*.sql
```

## Monitoring
- Buttondown Dashboard: Subscribers, opens, clicks
- Tags for segmentation (e.g., 'homepage', 'cursor-agent')
- Export CSV for advanced analytics

## Next Steps
1. Set up 3-email sequence automation in Buttondown
2. Add UTM tracking to links
3. A/B test signup copy
4. Webhook for Supabase sync (if needed for analytics)

---
**Done!** Newsletter signups now powered by Buttondown. Update Linear issue 8cf55fa7-af72-469d-83de-b163b9f20e9b to Done.
