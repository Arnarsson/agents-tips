# Architecture

**Analysis Date:** 2026-01-28

## Pattern Overview

**Overall:** Next.js 15 full-stack application with server-centric architecture using App Router, Server Components, and Server Actions.

**Key Characteristics:**
- Full-stack React with minimal client-side complexity
- Server-first data fetching with React's `cache()` and Next.js `unstable_cache()`
- Supabase for authentication and database with Row-Level Security
- Component-driven UI using Radix UI primitives
- Server Actions (`use server`) for mutations and data operations
- Group-based routing structure with role-based layouts

## Layers

**Presentation Layer:**
- Purpose: UI components and client interactivity
- Location: `components/` (22 root components, 37+ UI primitives)
- Contains: React components (client and server), layout components, form components
- Depends on: `lib/types`, `lib/utils`, `hooks/`
- Used by: `app/` pages and layouts

**Page/Route Layer:**
- Purpose: Next.js App Router routes and page templates
- Location: `app/` with group-based routing: `(public)`, `(protected)`, `(admin)`
- Contains: Page components, layout wrappers, API routes
- Depends on: Server Actions, database layer
- Used by: Next.js router, browser navigation

**Server Actions Layer:**
- Purpose: Mutation operations and server-side logic
- Location: `app/actions/` (product.ts, user.ts, bookmark.ts, cached_actions.ts)
- Contains: Database operations, Supabase queries, caching logic
- Depends on: `db/supabase/` clients
- Used by: Pages, client components via `useTransition()`

**Data Layer:**
- Purpose: Database access and caching
- Location: `db/supabase/` (server.ts, client.ts, middleware.ts, types.ts)
- Contains: Supabase client factories, middleware, TypeScript type definitions from database
- Depends on: Supabase SDK, environment variables
- Used by: Server Actions layer

**Utility Layer:**
- Purpose: Shared functions and constants
- Location: `lib/` (types.ts, utils.ts, seo-config.ts, affiliate.ts, etc.)
- Contains: Type definitions, helper functions, configuration
- Depends on: External packages, database types
- Used by: All layers

**Hook Layer:**
- Purpose: React hooks for client-side state and effects
- Location: `hooks/` (use-bookmark-status.ts, use-url-filters.ts, use-resource-click-counter.tsx, etc.)
- Contains: Custom React hooks for client interactivity
- Depends on: React, server actions
- Used by: Client components

## Data Flow

**Product Discovery Flow (Homepage):**

1. Page renders: `app/page.tsx` (async Server Component)
2. Calls cached server actions: `getCachedProducts()`, `getCachedFilters()`, `getCachedFeaturedProducts()`
3. Cached actions call: `app/actions/product.ts` → `getProductsWithClient()`
4. Database query: Supabase client calls products table with filters
5. Results cached: Next.js `unstable_cache()` with 30-minute revalidation
6. Rendered: Components consume data via props
7. Click tracking: Client-side `incrementClickCount()` via server action

**Product Detail Flow:**

1. Route: `/products/[slug]` receives slug parameter
2. Page fetches: `getCachedProductById(id)` from cached_actions
3. Database query: Single product + joins for view counts
4. Rendered: `DirectoryProductCard` component displays data
5. User interaction: Bookmark/affiliate clicks trigger server actions

**Authentication Flow:**

1. Route: Protected layouts check auth via `createClient()` + `auth.getClaims()`
2. Check: `(protected)/layout.tsx` redirects unauthenticated to `/auth/login`
3. Check: `(admin)/admin/layout.tsx` checks `admin_secret` cookie
4. Logic: Middleware runs on all requests to refresh Supabase session

**Search/Filter Flow:**

1. Client interaction: `DirectorySearch` component
2. Submission: Form posts to query params
3. Server re-render: `page.tsx` receives `searchParams` as props
4. Query: Passes to `getProductsWithClient()` with sanitized inputs
5. Results: Cache miss or cache hit based on search term + filters
6. Display: Filtered products rendered in grid

**State Management:**

- Server State: Supabase database is source of truth
- Cache State: Next.js `unstable_cache()` layer for query deduplication (1-30 min TTL)
- React Cache: `cache()` hook for deduplication within single request
- Client State: `useOptimistic()` for instant UI updates (e.g., view count increments)
- Session State: Auth session stored in Supabase cookies managed by middleware

## Key Abstractions

**Cached Query Pattern:**
- Purpose: Reduce database load and improve page speed
- Examples: `getCachedProducts()`, `getCachedFilters()`, `getCachedFeaturedProducts()`
- Pattern: `unstable_cache(async () => { /* logic */ }, ['key'], { tags: ['tag'], revalidate: seconds })`
- Usage: Pages call cached actions that internally call non-cached action functions

**Supabase Client Abstraction:**
- Purpose: Encapsulate Supabase connection and auth logic
- Examples: `db/supabase/server.ts`, `db/supabase/client.ts`, `db/supabase/middleware.ts`
- Pattern: Factory functions return configured clients with cookie handling
- Usage: Server actions import `createClient()` and use it to query database

