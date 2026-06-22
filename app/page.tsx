import type { Metadata } from "next"

import { getSEOConfig } from "@/lib/seo-config"
import { Product } from "@/lib/types"
import { EditorialHome } from "@/components/editorial/editorial-home"
import { StructuredData } from "@/components/seo/structured-data"

import {
  getCachedPrecomputedCategories,
  getCachedProducts,
} from "./actions/cached_actions"

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const config = getSEOConfig()

  return {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    keywords: config.seo.keywords,
    openGraph: {
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      type: "website",
      url: config.site.url,
      images: [config.site.ogImage],
      siteName: config.site.name,
    },
    twitter: {
      card: config.social.twitter.cardType,
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      images: [config.site.ogImage],
    },
    alternates: {
      canonical: config.site.url,
    },
  }
}

// Select the resources you want to feature.. AD SPACE?
const FEATURED_IDS = [
  // "3b741434-1bdb-4903-91e9-a7fa154a8fdf",
  "",
] // Replace 'id1', 'id2', '3' with actual IDs you want to feature

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const searchParam = await searchParams

  // Try to get data, but handle missing Supabase gracefully
  let data: Product[] = []
  try {
    data = await getCachedProducts(searchParam.search)
  } catch (error) {
    console.warn("Supabase not configured or connection failed:", error)
    // Continue with empty data - this will show the empty state
  }

  const filteredFeaturedData = data.filter((d: Product) =>
    FEATURED_IDS.includes(d.id)
  )

  // Precompute categories on the server side for better performance
  let precomputedCategories: Array<[string, Product[]]> = []
  try {
    precomputedCategories = await getCachedPrecomputedCategories(data)
  } catch (error) {
    console.warn("Failed to precompute categories:", error)
  }

  void filteredFeaturedData

  return (
    <>
      <StructuredData
        type="website"
        data={{
          title: "Products Directory",
          description: "Browse our collection of amazing products and tools",
          url: getSEOConfig().site.url,
          itemCount: data.length,
          items: data.slice(0, 10), // Show first 10 items in structured data
        }}
      />
      <EditorialHome
        products={data}
        categories={precomputedCategories}
        searchQuery={searchParam.search}
      />
    </>
  )
}

export default Page
