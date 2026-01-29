import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/db/supabase/server"
import { getSEOConfig } from "@/lib/seo-config"

export const dynamic = "force-dynamic" // RSS feed must be dynamic to fetch latest articles

type Article = {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  excerpt?: string | null
  content: string
  published_at: string
  updated_at?: string | null
  content_type: string
  tags?: string[] | null
  cover_image?: string | null
  og_image?: string | null
}

async function fetchArticles(): Promise<Article[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(50) // Latest 50 articles

    if (error) {
      console.error("Error fetching articles for RSS feed:", error)
      return []
    }

    return (data as Article[]) || []
  } catch (error) {
    console.error("Error in fetchArticles:", error)
    return []
  }
}

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(request: NextRequest) {
  try {
    const config = getSEOConfig()
    const baseUrl = config.site.url

    // Get all published articles
    const articles = await fetchArticles()

    // Generate RSS feed XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.site.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(config.site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>${escapeXml(config.site.name)}</title>
      <link>${baseUrl}</link>
    </image>
    ${articles
      .map(
        (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      ${article.updated_at ? `<dc:modified>${new Date(article.updated_at).toUTCString()}</dc:modified>` : ''}
      <description>${escapeXml(article.excerpt || article.subtitle || '')}</description>
      ${article.content ? `<content:encoded><![CDATA[${article.content}]]></content:encoded>` : ''}
      ${article.content_type ? `<category>${escapeXml(article.content_type)}</category>` : ''}
      ${article.tags ? article.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ') : ''}
      ${article.cover_image || article.og_image ? `<enclosure url="${escapeXml(article.cover_image || article.og_image || '')}" type="image/jpeg"/>` : ''}
    </item>`
      )
      .join("")}
  </channel>
</rss>`

    return new NextResponse(rss, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400", // Cache for 1 hour, CDN for 24 hours
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new NextResponse("Error generating RSS feed", { status: 500 })
  }
}