**Product Type Hierarchy:**
- Purpose: Accommodate database nullability in TypeScript
- Examples: `Product` (nullable fields), `ProductStrict` (non-nullable), `ProductRow` (database type)
- Pattern: Transformation functions (`transformProductRow()`, `transformProductRowWithDefaults()`)
- Usage: Pages use `Product`, components validate with `ProductStrict`

**Server Action Wrapper:**
- Purpose: Provide optimistic updates and loading states
- Examples: `incrementClickCount()`, `toggleBookmark()`, `addBookmark()`
- Pattern: Server action called from client via `useTransition()`, updates optimistic state
- Usage: Components wrap clicks/form submissions to provide instant feedback

**Input Validation/Sanitization:**
- Purpose: Prevent SQL injection and invalid queries
- Examples: `validateSearchInput()` in product.ts removes dangerous characters
- Pattern: Sanitize all user inputs before passing to Supabase queries
- Usage: Search terms, filter values, category/label/tag names

## Entry Points

**Browser Entry:**
- Location: `app/layout.tsx` (Root Layout)
- Triggers: All HTTP requests
- Responsibilities: Theme provider, sidebar layout, fonts, metadata, analytics

**Homepage:**
- Location: `app/page.tsx`
- Triggers: GET /
- Responsibilities: Product grid, hero, carousels, search

**Authentication:**
- Location: `app/(public)/auth/` routes
- Triggers: GET /auth/login, /auth/sign-up, etc.
- Responsibilities: Auth form rendering, session management

**Protected Routes:**
- Location: `app/(protected)/` routes
- Triggers: GET /bookmarks, /submit-new
- Responsibilities: Check auth before rendering, redirect to login if needed

**Admin Dashboard:**
- Location: `app/(admin)/admin/` routes
- Triggers: GET /admin
- Responsibilities: Check admin_secret cookie, display management UI

**API Routes:**
- Location: `app/api/`
- Examples: `/api/newsletter/subscribe`, `/api/analytics/affiliate-click`
- Responsibilities: External integrations (email, tracking)

**Server Middleware:**
- Location: `middleware.ts`
- Triggers: All HTTP requests
- Responsibilities: Session refresh, cookie management

## Error Handling

**Strategy:** Graceful degradation with console errors and try-catch fallbacks

**Patterns:**

1. **Database Query Errors:**
   - Catch errors in server actions
   - Log to console
   - Return empty array or null
   - Allow page to render with partial data
   - Example: `app/actions/product.ts` catches Supabase errors and returns `[]`

2. **Missing Environment Variables:**
   - Check at Supabase client creation: `if (!process.env.NEXT_PUBLIC_SUPABASE_URL) { ... }`
   - Fall back to null client or read-only mode
   - Example: `cached_actions.ts` handles `client === null` gracefully

3. **Search Input Errors:**
   - Validate before query: `validateSearchInput()`
   - Reject invalid patterns (wildcard-only, SQL injection chars)
   - Limit length to prevent abuse
   - Example: product.ts blocks `%_\` patterns

4. **Component Error Boundaries:**
   - Location: `components/ui/error-boundary.tsx`
   - Catches rendering errors in subtree
   - Displays fallback UI or error message

5. **Request Errors:**
   - Middleware catches auth failures
   - API routes wrap in try-catch
   - Return appropriate HTTP status codes

6. **Fetch Errors:**
   - Server actions log errors
   - Allow retries via user action
   - Don't crash page on fetch failure

## Cross-Cutting Concerns

**Logging:**
- Approach: `console.log()`, `console.error()`, `console.warn()`
- Pattern: All database errors logged to console in development
- Used for: Debugging queries, tracking failures
- Examples: `app/actions/product.ts` logs sanitization and query errors

**Validation:**
- Approach: Input sanitization in server actions before database queries
- Pattern: `validateSearchInput()` removes dangerous characters
- Used for: Security (SQL injection prevention), data integrity
- Examples: Search terms, category/label/tag filtering

**Authentication:**
- Approach: Supabase Auth with server-side session management
- Pattern: Middleware refreshes session on every request, layouts check `auth.getClaims()`
- Used for: Protecting routes, checking admin status
- Examples: `(protected)/layout.tsx`, `(admin)/admin/layout.tsx`

**Authorization:**
- Approach: Layout-level checks and admin_secret cookie
- Pattern: Middleware and layouts redirect unauthorized users
- Used for: Admin access control, user-specific routes
- Examples: Admin checks cookie + NODE_ENV, protected checks auth claims

**Caching:**
- Approach: Multi-layer caching strategy
- Pattern: React `cache()` for request-level, `unstable_cache()` for multi-request
- Used for: Performance, reducing database load
- Examples: `getCachedProducts()` with 30-minute revalidate, `getCachedFilters()` with 60-minute revalidate

**Analytics:**
- Approach: Vercel Analytics + custom affiliate tracking
- Pattern: Inline `<Analytics />` component, custom API routes
- Used for: Page performance, affiliate revenue tracking
- Examples: `/api/analytics/affiliate-click` tracks clicks

---

*Architecture analysis: 2026-01-28*
