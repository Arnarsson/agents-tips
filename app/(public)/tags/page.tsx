import { Metadata } from "next"
import Link from "next/link"

import { getSEOConfig, generateDynamicOGImage } from "@/lib/seo-config"
import { fromSnakeCase } from "@/lib/tag-label-utils"
import { Badge } from "@/components/ui/badge"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { getCachedFilters } from "@/app/actions/cached_actions"

// Force dynamic rendering to avoid cookies() issues in static generation
export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const config = getSEOConfig()
  const title = "Browse All Tags"
  const description =
    "Browse every tag in the agents.tips directory and discover AI agents, coding assistants, and tools by topic."

  const tagsUrl = `${config.site.url}/tags`
  const ogImageUrl = generateDynamicOGImage(title, description)

  return {
    title,
    description,
    keywords: ["tags", "tools", "products", "resources", "developer tools"],
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 628, alt: title }],
      url: tagsUrl,
    },
    twitter: {
      card: config.social.twitter.cardType,
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: tagsUrl,
    },
  }
}

const TagsIndexPage = async () => {
  const filters = await getCachedFilters()
  const tags = filters.tags
    .filter((t): t is string => t !== null)
    .sort((a, b) => fromSnakeCase(a).localeCompare(fromSnakeCase(b)))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <GradientHeading size="xl">Browse All Tags</GradientHeading>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          {tags.length} tag{tags.length !== 1 ? "s" : ""} across the directory
        </p>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <Badge variant="outline" key={tag}>
              {/* Link uses the raw stored value so it matches the exact
                  .contains() lookup on /tags/[tag]. */}
              <Link href={`/tags/${encodeURIComponent(tag)}`}>
                {fromSnakeCase(tag)}
              </Link>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No tags available yet.
        </p>
      )}
    </div>
  )
}

export default TagsIndexPage
