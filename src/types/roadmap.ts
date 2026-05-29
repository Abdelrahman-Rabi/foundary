import type { RiskLevel } from "@/types/issue"

export type RoadmapTimeframe = "now" | "next" | "later"

export type RoadmapStatus =
  | "planned"
  | "active"
  | "at-risk"
  | "completed"
  | "killed"

export type ConfidenceTrend = "improving" | "stable" | "declining"

export type RoadmapImpact = "low" | "medium" | "high"

export type RoadmapItem = {
  id: string
  ventureId: string
  title: string
  description: string
  timeframe: RoadmapTimeframe
  goal: string
  status: RoadmapStatus
  ownerId: string
  linkedIssueIds: string[]
  progress: number
  confidence: number
  confidenceTrend: ConfidenceTrend
  impact: RoadmapImpact
  riskLevel: RiskLevel
  targetMetric?: string
  aiInsightIds: string[]
  createdAt: string
  updatedAt: string
}
