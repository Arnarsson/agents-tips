import type { Metadata } from 'next';
import { getSEOConfig } from '@/lib/seo-config';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Mail, Sparkles, Zap, TrendingUp, Users } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSEOConfig();

  return {
    title: 'Newsletter - Stay Updated on AI Agents & Tools | agents.tips',
    description: 'Subscribe to our newsletter for weekly updates on new AI agents, tools, industry insights, and curated comparisons. Join 1,000+ developers and founders.',
    openGraph: {
      title: 'Newsletter - Stay Updated on AI Agents & Tools',
      description: 'Subscribe to our newsletter for weekly updates on new AI agents, tools, industry insights, and curated comparisons.',
      type: 'website',
      url: `${config.site.url}/newsletter`,
      images: [config.site.ogImage],
      siteName: config.site.name,
    },
    twitter: {
      card: config.social.twitter.cardType,
      title: 'Newsletter - Stay Updated on AI Agents & Tools',
      description: 'Subscribe to our newsletter for weekly updates on new AI agents, tools, industry insights, and curated comparisons.',
      images: [config.site.ogImage],
    },
    alternates: {
      canonical: `${config.site.url}/newsletter`,
    },
  };
}

export default function NewsletterPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Mail className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Stay in the Loop
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Get weekly insights on AI agents, tools, and industry trends delivered straight to your inbox.
          </p>
        </div>

        {/* Newsletter Signup Form */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-xl mx-auto">
            <NewsletterSignup 
              source="newsletter-page" 
              variant="default"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">New Agent Discoveries</h3>
                <p className="text-muted-foreground">
                  Be the first to know about the latest AI agents and tools hitting the market.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Actionable Insights</h3>
                <p className="text-muted-foreground">
                  Practical tips and strategies for choosing and using AI tools effectively.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Industry Trends</h3>
                <p className="text-muted-foreground">
                  Stay ahead with analysis of emerging trends in AI and automation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Community Picks</h3>
                <p className="text-muted-foreground">
                  Curated recommendations from our community of developers and founders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center space-y-4 py-12 border-t border-border">
          <p className="text-lg font-medium">Join 1,000+ subscribers</p>
          <p className="text-muted-foreground">
            Developers, founders, and AI enthusiasts trust our weekly newsletter
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8 mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How often will I receive emails?</h3>
              <p className="text-muted-foreground">
                We send one carefully curated newsletter per week, typically on Monday mornings. No spam, ever.
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What kind of content will I get?</h3>
              <p className="text-muted-foreground">
                Each newsletter includes new AI agent discoveries, tool comparisons, industry insights, 
                practical tips, and community highlights. All content is curated to be actionable and relevant.
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I unsubscribe anytime?</h3>
              <p className="text-muted-foreground">
                Absolutely! Every email includes an unsubscribe link. No questions asked, no hard feelings.
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Is my email address safe?</h3>
              <p className="text-muted-foreground">
                Yes. We never share, sell, or rent your email address to third parties. Your privacy is important to us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
