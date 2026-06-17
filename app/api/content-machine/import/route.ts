import { NextRequest, NextResponse } from "next/server"

import { runContentMachineImport } from "@/lib/content-machine/import"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const VALID_SOURCES = new Set(["github", "bens-bites"])
type ImportSource = "github" | "bens-bites"

class BadRequestError extends Error {}

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get("authorization")

  if (!cronSecret) {
    return process.env.NODE_ENV !== "production"
  }

  return authHeader === `Bearer ${cronSecret}`
}

function parseSources(value: unknown): ImportSource[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const sources = value.filter(
    (source): source is ImportSource =>
      typeof source === "string" && VALID_SOURCES.has(source)
  )

  if (sources.length !== value.length) {
    throw new BadRequestError("Invalid source. Use github or bens-bites.")
  }

  return sources.length ? sources : undefined
}

function parseText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      sources?: unknown
      githubQuery?: unknown
      github_query?: unknown
    }

    const result = await runContentMachineImport({
      sources: parseSources(body.sources),
      githubQuery: parseText(body.githubQuery) ?? parseText(body.github_query),
    })

    return NextResponse.json({ ok: true, result })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Content machine import failed"
    const status = error instanceof BadRequestError ? 400 : 500

    return NextResponse.json({ error: message }, { status })
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await runContentMachineImport()
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Content machine import failed"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
