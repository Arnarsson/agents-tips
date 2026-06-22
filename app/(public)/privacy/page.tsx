import { GradientHeading } from "@/components/ui/gradient-heading"

export const metadata = {
  title: "Privacy Policy — agents.tips",
  description:
    "How agents.tips collects, uses, and protects your information, including analytics, newsletter signups, and affiliate links.",
  alternates: { canonical: "https://agents.tips/privacy" },
  openGraph: {
    title: "Privacy Policy — agents.tips",
    description:
      "How agents.tips collects, uses, and protects your information.",
    url: "https://agents.tips/privacy",
    type: "website",
    images: ["/og-image.png"],
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <GradientHeading size="xl">Privacy Policy</GradientHeading>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p>
            This Privacy Policy explains what information agents.tips
            (&quot;we&quot;, &quot;us&quot;) collects when you use the site, how
            we use it, and the choices you have. By using the site you agree to
            the practices described here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Information we collect
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Newsletter signups.</strong>{" "}
              If you subscribe, we store the email address you provide to send
              you updates. You can unsubscribe at any time.
            </li>
            <li>
              <strong className="text-foreground">Usage analytics.</strong> We
              collect aggregated, privacy-respecting analytics (such as page
              views) to understand how the directory is used.
            </li>
            <li>
              <strong className="text-foreground">Submissions.</strong> If you
              submit a tool, we store the details you provide so we can review
              and publish the listing.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Affiliate links
          </h2>
          <p>
            Some links on this site are affiliate links. We may earn a
            commission when you sign up or purchase through them, at no extra
            cost to you. These links may set cookies controlled by the
            destination service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            How we use information
          </h2>
          <p>
            We use the information we collect to operate and improve the
            directory, send newsletters you opted into, review submissions, and
            keep the site secure. We do not sell your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Your choices</h2>
          <p>
            You can unsubscribe from emails at any time via the link in any
            newsletter. To request access to or deletion of your data, email{" "}
            <a
              href="mailto:contact@agents.tips"
              className="text-primary underline-offset-4 hover:underline"
            >
              contact@agents.tips
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about this policy? Email{" "}
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
