# agents.tips — Quick Start (5 Minutes)

**Goal:** Get the directory running locally in 5 minutes.

---

## Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account (free tier)

---

## Steps

### 1. Install Dependencies (2 min)
```bash
cd /home/sven/Documents/agents-tips
pnpm install
```

### 2. Set Up Supabase (2 min)

#### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: `agents-tips`
4. Database password: (save it!)
5. Region: (closest to you)
6. Click "Create Project" (takes ~2 min)

#### Get Credentials
1. Go to Project Settings → API
2. Copy:
   - Project URL: `https://xxx.supabase.co`
   - Anon public key: `eyJ...`

### 3. Configure Environment (30 sec)
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-secret-key
```

### 4. Run Migrations (30 sec)
```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

### 5. Start Dev Server (10 sec)
```bash
pnpm dev
```

Open http://localhost:3000

---

## First Time Setup

### Create Admin User
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create account
4. Check Supabase Dashboard → Authentication → Users
5. Copy your User ID

### Seed AI Agents
1. Open `supabase/migrations/20260126000000_seed_ai_agents.sql`
2. Replace `{{USER_ID}}` with your actual user ID (4 places total)
3. Uncomment the INSERT INTO products section (remove `/*` and `*/`)
4. Run in Supabase SQL Editor or:
   ```bash
   supabase db reset
   ```

---

## Verify It Works

- ✅ Homepage loads with empty state
- ✅ After seeding: 20+ AI agents appear
- ✅ Search works
- ✅ Filters work (categories/tags/labels)
- ✅ "Submit AI Agent" button visible
- ✅ Dark mode toggle works

---

## Troubleshooting

### "Supabase connection failed"
- Check `.env.local` has correct URL and key
- Verify project is running in Supabase dashboard

### "No products showing"
- Check products are `approved = true` in database
- Verify you ran migrations
- Check Supabase → Table Editor → products

### Build errors
```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

---

## Next: Deploy to Vercel

See [DEPLOY.md](./DEPLOY.md) for full deployment guide.

**Quick version:**
```bash
# Push to GitHub
git remote add origin https://github.com/yourusername/agents-tips.git
git push -u origin main

# Import to Vercel
# Add environment variables
# Deploy
```

---

**That's it!** You now have a fully functional AI agents directory running locally. 🚀

For detailed setup, see [SETUP.md](./SETUP.md)
