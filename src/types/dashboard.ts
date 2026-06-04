import type { VentureHealthState, VentureMomentum, DecisionPressure, CapacityPressure, StudioDecision, VenturePhase, ValidationGateStatus } from "@/types/venture"
import type { IssueFilters, RiskLevel, OperatorFunction, EvidenceRole, Issue } from "@/types/issue"
import type { AnalystSignal } from "@/types/ai"

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

export type CommandCenterDecision = {
  ventureId: string
  ventureName: string
  recommendedDecision: StudioDecision
  decisionPressure: DecisionPressure
  reason: string
  gateName?: string
}

export type ValidationRiskSummary = {
  gateId: string
  gateName: string
  ventureId: string
  ventureName: string
  status: ValidationGateStatus
  confidence: number
  assumption: string
  evidenceSignalIds: string[]
}

export type CapacityPressureSummary = {
  id: string
  function: OperatorFunction
  pressure: CapacityPressure
  totalAllocationPercent: number
  affectedVentureIds: string[]
  affectedVentureNames: string[]
  contentionReason: string
  downstreamImpact: string
  sourceIssueIds: string[]
  sourceRoadmapIds: string[]
}

export type ExecutionEvidenceSummary = {
  ventureId: string
  evidenceRoleCounts: Record<EvidenceRole, number>
  recentEvidenceIssues: Issue[]
}

export type CommandCenterData = {
  topDecision: CommandCenterDecision | null
  attentionQueue: Array<{
    ventureId: string
    ventureName: string
    ventureSlug: string
    phase?: VenturePhase
    gateName?: string
    validationConfidence: number
    decisionPressure: DecisionPressure
    capacityPressure: CapacityPressure
    recommendedDecision: StudioDecision
  }>
  validationRisks: ValidationRiskSummary[]
  capacityPressures: CapacityPressureSummary[]
  evidenceSummary: ExecutionEvidenceSummary | null
  analystRecommendation: AnalystSignal | null
}

