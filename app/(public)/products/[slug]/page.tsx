import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  generateDescription,
  generateTitle,
  getSEOConfig,
  generateDynamicOGImage,
} from "@/lib/seo-config"
import { extractOGDescription } from "@/lib/og-image"
import { transformProductRowToStrict } from "@/lib/types"
import { StructuredData } from "@/components/seo/structured-data"
import {
  getCachedProductById,
  getCachedProducts,
} from "@/app/actions/cached_actions"

import { ProductDetails } from "./details"

// export const revalidate = 1800 // 30 minutes instead of 1 hour

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const products = await getCachedProducts()

    return products.map((product) => ({
      slug: product.id,
    }))
  } catch (error) {
    console.warn("Failed to generate static params:", error)
    return []
  }
}

// Generate metadata for the product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getCachedProductById(slug)
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

  const productUrl = `${config.site.url}/products/${slug}`
  
  // Generate dynamic OG image with product name and punchline
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
        }
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

const ProductIdPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  let data = await getCachedProductById(slug)

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
          { name: "Products", url: "/products" },
          ...(product.categories
            ? [
                {
                  name: product.categories,
                  url: `/categories/${encodeURIComponent(product.categories)}`,
                },
              ]
            : []),
          { name: product.codename, url: `/products/${product.id}` },
        ]}
      />

      <div className="container mx-auto px-4  ">
        {data ? <ProductDetails product={product} /> : null}
      </div>
    </>
  )
}

export default ProductIdPage
