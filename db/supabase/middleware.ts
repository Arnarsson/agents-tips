import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

import { hasEnvVars } from "@/lib/utils"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  // Skip Supabase middleware if env vars are not configured
  if (!hasEnvVars) {
    return response
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    // Content Machine: No auth redirects needed in middleware.
    // All routes are public. Protection is handled at the component or action level if needed.
    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return response
  }
}
