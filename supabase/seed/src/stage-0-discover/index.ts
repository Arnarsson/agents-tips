// index.ts - Discovery stage for automated content pipeline

import path from 'path'
import fs from 'fs-extra'
import {
  fetchProductHunt,
  fetchHackerNews,
  fetchGitHubTrending,
  deduplicateAndRank,
  DiscoveredAgent,
} from './sources'

class DiscoveryLogger {
  private startTime: number

  constructor() {
    this.startTime = Date.now()
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

  summary(stats: {
    sources: Record<string, number>
    total: number
    unique: number
    duration: number
  }) {
    console.log('\n' + '='.repeat(50))
    console.log('📊 DISCOVERY SUMMARY')
    console.log('='.repeat(50))
    console.log(`Sources scanned:`)
    Object.entries(stats.sources).forEach(([source, count]) => {
      console.log(`  • ${source}: ${count} agents`)
    })
    console.log(`Total discovered: ${stats.total}`)
    console.log(`Unique agents: ${stats.unique}`)
    console.log(`⏱️  Duration: ${stats.duration}ms`)
    console.log('='.repeat(50))
  }
}

const logger = new DiscoveryLogger()

/**
 * Discovers new AI agents from multiple sources
 */
export async function discoverNewAgents(): Promise<string[]> {
  const startTime = Date.now()

  console.log('\n🔍 STAGE 0: DISCOVERY')
  console.log('='.repeat(50))
  logger.info('Scanning sources for new AI agents...')

  try {
    // Fetch from all sources in parallel
    const [productHuntAgents, hackerNewsAgents, githubAgents] = await Promise.all([
      fetchProductHunt(),
      fetchHackerNews(),
      fetchGitHubTrending(),
    ])

    const allAgents = [...productHuntAgents, ...hackerNewsAgents, ...githubAgents]

    // Deduplicate and rank
    const uniqueAgents = deduplicateAndRank(allAgents)

    // Filter out agents we already know about
    const newAgents = await filterKnownAgents(uniqueAgents)

    // Save discovered agents for review
    await saveDiscoveredAgents(newAgents)

    const duration = Date.now() - startTime

    logger.summary({
      sources: {
        'Product Hunt': productHuntAgents.length,
        'Hacker News': hackerNewsAgents.length,
        'GitHub': githubAgents.length,
      },
      total: allAgents.length,
      unique: newAgents.length,
      duration,
    })

    logger.success(`Discovered ${newAgents.length} new agents!`)

    // Return URLs for the crawler
    return newAgents.map(agent => agent.url)
  } catch (error) {
    logger.error(`Discovery failed: ${(error as Error).message}`)
    throw error
  }
}

/**
 * Filters out agents that are already in the database or recent discoveries
 */
async function filterKnownAgents(agents: DiscoveredAgent[]): Promise<DiscoveredAgent[]> {
  // Load existing discoveries log
  const logPath = path.join(__dirname, '__data__', 'discovery-log.json')
  let knownUrls: Set<string> = new Set()

  try {
    if (await fs.pathExists(logPath)) {
      const log = await fs.readJson(logPath)
      knownUrls = new Set(log.discovered.map((a: DiscoveredAgent) => a.url))
    }
  } catch (error) {
    logger.warning('Could not load discovery log, treating all as new')
  }

  // Filter out known URLs
  const newAgents = agents.filter(agent => !knownUrls.has(agent.url))

  logger.info(`Filtered out ${agents.length - newAgents.length} known agents`)

  return newAgents
}

/**
 * Saves discovered agents to a log file
 */
async function saveDiscoveredAgents(agents: DiscoveredAgent[]): Promise<void> {
  const dataDir = path.join(__dirname, '__data__')
  await fs.ensureDir(dataDir)

  const timestamp = new Date().toISOString().replace(/[:-]/g, '').split('.')[0]
  const filePath = path.join(dataDir, `discovered-${timestamp}.json`)

  // Save timestamped discovery
  await fs.writeJson(filePath, agents, { spaces: 2 })

  // Update cumulative log
  const logPath = path.join(dataDir, 'discovery-log.json')
  let log: { discovered: DiscoveredAgent[] } = { discovered: [] }

  if (await fs.pathExists(logPath)) {
    log = await fs.readJson(logPath)
  }

  log.discovered = [...log.discovered, ...agents]
  await fs.writeJson(logPath, log, { spaces: 2 })

  logger.success(`Saved ${agents.length} agents to discovery log`)
}

/**
 * Standalone script for running discovery
 */
if (require.main === module) {
  discoverNewAgents()
    .then(urls => {
      console.log('\n✅ Discovery complete!')
      console.log(`Found ${urls.length} new agents to crawl:`)
      urls.forEach(url => console.log(`  • ${url}`))
    })
    .catch(error => {
      console.error('Discovery failed:', error)
      process.exit(1)
    })
}
