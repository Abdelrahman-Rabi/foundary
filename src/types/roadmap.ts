import type { RiskLevel, OperatorImpact } from "@/types/issue"
import type { ConfidenceImpact, StudioDecision } from "@/types/venture"

export type RoadmapTimeframe = "now" | "next" | "later"

export type RoadmapStatus =
  | "planned"
  | "active"
  | "at-risk"
  | "completed"
  | "killed"

export type ConfidenceTrend = "improving" | "stable" | "declining"

export type RoadmapImpact = "low" | "medium" | "high"

export type RoadmapBetType =
  | "validation"
  | "growth"
  | "delivery"
  | "risk-reduction"
  | "leverage"

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
  manualProgress?: number
  manualConfidence?: number
  confidenceTrend: ConfidenceTrend
  impact: RoadmapImpact
  riskLevel: RiskLevel
  targetMetric?: string
  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  betType?: RoadmapBetType
  expectedEvidence?: string[]
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision
  aiInsightIds: string[]
  createdAt: string
  updatedAt: string
}
