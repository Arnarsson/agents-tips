-- Update Clawdbot listing with correct information for agents.tips directory
-- Task: 7-246 - Create Clawdbot product listing (third-party tool)
-- NOTE: Clawdbot is created by Peter Steinberger (@steipete), not by agents.tips

-- Update Clawdbot entry with proper product listing information
UPDATE public.products
SET
  product_website = 'https://clawd.bot',
  punchline = 'The AI that actually does things',
  description = E'Clawdbot (also known as Moltbot) is an open-source personal AI assistant that lives in your messaging apps — WhatsApp, Telegram, Discord, Signal, and more.\n\n**What sets it apart:**\n- **Multi-channel:** Works across all your messaging apps, not trapped in a web UI\n- **Autonomous:** Runs shell commands, manages files, controls your browser\n- **Multi-agent:** Spawn sub-agents for parallel tasks\n- **Extensible:** Hackable skills system, community-built extensions\n- **Proactive:** Cron jobs, reminders, background tasks\n- **Memory:** Persistent context across all conversations\n\n**Real-world use cases:**\n- Manage calendar and inbox from WhatsApp\n- Deploy code and run tests via Telegram\n- Control smart home devices\n- Automate workflows across your entire stack\n\n**Pricing:**\nFree and open source (self-hosted)\n\nCreated by Peter Steinberger (@steipete), Clawdbot represents a new category of AI assistant — one that meets you where you already are and truly integrates into your workflow.',
  categories = 'Autonomous Agents',
  tags = ARRAY['Multi-Agent', 'Terminal', 'Anthropic', 'Telegram', 'WhatsApp', 'Discord', 'Signal', 'Webhooks', 'Voice', 'TTS', 'STT', 'Context Management', 'Self-Hosted', 'iMessage', 'Automation', 'Skills'],
  labels = ARRAY['Open Source', 'Self-Hosted', 'Developer Tools', 'Free'],
  full_name = 'Peter Steinberger',
  email = NULL,
  twitter_handle = '@steipete'
WHERE codename = 'clawdbot';

-- Ensure necessary tags exist
INSERT INTO public.tags (name)
VALUES 
  ('Multi-Agent'),
  ('Telegram'),
  ('WhatsApp'),
  ('Discord'),
  ('Signal'),
  ('Webhooks'),
  ('Voice'),
  ('TTS'),
  ('STT'),
  ('Context Management'),
  ('Self-Hosted'),
  ('Anthropic'),
  ('iMessage'),
  ('Automation'),
  ('Skills')
ON CONFLICT (name) DO NOTHING;

-- Ensure necessary labels exist
INSERT INTO public.labels (name)
VALUES 
  ('Open Source'),
  ('Self-Hosted'),
  ('Developer Tools'),
  ('Free')
ON CONFLICT (name) DO NOTHING;

-- Ensure category exists
INSERT INTO public.categories (name, icon)
VALUES 
  ('Autonomous Agents', '🤖'),
  ('Developer Tools', '🛠️')
ON CONFLICT (name) DO NOTHING;
