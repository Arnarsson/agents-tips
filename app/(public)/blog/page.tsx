import { createClient } from "@/db/supabase/server"
import { hasEnvVars } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

export const metadata = {
  title: "Blog | agents.tips",
  description: "Articles, guides, and insights about AI agents and developer tools",
}

const contentTypeLabels = {
  'tool-review': 'Tool Review',
  'guide': 'Guide',
  'dev-dish': 'Dev Dish',
  'insight': 'Insight',
  'reading-list': 'Reading List'
}

export default async function BlogPage() {
  if (!hasEnvVars) {
    return <div className="container mx-auto py-12"><p>Blog coming soon.</p></div>
  }
  const supabase = await createClient()
  
  // Fetch published articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return <div>Error loading articles</div>
  }

  const featuredArticles = articles?.filter(a => a.featured) || []
  const regularArticles = articles?.filter(a => !a.featured) || []

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Deep-dives, guides, and insights from a builder's perspective. No corporate fluff.
        </p>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/blog/${article.slug}`}
                className="group"
              >
                <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {article.cover_image && (
                    <div className="aspect-video bg-muted">
                      <img 
                        src={article.cover_image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">
                        {contentTypeLabels[article.content_type as keyof typeof contentTypeLabels]}
                      </Badge>
                      {article.reading_time_minutes && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.reading_time_minutes} min
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="text-muted-foreground mb-4">{article.subtitle}</p>
                    )}
                    {article.excerpt && (
                      <p className="text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid gap-6">
          {regularArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/blog/${article.slug}`}
              className="group"
            >
              <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">
                        {contentTypeLabels[article.content_type as keyof typeof contentTypeLabels]}
                      </Badge>
                      {article.tags && article.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {article.reading_time_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.reading_time_minutes} min read
                        </span>
                      )}
                    </div>
                  </div>
                  {article.cover_image && (
                    <div className="w-32 h-32 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={article.cover_image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {articles?.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No articles yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
