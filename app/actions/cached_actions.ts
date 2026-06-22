"use server"

import "server-only"

import { cache } from "react"
import type { Database } from "@/db/supabase/types"
import { createClient } from "@/db/supabase/server"
import { hasEnvVars } from "@/lib/utils"

import { getProductsWithClient } from "./product"

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"]
type LabelRow = Database["public"]["Tables"]["labels"]["Row"]
type TagRow = Database["public"]["Tables"]["tags"]["Row"]

type CategoryNameOnly = Pick<CategoryRow, "name">
type LabelNameOnly = Pick<LabelRow, "name">
type TagNameOnly = Pick<TagRow, "name">

type ProductRow = Database["public"]["Tables"]["products"]["Row"]

type FilterData = {
  categories: (string | null)[]
  labels: string[]
  tags: string[]
  categoryCounts?: Record<string, number>
  labelCounts?: Record<string, number>
  tagCounts?: Record<string, number>
}

async function getFilters(): Promise<FilterData> {
  if (!hasEnvVars) {
    return { categories: [], labels: [], tags: [] }
  }

  const db = await createClient()

  try {
    const { data: categoriesData, error: categoriesError } = await db
      .from("categories")
      .select("name")

    const { data: labelsData, error: labelsError } = await db
      .from("labels")
      .select("name")

    const { data: tagsData, error: tagsError } = await db
      .from("tags")
      .select("name")

    if (categoriesError || labelsError || tagsError) {
      console.error(
        "Error fetching filters:",
        categoriesError,
        labelsError,
        tagsError
      )
      return { categories: [], labels: [], tags: [] }
    }

    const unique = (array: string[]) => [...new Set(array)]

    const categories = categoriesData
      ? unique(
          (categoriesData as CategoryNameOnly[])
            .map((item: CategoryNameOnly) => item.name)
            .filter(Boolean)
        )
      : []

    const labels = labelsData
      ? unique(
          (labelsData as LabelNameOnly[])
            .map((item: LabelNameOnly) => item.name)
            .filter(Boolean)
        )
      : []

    const tags = tagsData
      ? unique(
          (tagsData as TagNameOnly[])
            .map((item: TagNameOnly) => item.name)
            .filter(Boolean)
        )
      : []

    return { categories, labels, tags }
  } catch (error) {
    console.error("Error in getFilters:", error)
    return { categories: [], labels: [], tags: [] }
  }
}

export async function getCachedFilters(): Promise<FilterData> {
  if (!hasEnvVars) {
    return { categories: [], labels: [], tags: [] }
  }

  // Get counts for each filter type (derived straight from product data)
  const categoryCounts: Record<string, number> = {}
  const labelCounts: Record<string, number> = {}
  const tagCounts: Record<string, number> = {}
  
  try {
    const db = await createClient()
    
    // Get all approved products to count categories
    const { data: products } = await db
      .from("products")
      .select("categories, labels, tags")
      .eq("approved", true)
    
    if (products) {
      products.forEach((product) => {
        // Count categories
        if (product.categories) {
          const cats = product.categories.split(",").map((c: string) => c.trim())
          cats.forEach((cat: string) => {
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
          })
        }
        // Count labels
        if (product.labels && Array.isArray(product.labels)) {
          product.labels.forEach((label: string) => {
            labelCounts[label] = (labelCounts[label] || 0) + 1
          })
        }
        // Count tags
        if (product.tags && Array.isArray(product.tags)) {
          product.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        }
      })
    }
  } catch (error) {
    console.error("Error fetching filter counts:", error)
  }
  
  // Derive the visible filter lists from REAL product data (the count maps),
  // not the legacy `categories`/`labels`/`tags` reference tables. Those tables
  // still hold old display-case names ("Coding Assistants") that no product
  // uses, which duplicated the snake-case values in the sidebar and produced
  // dead 404 links. Showing only taxonomies that actually have products
  // de-clutters the sidebar and guarantees every link resolves.
  const byCount = (counts: Record<string, number>) =>
    Object.keys(counts)
      .filter((name) => counts[name] > 0)
      .sort((a, b) => counts[b] - counts[a])

  return {
    categories: byCount(categoryCounts),
    labels: byCount(labelCounts),
    tags: byCount(tagCounts),
    categoryCounts,
    labelCounts,
    tagCounts,
  }
}

// Add cached product fetching for better performance
export async function getCachedProducts(
  searchTerm?: string,
  category?: string,
  label?: string,
  tag?: string
): Promise<ProductRow[]> {
  if (!hasEnvVars) {
    return []
  }

  const db = await createClient()
  return await getProductsWithClient(db, searchTerm, category, label, tag)
}

