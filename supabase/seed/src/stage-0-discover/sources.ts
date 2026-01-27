// sources.ts - Discovery sources for AI agents

export interface DiscoveredAgent {
  url: string
  title: string
  description?: string
  source: 'producthunt' | 'hackernews' | 'github' | 'manual'
  discoveredAt: Date
  upvotes?: number
  tags?: string[]
}

/**
 * Fetches AI-related products from Product Hunt API
 * Uses the official Product Hunt GraphQL API
 */
export async function fetchProductHunt(): Promise<DiscoveredAgent[]> {
  // Product Hunt requires OAuth, but we can scrape their AI category page
  const url = 'https://www.producthunt.com/topics/artificial-intelligence'
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AgentsTips/1.0; +https://agents.tips)',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Product Hunt fetch failed: ${response.status}`)
    }
    
    // For now, return empty array - we'll need to implement proper scraping
    // or use their API with auth
    console.log('Product Hunt: API integration needed')
    return []
  } catch (error) {
    console.error('Product Hunt fetch error:', error)
    return []
  }
}

/**
 * Fetches AI-related stories from Hacker News Algolia API
 * https://hn.algolia.com/api
 */
export async function fetchHackerNews(): Promise<DiscoveredAgent[]> {
  const queries = [
    'AI agent',
    'coding assistant',
    'autonomous agent',
    'AI developer tool',
    'LLM framework'
  ]
  
  const discovered: DiscoveredAgent[] = []
  
  for (const query of queries) {
    try {
      const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=10`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HN fetch failed: ${response.status}`)
      }
      
      const data = await response.json()
      
      for (const hit of data.hits) {
        // Filter for URLs that look like product pages (not discussions)
        if (hit.url && !hit.url.includes('news.ycombinator.com')) {
          discovered.push({
            url: hit.url,
            title: hit.title,
            source: 'hackernews',
            discoveredAt: new Date(hit.created_at),
            upvotes: hit.points,
          })
        }
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`HN fetch error for "${query}":`, error)
    }
  }
  
  return discovered
}

/**
 * Fetches trending AI repositories from GitHub
 * Uses GitHub's REST API (no auth required for public data)
 */
export async function fetchGitHubTrending(): Promise<DiscoveredAgent[]> {
  const topics = [
    'ai-agent',
    'coding-assistant',
    'llm',
    'autonomous-agent',
    'ai-framework'
  ]
  
  const discovered: DiscoveredAgent[] = []
  
  for (const topic of topics) {
    try {
      // GitHub API: search repos by topic, sorted by stars
      const url = `https://api.github.com/search/repositories?q=topic:${topic}+stars:>100&sort=stars&order=desc&per_page=20`
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'AgentsTips-Crawler/1.0',
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`GitHub fetch failed: ${response.status}`)
      }
      
      const data = await response.json()
      
      for (const repo of data.items) {
        const repoUrl = repo.homepage || repo.html_url
        
        discovered.push({
          url: repoUrl,
          title: repo.name,
          description: repo.description,
          source: 'github',
          discoveredAt: new Date(),
          upvotes: repo.stargazers_count,
          tags: repo.topics,
        })
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`GitHub fetch error for "${topic}":`, error)
    }
  }
  
  return discovered
}

/**
 * Deduplicates discovered agents by URL and sorts by relevance
 */
export function deduplicateAndRank(agents: DiscoveredAgent[]): DiscoveredAgent[] {
  const urlMap = new Map<string, DiscoveredAgent>()
  
  for (const agent of agents) {
    const normalizedUrl = normalizeUrl(agent.url)
    
    // Keep the agent with more metadata if duplicate
    if (!urlMap.has(normalizedUrl)) {
      urlMap.set(normalizedUrl, agent)
    } else {
      const existing = urlMap.get(normalizedUrl)!
      if ((agent.upvotes || 0) > (existing.upvotes || 0)) {
        urlMap.set(normalizedUrl, agent)
      }
    }
  }
  
  // Sort by upvotes (if available) and recency
  return Array.from(urlMap.values()).sort((a, b) => {
    const aScore = (a.upvotes || 0) * 10 + (Date.now() - a.discoveredAt.getTime()) / 1000000
    const bScore = (b.upvotes || 0) * 10 + (Date.now() - b.discoveredAt.getTime()) / 1000000
    return bScore - aScore
  })
}

/**
 * Normalizes URLs for deduplication
 */
function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    // Remove www, trailing slashes, query params
    return parsed.hostname.replace('www.', '') + parsed.pathname.replace(/\/$/, '')
  } catch {
    return url
  }
}
