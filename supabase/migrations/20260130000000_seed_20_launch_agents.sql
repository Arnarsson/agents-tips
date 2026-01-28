-- Seed 20 AI Agents for agents.tips Launch
-- Curated list covering coding agents, autonomous agents, and agent frameworks

-- First, ensure we have the Coding Agents category
INSERT INTO public.categories (name)
VALUES 
  ('coding_agents'),
  ('autonomous_agents'),
  ('agent_frameworks'),
  ('code_completion'),
  ('app_builders')
ON CONFLICT (name) DO NOTHING;

-- Insert 20 curated AI agents
INSERT INTO public.products (
  codename,
  product_website,
  punchline,
  description,
  logo_src,
  categories,
  tags,
  labels,
  approved,
  featured,
  view_count,
  full_name,
  email,
  twitter_handle
) VALUES 
-- 1. Clawdbot
(
  'clawdbot',
  'https://github.com/svenknobloch/clawdbot',
  'Your AI that actually lives where you do',
  E'Clawdbot is a multi-channel AI assistant that runs across Telegram, Discord, WhatsApp, and more. Unlike chatbots trapped in web UIs, Clawdbot meets you where you already are.\n\nBuilt for builders who want an AI that:\n- Runs shell commands and manages files\n- Controls your browser\n- Integrates with your actual workflow\n- Works across all your devices\n\nIt''s Claude with hands - and it knows how to use them. Self-hosted, extensible, and unapologetically powerful.',
  'https://avatars.githubusercontent.com/u/1878354815',
  'coding_agents',
  ARRAY['ai-assistant', 'telegram-bot', 'discord-bot', 'cli', 'automation'],
  ARRAY['open-source', 'self-hosted'],
  true,
  true,
  0,
  'Sven Knobloch',
  'sven@agents.tips',
  '@svenknobloch'
),

-- 2. Cursor
(
  'cursor',
  'https://cursor.sh',
  'The AI-first code editor',
  E'Cursor is VSCode rebuilt from the ground up for AI-assisted coding. It''s not a plugin - it''s a completely reimagined editor where AI is a first-class citizen.\n\nThe killer features:\n- Cmd+K to edit code with natural language\n- Codebase-aware chat that understands your entire project\n- AI-powered autocomplete that actually gets your style\n- Tab to accept inline suggestions\n\nIf you''re still using Copilot in regular VSCode, you''re missing out. Cursor is what happens when AI isn''t bolted on but built in.',
  'https://cursor.sh/brand/icon.svg',
  'coding_agents',
  ARRAY['code-editor', 'ide', 'ai-coding', 'vscode-fork'],
  ARRAY['freemium', 'popular'],
  true,
  true,
  0,
  'Cursor Team',
  'support@cursor.sh',
  '@cursor_ai'
),

-- 3. Windsurf
(
  'windsurf',
  'https://codeium.com/windsurf',
  'The first agentic IDE',
  E'Windsurf by Codeium takes AI coding beyond autocomplete. It''s an IDE where AI doesn''t just suggest - it flows with you.\n\nWhat sets it apart:\n- Cascade: An agentic mode that tackles multi-file changes\n- Deep codebase awareness across your entire project\n- Built on VSCode but engineered for AI-native workflows\n- Free tier that''s actually usable\n\nWhile Cursor charges $20/month, Windsurf offers serious competition with a generous free plan. It''s the underdog worth betting on.',
  'https://codeium.com/favicon.svg',
  'coding_agents',
  ARRAY['ide', 'ai-coding', 'code-editor', 'agentic'],
  ARRAY['freemium', 'free-tier'],
  true,
  true,
  0,
  'Codeium',
  'support@codeium.com',
  '@caborune'
),

