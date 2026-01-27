-- Seed data for agents.tips AI Agents Directory
-- This migration seeds categories, tags, labels, and AI agent products

-- Insert Categories
INSERT INTO public.categories (name, icon) VALUES
('Coding Assistants', '💻'),
('Autonomous Agents', '🤖'),
('Workflow Automation', '⚡'),
('Dev Tools', '🛠️'),
('AI Frameworks', '🏗️'),
('Chat Assistants', '💬'),
('Research Agents', '🔍'),
('Content Creation', '✍️')
ON CONFLICT (name) DO NOTHING;

-- Insert Labels (pricing/deployment models)
INSERT INTO public.labels (name) VALUES
('Open Source'),
('Free'),
('Freemium'),
('Paid'),
('Enterprise'),
('Self-Hosted'),
('Cloud'),
('VS Code'),
('CLI'),
('Web App'),
('Desktop App'),
('Browser Extension')
ON CONFLICT (name) DO NOTHING;

-- Insert Tags (features/capabilities)
INSERT INTO public.tags (name) VALUES
('Code Generation'),
('Code Completion'),
('Refactoring'),
('Bug Fixing'),
('Testing'),
('Documentation'),
('Multi-Agent'),
('LangChain'),
('OpenAI'),
('Anthropic'),
('Local LLMs'),
('Voice Interface'),
('Terminal'),
('IDE Integration'),
('Git Integration'),
('Context Management'),
('Agentic Workflow'),
('Web Automation'),
('Data Analysis'),
('Task Planning')
ON CONFLICT (name) DO NOTHING;

-- Note: In production, you would insert products with actual user_id from auth.users
-- For seed data, you'll need to either:
-- 1. Create a seed user first, or
-- 2. Insert products after user registration in your app
-- 
-- Below is a template for inserting products. Replace {{USER_ID}} with actual UUID from auth.users

