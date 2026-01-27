# agents.tips — Project Summary

**Built:** 2026-01-26  
**Stack:** Next.js 15 + Supabase + Tailwind CSS 4  
**Location:** `/home/sven/Documents/agents-tips/`

---

## 🎯 Mission

Create a comprehensive, SEO-optimized directory of AI agents, coding assistants, and automation tools — think "Product Hunt for AI agents."

---

## ✅ What Was Built

### 1. Directory Platform
- **Framework**: Next.js 15 (App Router, PPR enabled)
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth (email/password)
- **UI**: Radix UI + shadcn/ui + Framer Motion
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel-ready

### 2. Features Included

#### Core Functionality
✅ **Product Listing** — Browse 20+ AI agents with filtering  
✅ **Search** — Real-time search across products  
✅ **Categories** — 8 main categories (Coding Assistants, Autonomous Agents, etc.)  
✅ **Tags** — 20+ feature tags (Code Generation, Multi-Agent, etc.)  
✅ **Labels** — Pricing/deployment filters (Open Source, Paid, Cloud, etc.)  
✅ **Bookmarks** — Save favorite agents (authenticated users)  
✅ **Submit Form** — Add new AI agents (authenticated users)  
✅ **Admin Dashboard** — Approve products, manage filters, user management  

#### SEO Features
✅ **Dynamic Metadata** — Per-page titles, descriptions, OG images  
✅ **JSON-LD Structured Data** — Product, Organization, WebSite schemas  
✅ **Sitemap** — Auto-generated with proper priorities  
✅ **Robots.txt** — Dynamic with environment-based URLs  
✅ **Canonical URLs** — Proper link canonicalization  
✅ **Social Cards** — Twitter/OG cards with images  

#### UI/UX
✅ **Dark Mode** — System preference + manual toggle  
✅ **Responsive** — Mobile-first design  
✅ **Animations** — Smooth Framer Motion transitions  
✅ **Carousels** — Featured, Popular, Most Bookmarked  
✅ **Empty States** — Helpful onboarding for new installs  

### 3. Data Model

#### Products (AI Agents)
```typescript
{
  id: UUID
  codename: string              // URL slug
  punchline: string             // Short tagline
  description: string           // Full description
  product_website: string       // Official URL
  categories: string            // Primary category
  tags: string[]                // Features/capabilities
  labels: string[]              // Pricing/deployment
  logo_src: string | null       // Logo URL
  approved: boolean             // Visibility
  featured: boolean             // Featured badge
  view_count: number            // Popularity metric
  user_id: UUID                 // Submitter
}
```

#### Categories (8 total)
- Coding Assistants 💻
- Autonomous Agents 🤖
- AI Frameworks 🏗️
- Workflow Automation ⚡
- Dev Tools 🛠️
- Chat Assistants 💬
- Research Agents 🔍
- Content Creation ✍️

#### Tags (20+ features)
Code Generation, Code Completion, Refactoring, Bug Fixing, Testing, Documentation, Multi-Agent, LangChain, OpenAI, Anthropic, Local LLMs, Voice Interface, Terminal, IDE Integration, Git Integration, Context Management, Agentic Workflow, Web Automation, Data Analysis, Task Planning

#### Labels (deployment/pricing)
Open Source, Free, Freemium, Paid, Enterprise, Self-Hosted, Cloud, VS Code, CLI, Web App, Desktop App, Browser Extension

### 4. Seeded AI Agents (20+)

1. **Clawdbot** — Personal AI agent, 24/7 automation
2. **Cursor** — AI-first code editor (VS Code fork)
3. **Windsurf** — Agentic IDE from Codeium
4. **GitHub Copilot** — AI pair programmer
5. **Aider** — Terminal pair programming
6. **Continue** — Open-source AI code assistant
7. **AutoGPT** — Autonomous agent framework
8. **LangChain** — LLM application framework
9. **CrewAI** — Multi-agent orchestration
10. **Devin** — AI software engineer (Cognition)
11. **Claude Code** — Anthropic's official CLI
12. **Bolt** — AI web app builder
13. **v0** — Generative UI from Vercel
14. **Lovable** — Full-stack app builder (GPT Engineer)
15. **Cody** — AI assistant from Sourcegraph
16. **Tabnine** — AI code completion
17. **Amazon Q** — AWS AI assistant
18. **Gemini Code Assist** — Google Cloud AI
19. **Replit Agent** — Browser-based AI agent
20. **OpenCode** — Open-source Copilot alternative
21. **Codex** — OpenAI's code model

### 5. Branding

**Domain:** agents.tips (to be purchased)  
**Tagline:** "The AI Agents Directory"  
**Description:** "Discover, compare, and review the best AI agents, coding assistants, and automation tools. From AutoGPT to Claude Code — find the perfect AI agent for your workflow."

**Colors:** Dark mode default (black/emerald accent)  
**Fonts:** Inter Tight (sans), Geist Mono (mono)  
**Theme:** Modern, minimal, developer-focused

### 6. Documentation

✅ **README.md** — Project overview, features, tech stack  
✅ **SETUP.md** — Complete setup guide (local + Supabase)  
✅ **DEPLOY.md** — Deployment guide (Vercel + post-launch)  
✅ **PROJECT-SUMMARY.md** — This file (what was built)

---

## 📁 File Structure

