"use client"

import Link from "next/link"
import { AlertCircle, ExternalLink, FileText, Zap } from "lucide-react"

import { resetTutorialProgress } from "@/lib/tutorial-steps"
import { Button } from "@/components/ui/button"

import { useAuth } from "../auth-provider"
import { CodeBlock, InlineCodeBlock } from "./code-block"
import { ProgressBar, TutorialProgress } from "./progress"
import { TutorialStep } from "./tutorial-step"

// Local environment variable check
const hasEnvVars = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
)

interface EmptyStateProps {
  isDev: boolean
}

export function EmptyState({ isDev }: EmptyStateProps) {
  const { isAuthenticated: hasUser } = useAuth()
  // Production mode - show simple empty state
  if (!isDev) {
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-border h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Cult Directory</Link>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-left">
              No Products Found
            </h1>
            <p className="text-muted-foreground max-w-md">
              This directory is currently empty. Products will appear here once
              they are added to the database.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        {/* Hero Section */}
        <div className="flex flex-col justify-center text-left px-4">
          <h1 className="text-3xl font-bold mb-3 text-left">
            Welcome to Your Cult Directory
          </h1>

          <p className="text-muted-foreground max-w-3xl mb-1 text-lg">
            You're running in development mode, but your directory is empty.
            Let's get you started with setting up your cult directory from
            scratch!
          </p>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h2 className="font-medium text-xl mb-4">Setup Steps</h2>

          {hasEnvVars ? (
            <div className="space-y-8">
              {/* Getting Started Steps */}
              {!hasUser ? (
                <ConnectSupabaseSteps hasEnvVars={hasEnvVars} />
              ) : null}

              {/* Auto-Admin Feature Highlight */}
              <div className="border border-border rounded-lg p-6 mb-8 bg-muted/30">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-full bg-background border border-border">
                    <Zap className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      Auto-Admin Promotion
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The first user to sign up for your directory is{" "}
                      <strong>automatically promoted to admin</strong>. No
                      manual SQL queries required during setup.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-8 bg-background">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground text-left text-lg">
                    Final Steps
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTutorialProgress}
                    className="text-xs"
                  >
                    Reset Progress
                  </Button>
                </div>

                {/* Progress Indicator */}
                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <TutorialProgress />
                    </span>
                  </div>
                  <ProgressBar />
                </div>

                <ol className="flex flex-col gap-6">
                  <TutorialStep
                    isCompleted={hasUser}
                    title="Sign Up as First User (Auto-Admin)"
                  >
                    <p>
                      The first user to sign up will automatically become the
                      admin user.{" "}
                      <Link
                        href="/auth/sign-up"
                        className="inline-flex items-center gap-1 text-primary hover:text-foreground transition-colors"
                      >
                        Sign up here <ExternalLink className="w-3 h-3" />
                      </Link>
                    </p>
                  </TutorialStep>

                  <TutorialStep title="Configure Seed URLs">
                    <p>
                      After signing up, edit the{" "}
                      <InlineCodeBlock
                        code="SEED_URLS"
                        showCopyButton={false}
                      />{" "}
                      array in{" "}
                      <InlineCodeBlock
                        code="supabase/seed/src/main.ts"
                        showCopyButton={false}
                      />{" "}
                      to include the websites you want to crawl and enrich.
                    </p>
                  </TutorialStep>

                  <TutorialStep title="Read the Seed Documentation">
                    <p>
                      Review{" "}
                      <InlineCodeBlock
                        code="supabase/seed/src/README.md"
                        showCopyButton={false}
                      />{" "}
                      for detailed information about the 3-stage AI enrichment
                      process.
                    </p>
                  </TutorialStep>

                  <TutorialStep title="Double check that you have an AI API KEY">
                    <p>
                      Make sure you add either the{" "}
                      <InlineCodeBlock
                        code="OPENAI_API_KEY"
                        showCopyButton={false}
                      />{" "}
                      or{" "}
                      <InlineCodeBlock
                        code="ANTHROPIC_API_KEY"
                        showCopyButton={false}
                      />{" "}
                      to the <InlineCodeBlock code=".env.local" /> file.
                    </p>
                  </TutorialStep>

                  <TutorialStep title="Run the AI Enrichment Script">
                    <p>
                      Execute <InlineCodeBlock code="pnpm run enrich-seed" /> to
                      crawl websites, enrich data with AI, and seed your
                      database with products.
                    </p>
                  </TutorialStep>

                  <TutorialStep title="Access Admin Dashboard">
                    <p>
                      Once seeded, access your{" "}
                      <Link
                        href="/admin"
                        className="inline-flex items-center gap-1 text-primary hover:text-foreground transition-colors"
                      >
                        admin dashboard <ExternalLink className="w-3 h-3" />
                      </Link>{" "}
                      to manage products and users.
                    </p>
                  </TutorialStep>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Environment Variables Warning */}

              <div className="border border-border rounded-lg p-8 bg-muted/30 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      Supabase Environment Variables Required
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You need to configure the following environment variables
                      in your .env.local file:
                    </p>
                    <CodeBlock
                      code={`
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_anon_key_here
SUPABASE_SECRET_KEY=your_secret_key_here`}
                    />
                  </div>
                </div>
                <ConnectSupabaseSteps hasEnvVars={hasEnvVars} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ConnectSupabaseSteps({ hasEnvVars }: { hasEnvVars: boolean }) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card/60">
      <h3 className="font-semibold text-lg mb-4 text-foreground">
        Quick Start with Supabase
      </h3>
      <ol className="flex flex-col gap-4">
        <TutorialStep title="Create Supabase project" isCompleted={hasEnvVars}>
          <p>
            Head over to{" "}
            <a
              href="https://database.new"
              target="_blank"
              className="font-medium hover:underline text-foreground"
              rel="noreferrer"
            >
              database.new
            </a>{" "}
            and create a new Supabase project.
          </p>
        </TutorialStep>

        <TutorialStep
          title="Setup environment variables"
          isCompleted={hasEnvVars}
        >
          <p>
            Copy your project API URL and keys from{" "}
            <a
              href="https://app.supabase.com/project/_/settings/api"
              target="_blank"
              className="font-medium hover:underline text-foreground"
              rel="noreferrer"
            >
              your Supabase project's API Settings
            </a>{" "}
            to your <InlineCodeBlock code=".env.local" /> file.
          </p>
          <a
            href="https://supabase.com/blog/jwt-signing-keys"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-lg underline text-foreground flex gap-1 items-center"
          >
            <AlertCircle className="fill-destructive/50 w-4 h-4" /> How to setup
            JWT signing keys (👈READ THIS)
          </a>
          <a
            href="https://youtu.be/rwnOal_xRtM?si=c8lAHEF1mr99CP1h"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-lg underline text-foreground flex gap-1 items-center"
          >
            <AlertCircle className="fill-destructive/50 w-4 h-4" />
            or (WATCH THIS 👉)
          </a>
        </TutorialStep>

        <TutorialStep title="Link CLI to project">
          <p>
            Run <InlineCodeBlock code="npx supabase init" /> and{" "}
            <InlineCodeBlock code="npx supabase link" /> to connect your CLI to
            the project.
          </p>
        </TutorialStep>

        <TutorialStep title="Run database migrations">
          <p>
            Execute <InlineCodeBlock code="npx supabase db push" /> to setup
            your database schema with auto-admin promotion.
          </p>
        </TutorialStep>

        <TutorialStep title="Restart development server">
          <p>
            Restart your Next.js development server to load the new environment
            variables.
          </p>
        </TutorialStep>
      </ol>
    </div>
  )
}
