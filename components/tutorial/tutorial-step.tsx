"use client"

import { useState } from "react"

import { notifyProgressUpdate } from "@/lib/tutorial-steps"

import { Checkbox } from "../ui/checkbox"

export function TutorialStep({
  title,
  children,
  isCompleted,
}: {
  title: string
  children: React.ReactNode
  isCompleted?: boolean
}) {
  const [checked, setChecked] = useState(() => {
    // Initialize from localStorage on component mount
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`tutorial-step-${title}`)
      return stored ? JSON.parse(stored) : isCompleted || false
    }
    return isCompleted || false
  })

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked)
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`tutorial-step-${title}`, JSON.stringify(checked))
      // Notify progress update
      notifyProgressUpdate()
    }
  }

  return (
    <li className="relative">
      <Checkbox
        id={title}
        name={title}
        className={`absolute top-[3px] mr-2 peer`}
        checked={checked}
        onCheckedChange={handleCheckboxChange}
      />
      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
      >
        <span className="ml-8">{title}</span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
        >
          {children}
        </div>
      </label>
    </li>
  )
}
