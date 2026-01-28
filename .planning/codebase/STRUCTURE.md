# Codebase Structure

**Analysis Date:** 2026-01-28

## Directory Layout

```
agents-tips/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout (theme, sidebar, fonts)
│   ├── page.tsx                # Homepage with product grid
│   ├── globals.css             # Global styles
│   ├── error.tsx               # Error boundary
│   ├── middleware.ts           # Auth session middleware
│   ├── actions/                # Server Actions (mutations, data ops)
│   │   ├── cached_actions.ts   # Cached read operations
│   │   ├── product.ts          # Product queries + validation
│   │   ├── user.ts             # User profile operations
│   │   └── bookmark.ts         # Bookmark management
│   ├── api/                    # API routes
│   │   ├── analytics/          # Click tracking
│   │   └── newsletter/         # Email subscriptions
│   ├── (public)/               # Public routes group
│   │   ├── auth/               # Authentication pages
│   │   ├── blog/               # Blog articles
│   │   ├── products/           # Product directory pages
│   │   ├── categories/         # Category browsing
│   │   ├── labels/             # Label filtering
│   │   ├── tags/               # Tag filtering
│   │   ├── profile/            # User profiles
│   │   └── newsletter/         # Newsletter page
│   ├── (protected)/            # Protected routes group (requires auth)
│   │   ├── layout.tsx          # Auth check redirect
│   │   ├── bookmarks/          # Saved products
│   │   └── submit-new/         # Product submission
│   ├── (admin)/                # Admin routes group (secret-based)
│   │   └── admin/              # Management dashboard
│   ├── og/                     # Open Graph image generation
│   ├── fonts/                  # Font loading
│   └── styles/                 # CSS themes
│
├── components/                 # React components
│   ├── (root level 22 .tsx)    # Feature components
│   │   ├── app-sidebar.tsx     # Main navigation
│   │   ├── directory-card.tsx  # Product card component
│   │   ├── directory-card-grid.tsx # Grid layout
│   │   ├── featured-carousels.tsx  # Carousels
│   │   ├── directory-search.tsx    # Search input
│   │   ├── hero.tsx            # Hero section
│   │   ├── newsletter-signup.tsx   # Newsletter CTA
│   │   ├── login-form.tsx      # Login form
│   │   ├── sign-up-form.tsx    # Signup form
│   │   ├── bookmark-button.tsx # Bookmark action
│   │   ├── affiliate-link-button.tsx # Click tracking
│   │   ├── auth-provider.tsx   # Auth context
│   │   ├── theme-provider.tsx  # Dark mode provider
│   │   ├── dynamic-breadcrumbs.tsx  # Breadcrumb nav
│   │   ├── site-footer.tsx     # Footer
│   │   ├── user-profile-header.tsx  # Profile display
│   │   ├── nav-main.tsx        # Main navigation
│   │   ├── nav-user.tsx        # User menu
│   │   ├── nav-secondary.tsx   # Secondary nav
│   │   └── (others)            # Form fields, helpers
│   ├── ui/                     # Radix UI primitives (37+ components)
│   │   ├── card.tsx
│   │   ├── button.tsx (styled)
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── sidebar.tsx
│   │   ├── sonner.tsx          # Toast notifications
│   │   ├── minimal-card.tsx    # Custom card variant
│   │   ├── error-boundary.tsx  # Error fallback
│   │   └── (others)            # Scroll, separator, label, etc.
│   ├── seo/                    # SEO components
│   │   └── structured-data.tsx # JSON-LD schema
│   ├── tutorial/               # Onboarding/tutorial components
│   │   └── empty-state.tsx     # Empty state UI
│   └── redesign/               # Design system variants
│
├── lib/                        # Utilities and helpers
│   ├── types.ts                # Type definitions (Product, User, etc.)
│   ├── utils.ts                # General helpers (cn, etc.)
│   ├── seo-config.ts           # SEO metadata and OG image generation
│   ├── affiliate.ts            # Affiliate link building + tracking
│   ├── scraper.ts              # Web scraping logic
│   ├── error.ts                # Custom error classes
│   ├── icons.ts                # Icon definitions
│   ├── tag-label-utils.ts      # Filter utilities
│   ├── tutorial-steps.ts       # Tutorial data
│   ├── accessibility-utils.ts  # A11y helpers
│   ├── sign-up-schema.ts       # Form validation schema (Zod)
│   ├── og-image.ts             # OG image generation
│   └── email/
│       └── welcome-sequence.ts # Email templates
│
├── hooks/                      # React hooks
│   ├── use-bookmark-status.ts  # Bookmark state
│   ├── use-resource-click-counter.tsx  # Click tracking
│   ├── use-url-filters.ts      # Search/filter state
│   ├── use-breadcrumbs.ts      # Breadcrumb generation
│   ├── use-current-user-meta.ts # User metadata
│   ├── use-current-user-image.ts # User avatar
│   ├── use-mobile.ts           # Responsive detection
│   └── use-file-preview.ts     # File upload preview
│
├── db/                         # Database configuration
│   └── supabase/
│       ├── server.ts           # Server client factory
│       ├── client.ts           # Browser client factory
│       ├── middleware.ts       # Session refresh middleware
│       └── types.ts            # Auto-generated database types (15KB)
│
├── supabase/                   # Supabase project files
│   ├── migrations/             # Database migration files
│   ├── seed/                   # Seed scripts (data pipeline)
│   │   ├── src/
│   │   │   ├── stage-0-discover/  # Web discovery
│   │   │   ├── stage-1-crawl/     # Page crawling
│   │   │   ├── stage-2-enrich/    # AI enrichment
│   │   │   └── stage-3-seed/      # Database insertion
│   │   └── images/             # Downloaded assets
│   └── snippets/               # Reusable SQL
│
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── (static files)
│
├── scripts/                    # Build/utility scripts
│
├── content/                    # Editorial content
│   ├── articles/               # Blog post markdown
│   └── templates/              # Content templates
│
├── content-machine/            # AI content generation
│   ├── prompts/                # LLM prompts
│   └── (generation scripts)
│
├── .planning/                  # This analysis
│   └── codebase/
│       ├── ARCHITECTURE.md
│       ├── STRUCTURE.md
│       └── (other docs)
│
├── .github/                    # GitHub Actions
│   └── workflows/
│
├── Configuration files
│   ├── package.json            # Dependencies, scripts
│   ├── tsconfig.json           # TypeScript config
│   ├── next.config.js          # Next.js config
│   ├── middleware.ts           # Next middleware
│   ├── postcss.config.mjs       # PostCSS (Tailwind)
│   ├── tailwind.config.js      # Tailwind config
│   ├── prettier.config.cjs     # Code formatting
│   ├── components.json         # shadcn/ui registry
│   ├── vercel.json             # Vercel deployment
│   └── .env.example            # Example env vars
│
└── Documentation
    ├── README.md
    ├── QUICKSTART.md
    ├── SETUP.md
    ├── DEPLOY.md
    ├── PROJECT-SUMMARY.md
    └── (other guides)
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router entry point for all routes
- Contains: Page components, layouts, API endpoints, server actions
- Key files: `layout.tsx` (root), `page.tsx` (homepage), `actions/` (mutations)

**`app/actions/`:**
- Purpose: Server-side operations and database mutations
- Contains: Server Actions marked with `"use server"`
- Key files: `cached_actions.ts` (read with caching), `product.ts` (queries), `user.ts` (auth), `bookmark.ts` (saves)

**`app/api/`:**
- Purpose: API routes for external integrations
- Contains: Route handlers for webhooks, email, analytics
- Key files: `/newsletter/subscribe`, `/analytics/affiliate-click`

**`app/(public)/`:**
- Purpose: Public-facing routes accessible to all users
- Contains: Directory, blog, auth pages
- Subdirs: `auth/` (login/signup), `products/` (detail pages), `blog/` (articles), `profile/` (user pages)

**`app/(protected)/`:**
- Purpose: Routes requiring authentication
- Contains: User bookmarks, product submission
- Auth check: `layout.tsx` redirects to `/auth/login` if not authenticated

**`app/(admin)/`:**
- Purpose: Admin management interface
- Contains: Product management, filter editing, user management
- Auth check: `layout.tsx` validates `admin_secret` cookie + NODE_ENV check

**`components/`:**
- Purpose: Reusable React components
- Root level (22): Feature components used by pages
- `ui/` (37+): Radix UI primitives and styled base components
- `seo/`: Structured data and metadata components
- `tutorial/`: Onboarding UI components

**`lib/`:**
- Purpose: Shared utilities, types, helpers
- Key files: `types.ts` (Product/User types), `utils.ts` (cn helper), `seo-config.ts` (metadata), `affiliate.ts` (tracking)

**`hooks/`:**
- Purpose: Custom React hooks for client-side logic
- Key files: `use-bookmark-status.ts`, `use-url-filters.ts`, `use-resource-click-counter.tsx`

**`db/supabase/`:**
- Purpose: Supabase client configuration and types
- Key files: `server.ts` (SSR client), `middleware.ts` (session refresh), `types.ts` (database schema)

**`supabase/`:**
- Purpose: Supabase project configuration and seed data
- `migrations/`: SQL migration files for schema changes
- `seed/`: Multi-stage data pipeline (discover → crawl → enrich → seed)

**`public/`:**
- Purpose: Static assets served directly by Next.js
- Contains: Images, icons, downloadable files

**`content/`:**
- Purpose: Editorial content for blog and pages
- `articles/`: Markdown blog posts
- `templates/`: Content generation templates

**`content-machine/`:**
- Purpose: AI-powered content generation and enrichment
- `prompts/`: LLM prompts for agent discovery and enrichment

**`.planning/codebase/`:**
- Purpose: Analysis documents for development guidance
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, etc.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout (theme, sidebar, fonts, metadata)
- `app/page.tsx`: Homepage with product grid and search
- `app/middleware.ts`: Session management for all requests

**Authentication:**
- `app/(public)/auth/login/page.tsx`: Login page
- `app/(public)/auth/sign-up/page.tsx`: Signup page
- `db/supabase/server.ts`: Server-side Supabase client
- `db/supabase/middleware.ts`: Session refresh logic

**Core Logic:**
- `app/actions/product.ts`: Product queries with validation and caching
- `app/actions/user.ts`: User profile and auth checks
- `app/actions/bookmark.ts`: Bookmark save/remove
- `app/actions/cached_actions.ts`: Cached read queries with revalidation

**Components:**
- `components/directory-card.tsx`: Product card with click tracking
- `components/directory-search.tsx`: Search input
- `components/featured-carousels.tsx`: Featured/popular product carousels
- `components/app-sidebar.tsx`: Main navigation sidebar

**Data Models:**
- `lib/types.ts`: Product, User, Bookmark types with transformation functions
- `db/supabase/types.ts`: Auto-generated database schema types

**Configuration:**
- `tsconfig.json`: TypeScript config with `@/*` path alias
- `next.config.js`: Image remotePatterns for Supabase assets
- `tailwind.config.js`: Tailwind configuration
- `package.json`: Dependencies and scripts

**Styling:**
- `app/globals.css`: Global styles, CSS variables
- `app/styles/theme-dark-command.css`: Dark mode theme

## Naming Conventions

**Files:**
- Server Actions: `app/actions/*.ts` - verb-based (product.ts, user.ts, bookmark.ts)
- Pages: `app/**/page.tsx` - always named `page.tsx`
- Layouts: `app/**/layout.tsx` - always named `layout.tsx`
- API Routes: `app/api/**/route.ts` - always named `route.ts`
- Components: PascalCase (DirectoryCard.tsx, LoginForm.tsx, AppSidebar.tsx)
- Hooks: camelCase with `use` prefix (useBookmarkStatus.ts, useUrlFilters.ts)
- Utilities: camelCase (utils.ts, seo-config.ts, affiliate.ts)

**Directories:**
- Group routes: `(public)`, `(protected)`, `(admin)` - parentheses denote URL non-inclusion
- Dynamic routes: `[slug]`, `[id]` - brackets denote dynamic segments
- Feature modules: lowercase plural or descriptive (actions, components, hooks, lib)

**TypeScript/Types:**
- Database types: Derived from `Database["public"]["Tables"]["name"]["Row"]`
- Component props: `React.FC<{ prop: Type }>` or interface props
- Async functions: Return typed Promises: `async function foo(): Promise<Type>`

## Where to Add New Code

**New Feature:**
- Primary code: `app/actions/feature-name.ts` (server action with caching)
- Pages: `app/(public)/feature-name/page.tsx` or appropriate group
- Components: `components/feature-name.tsx` or `components/feature-name/` subdirectory
- Tests: Co-located with source files (if testing implemented)

**New Component/Module:**
- Reusable component: `components/component-name.tsx`
- UI component (styled primitive): `components/ui/component-name.tsx`
- Page-specific component: `components/feature-name/component-name.tsx`
- Client component: Add `"use client"` at top if using React hooks
- Server component: Default - no directive needed

**Utilities:**
- Shared helpers: `lib/utils.ts` (general) or `lib/domain-utils.ts` (specific)
- Type definitions: `lib/types.ts`
- Configuration: `lib/config-name.ts` (e.g., seo-config.ts)
- Email templates: `lib/email/template-name.ts`

**Database:**
- Queries: Add to appropriate action file in `app/actions/`
- Migrations: Create `.sql` file in `supabase/migrations/` with timestamp prefix
- Type generation: Auto-generated from Supabase schema in `db/supabase/types.ts`

**Styles:**
- Global styles: `app/globals.css`
- Component-scoped: Use Tailwind `@apply` or inline className
- Theme variables: Edit `app/styles/theme-*.css`
- Tailwind customization: `tailwind.config.js`

**API Integrations:**
- External APIs: Create route in `app/api/domain/action/route.ts`
- Third-party clients: Configure in `.env.local`, import in server actions
- Webhooks: Handle in appropriate API route file

## Special Directories

**`supabase/migrations/`:**
- Purpose: Database schema version control
- Generated: Yes (by Supabase CLI)
- Committed: Yes (required for production)
- Naming: YYYYMMDDHHMMSS prefix (e.g., `20231227000000_init_user.sql`)
- Runnable: Via Supabase CLI or UI

**`supabase/seed/`:**
- Purpose: Data pipeline for discovering and enriching AI agents
- Generated: Yes (stage outputs)
- Committed: No (pipeline state, only source code)
- Executable: Via npm scripts (discover, crawl, enrich, auto-pipeline)
- Entry: `supabase/seed/src/main.ts` and stage-specific indices

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (by `npm run build`)
- Committed: No
- Contains: Compiled code, optimized assets, manifest files

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (by pnpm install)
- Committed: No (use pnpm-lock.yaml)
- Note: Project uses pnpm package manager

**`public/`:**
- Purpose: Static assets served at `/`
- Generated: No (manually added)
- Committed: Yes (for deployment)
- Examples: Logos, favicons, downloadable files

**`.env.local`, `.env.production`:**
- Purpose: Environment configuration
- Generated: No (manually created)
- Committed: No (add to .gitignore)
- Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SECRET

---

*Structure analysis: 2026-01-28*
