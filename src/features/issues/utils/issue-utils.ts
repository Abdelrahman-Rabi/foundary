import type {
  Issue,
  IssueFilters,
  IssuePriority,
  IssueSortBy,
  IssueStatus,
  IssueType,
  RiskLevel,
  SortDirection,
} from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

export const ISSUE_TODAY = new Date("2026-05-24T00:00:00.000Z")

export const issueStatuses: IssueStatus[] = [
  "backlog",
  "planned",
  "in-progress",
  "in-review",
  "done",
  "killed",
]

export const issuePriorities: IssuePriority[] = [
  "urgent",
  "high",
  "medium",
  "low",
]

export const issueTypes: IssueType[] = [
  "feature",
  "bug",
  "experiment",
  "tech-debt",
  "research",
]

export const statusLabels: Record<IssueStatus, string> = {
  backlog: "Backlog",
  planned: "Planned",
  "in-progress": "In Progress",
  "in-review": "In Review",
  done: "Done",
  killed: "Killed",
}

export const priorityLabels: Record<IssuePriority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
}

export const typeLabels: Record<IssueType, string> = {
  feature: "Feature",
  bug: "Bug",
  experiment: "Experiment",
  "tech-debt": "Tech Debt",
  research: "Research",
}

export const riskLabels: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
}

export const sortLabels: Record<IssueSortBy, string> = {
  priority: "Priority",
  dueDate: "Due date",
  status: "Status",
  owner: "Owner",
  venture: "Venture",
  updatedAt: "Updated",
}

export const sortDirectionLabels: Record<SortDirection, string> = {
  asc: "Ascending",
  desc: "Descending",
}

const priorityRank: Record<IssuePriority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const statusRank: Record<IssueStatus, number> = {
  backlog: 1,
  planned: 2,
  "in-progress": 3,
  "in-review": 4,
  done: 5,
  killed: 6,
}

export function isIssueOverdue(issue: Issue, today = ISSUE_TODAY) {
  if (!issue.dueDate || issue.status === "done" || issue.status === "killed") {
    return false
  }

  return new Date(`${issue.dueDate}T00:00:00.000Z`) < today
}

export function getNextStatus(status: IssueStatus): IssueStatus {
  const index = issueStatuses.indexOf(status)

  return issueStatuses[Math.min(index + 1, issueStatuses.length - 1)] ?? status
}

export function getVenture(ventures: Venture[], ventureId: string) {
  return ventures.find((venture) => venture.id === ventureId) ?? null
}

export function getOwner(users: User[], ownerId: string) {
  return users.find((user) => user.id === ownerId) ?? null
}

export function getRoadmapItem(roadmapItems: RoadmapItem[], roadmapId?: string) {
  if (!roadmapId) {
    return null
  }

  return roadmapItems.find((item) => item.id === roadmapId) ?? null
}

export function formatDate(date?: string) {
  if (!date) {
    return "No date"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export function matchesActiveVenture(issue: Issue, activeVentureId: string | null) {
  if (!activeVentureId) {
    return true
  }

  return issue.ventureId === activeVentureId
}

export function filterIssues(
  issues: Issue[],
  filters: IssueFilters,
  users: User[] = []
) {
  const search = filters.search.trim().toLowerCase()

  return issues.filter((issue) => {
    const owner = getOwner(users, issue.ownerId)
    const matchesSearch =
      search.length === 0 ||
      issue.title.toLowerCase().includes(search) ||
      issue.tags.some((tag) => tag.toLowerCase().includes(search)) ||
      issue.type.toLowerCase().includes(search) ||
      Boolean(owner?.name.toLowerCase().includes(search))

    return (
      matchesSearch &&
      (filters.ventureIds.length === 0 ||
        filters.ventureIds.includes(issue.ventureId)) &&
      (filters.priorities.length === 0 ||
        filters.priorities.includes(issue.priority)) &&
      (filters.statuses.length === 0 ||
        filters.statuses.includes(issue.status)) &&
      (filters.types.length === 0 || filters.types.includes(issue.type)) &&
      (filters.ownerIds.length === 0 || filters.ownerIds.includes(issue.ownerId)) &&
      (!filters.overdueOnly || isIssueOverdue(issue)) &&
      (!filters.roadmapLinkedOnly || Boolean(issue.roadmapId))
    )
  })
}

export function sortIssues(
  issues: Issue[],
  filters: IssueFilters,
  users: User[],
  ventures: Venture[]
) {
  const direction = filters.sortDirection === "asc" ? 1 : -1

  return [...issues].sort((first, second) => {
    const firstValue = getSortValue(first, filters.sortBy, users, ventures)
    const secondValue = getSortValue(second, filters.sortBy, users, ventures)
    const comparison =
      firstValue > secondValue
        ? 1
        : firstValue < secondValue
          ? -1
          : first.title.localeCompare(second.title)

    return comparison * direction
  })
}

function getSortValue(
  issue: Issue,
  sortBy: IssueSortBy,
  users: User[],
  ventures: Venture[]
) {
  if (sortBy === "priority") {
    return priorityRank[issue.priority]
  }

  if (sortBy === "status") {
    return statusRank[issue.status]
  }

  if (sortBy === "owner") {
    return getOwner(users, issue.ownerId)?.name ?? ""
  }

  if (sortBy === "venture") {
    return getVenture(ventures, issue.ventureId)?.name ?? ""
  }

  if (sortBy === "updatedAt") {
    return new Date(issue.updatedAt).getTime()
  }

  return issue.dueDate
    ? new Date(`${issue.dueDate}T00:00:00.000Z`).getTime()
    : Number.MAX_SAFE_INTEGER
}

export function hasMissingCriteria(issue: Issue) {
  return !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0
}

export function hasDecliningRoadmap(issue: Issue, roadmapItems: RoadmapItem[]) {
  const roadmap = getRoadmapItem(roadmapItems, issue.roadmapId)

  return roadmap?.confidenceTrend === "declining"
}
