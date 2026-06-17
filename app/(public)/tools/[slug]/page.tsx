import ProductIdPage, {
  generateMetadata,
  generateStaticParams,
} from "../../products/[slug]/page"

export { generateMetadata, generateStaticParams }
export const dynamic = "force-dynamic"

export default ProductIdPage
