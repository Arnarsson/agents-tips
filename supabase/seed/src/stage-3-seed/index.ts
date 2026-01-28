import fs from "fs"
import path from "path"
import { createClient, PostgrestError } from "@supabase/supabase-js"
import dotenv from "dotenv"

import { getPublicUrl, uploadImageFromUrl } from "./fetch-images"

dotenv.config({ path: path.resolve(__dirname, "../../../../.env.local") })

// Utility functions for handling tags and labels
function normalizeEntityName(name: string): string {
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

function sanitizeEntityName(name: string): string {
  let normalized = normalizeEntityName(name)
  normalized = normalized.trim()
  normalized = normalized.replace(/\s+/g, " ")
  normalized = normalized.replace(/([a-z])([A-Z])/g, "$1 $2")
  normalized = normalized.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
  normalized = normalized
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
  return normalized
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100)
}

class SeedLogger {
  private startTime: number
  private currentStep: string = ""
  private stepStartTime: number = 0

  constructor() {
    this.startTime = Date.now()
  }

  startStep(stepName: string) {
    this.currentStep = stepName
    this.stepStartTime = Date.now()
    console.log(`\n🚀 ${stepName}`)
    console.log("─".repeat(stepName.length + 3))
  }

  endStep() {
    const duration = Date.now() - this.stepStartTime
    console.log(`✅ ${this.currentStep} completed in ${duration}ms`)
  }

  info(message: string) {
    console.log(`ℹ️  ${message}`)
  }

  success(message: string) {
    console.log(`✅ ${message}`)
  }

  warning(message: string) {
    console.log(`⚠️  ${message}`)
  }

  error(message: string) {
    console.log(`❌ ${message}`)
  }

  progress(current: number, total: number, label: string = "") {
    const percentage = Math.round((current / total) * 100)
    const barLength = 20
    const filledLength = Math.round((percentage / 100) * barLength)
    const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength)
    const labelText = label ? ` (${label})` : ""
    console.log(`📊 [${bar}] ${percentage}%${labelText} - ${current}/${total}`)
  }

  summary(stats: {
    total: number
    success: number
    failed: number
    duration: number
  }) {
    console.log("\n" + "=".repeat(50))
    console.log("📊 SEEDING SUMMARY")
    console.log("=".repeat(50))
    console.log(`Total Products: ${stats.total}`)
    console.log(`✅ Successful: ${stats.success}`)
    console.log(`❌ Failed: ${stats.failed}`)
    console.log(`⏱️  Duration: ${stats.duration}ms`)
    console.log(
      `📈 Success Rate: ${Math.round((stats.success / stats.total) * 100)}%`
    )
    console.log("=".repeat(50))
  }
}

const logger = new SeedLogger()

interface RawData {
  full_name: string
  product_website: string
  codename: string
  logo_src: string
  punchline: string
  description: string
  tags: string[]
  labels: string[]
  categories: string
}

interface FailedData extends RawData {
  error: string
}

interface SuccessfulData {
  view_count: number
  approved: boolean
  logo_src: string
  user_id: string | null
  full_name: string
  twitter_handle: string
  email: string
  codename: string
  punchline: string
  categories: string
  tags: string[]
  labels: string[]
  description: string
  product_website: string
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SECRET_KEY ?? ""
)

async function getOrCreateEntity(
  table: string,
  name: string,
  skipErrors: string[] = []
): Promise<string | null> {
  try {
    const { data } = await supabase
      .from(table)
      .select("id")
      .eq("name", name)
      .single()

    if (data) {
      return data.id
    }

    const { data: newData, error: insertError } = await supabase
      .from(table)
      .upsert({ name }, { onConflict: "name" })
      .select("id")
      .single()

    if (insertError) {
      const { data: retryData, error: retryError } = await supabase
        .from(table)
        .select("id")
        .eq("name", name)
        .single()

      if (retryError) {
        throw new Error(
          `Failed to create or retrieve ${name}: ${insertError.message}`
        )
      }

      return retryData.id
    }

    return newData.id
  } catch (error) {
    if (skipErrors.includes((error as Error).message)) {
      return null
    } else {
      throw error
    }
  }
}

