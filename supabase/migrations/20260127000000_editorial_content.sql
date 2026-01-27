-- Editorial content system migration
-- Supports multiple content types: reviews, guides, dev-dish, insights, reading-list

-- Content types enum
CREATE TYPE content_type AS ENUM (
  'tool-review',
  'guide',
  'dev-dish',
  'insight',
  'reading-list'
);

-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  published_at TIMESTAMPTZ NULL,
  
  -- Content
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL, -- Markdown/MDX content
  excerpt TEXT, -- Short summary for cards
  
  -- Metadata
  content_type content_type NOT NULL,
  author_id UUID NOT NULL,
  cover_image TEXT,
  reading_time_minutes INTEGER,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  
  -- Organization
  tags TEXT[],
  related_products UUID[], -- References to products table
  
  -- Status
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  
  CONSTRAINT articles_pkey PRIMARY KEY (id),
  CONSTRAINT articles_author_fkey FOREIGN KEY (author_id) REFERENCES auth.users (id)
);

-- Article views tracking
CREATE TABLE public.article_views (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT article_views_pkey PRIMARY KEY (id),
  CONSTRAINT article_views_article_fkey FOREIGN KEY (article_id) REFERENCES public.articles (id) ON DELETE CASCADE
);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_article_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_timestamp
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION update_article_updated_at();

-- Trigger to update article view count
CREATE OR REPLACE FUNCTION update_article_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.articles
  SET view_count = (
    SELECT COUNT(*) FROM public.article_views WHERE article_id = NEW.article_id
  )
  WHERE id = NEW.article_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_view_count
AFTER INSERT ON public.article_views
FOR EACH ROW
EXECUTE FUNCTION update_article_view_count();

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

-- Policies for articles
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT
  USING (published = true OR auth.uid() = author_id OR is_claims_admin());

CREATE POLICY "Authors can view own articles" ON public.articles FOR SELECT
  USING (auth.uid() = author_id OR is_claims_admin());

CREATE POLICY "Authors can insert own articles" ON public.articles FOR INSERT
  WITH CHECK (auth.uid() = author_id OR is_claims_admin());

CREATE POLICY "Authors can update own articles" ON public.articles FOR UPDATE
  USING (auth.uid() = author_id OR is_claims_admin());

CREATE POLICY "Authors can delete own articles" ON public.articles FOR DELETE
  USING (auth.uid() = author_id OR is_claims_admin());

-- Admin policies
CREATE POLICY "Admin select all articles" ON public.articles FOR SELECT
  USING (is_claims_admin());

CREATE POLICY "Admin update all articles" ON public.articles FOR UPDATE
  USING (is_claims_admin());

CREATE POLICY "Admin delete all articles" ON public.articles FOR DELETE
  USING (is_claims_admin());

-- Policies for article views
CREATE POLICY "Anyone can insert article views" ON public.article_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view article views" ON public.article_views FOR SELECT
  USING (true);

-- Indexes for performance
CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_content_type ON public.articles (content_type);
CREATE INDEX idx_articles_published ON public.articles (published);
CREATE INDEX idx_articles_featured ON public.articles (featured);
CREATE INDEX idx_articles_published_at ON public.articles (published_at);
CREATE INDEX idx_articles_author_id ON public.articles (author_id);
CREATE INDEX idx_articles_tags ON public.articles USING GIN (tags);
CREATE INDEX idx_articles_related_products ON public.articles USING GIN (related_products);
CREATE INDEX idx_article_views_article_id ON public.article_views (article_id);

-- Function to get articles by type
CREATE OR REPLACE FUNCTION get_articles_by_type(article_type content_type, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  subtitle TEXT,
  excerpt TEXT,
  content_type content_type,
  cover_image TEXT,
  published_at TIMESTAMPTZ,
  reading_time_minutes INTEGER,
  view_count INTEGER,
  tags TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.slug,
    a.title,
    a.subtitle,
    a.excerpt,
    a.content_type,
    a.cover_image,
    a.published_at,
    a.reading_time_minutes,
    a.view_count,
    a.tags
  FROM public.articles a
  WHERE a.content_type = article_type AND a.published = true
  ORDER BY a.published_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get featured articles
CREATE OR REPLACE FUNCTION get_featured_articles(limit_count INTEGER DEFAULT 5)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  subtitle TEXT,
  excerpt TEXT,
  content_type content_type,
  cover_image TEXT,
  published_at TIMESTAMPTZ,
  reading_time_minutes INTEGER,
  view_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.slug,
    a.title,
    a.subtitle,
    a.excerpt,
    a.content_type,
    a.cover_image,
    a.published_at,
    a.reading_time_minutes,
    a.view_count
  FROM public.articles a
  WHERE a.published = true AND a.featured = true
  ORDER BY a.published_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments
COMMENT ON TABLE public.articles IS 'Editorial content - reviews, guides, tutorials, insights';
COMMENT ON COLUMN public.articles.content_type IS 'Type of content: tool-review, guide, dev-dish, insight, reading-list';
COMMENT ON COLUMN public.articles.content IS 'Markdown or MDX content';
COMMENT ON COLUMN public.articles.related_products IS 'Array of product UUIDs mentioned in the article';
