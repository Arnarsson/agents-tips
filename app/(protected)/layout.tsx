import { redirect } from "next/navigation"
import { createClient } from "@/db/supabase/server"

import { hasEnvVars } from "@/lib/utils"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!hasEnvVars) {
    redirect("/auth/login")
  }

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) {
    redirect("/auth/login")
  }
  return <div>{children}</div>
}
