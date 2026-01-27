# Domain & Deployment Status - agents.tips

**Last Updated:** 2026-01-28

## Current Deployment

- **Platform:** Vercel
- **Project ID:** prj_UvRwAWupKV5tfBFAwxHp0CoWYmlu
- **Org ID:** team_03w9A5GSrc475cp1ssYPGtgj
- **Project Name:** agents-tips
- **Repository:** https://github.com/Arnarsson/agents-tips

## Domain Status: agents.tips

**Action Required:** Verify domain ownership and configure DNS

### Steps to Configure Custom Domain:

1. **Check Domain Registration**
   - Verify agents.tips is registered
   - Confirm you have access to DNS settings
   - Domain registrar: (TBD - check your registrar account)

2. **Add Domain to Vercel**
   ```bash
   vercel domains add agents.tips
   ```

3. **Configure DNS Records**
   Add these records at your domain registrar:
   
   **For apex domain (agents.tips):**
   - Type: A
   - Name: @ (or leave blank)
   - Value: 76.76.21.21 (Vercel's IP)
   
   **For www subdomain:**
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

4. **Verify in Vercel Dashboard**
   - Go to: https://vercel.com/team_03w9A5GSrc475cp1ssYPGtgj/agents-tips/settings/domains
   - Add domain: agents.tips
   - Wait for DNS propagation (5-60 minutes)

5. **SSL Certificate**
   - Vercel automatically provisions SSL via Let's Encrypt
   - No manual configuration needed

## Current URLs

- **Production:** https://agents-tips.vercel.app (or similar Vercel URL)
- **Target Custom Domain:** https://agents.tips (pending DNS)
- **Blog:** https://agents.tips/blog
- **Products:** https://agents.tips/products

## Affiliate Link Configuration

✅ **Completed:**
- Built `lib/affiliate.ts` utility for generating tracked URLs
- Added UTM tracking parameters (utm_source=agents.tips, utm_medium=directory)
- Created affiliate click tracking database table
- Added `/api/analytics/affiliate-click` endpoint
- Updated product detail pages to use affiliate links
- Created `AffiliateLinkButton` component

⏳ **Todo:**
- Establish actual affiliate partnerships and add affiliate tags to AFFILIATE_CONFIGS
- Add affiliate disclosure notice (e.g., "We may earn a commission")
- Set up affiliate dashboard in admin panel to track clicks/conversions

## Current Affiliate Partnerships

The following products have placeholder affiliate configurations. **Update with actual affiliate tags when partnerships are established:**

- **Cursor** - Placeholder: `ref=agentstips`
- **Windsurf** - Placeholder: `ref=agentstips`
- **GitHub Copilot** - No affiliate program (UTM only)
- **Replit** - Placeholder (UTM only)

All other products use standard UTM tracking.

## Blog System Status

✅ **Completed:**
- Article database schema created (content_type enum with 5 types)
- Blog listing page at `/blog` with featured/regular sections
- Blog detail page at `/blog/[slug]` with markdown rendering
- SEO metadata generation (title, description, OG tags)
- JSON-LD structured data for articles
- View tracking for articles
- Seeded one article: "Clawdbot Case Study"

✅ **Content Types Supported:**
- tool-review
- guide
- dev-dish (developer insights)
- insight
- reading-list

## Next Steps

1. **Domain:**
   - [ ] Confirm agents.tips is registered (check registrar)
   - [ ] Add domain to Vercel project
   - [ ] Update DNS records
   - [ ] Wait for propagation and verify SSL

2. **Affiliate Links:**
   - [ ] Reach out to tool vendors for affiliate programs
   - [ ] Update AFFILIATE_CONFIGS with actual partner tags
   - [ ] Add affiliate disclosure footer
   - [ ] Build affiliate analytics dashboard

3. **Content:**
   - [ ] Write 2-3 more blog articles
   - [ ] Add author profiles to articles table
   - [ ] Create editorial calendar
   - [ ] Add RSS feed for blog

4. **Monitoring:**
   - [ ] Set up Vercel Analytics
   - [ ] Monitor affiliate click-through rates
   - [ ] Track blog article performance

---

**Resources:**
- Vercel Domain Docs: https://vercel.com/docs/concepts/projects/domains
- Vercel Dashboard: https://vercel.com/team_03w9A5GSrc475cp1ssYPGtgj/agents-tips