-- Example seed products (commented out - uncomment and replace {{USER_ID}} after creating a user)
/*
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
  'clawdbot',
  'Your personal AI agent running 24/7',
  'Clawdbot is a self-hosted AI agent that lives in your terminal, automates workflows, manages tasks, and integrates with your entire development environment. Built on Claude, it supports skills, cron jobs, and multi-channel messaging (Telegram, Signal, WhatsApp, Discord).',
  'https://github.com/cased/clawdbot',
  'Autonomous Agents',
  ARRAY['Multi-Agent', 'Terminal', 'Anthropic', 'Task Planning', 'Context Management'],
  ARRAY['Open Source', 'Self-Hosted', 'CLI'],
  '{{USER_ID}}',
  true,
  true,
  null
),
(
  'cursor',
  'The AI-first code editor',
  'Cursor is a fork of VS Code with built-in AI assistance. Edit code with natural language, get intelligent completions, and chat with your codebase. Supports Claude, GPT-4, and custom models.',
  'https://cursor.sh',
  'Coding Assistants',
  ARRAY['Code Generation', 'Code Completion', 'Refactoring', 'IDE Integration'],
  ARRAY['Freemium', 'Desktop App'],
  '{{USER_ID}}',
  true,
  true,
  null
),
(
  'aider',
  'AI pair programming in your terminal',
  'Aider lets you pair program with LLMs (GPT-4, Claude, etc) to edit code in your local git repo. It makes coordinated code changes across multiple files and commits them automatically.',
  'https://aider.chat',
  'Coding Assistants',
  ARRAY['Code Generation', 'Refactoring', 'Git Integration', 'Terminal'],
  ARRAY['Open Source', 'CLI', 'Free'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'continue',
  'Open-source AI code assistant',
  'Continue is an open-source autopilot for VS Code and JetBrains. Chat with your codebase, generate code, and automate tasks — all with custom models and self-hosting.',
  'https://continue.dev',
  'Coding Assistants',
  ARRAY['Code Generation', 'Code Completion', 'Context Management', 'IDE Integration'],
  ARRAY['Open Source', 'Free', 'Self-Hosted', 'VS Code'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'autogpt',
  'Autonomous AI agent framework',
  'AutoGPT is an open-source autonomous agent that chains together LLM thoughts to achieve goals. Give it a task, and it will break it down, research, execute, and iterate until complete.',
  'https://autogpt.net',
  'Autonomous Agents',
  ARRAY['Task Planning', 'Multi-Agent', 'Agentic Workflow', 'Web Automation'],
  ARRAY['Open Source', 'Free', 'CLI'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'langchain',
  'Framework for building LLM applications',
  'LangChain is the most popular framework for developing applications powered by language models. Chains, agents, memory, document loaders, and integrations for every LLM provider.',
  'https://langchain.com',
  'AI Frameworks',
  ARRAY['Multi-Agent', 'LangChain', 'Context Management', 'Agentic Workflow'],
  ARRAY['Open Source', 'Free'],
  '{{USER_ID}}',
  true,
  true,
  null
),
(
  'crewai',
  'Multi-agent orchestration framework',
  'CrewAI enables you to create autonomous AI agents that work together to complete complex tasks. Define roles, goals, and tools, and let agents collaborate to solve problems.',
  'https://crewai.com',
  'AI Frameworks',
  ARRAY['Multi-Agent', 'Task Planning', 'Agentic Workflow'],
  ARRAY['Open Source', 'Free'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'claude-code',
  'Official Claude CLI for coding',
  'Claude Code is Anthropic''s official CLI for Claude. Chat with Claude in your terminal, edit files, run commands, and manage projects — all with extended thinking and artifact support.',
  'https://github.com/anthropics/claude-code',
  'Coding Assistants',
  ARRAY['Code Generation', 'Terminal', 'Anthropic', 'Context Management'],
  ARRAY['Free', 'CLI', 'Open Source'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'bolt',
  'AI web app builder',
  'Bolt is an AI-powered web development platform. Describe your app, and Bolt will generate, preview, and deploy it — all in your browser. No local setup required.',
  'https://bolt.new',
  'Coding Assistants',
  ARRAY['Code Generation', 'Web Automation'],
  ARRAY['Freemium', 'Web App', 'Cloud'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'v0',
  'Generative UI from Vercel',
  'v0 generates copy-and-paste React components from text prompts. Built on shadcn/ui and Tailwind, it creates production-ready UI code you can customize and deploy.',
  'https://v0.dev',
  'Coding Assistants',
  ARRAY['Code Generation'],
  ARRAY['Freemium', 'Web App'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'lovable',
  'AI full-stack app builder',
  'Lovable (formerly GPT Engineer) builds full-stack web apps from prompts. Generates frontend, backend, database schema, and deploys to production — all automatically.',
  'https://lovable.dev',
  'Coding Assistants',
  ARRAY['Code Generation', 'Web Automation'],
  ARRAY['Freemium', 'Web App', 'Cloud'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'cody',
  'AI coding assistant from Sourcegraph',
  'Cody is an AI code assistant that uses your entire codebase as context. Search, explain, edit, and generate code with awareness of your full repository.',
  'https://sourcegraph.com/cody',
  'Coding Assistants',
  ARRAY['Code Generation', 'Code Completion', 'Context Management', 'IDE Integration'],
  ARRAY['Freemium', 'VS Code', 'Cloud'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'tabnine',
  'AI code completion',
  'Tabnine provides AI-powered code completions trained on your code. Supports local models for privacy, works with all major IDEs, and learns from your codebase.',
  'https://tabnine.com',
  'Coding Assistants',
  ARRAY['Code Completion', 'Local LLMs', 'IDE Integration'],
  ARRAY['Freemium', 'Self-Hosted', 'VS Code'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'amazon-q',
  'AI coding assistant from AWS',
  'Amazon Q is AWS''s AI assistant for developers. Generate code, explain AWS services, debug issues, and optimize cloud infrastructure — all with deep AWS integration.',
  'https://aws.amazon.com/q',
  'Coding Assistants',
  ARRAY['Code Generation', 'Documentation', 'IDE Integration'],
  ARRAY['Freemium', 'Cloud', 'Enterprise'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'gemini-code-assist',
  'Google Cloud AI code assistant',
  'Gemini Code Assist (formerly Duet AI) provides AI-powered code completion, generation, and chat for Google Cloud development. Integrated with Cloud Workstations and IDEs.',
  'https://cloud.google.com/products/gemini/code-assist',
  'Coding Assistants',
  ARRAY['Code Generation', 'Code Completion', 'IDE Integration'],
  ARRAY['Paid', 'Cloud', 'Enterprise'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'replit-agent',
  'AI agent for Replit',
  'Replit Agent builds apps from natural language. Describe what you want, and the agent will write code, install packages, configure infrastructure, and deploy — all in your browser.',
  'https://replit.com/agent',
  'Coding Assistants',
  ARRAY['Code Generation', 'Web Automation', 'Task Planning'],
  ARRAY['Freemium', 'Web App', 'Cloud'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'opencode',
  'Open-source coding agent',
  'OpenCode is an open-source alternative to GitHub Copilot. Supports multiple LLM providers (OpenAI, Anthropic, local models) and works with VS Code, Neovim, and JetBrains.',
  'https://opencode.dev',
  'Coding Assistants',
  ARRAY['Code Generation', 'Code Completion', 'IDE Integration', 'Local LLMs'],
  ARRAY['Open Source', 'Free', 'Self-Hosted'],
  '{{USER_ID}}',
  true,
  false,
  null
),
(
  'codex',
  'OpenAI''s code model',
  'Codex is OpenAI''s code generation model that powers GitHub Copilot. Translates natural language to code across dozens of programming languages.',
  'https://openai.com/blog/openai-codex',
  'AI Frameworks',
  ARRAY['Code Generation', 'OpenAI'],
  ARRAY['Paid', 'Cloud'],
  '{{USER_ID}}',
  true,
  false,
  null
);
*/