-- 4. Claude Code
(
  'claude-code',
  'https://docs.anthropic.com/en/docs/claude-code',
  'Anthropic''s official CLI coding agent',
  E'Claude Code is Anthropic''s answer to terminal-based AI coding. It''s Claude, but wired directly into your shell.\n\nWhat it does well:\n- Full agentic coding in your terminal\n- Reads and writes files autonomously\n- Runs shell commands with approval\n- Understands your project context deeply\n\nNo VS Code required. If you believe the future of coding is conversational, Claude Code is the purest expression of that vision. Available through Claude Max subscription.',
  'https://www.anthropic.com/favicon.ico',
  'coding_agents',
  ARRAY['cli', 'terminal', 'anthropic', 'claude', 'agentic'],
  ARRAY['subscription', 'claude-max'],
  true,
  true,
  0,
  'Anthropic',
  'support@anthropic.com',
  '@AnthropicAI'
),

-- 5. Codex CLI (OpenAI)
(
  'openai-codex-cli',
  'https://github.com/openai/codex',
  'OpenAI''s terminal coding assistant',
  E'Codex CLI brings OpenAI''s coding models directly to your terminal. It''s the official CLI tool for developers who prefer shells over GUIs.\n\nCore capabilities:\n- Execute coding tasks from natural language\n- File system awareness and manipulation\n- Shell command generation and execution\n- Works with GPT-4 and GPT-4o models\n\nOpenAI''s bet on agentic coding. Still early, but improving rapidly. Requires API credits.',
  'https://openai.com/favicon.ico',
  'coding_agents',
  ARRAY['cli', 'terminal', 'openai', 'gpt-4', 'agentic'],
  ARRAY['api-credits', 'open-source'],
  true,
  false,
  0,
  'OpenAI',
  'support@openai.com',
  '@OpenAI'
),

-- 6. Devin
(
  'devin',
  'https://devin.ai',
  'The first AI software engineer',
  E'Devin by Cognition Labs made headlines as the first "AI software engineer." It''s not an assistant - it''s designed to be a full teammate.\n\nWhat Devin can do:\n- Plan and execute entire coding tasks\n- Debug its own code through iteration\n- Learn unfamiliar technologies on the fly\n- Work autonomously for hours\n\nThe demo videos are impressive. Real-world results vary. But this is the direction we''re heading: AI that doesn''t just help you code, but codes alongside you.',
  'https://devin.ai/favicon.ico',
  'autonomous_agents',
  ARRAY['ai-engineer', 'autonomous', 'coding', 'enterprise'],
  ARRAY['waitlist', 'enterprise'],
  true,
  true,
  0,
  'Cognition Labs',
  'contact@cognition-labs.com',
  '@cognaborune'
),

-- 7. GitHub Copilot
(
  'github-copilot',
  'https://github.com/features/copilot',
  'Your AI pair programmer',
  E'GitHub Copilot is the OG AI coding assistant. Trained on billions of lines of code, it autocompletes your thoughts before you finish typing them.\n\nThe feature set:\n- Inline code suggestions as you type\n- Chat interface in VS Code and JetBrains\n- Copilot Workspace for agentic multi-file edits\n- Deep GitHub integration (issues, PRs, code review)\n\nIt''s the most widely adopted AI coding tool. Not the most powerful anymore, but the most polished. $10/month for individuals.',
  'https://github.githubassets.com/favicons/favicon.svg',
  'code_completion',
  ARRAY['autocomplete', 'vscode', 'jetbrains', 'github'],
  ARRAY['subscription', 'popular'],
  true,
  true,
  0,
  'GitHub',
  'copilot-support@github.com',
  '@GitHubCopilot'
),

-- 8. AutoGPT
(
  'autogpt',
  'https://agpt.co',
  'Build & deploy autonomous AI agents',
  E'AutoGPT kicked off the autonomous agent craze. Give it a goal, and it breaks it down into tasks, executes them, and iterates until done.\n\nThe evolution:\n- Started as a viral GitHub experiment\n- Now a full platform for building agents\n- Agent Builder for no-code agent creation\n- Marketplace for sharing and monetizing agents\n\nThe original vision of "AI that does things for you" keeps getting refined here. Open source at its core.',
  'https://agpt.co/favicon.ico',
  'autonomous_agents',
  ARRAY['autonomous', 'task-driven', 'agent-platform', 'no-code'],
  ARRAY['open-source', 'popular'],
  true,
  true,
  0,
  'AutoGPT',
  'contact@agpt.co',
  '@Auto_GPT'
),

