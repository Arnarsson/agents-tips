# Coding Conventions

**Analysis Date:** 2026-01-28

## Naming Patterns

**Files:**
- Components: PascalCase with `.tsx` extension (e.g., `DirectoryCard.tsx`, `BookmarkButton.tsx`)
- Pages/routes: kebab-case in directory names with `page.tsx` files (e.g., `submit-new/page.tsx`)
- Hooks: camelCase with `use-` prefix (e.g., `use-bookmark-status.ts`, `use-current-user-meta.ts`)
- Server actions: camelCase with `.ts` extension (e.g., `user.ts`, `product.ts`)
- Utilities: camelCase with descriptive names (e.g., `tag-label-utils.ts`, `accessibility-utils.ts`)
- Schemas/types: camelCase with `.ts` extension (e.g., `schema.ts`, `types.ts`)

**Functions:**
- camelCase for all function names
- Descriptive names that indicate purpose: `incrementClickCount()`, `validateSearchInput()`, `getProductsWithClient()`
- Helper functions use `is`/`get`/`fetch` prefixes when appropriate: `isFileTooLarge()`, `getBasePath()`, `fetchUserMetadata()`
- Higher-order function returning object: `getAIModel()`, `getFilters()`
- Batch operations: `batchToSnakeCase()`, `batchToTagFormat()`
- Transform operations: `transformProductRow()`, `transformProductRowWithDefaults()`

**Variables:**
- camelCase for all variables and constants
- Descriptive names: `isBookmarked`, `productWebsite`, `codename`, `isPending`
- Boolean prefixes: `is`, `has`, `can`, `should` (e.g., `isLoading`, `hasError`, `canSubmit`)
- Array names use plural: `bookmarks`, `products`, `categories`
- React hook results destructured: `const [isBookmarked, setIsBookmarked] = useState(false)`

**Types:**
- PascalCase for type names: `FormState`, `Enrichment`, `ProductRow`, `UserStats`
- Suffix patterns: `Row` for database rows, `Insert`/`Update` for database operations
- Interface names: PascalCase without `I` prefix (e.g., `ErrorBoundaryProps`, `Product`)
- Types exported from database: `UserRow`, `ProductRow`, `BookmarkRow`

**Constants:**
- UPPER_SNAKE_CASE for configuration constants: `BOOKMARKS_STORAGE_KEY`, `MAX_FILE_SIZE`
- Use `const` for all constants, never `let`
- Objects as const objects when type-safe: `const config = { aiEnrichmentEnabled: true }`

## Code Style

**Formatting:**
- Tool: Prettier (configured in `prettier.config.cjs`)
- No semicolons: `semi: false`
- Double quotes: `singleQuote: false`
- Tab width: 2 spaces
- Line endings: LF only
- Trailing commas: ES5 style
- Run formatting: `npm run format:write`
- Check formatting: `npm run format:check`

**Linting:**
- Tool: ESLint via Next.js config (`eslint-config-next`)
- Run: `npm run lint`
- Type checking: `npm run check-types` (TypeScript noEmit)

## Import Organization

**Order (enforced by Prettier import sort plugin):**
1. React and React DOM imports (e.g., `import React from "react"`, `import { useState } from "react"`)
2. Next.js imports (e.g., `import Link from "next/link"`, `import { useRouter } from "next/navigation"`)
3. Third-party library imports (e.g., `zod`, `react-hook-form`, `lucide-react`)
4. Blank line
5. Type imports (e.g., `import type { Database }`)
6. Config imports from `@/config`
7. Lib imports from `@/lib` (utilities, helpers)
8. Hook imports from `@/hooks`
9. UI component imports from `@/components/ui`
10. Feature component imports from `@/components`
11. Registry imports from `@/registry`
12. Style imports from `@/styles`
13. App imports from `@/app`
14. Blank line
15. Relative imports (e.g., `./schema`, `../shared`)

**Path Aliases:**
- `@/*` maps to root directory: `@/lib`, `@/components`, `@/hooks`, `@/types`, `@/db`, `@/app`
- Always use path aliases instead of relative imports for non-adjacent files

**Import Guidelines:**
- Separate imports by type (React first, then Next, then third-party, etc.)
- Group related imports together
- Import specifiers sorted alphabetically within each import statement
- Type imports use `import type` syntax

## Error Handling

**Patterns:**
- Try-catch blocks around async operations: `try { ... } catch (error) { ... }`
- Log errors with `console.error()` for unexpected errors, `console.warn()` for recoverable issues
- Error type guards: `if (error && !error.message.includes(...))` pattern
- Return empty defaults on error instead of throwing: `return []`, `return null`, `return { success: false }`
- Server actions return `FormState` type with `message` and `issues` fields for validation feedback
- Database errors always logged with context: `console.error("Error fetching user profile:", error.message)`
- Type guard function for error checking: `function isErrorWithMessage(error: unknown): error is Error`

