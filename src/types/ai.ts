import type { RiskLevel } from "@/types/issue"
import type { StudioDecision } from "@/types/venture"

export type AiEntityType = "issue" | "roadmap" | "venture" | "portfolio"

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
  gateId?: string
  evidenceSignalId?: string
  issueId?: string
  roadmapId?: string
  recommendedDecision: StudioDecision
  title: string
  message: string
  reason: string
  suggestedAction: string
  severity: RiskLevel
  createdAt: string
}

