import { redirect } from "next/navigation"
import { createClient } from "@/db/supabase/server"

import { hasEnvVars } from "@/lib/utils"

import SubmitTool from "./form"

export const metadata = {
  title: "Submit an Agent | agents.tips",
  description: "Submit an AI agent or tool for review on agents.tips.",
  robots: { index: false, follow: true },
}

export default async function SubmitPage() {
  if (!hasEnvVars) {
    redirect("/auth/login")
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect("/auth/login")
  }

  return (
    <>
      <div className="max-w-full px-4 md:px-6 lg:px-8 ">
        <div className="relative w-full max-w-4xl mx-auto">
          <SubmitTool userId={data.claims.sub} />
        </div>
      </div>
    </>
  )
}
