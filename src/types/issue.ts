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
  search: string
  overdueOnly: boolean
  roadmapLinkedOnly: boolean
  sortBy: IssueSortBy
  sortDirection: SortDirection
}
