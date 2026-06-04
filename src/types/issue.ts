import type { ConfidenceImpact, StudioDecision } from "@/types/venture"

export type IssueType =
  | "feature"
  | "bug"
  | "experiment"
  | "tech-debt"
  | "research"

export type IssuePriority = "urgent" | "high" | "medium" | "low"

export type IssueStatus =
  | "backlog"
  | "planned"
  | "in-progress"
  | "in-review"
  | "done"
  | "killed"

export type RiskLevel = "low" | "medium" | "high"

export type IssueEffort = "small" | "medium" | "large"

export type EvidenceRole =
  | "prove"
  | "disprove"
  | "unblock"
  | "de-risk"
  | "capacity-cost"

export type EvidenceStrength = "weak" | "moderate" | "strong" | "negative"

export type OperatorFunction = "product" | "design" | "engineering" | "gtm" | "partner"

export type OperatorImpact = {
  function: OperatorFunction
  effort: "low" | "medium" | "high"
  capacityPercent?: number
  note: string
}

export type IssueSortBy =
  | "priority"
  | "dueDate"
  | "status"
  | "owner"
  | "venture"
  | "updatedAt"

export type SortDirection = "asc" | "desc"

export type Issue = {
  id: string
  ventureId: string
  roadmapId?: string
  title: string
  description: string
  type: IssueType
  priority: IssuePriority
  status: IssueStatus
  ownerId: string
  dueDate?: string
  tags: string[]
  riskLevel: RiskLevel
  confidence: number
  effort: IssueEffort
  blocked: boolean
  acceptanceCriteria?: string[]
  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  evidenceRole?: EvidenceRole
  evidenceStrength?: EvidenceStrength
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision
  aiInsightIds: string[]
  createdAt: string
  updatedAt: string
}

export type IssueFilters = {
  ventureIds: string[]
  priorities: IssuePriority[]
  statuses: IssueStatus[]
  types: IssueType[]
  ownerIds: string[]
  roadmapIds: string[]
  search: string
  overdueOnly: boolean
  roadmapLinkedOnly: boolean
  sortBy: IssueSortBy
  sortDirection: SortDirection
}

