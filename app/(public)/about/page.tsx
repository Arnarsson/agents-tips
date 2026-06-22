import Link from "next/link"

import { GradientHeading } from "@/components/ui/gradient-heading"

export const metadata = {
  title: "About — agents.tips",
  description:
    "agents.tips is a curated directory of AI agents, coding assistants, and the tools, workflows, and field notes that power the agent stack.",
  alternates: { canonical: "https://agents.tips/about" },
  openGraph: {
    title: "About — agents.tips",
    description:
      "A curated directory of AI agents, coding assistants, and the tools, workflows, and field notes that power the agent stack.",
    url: "https://agents.tips/about",
    type: "website",
    images: ["/og-image.png"],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <GradientHeading size="xl">About agents.tips</GradientHeading>
        <p className="mt-4 text-lg text-muted-foreground">
          Tools, workflows, and field notes for the agent stack.
        </p>
      </div>

      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          agents.tips is a curated directory of AI agents, coding assistants,
          and the tools that power the modern agent stack. We track what's
          shipping, how practitioners actually use it, and where each tool fits
          in a real workflow.
        </p>
        <p>
          Every listing is reviewed before it goes live. We organize tools by
          category, tag, and label so you can find the right one for the job —
          whether you're picking an autonomous agent, a code editor, or a
          self-hosted runtime.
        </p>
        <p>
          Want your tool listed?{" "}
          <Link
            href="/submit-new"
            className="text-primary underline-offset-4 hover:underline"
          >
            Submit it here
          </Link>
          , or{" "}
          <a
            href="mailto:contact@agents.tips"
            className="text-primary underline-offset-4 hover:underline"
          >
            get in touch
          </a>
          .
        </p>
      </div>
    </div>
  )
}
