// auto-pipeline.ts - Automated content pipeline with discovery

import { discoverNewAgents } from './stage-0-discover'
import { crawlAndSave } from './stage-1-crawl'
import { enrichLatestData } from './stage-2-enrich'
import path from 'path'
import fs from 'fs-extra'

class AutoPipelineLogger {
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  startStep(stepName: string, stepNumber: number) {
    console.log(`\n${stepNumber}. 🚀 ${stepName}`)
    console.log('─'.repeat(stepName.length + 5))
  }

  info(message: string) {
    console.log(`ℹ️  ${message}`)
  }

  success(message: string) {
    console.log(`✅ ${message}`)
  }

  error(message: string) {
    console.log(`❌ ${message}`)
  }

  summary(duration: number, stats: {
    discovered: number
    crawled: number
    enriched: number
    readyForReview: number
  }) {
    console.log('\n' + '='.repeat(60))
    console.log('🎉 AUTOMATED PIPELINE COMPLETED')
    console.log('='.repeat(60))
    console.log(`⏱️  Total Duration: ${Math.round(duration / 1000)}s`)
    console.log(`📊 Stats:`)
    console.log(`   • Discovered: ${stats.discovered} new agents`)
    console.log(`   • Crawled: ${stats.crawled} pages`)
    console.log(`   • Enriched: ${stats.enriched} entries`)
    console.log(`   • Ready for review: ${stats.readyForReview}`)
    console.log('='.repeat(60))
    console.log(`\n🔍 Next step: Review enriched data and approve for publishing`)
    console.log(`📁 Location: supabase/seed/src/stage-2-enrich/__data__/`)
  }
}

const logger = new AutoPipelineLogger()

/**
 * Runs the full automated pipeline:
 * 1. Discover new agents
 * 2. Crawl discovered URLs
 * 3. Enrich with AI
 * 4. Save to review queue (manual approval step)
 */
async function runAutoPipeline() {
  console.log('🤖 AUTOMATED CONTENT PIPELINE')
  console.log('='.repeat(60))
  logger.info('Starting automated discovery and processing...')

  const stats = {
    discovered: 0,
    crawled: 0,
    enriched: 0,
    readyForReview: 0,
  }

  try {
    // Stage 0: Discover
    logger.startStep('Discover new AI agents', 0)
    const discoveredUrls = await discoverNewAgents()
    stats.discovered = discoveredUrls.length
    
    if (discoveredUrls.length === 0) {
      logger.info('No new agents discovered. Pipeline complete.')
      return
    }

    // Stage 1: Crawl
    logger.startStep('Crawl discovered URLs', 1)
    await crawlAndSave(discoveredUrls)
    stats.crawled = discoveredUrls.length

    // Stage 2: Enrich
    logger.startStep('Enrich with AI', 2)
    await enrichLatestData()
    
    // Count enriched items
    const enrichedFiles = await getEnrichedFiles()
    if (enrichedFiles.length > 0) {
      const latestEnriched = await fs.readJson(enrichedFiles[enrichedFiles.length - 1])
      stats.enriched = latestEnriched.length
      stats.readyForReview = latestEnriched.length
    }

    const duration = Date.now() - logger['startTime']
    logger.summary(duration, stats)

    logger.success('Automated pipeline completed successfully!')
    
  } catch (error) {
    logger.error(`Pipeline failed: ${(error as Error).message}`)
    throw error
  }
}

/**
 * Gets list of enriched data files
 */
async function getEnrichedFiles(): Promise<string[]> {
  const enrichDir = path.join(__dirname, 'stage-2-enrich/__data__')
  
  try {
    const files = await fs.readdir(enrichDir)
    const enrichedFiles = files
      .filter(f => f.startsWith('enriched-') && f.endsWith('.json'))
      .map(f => path.join(enrichDir, f))
      .sort()
    
    return enrichedFiles
  } catch (error) {
    return []
  }
}

/**
 * Weekly cron job handler
 */
export async function weeklyDiscovery() {
  console.log('\n⏰ Running weekly discovery cron job...')
  await runAutoPipeline()
}

// Run if called directly
if (require.main === module) {
  runAutoPipeline()
    .then(() => {
      console.log('\n✅ Pipeline finished successfully')
      process.exit(0)
    })
    .catch(error => {
      console.error('\n❌ Pipeline failed:', error)
      process.exit(1)
    })
}
