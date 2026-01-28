import "./globals.css"

import { ReactNode, Suspense } from "react"
import { Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { getSEOConfig, generateDynamicOGImage } from "@/lib/seo-config"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumbs } from "@/components/dynamic-breadcrumbs"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"

import { getCachedFilters } from "./actions/cached_actions"

// Remove force-dynamic since we're no longer calling server functions
// export const dynamic = "force-dynamic"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const seoConfig = getSEOConfig()
const homeOGImage = generateDynamicOGImage(
  seoConfig.seo.defaultTitle,
  seoConfig.seo.defaultDescription
)

export const metadata = {
  metadataBase: new URL(seoConfig.site.url),
  title: seoConfig.seo.defaultTitle,
  description: seoConfig.seo.defaultDescription,
  keywords: seoConfig.seo.keywords,
  authors: [{ name: seoConfig.organization.name }],
  creator: seoConfig.organization.name,
  publisher: seoConfig.organization.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: seoConfig.seo.locale,
    url: seoConfig.site.url,
    title: seoConfig.seo.defaultTitle,
    description: seoConfig.seo.defaultDescription,
    siteName: seoConfig.site.name,
    images: [
      {
        url: homeOGImage,
        width: 1200,
        height: 628,
        alt: seoConfig.seo.defaultTitle,
      },
    ],
  },
  twitter: {
    card: seoConfig.social.twitter.cardType,
    title: seoConfig.seo.defaultTitle,
    description: seoConfig.seo.defaultDescription,
    images: [homeOGImage],
    creator: seoConfig.social.twitter.handle,
    site: seoConfig.social.twitter.site,
  },
  robots: seoConfig.seo.robots,
  verification: seoConfig.seo.verification,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} font-sans`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar filtersAction={getCachedFilters()} />
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
              <div className="flex flex-1 flex-col ">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 pb-4 md:gap-6 md:py-6 px-3 lg:px-8">
                    {children}

                    <div className="bg-muted/30 hidden lg:block flex-1 rounded-xl md:min-h-min " />
                  </div>
                </div>
              </div>
            </SidebarInset>
            <TooltipProvider>
              <Toaster richColors />
            </TooltipProvider>
          </SidebarProvider>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
