"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Bookmark, Eye, Star, TrendingUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AgentCardV2Props {
  agent: {
    id: string
    codename: string
    punchline: string
    description?: string
    logo_src?: string
    product_website: string
    categories?: string
    tags?: string[]
    labels?: string[]
    view_count?: number
    featured?: boolean
  }
  variant?: "default" | "featured" | "compact"
  showStats?: boolean
}

export function AgentCardV2({ 
  agent, 
  variant = "default",
  showStats = true 
}: AgentCardV2Props) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isFeatured = variant === "featured" || agent.featured
  
  return (
    <div
      className={cn(
        "group relative rounded-2xl border transition-all duration-300",
        // Base styles
        "bg-[#1a1a1a] border-white/[0.06]",
        // Hover effects
        "hover:border-purple-500/50 hover:-translate-y-1",
        // Glow effect on hover
        "hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
        // Featured variant
        isFeatured && [
          "bg-gradient-to-br from-[#1a1a1a] to-purple-500/5",
          "border-purple-500/20",
        ],
        // Compact variant
        variant === "compact" && "p-4",
        variant !== "compact" && "p-6"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className={cn(
            "flex items-center justify-center rounded-xl bg-white/5 border border-white/10",
            variant === "compact" ? "w-10 h-10" : "w-12 h-12"
          )}>
            {agent.logo_src ? (
              <img 
                src={agent.logo_src} 
                alt={agent.codename}
                className="w-8 h-8 rounded-lg object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-white/60">
                {agent.codename.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* Name & Category */}
          <div>
            <h3 className={cn(
              "font-semibold text-white group-hover:text-purple-300 transition-colors",
              variant === "compact" ? "text-sm" : "text-base"
            )}>
              {agent.codename}
            </h3>
            {agent.categories && (
              <span className="text-xs text-zinc-500">
                {agent.categories}
              </span>
            )}
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsBookmarked(!isBookmarked)
          }}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-white/5",
            isBookmarked ? "text-purple-400" : "text-zinc-500 hover:text-white"
          )}
        >
          <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
        </button>
      </div>

      {/* Description */}
      <p className={cn(
        "text-zinc-400 mb-4 line-clamp-2",
        variant === "compact" ? "text-xs" : "text-sm"
      )}>
        {agent.punchline}
      </p>

      {/* Tags */}
      {agent.tags && agent.tags.length > 0 && variant !== "compact" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {agent.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-zinc-500">
              +{agent.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {(agent.view_count || 0).toLocaleString()}
            </span>
            {isFeatured && (
              <span className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-3.5 h-3.5" />
                +12%
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={agent.product_website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
            "bg-white/5 hover:bg-white/10 text-white",
            "border border-white/10 hover:border-white/20"
          )}
        >
          Visit
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Hover gradient overlay */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300",
          "bg-gradient-to-t from-purple-500/5 to-transparent",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}

// Bento grid wrapper
export function AgentBentoGrid({ 
  children,
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={cn(
      "grid gap-4",
      "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )}>
      {children}
    </div>
  )
}

// Featured hero card (larger, for homepage)
export function AgentHeroCard({ agent }: { agent: AgentCardV2Props["agent"] }) {
  return (
    <div className="relative col-span-2 row-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-purple-900/20 border border-purple-500/20 p-8">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Star className="w-3 h-3 fill-current" />
            Editor's Pick
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            {agent.logo_src ? (
              <img src={agent.logo_src} alt={agent.codename} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-2xl font-bold text-white">{agent.codename.charAt(0)}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{agent.codename}</h2>
            <p className="text-purple-300">{agent.categories}</p>
          </div>
        </div>

        <p className="text-lg text-zinc-300 mb-6 max-w-lg">
          {agent.punchline}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={agent.product_website}
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            Try {agent.codename}
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/products/${agent.codename.toLowerCase()}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-16 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