-- 9. LangChain
(
  'langchain',
  'https://langchain.com',
  'Build context-aware reasoning applications',
  E'LangChain is the framework that powers most production LLM apps you''ve used. It''s the plumbing behind the magic.\n\nWhat it provides:\n- Chains: Connect LLM calls with logic\n- Agents: LLMs that decide what actions to take\n- RAG: Retrieval-augmented generation made easy\n- Memory: Persistent context across conversations\n\nIf you''re building anything serious with LLMs, you''ll probably touch LangChain. Python and JS/TS support. Huge ecosystem.',
  'https://langchain.com/favicon.ico',
  'agent_frameworks',
  ARRAY['framework', 'python', 'typescript', 'rag', 'llm-apps'],
  ARRAY['open-source', 'popular'],
  true,
  true,
  0,
  'LangChain',
  'hello@langchain.dev',
  '@LangChainAI'
),

-- 10. CrewAI
(
  'crewai',
  'https://crewai.com',
  'Framework for orchestrating AI agents',
  E'CrewAI lets you build teams of AI agents that work together. Think of it as project management for autonomous AI.\n\nThe core concept:\n- Define Agents with specific roles and goals\n- Create Tasks they need to complete\n- Let them collaborate and hand off work\n- Watch the crew get things done\n\nIt''s LangChain but focused entirely on multi-agent systems. When one agent isn''t enough, CrewAI is how you scale. Python-first, very active development.',
  'https://crewai.com/favicon.ico',
  'agent_frameworks',
  ARRAY['multi-agent', 'orchestration', 'framework', 'python'],
  ARRAY['open-source', 'rising'],
  true,
  true,
  0,
  'CrewAI',
  'contact@crewai.com',
  '@craborune'
),

-- 11. Aider
(
  'aider',
  'https://aider.chat',
  'AI pair programming in your terminal',
  E'Aider is the terminal-first AI coding tool that actually works. No IDE required - just your shell and your repo.\n\nWhy developers love it:\n- Git-aware: commits changes automatically\n- Works with Claude, GPT-4, and local models\n- Edits multiple files coherently\n- Benchmarks consistently top the charts\n\nFree, open source, and absurdly capable. If you prefer vim/neovim or just love the terminal, Aider is your jam.',
  'https://aider.chat/assets/favicon.ico',
  'coding_agents',
  ARRAY['terminal', 'cli', 'git-aware', 'open-source'],
  ARRAY['open-source', 'free'],
  true,
  true,
  0,
  'Paul Gauthier',
  'paul@aider.chat',
  '@paaborune'
),

-- 12. Continue.dev
(
  'continue-dev',
  'https://continue.dev',
  'Open-source AI code assistant',
  E'Continue is the open-source alternative to Copilot and Cursor. Full control, any model, no vendor lock-in.\n\nKey differentiators:\n- Use any LLM: Claude, GPT-4, Llama, Ollama, etc.\n- VS Code and JetBrains extensions\n- Custom slash commands and context providers\n- Self-host or use their cloud\n\nFor teams that need flexibility or can''t send code to third parties, Continue is the answer. Apache 2.0 licensed.',
  'https://continue.dev/favicon.ico',
  'code_completion',
  ARRAY['vscode', 'jetbrains', 'open-source', 'customizable'],
  ARRAY['open-source', 'self-hosted'],
  true,
  false,
  0,
  'Continue',
  'hello@continue.dev',
  '@continuedev'
),

