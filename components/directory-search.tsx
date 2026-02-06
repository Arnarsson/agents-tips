"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence } from "motion/react"

import {
  ariaLabels,
  ariaPatterns,
  generateAriaLabel,
  keyboardNavigation,
  screenReader,
} from "@/lib/accessibility-utils"
import { cn } from "@/lib/utils"
import { InputButton } from "@/components/ui/input"

import { IconSpinner } from "./ui/icons"

export function DirectorySearch() {
  let router = useRouter()
  let pathname = usePathname()
  let searchParams = useSearchParams()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize search value from URL params
  const [searchValue, setSearchValue] = useState(() => searchParams.get("search") || "")

  // Sync with URL params when they change externally (e.g., browser back/forward)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    setSearchValue(urlSearch)
  }, [searchParams])

  let [isPending, startTransition] = useTransition()

  let handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search)
    if (term) {
      params.set("search", term)
      screenReader.announce(`Searching for ${term}`, "polite")
    } else {
      params.delete("search")
      screenReader.announce("Search cleared", "polite")
    }
    params.delete("page")
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    handleSearch(value)
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
        className={cn("relative pr-10 pl-12 shadow-sm md:py-3 w-full")}
        tabIndex={0}
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search all tools"
        spellCheck={false}
        enterKeyHint="go"
        aria-label={generateAriaLabel("Search", "tools and products")}
        aria-describedby="search-description"
        {...ariaPatterns.search()}
      >
        <div className="relative -ml-10 hidden items-center justify-center md:flex">
          <div className="absolute ml-4 w-14 rounded-r-full">
            <AnimatePresence>
              {isPending ? (
                <IconSpinner
                  className="-ml-0.5 h-7 w-7 animate-spin stroke-teal-500/80 group-hover:text-teal-500 dark:stroke-teal-400 dark:group-hover:text-teal-300"
                  aria-hidden="true"
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </InputButton>

      {/* Hidden description for screen readers */}
      <div id="search-description" className="sr-only">
        Search through all available tools and products. Type to filter results
        in real-time.
      </div>

      {/* Loading announcement for screen readers */}
      {isPending && (
        <div aria-live="polite" className="sr-only">
          Searching...
        </div>
      )}
    </div>
  )
}
