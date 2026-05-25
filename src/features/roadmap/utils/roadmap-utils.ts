import type { AiInsight } from "@/types/ai"
import type { Issue, IssueStatus } from "@/types/issue"
import type {
  ConfidenceTrend,
  RoadmapItem,
  RoadmapStatus,
  RoadmapTimeframe,
} from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

export type ConfidenceFilter = "all" | "strong" | "moderate" | "uncertain" | "high-risk"

export const roadmapTimeframes: RoadmapTimeframe[] = ["now", "next", "later"]

export const roadmapStatuses: RoadmapStatus[] = [
  "planned",
  "active",
  "at-risk",
  "completed",
  "killed",
]

export const timeframeLabels: Record<RoadmapTimeframe, string> = {
  now: "Now",
  next: "Next",
  later: "Later",
}

export const timeframeDescriptions: Record<RoadmapTimeframe, string> = {
  now: "Active strategic focus",
  next: "Validated upcoming work",
  later: "Future opportunity",
}

export const roadmapStatusLabels: Record<RoadmapStatus, string> = {
  planned: "Planned",
  active: "Active",
  "at-risk": "At risk",
  completed: "Completed",
  killed: "Killed",
}

export const confidenceTrendLabels: Record<ConfidenceTrend, string> = {
  improving: "Improving",
  stable: "Stable",
  declining: "Declining",
}

export const issueStatusLabels: Record<IssueStatus, string> = {
  backlog: "Backlog",
  planned: "Planned",
  "in-progress": "In progress",
  "in-review": "In review",
  done: "Done",
  killed: "Killed",
}

export function getVenture(ventures: Venture[], ventureId: string) {
  return ventures.find((venture) => venture.id === ventureId) ?? null
}

export function getOwner(users: User[], ownerId: string) {
  return users.find((user) => user.id === ownerId) ?? null
}

export function getLinkedIssues(issues: Issue[], item: RoadmapItem) {
  return issues.filter((issue) => item.linkedIssueIds.includes(issue.id))
}

export function getRoadmapInsights(insights: AiInsight[], item: RoadmapItem) {
  return insights.filter(
    (insight) =>
      item.aiInsightIds.includes(insight.id) ||
      (insight.entityType === "roadmap" && insight.entityId === item.id)
  )
}

export function getIssueCompletion(issues: Issue[]) {
  const completed = issues.filter((issue) => issue.status === "done").length
  const killed = issues.filter((issue) => issue.status === "killed").length
  const activeTotal = issues.length - killed
  const percent = activeTotal > 0 ? Math.round((completed / activeTotal) * 100) : 0

  return { completed, killed, total: issues.length, activeTotal, percent }
}

export function getConfidenceLabel(confidence: number) {
  if (confidence >= 80) {
    return "Strong"
  }

  if (confidence >= 60) {
    return "Moderate"
  }

  if (confidence >= 40) {
    return "Uncertain"
  }

  return "High risk"
}

export function getConfidenceFilter(confidence: number): ConfidenceFilter {
  if (confidence >= 80) {
    return "strong"
  }

  if (confidence >= 60) {
    return "moderate"
  }

  if (confidence >= 40) {
    return "uncertain"
  }

  return "high-risk"
}

export function filterRoadmapItems(
  items: RoadmapItem[],
  options: {
    mode: "portfolio" | "venture"
    activeVentureId: string | null
    search: string
    status: RoadmapStatus | "all"
    confidence: ConfidenceFilter
  }
) {
  const search = options.search.trim().toLowerCase()

  return items.filter((item) => {
    const matchesVenture =
      options.mode === "portfolio" ||
      !options.activeVentureId ||
      item.ventureId === options.activeVentureId
    const matchesSearch =
      search.length === 0 ||
      item.title.toLowerCase().includes(search) ||
      item.goal.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    const matchesStatus =
      options.status === "all" || item.status === options.status
    const matchesConfidence =
      options.confidence === "all" ||
      getConfidenceFilter(item.confidence) === options.confidence

    return matchesVenture && matchesSearch && matchesStatus && matchesConfidence
  })
}

export function groupRoadmapItems(items: RoadmapItem[]) {
  return roadmapTimeframes.reduce<Record<RoadmapTimeframe, RoadmapItem[]>>(
    (groups, timeframe) => ({
      ...groups,
      [timeframe]: items.filter((item) => item.timeframe === timeframe),
    }),
    { now: [], next: [], later: [] }
  )
}

export function getConfidenceSummary(items: RoadmapItem[]) {
  const averageConfidence =
    items.length > 0
      ? Math.round(
          items.reduce((total, item) => total + item.confidence, 0) / items.length
        )
      : 0

  return {
    visibleCount: items.length,
    averageConfidence,
    atRiskCount: items.filter(
      (item) => item.status === "at-risk" || item.confidence < 50
    ).length,
    decliningCount: items.filter((item) => item.confidenceTrend === "declining")
      .length,
  }
}

export function formatRoadmapDate(value?: string) {
  if (!value) {
    return "Not set"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value.slice(0, 10)}T00:00:00.000Z`))
}
