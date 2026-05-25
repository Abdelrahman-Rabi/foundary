import type { RiskLevel } from "@/types/issue"

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