**Examples:**
```typescript
// Server action error handling
if (error) {
  console.error(`Error uploading file: ${uploadError.message}`)
  throw new Error(uploadError.message)
}

// Hook error handling with finally
try {
  const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
  // operation
} catch (error) {
  console.error("Error reading bookmarks:", error)
} finally {
  setIsLoading(false)
}

// Database operations return empty on error
if (error) {
  console.error("Error fetching filters:", error)
  return { categories: [], labels: [], tags: [] }
}
```

## Logging

**Framework:** Native `console` object (no external logging library)

**Patterns:**
- `console.error()`: Unexpected errors, operation failures - includes context message
- `console.warn()`: Recoverable issues, fallbacks being used - includes operation name
- `console.error()` for development-only errors shown in ErrorBoundary

**Guidelines:**
- Always include context: `console.error("Error fetching user profile:", error.message)`
- Format: action + context + error: `console.error(\`Error inserting into ${table}: ${error.message}\`)`
- Don't log in success paths (avoid noise)
- Use string templates for complex messages

## Comments

**When to Comment:**
- Complex algorithms or non-obvious logic (e.g., SQL injection prevention in `validateSearchInput()`)
- Business logic reasons: "Revalidate the products page to show updated counts"
- Security-critical sections: "CRITICAL SECURITY MEASURE" prefix
- Performance notes: "Process in memory for better performance"
- Workarounds for limitations: explain what and why

**JSDoc/TSDoc:**
- Used extensively in utility files (`tag-label-utils.ts`, `accessibility-utils.ts`)
- Pattern: `/** Text describing function */`
- Includes example transformations: Shows before/after values
- Documents parameter types and return types
- Used for all exported utility functions, especially converters

**Example JSDoc:**
```typescript
/**
 * Converts a display string to snake_case for database storage
 * Examples:
 * - "Design Systems" → "design_systems"
 * - "UI Components" → "ui_components"
 */
export function toSnakeCase(str: string): string {
```

## Function Design

**Size:**
- Generally concise, 10-40 lines typical for utilities
- Server actions may be longer due to multiple operations and error handling
- Extracted helper functions for reusable logic

**Parameters:**
- Explicitly typed: `async function getUserProfile(userId: string): Promise<UserRow | null>`
- Use object parameters for multiple related values: `{ decimals?: number, sizeType?: "accurate" | "normal" }`
- Use destructuring in parameters: `{ data, order }: { data: Product; order: any }`

**Return Values:**
- Always explicitly typed
- Async functions return Promise types
- Return objects for multiple related values: `{ success: boolean; data?: UserRow; error?: string }`
- Return objects with type unions for complex flows: `Promise<UserRow | null>`
- Use discriminated unions in form state: `{ message: string; fields?: Record<string, string>; issues: string[] }`

**Default Parameters:**
- Use with destructuring: `opts: { decimals = 0, sizeType = "normal" } = {}`
- Default falsy for optional deps: `category?: string` pattern

## Module Design

**Exports:**
- Named exports for functions: `export function functionName() {}`
- Named exports for types: `export type TypeName = ...`
- Default exports for React components (optional, both patterns used)
- Mix of default and named exports in components (e.g., `ErrorBoundary` class + `DefaultErrorFallback` function)

**Barrel Files:**
- No barrel files (index.ts) in components directory
- Import directly from component files: `import { DirectoryProductCard } from "@/components/directory-card"`
- Sub-exports within components: `import { MinimalCardContent } from "@/components/ui/minimal-card"`

**Organization:**
- Server-only marker: `"use server"` at top of server action files
- Client boundary marker: `"use client"` at top of client components
- Import structure at file top: React → Next → Third-party → Local
- Constants/helpers before main exports

## TypeScript Patterns

**Database Types:**
- Extract from database schema: `type ProductRow = Database["public"]["Tables"]["products"]["Row"]`
- Create variants for operations: `ProductInsert`, `ProductUpdate`
- Group related types together

**Form States:**
- Discriminated union approach: includes `message`, optional `fields`, and `issues` array
- Used by `useActionState` hook: `const [state, formAction, pending] = useActionState(...)`

**React Component Props:**
- Inline type definitions in function parameters preferred over separate Props interfaces
- Example: `export const Hero = ({ children }: { children?: React.ReactNode })`
- When complex, extract to interface: `interface ErrorBoundaryProps`

**Zod Validation:**
- Separate schema files: `schema.ts`
- Export schemas as const: `export const schema = z.object({...})`
- Multiple schemas per file if related: `schema` and `enrichmentSchema`
- Use with zodResolver in react-hook-form

---

*Convention analysis: 2026-01-28*
