"use client"

import { useEffect, useState } from "react"

import { getTutorialProgress, TUTORIAL_STEPS } from "@/lib/tutorial-steps"

// Component to display progress text
export const TutorialProgress = () => {
  const [progress, setProgress] = useState(`0/${TUTORIAL_STEPS.length}`)
  const [mounted, setMounted] = useState(false)

  const updateProgress = () => {
    const { completed, total } = getTutorialProgress()
    setProgress(`${completed}/${total}`)
  }

  useEffect(() => {
    setMounted(true)
    updateProgress()

    // Listen for custom progress update events
    const handleProgressUpdate = () => updateProgress()
    window.addEventListener("tutorialProgressUpdate", handleProgressUpdate)

    // Also listen for storage changes (for cross-tab updates)
    const handleStorageChange = () => updateProgress()
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("tutorialProgressUpdate", handleProgressUpdate)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Prevent hydration mismatch by only showing progress after mount
  if (!mounted) {
    return <span>0/{TUTORIAL_STEPS.length}</span>
  }

  return <span>{progress}</span>
}

// Client-only progress bar component
export const ProgressBar = () => {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)

  const updateProgress = () => {
    const { percentage } = getTutorialProgress()
    setProgress(percentage)
  }

  useEffect(() => {
    setMounted(true)
    updateProgress()

    // Listen for custom progress update events
    const handleProgressUpdate = () => updateProgress()
    window.addEventListener("tutorialProgressUpdate", handleProgressUpdate)

    return () => {
      window.removeEventListener("tutorialProgressUpdate", handleProgressUpdate)
    }
  }, [])

  // Prevent hydration mismatch by only showing progress bar after mount
  if (!mounted) {
    return (
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: "0%" }}
        />
      </div>
    )
  }

  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
