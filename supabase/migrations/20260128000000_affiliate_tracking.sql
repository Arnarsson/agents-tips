-- Add affiliate click tracking table
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id UUID NULL,
  session_id TEXT NULL,
  referrer TEXT NULL,
  CONSTRAINT affiliate_clicks_pkey PRIMARY KEY (id),
  CONSTRAINT affiliate_clicks_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Create index for faster queries
CREATE INDEX idx_affiliate_clicks_product_id ON public.affiliate_clicks (product_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON public.affiliate_clicks (clicked_at DESC);
CREATE INDEX idx_affiliate_clicks_user_id ON public.affiliate_clicks (user_id) WHERE user_id IS NOT NULL;

-- Enable RLS
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert clicks (for tracking)
CREATE POLICY "Anyone can insert affiliate clicks" ON public.affiliate_clicks FOR INSERT
  WITH CHECK (true);

-- Allow admins to view all clicks
CREATE POLICY "Admin select all affiliate clicks" ON public.affiliate_clicks FOR SELECT
  USING (is_claims_admin());

-- Function to get affiliate click count for a product
CREATE OR REPLACE FUNCTION get_affiliate_click_count(product_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM public.affiliate_clicks 
    WHERE product_id = product_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get affiliate clicks in date range
CREATE OR REPLACE FUNCTION get_affiliate_clicks_in_range(
  product_uuid UUID,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM public.affiliate_clicks 
    WHERE product_id = product_uuid 
    AND clicked_at >= start_date 
    AND clicked_at <= end_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add affiliate_url column to products (optional - for custom affiliate URLs)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS affiliate_url TEXT NULL;

COMMENT ON COLUMN public.products.affiliate_url IS 'Custom affiliate URL if different from product_website';
COMMENT ON TABLE public.affiliate_clicks IS 'Tracks when users click external/affiliate links to products';

-- Grant permissions
GRANT ALL ON public.affiliate_clicks TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_affiliate_click_count(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_affiliate_clicks_in_range(UUID, TIMESTAMPTZ, TIMESTAMPTZ) TO anon, authenticated;
