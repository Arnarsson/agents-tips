import React from "react"

import type { Product } from "@/lib/types"

import { EditorialCard } from "./editorial/editorial-card"

export interface SEOCardGridProps {
  sortedData: Product[]
  filteredFeaturedData?: Product[] | null
  precomputedCategories?: Array<[string, Product[]]>
  children?: React.ReactNode
}

export const ResourceCardGrid: React.FC<SEOCardGridProps> = ({
  sortedData,
}) => {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <DirectoryCardMasonryGrid filteredData={sortedData} />
    </div>
  )
}

interface DirectoryCardMasonryGridProps {
  filteredData: Product[]
}

export const DirectoryCardMasonryGrid: React.FC<
  DirectoryCardMasonryGridProps
> = ({ filteredData }) => {
  if (!filteredData || filteredData.length === 0) return null
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filteredData.map((data) => (
        <EditorialCard key={data.id} product={data} />
      ))}
    </div>
  )
}
