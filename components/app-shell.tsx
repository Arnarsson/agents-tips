"use client"

import { ReactNode, Suspense } from "react"
import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumbs } from "@/components/dynamic-breadcrumbs"

interface AppShellProps {
  children: ReactNode
  filtersAction: Promise<{
    categories: (string | null)[]
    labels: string[]
    tags: string[]
    categoryCounts?: Record<string, number>
    labelCounts?: Record<string, number>
    tagCounts?: Record<string, number>
  }>
}

export function AppShell({ children, filtersAction }: AppShellProps) {
  const pathname = usePathname()

  if (pathname === "/") {
    return <main className="min-h-svh bg-background">{children}</main>
  }

  return (
    <SidebarProvider>
      <AppSidebar filtersAction={filtersAction} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Suspense
              fallback={
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              }
            >
              <DynamicBreadcrumbs />
            </Suspense>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-3 pb-4 md:gap-6 md:py-6 lg:px-8">
              {children}

              <div className="hidden flex-1 rounded-xl bg-muted/30 md:min-h-min lg:block" />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
