import type { AiInsight } from "@/types/ai"
import type { Issue, IssueFilters, IssueStatus, RiskLevel } from "@/types/issue"
import type { RoadmapItem, RoadmapStatus } from "@/types/roadmap"
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
  targetRoute?: "/issues" | "/roadmap"
  issueFilter?: Partial<IssueFilters>
}

export type StatusCount = {
  status: IssueStatus
  label: string
  count: number
  issueFilter: Partial<IssueFilters>
}

export type DashboardRisk = {
  id: string
  title: string
  ventureName: string
  severity: RiskLevel
  explanation: string
  suggestedAction: string
  sourceType: "issue" | "roadmap" | "assistant"
  sourceId: string
}

export type AttentionItem = {
  id: string
  title: string
  detail: string
  severity: RiskLevel
  sourceType: "issue" | "roadmap" | "assistant"
  sourceId: string
}

export type OperationalActivity = {
  id: string
  title: string
  detail: string
  timestamp: string
  sourceType: "issue" | "roadmap" | "assistant"
  sourceId: string
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
  context: DashboardContext,
  ventures: Venture[] = []
) {
  const ventureIds = new Set(ventures.map((v) => v.id))
  const validInsights = insights.filter(
    (insight) => !insight.ventureId || ventureIds.has(insight.ventureId)
  )

  if (context.mode === "venture" && context.activeVentureId) {
    return validInsights.filter((insight) => insight.ventureId === context.activeVentureId)
  }

  return validInsights
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
      targetRoute: "/issues",
      issueFilter: {},
    },
    {
      label: "Overdue work",
      value: aggregateOverdueCount,
      helper: "Not done or killed",
      tone: aggregateOverdueCount > 0 ? "warning" : "success",
      targetRoute: "/issues",
      issueFilter: { overdueOnly: true },
    },
    {
      label: "Active initiatives",
      value: activeRoadmapItems,
      helper: "Planned, active, or at risk",
      tone: "neutral",
      targetRoute: "/roadmap",
    },
    {
      label: "Killed initiatives",
      value: killedInitiatives,
      helper: "Disciplined stopped work",
      tone: "muted",
      targetRoute: "/roadmap",
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
    issueFilter: { statuses: [status] },
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

function dedupeBySource<T extends { sourceType: string; sourceId: string }>(
  items: T[]
) {
  const seen = new Set<string>()

  return items.filter((item) => {
    const key = `${item.sourceType}:${item.sourceId}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function getRoadmapRiskSeverity(status: RoadmapStatus, riskLevel: RiskLevel) {
  if (status === "at-risk") {
    return riskLevel === "low" ? "medium" : riskLevel
  }

  return riskLevel
}

function getIssueRiskCopy(issue: Issue) {
  if (issue.id === "issue-sentra-analytics-ingestion") {
    return {
      explanation:
        "Activation analytics are blocked, so Sentra cannot trust onboarding experiment results.",
      suggestedAction:
        "Resolve ingestion and event taxonomy before adding new growth scope.",
    }
  }

  if (issue.id === "issue-reson8-positioning-interviews") {
    return {
      explanation:
        "Blocked interviews are delaying the creator retention threshold decision.",
      suggestedAction:
        "Unblock interviews before widening prototype delivery scope.",
    }
  }

  if (issue.id === "issue-reson8-message-threshold") {
    return {
      explanation:
        "The continue, split, or stop threshold is not yet decision-ready.",
      suggestedAction:
        "Define the retained-creator signal before adding delivery work.",
    }
  }

  return {
    explanation: issue.blocked
      ? "Execution is blocked and may affect linked roadmap confidence."
      : "Issue risk is elevated based on priority, date, or confidence.",
    suggestedAction:
      "Clarify the blocker and reduce active scope before adding work.",
  }
}

const severityRank: Record<RiskLevel, number> = {
  high: 0,
  medium: 1,
  low: 2,
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
    .map((issue) => {
      const copy = getIssueRiskCopy(issue)

      return {
        id: `risk-${issue.id}`,
        title: issue.title,
        ventureName: getVentureName(ventures, issue.ventureId),
        severity: issue.riskLevel,
        explanation: copy.explanation,
        suggestedAction: copy.suggestedAction,
        sourceType: "issue" as const,
        sourceId: issue.id,
      }
    })

  const roadmapRisks = roadmapItems
    .filter((item) => item.status === "at-risk" || item.confidence < 50)
    .map((item) => ({
      id: `risk-${item.id}`,
      title: item.title,
      ventureName: getVentureName(ventures, item.ventureId),
      severity: getRoadmapRiskSeverity(item.status, item.riskLevel),
      explanation: "Roadmap confidence is weak or declining.",
      suggestedAction:
        "Review linked execution work and the decision criteria behind it.",
      sourceType: "roadmap" as const,
      sourceId: item.id,
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
      sourceType: "assistant" as const,
      sourceId: insight.id,
    }))

  return dedupeBySource([...issueRisks, ...roadmapRisks, ...insightRisks])
    .sort(
      (a, b) =>
        severityRank[a.severity] - severityRank[b.severity] ||
        Number(b.title.includes("onboarding")) -
          Number(a.title.includes("onboarding"))
    )
    .slice(0, 5)
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

  return dedupeBySource([
    ...decliningRoadmaps.map((item) => ({
      id: `attention-${item.id}`,
      title: `${getVentureName(ventures, item.ventureId)} confidence is declining`,
      detail: `${item.title} is at ${item.confidence}% confidence.`,
      severity: item.riskLevel,
      sourceType: "roadmap" as const,
      sourceId: item.id,
    })),
    ...overdueIssues.map((issue) => ({
      id: `attention-${issue.id}`,
      title: `${getVentureName(ventures, issue.ventureId)} has overdue linked work`,
      detail: issue.title,
      severity: issue.riskLevel,
      sourceType: "issue" as const,
      sourceId: issue.id,
    })),
    ...validationWarnings.map((insight) => ({
      id: `attention-${insight.id}`,
      title: insight.title,
      detail: insight.suggestedAction ?? insight.message,
      severity: insight.severity,
      sourceType: "assistant" as const,
      sourceId: insight.id,
    })),
  ])
    .sort(
      (a, b) =>
        severityRank[a.severity] - severityRank[b.severity] ||
        Number(b.title.includes("Sentra")) - Number(a.title.includes("Sentra"))
    )
    .slice(0, 5)
}

export function getOperationalActivity(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  aiInsights: AiInsight[],
  ventures: Venture[]
): OperationalActivity[] {
  const issueActivity = issues
    .filter(
      (issue) =>
        issue.status === "done" ||
        issue.status === "killed" ||
        issue.blocked ||
        isIssueOverdue(issue)
    )
    .map((issue) => ({
      id: `activity-${issue.id}`,
      title:
        issue.status === "done"
          ? `${getVentureName(ventures, issue.ventureId)} completed execution work`
          : issue.status === "killed"
            ? `${getVentureName(ventures, issue.ventureId)} stopped low-signal work`
            : `${getVentureName(ventures, issue.ventureId)} needs execution attention`,
      detail: issue.title,
      timestamp: issue.updatedAt,
      sourceType: "issue" as const,
      sourceId: issue.id,
      severity:
        issue.blocked || issue.riskLevel === "high"
          ? ("high" as const)
          : issue.status === "done"
            ? ("low" as const)
            : ("medium" as const),
    }))

  const roadmapActivity = roadmapItems
    .filter(
      (item) =>
        item.status === "completed" ||
        item.status === "killed" ||
        item.confidenceTrend === "declining"
    )
    .map((item) => ({
      id: `activity-${item.id}`,
      title:
        item.status === "completed"
          ? `${getVentureName(ventures, item.ventureId)} completed a roadmap milestone`
          : item.status === "killed"
            ? `${getVentureName(ventures, item.ventureId)} recorded a stop decision`
            : `${getVentureName(ventures, item.ventureId)} confidence shifted`,
      detail: item.title,
      timestamp: item.updatedAt,
      sourceType: "roadmap" as const,
      sourceId: item.id,
      severity:
        item.status === "completed"
          ? ("low" as const)
          : item.status === "killed"
            ? ("medium" as const)
            : item.riskLevel,
    }))

  const insightActivity = aiInsights.map((insight) => ({
    id: `activity-${insight.id}`,
    title: `${getVentureName(ventures, insight.ventureId)} AI signal updated`,
    detail: insight.title,
    timestamp: insight.createdAt,
    sourceType: "assistant" as const,
    sourceId: insight.id,
    severity: insight.severity,
  }))

  return [...issueActivity, ...roadmapActivity, ...insightActivity]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 6)
}
