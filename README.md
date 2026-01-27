# agents.tips — The AI Agents Directory

> Discover, compare, and review the best AI agents, coding assistants, and automation tools.

**Live at:** [agents.tips](https://agents.tips) _(coming soon)_

---

## 🤖 What is agents.tips?

agents.tips is a comprehensive directory of AI agents, coding assistants, and automation tools. Whether you're looking for the next AutoGPT, comparing GitHub Copilot alternatives, or discovering new agentic frameworks — we've got you covered.

### Features

✅ **20+ AI Agents** — Clawdbot, Cursor, Windsurf, AutoGPT, LangChain, Devin, and more  
✅ **Smart Filtering** — By category, pricing, deployment, features  
✅ **Reviews & Rankings** — Community-driven feedback  
✅ **Affiliate Support** — Monetize your directory  
✅ **SEO Optimized** — JSON-LD, sitemaps, meta tags  
✅ **Dark Mode** — Beautiful modern design  
✅ **Supabase Backend** — Scalable, real-time, auth built-in  

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/agents-tips.git
cd agents-tips
pnpm install
```

### 2. Set Up Supabase
```bash
# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials
# Get them from https://supabase.com/dashboard/project/_/settings/api
```

### 3. Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 4. Seed Data
See [SETUP.md](./SETUP.md) for detailed instructions on seeding AI agents.

### 5. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
agents-tips/
├── app/                      # Next.js 15 app directory
│   ├── (public)/            # Public routes (product listing, details)
│   ├── (protected)/         # Auth-required routes (submit, bookmarks)
│   └── actions/             # Server actions
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── app-sidebar.tsx      # Main navigation
├── lib/                     # Utilities
│   ├── seo-config.ts        # SEO configuration
│   └── supabase/            # Database clients
├── supabase/               # Database migrations & seed data
│   └── migrations/          # SQL migrations
├── public/                  # Static assets
└── README.md               # This file
```

---

## 🗂️ Categories

- **Coding Assistants** 💻 — GitHub Copilot, Cursor, Windsurf, Aider, Continue
- **Autonomous Agents** 🤖 — AutoGPT, Devin, Clawdbot
- **AI Frameworks** 🏗️ — LangChain, CrewAI, Codex
- **Workflow Automation** ⚡ — Multi-agent orchestration
- **Dev Tools** 🛠️ — CLI tools, IDE plugins, web apps
- **Chat Assistants** 💬 — Claude Code, terminal agents
- **Research Agents** 🔍 — Data analysis, web scraping
- **Content Creation** ✍️ — Writing, documentation

---

## 🏷️ Labels & Tags

### Labels (Pricing/Deployment)
- Open Source, Free, Freemium, Paid, Enterprise
- Self-Hosted, Cloud
- VS Code, CLI, Web App, Desktop App, Browser Extension

### Tags (Features)
- Code Generation, Code Completion, Refactoring, Bug Fixing
- Testing, Documentation, Multi-Agent, Task Planning
- Context Management, Agentic Workflow, Web Automation
- LangChain, OpenAI, Anthropic, Local LLMs

---

## 🎨 Customization

### Branding
- Update `lib/seo-config.ts` with your domain, name, description
- Replace logos in `/public/`
- Customize colors in `app/globals.css`

### Data Model
- **Products** = AI agents/tools
- **Categories** = Primary classification (Coding Assistants, Autonomous Agents, etc.)
- **Tags** = Features/capabilities (Code Generation, Multi-Agent, etc.)
- **Labels** = Pricing/deployment (Open Source, Paid, Cloud, etc.)

---

## 💳 Affiliate Links

Add affiliate tracking to product URLs:
```typescript
{
  product_website: "https://example.com?ref=agents-tips",
  // Track with UTM params or custom codes
}
```

Revenue opportunities:
- Affiliate commissions (GitHub Sponsors, product referrals)
- Sponsored listings (featured badge)
- Premium placements
- Ads (Google AdSense, Carbon Ads)

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Import to Vercel
# Add environment variables
# Deploy
```

### Requirements
- Node.js 18+
- Supabase account
- Environment variables configured

### Other Platforms
- Netlify
- Railway
- Fly.io
- Cloudflare Pages

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Animations**: Framer Motion
- **Analytics**: Vercel Analytics

---

## 📊 SEO Features

✅ **Metadata** — Dynamic titles, descriptions, OG images  
✅ **Structured Data** — JSON-LD for products, organizations  
✅ **Sitemap** — Auto-generated with changefreq/priority  
✅ **Robots.txt** — Proper crawling rules  
✅ **Canonical URLs** — Prevent duplicate content  
✅ **Twitter Cards** — Rich social sharing  

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Agents
- Submit via the UI at `/submit-new`
- Or add directly to `supabase/migrations/20260126000000_seed_ai_agents.sql`

---

## 📝 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/agents-tips/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/agents-tips/discussions)
- **Email**: hello@agents.tips
- **Twitter**: [@agents_tips](https://twitter.com/agents_tips)

---

## 🙏 Acknowledgments

- **Template**: Built on Cult Directory v2.1
- **UI Components**: shadcn/ui by [@shadcn](https://twitter.com/shadcn)
- **Hosting**: Vercel
- **Database**: Supabase

---

**Built with ❤️ by developers, for developers.**

Star ⭐ this repo if you find it useful!
