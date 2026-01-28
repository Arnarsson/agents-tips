"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { DirectoryCardMasonryGrid } from "@/components/directory-card-grid"
import type { Product } from "@/lib/types"
import { getProducts } from "@/app/actions/product"
import { Skeleton } from "@/components/ui/skeleton"

const BOOKMARKS_STORAGE_KEY = "agents-tips-bookmarks"

export default function BookmarksPage() {
  const [bookmarkedProducts, setBookmarkedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
        if (!stored) {
          setLoading(false)
          return
        }

        const bookmarkIds = JSON.parse(stored) as string[]
        if (bookmarkIds.length === 0) {
          setLoading(false)
          return
        }

        // Fetch all products and filter for bookmarked ones
        // In a high-traffic machine, you might want a specialized RPC for this
        const allProducts = await getProducts()
        const filtered = allProducts.filter(p => bookmarkIds.includes(p.id))
        
        setBookmarkedProducts(filtered as unknown as Product[])
      } catch (error) {
        console.error("Error loading bookmarks:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBookmarks()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-muted-foreground mt-2">
          Your locally saved AI agents and tools
        </p>
      </div>

      {loading ? (
        <div className="columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 gap-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : bookmarkedProducts.length > 0 ? (
        <DirectoryCardMasonryGrid
          filteredData={bookmarkedProducts}
        />
      ) : (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="p-8 text-center">
            <CardDescription className="text-lg">
              You haven't bookmarked any products yet.
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-2">
              Start exploring the directory and click the bookmark icon to save tools here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}