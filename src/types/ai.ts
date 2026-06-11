import type { RiskLevel } from "@/types/issue"
import type { StudioDecision } from "@/types/venture"

export type AiEntityType = "issue" | "roadmap" | "venture" | "portfolio"

export type AnalystSignalType =
  | "studio-decision"
  | "evidence-gap"
  | "sunk-cost-risk"
  | "capacity-tradeoff"
  | "gate-confidence"
  | "execution-risk"

export type AnalystConfidence = "low" | "medium" | "high"

export type AiInsightType =
  | "risk"
  | "priority"
  | "recommendation"
  | "warning"
  | "summary"

export type AiRecommendationKind =
  | "continue"
  | "split"
  | "kill"
  | "prioritize"
  | "clarify"
  | "reduce-scope"
  | "narrow"
  | "pause"
  | "staff-up"
  | "defer"
  | "partner-review"

export type AiInsight = {
  id: string
  ventureId: string
  entityType: AiEntityType
  entityId: string
  type: AiInsightType
  title: string
  observation?: string
  reason?: string
  message: string
  confidence: number
  severity: RiskLevel
  recommendationKind?: AiRecommendationKind
  suggestedAction?: string
  createdAt: string
}

export type AiSignalSourceType = AiEntityType

export type AiSignalSourceAction = {
  label: string
  drawerType?: "issue" | "roadmap" | "assistant"
  route?: string
}

export type AnalystSignal = {
  id: string
  ventureId: string
  signalType?: AnalystSignalType
  gateId?: string
  evidenceSignalId?: string
  issueId?: string
  roadmapId?: string
  capacitySignalId?: string
  gateIds?: string[]
  evidenceSignalIds?: string[]
  issueIds?: string[]
  roadmapIds?: string[]
  capacitySignalIds?: string[]
  recommendedDecision: StudioDecision
  title: string
  message: string
  reason: string
  evidenceSummary?: string
  capacityTradeoff?: string
  suggestedAction: string
  confidence?: AnalystConfidence
  confidenceScore?: number
  severity: RiskLevel
  createdAt: string
}
