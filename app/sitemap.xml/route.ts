import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/db/supabase/server"

import {
  starterBriefs,
  starterComparisons,
  starterWorkflows,
} from "@/lib/content-machine/public-content"
import { getSEOConfig } from "@/lib/seo-config"
import { hasEnvVars } from "@/lib/utils"
import {
  getCachedFilters,
  getCachedProducts,
} from "@/app/actions/cached_actions"

export const dynamic = "force-dynamic" // Sitemap must be dynamic to fetch latest data

type ProductRow = {
  id: string
  codename: string
  description: string
  logo_src?: string | null
  created_at?: string | null
  tags?: string[] | null
}

type FilterData = {
  categories: (string | null)[]
  labels: string[]
  tags: string[]
}

type Article = {
  id: string
  slug: string
  title: string
  published_at: string
  updated_at?: string | null
}

async function fetchProducts(): Promise<ProductRow[]> {
  try {
    return await getCachedProducts()
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
    return []
  }
}

async function fetchFilters(): Promise<FilterData> {
  try {
    return await getCachedFilters()
  } catch (error) {
    console.error("Error fetching filters for sitemap:", error)
    return { categories: [], labels: [], tags: [] }
  }
}

async function fetchArticles(): Promise<Article[]> {
  if (!hasEnvVars) {
    return []
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, published_at, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching articles for sitemap:", error)
      return []
    }

    return (data as Article[]) || []
  } catch (error) {
    console.error("Error in fetchArticles:", error)
    return []
  }
}

function escapeXml(value: string | null | undefined): string {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET(_request: NextRequest) {
  try {
    const config = getSEOConfig()
    const baseUrl = config.site.url

    // Get all products from cached actions
    const products = await fetchProducts()

    // Get all filters for categories, tags, and labels from cached actions
    const filters = await fetchFilters()

    // Get all published articles
    const articles = await fetchArticles()

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.home}</changefreq>
    <priority>${config.sitemap.priority.home}</priority>
  </url>
  
  <!-- Tools page -->
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.products}</changefreq>
    <priority>${config.sitemap.priority.products}</priority>
  </url>

  <!-- Watch page -->
  <url>
    <loc>${baseUrl}/watch</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Briefs page -->
  <url>
    <loc>${baseUrl}/briefs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Workflows page -->
  <url>
    <loc>${baseUrl}/workflows</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>

  <!-- Compare page -->
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Denmark page -->
  <url>
    <loc>${baseUrl}/dk</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>

  <!-- Starter briefs -->
  ${starterBriefs
    .map(
      (brief) => `
  <url>
    <loc>${baseUrl}/briefs/${brief.slug}</loc>
    <lastmod>${
      brief.published_at
        ? new Date(brief.published_at).toISOString()
        : new Date().toISOString()
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}

  <!-- Starter workflows -->
  ${starterWorkflows
    .map(
      (workflow) => `
  <url>
    <loc>${baseUrl}/workflows/${workflow.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}

  <!-- Starter comparisons -->
  ${starterComparisons
    .map(
      (comparison) => `
  <url>
    <loc>${baseUrl}/compare/${comparison.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`
    )
    .join("")}
  
  <!-- Submit page -->
  <url>
    <loc>${baseUrl}/submit-new</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.static}</changefreq>
    <priority>${config.sitemap.priority.static}</priority>
  </url>
  
  <!-- Individual tool pages -->
  ${products
    .map(
      (product) => `
  <url>
    <loc>${baseUrl}/tools/${product.codename}</loc>
    <lastmod>${
      product.created_at
        ? new Date(product.created_at).toISOString()
        : new Date().toISOString()
    }</lastmod>
    <changefreq>${config.sitemap.changefreq.products}</changefreq>
    <priority>${config.sitemap.priority.products}</priority>
    <image:image>
      <image:loc>${
        product.logo_src || `${baseUrl}${config.site.ogImage}`
      }</image:loc>
      <image:title>${escapeXml(product.codename)}</image:title>
      <image:caption>${escapeXml(product.description)}</image:caption>
    </image:image>
  </url>`
    )
    .join("")}
  
  <!-- Category landing pages -->
  ${filters.categories
    .filter((c): c is string => c !== null)
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/categories/${encodeURIComponent(category)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.categories}</changefreq>
    <priority>${config.sitemap.priority.categories}</priority>
  </url>`
    )
    .join("")}
  
  <!-- Tag pages -->
  ${filters.tags
    .filter((t): t is string => t !== null)
    .map(
      (tag) => `
  <url>
    <loc>${baseUrl}/tags/${encodeURIComponent(tag)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.tags}</changefreq>
    <priority>${config.sitemap.priority.tags}</priority>
  </url>`
    )
    .join("")}
  
  <!-- Label pages -->
  ${filters.labels
    .filter((l): l is string => l !== null)
    .map(
      (label) => `
  <url>
    <loc>${baseUrl}/labels/${encodeURIComponent(label)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${config.sitemap.changefreq.labels}</changefreq>
    <priority>${config.sitemap.priority.labels}</priority>
  </url>`
    )
    .join("")}
  
  <!-- Blog index page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog articles -->
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${
      article.updated_at
        ? new Date(article.updated_at).toISOString()
        : new Date(article.published_at).toISOString()
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  
</urlset>`

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400", // Cache for 1 hour, CDN for 24 hours
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
