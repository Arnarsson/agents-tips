-- Final 3 agents to reach exactly 200

INSERT INTO public.products (
  codename,
  punchline,
  description,
  product_website,
  categories,
  tags,
  labels,
  user_id,
  approved,
  featured,
  logo_src
) VALUES

(
  'voiceflow',
  'Design, prototype, and build AI agents',
  'Voiceflow is a collaborative platform to design, prototype, and build AI agents and chatbots. Used by teams at leading companies.',
  'https://www.voiceflow.com',
  'Chat Assistants',
  ARRAY['Chatbots', 'Design', 'Prototyping', 'Collaboration'],
  ARRAY['Freemium', 'Cloud', 'Enterprise'],
  '00000000-0000-0000-0000-000000000001',
  true,
  false,
  'https://www.voiceflow.com/favicon.ico'
),
(
  'meshy-ai',
  'AI 3D model generator',
  'Meshy generates 3D models from text prompts and images. Create game assets, 3D prints, and AR content.',
  'https://www.meshy.ai',
  '3D & Gaming',
  ARRAY['3D Generation', 'Text to 3D', 'Game Assets', 'AR'],
  ARRAY['Freemium', 'Cloud'],
  '00000000-0000-0000-0000-000000000001',
  true,
  false,
  'https://www.meshy.ai/favicon.ico'
),
(
  'spline-ai',
  'AI-powered 3D design',
  'Spline AI generates 3D objects, scenes, and textures from text prompts. Design 3D interfaces and experiences.',
  'https://spline.design',
  '3D & Gaming',
  ARRAY['3D Design', 'Text to 3D', 'Interactive', 'Web'],
  ARRAY['Freemium', 'Cloud', 'Web App'],
  '00000000-0000-0000-0000-000000000001',
  true,
  false,
  'https://spline.design/favicon.ico'
)

ON CONFLICT (codename) DO NOTHING;
