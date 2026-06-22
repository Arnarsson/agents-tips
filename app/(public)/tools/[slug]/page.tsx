import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  generateDescription,
  generateTitle,
  getSEOConfig,
  generateDynamicOGImage,
} from "@/lib/seo-config"

// Force dynamic rendering to avoid cookies() issues in static generation
export const dynamic = "force-dynamic"
import { extractOGDescription } from "@/lib/og-image"
import { transformProductRowToStrict } from "@/lib/types"
import { StructuredData } from "@/components/seo/structured-data"
import {
  getCachedProductBySlug,
  getCachedProducts,
} from "@/app/actions/cached_actions"

import { ProductDetails } from "../../products/[slug]/details"

// Generate static params for all products at build time, keyed by human codename
export async function generateStaticParams() {
  try {
    const products = await getCachedProducts()

    return products.map((product) => ({
      slug: product.codename,
    }))
  } catch (error) {
    console.warn("Failed to generate static params:", error)
    return []
  }
}

// Generate metadata for the tool page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getCachedProductBySlug(slug)
  const config = getSEOConfig()

  if (!data || data.length === 0) {
    notFound()
  }

  const product = data[0]
  const title = generateTitle(
    config.contentTypes.product.titleTemplate,
    product.codename,
    product.punchline || "Amazing Product"
  )
  const description = generateDescription(
    config.contentTypes.product.descriptionTemplate,
    product.codename,
    product.punchline || "Amazing Product",
    product.description.length > 160
      ? `${product.description.substring(0, 157)}...`
      : product.description
  )

  const keywords = [
    ...config.contentTypes.product.keywords,
    product.codename,
    ...(product.tags || []),
    ...(product.labels || []),
    product.categories || "",
  ].filter(Boolean)

  // Canonical always points at the human codename URL so old /products/<uuid>
  // and /tools/<uuid> links dedupe to a single indexable page.
  const productUrl = `${config.site.url}/tools/${product.codename}`

  const ogImageUrl = generateDynamicOGImage(
    product.codename,
    extractOGDescription(product.punchline || product.description, 200)
  )

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 628,
          alt: product.codename,
        },
      ],
      url: productUrl,
    },
    twitter: {
      card: config.social.twitter.cardType,
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  }
}

const ToolPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const data = await getCachedProductBySlug(slug)

  if (!data || data.length === 0) {
    notFound()
  }

  const product = transformProductRowToStrict(data[0])

  return (
    <>
      <StructuredData type="product" data={product} />

      {/* Breadcrumb Schema */}
      <StructuredData
        type="breadcrumb"
        data={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          ...(product.categories
            ? [
                {
                  name: product.categories,
                  url: `/categories/${encodeURIComponent(product.categories)}`,
                },
              ]
            : []),
          { name: product.codename, url: `/tools/${product.codename}` },
        ]}
      />

      <div className="container mx-auto px-4  ">
        {data ? <ProductDetails product={product} /> : null}
      </div>
    </>
  )
}

export default ToolPage
