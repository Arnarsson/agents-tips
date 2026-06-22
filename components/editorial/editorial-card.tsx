import Link from "next/link"

import type { Product } from "@/lib/types"
import { cn, formatToolName, toolScore } from "@/lib/utils"
import { fromSnakeCase } from "@/lib/tag-label-utils"

import { VisitLink } from "./visit-link"

function LogoTile({ product, name }: { product: Product; name: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f4efe6] ring-1 ring-black/5 dark:bg-white">
      {product.logo_src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.logo_src}
          alt={name}
          loading="lazy"
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="text-lg font-semibold text-muted-foreground">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  )
}

export function EditorialCard({
  product,
  featured = false,
}: {
  product: Product
  featured?: boolean
}) {
  const name = formatToolName(product.codename)
  const category =
    product.categories?.split(",")[0]?.trim() ||
    product.labels?.[0] ||
    "Tool"
  const score = toolScore(product)
  const blurb = product.punchline || product.description || ""

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg",
        featured ? "border-2 border-primary/40" : "border-border"
      )}
    >
      {featured && (
        <span className="absolute right-4 top-4 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          Featured
        </span>
      )}

      <Link
        href={`/tools/${product.id}`}
        className="flex flex-1 flex-col"
        aria-label={name}
      >
        <div className="mb-5 flex items-center justify-between">
          <LogoTile product={product} name={name} />
          {!featured && (
            <span className="font-serif text-2xl text-muted-foreground">
              {score}
            </span>
          )}
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          {fromSnakeCase(category)}
        </p>
        <h3 className="mt-1 font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {blurb}
        </p>
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {(product.view_count || 0).toLocaleString()} views
        </span>
        <VisitLink product={product} label="Visit" />
      </div>
    </div>
  )
}
