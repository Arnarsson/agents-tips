import { createBrowserClient } from "@supabase/ssr"

export const hasSupabaseBrowserEnv = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
)

export function createClient() {
  if (!hasSupabaseBrowserEnv) {
    throw new Error(
      "Supabase browser environment variables are not configured."
    )
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  )
}