-- 13. Replit Agent
(
  'replit-agent',
  'https://replit.com/agent',
  'Build apps by describing what you want',
  E'Replit Agent turns prompts into deployed apps. Describe your idea, watch it build, ship in minutes.\n\nThe magic:\n- Creates full projects from descriptions\n- Sets up databases, auth, APIs automatically\n- Deploys to Replit hosting instantly\n- Iterates based on your feedback\n\nIt''s the closest thing to "vibe coding" we have. Great for prototypes and MVPs. Less control, more speed.',
  'https://replit.com/public/icons/favicon-196.png',
  'app_builders',
  ARRAY['app-builder', 'no-code', 'deployment', 'prototyping'],
  ARRAY['freemium', 'cloud'],
  true,
  true,
  0,
  'Replit',
  'contact@replit.com',
  '@Replit'
),

-- 14. v0 by Vercel
(
  'v0-vercel',
  'https://v0.dev',
  'Generative UI from prompts',
  E'v0 generates React components from natural language. Describe a UI, get production-ready code with shadcn/ui and Tailwind.\n\nWhat makes it special:\n- Outputs clean, copy-paste-ready code\n- Uses shadcn/ui components (no proprietary stuff)\n- Iterates through conversation\n- Free tier for experimentation\n\nBuilt by Vercel, so the quality bar is high. Best for UI components rather than full apps. Surprisingly good at matching designs.',
  'https://v0.dev/favicon.ico',
  'app_builders',
  ARRAY['ui-generation', 'react', 'tailwind', 'shadcn'],
  ARRAY['freemium', 'popular'],
  true,
  true,
  0,
  'Vercel',
  'support@vercel.com',
  '@v0'
),

-- 15. Bolt.new
(
  'bolt-new',
  'https://bolt.new',
  'Prompt, run, edit, and deploy full-stack apps',
  E'Bolt.new by StackBlitz is an AI-powered full-stack development environment that runs entirely in your browser.\n\nThe workflow:\n- Describe your app in plain English\n- AI generates the full codebase\n- Preview runs instantly (WebContainers magic)\n- Edit with AI assistance, deploy when ready\n\nNo local setup. No waiting for builds. It''s the fastest path from idea to deployed app right now.',
  'https://bolt.new/favicon.ico',
  'app_builders',
  ARRAY['full-stack', 'browser-ide', 'instant-deploy', 'webcontainers'],
  ARRAY['freemium', 'hot'],
  true,
  true,
  0,
  'StackBlitz',
  'hello@stackblitz.com',
  '@stackblitz'
),

-- 16. Lovable
(
  'lovable',
  'https://lovable.dev',
  'The AI full stack engineer',
  E'Lovable (formerly GPT Engineer) transforms prompts into full applications. It''s moved from open-source experiment to serious product.\n\nWhat you get:\n- Full-stack app generation from descriptions\n- Supabase integration for backend\n- GitHub sync for version control\n- One-click deployment\n\nCompeting directly with Bolt and Replit Agent. Strong on React/Next.js apps. Good for people who want more structure than vibe coding.',
  'https://lovable.dev/favicon.ico',
  'app_builders',
  ARRAY['full-stack', 'app-builder', 'supabase', 'react'],
  ARRAY['freemium', 'rising'],
  true,
  false,
  0,
  'Lovable',
  'hello@lovable.dev',
  '@lovaborune'
),

-- 17. Codeium
(
  'codeium',
  'https://codeium.com',
  'Free AI code completion',
  E'Codeium is the free alternative to GitHub Copilot. Same basic functionality, zero monthly cost.\n\nWhat you get for free:\n- Inline code completions\n- Chat interface in IDE\n- Support for 70+ languages\n- VS Code, JetBrains, Vim, and more\n\nThe business model: enterprise sales subsidize free individual use. If you''re cost-conscious or just starting out, Codeium delivers genuine value at $0.',
  'https://codeium.com/favicon.svg',
  'code_completion',
  ARRAY['autocomplete', 'vscode', 'jetbrains', 'vim', 'free'],
  ARRAY['free', 'popular'],
  true,
  false,
  0,
  'Codeium',
  'support@codeium.com',
  '@codeaborune'
),

