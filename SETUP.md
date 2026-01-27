# agents.tips — Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ (v20+ recommended)
- pnpm (or npm/yarn)
- Supabase account (free tier works)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Up Supabase

#### Option A: Supabase Cloud (Recommended)
1. Create a new project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run migrations:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Push migrations
   supabase db push
   ```

#### Option B: Local Supabase
```bash
# Start local Supabase
supabase start

# Migrations will run automatically
# Access Studio at http://localhost:54323
```

### 4. Seed Initial Data

After running migrations, you need to create a user and seed products:

1. **Create Admin User**:
   - Run the dev server: `pnpm dev`
   - Sign up at http://localhost:3000
   - Note your user ID from Supabase Auth dashboard

2. **Seed Products**:
   ```bash
   # Open the seed migration
   # Replace {{USER_ID}} in supabase/migrations/20260126000000_seed_ai_agents.sql
   # Uncomment the INSERT INTO products section
   # Run the migration again or execute the SQL in Supabase Studio
   ```

### 5. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Configuration

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon public key

Optional (for AI enrichment):
- `ANTHROPIC_API_KEY` - For Claude-based enrichment
- `OPENAI_API_KEY` - For GPT-based enrichment

### SEO Configuration

Edit `lib/seo-config.ts`:
```typescript
export const defaultSEOConfig: SEOConfig = {
  site: {
    name: "agents.tips",
    url: "https://agents.tips",
    // ... more config
  }
}
```

### Branding

- Logo: `/public/logo.png`
- Favicon: `/public/favicon.ico`
- OG Image: `/public/og-image.png`

---

## Adding AI Agents

### Via UI (Recommended)
1. Sign up/login
2. Navigate to "Submit New" in sidebar
3. Fill in agent details
4. Submit for approval

### Via Database
```sql
INSERT INTO public.products (
  codename,
  punchline,
  description,
  product_website,
  categories,
  tags,
  labels,
  user_id,
  approved,
  featured
) VALUES (
  'my-agent',
  'Short tagline',
  'Full description',
  'https://example.com',
  'Coding Assistants',
  ARRAY['Code Generation', 'AI'],
  ARRAY['Open Source', 'Free'],
  'your-user-id-here',
  true,
  false
);
```

---

## Categories, Tags & Labels

### Categories
Main classification:
- Coding Assistants
- Autonomous Agents
- Workflow Automation
- Dev Tools
- AI Frameworks
- Chat Assistants
- Research Agents
- Content Creation

### Labels
Pricing/deployment models:
- Open Source / Free / Freemium / Paid / Enterprise
- Self-Hosted / Cloud
- VS Code / CLI / Web App / Desktop App / Browser Extension

### Tags
Features/capabilities:
- Code Generation / Code Completion / Refactoring / Bug Fixing
- Testing / Documentation / Multi-Agent / Task Planning
- Context Management / Agentic Workflow / Web Automation
- etc.

Add more via Supabase Studio or SQL:
```sql
INSERT INTO public.categories (name, icon) VALUES ('New Category', '🎯');
INSERT INTO public.labels (name) VALUES ('New Label');
INSERT INTO public.tags (name) VALUES ('New Tag');
```

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Netlify
- Railway
- Fly.io
- Self-hosted (Docker)

All require:
- Node.js 18+
- Environment variables configured
- Supabase connection

---

## Affiliate Links

Add affiliate URLs to products:
```typescript
// In product submission form or database
{
  product_website: "https://example.com?ref=agents-tips",
  // or store separately as affiliate_link field
}
```

Track clicks with:
- UTM parameters: `?utm_source=agents-tips&utm_medium=directory`
- Affiliate codes: `?ref=agents-tips`
- Custom tracking params

---

## Customization

### Themes
- Dark mode enabled by default
- Edit `app/globals.css` for custom colors
- Uses Tailwind CSS 4

### Layout
- Sidebar navigation (collapsible)
- Filter sidebar (categories/tags/labels)
- Grid/list views for products

### Components
Built on:
- Radix UI primitives
- shadcn/ui components
- Framer Motion animations

---

## Troubleshooting

### Database Errors
- Check Supabase credentials in `.env.local`
- Verify migrations ran: `supabase db status`
- Check RLS policies: user must be authenticated

### Missing Products
- Products must be `approved = true` to appear
- Check filter selections (categories/tags/labels)
- Verify user authentication for admin features

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm build
```

---

## Support

- GitHub Issues: [your-repo/issues]
- Documentation: This file + inline comments
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

Built with ❤️ using Next.js 15, Supabase, and Tailwind CSS 4
