"use client"

import Script from "next/script"

interface StructuredDataProps {
  type: "organization" | "website" | "product" | "breadcrumb" | "article"
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, any>

  switch (type) {
    case "article":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description || data.excerpt,
        image: data.image || data.cover_image,
        datePublished: data.published_at,
        dateModified: data.updated_at || data.published_at,
        author: {
          "@type": "Person",
          name: data.author_name || "agents.tips",
        },
        publisher: {
          "@type": "Organization",
          name: "agents.tips",
          logo: {
            "@type": "ImageObject",
            url: "https://agents.tips/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
      }
      break
    default:
      structuredData = data
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
