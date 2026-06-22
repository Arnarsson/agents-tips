import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV = [
  { href: "/products", label: "Tools" },
  { href: "/compare", label: "Compare" },
  { href: "/workflows", label: "Workflows" },
  { href: "/watch", label: "Watch" },
]

export function EditorialHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border py-5">
      <Link href="/" className="font-serif text-2xl font-medium tracking-tight">
        agents<span className="text-primary">.</span>tips
      </Link>
      <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          asChild
          className="rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/submit-new">
            List your tool
            <Plus className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
