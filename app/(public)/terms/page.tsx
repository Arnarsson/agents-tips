import { GradientHeading } from "@/components/ui/gradient-heading"

export const metadata = {
  title: "Terms of Service — agents.tips",
  description:
    "The terms that govern your use of agents.tips, including acceptable use, listings, affiliate disclosures, and liability.",
  alternates: { canonical: "https://agents.tips/terms" },
  openGraph: {
    title: "Terms of Service — agents.tips",
    description: "The terms that govern your use of agents.tips.",
    url: "https://agents.tips/terms",
    type: "website",
    images: ["/og-image.png"],
  },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <GradientHeading size="xl">Terms of Service</GradientHeading>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Acceptance of terms
          </h2>
          <p>
            By accessing or using agents.tips (the &quot;site&quot;) you agree
            to these Terms of Service. If you do not agree, please do not use
            the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Use of the site
          </h2>
          <p>
            agents.tips is provided as a curated directory for informational
            purposes. You agree not to misuse the site, including attempting to
            disrupt it, scraping it in violation of applicable law, or using it
            for any unlawful purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Listings and submissions
          </h2>
          <p>
            Tool listings are curated and may be edited, reordered, or removed
            at our discretion. By submitting a tool you confirm you have the
            right to share the information provided and grant us permission to
            publish it on the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Affiliate disclosure
          </h2>
          <p>
            Some links on this site are affiliate links. We may earn a
            commission when you sign up or purchase through them, at no extra
            cost to you. Listings are curated independently of any affiliate
            relationship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Third-party content
          </h2>
          <p>
            The site links to third-party tools and websites. We are not
            responsible for the content, products, or practices of those third
            parties. Your use of any third-party service is governed by that
            party&apos;s own terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Disclaimer and liability
          </h2>
          <p>
            The site is provided &quot;as is&quot; without warranties of any
            kind. To the fullest extent permitted by law, agents.tips is not
            liable for any damages arising from your use of the site or reliance
            on its content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Changes</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            site after changes take effect constitutes acceptance of the revised
            terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a
              href="mailto:contact@agents.tips"
              className="text-primary underline-offset-4 hover:underline"
            >
              contact@agents.tips
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
