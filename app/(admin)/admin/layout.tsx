import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const adminSecret = cookieStore.get("admin_secret")?.value

  // Content Machine: Simple secret-based protection
  // In production, set ADMIN_SECRET in your environment variables
  if (adminSecret !== process.env.ADMIN_SECRET && process.env.NODE_ENV === "production") {
    redirect("/")
  }

  return <>{children}</>
}
