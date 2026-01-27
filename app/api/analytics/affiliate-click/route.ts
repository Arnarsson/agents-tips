import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/db/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { productId, timestamp } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user if authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Get referrer from headers
    const referrer = request.headers.get("referer") || null

    // Insert affiliate click
    const { error } = await supabase.from("affiliate_clicks").insert({
      product_id: productId,
      user_id: user?.id || null,
      referrer,
      clicked_at: timestamp || new Date().toISOString(),
    })

    if (error) {
      console.error("Error tracking affiliate click:", error)
      return NextResponse.json(
        { error: "Failed to track click" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in affiliate click tracking:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
