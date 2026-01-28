# Technology Stack

**Analysis Date:** 2026-01-28

## Languages

**Primary:**
- TypeScript 5.x - Used for all application code, backend services, and seed scripts
- TSX/JSX - React component implementation

**Secondary:**
- SQL - Supabase migrations and database queries (in `supabase/migrations/`)
- Bash - Pipeline and configuration scripts

## Runtime

**Environment:**
- Node.js >= 18 (specified in `package.json`)

**Package Manager:**
- npm/pnpm (locked with package-lock or pnpm-lock file)

## Frameworks

**Core:**
- Next.js 15.5.10 - Full-stack React framework with server actions, API routes, and middleware
  - Turbopack enabled for dev and build (`npm run dev --turbopack`)
  - Server Actions for form submissions and server-side mutations
  - API Routes: `app/api/` directory structure
  - Middleware: `middleware.ts` for session management

**UI & Components:**
- React 19.1.1 - Client and server component rendering
- Radix UI - Headless component library for dialogs, dropdowns, selects, etc.
  - Avatar, Checkbox, Collapsible, Dialog, Dropdown Menu, Label, Popover, Progress, Scroll Area, Select, Separator, Tabs, Tooltip
- Tailwind CSS 4 with PostCSS - Utility-first styling
- CVA (class-variance-authority) 0.7.1 - Component variant management
- Lucide React 0.539.0 - Icon library
- Motion 12.23.12 - Animation library
- Embla Carousel React 8.6.0 - Carousel component
- Recharts 3.1.2 - Chart library for data visualization

**Forms & Validation:**
- React Hook Form 7.62.0 - Form state management
- Zod 4.0.17 - Schema validation and runtime type checking
- Resolvers (@hookform/resolvers) 3.3.4 - Integration between hook-form and Zod

**Testing & Development:**
- TSX 4.20.4 - TypeScript execution for scripts and development tasks
- Puppeteer 24.16.1 - Headless browser automation
  - Puppeteer Extra 3.3.6 with stealth plugin for evasion
- Crawlee 3.14.1 - Web scraping and crawling framework
- Cheerio 1.1.2 - jQuery-like HTML parsing

**Build & Dev Tools:**
- Tailwind CSS PostCSS plugin (@tailwindcss/postcss) 4 - CSS processing
- ESLint 9 - Code linting
  - ESLint config for Next.js (eslint-config-next 15.4.6)
- Prettier 2.8.8 - Code formatting
  - Prettier plugin for import sorting (@ianvs/prettier-plugin-sort-imports 4.6.2)

## Key Dependencies

**Critical:**
- @supabase/supabase-js (latest) - PostgreSQL database client and auth
- @supabase/ssr (latest) - Server-side rendering helpers for Supabase auth
- ai 5.0.15 - Vercel AI SDK for LLM integrations
  - @ai-sdk/anthropic 2.0.4 - Claude/Anthropic models
  - @ai-sdk/openai 2.0.15 - GPT models

**Infrastructure & Data:**
- React DOM 19.1.1 - DOM rendering layer
- SWR 2.3.6 - Data fetching and caching library
- Resend 6.9.1 - Email service API client
- @vercel/analytics 1.5.0 - Analytics integration
- next-themes 0.4.6 - Theme provider (light/dark mode)

**Utilities:**
- Zod 4.0.17 - Schema validation
- clsx 2.1.1 - Utility for className composition
- tailwind-merge 3.3.1 - Tailwind class merging
- sonner 2.0.7 - Toast notification component
- cmdk 1.1.1 - Command palette component
- vaul 1.1.2 - Drawer component
- vaso 0.4.0 - Layout utilities
- react-markdown 10.1.0 - Markdown rendering
- react-dropzone 14.3.8 - File upload handling
- react-use-measure 2.1.7 - DOM measurement hook
- tslog 4.9.3 - Structured logging
- fs-extra 11.3.1 - File system utilities
- dotenv 16.4.5 - Environment variable loading

**Concurrency/Performance:**
- p-map 7.0.2 - Promise.all alternative with concurrency control
- p-retry 6.2.0 - Automatic retry logic for promises
- p-throttle 6.1.0 - Rate limiting for async operations
- p-progress 1.0.0 - Progress tracking for promise batches
- encoding 0.1.13 - Character encoding handling

## Configuration

**Environment:**
- `.env.example` - Template for required environment variables
- `.env.local`, `.env.production`, `.env.production.local` - Environment-specific configs
- Environment variables used:
  - **Supabase:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`, `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - **AI APIs:** `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`
  - **Email:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
  - **Crons:** `CRON_SECRET` - Bearer token for scheduled jobs
  - **Admin:** `ADMIN_SECRET` - Protection for admin endpoints
  - **Analytics:** `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`
  - **Site:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_DESCRIPTION`
  - **Social:** `TWITTER_HANDLE`, `FACEBOOK_APP_ID`
  - **Node:** `NODE_ENV`

**TypeScript:**
- `tsconfig.json` - ESNext target, strict mode, path alias `@/*` mapping to root
- Compiler options: noEmit, isolatedModules, skipLibCheck
- Excludes: node_modules, .next, supabase/seed scripts

**Next.js:**
- `next.config.js` - Server action body limit: 5mb
  - Image optimization for Supabase storage (`**.supabase.co`)
- Experimental server actions enabled

**Styling:**
- `postcss.config.mjs` - PostCSS with @tailwindcss/postcss plugin
- `tailwind.config.ts` - Tailwind CSS configuration (generated or managed)

**Code Quality:**
- `prettier.config.cjs` - Code formatting configuration with import sorting

## Platform Requirements

**Development:**
- Node.js 18+
- npm or pnpm
- TypeScript knowledge
- Git for version control

**Production:**
- Vercel (primary deployment target based on @vercel/analytics usage)
- PostgreSQL-compatible database (Supabase)
- Environment variables configured in deployment platform

## Data & Storage

**Database:**
- PostgreSQL via Supabase (latest version)
- Migrations: `supabase/migrations/` contains SQL schema and function definitions

**Object Storage:**
- Supabase Storage bucket: `product-logos` - Logo image uploads from product submissions
- Cache control: 3600 seconds
- Public URL generation for image display

**Client Libraries:**
- `db/supabase/client.ts` - Browser-side Supabase client
- `db/supabase/server.ts` - Server-side Supabase client with cookie management
- `db/supabase/middleware.ts` - Session refresh in request middleware

---

*Stack analysis: 2026-01-28*