-- 18. Tabnine
(
  'tabnine',
  'https://tabnine.com',
  'AI code assistant that learns your code',
  E'Tabnine has been doing AI code completion since 2019 - before it was cool. It''s enterprise-focused with strong privacy options.\n\nKey selling points:\n- Runs fully on-device (no code leaves your machine)\n- Learns from your codebase patterns\n- SOC 2 Type II certified\n- Self-hosted options for enterprises\n\nFor companies worried about code privacy, Tabnine is the safest bet. Not the flashiest, but battle-tested and secure.',
  'https://tabnine.com/favicon.ico',
  'code_completion',
  ARRAY['autocomplete', 'privacy-focused', 'on-device', 'enterprise'],
  ARRAY['freemium', 'enterprise'],
  true,
  false,
  0,
  'Tabnine',
  'support@tabnine.com',
  '@Tabnaborune'
),

-- 19. AgentGPT
(
  'agentgpt',
  'https://agentgpt.reworkd.ai',
  'Autonomous AI agents in your browser',
  E'AgentGPT lets you spin up autonomous agents directly in the browser. No setup, no installation - just a goal and go.\n\nHow it works:\n- Enter a goal in natural language\n- Agent breaks it into tasks\n- Executes and iterates autonomously\n- Shows its thinking and progress\n\nOpen source and self-hostable. Great for experimenting with autonomous agents without commitment. Powered by the reworkd team.',
  'https://agentgpt.reworkd.ai/favicon.ico',
  'autonomous_agents',
  ARRAY['browser-based', 'autonomous', 'no-setup', 'task-driven'],
  ARRAY['open-source', 'free'],
  true,
  false,
  0,
  'Reworkd',
  'contact@reworkd.ai',
  '@ReworkdAI'
),

-- 20. Phidata
(
  'phidata',
  'https://phidata.com',
  'Build AI assistants with memory, knowledge, and tools',
  E'Phidata is a framework for building production-ready AI assistants. Think LangChain but more opinionated and batteries-included.\n\nCore features:\n- Built-in memory (conversations persist)\n- Knowledge bases (RAG out of the box)\n- Tool use (web search, APIs, code execution)\n- Structured outputs that actually work\n\nLess flexible than LangChain, more productive for common use cases. Python-first, actively maintained, strong documentation.',
  'https://phidata.com/favicon.ico',
  'agent_frameworks',
  ARRAY['framework', 'python', 'rag', 'memory', 'tools'],
  ARRAY['open-source', 'rising'],
  true,
  false,
  0,
  'Phidata',
  'hello@phidata.com',
  '@phidata'
)
ON CONFLICT (codename) DO UPDATE SET
  product_website = EXCLUDED.product_website,
  punchline = EXCLUDED.punchline,
  description = EXCLUDED.description,
  logo_src = EXCLUDED.logo_src,
  categories = EXCLUDED.categories,
  tags = EXCLUDED.tags,
  labels = EXCLUDED.labels,
  approved = EXCLUDED.approved,
  featured = EXCLUDED.featured;

-- Create tags for better filtering
INSERT INTO public.tags (name)
VALUES 
  ('ai-assistant'),
  ('cli'),
  ('terminal'),
  ('code-editor'),
  ('ide'),
  ('autonomous'),
  ('agentic'),
  ('framework'),
  ('open-source'),
  ('free'),
  ('freemium'),
  ('enterprise'),
  ('popular'),
  ('rising'),
  ('hot')
ON CONFLICT (name) DO NOTHING;

-- Create labels
INSERT INTO public.labels (name)
VALUES 
  ('open-source'),
  ('free'),
  ('freemium'),
  ('subscription'),
  ('enterprise'),
  ('self-hosted'),
  ('popular'),
  ('rising'),
  ('hot'),
  ('waitlist'),
  ('cloud'),
  ('free-tier'),
  ('api-credits'),
  ('claude-max')
ON CONFLICT (name) DO NOTHING;