async function seedImagesAndProducts(
  rawData: RawData[]
): Promise<{ total: number; success: number; failed: number }> {
  const placeholderFilePath = path.resolve(
    __dirname,
    "../../images/placeholder.png"
  )

  logger.startStep("Processing Products & Images")
  logger.info(`Processing ${rawData.length} products...`)

  const productData = await Promise.all(
    rawData.map(async (data, i) => {
      const safeFileName = sanitizeFileName(data.codename)
      const fileName = `seed-${safeFileName}-${i}-logo.png`

      try {
        const uploadedFileName = await uploadImageFromUrl(
          "product-logos",
          data.logo_src,
          fileName,
          placeholderFilePath
        )

        const logoUrl = await getPublicUrl("product-logos", uploadedFileName)

        await Promise.all(
          data.labels.map(
            async (label) =>
              await getOrCreateEntity("labels", sanitizeEntityName(label), [
                "duplicate key value",
              ])
          )
        )
        await Promise.all(
          data.tags.map(
            async (tag) =>
              await getOrCreateEntity("tags", sanitizeEntityName(tag), [
                "duplicate key value",
              ])
          )
        )
        await getOrCreateEntity(
          "categories",
          sanitizeEntityName(data.categories)
        )

        return {
          view_count: 0,
          approved: true,
          logo_src: logoUrl,
          user_id: null, // Content Machine: Products are system-seeded
          full_name: "Content Machine",
          twitter_handle: "@agents_tips",
          email: "machine@agents.tips",
          codename: sanitizeEntityName(data.codename),
          punchline: data.punchline,
          categories: sanitizeEntityName(data.categories),
          tags: data.tags.map(sanitizeEntityName),
          labels: data.labels.map(sanitizeEntityName),
          description: data.description,
          product_website: data.product_website,
        } as SuccessfulData
      } catch (err) {
        const error = err as Error | PostgrestError
        logger.warning(
          `Failed to process ${data.codename}: ${`message" in error ? error.message : "Unknown error"}`
        )
        return {
          ...data,
          error: "message" in error ? error.message : "Unknown error",
        } as FailedData
      }
    })
  )

  const successfulProducts = productData.filter(
    (product): product is SuccessfulData => !(product as FailedData).error
  )
  const failedProducts = productData.filter(
    (product): product is FailedData => !!(product as FailedData).error
  )

  const uniqueProductData = Array.from(
    new Map(successfulProducts.map((item) => [item.codename, item])).values()
  )

  logger.info(
    `Prepared ${uniqueProductData.length} unique products for database insertion`
  )
  
  logger.startStep("Database Insertion")
  const batchSize = 50
  for (let i = 0; i < uniqueProductData.length; i += batchSize) {
    const batch = uniqueProductData.slice(i, i + batchSize)
    const { error } = await supabase
      .from("products")
      .upsert(batch as any, { onConflict: "codename" })

    if (error) {
      logger.error(
        `Failed to insert batch ${Math.floor(i / batchSize) + 1}: ${`
          (error as PostgrestError).message
        }`}
      )
    } else {
      logger.progress(
        Math.min(i + batchSize, uniqueProductData.length),
        uniqueProductData.length,
        `Batch ${Math.floor(i / batchSize) + 1}`
      )
    }
  }

  const failedSeedFilePath = path.resolve(
    __dirname,
    "__data__/failed-seed.json"
  )
  fs.writeFileSync(failedSeedFilePath, JSON.stringify(failedProducts, null, 2))

  logger.endStep()
  return {
    total: rawData.length,
    success: successfulProducts.length,
    failed: failedProducts.length,
  }
}

const findLatestEnrichedDataFile = async (): Promise<string> => {
  const dataDir = path.join(__dirname, "../stage-2-enrich/__data__")
  try {
    const files = await fs.promises.readdir(dataDir)
    const enrichedFiles = files.filter(
      (file) => file.startsWith("enriched-") && file.endsWith(".json")
    )
    enrichedFiles.sort()
    return enrichedFiles.length > 0 ? enrichedFiles[enrichedFiles.length - 1] : ""
  } catch (error) {
    return ""
  }
}

export const seedDatabase = async () => {
  const startTime = Date.now()
  logger.startStep("Database Seeding")
  
  const latestEnrichedDataFile = await findLatestEnrichedDataFile()
  if (!latestEnrichedDataFile) {
    logger.error("No enriched data files found.")
    return
  }

  const rawDataFilePath = path.join(
    __dirname,
    "../stage-2-enrich/__data__",
    latestEnrichedDataFile
  )
  
  const rawData: RawData[] = JSON.parse(
    fs.readFileSync(rawDataFilePath, "utf-8")
  )

  const stats = await seedImagesAndProducts(rawData)
  const totalDuration = Date.now() - startTime
  
  logger.summary({
    total: stats.total,
    success: stats.success,
    failed: stats.failed,
    duration: totalDuration,
  })
}