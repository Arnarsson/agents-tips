import "./globals.css"

import { ReactNode } from "react"
import { Fraunces, Geist_Mono, Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

import { generateDynamicOGImage, getSEOConfig } from "@/lib/seo-config"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppShell } from "@/components/app-shell"
import { SiteFooterGate } from "@/components/site-footer-gate"
import { ThemeProvider } from "@/components/theme-provider"

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
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
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${seoConfig.site.name} RSS Feed` },
      ],
    },
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
      className={`${inter.variable} ${geistMono.variable} ${fraunces.variable} font-sans`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppShell filtersAction={getCachedFilters()}>{children}</AppShell>
          <TooltipProvider>
            <Toaster richColors />
          </TooltipProvider>
          <SiteFooterGate />
          <Analytics />
          <Script
            src="https://www.sourcetrace.xyz/t.js"
            data-site="0ec61172-ff11-4d5a-a00b-41050b0b5dd4|st_b0bc9f0109ab46a3ba5ef5e7272be047"
            strategy="afterInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
