"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator?.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <pre className="bg-muted rounded-md p-6 my-6 relative">
      <Button
        size="icon"
        onClick={copy}
        variant={"outline"}
        className="absolute right-2 top-2"
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </Button>
      <code className="text-xs p-3">{code}</code>
    </pre>
  )
}

export function InlineCodeBlock({
  code,
  showCopyButton = true,
}: {
  code: string
  showCopyButton?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator?.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <code className="relative inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs font-mono text-foreground border border-border group">
      {code}
      {showCopyButton && (
        <button
          onClick={copy}
          // className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-0.5 rounded hover:bg-muted-foreground/10"
          className="opacity-80 group-hover:opacity-100 transition-opacity ml-1 p-0.5 rounded hover:bg-muted-foreground/10"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-3 h-3" />
          ) : (
            <CopyIcon className="w-3 h-3" />
          )}
        </button>
      )}
    </code>
  )
}
