"use client"

import Script from "next/script"

interface StructuredDataProps {
  type: "organization" | "website" | "product" | "breadcrumb"
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
