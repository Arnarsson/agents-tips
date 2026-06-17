import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { NewsletterSignup } from "@/components/newsletter-signup"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-bold text-xl mb-4 block">
              agents.tips
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Tools, workflows, and field notes for the agent stack.
            </p>
            <NewsletterSignup source="footer" variant="compact" />
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/watch"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Watch
                </Link>
              </li>
              <li>
                <Link
                  href="/briefs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Arnarsson Briefs
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Workflows
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  href="/dk"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Danmark
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@agents.tips"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} agents.tips. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/agents_tips"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/Arnarsson/agents-tips"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <p className="text-xs text-muted-foreground mt-6 text-center">
          Some links on this site may be affiliate links. We may earn a
          commission when you sign up or purchase through these links, at no
          extra cost to you.
        </p>
      </div>
    </footer>
  )
}
