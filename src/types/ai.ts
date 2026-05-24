import type { RiskLevel } from "@/types/issue"

export type AiEntityType = "issue" | "roadmap" | "venture" | "portfolio"

export type AiInsightType =
  | "risk"
  | "priority"
  | "recommendation"
  | "warning"
  | "summary"

export type AiInsight = {
  id: string
  ventureId: string
  entityType: AiEntityType
  entityId: string
  type: AiInsightType
  title: string
  message: string
  confidence: number
  severity: RiskLevel
  suggestedAction?: string
  createdAt: string
}
