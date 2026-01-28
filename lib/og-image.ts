/**
 * Open Graph Image URL Generator
 * 
 * Generates URLs for the dynamic /og route with proper encoding
 */

export interface OGImageOptions {
  title: string
  description?: string
}

/**
 * Generate a URL for the dynamic OG image route
 * 
 * @example
 * generateOGImageUrl({ title: "Claude Code", description: "AI coding assistant" })
 * // => "/og?title=Claude%20Code&description=AI%20coding%20assistant"
 */
export function generateOGImageUrl(options: OGImageOptions): string {
  const params = new URLSearchParams()
  
  params.set('title', options.title)
  
  if (options.description) {
    // Limit description length to avoid URL issues
    const truncatedDesc = options.description.length > 200 
      ? `${options.description.substring(0, 197)}...`
      : options.description
    params.set('description', truncatedDesc)
  }
  
  return `/og?${params.toString()}`
}

/**
 * Generate absolute OG image URL for use in metadata
 */
export function generateAbsoluteOGImageUrl(baseUrl: string, options: OGImageOptions): string {
  const relativeUrl = generateOGImageUrl(options)
  return `${baseUrl}${relativeUrl}`
}

/**
 * Helper to extract a clean description from potentially long text
 */
export function extractOGDescription(text: string, maxLength: number = 160): string {
  if (!text) return ''
  
  // Remove markdown formatting
  const cleaned = text
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ')     // Replace newlines with spaces
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim()
  
  if (cleaned.length <= maxLength) {
    return cleaned
  }
  
  // Try to break at a sentence or word boundary
  const truncated = cleaned.substring(0, maxLength - 3)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1)
  } else if (lastSpace > maxLength * 0.7) {
    return `${truncated.substring(0, lastSpace)}...`
  }
  
  return `${truncated}...`
}
