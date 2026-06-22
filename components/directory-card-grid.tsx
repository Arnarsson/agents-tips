"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"

import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

import { DirectoryProductCard } from "./directory-card"
import { DirectoryCardCarousel } from "./directory-card-carousel"

export interface SEOCardGridProps {
  sortedData: Product[]
  filteredFeaturedData: Product[] | null
  precomputedCategories?: Array<[string, Product[]]>
  children?: React.ReactNode
}

export const ResourceCardGrid: React.FC<SEOCardGridProps> = ({
  sortedData,
  precomputedCategories,
}) => {
  const searchParams = useSearchParams()

  // Use precomputed categories if available, otherwise fall back to client-side processing
  const filteredCategories =
    precomputedCategories ||
    (() => {
      // Fallback to client-side processing if no precomputed data
      const productsByCategory = sortedData.reduce((acc, product) => {
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
      }, {} as Record<string, Product[]>)

      return Object.entries(productsByCategory).filter(
        ([_, products]) => products.length > 4
      )
    })()

  return (
    <div className="px-4">
      <div className="">
        {!searchParams.get("category") &&
          !searchParams.get("label") &&
          !searchParams.get("tag") &&
          filteredCategories.map(([category, products], index) => (
            <div key={category} className="w-full">
              <DirectoryCardCarousel
                cardData={products}
                category={category}
                className={index === 0 ? "mt-6" : ""}
              />
            </div>
          ))}

        <div className={cn(" p-4 w-full")}>
          <Suspense fallback={null}>
            <div key="tailwind-grid" className="relative">
              <DirectoryCardMasonryGrid filteredData={sortedData} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

interface DirectoryCardMasonryGridProps {
  filteredData: Product[]
}

export const DirectoryCardMasonryGrid: React.FC<
  DirectoryCardMasonryGridProps
> = ({ filteredData }) => {
  return (
    <div className="w-full">
      {filteredData.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredData.map((data, index) => (
            <DirectoryProductCard key={`main-${index}-${data.id}`} data={data} order={index} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