// Add server-side precomputation for better performance
async function getPrecomputedCategories(products: ProductRow[]) {
  // Process categories on the server side
  const productsByCategory = products.reduce((acc, product) => {
    const categories = product.categories
      ? product.categories.split(",").map((cat) => cat.trim())
      : ["Uncategorized"]

    categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
    })
    return acc
  }, {} as Record<string, ProductRow[]>)

  // Filter categories with sufficient products (more than 4)
  const filteredCategories = Object.entries(productsByCategory)
    .filter(([_, products]) => products.length > 4)
    .slice(0, 10) // Limit to top 10 categories for performance

  return filteredCategories
}

// Add cached version of precomputed categories
export async function getCachedPrecomputedCategories(products: ProductRow[]) {
  return await getPrecomputedCategories(products)
}

// Get top 10 most viewed products (popular)
export async function getCachedPopularProducts(): Promise<ProductRow[]> {
  if (!hasEnvVars) {
    return []
  }

  try {
    const db = await createClient()

    const { data: popularProducts, error } = await db
      .from("products")
      .select("*")
      .eq("approved", true)
      .not("view_count", "is", null)
      .order("view_count", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching popular products:", error)
      return []
    }

    return (popularProducts as ProductRow[]) || []
  } catch (error) {
    console.error("Error in getCachedPopularProducts:", error)
    return []
  }
}

// Get top 10 featured products
export async function getCachedFeaturedProducts(): Promise<ProductRow[]> {
  if (!hasEnvVars) {
    return []
  }

  try {
    const db = await createClient()

    // featured_until IS NULL = editorially featured (never expires);
    // otherwise the paid placement must still be in its window.
    const { data: featuredProducts, error } = await db
      .from("products")
      .select("*")
      .eq("approved", true)
      .eq("featured", true)
      .or(`featured_until.is.null,featured_until.gt.${new Date().toISOString()}`)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching featured products:", error)
      return []
    }

    return (featuredProducts as ProductRow[]) || []
  } catch (error) {
    console.error("Error in getCachedFeaturedProducts:", error)
    return []
  }
}

// Get top 10 most bookmarked products
export async function getCachedMostBookmarkedProducts(): Promise<ProductRow[]> {
  // Content Machine: Bookmarks are now local-only, so we return empty for the 'most bookmarked' global carousel.
  // In the future, this could be replaced with 'trending' or 'upvoted'.
  return []
}

const getProductById = cache(async (id?: string): Promise<ProductRow[]> => {
  if (!id) return []
  if (!hasEnvVars) return []

  try {
    const db = await createClient()

    // Single query with join to get product data and view count together
    const { data, error } = await db
      .from("products")
      .select(
        `
        *,
        product_views!product_views_product_id_fkey (
          id
        )
      `
      )
      .eq("id", id)
      .eq("approved", true)
      .single()

    if (error) {
      console.warn("Error fetching product by ID:", error)
      return []
    }

    // Calculate view count from the joined data
    const viewCount =
      (data as any)?.product_views?.length || (data as any).view_count || 0

    const finalProduct: ProductRow = {
      ...(data as any),
      created_at: (data as any).created_at ?? new Date().toISOString(),
      view_count: viewCount,
    }

    return [finalProduct]
  } catch (error) {
    console.warn("Error in getProductById:", error)
    return []
  }
})

export async function getCachedProductById(id?: string): Promise<ProductRow[]> {
  return await getProductById(id)
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Resolve a product by its human codename slug, falling back to UUID id for
// backwards-compatibility with old /products/<uuid> links and bookmarks.
const getProductBySlug = cache(async (slug?: string): Promise<ProductRow[]> => {
  if (!slug) return []
  if (!hasEnvVars) return []

  try {
    const db = await createClient()

    const column = UUID_RE.test(slug) ? "id" : "codename"
    const { data, error } = await db
      .from("products")
      .select(
        `
        *,
        product_views!product_views_product_id_fkey (
          id
        )
      `
      )
      .eq(column, slug)
      .eq("approved", true)
      .single()

    if (error) {
      console.warn("Error fetching product by slug:", error)
      return []
    }

    const viewCount =
      (data as any)?.product_views?.length || (data as any).view_count || 0

    const finalProduct: ProductRow = {
      ...(data as any),
      created_at: (data as any).created_at ?? new Date().toISOString(),
      view_count: viewCount,
    }

    return [finalProduct]
  } catch (error) {
    console.warn("Error in getProductBySlug:", error)
    return []
  }
})

export async function getCachedProductBySlug(
  slug?: string
): Promise<ProductRow[]> {
  return await getProductBySlug(slug)
}
