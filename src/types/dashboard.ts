import type { VentureHealthState, VentureMomentum, DecisionPressure, CapacityPressure, StudioDecision } from "@/types/venture"
import type { IssueFilters, RiskLevel } from "@/types/issue"

export type VentureHealth = {
  ventureId: string
  health: VentureHealthState
  momentum: VentureMomentum
  roadmapConfidence: number
  overdueIssues: number
  blockedIssues: number
  completedThisWeek: number
  activeInitiatives: number
  riskScore: number
  validationConfidence?: number
  gate?: string
  decisionPressure?: DecisionPressure
  capacityPressure?: CapacityPressure
  recommendedDecision?: StudioDecision
  updatedAt: string
}


export type DashboardMetrics = {
  totalIssues: number
  overdueIssues: number
  blockedIssues: number
  activeRoadmapItems: number
  killedRoadmapItems: number
  completedIssues: number
  roadmapConfidenceAverage: number
  ventureDistribution: {
    ventureId: string
    issueCount: number
  }[]
  updatedAt: string
}

export type DashboardSourceType = "issue" | "roadmap" | "assistant"

export type DashboardSource = {
  sourceType: DashboardSourceType
  sourceId: string
}

export type DashboardKpiAction = {
  targetRoute?: "/issues" | "/roadmap"
  issueFilter?: Partial<IssueFilters>
}

export type DashboardSignal = DashboardSource & {
  id: string
  title: string
  severity: RiskLevel
}
