"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  ariaLabels,
  ariaPatterns,
  generateAriaLabel,
  screenReader,
} from "@/lib/accessibility-utils"
import { cn } from "@/lib/utils"
import { InputButton } from "@/components/ui/input"

const suggestions = [
  { label: "Cursor", detail: "repo-native coding" },
  { label: "Claude Code", detail: "terminal agent" },
  { label: "MCP", detail: "context protocol" },
  { label: "local models", detail: "private control" },
  { label: "automation", detail: "workflow agents" },
  { label: "research", detail: "source review" },
  { label: "coding agents", detail: "build tools" },
  { label: "n8n", detail: "agent workflows" },
]

export type DirectorySearchSuggestion = {
  label: string
  detail: string
}

export function DirectorySearch({
  suggestions: providedSuggestions = [],
}: {
  suggestions?: DirectorySearchSuggestion[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(() =>
    Boolean(searchParams.get("search"))
  )
  const [activeIndex, setActiveIndex] = useState(0)

  // Initialize search value from URL params
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("search") || ""
  )

  // Sync with URL params when they change externally (e.g., browser back/forward)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    setSearchValue(urlSearch)
    if (urlSearch && document.activeElement === inputRef.current) {
      setIsOpen(true)
    }
  }, [searchParams])

  const normalizedSearch = searchValue.trim().toLowerCase()
  const suggestionPool = mergeSuggestions(providedSuggestions, suggestions)
  const visibleSuggestions = (
    normalizedSearch
      ? suggestionPool.filter(
          (suggestion) =>
            suggestion.label.toLowerCase().includes(normalizedSearch) ||
            suggestion.detail.toLowerCase().includes(normalizedSearch)
        )
      : suggestionPool
  ).slice(0, 5)

  useEffect(() => {
    setActiveIndex(0)
  }, [searchValue])

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set("search", term)
      screenReader.announce(`Searching for ${term}`, "polite")
    } else {
      params.delete("search")
      screenReader.announce("Search cleared", "polite")
    }
    params.delete("page")
    const query = params.toString()
    const target = query ? `${pathname}?${query}` : pathname
    router.replace(target, { scroll: false })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setIsOpen(true)
    handleSearch(value)
  }

  const selectSuggestion = (term: string) => {
    setSearchValue(term)
    setIsOpen(false)
    handleSearch(term)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      setIsOpen(true)
      return
    }

    if (event.key === "Escape") {
      setIsOpen(false)
      return
    }

    if (!visibleSuggestions.length) {
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % visibleSuggestions.length)
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex(
        (index) =>
          (index - 1 + visibleSuggestions.length) % visibleSuggestions.length
      )
    }

    if (event.key === "Enter" && isOpen) {
      event.preventDefault()
      selectSuggestion(visibleSuggestions[activeIndex].label)
    }
  }

  return (
    <div
      ref={searchRef}
      className="relative  md:min-w-[4rem] w-full max-w-2xl md:mr-auto px-2"
      role="search"
      aria-label={ariaLabels.actions.search}
    >
      <InputButton
        ref={inputRef}
        hasIcon
        id="search"
        className={cn(
          "relative h-14 w-full border-white/10 bg-[#e9eee3] pl-12 pr-10 text-base text-black shadow-[0_12px_36px_rgba(0,0,0,0.35)] placeholder:text-stone-500 focus:bg-white md:h-16 md:py-3"
        )}
        tabIndex={0}
        value={searchValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
        onKeyDown={handleKeyDown}
        placeholder="Search all tools"
        spellCheck={false}
        enterKeyHint="go"
        inputMode="search"
        {...ariaPatterns.search()}
        aria-label={generateAriaLabel("Search", "tools and products")}
        aria-describedby="search-description"
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-haspopup="listbox"
        aria-activedescendant={
          isOpen && visibleSuggestions[activeIndex]
            ? `search-suggestion-${activeIndex}`
            : undefined
        }
        aria-expanded={isOpen}
        role="combobox"
      />

      {isOpen ? (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-2 right-2 top-[calc(100%+0.55rem)] z-50 max-h-48 overflow-y-auto rounded-2xl border border-white/10 bg-[#050705] p-1.5 text-left shadow-[0_22px_70px_rgba(0,0,0,0.72)]"
        >
          <div className="px-3 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            {visibleSuggestions.length ? "Quick paths" : "No direct match"}
          </div>
          {visibleSuggestions.length ? (
            visibleSuggestions.map((suggestion, index) => (
              <button
                key={suggestion.label}
                id={`search-suggestion-${index}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(suggestion.label)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                  index === activeIndex
                    ? "bg-lime-300/12 text-lime-100"
                    : "text-zinc-300 hover:bg-white/[0.055] hover:text-white"
                )}
              >
                <span className="font-medium">{suggestion.label}</span>
                <span className="ml-3 truncate text-xs text-zinc-400">
                  {suggestion.detail}
                </span>
              </button>
            ))
          ) : (
            <div className="grid gap-1 px-1 pb-1">
              {suggestionPool.slice(0, 3).map((suggestion, index) => (
                <button
                  key={suggestion.label}
                  id={`search-fallback-suggestion-${index}`}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectSuggestion(suggestion.label)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.055] hover:text-white"
                >
                  <span className="font-medium">{suggestion.label}</span>
                  <span className="ml-3 truncate text-xs text-zinc-400">
                    try this path
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Hidden description for screen readers */}
      <div id="search-description" className="sr-only">
        Search through all available tools and products. Type to filter results
        in real-time.
      </div>

      {/* Loading announcement for screen readers */}
    </div>
  )
}

function mergeSuggestions(
  primary: DirectorySearchSuggestion[],
  fallback: DirectorySearchSuggestion[]
) {
  const seen = new Set<string>()
  return [...primary, ...fallback].filter((suggestion) => {
    const key = suggestion.label.toLowerCase()
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}