```
agents-tips/
├── app/                              # Next.js 15 app directory
│   ├── (public)/                     # Public routes
│   │   ├── products/                 # Product listing + details
│   │   └── page.tsx                  # Homepage
│   ├── (protected)/                  # Auth-required routes
│   │   ├── submit-new/               # Submit AI agent form
│   │   └── bookmarks/                # User bookmarks
│   ├── (admin)/                      # Admin dashboard
│   │   └── admin/                    # Product/user/filter management
│   ├── actions/                      # Server actions
│   ├── sitemap.xml/                  # Dynamic sitemap route
│   ├── robots.txt/                   # Dynamic robots.txt
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Homepage
├── components/                       # React components
│   ├── ui/                           # shadcn/ui primitives
│   ├── seo/                          # SEO components
│   ├── hero.tsx                      # Homepage hero
│   ├── directory-search.tsx          # Search bar
│   └── app-sidebar.tsx               # Navigation sidebar
├── lib/                              # Utilities
│   ├── seo-config.ts                 # SEO configuration
│   ├── types.ts                      # TypeScript types
│   └── supabase/                     # Database clients
├── supabase/                         # Database
│   └── migrations/                   # SQL migrations
│       ├── 20231227000000_init_user.sql
│       ├── 20231227000001_init_functions.sql
│       ├── 20231227000002_products.sql
│       └── 20260126000000_seed_ai_agents.sql
├── public/                           # Static assets
├── README.md                         # Project overview
├── SETUP.md                          # Setup guide
├── DEPLOY.md                         # Deployment guide
├── PROJECT-SUMMARY.md                # This file
├── package.json                      # Dependencies
├── .env.example                      # Environment template
├── vercel.json                       # Vercel config
└── tailwind.config.ts                # Tailwind config
```

---

## 🚀 Next Steps

### Immediate (Pre-Launch)
1. ⬜ Purchase `agents.tips` domain
2. ⬜ Set up Supabase project (cloud or local)
3. ⬜ Run migrations + seed data
4. ⬜ Create first admin user
5. ⬜ Deploy to Vercel
6. ⬜ Configure custom domain

### Content (Week 1)
1. ⬜ Add product logos (20+ agents)
2. ⬜ Write detailed descriptions
3. ⬜ Add pros/cons for each agent
4. ⬜ Add affiliate links (where applicable)
5. ⬜ Create comparison guides

### Marketing (Week 2-4)
1. ⬜ Launch on Product Hunt
2. ⬜ Post on HackerNews
3. ⬜ Share on Twitter/LinkedIn
4. ⬜ Reddit (r/MachineLearning, r/programming)
5. ⬜ SEO: Target keywords (best ai agents, cursor alternatives, etc.)

### Features (Month 2)
1. ⬜ User reviews & ratings
2. ⬜ Comparison tool (side-by-side)
3. ⬜ Newsletter signup
4. ⬜ AI agent recommendations (personalized)
5. ⬜ Upvoting/downvoting

---

## 💰 Monetization Strategy

### Phase 1: Free Directory
- Build traffic and authority
- Focus on SEO and organic growth
- No ads, just pure value

### Phase 2: Affiliate Links
- Add affiliate codes to product links
- GitHub Sponsors, partner programs
- Commission on referrals

### Phase 3: Premium Listings
- Featured placement ($99-299/month)
- Sponsored carousels
- Premium badges

### Phase 4: Pro Features
- Advanced comparison tools
- Bulk exports (CSV/API)
- Custom lists and collections
- Early access to new agents

---

## 📊 Success Metrics

### Traffic Goals
- **Month 1**: 1,000 visitors
- **Month 3**: 10,000 visitors
- **Month 6**: 50,000 visitors

### Engagement
- Average time on site: >2 minutes
- Bounce rate: <50%
- Pages per session: >3

### Revenue (if monetized)
- **Month 6**: $500/month (affiliate)
- **Year 1**: $2,000/month (mixed)

---

## 🛠️ Technical Decisions

### Why Next.js 15?
- App Router for nested layouts
- Server Components for performance
- Built-in SEO (metadata API)
- Vercel deployment (zero config)

### Why Supabase?
- PostgreSQL (full SQL power)
- Built-in auth
- Row Level Security (RLS)
- Real-time subscriptions
- Free tier (500MB)

### Why Tailwind CSS 4?
- Utility-first CSS
- Dark mode out-of-box
- No runtime JS
- Excellent DX

### Why Radix UI + shadcn/ui?
- Unstyled primitives
- Accessibility built-in
- Copy-paste components
- Full customization

---

## 🐛 Known Limitations

1. **Seed data requires user_id** — Need to create admin user first, then uncomment products INSERT in migration
2. **No images yet** — Logo URLs are null, need to add product images
3. **No reviews** — Review system not implemented yet
4. **Single category per product** — Could expand to multi-category
5. **No affiliate tracking** — Need to add UTM params and click tracking

---

## 🎉 What Makes This Special

1. **First mover** — No comprehensive AI agents directory exists yet
2. **Developer-focused** — Built by devs, for devs
3. **Open data model** — Easy to extend and customize
4. **SEO-first** — Every page optimized for search
5. **Fast** — Next.js 15 + Vercel = instant page loads
6. **Beautiful** — Dark mode, smooth animations, modern design

---

## 🤝 Contributing

The directory is open for contributions:
- Add new AI agents via UI
- Submit PRs for new features
- Report bugs via GitHub Issues
- Suggest new categories/tags

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

**Project Status:** ✅ **Ready for Deployment**

All core features implemented. Database migrations ready. Documentation complete. Just need Supabase credentials and Vercel deployment.

**Estimated deployment time:** 15-30 minutes

---

Built with ❤️ using Next.js 15, Supabase, and Tailwind CSS 4 by Mason 🔧
