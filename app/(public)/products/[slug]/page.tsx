import { permanentRedirect } from "next/navigation"

// /products/* is deprecated in favour of /tools/* (single canonical path).
// 301-redirect every old link — including legacy /products/<uuid> URLs and
// bookmarks — to the codename-resolving /tools/<slug> page.
export const dynamic = "force-dynamic"

const ProductIdRedirect = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  permanentRedirect(`/tools/${slug}`)
}

export default ProductIdRedirect
