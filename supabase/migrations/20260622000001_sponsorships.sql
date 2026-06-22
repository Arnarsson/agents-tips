-- Monetization: paid Featured listings + Category sponsorships via Stripe.
-- Adds expiry/tier columns to products and a sponsorships ledger.

-- 1. Product columns -------------------------------------------------------
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sponsor_tier   TEXT;

COMMENT ON COLUMN public.products.featured_until IS
  'When a PAID featured placement expires. NULL = editorially/manually featured (never auto-expires).';
COMMENT ON COLUMN public.products.sponsor_tier IS
  'Active paid tier: verified | featured | category_sponsor. NULL = not a paying listing.';

-- Speeds up the "currently-featured and not expired" lookup.
CREATE INDEX IF NOT EXISTS idx_products_featured_until
  ON public.products (featured_until)
  WHERE featured = true;

-- 2. Sponsorships ledger ---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sponsorships (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id          UUID REFERENCES public.products (id) ON DELETE SET NULL,
  tier                TEXT NOT NULL,                 -- verified | featured | category_sponsor | sponsored_review
  category            TEXT,                          -- for category_sponsor exclusivity
  status              TEXT NOT NULL DEFAULT 'pending',-- pending | active | canceled | expired
  amount              INTEGER,                       -- minor units (e.g. cents / øre)
  currency            TEXT DEFAULT 'usd',
  buyer_email         TEXT,
  stripe_session_id   TEXT UNIQUE,
  stripe_customer_id  TEXT,
  stripe_subscription_id TEXT,
  period_start        TIMESTAMPTZ,
  period_end          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sponsorships_product ON public.sponsorships (product_id);
CREATE INDEX IF NOT EXISTS idx_sponsorships_status  ON public.sponsorships (status);

-- 3. RLS: ledger is server-only (service role bypasses RLS). No public access.
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
-- Intentionally no permissive policies: only the service-role key (Stripe
-- webhook / admin) may read or write. Authenticated users get nothing here.

-- 4. Expiry helper: flip lapsed paid placements back to un-featured.
-- Run from a scheduled job (cron) or call manually.
CREATE OR REPLACE FUNCTION public.expire_lapsed_sponsorships()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.products
     SET featured = false,
         sponsor_tier = NULL
   WHERE featured = true
     AND featured_until IS NOT NULL
     AND featured_until < now();

  UPDATE public.sponsorships
     SET status = 'expired', updated_at = now()
   WHERE status = 'active'
     AND period_end IS NOT NULL
     AND period_end < now();
$$;
