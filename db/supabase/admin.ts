import { createClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client for server-only, RLS-bypassing writes
 * (Stripe webhooks, admin jobs). NEVER import this into client components.
 *
 * Returns null if env isn't configured so callers can degrade gracefully
 * instead of throwing at module load.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) return null

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
