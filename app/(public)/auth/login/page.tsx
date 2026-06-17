import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/db/supabase/server"

import { hasEnvVars } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"

// Force dynamic rendering to prevent cookies() errors during build

export default async function Page() {
  if (!hasEnvVars) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in unavailable locally</CardTitle>
            <CardDescription>
              Supabase authentication is not configured for this dev session.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="rounded-lg border bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
              <div>NEXT_PUBLIC_SUPABASE_URL=...</div>
              <div>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=...</div>
            </div>
            <Button asChild>
              <Link href="/">Back to directory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (data?.claims) {
    redirect("/")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
