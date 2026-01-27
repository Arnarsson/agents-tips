#!/usr/bin/env tsx

/**
 * Seed 50 More AI Agents to Supabase
 * 
 * This script:
 * 1. Connects to local Supabase instance
 * 2. Gets or creates a seed user
 * 3. Inserts 50 new AI agents across various categories
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read local Supabase credentials from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const SUPABASE_URL = envContent.match(/NEXT_PUBLIC_SUPABASE_URL="(.+)"/)?.[1] || 'http://127.0.0.1:54321';
const SUPABASE_SECRET_KEY = envContent.match(/SUPABASE_SECRET_KEY="(.+)"/)?.[1] || '';

console.log(`🔌 Connecting to Supabase at ${SUPABASE_URL}...`);

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Seed user email (this user will own all seeded agents)
const SEED_USER_EMAIL = 'seed@agents.tips';
const SEED_USER_PASSWORD = 'seed-password-123';

async function getOrCreateSeedUser(): Promise<string> {
  // First, try to find existing seed user
  const { data: users, error: queryError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', SEED_USER_EMAIL)
    .limit(1);

  if (users && users.length > 0) {
    console.log('✅ Found existing seed user:', users[0].id);
    return users[0].id;
  }

  // If not found, check auth.users directly
  const { data: authData } = await supabase.auth.admin.listUsers();
  const existingUser = authData.users?.find(u => u.email === SEED_USER_EMAIL);
  
  if (existingUser) {
    console.log('✅ Found existing seed user in auth:', existingUser.id);
    return existingUser.id;
  }

  // Create new seed user
  console.log('📝 Creating seed user...');
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: SEED_USER_EMAIL,
    password: SEED_USER_PASSWORD,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    throw new Error(`Failed to create seed user: ${createError?.message}`);
  }

  console.log('✅ Created seed user:', newUser.user.id);
  return newUser.user.id;
}

async function seedAgents(userId: string) {
  console.log('\n🌱 Seeding 50 new AI agents...\n');

  const agents = [
    // WRITING TOOLS (10)
    {
      codename: 'jasper',
      punchline: 'AI content platform for marketing teams',
      description: 'Jasper is an AI writing assistant for creating blog posts, marketing copy, social media content, and more. Trained on best practices, it helps teams produce high-quality content 10x faster with templates, workflows, and brand voice customization.',
      product_website: 'https://jasper.ai',
      categories: 'Writing Tools',
      tags: ['Marketing', 'SEO', 'Content Creation'],
      labels: ['Paid', 'Subscription', 'Web App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'copy-ai',
      punchline: 'AI copywriter for sales and marketing',
      description: 'Copy.ai generates marketing copy, product descriptions, emails, and social media posts. Built for sales and marketing teams who need to scale content production with AI-powered workflows and templates.',
      product_website: 'https://copy.ai',
      categories: 'Writing Tools',
      tags: ['Marketing', 'Content Creation', 'Email Automation'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'writesonic',
      punchline: 'AI writing for blog posts, ads, and emails',
      description: 'Writesonic is an AI writing tool that creates SEO-optimized blog posts, Google ads, landing pages, and more. Includes plagiarism checking, AI article writer, and Chatsonic for conversational AI.',
      product_website: 'https://writesonic.com',
      categories: 'Writing Tools',
      tags: ['SEO', 'Marketing', 'Content Creation'],
      labels: ['Freemium', 'Web App', 'API'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'grammarly',
      punchline: 'AI writing assistant for clarity and correctness',
      description: 'Grammarly checks grammar, spelling, punctuation, and style in real-time. AI-powered suggestions help improve clarity, engagement, and delivery across all your writing, from emails to documents.',
      product_website: 'https://grammarly.com',
      categories: 'Writing Tools',
      tags: ['Documentation'],
      labels: ['Freemium', 'Browser Extension', 'Desktop App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'notion-ai',
      punchline: 'AI assistant inside Notion',
      description: 'Notion AI helps you write, brainstorm, edit, summarize, and translate — all inside your Notion workspace. Perfect for teams already using Notion for docs and knowledge management.',
      product_website: 'https://notion.so/product/ai',
      categories: 'Writing Tools',
      tags: ['Summarization', 'Translation', 'Content Creation'],
      labels: ['Paid', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'chatgpt',
      punchline: 'Conversational AI from OpenAI',
      description: 'ChatGPT is a conversational AI that can write, analyze, brainstorm, and solve problems. Powers everything from customer service to creative writing to coding assistance with GPT-4 and GPT-4o.',
      product_website: 'https://chat.openai.com',
      categories: 'Chat Assistants',
      tags: ['OpenAI', 'Content Creation', 'Code Generation'],
      labels: ['Freemium', 'Web App', 'API'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'claude',
      punchline: 'AI assistant by Anthropic',
      description: 'Claude is Anthropic\'s AI assistant with extended thinking, vision, and coding capabilities. Known for being helpful, harmless, and honest — ideal for analysis, writing, and coding with large context windows.',
      product_website: 'https://claude.ai',
      categories: 'Chat Assistants',
      tags: ['Anthropic', 'Content Creation', 'Code Generation', 'Data Analysis'],
      labels: ['Freemium', 'Web App', 'API'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'wordtune',
      punchline: 'AI writing companion for rewriting',
      description: 'Wordtune helps you rewrite and rephrase sentences to make them clearer, more engaging, or match your tone. Built for writers who want to refine their voice and improve readability.',
      product_website: 'https://wordtune.com',
      categories: 'Writing Tools',
      tags: ['Content Creation'],
      labels: ['Freemium', 'Browser Extension', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'quillbot',
      punchline: 'AI paraphrasing and summarization tool',
      description: 'QuillBot paraphrases text, checks grammar, and summarizes articles. Popular with students and writers for improving clarity and avoiding plagiarism with multiple writing modes.',
      product_website: 'https://quillbot.com',
      categories: 'Writing Tools',
      tags: ['Summarization'],
      labels: ['Freemium', 'Web App', 'Browser Extension'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'rytr',
      punchline: 'AI writing assistant for everyone',
      description: 'Rytr is an affordable AI writing tool for emails, blogs, ads, and social media. Supports 30+ languages and 20+ tones of voice, making it accessible for global content creation.',
      product_website: 'https://rytr.me',
      categories: 'Writing Tools',
      tags: ['Marketing', 'Content Creation', 'Translation'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },

    // IMAGE GENERATION (10)
    {
      codename: 'midjourney',
      punchline: 'AI art generation via Discord',
      description: 'Midjourney creates stunning AI-generated art from text prompts. Known for artistic, high-quality images with unique aesthetic styles, it\'s the go-to tool for designers, artists, and creators.',
      product_website: 'https://midjourney.com',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Design'],
      labels: ['Paid', 'Subscription', 'Web App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'dall-e',
      punchline: 'OpenAI\'s image generation model',
      description: 'DALL·E creates realistic images and art from natural language descriptions. Integrated into ChatGPT, it can generate, edit, and remix images with precision and creative control.',
      product_website: 'https://openai.com/dall-e',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image', 'OpenAI'],
      labels: ['Paid', 'API', 'Web App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'stable-diffusion',
      punchline: 'Open-source image generation model',
      description: 'Stable Diffusion is an open-source text-to-image model you can run locally or in the cloud. Powers countless AI art tools and can be fine-tuned for custom styles and use cases.',
      product_website: 'https://stability.ai/stable-diffusion',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image', 'Local LLMs'],
      labels: ['Open Source', 'Free', 'Self-Hosted'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'leonardo-ai',
      punchline: 'AI image generator for creators',
      description: 'Leonardo.ai generates game assets, concept art, and illustrations. Offers fine control over composition, style, and quality with custom trained models and advanced editing features.',
      product_website: 'https://leonardo.ai',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image', 'Design'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'firefly',
      punchline: 'Adobe\'s generative AI for creatives',
      description: 'Adobe Firefly generates images, text effects, and design elements — all commercially safe. Integrated into Photoshop, Illustrator, and Creative Cloud for seamless creative workflows.',
      product_website: 'https://firefly.adobe.com',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Design'],
      labels: ['Freemium', 'Web App', 'Plugin'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'playground-ai',
      punchline: 'Free AI image creator',
      description: 'Playground AI is a free image generation tool with advanced editing features. Create, mix, and refine images with an intuitive canvas interface and multiple AI models.',
      product_website: 'https://playgroundai.com',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image'],
      labels: ['Free', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'bluewillow',
      punchline: 'AI art generator for everyone',
      description: 'BlueWillow generates AI images through Discord, similar to Midjourney but free. Great for beginners and hobbyists exploring AI art without subscription costs.',
      product_website: 'https://bluewillow.ai',
      categories: 'Image Generation',
      tags: ['Text-to-Image'],
      labels: ['Free', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'artbreeder',
      punchline: 'Collaborative AI art creation',
      description: 'Artbreeder lets you create and remix images using AI. Blend portraits, landscapes, and abstract art, then share and collaborate with a creative community using gene-mixing.',
      product_website: 'https://artbreeder.com',
      categories: 'Image Generation',
      tags: ['Image-to-Image', 'Design'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'nightcafe',
      punchline: 'AI art generator with multiple models',
      description: 'NightCafe offers multiple AI art generation algorithms (Stable Diffusion, DALL·E, etc) in one place. Create, own, and print your AI art with a supportive creator community.',
      product_website: 'https://nightcafe.studio',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'getimg-ai',
      punchline: 'AI image suite for everything',
      description: 'Getimg.ai offers image generation, editing, inpainting, outpainting, and custom AI models — all in one platform. Built for designers who need flexible AI image tools with API access.',
      product_website: 'https://getimg.ai',
      categories: 'Image Generation',
      tags: ['Text-to-Image', 'Image-to-Image'],
      labels: ['Freemium', 'Web App', 'API'],
      user_id: userId,
      approved: true,
      featured: false,
    },

    // VIDEO GENERATION (8)
    {
      codename: 'runway',
      punchline: 'AI video generation and editing',
      description: 'Runway is a video generation platform with text-to-video, image-to-video, motion tracking, and AI editing tools. Used by filmmakers and content creators for cutting-edge video AI.',
      product_website: 'https://runwayml.com',
      categories: 'Video Generation',
      tags: ['Text-to-Video', 'Video Editing'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'pika',
      punchline: 'Idea-to-video platform',
      description: 'Pika turns text and images into videos. Create, edit, and remix video clips with simple prompts — no video editing experience needed. Features modify region and expand canvas.',
      product_website: 'https://pika.art',
      categories: 'Video Generation',
      tags: ['Text-to-Video'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'synthesia',
      punchline: 'AI video generation with avatars',
      description: 'Synthesia creates professional videos with AI avatars and voiceovers. Type your script, choose an avatar, and generate training videos or presentations in 120+ languages.',
      product_website: 'https://synthesia.io',
      categories: 'Video Generation',
      tags: ['Text-to-Speech', 'Marketing'],
      labels: ['Paid', 'Web App', 'Enterprise'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'heygen',
      punchline: 'AI video generator with realistic avatars',
      description: 'HeyGen creates personalized videos with AI avatars that speak any language. Perfect for marketing, training, and localized content at scale with photo-realistic avatars.',
      product_website: 'https://heygen.com',
      categories: 'Video Generation',
      tags: ['Text-to-Speech', 'Translation', 'Marketing'],
      labels: ['Paid', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'descript',
      punchline: 'Video and podcast editing by text',
      description: 'Descript lets you edit video and audio by editing text. Includes AI transcription, voice cloning (Overdub), filler word removal, and studio sound enhancement.',
      product_website: 'https://descript.com',
      categories: 'Video Generation',
      tags: ['Transcription', 'Voice Cloning', 'Video Editing'],
      labels: ['Freemium', 'Desktop App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'fliki',
      punchline: 'Text to video with AI voices',
      description: 'Fliki converts blog posts, tweets, and scripts into videos with AI voiceovers. Includes stock media library and supports 75+ languages for global content creation.',
      product_website: 'https://fliki.ai',
      categories: 'Video Generation',
      tags: ['Text-to-Video', 'Text-to-Speech'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'invideo-ai',
      punchline: 'AI video creation from prompts',
      description: 'InVideo AI generates full videos from text prompts — including script, voiceover, visuals, and music. Built for content creators and marketers who need fast video production.',
      product_website: 'https://invideo.ai',
      categories: 'Video Generation',
      tags: ['Text-to-Video', 'Marketing'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'pictory',
      punchline: 'AI video creation for long-form content',
      description: 'Pictory turns articles and long-form content into short, shareable videos. Auto-generates captions and highlights key moments for social media with AI scene detection.',
      product_website: 'https://pictory.ai',
      categories: 'Video Generation',
      tags: ['Text-to-Video', 'Social Media'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },

    // VOICE AI (7)
    {
      codename: 'elevenlabs',
      punchline: 'AI voice generation and cloning',
      description: 'ElevenLabs generates realistic AI voices and clones your voice from minutes of audio. Used for audiobooks, dubbing, and content creation with emotional control and multi-language support.',
      product_website: 'https://elevenlabs.io',
      categories: 'Voice AI',
      tags: ['Text-to-Speech', 'Voice Cloning', 'Translation'],
      labels: ['Freemium', 'API', 'Web App'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'play-ht',
      punchline: 'AI voice generator for text-to-speech',
      description: 'Play.ht converts text to realistic speech with 600+ AI voices in 142 languages. API and web interface for podcasts, videos, and more with voice cloning capabilities.',
      product_website: 'https://play.ht',
      categories: 'Voice AI',
      tags: ['Text-to-Speech'],
      labels: ['Freemium', 'API', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'murf-ai',
      punchline: 'AI voiceover studio',
      description: 'Murf.ai creates studio-quality voiceovers from text. Choose from 120+ voices, customize pitch and emphasis, and sync to video with timeline editor.',
      product_website: 'https://murf.ai',
      categories: 'Voice AI',
      tags: ['Text-to-Speech'],
      labels: ['Freemium', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'resemble-ai',
      punchline: 'Voice cloning and synthesis',
      description: 'Resemble AI clones voices with high fidelity for gaming, entertainment, and customer service. Real-time voice conversion and emotional control with neural audio editing.',
      product_website: 'https://resemble.ai',
      categories: 'Voice AI',
      tags: ['Voice Cloning', 'Text-to-Speech'],
      labels: ['Paid', 'API', 'Enterprise'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'speechify',
      punchline: 'Text-to-speech for reading',
      description: 'Speechify reads any text aloud with natural AI voices. Popular for accessibility, studying, and consuming written content on the go with speed control and highlighting.',
      product_website: 'https://speechify.com',
      categories: 'Voice AI',
      tags: ['Text-to-Speech'],
      labels: ['Freemium', 'Mobile App', 'Browser Extension'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'whisper',
      punchline: 'OpenAI speech recognition',
      description: 'Whisper is OpenAI\'s open-source speech-to-text model. Supports 99 languages, handles accents and background noise, and runs locally or via API.',
      product_website: 'https://openai.com/research/whisper',
      categories: 'Voice AI',
      tags: ['Speech-to-Text', 'Transcription', 'OpenAI'],
      labels: ['Open Source', 'Free', 'API'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'otter-ai',
      punchline: 'AI meeting transcription',
      description: 'Otter.ai transcribes meetings, interviews, and lectures in real-time. Includes speaker identification, highlights, searchable transcripts, and meeting summaries with action items.',
      product_website: 'https://otter.ai',
      categories: 'Voice AI',
      tags: ['Speech-to-Text', 'Transcription'],
      labels: ['Freemium', 'Web App', 'Mobile App'],
      user_id: userId,
      approved: true,
      featured: false,
    },

    // AUTOMATION PLATFORMS (8)
    {
      codename: 'zapier',
      punchline: 'Workflow automation for everyone',
      description: 'Zapier connects 6,000+ apps to automate workflows without code. Trigger actions, move data, and build multi-step workflows between your favorite tools with Zaps.',
      product_website: 'https://zapier.com',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Email Automation', 'Task Planning'],
      labels: ['Freemium', 'Cloud', 'No-Code'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'make',
      punchline: 'Visual automation platform',
      description: 'Make (formerly Integromat) is a visual automation platform for complex workflows. Build scenarios with drag-and-drop, API calls, routers, and custom logic.',
      product_website: 'https://make.com',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Task Planning', 'API'],
      labels: ['Freemium', 'Cloud', 'No-Code'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'n8n',
      punchline: 'Self-hosted workflow automation',
      description: 'n8n is an open-source alternative to Zapier. Build complex automations with 350+ integrations, custom code nodes, and full data privacy on your own infrastructure.',
      product_website: 'https://n8n.io',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Task Planning'],
      labels: ['Open Source', 'Self-Hosted', 'No-Code'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'activepieces',
      punchline: 'Open-source business automation',
      description: 'Activepieces is a self-hostable no-code automation tool. Connect apps, AI models, and databases to automate business processes with an intuitive visual builder.',
      product_website: 'https://activepieces.com',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Task Planning'],
      labels: ['Open Source', 'Self-Hosted', 'No-Code'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'bardeen',
      punchline: 'Browser automation with AI',
      description: 'Bardeen automates browser workflows with AI. Scrape data, fill forms, and connect web apps — all from a Chrome extension with magic box AI commands.',
      product_website: 'https://bardeen.ai',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Data Extraction'],
      labels: ['Freemium', 'Browser Extension'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'relay',
      punchline: 'Deep workflow automation',
      description: 'Relay combines automation with AI assistance. Build workflows that involve human collaboration, AI steps, and conditional logic with a clean interface.',
      product_website: 'https://relay.app',
      categories: 'Workflow Automation',
      tags: ['Web Automation', 'Task Planning'],
      labels: ['Freemium', 'Cloud', 'No-Code'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'pipedream',
      punchline: 'Connect APIs fast with code',
      description: 'Pipedream is a developer-first integration platform. Build workflows with pre-built actions or custom Node.js code, trigger on any event, and connect 2000+ apps.',
      product_website: 'https://pipedream.com',
      categories: 'Workflow Automation',
      tags: ['API', 'Web Automation'],
      labels: ['Freemium', 'Cloud'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'temporal',
      punchline: 'Durable execution for workflows',
      description: 'Temporal is an open-source orchestration platform for building reliable distributed systems. Write workflows as code with automatic retries, state management, and durability.',
      product_website: 'https://temporal.io',
      categories: 'Workflow Automation',
      tags: ['Task Planning', 'Agentic Workflow'],
      labels: ['Open Source', 'Self-Hosted', 'Enterprise'],
      user_id: userId,
      approved: true,
      featured: false,
    },

    // AI FRAMEWORKS & RESEARCH (7)
    {
      codename: 'perplexity',
      punchline: 'AI-powered research assistant',
      description: 'Perplexity is an AI search engine that answers questions with citations. Combines search, synthesis, and conversational AI for research with pro mode using Claude and GPT-4.',
      product_website: 'https://perplexity.ai',
      categories: 'Research Agents',
      tags: ['Data Analysis', 'Summarization'],
      labels: ['Freemium', 'Web App', 'API'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'phind',
      punchline: 'AI search for developers',
      description: 'Phind is an AI search engine built for developers. Get instant answers with code examples, explanations, and links to documentation with pair programmer mode.',
      product_website: 'https://phind.com',
      categories: 'Research Agents',
      tags: ['Code Generation', 'Documentation'],
      labels: ['Free', 'Web App'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'semantic-kernel',
      punchline: 'Microsoft\'s AI orchestration SDK',
      description: 'Semantic Kernel is Microsoft\'s SDK for integrating AI into apps. Orchestrate LLMs, plugins, and memory with C#, Python, or Java with enterprise-grade patterns.',
      product_website: 'https://github.com/microsoft/semantic-kernel',
      categories: 'AI Frameworks',
      tags: ['Multi-Agent', 'Context Management'],
      labels: ['Open Source', 'Free'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'autogen',
      punchline: 'Multi-agent conversation framework',
      description: 'AutoGen enables development of LLM applications using multiple agents that can converse with each other to solve tasks. From Microsoft Research with flexible conversation patterns.',
      product_website: 'https://microsoft.github.io/autogen',
      categories: 'AI Frameworks',
      tags: ['Multi-Agent', 'Agentic Workflow', 'Task Planning'],
      labels: ['Open Source', 'Free'],
      user_id: userId,
      approved: true,
      featured: true,
    },
    {
      codename: 'llamaindex',
      punchline: 'Data framework for LLM apps',
      description: 'LlamaIndex is a data framework for connecting custom data to LLMs. Build RAG pipelines, knowledge bases, and AI-powered search with data connectors and indexes.',
      product_website: 'https://llamaindex.ai',
      categories: 'AI Frameworks',
      tags: ['Context Management', 'Data Analysis'],
      labels: ['Open Source', 'Free'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'haystack',
      punchline: 'LLM orchestration framework',
      description: 'Haystack is an open-source framework for building search and question-answering systems with LLMs. Includes pipelines, retrievers, and agents for production NLP.',
      product_website: 'https://haystack.deepset.ai',
      categories: 'AI Frameworks',
      tags: ['Context Management', 'Data Analysis'],
      labels: ['Open Source', 'Free'],
      user_id: userId,
      approved: true,
      featured: false,
    },
    {
      codename: 'litellm',
      punchline: 'Unified API for 100+ LLMs',
      description: 'LiteLLM provides a unified interface to call 100+ LLMs (OpenAI, Anthropic, Cohere, etc) with the same API format. Simplifies multi-model apps with load balancing and fallbacks.',
      product_website: 'https://litellm.ai',
      categories: 'AI Frameworks',
      tags: ['OpenAI', 'Anthropic', 'API'],
      labels: ['Open Source', 'Free'],
      user_id: userId,
      approved: true,
      featured: false,
    },
  ];

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const agent of agents) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([agent])
        .select();

      if (error) {
        if (error.code === '23505') {
          // Duplicate key - already exists
          console.log(`⏭️  Skipped ${agent.codename} (already exists)`);
          skipCount++;
        } else {
          console.error(`❌ Error inserting ${agent.codename}:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`✅ Added ${agent.codename}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception inserting ${agent.codename}:`, err);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully added: ${successCount}`);
  console.log(`   ⏭️  Skipped (already exist): ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total agents: ${agents.length}`);
}

async function main() {
  try {
    console.log('🚀 Starting seed process...\n');
    
    const userId = await getOrCreateSeedUser();
    await seedAgents(userId);
    
    console.log('\n✅ Seeding complete!\n');
    console.log('🌐 View your agents at: http://localhost:3000');
    console.log('📊 View database at: http://127.0.0.1:54323');
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
