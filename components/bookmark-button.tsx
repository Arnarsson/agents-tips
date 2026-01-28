"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookmarkStatus } from "@/hooks/use-bookmark-status"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface BookmarkButtonProps {
  productId: string
  initialBookmarked?: boolean // Keep for compatibility but use hook
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function BookmarkButton({ 
  productId, 
  size = "default",
  variant = "outline",
  className 
}: BookmarkButtonProps) {
  const { isBookmarked, isLoading, toggleLocalBookmark } = useBookmarkStatus(productId)

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toggleLocalBookmark()
    toast.success(
      !isBookmarked ? "Added to bookmarks (locally)" : "Removed from bookmarks"
    )
  }

  const Icon = isBookmarked ? BookmarkCheck : Bookmark

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={cn(
        "transition-all duration-200",
        isBookmarked && "text-primary border-primary/50 bg-primary/5",
        className
      )}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Icon className={cn(
        "h-4 w-4",
        size === "sm" && "h-3 w-3",
        size === "lg" && "h-5 w-5",
      )} />
      {size !== "icon" && (
        <span className="ml-2">
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </span>
      )}
    </Button>
  )
}
