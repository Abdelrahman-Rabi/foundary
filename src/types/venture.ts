import type { EvidenceStrength, OperatorFunction } from "@/types/issue"

export type VentureStage = "idea" | "validation" | "mvp" | "growth"

export type VenturePhase = "explore" | "validate" | "build" | "scale"

export type StudioDecision =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"

export type DecisionPressure = "low" | "medium" | "high" | "critical"

export type ConfidenceImpact = "increase" | "decrease" | "neutral"

export type CapacityPressure = "healthy" | "watch" | "overloaded"

export type VentureHealthState = "strong" | "stable" | "at-risk" | "critical"

export type VentureMomentum = "high" | "moderate" | "slow"

export type Venture = {
  id: string
  name: string
  slug: string
  description: string
  stage: VentureStage
  phase?: VenturePhase
  health: VentureHealthState
  momentum: VentureMomentum
  color: string
  icon: string
  currentGateId?: string
  recommendedDecision?: StudioDecision
  decisionPressure?: DecisionPressure
  activeRoadmapCount: number
  activeIssueCount: number
  overdueIssueCount: number
  progress: number
  confidence: number
  createdAt: string
  updatedAt: string
}

export type CreateVentureInput = {
  name: string
  description: string
  stage: VentureStage
}

export type ValidationGateStatus =
  | "healthy"
  | "watch"
  | "at-risk"
  | "blocked"
  | "passed"
  | "failed"

export type ValidationGate = {
  id: string
  ventureId: string
  phase: VenturePhase
  name: string
  description: string
  assumption: string
  requiredEvidence: string[]
  evidenceSignalIds: string[]
  linkedIssueIds: string[]
  linkedRoadmapIds: string[]
  confidence: number
  status: ValidationGateStatus
  decisionPressure: DecisionPressure
  recommendedDecision: StudioDecision
  decisionReason: string
  updatedAt: string
}

export type OperatorAllocation = {
  id: string
  ventureId: string
  function: OperatorFunction
  operatorName?: string
  allocationPercent: number
  pressure: CapacityPressure
  impact: string
  linkedIssueIds: string[]
  linkedRoadmapIds: string[]
  updatedAt: string
}

export type CapacitySignal = {
  id: string
  function: OperatorFunction
  pressure: CapacityPressure
  totalAllocationPercent: number
  affectedVentureIds: string[]
  contentionReason: string
  downstreamImpact: string
  recommendedDecision?: StudioDecision
  sourceIssueIds: string[]
  sourceRoadmapIds: string[]
}


export type EvidenceSignal = {
  id: string
  ventureId: string
  gateId: string
  title: string
  summary: string
  signalType:
    | "customer-interview"
    | "activation"
    | "retention"
    | "conversion"
    | "revenue"
    | "technical-risk"
    | "capacity"
    | "market"
    | "qualitative"
  strength: EvidenceStrength
  confidenceImpact: ConfidenceImpact
  sourceIssueIds: string[]
  sourceRoadmapIds: string[]
  observedAt: string
}



