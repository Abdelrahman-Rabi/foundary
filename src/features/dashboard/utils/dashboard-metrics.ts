import type { AiInsight } from "@/types/ai"
import type { Issue, IssueStatus, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture, VentureHealthState } from "@/types/venture"

export const DASHBOARD_TODAY = new Date("2026-05-24T00:00:00.000Z")

export const issueStatuses: IssueStatus[] = [
  "backlog",
  "planned",
  "in-progress",
  "in-review",
  "done",
  "killed",
]

export type DashboardContext = {
  mode: "portfolio" | "venture"
  activeVentureId: string | null
}

export type KpiMetric = {
  label: string
  value: number
  helper: string
  tone: "neutral" | "warning" | "success" | "muted"
}

export type StatusCount = {
  status: IssueStatus
  label: string
  count: number
}

export type DashboardRisk = {
  id: string
  title: string
  ventureName: string
  severity: RiskLevel
  explanation: string
  suggestedAction: string
}

export type AttentionItem = {
  id: string
  title: string
  detail: string
  severity: RiskLevel
}

export function getScopedVentures(
  ventures: Venture[],
  context: DashboardContext
) {
  if (context.mode === "venture" && context.activeVentureId) {
    return ventures.filter((venture) => venture.id === context.activeVentureId)
  }

  return ventures
}

export function getScopedIssues(issues: Issue[], context: DashboardContext) {
  if (context.mode === "venture" && context.activeVentureId) {
    return issues.filter((issue) => issue.ventureId === context.activeVentureId)
  }

  return issues
}

export function getScopedRoadmapItems(
  roadmapItems: RoadmapItem[],
  context: DashboardContext
) {
  if (context.mode === "venture" && context.activeVentureId) {
    return roadmapItems.filter(
      (item) => item.ventureId === context.activeVentureId
    )
  }

  return roadmapItems
}

export function getScopedAiInsights(
  insights: AiInsight[],
  context: DashboardContext
) {
  if (context.mode === "venture" && context.activeVentureId) {
    return insights.filter((insight) => insight.ventureId === context.activeVentureId)
  }

  return insights
}

export function isIssueOverdue(issue: Issue, today = DASHBOARD_TODAY) {
  if (!issue.dueDate || issue.status === "done" || issue.status === "killed") {
    return false
  }

  return new Date(`${issue.dueDate}T00:00:00.000Z`) < today
}

export function getVentureName(ventures: Venture[], ventureId: string) {
  return ventures.find((venture) => venture.id === ventureId)?.name ?? "Unknown"
}

export function getKpiMetrics(
  ventures: Venture[],
  issues: Issue[],
  roadmapItems: RoadmapItem[]
): KpiMetric[] {
  const aggregateIssueCount = ventures.reduce(
    (total, venture) => total + venture.activeIssueCount,
    0
  )
  const aggregateOverdueCount = ventures.reduce(
    (total, venture) => total + venture.overdueIssueCount,
    0
  )
  const activeRoadmapItems = roadmapItems.filter((item) =>
    ["active", "at-risk", "planned"].includes(item.status)
  ).length
  const killedInitiatives = roadmapItems.filter(
    (item) => item.status === "killed"
  ).length
  const blockedIssues = issues.filter((issue) => issue.blocked).length

  return [
    {
      label: "Total issues",
      value: aggregateIssueCount,
      helper: `${blockedIssues} blocked in detailed records`,
      tone: "neutral",
    },
    {
      label: "Overdue work",
      value: aggregateOverdueCount,
      helper: "Not done or killed",
      tone: aggregateOverdueCount > 0 ? "warning" : "success",
    },
    {
      label: "Active initiatives",
      value: activeRoadmapItems,
      helper: "Planned, active, or at risk",
      tone: "neutral",
    },
    {
      label: "Killed initiatives",
      value: killedInitiatives,
      helper: "Disciplined stopped work",
      tone: "muted",
    },
  ]
}

export function getStatusCounts(issues: Issue[]): StatusCount[] {
  return issueStatuses.map((status) => ({
    status,
    label: status
      .split("-")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" "),
    count: issues.filter((issue) => issue.status === status).length,
  }))
}

export function getRiskLevelForVenture(venture: Venture): RiskLevel {
  if (venture.health === "critical" || venture.health === "at-risk") {
    return "high"
  }

  if (venture.overdueIssueCount > 3 || venture.confidence < 65) {
    return "medium"
  }

  return "low"
}

export function getHealthLabel(health: VentureHealthState) {
  return health
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

export function getRoadmapOverviewItems(roadmapItems: RoadmapItem[]) {
  return roadmapItems
    .filter((item) => ["active", "at-risk", "planned"].includes(item.status))
    .sort((a, b) => a.confidence - b.confidence)
    .slice(0, 5)
}

export function getDashboardRisks(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  aiInsights: AiInsight[],
  ventures: Venture[]
): DashboardRisk[] {
  const issueRisks = issues
    .filter(
      (issue) =>
        issue.blocked || issue.riskLevel === "high" || isIssueOverdue(issue)
    )
    .map((issue) => ({
      id: `risk-${issue.id}`,
      title: issue.title,
      ventureName: getVentureName(ventures, issue.ventureId),
      severity: issue.riskLevel,
      explanation: issue.blocked
        ? "Execution is blocked and may affect linked roadmap confidence."
        : "Issue risk is elevated based on priority, date, or confidence.",
      suggestedAction: "Clarify the blocker and reduce active scope before adding work.",
    }))

  const roadmapRisks = roadmapItems
    .filter((item) => item.status === "at-risk" || item.confidence < 50)
    .map((item) => ({
      id: `risk-${item.id}`,
      title: item.title,
      ventureName: getVentureName(ventures, item.ventureId),
      severity: item.riskLevel,
      explanation: "Roadmap confidence is weak or declining.",
      suggestedAction: "Reassess linked execution work and validation criteria.",
    }))

  const insightRisks = aiInsights
    .filter((insight) => insight.severity === "high")
    .map((insight) => ({
      id: `risk-${insight.id}`,
      title: insight.title,
      ventureName: getVentureName(ventures, insight.ventureId),
      severity: insight.severity,
      explanation: insight.message,
      suggestedAction: insight.suggestedAction ?? "Review operational context.",
    }))

  return [...issueRisks, ...roadmapRisks, ...insightRisks].slice(0, 5)
}

export function getAttentionItems(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  aiInsights: AiInsight[],
  ventures: Venture[]
): AttentionItem[] {
  const decliningRoadmaps = roadmapItems.filter(
    (item) => item.confidenceTrend === "declining"
  )
  const overdueIssues = issues.filter((issue) => isIssueOverdue(issue))
  const validationWarnings = aiInsights.filter(
    (insight) => insight.type === "warning"
  )

  return [
    ...decliningRoadmaps.map((item) => ({
      id: `attention-${item.id}`,
      title: `${getVentureName(ventures, item.ventureId)} confidence is declining`,
      detail: `${item.title} is at ${item.confidence}% confidence.`,
      severity: item.riskLevel,
    })),
    ...overdueIssues.map((issue) => ({
      id: `attention-${issue.id}`,
      title: `${getVentureName(ventures, issue.ventureId)} has overdue linked work`,
      detail: issue.title,
      severity: issue.riskLevel,
    })),
    ...validationWarnings.map((insight) => ({
      id: `attention-${insight.id}`,
      title: insight.title,
      detail: insight.suggestedAction ?? insight.message,
      severity: insight.severity,
    })),
  ].slice(0, 5)
}
