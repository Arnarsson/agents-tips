"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Pen, 
  Palette, 
  Brain,
  Plus,
  Bookmark,
  TrendingUp,
  Command
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  action: () => void
  category: "agents" | "categories" | "actions"
}

const defaultItems: CommandItem[] = [
  {
    id: "browse-all",
    title: "Browse all agents",
    subtitle: "View the full directory",
    icon: <Sparkles className="w-4 h-4" />,
    action: () => {},
    category: "actions"
  },
  {
    id: "submit",
    title: "Submit an agent",
    subtitle: "Add a new AI agent to the directory",
    icon: <Plus className="w-4 h-4" />,
    action: () => {},
    category: "actions"
  },
  {
    id: "bookmarks",
    title: "My bookmarks",
    subtitle: "View your saved agents",
    icon: <Bookmark className="w-4 h-4" />,
    action: () => {},
    category: "actions"
  },
  {
    id: "trending",
    title: "Trending this week",
    subtitle: "Most viewed agents",
    icon: <TrendingUp className="w-4 h-4" />,
    action: () => {},
    category: "actions"
  },
  {
    id: "cat-coding",
    title: "Coding Assistants",
    subtitle: "12 agents",
    icon: <Code className="w-4 h-4" />,
    action: () => {},
    category: "categories"
  },
  {
    id: "cat-writing",
    title: "Writing Assistants",
    subtitle: "8 agents",
    icon: <Pen className="w-4 h-4" />,
    action: () => {},
    category: "categories"
  },
  {
    id: "cat-creative",
    title: "Creative Tools",
    subtitle: "5 agents",
    icon: <Palette className="w-4 h-4" />,
    action: () => {},
    category: "categories"
  },
  {
    id: "cat-research",
    title: "Research & Analysis",
    subtitle: "6 agents",
    icon: <Brain className="w-4 h-4" />,
    action: () => {},
    category: "categories"
  },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filter items based on query
  const filteredItems = defaultItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle?.toLowerCase().includes(query.toLowerCase())
  )

  // Group by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, CommandItem[]>)

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault()
      filteredItems[selectedIndex].action()
      setIsOpen(false)
    }
  }, [filteredItems, selectedIndex])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div 
          className={cn(
            "w-full max-w-xl mx-4",
            "bg-[#1a1a1a] border border-white/10 rounded-2xl",
            "shadow-2xl shadow-purple-500/10",
            "overflow-hidden"
          )}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Search className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search agents, categories, or actions..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              onKeyDown={handleKeyDown}
              className={cn(
                "flex-1 bg-transparent text-white placeholder-zinc-500",
                "outline-none text-base"
              )}
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs text-zinc-500 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="px-2">
                <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  {category === "agents" && "Agents"}
                  {category === "categories" && "Categories"}
                  {category === "actions" && "Quick Actions"}
                </div>
                {items.map((item, index) => {
                  const globalIndex = filteredItems.indexOf(item)
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action()
                        setIsOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                        "transition-colors text-left",
                        globalIndex === selectedIndex
                          ? "bg-purple-500/20 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className={cn(
                        "p-2 rounded-lg",
                        globalIndex === selectedIndex
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-white/5 text-zinc-500"
                      )}>
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-xs text-zinc-500 truncate">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      <ArrowRight className={cn(
                        "w-4 h-4 transition-opacity",
                        globalIndex === selectedIndex ? "opacity-100" : "opacity-0"
                      )} />
                    </button>
                  )
                })}
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="px-4 py-8 text-center text-zinc-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3" />K to open
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

// Trigger button to show in navbar
export function CommandPaletteTrigger() {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0)
  }, [])

  return (
    <button
      onClick={() => {
        // Dispatch keyboard event to open
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true })
        )
      }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg",
        "bg-white/5 border border-white/10",
        "text-sm text-zinc-400 hover:text-white hover:bg-white/10",
        "transition-colors"
      )}
    >
      <Search className="w-4 h-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white/5 border border-white/10 rounded">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  )
}
