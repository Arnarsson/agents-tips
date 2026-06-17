"use client"

import { useCallback } from "react"
import { createClient, hasSupabaseBrowserEnv } from "@/db/supabase/client"

const useResourceCounter = () => {
  const incrementViewCount = useCallback(async (id: string) => {
    if (!hasSupabaseBrowserEnv) {
      return
    }

    const supabase = createClient()
    const { data, error } = await supabase.rpc("increment_product_view_count", {
      product_id: id,
    })

    if (error) {
      console.error("Error incrementing view count:", error)
    } else {
      console.log("View count incremented:", data)
    }
  }, [])

  const incrementClickCount = useCallback(async (id: string) => {
    if (!hasSupabaseBrowserEnv) {
      return
    }

    const supabase = createClient()
    // Since the database only supports view_count, we'll use the same function
    // This tracks when users click on products as a form of engagement
    const { data, error } = await supabase.rpc("increment_product_view_count", {
      product_id: id,
    })

    if (error) {
      console.error("Error incrementing click count:", error)
    } else {
      console.log("Click count incremented:", data)
    }
  }, [])

  return {
    incrementViewCount,
    incrementClickCount,
  }
}

export default useResourceCounter
