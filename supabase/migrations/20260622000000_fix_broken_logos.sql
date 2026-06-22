-- Fix 7 broken logo_src URLs on launch agents (favicons that 403/404'd).
-- Replacements verified HTTP 200. Idempotent.

UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=openai.com&sz=128'   WHERE codename = 'openai-codex-cli';
UPDATE public.products SET logo_src = 'https://aider.chat/assets/icons/favicon-32x32.png'              WHERE codename = 'aider';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=news.agpt.co&sz=128'  WHERE codename = 'autogpt';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=langchain.com&sz=128' WHERE codename = 'langchain';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=replit.com&sz=128'    WHERE codename = 'replit-agent';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=phidata.com&sz=128'   WHERE codename = 'phidata';

-- These hosts return 200 to curl but block browser hotlinking, so use the
-- browser-safe Google favicon service instead.
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128'        WHERE codename = 'v0-vercel';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=continue.dev&sz=128'  WHERE codename = 'continue-dev';
UPDATE public.products SET logo_src = 'https://www.google.com/s2/favicons?domain=bolt.new&sz=128'      WHERE codename = 'bolt-new';
