import { createClient } from "@/db/supabase/server"
import { notFound } from "next/navigation"
import { hasEnvVars } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import { StructuredData } from "@/components/seo/structured-data"
import { generateDynamicOGImage, getSEOConfig } from "@/lib/seo-config"
import { extractOGDescription } from "@/lib/og-image"

const contentTypeLabels = {
  'tool-review': 'Tool Review',
  'guide': 'Guide',
  'dev-dish': 'Dev Dish',
  'insight': 'Insight',
  'reading-list': 'Reading List'
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!hasEnvVars) return { title: 'Article Not Found' }
  const supabase = await createClient()
  
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const title = article.meta_title || article.title
  const description = article.meta_description || article.excerpt
  
  // Use custom OG image if provided, otherwise generate dynamic one
  const ogImageUrl = article.og_image || generateDynamicOGImage(
    title,
    extractOGDescription(description || '', 200)
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 628,
          alt: title,
        }
      ],
      type: 'article',
      publishedTime: article.published_at,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  if (!hasEnvVars) notFound()
  const supabase = await createClient()
  
  // Fetch article
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !article) {
    notFound()
  }

  // Track view (fire and forget)
  supabase
    .from('article_views')
    .insert({ article_id: article.id })
    .then(() => {}, () => {})

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <StructuredData
        type="article"
        data={{
          title: article.title,
          description: article.meta_description || article.excerpt,
          excerpt: article.excerpt,
          image: article.og_image || article.cover_image,
          cover_image: article.cover_image,
          published_at: article.published_at,
          updated_at: article.updated_at,
          url: `https://agents.tips/blog/${article.slug}`,
          author_name: "agents.tips Team",
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">
              {contentTypeLabels[article.content_type as keyof typeof contentTypeLabels]}
            </Badge>
            {article.tags && article.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          {article.subtitle && (
            <p className="text-xl text-muted-foreground mb-6">{article.subtitle}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {article.reading_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.reading_time_minutes} min read
              </span>
            )}
            <span>{article.view_count || 0} views</span>
          </div>
        </header>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.cover_image} 
              alt={article.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← All articles
            </Link>
          </div>
        </footer>
      </article>
      </div>
    </>
  )
}
