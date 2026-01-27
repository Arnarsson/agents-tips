-- Newsletter Subscribers Table
-- Stores email addresses for newsletter signups

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'footer', -- Where they signed up (footer, modal, etc.)
  metadata JSONB DEFAULT '{}', -- Additional data (referrer, utm params, etc.)
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_subscriber_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER trigger_newsletter_subscriber_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_subscriber_updated_at();

-- Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (signup)
CREATE POLICY "Allow public newsletter signups"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only authenticated users can read (admin panel)
CREATE POLICY "Allow authenticated read access"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update/delete (admin unsubscribes)
CREATE POLICY "Allow authenticated update access"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

COMMENT ON TABLE newsletter_subscribers IS 'Stores newsletter subscription data with signup tracking';
COMMENT ON COLUMN newsletter_subscribers.source IS 'Where the user signed up from (e.g., footer, modal, blog-cta)';
COMMENT ON COLUMN newsletter_subscribers.metadata IS 'Additional context like referrer URL, UTM parameters, etc.';
