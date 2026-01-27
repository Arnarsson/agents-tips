"use client"

import { useEffect, useState } from "react"
import {
  AlertCircle,
  CheckCircle,
  Info,
  Target,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ContentAnalysis {
  title: {
    length: number
    hasKeyword: boolean
    hasBrand: boolean
    score: number
    suggestions: string[]
  }
  description: {
    length: number
    hasKeyword: boolean
    hasCallToAction: boolean
    score: number
    suggestions: string[]
  }
  content: {
    wordCount: number
    keywordDensity: number
    hasHeadings: boolean
    hasImages: boolean
    score: number
    suggestions: string[]
  }
  overall: {
    score: number
    grade: string
    priorityActions: string[]
  }
}

interface ContentOptimizerProps {
  title: string
  description: string
  content: string
  keywords: string[]
  targetKeyword: string
}

export function ContentOptimizer({
  title,
  description,
  content,
  keywords,
  targetKeyword,
}: ContentOptimizerProps) {
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null)

  useEffect(() => {
    if (title && description && content) {
      const analysisResult = analyzeContent(
        title,
        description,
        content,
        keywords,
        targetKeyword
      )
      setAnalysis(analysisResult)
    }
  }, [title, description, content, keywords, targetKeyword])

  const analyzeContent = (
    title: string,
    description: string,
    content: string,
    keywords: string[],
    targetKeyword: string
  ): ContentAnalysis => {
    const titleAnalysis = analyzeTitle(title, targetKeyword, keywords)
    const descriptionAnalysis = analyzeDescription(
      description,
      targetKeyword,
      keywords
    )
    const contentAnalysis = analyzeContentBody(content, targetKeyword, keywords)

    const overallScore = Math.round(
      (titleAnalysis.score +
        descriptionAnalysis.score +
        contentAnalysis.score) /
        3
    )
    const grade = getGrade(overallScore)

    const priorityActions = []
    if (titleAnalysis.score < 70) priorityActions.push("Optimize title")
    if (descriptionAnalysis.score < 70)
      priorityActions.push("Improve description")
    if (contentAnalysis.score < 70) priorityActions.push("Enhance content")

    return {
      title: titleAnalysis,
      description: descriptionAnalysis,
      content: contentAnalysis,
      overall: {
        score: overallScore,
        grade,
        priorityActions,
      },
    }
  }

  const analyzeTitle = (
    title: string,
    targetKeyword: string,
    keywords: string[]
  ) => {
    const length = title.length
    const hasKeyword = title.toLowerCase().includes(targetKeyword.toLowerCase())
    const hasBrand = title.toLowerCase().includes("cult directory")
    const hasKeywordInKeywords = keywords.some((keyword) =>
      title.toLowerCase().includes(keyword.toLowerCase())
    )

    let score = 100
    if (length < 30) score -= 20
    if (length > 60) score -= 15
    if (!hasKeyword) score -= 30
    if (!hasBrand) score -= 10
    if (!hasKeywordInKeywords) score -= 15

    const suggestions = []
    if (length < 30)
      suggestions.push("Title is too short. Aim for 30-60 characters.")
    if (length > 60)
      suggestions.push("Title is too long. Keep it under 60 characters.")
    if (!hasKeyword)
      suggestions.push(`Include your target keyword: "${targetKeyword}"`)
    if (!hasBrand) suggestions.push("Include your brand name for recognition")

    return {
      length,
      hasKeyword,
      hasBrand,
      score: Math.max(0, score),
      suggestions,
    }
  }

  const analyzeDescription = (
    description: string,
    targetKeyword: string,
    keywords: string[]
  ) => {
    const length = description.length
    const hasKeyword = description
      .toLowerCase()
      .includes(targetKeyword.toLowerCase())
    const hasCallToAction = /(learn|discover|explore|find|get|try|start)/i.test(
      description
    )
    const hasKeywordInKeywords = keywords.some((keyword) =>
      description.toLowerCase().includes(keyword.toLowerCase())
    )

    let score = 100
    if (length < 120) score -= 25
    if (length > 160) score -= 20
    if (!hasKeyword) score -= 30
    if (!hasCallToAction) score -= 15
    if (!hasKeywordInKeywords) score -= 10

    const suggestions = []
    if (length < 120)
      suggestions.push("Description is too short. Aim for 120-160 characters.")
    if (length > 160)
      suggestions.push("Description is too long. Keep it under 160 characters.")
    if (!hasKeyword)
      suggestions.push(`Include your target keyword: "${targetKeyword}"`)
    if (!hasCallToAction)
      suggestions.push("Add a call-to-action word (learn, discover, explore)")

    return {
      length,
      hasKeyword,
      hasCallToAction,
      score: Math.max(0, score),
      suggestions,
    }
  }

  const analyzeContentBody = (
    content: string,
    targetKeyword: string,
    keywords: string[]
  ) => {
    const wordCount = content.split(/\s+/).length
    const keywordDensity =
      ((content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1) /
        wordCount) *
      100
    const hasHeadings = /<h[1-6]>/i.test(content) || content.includes("#")
    const hasImages = /<img|!\[/i.test(content)

    let score = 100
    if (wordCount < 300) score -= 30
    if (wordCount > 2000) score -= 10
    if (keywordDensity < 0.5) score -= 20
    if (keywordDensity > 2.5) score -= 20
    if (!hasHeadings) score -= 15
    if (!hasImages) score -= 10

    const suggestions = []
    if (wordCount < 300)
      suggestions.push("Content is too short. Aim for at least 300 words.")
    if (wordCount > 2000)
      suggestions.push(
        "Content is very long. Consider breaking it into sections."
      )
    if (keywordDensity < 0.5)
      suggestions.push(
        "Keyword density is too low. Naturally include your target keyword more."
      )
    if (keywordDensity > 2.5)
      suggestions.push("Keyword density is too high. Avoid keyword stuffing.")
    if (!hasHeadings) suggestions.push("Add headings to structure your content")
    if (!hasImages)
      suggestions.push("Include relevant images to improve engagement")

    return {
      wordCount,
      keywordDensity: Math.round(keywordDensity * 100) / 100,
      hasHeadings,
      hasImages,
      score: Math.max(0, score),
      suggestions,
    }
  }

  const getGrade = (score: number): string => {
    if (score >= 90) return "A+"
    if (score >= 80) return "A"
    if (score >= 70) return "B"
    if (score >= 60) return "C"
    if (score >= 50) return "D"
    return "F"
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (!analysis) return null

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Overall SEO Score: {analysis.overall.score}/100
          </CardTitle>
          <CardDescription>
            Grade:{" "}
            <span className="font-bold text-2xl">{analysis.overall.grade}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Priority Actions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.overall.priorityActions.map((action, index) => (
              <Badge key={index} variant="outline" className="bg-white">
                {action}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Title Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {analysis.title.score >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            )}
            Title Analysis
          </CardTitle>
          <CardDescription>
            Score:{" "}
            <span className={getScoreColor(analysis.title.score)}>
              {analysis.title.score}/100
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Length: {analysis.title.length} characters</span>
              <span
                className={
                  analysis.title.length >= 30 && analysis.title.length <= 60
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.title.length >= 30 && analysis.title.length <= 60
                  ? "✓"
                  : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Contains target keyword</span>
              <span
                className={
                  analysis.title.hasKeyword ? "text-green-600" : "text-red-600"
                }
              >
                {analysis.title.hasKeyword ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Contains brand name</span>
              <span
                className={
                  analysis.title.hasBrand ? "text-green-600" : "text-red-600"
                }
              >
                {analysis.title.hasBrand ? "✓" : "✗"}
              </span>
            </div>
            {analysis.title.suggestions.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <div className="font-medium mb-1">Suggestions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.title.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {analysis.description.score >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            )}
            Meta Description Analysis
          </CardTitle>
          <CardDescription>
            Score:{" "}
            <span className={getScoreColor(analysis.description.score)}>
              {analysis.description.score}/100
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Length: {analysis.description.length} characters</span>
              <span
                className={
                  analysis.description.length >= 120 &&
                  analysis.description.length <= 160
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.description.length >= 120 &&
                analysis.description.length <= 160
                  ? "✓"
                  : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Contains target keyword</span>
              <span
                className={
                  analysis.description.hasKeyword
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.description.hasKeyword ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Has call-to-action</span>
              <span
                className={
                  analysis.description.hasCallToAction
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.description.hasCallToAction ? "✓" : "✗"}
              </span>
            </div>
            {analysis.description.suggestions.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <div className="font-medium mb-1">Suggestions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.description.suggestions.map(
                        (suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {analysis.content.score >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            )}
            Content Analysis
          </CardTitle>
          <CardDescription>
            Score:{" "}
            <span className={getScoreColor(analysis.content.score)}>
              {analysis.content.score}/100
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Word count: {analysis.content.wordCount}</span>
              <span
                className={
                  analysis.content.wordCount >= 300
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.content.wordCount >= 300 ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Keyword density: {analysis.content.keywordDensity}%</span>
              <span
                className={
                  analysis.content.keywordDensity >= 0.5 &&
                  analysis.content.keywordDensity <= 2.5
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.content.keywordDensity >= 0.5 &&
                analysis.content.keywordDensity <= 2.5
                  ? "✓"
                  : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Has headings</span>
              <span
                className={
                  analysis.content.hasHeadings
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {analysis.content.hasHeadings ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Has images</span>
              <span
                className={
                  analysis.content.hasImages ? "text-green-600" : "text-red-600"
                }
              >
                {analysis.content.hasImages ? "✓" : "✗"}
              </span>
            </div>
            {analysis.content.suggestions.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <div className="font-medium mb-1">Suggestions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.content.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
