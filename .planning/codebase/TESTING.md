# Testing Patterns

**Analysis Date:** 2026-01-28

## Test Framework

**Status:** Not detected

This codebase does not have an automated testing framework configured. No test files (`.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx`) were found in the repository.

**Testing infrastructure absent:**
- No Jest configuration (`jest.config.*`)
- No Vitest configuration (`vitest.config.*`)
- No test script in `package.json`
- No test dependencies (`@testing-library/react`, `jest`, `vitest`, etc.)

## Manual Testing & Quality Assurance

**Development Mode:**
```bash
npm run dev              # Start Next.js dev server with hot reload
npm run check-types     # Run TypeScript type checking
npm run lint            # Run ESLint
npm run format:check    # Check code formatting
```

**Type Safety:**
- TypeScript configured with `strict: true` in `tsconfig.json`
- All server actions explicitly typed: `async function(...): Promise<Type>`
- React component props explicitly typed
- Database types generated from schema: `Database["public"]["Tables"]["..."]`
- Zod validation for form inputs with schema definitions

**Development Practices:**
- Next.js development server runs with Turbopack for fast feedback
- Type checking enforced in CI/CD via `npm run check-types`
- Linting enforced via `npm run lint`
- Code formatting enforced via Prettier (check in CI, write locally)

## Error Handling Testing

**Manual Testing Approach:**

**Error Boundary Testing:**
- Error boundary component (`components/ui/error-boundary.tsx`) catches React component errors
- Falls back to UI: "Something went wrong. Please try refreshing the page."
- Development mode shows error details in collapsible section
- Tested by verifying fallback renders when child components throw

**Database Error Handling:**
- All database queries wrapped in try-catch
- Errors logged with context: `console.error("Error fetching..:", error)`
- Operations return empty defaults on failure:
  - Arrays return `[]`
  - Objects return `null`
  - Query results return `{ success: false, error: message }`

**Form Validation Testing:**
- Zod schemas validate before submission
- React Hook Form integration with zodResolver
- Validation errors displayed to user via toast notifications: `toast.error("Please fix the issues below")`
- Form state tracking in `useActionState` hook provides feedback
- Example validation schema in `app/(protected)/submit-new/schema.ts`:
  - URL validation: `.url({ message: "Invalid URL." })`
  - String length constraints: `.min(1)`, `.max(30)`
  - File type validation: `.instanceof(File)`
  - Array constraints: `.array(z.string()).min(1)`

**Async Operation Testing:**
- Server actions return discriminated unions: `{ message: string; issues: string[] }`
- Client-side tracking of pending state: `const [state, formAction, pending] = useActionState(...)`
- Loading indicators updated based on pending state
- Success/error feedback via toast notifications: `toast.success()`, `toast.error()`

## Client-Side State Management Testing

**localStorage Testing (useBookmarkStatus hook):**
- Manual testing of bookmark persistence
- Hook implementation `hooks/use-bookmark-status.ts`:
  - Reads from localStorage on mount
  - Handles JSON parse errors gracefully
  - Listens for cross-tab storage changes
  - Uses try-catch for all localStorage operations
  - Falls back to local state if storage unavailable

**React Hook Testing:**
- Hooks use effect cleanup patterns: `useEffect(() => { ... return () => cleanup }, [deps])`
- Dependencies correctly specified to prevent stale closures
- Example: `use-resource-click-counter.tsx` tracks click counts with optimistic updates
- Example: `use-current-user-meta.ts` fetches auth metadata on mount

**Component State Testing:**
- Optimistic updates in `DirectoryProductCard.tsx`:
  - Uses `useOptimistic` hook for immediate UI feedback
  - Server action called after optimistic update
  - Errors don't break optimistic state
- Form state in `useSubmitForm.ts`:
  - Helper functions validate state: `isFileTooLarge()`, `isLogoMissing()`, `isFormValid()`
  - State changes trigger side effects via useEffect
  - Multiple validation checks before submission

## Security & Input Validation Testing

**SQL Injection Prevention (manual testing):**
- `validateSearchInput()` in `app/actions/product.ts`:
  - Removes SQL injection characters: `['";\\\]`
  - Limits input length: `slice(0, 50)`
  - Blocks wildcard-only searches: `/^[%_\\]+$/`
  - Returns undefined for invalid inputs
  - Parameterized queries via Supabase (`.ilike()`, `.contains()`)

**File Upload Validation (useSubmitForm):**
- File size validation: `files.size > 8 * 1024 * 1024`
- File required validation: checks file exists before submission
- Type validation via Zod: `.instanceof(File)`
- Server-side re-validation in action
- Uploaded files stored in Supabase with path isolation: `${codename}/${filename}`

**Authentication Testing:**
- Manual verification of auth status via `getAuthStatus()` action
- Protected routes redirect unauthenticated users: `redirect("/")`
- Admin status checked via auth claims: `claims?.app_metadata?.claims_admin`

## Network & API Testing

**Server Action Testing (manual):**
- Form submission triggers `submitProductFormAction()`
- Validates entire flow: form validation → file upload → database insert → AI enrichment
- Error responses include specific error messages
- Success revalidates cache: `revalidatePath("/", "page")`, `revalidateTag("product-filters")`

**Cache Invalidation Testing:**
- Tested by triggering cache revalidation and observing fresh data
- Uses `cache()` wrapper for React server-side caching
- Tags used for selective revalidation: `revalidateTag("product-filters")`
- Paths revalidated on mutation: `revalidatePath("/products")`

**Database Query Testing:**
- Manual testing of complex queries with joins:
  - `getProductById()`: joins with `product_views` for view count calculation
  - `getProductsWithClient()`: dynamic filtering by category, label, tag
  - Filter search: combines multiple conditions with `.or()`, `.eq()`, `.contains()`

## Edge Cases & Boundary Testing

**Null/Undefined Handling:**
- Defensive checks in utilities: `if (!container) return`
- Optional chaining in render: `data?.claims?.user_metadata?.avatar_url ?? null`
- Default values for transforms: `row.full_name || ""`, `row.tags || []`
- Database rows may have nullable fields, separate `Product` and `ProductStrict` types handle this

**Empty State Testing:**
- Empty arrays default: `return []` from failed queries
- Components handle empty data gracefully
- Filter results show "No results found" when empty

**Loading State Testing:**
- `loadingStep` animation in `useSubmitForm`: increments from 1-5 during pending
- Transitions block interaction: buttons disabled during pending
- Multiple useEffect dependencies ensure cleanup happens

**Type Safety Testing:**
- TypeScript `strict: true` catches null/undefined mismatches at compile time
- Database type generation ensures row types match schema
- Component props explicitly typed, preventing wrong usage

## Testing Gaps

**Automated Test Coverage:**
- No unit tests for utility functions (`tag-label-utils.ts`, `accessibility-utils.ts`)
- No component snapshot or interaction tests
- No integration tests for multi-step workflows (upload + enrich + insert)
- No API contract tests for server actions
- No performance benchmarks for database queries

**Areas Without Tests:**
- Accessibility utilities (`accessibility-utils.ts`) - ARIA patterns not verified
- Complex server actions - enrichment pipeline not fully tested
- Rate limiting/quota enforcement - not visible in code
- Third-party integrations (Anthropic/OpenAI AI enrichment) - error handling not covered
- Seed/migration scripts not tested

---

*Testing analysis: 2026-01-28*
