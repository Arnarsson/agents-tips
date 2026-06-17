-- Content machine primitives for Agent.tips Watch and Arnarsson Briefs.

CREATE TABLE IF NOT EXISTS public.sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  source_type TEXT NOT NULL CHECK (
    source_type IN ('newsletter', 'github', 'rss', 'website', 'manual', 'social')
  ),
  scrape_policy TEXT NOT NULL DEFAULT 'metadata_only' CHECK (
    scrape_policy IN ('metadata_only', 'links_only', 'full_public_page', 'manual_only')
  ),
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.source_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.sources(id) ON DELETE SET NULL,
  source_url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  extracted_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  extracted_topics TEXT[] NOT NULL DEFAULT '{}',
  summary_for_internal_use TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'reviewed', 'promoted', 'rejected')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.watch_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_item_id UUID REFERENCES public.source_items(id) ON DELETE SET NULL,
  tool_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  repo_owner TEXT,
  repo_name TEXT,
  language TEXT,
  stars INTEGER,
  stars_24h INTEGER,
  trend_score INTEGER NOT NULL DEFAULT 0,
  authority_score INTEGER NOT NULL DEFAULT 0,
  ecosystem TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'reviewed', 'promoted', 'rejected')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  issue_number INTEGER UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.brief_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id UUID NOT NULL REFERENCES public.briefs(id) ON DELETE CASCADE,
  watch_item_id UUID REFERENCES public.watch_items(id) ON DELETE SET NULL,
  tool_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  section TEXT NOT NULL CHECK (
    section IN ('the_signal', 'toolmarks', 'workflow_rune', 'repo_watch', 'operator_notes')
  ),
  title TEXT NOT NULL,
  commentary TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_sources_source_type ON public.sources(source_type);
CREATE INDEX IF NOT EXISTS idx_source_items_status ON public.source_items(status);
CREATE INDEX IF NOT EXISTS idx_source_items_published_at ON public.source_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_watch_items_status ON public.watch_items(status);
CREATE INDEX IF NOT EXISTS idx_watch_items_trend_score ON public.watch_items(trend_score DESC);
CREATE INDEX IF NOT EXISTS idx_watch_items_ecosystem ON public.watch_items(ecosystem);
CREATE INDEX IF NOT EXISTS idx_watch_items_tags ON public.watch_items USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_briefs_status_published_at ON public.briefs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_brief_items_brief_section ON public.brief_items(brief_id, section, sort_order);

ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brief_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviewed sources" ON public.sources
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage sources" ON public.sources
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

CREATE POLICY "Admins can manage source items" ON public.source_items
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

CREATE POLICY "Public can view reviewed watch items" ON public.watch_items
  FOR SELECT USING (status IN ('reviewed', 'promoted') OR is_claims_admin());

CREATE POLICY "Admins can manage watch items" ON public.watch_items
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

CREATE POLICY "Public can view published briefs" ON public.briefs
  FOR SELECT USING (status = 'published' OR is_claims_admin());

CREATE POLICY "Admins can manage briefs" ON public.briefs
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

CREATE POLICY "Public can view published brief items" ON public.brief_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.briefs
      WHERE briefs.id = brief_items.brief_id
      AND (briefs.status = 'published' OR is_claims_admin())
    )
  );

CREATE POLICY "Admins can manage brief items" ON public.brief_items
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

INSERT INTO public.sources (name, url, source_type, scrape_policy)
VALUES
  ('Ben''s Bites Archive', 'https://www.bensbites.com/archive', 'newsletter', 'links_only'),
  ('GitHub Agent Topics', 'https://api.github.com/search/repositories', 'github', 'metadata_only')
ON CONFLICT (url) DO NOTHING;

COMMENT ON TABLE public.watch_items IS 'Reviewed and scored trend radar items for repos, tools, workflows, and agent infrastructure.';
COMMENT ON TABLE public.briefs IS 'Arnarsson editorial briefs assembled from watch items, tools, and operator notes.';
COMMENT ON TABLE public.source_items IS 'Internal source intelligence extracted from public feeds, archives, and manually added sources.';

ALTER TABLE public.sources
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS config JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS last_error TEXT,
  ADD COLUMN IF NOT EXISTS last_crawled_at TIMESTAMPTZ;

ALTER TABLE public.source_items
  ADD COLUMN IF NOT EXISTS source_name TEXT,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS content_hash TEXT,
  ADD COLUMN IF NOT EXISTS raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS inspiration_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID,
  ADD COLUMN IF NOT EXISTS promoted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS promoted_by UUID,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

ALTER TABLE public.watch_items
  ADD COLUMN IF NOT EXISTS workflow_id UUID,
  ADD COLUMN IF NOT EXISTS github_repo_id BIGINT,
  ADD COLUMN IF NOT EXISTS github_full_name TEXT,
  ADD COLUMN IF NOT EXISTS github_url TEXT,
  ADD COLUMN IF NOT EXISTS github_description TEXT,
  ADD COLUMN IF NOT EXISTS github_topics TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS github_pushed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS github_stargazers_count INTEGER,
  ADD COLUMN IF NOT EXISTS github_forks_count INTEGER,
  ADD COLUMN IF NOT EXISTS github_open_issues_count INTEGER,
  ADD COLUMN IF NOT EXISTS github_license TEXT,
  ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID,
  ADD COLUMN IF NOT EXISTS promoted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS promoted_by UUID,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS review_notes TEXT;

ALTER TABLE public.briefs
  ADD COLUMN IF NOT EXISTS subtitle TEXT,
  ADD COLUMN IF NOT EXISTS body TEXT,
  ADD COLUMN IF NOT EXISTS provenance JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  source_watch_item_id UUID REFERENCES public.watch_items(id) ON DELETE SET NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.brief_items
  ADD COLUMN IF NOT EXISTS workflow_id UUID REFERENCES public.workflows(id) ON DELETE SET NULL;

ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published workflows" ON public.workflows
  FOR SELECT USING (status = 'published' OR is_claims_admin());

CREATE POLICY "Admins can manage workflows" ON public.workflows
  FOR ALL USING (is_claims_admin()) WITH CHECK (is_claims_admin());

CREATE INDEX IF NOT EXISTS idx_workflows_status_published_at ON public.workflows(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflows_tags ON public.workflows USING GIN(tags);
CREATE UNIQUE INDEX IF NOT EXISTS idx_watch_items_github_repo_id ON public.watch_items(github_repo_id) WHERE github_repo_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_source_items_canonical_url ON public.source_items(source_id, canonical_url);

COMMENT ON TABLE public.workflows IS 'Practical agent stack recipes promoted from reviewed watch items.';
