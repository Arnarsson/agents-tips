"use client"

import { useOptimistic, useTransition } from "react"
import type React from "react"
import Link from "next/link"
import { Tag } from "lucide-react"
import { motion } from "motion/react"

import type { Product } from "@/lib/types"
import { cn, formatToolName } from "@/lib/utils"
import { buildAffiliateUrl, trackAffiliateClick } from "@/lib/affiliate"
import { useBookmarkStatus } from "@/hooks/use-bookmark-status"
import useResourceCounter from "@/hooks/use-resource-click-counter"
import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardFooter,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"
import { BookmarkButton } from "@/components/bookmark-button"

export const getBasePath = (url: string) => {
  return new URL(url).hostname.replace("www.", "").split(".")[0]
}

export const getLastPathSegment = (url: string, maxLength: number): string => {
  try {
    const pathname = new URL(url).pathname
    const segments = pathname.split("/").filter(Boolean)
    const lastSegment = segments.pop() || ""

    if (lastSegment.length > maxLength) {
      return `/${lastSegment.substring(0, maxLength)}`
    }

    return lastSegment ? `/${lastSegment}` : ""
  } catch (error) {
    console.error("Invalid URL:", error)
    return ""
  }
}

export const DirectoryProductCard: React.FC<{
  trim?: boolean
  data: Product
  order: any
}> = ({ data, order }) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticResource, addOptimisticUpdate] = useOptimistic<
    Product,
    Partial<Product>
  >(data, (currentResource, newProperties) => {
    return { ...currentResource, ...newProperties }
  })
  const { incrementClickCount } = useResourceCounter()

  const handleClick = () => {
    startTransition(() => {
      const newClickCount = (optimisticResource.view_count || 0) + 1

      addOptimisticUpdate({ view_count: newClickCount })

      incrementClickCount(data.id).catch((error) => {
        console.error("Failed to increment click count:", error)
      })
    })
  }

  return (
    <motion.div
      key={`resource-card-${data.id}-${order}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative h-full w-full"
    >
      <div className="relative h-full w-full">
        <Link
          href={`/tools/${data.id}`}
          key={`/tools/${data.id}`}
          onClick={handleClick}
        >
          <DirectoryProductCardContent
            data={data}
            view_count={optimisticResource.view_count}
            showBookmarkButton={false}
          />
        </Link>

        {/* Bookmark button positioned outside the Link to avoid nesting */}
        <div className="absolute top-3 right-3 z-10">
          <BookmarkButton
            productId={data.id}
            size="icon"
            className="h-8 w-8 rounded-tr-[12px] rounded-l-lg rounded-br-lg"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function DirectoryProductCardContent({
  data,
  view_count,
  trim = false,
  showBookmarkButton = true,
}: {
  data: Product
  view_count: number | null
  trim?: boolean
  showBookmarkButton?: boolean
}) {
  const { isBookmarked, isLoading } = useBookmarkStatus(data.id)
  const { incrementClickCount } = useResourceCounter()

  const handleCardClick = () => {
    // Track clicks when the card itself is clicked
    incrementClickCount(data.id).catch((error) => {
      console.error("Failed to increment click count:", error)
    })
  }

  return (
    <MinimalCard className="relative flex h-full w-full flex-col" onClick={handleCardClick}>
      {data.logo_src ? (
        <MinimalCardImage alt={formatToolName(data.codename)} src={data.logo_src} />
      ) : (
        <div className="relative mb-4 grid h-[132px] w-full place-items-center overflow-hidden rounded-[16px] bg-gradient-to-br from-neutral-100 to-neutral-200 ring-1 ring-black/10 dark:from-neutral-800 dark:to-neutral-900 dark:ring-white/10">
          <span className="text-3xl font-bold tracking-tight text-neutral-400 dark:text-neutral-500">
            {formatToolName(data.codename).slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      <MinimalCardTitle className="font-semibold mb-3">
        {formatToolName(data.codename)}
      </MinimalCardTitle>

      <MinimalCardDescription className="line-clamp-3 text-sm">
        {trim ? `${data.description.slice(0, 82)}...` : data.description}
      </MinimalCardDescription>

      <MinimalCardContent />

      {showBookmarkButton && (
        <div
          className={cn(
            "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10",
            isBookmarked && "opacity-100"
          )}
        >
          {!isLoading && (
            <BookmarkButton
              productId={data.id}
              initialBookmarked={isBookmarked}
              size="icon"
              // variant="secondary"
              className="h-8 w-8 rounded-tr-[12px] rounded-l-lg rounded-br-lg"
            />
          )}
        </div>
      )}

      <MinimalCardFooter>
        <div
          className={cn(
            "p-1 py-1.5 px-1.5 rounded-md text-neutral-500 flex items-center gap-1  absolute bottom-2 left-2 rounded-br-[16px]",
            (view_count || 0) > 1 ? "  block" : "hidden"
          )}
        >
          <p className="flex items-center gap-1 tracking-tight text-neutral pr-1 text-xs">
            {view_count || data.view_count || 0}
          </p>
        </div>
        {data.labels && data.labels.length > 0 && (
          <div className="p-1 py-1.5 px-1.5 rounded-md text-neutral-500 flex items-center gap-1  absolute bottom-2 right-2 rounded-br-[16px]">
            <Tag className="h-4 w-4 ml-[1px]" />
            <p className="flex items-center gap-1 tracking-tight text-neutral pr-1 text-xs">
              {data.labels[0]}
            </p>
          </div>
        )}
      </MinimalCardFooter>
    </MinimalCard>
  )
}
