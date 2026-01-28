/**
 * Welcome Email Sequence Templates
 * 
 * Three-email onboarding sequence for new newsletter subscribers.
 * Designed to:
 * 1. Welcome + set expectations (Day 0)
 * 2. Deliver immediate value (Day 3)
 * 3. Drive engagement (Day 7)
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

/**
 * Email 1: Immediate Welcome (sent on signup)
 */
export function getWelcomeEmail(subscriberEmail: string): EmailTemplate {
  return {
    subject: "Welcome to agents.tips! Your AI tools journey starts here 🚀",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; border-bottom: 2px solid #f0f0f0; }
            .logo { font-size: 24px; font-weight: bold; color: #000; }
            .content { padding: 30px 0; }
            .cta { display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .cta:hover { background: #333; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; margin-top: 40px; }
            .feature { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
            .feature-title { font-weight: 600; margin-bottom: 8px; }
            ul { padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">agents.tips</div>
            <p style="color: #666; margin-top: 8px;">The AI Agents Directory</p>
          </div>
          
          <div class="content">
            <h1 style="font-size: 28px; margin-bottom: 16px;">Welcome aboard! 👋</h1>
            
            <p>Thanks for joining 1,000+ developers and founders who trust agents.tips for AI tool insights.</p>
            
            <p>You've just unlocked:</p>
            
            <div class="feature">
              <div class="feature-title">🤖 Weekly Agent Discoveries</div>
              <p style="margin: 0; color: #666;">Be first to know about new AI agents hitting the market</p>
            </div>
            
            <div class="feature">
              <div class="feature-title">📊 Side-by-Side Comparisons</div>
              <p style="margin: 0; color: #666;">Honest reviews comparing Cursor vs Windsurf, Claude Code vs Copilot, and more</p>
            </div>
            
            <div class="feature">
              <div class="feature-title">💡 Actionable Insights</div>
              <p style="margin: 0; color: #666;">Practical tips from real builders (no generic AI fluff)</p>
            </div>
            
            <p style="margin-top: 30px;"><strong>What to expect:</strong></p>
            <ul>
              <li>One carefully curated email per week (Mondays)</li>
              <li>New agent spotlights with real-world use cases</li>
              <li>Industry trends from someone who actually builds with these tools</li>
              <li>No spam, ever. Unsubscribe anytime.</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://agents.tips/products" class="cta">Explore the Directory →</a>
            </div>
            
            <p style="background: #fffbea; padding: 16px; border-left: 4px solid #f59e0b; border-radius: 4px;">
              <strong>📮 First email coming your way Monday!</strong><br/>
              In the meantime, check out our <a href="https://agents.tips/products" style="color: #f59e0b;">directory of 200+ AI agents</a>.
            </p>
          </div>
          
          <div class="footer">
            <p>You're receiving this because you subscribed at <a href="https://agents.tips">agents.tips</a></p>
            <p><a href="https://agents.tips/newsletter">Manage preferences</a> | <a href="{{unsubscribe_url}}">Unsubscribe</a></p>
            <p>agents.tips — Built by developers, for developers</p>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to agents.tips! 🚀

Thanks for joining 1,000+ developers and founders who trust agents.tips for AI tool insights.

You've just unlocked:
- 🤖 Weekly Agent Discoveries
- 📊 Side-by-Side Comparisons  
- 💡 Actionable Insights

What to expect:
- One carefully curated email per week (Mondays)
- New agent spotlights with real-world use cases
- Industry trends from someone who actually builds with these tools
- No spam, ever. Unsubscribe anytime.

Explore the Directory: https://agents.tips/products

First email coming your way Monday!

---
You're receiving this because you subscribed at agents.tips
Unsubscribe: {{unsubscribe_url}}
    `,
  };
}

/**
 * Email 2: Value Delivery (Day 3)
 */
export function getValueEmail(subscriberEmail: string): EmailTemplate {
  return {
    subject: "🔥 Top 5 AI Agents You Should Try This Week",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 20px; font-weight: bold; color: #000; }
            .content { padding: 20px 0; }
            .agent-card { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #000; }
            .agent-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
            .agent-category { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
            .agent-description { color: #555; margin-bottom: 12px; }
            .agent-link { color: #000; font-weight: 600; text-decoration: none; }
            .agent-link:hover { text-decoration: underline; }
            .cta { display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">agents.tips</div>
          </div>
          
          <div class="content">
            <h1 style="font-size: 26px; margin-bottom: 16px;">Top 5 AI Agents Worth Your Attention</h1>
            
            <p>Hey there! 👋</p>
            
            <p>Since you joined agents.tips, I wanted to share 5 AI agents that are genuinely changing how developers work. These aren't just hyped tools — they're battle-tested by our community.</p>
            
            <div class="agent-card">
              <div class="agent-category">Coding Agent</div>
              <div class="agent-name">Cursor</div>
              <div class="agent-description">
                The IDE that feels like pair programming with an AI senior dev. Built on VS Code but supercharged with Claude/GPT-4 integration. Best for: rapid prototyping, refactoring legacy code.
              </div>
              <a href="https://agents.tips/products/cursor" class="agent-link">Read full review →</a>
            </div>
            
            <div class="agent-card">
              <div class="agent-category">Automation</div>
              <div class="agent-name">n8n</div>
              <div class="agent-description">
                Open-source workflow automation with AI nodes. Think Zapier but you own the data. Perfect for: connecting APIs, building custom AI pipelines, self-hosted automation.
              </div>
              <a href="https://agents.tips/products/n8n" class="agent-link">Read full review →</a>
            </div>
            
            <div class="agent-card">
              <div class="agent-category">Image Generation</div>
              <div class="agent-name">Midjourney</div>
              <div class="agent-description">
                Still the gold standard for AI image generation. V6 delivers photorealistic results that rival professional photography. Best for: marketing visuals, concept art, rapid iteration.
              </div>
              <a href="https://agents.tips/products/midjourney" class="agent-link">Read full review →</a>
            </div>
            
            <div class="agent-card">
              <div class="agent-category">Voice AI</div>
              <div class="agent-name">ElevenLabs</div>
              <div class="agent-description">
                Frighteningly good voice cloning and text-to-speech. Use cases: podcast production, video voiceovers, multilingual content without re-recording.
              </div>
              <a href="https://agents.tips/products/elevenlabs" class="agent-link">Read full review →</a>
            </div>
            
            <div class="agent-card">
              <div class="agent-category">AI Framework</div>
              <div class="agent-name">LangChain</div>
              <div class="agent-description">
                The Swiss Army knife for building LLM applications. Abstracts away the complexity of chains, agents, memory, and tools. Essential for serious AI development.
              </div>
              <a href="https://agents.tips/products/langchain" class="agent-link">Read full review →</a>
            </div>
            
            <p style="margin-top: 30px;"><strong>Quick comparison:</strong></p>
            <ul>
              <li><strong>Best for speed:</strong> Cursor (code), Midjourney (images)</li>
              <li><strong>Best for control:</strong> n8n (workflows), LangChain (custom agents)</li>
              <li><strong>Best ROI:</strong> ElevenLabs (saves hours on voice work)</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://agents.tips/products" class="cta">Explore 200+ More Agents →</a>
            </div>
            
            <p style="background: #f0f9ff; padding: 16px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <strong>💬 Which agent should I cover next?</strong><br/>
              Hit reply and let me know what you're curious about. I read every response.
            </p>
          </div>
          
          <div class="footer">
            <p><a href="https://agents.tips/newsletter">Manage preferences</a> | <a href="{{unsubscribe_url}}">Unsubscribe</a></p>
            <p>agents.tips — No fluff, just tools that work</p>
          </div>
        </body>
      </html>
    `,
  };
}

/**
 * Email 3: Engagement + Community (Day 7)
 */
export function getCommunityEmail(subscriberEmail: string): EmailTemplate {
  return {
    subject: "How to choose the right AI agent (framework inside)",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { font-size: 20px; font-weight: bold; color: #000; }
            .content { padding: 20px 0; }
            .framework-box { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .framework-step { margin: 16px 0; padding-left: 30px; position: relative; }
            .framework-step::before { content: "✓"; position: absolute; left: 0; font-weight: bold; color: #10b981; }
            .cta { display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .cta-secondary { display: inline-block; border: 2px solid #000; color: #000; padding: 12px 26px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 10px; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; margin-top: 40px; }
            .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">agents.tips</div>
          </div>
          
          <div class="content">
            <h1 style="font-size: 26px; margin-bottom: 16px;">The AI Agent Decision Framework</h1>
            
            <p>Hey! 👋</p>
            
            <p>You've been with us for a week now, and I wanted to share something that took me months to figure out: <span class="highlight">how to actually choose the right AI agent</span>.</p>
            
            <p>There are 1,000+ AI tools out there. Most are noise. Here's how to cut through it:</p>
            
            <div class="framework-box">
              <h3 style="margin-top: 0;">The 5-Question Framework</h3>
              
              <div class="framework-step">
                <strong>1. What's the job to be done?</strong><br/>
                Don't start with "I need an AI coding tool." Start with "I spend 3 hours/day refactoring legacy React components." Specificity = better tool match.
              </div>
              
              <div class="framework-step">
                <strong>2. What's your constraint?</strong><br/>
                Time? Money? Learning curve? Team adoption? Pick your #1 constraint. If it's budget, n8n beats Zapier. If it's speed to value, Cursor beats building custom agents.
              </div>
              
              <div class="framework-step">
                <strong>3. What's your tolerance for lock-in?</strong><br/>
                Proprietary SaaS (fast, polished, vendor risk) vs open source (slower, flexible, you own it). No wrong answer — just be honest about what you can handle.
              </div>
              
              <div class="framework-step">
                <strong>4. Do you need depth or breadth?</strong><br/>
                One tool that does one thing incredibly well (Midjourney for images) vs a platform that's "good enough" at many things (ChatGPT). Specialists usually win for serious work.
              </div>
              
              <div class="framework-step">
                <strong>5. What does your team already use?</strong><br/>
                The best tool is the one your team will actually use. If everyone's in VS Code, Cursor is an easier sell than a brand new IDE.
              </div>
            </div>
            
            <h3>Real Example: Choosing a Coding Agent</h3>
            
            <p><strong>Scenario:</strong> Solo founder building a SaaS MVP, already using VS Code, $50/month budget.</p>
            
            <ul>
              <li><strong>Job:</strong> Speed up React component development</li>
              <li><strong>Constraint:</strong> Budget + learning curve</li>
              <li><strong>Lock-in tolerance:</strong> Low (bootstrapped startup)</li>
              <li><strong>Depth vs breadth:</strong> Depth in frontend code</li>
              <li><strong>Current stack:</strong> VS Code + GitHub Copilot</li>
            </ul>
            
            <p><strong>Decision:</strong> <a href="https://agents.tips/products/cursor" style="color: #000; font-weight: 600;">Cursor</a> ($20/mo) + keep Copilot for Git integration. Upgrade to Claude Code ($40/mo) when revenue hits $1K/mo.</p>
            
            <hr style="margin: 40px 0; border: none; border-top: 1px solid #e0e0e0;">
            
            <h3>Join the Community</h3>
            
            <p>You're not alone in figuring this out. Our community of 1,000+ developers shares:</p>
            <ul>
              <li>Real-world agent performance (beyond marketing hype)</li>
              <li>Cost breakdowns and ROI calculations</li>
              <li>Integration tips and gotchas</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://agents.tips/products/submit-new" class="cta">Submit an Agent →</a>
              <a href="https://agents.tips/products" class="cta-secondary">Browse Directory</a>
            </div>
            
            <p style="background: #f0fdf4; padding: 16px; border-left: 4px solid #10b981; border-radius: 4px;">
              <strong>🎯 Your turn:</strong><br/>
              What's one AI agent you're considering? Hit reply with your scenario and I'll run it through this framework with you (seriously — I read every email).
            </p>
            
            <p style="margin-top: 30px;">That's it! You're now officially part of the agents.tips community. Expect your first Monday newsletter soon.</p>
            
            <p>— Sven<br/>
            <small style="color: #666;">Founder, agents.tips</small></p>
          </div>
          
          <div class="footer">
            <p><a href="https://agents.tips/newsletter">Manage preferences</a> | <a href="{{unsubscribe_url}}">Unsubscribe</a></p>
            <p>agents.tips — Built by developers, for developers</p>
          </div>
        </body>
      </html>
    `,
  };
}

/**
 * Get email template by sequence number
 */
export function getEmailBySequence(
  sequenceNumber: 1 | 2 | 3,
  subscriberEmail: string
): EmailTemplate {
  switch (sequenceNumber) {
    case 1:
      return getWelcomeEmail(subscriberEmail);
    case 2:
      return getValueEmail(subscriberEmail);
    case 3:
      return getCommunityEmail(subscriberEmail);
    default:
      throw new Error(`Invalid sequence number: ${sequenceNumber}`);
  }
}
