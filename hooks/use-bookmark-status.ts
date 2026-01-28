"use client"

import { useState, useEffect } from "react"

const BOOKMARKS_STORAGE_KEY = "agents-tips-bookmarks"

export function useBookmarkStatus(productId: string) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function checkBookmarkStatus() {
      try {
        const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
        if (stored) {
          const bookmarks = JSON.parse(stored) as string[]
          setIsBookmarked(bookmarks.includes(productId))
        }
      } catch (error) {
        console.error("Error reading bookmarks from localStorage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkBookmarkStatus()

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === BOOKMARKS_STORAGE_KEY) {
        checkBookmarkStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [productId])

  const toggleLocalBookmark = () => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
      let bookmarks: string[] = stored ? JSON.parse(stored) : []
      
      if (bookmarks.includes(productId)) {
        bookmarks = bookmarks.filter(id => id !== productId)
        setIsBookmarked(false)
      } else {
        bookmarks.push(productId)
        setIsBookmarked(true)
      }
      
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks))
      // Trigger event for same-window updates
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      console.error("Error toggling bookmark in localStorage:", error)
    }
  }

  return { isBookmarked, isLoading, setIsBookmarked, toggleLocalBookmark }
}
