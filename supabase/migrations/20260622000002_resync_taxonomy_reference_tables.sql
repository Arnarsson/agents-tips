-- OPTIONAL HYGIENE MIGRATION — review before applying.
--
-- Context: the categories/labels/tags lookup tables still hold legacy
-- display-case names ("Coding Assistants", "Dev Tools") that NO approved
-- product uses. Those orphans were the original cause of the duplicated,
-- 404-ing sidebar. The app no longer reads these tables for the sidebar
-- (getCachedFilters now derives filters from real product data), so this
-- migration is NOT required for correctness — it just resyncs the lookup
-- tables to the values products actually use, so getFilters() is correct
-- if ever used again and the data stops being misleading.
--
-- Safe to apply: products reference taxonomies by TEXT value, not by foreign
-- key, so deleting orphan lookup rows cannot break referential integrity.
-- Idempotent: re-running produces the same result.
--
-- Product taxonomy values were verified clean before writing this (5 snake
-- categories, 56 kebab tags, 14 kebab labels, no malformed values), so this
-- only touches the lookup tables, never product rows.

BEGIN;

-- ── CATEGORIES (products.categories is comma-separated TEXT) ───────────────
DELETE FROM public.categories cat
WHERE NOT EXISTS (
  SELECT 1
  FROM public.products p,
       unnest(string_to_array(coalesce(p.categories, ''), ',')) AS c
  WHERE p.approved = true AND trim(c) = cat.name
);

INSERT INTO public.categories (name)
SELECT DISTINCT trim(c)
FROM public.products p,
     unnest(string_to_array(coalesce(p.categories, ''), ',')) AS c
WHERE p.approved = true AND trim(c) <> ''
ON CONFLICT (name) DO NOTHING;

-- ── LABELS (products.labels is TEXT[]) ────────────────────────────────────
DELETE FROM public.labels lab
WHERE NOT EXISTS (
  SELECT 1
  FROM public.products p,
       unnest(coalesce(p.labels, '{}')) AS l
  WHERE p.approved = true AND l = lab.name
);

INSERT INTO public.labels (name)
SELECT DISTINCT l
FROM public.products p,
     unnest(coalesce(p.labels, '{}')) AS l
WHERE p.approved = true AND l <> ''
ON CONFLICT (name) DO NOTHING;

-- ── TAGS (products.tags is TEXT[]) ────────────────────────────────────────
DELETE FROM public.tags tg
WHERE NOT EXISTS (
  SELECT 1
  FROM public.products p,
       unnest(coalesce(p.tags, '{}')) AS t
  WHERE p.approved = true AND t = tg.name
);

INSERT INTO public.tags (name)
SELECT DISTINCT t
FROM public.products p,
     unnest(coalesce(p.tags, '{}')) AS t
WHERE p.approved = true AND t <> ''
ON CONFLICT (name) DO NOTHING;

COMMIT;
