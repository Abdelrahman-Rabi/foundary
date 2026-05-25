import type {
  AiInsight,
  AiRecommendationKind,
  AiInsightType,
} from "@/types/ai"
import type { Issue, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import {
  getLinkedIssues,
  getSyncedRoadmapMetrics,
} from "@/features/synchronization/utils/sync-utils"

const TODAY = new Date("2026-05-24T00:00:00.000Z")

export type AiSignal = {
  id: string
  title: string
  type: AiInsightType
  severity: RiskLevel
  confidence: number
  ventureId?: string
  entityType: "issue" | "roadmap" | "venture" | "portfolio"
  entityId?: string
  recommendationKind?: AiRecommendationKind
  observation: string
  reason: string
  suggestedAction: string
}

export type AssistantSummary = {
  activeInsights: number
  highRiskSignals: number
  unclearIssues: number
  decliningRoadmaps: number
}

export function isIssueOverdue(issue: Issue, today = TODAY) {
  if (!issue.dueDate || issue.status === "done" || issue.status === "killed") {
    return false
  }

  return new Date(`${issue.dueDate}T00:00:00.000Z`) < today
}

export function getScopedAssistantData(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[],
  insights: AiInsight[],
  context: { mode: "portfolio" | "venture"; activeVentureId: string | null }
) {
  if (context.mode === "venture" && context.activeVentureId) {
    return {
      issues: issues.filter((issue) => issue.ventureId === context.activeVentureId),
      roadmapItems: roadmapItems.filter(
        (item) => item.ventureId === context.activeVentureId
      ),
      ventures: ventures.filter((venture) => venture.id === context.activeVentureId),
      insights: insights.filter(
        (insight) => insight.ventureId === context.activeVentureId
      ),
    }
  }

  return { issues, roadmapItems, ventures, insights }
}

export function getVentureName(ventures: Venture[], ventureId?: string) {
  if (!ventureId) {
    return "Portfolio"
  }

  return ventures.find((venture) => venture.id === ventureId)?.name ?? "Unknown"
}

export function getIssueSummary(
  issue: Issue,
  roadmapItems: RoadmapItem[],
  ventures: Venture[]
) {
  const ventureName = getVentureName(ventures, issue.ventureId)
  const roadmap = roadmapItems.find((item) => item.id === issue.roadmapId)
  const state = issue.blocked
    ? "blocked"
    : isIssueOverdue(issue)
      ? "overdue"
      : issue.status.replace("-", " ")

  return `${ventureName} ${issue.type.replace("-", " ")} work is ${state}${
    roadmap ? ` and linked to ${roadmap.title}` : ""
  }.`
}

export function getIssueSignals(
  issue: Issue,
  roadmapItems: RoadmapItem[],
  ventures: Venture[]
): AiSignal[] {
  const roadmap = roadmapItems.find((item) => item.id === issue.roadmapId)
  const ventureName = getVentureName(ventures, issue.ventureId)
  const signals: AiSignal[] = []
  const missingCriteria =
    !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0

  if (issue.blocked || isIssueOverdue(issue)) {
    signals.push({
      id: `issue-risk-${issue.id}`,
      title: issue.blocked ? "Blocked execution risk" : "Overdue delivery risk",
      type: "risk",
      severity: issue.blocked ? "high" : "medium",
      confidence: issue.blocked ? 86 : 73,
      ventureId: issue.ventureId,
      entityType: "issue",
      entityId: issue.id,
      recommendationKind: "reduce-scope",
      observation: `${ventureName} has ${
        issue.blocked ? "blocked" : "overdue"
      } work affecting execution confidence.`,
      reason: roadmap
        ? `The issue is linked to ${roadmap.title}, so delivery friction can affect roadmap confidence.`
        : "The issue is not linked to a strategic initiative, which can make priority tradeoffs less clear.",
      suggestedAction:
        "Clarify the blocker and reduce active scope before adding related work.",
    })
  }

  if (missingCriteria) {
    signals.push({
      id: `issue-clarity-${issue.id}`,
      title: "Completion criteria need definition",
      type: "warning",
      severity: "medium",
      confidence: 78,
      ventureId: issue.ventureId,
      entityType: "issue",
      entityId: issue.id,
      recommendationKind: "clarify",
      observation: "The issue lacks measurable acceptance criteria.",
      reason:
        "Undefined completion conditions can weaken handoff quality and roadmap confidence.",
      suggestedAction:
        "Define validation conditions and expected delivery outcomes before implementation continues.",
    })
  }

  if (roadmap && roadmap.confidenceTrend === "declining") {
    signals.push({
      id: `issue-roadmap-${issue.id}`,
      title: "Linked roadmap confidence is declining",
      type: "recommendation",
      severity: roadmap.confidence < 50 ? "high" : "medium",
      confidence: 81,
      ventureId: issue.ventureId,
      entityType: "issue",
      entityId: issue.id,
      recommendationKind: "prioritize",
      observation: `${roadmap.title} is trending down at ${roadmap.confidence}% confidence.`,
      reason:
        "Issue progress is directly connected to the initiative's confidence signal.",
      suggestedAction:
        "Prioritize the linked execution path before expanding initiative scope.",
    })
  }

  return signals
}

export function getRoadmapSignals(
  item: RoadmapItem,
  issues: Issue[],
  ventures: Venture[]
): AiSignal[] {
  const linkedIssues = getLinkedIssues(issues, item)
  const metrics = getSyncedRoadmapMetrics(item, issues)
  const blockedCount = metrics.blockedIssues
  const overdueCount = metrics.overdueIssues
  const completion = metrics.progress
  const missingOutcome = !item.targetMetric
  const recommendationKind = getRoadmapRecommendationKind(
    item,
    blockedCount,
    overdueCount,
    completion,
    metrics.confidence,
    missingOutcome
  )
  const ventureName = getVentureName(ventures, item.ventureId)
  const severity: RiskLevel =
    metrics.confidence < 40 || blockedCount > 0
      ? "high"
      : metrics.confidence < 65 || overdueCount > 0 || missingOutcome
        ? "medium"
        : "low"
  const targetOutcome = item.targetMetric
    ? ` Target outcome: ${item.targetMetric}.`
    : " Target outcome is not defined."

  return [
    {
      id: `roadmap-confidence-${item.id}`,
      title: "Roadmap confidence analysis",
      type: "summary",
      severity,
      confidence: Math.max(58, Math.min(89, metrics.confidence + 12)),
      ventureId: item.ventureId,
      entityType: "roadmap",
      entityId: item.id,
      recommendationKind,
      observation: `${ventureName} ${item.title} is at ${metrics.confidence}% confidence with ${completion}% linked issue progress.${targetOutcome}`,
      reason: getRoadmapReason(
        item,
        blockedCount,
        overdueCount,
        completion,
        missingOutcome,
        linkedIssues.length,
        metrics.confidence
      ),
      suggestedAction: getRoadmapAction(recommendationKind),
    },
  ]
}

export function getInsightSignals(insights: AiInsight[]): AiSignal[] {
  return insights.map((insight) => ({
    id: insight.id,
    title: insight.title,
    type: insight.type,
    severity: insight.severity,
    confidence: insight.confidence,
    ventureId: insight.ventureId,
    entityType: insight.entityType,
    entityId: insight.entityId,
    recommendationKind: insight.recommendationKind,
    observation: insight.observation ?? insight.message,
    reason:
      insight.reason ??
      "The signal is based on current issue, roadmap, and venture context.",
    suggestedAction: insight.suggestedAction ?? "Review operational context.",
  }))
}

export function getPortfolioSignals(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[]
): AiSignal[] {
  const blockedIssues = issues.filter((issue) => issue.blocked)
  const overdueIssues = issues.filter((issue) => isIssueOverdue(issue))
  const decliningRoadmaps = roadmapItems.filter(
    (item) => item.confidenceTrend === "declining"
  )
  const atRiskVentures = ventures.filter(
    (venture) => venture.health === "at-risk" || venture.health === "critical"
  )
  const signals: AiSignal[] = []

  if (blockedIssues.length > 0 || overdueIssues.length > 0) {
    signals.push({
      id: "portfolio-execution-risk",
      title: "Execution friction is affecting confidence",
      type: "risk",
      severity: blockedIssues.length > 0 ? "high" : "medium",
      confidence: 84,
      entityType: "portfolio",
      recommendationKind: "reduce-scope",
      observation: `${blockedIssues.length} blocked and ${overdueIssues.length} overdue issues are active in the current context.`,
      reason:
        "Blocked or overdue work tends to reduce roadmap confidence before progress visibly stalls.",
      suggestedAction:
        "Reduce concurrent scope and resolve blocked execution paths before adding new work.",
    })
  }

  if (decliningRoadmaps.length > 0) {
    signals.push({
      id: "portfolio-declining-roadmaps",
      title: "Roadmap confidence requires attention",
      type: "recommendation",
      severity: "medium",
      confidence: 79,
      entityType: "portfolio",
      recommendationKind: "split",
      observation: `${decliningRoadmaps.length} initiative${
        decliningRoadmaps.length === 1 ? "" : "s"
      } show declining confidence.`,
      reason:
        "Declining confidence often indicates coupled discovery and delivery work.",
      suggestedAction:
        "Review linked issues and split validation work from implementation where ambiguity remains high.",
    })
  }

  if (atRiskVentures.length > 0) {
    signals.push({
      id: "portfolio-venture-health",
      title: "Venture health signal is uneven",
      type: "summary",
      severity: "medium",
      confidence: 74,
      entityType: "portfolio",
      recommendationKind: "prioritize",
      observation: `${atRiskVentures.map((venture) => venture.name).join(", ")} need focused operating attention.`,
      reason:
        "Venture health combines confidence, momentum, overdue work, and roadmap progress.",
      suggestedAction:
        "Prioritize the highest-confidence path and defer lower-signal execution work.",
    })
  }

  return signals
}

export function getAssistantSignals(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[],
  insights: AiInsight[]
) {
  const issueSignals = issues.flatMap((issue) =>
    getIssueSignals(issue, roadmapItems, ventures)
  )
  const roadmapSignals = roadmapItems.flatMap((item) =>
    getRoadmapSignals(item, issues, ventures)
  )

  return [
    ...getInsightSignals(insights),
    ...getPortfolioSignals(issues, roadmapItems, ventures),
    ...roadmapSignals,
    ...issueSignals,
  ]
}

export function getAssistantSummary(
  signals: AiSignal[],
  issues: Issue[],
  roadmapItems: RoadmapItem[]
): AssistantSummary {
  return {
    activeInsights: signals.length,
    highRiskSignals: signals.filter((signal) => signal.severity === "high").length,
    unclearIssues: issues.filter(
      (issue) => !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0
    ).length,
    decliningRoadmaps: roadmapItems.filter(
      (item) => item.confidenceTrend === "declining"
    ).length,
  }
}

export function sortSignals(signals: AiSignal[]) {
  const severityRank: Record<RiskLevel, number> = {
    high: 0,
    medium: 1,
    low: 2,
  }

  return [...signals].sort(
    (a, b) =>
      severityRank[a.severity] - severityRank[b.severity] ||
      b.confidence - a.confidence
  )
}

function getRoadmapRecommendationKind(
  item: RoadmapItem,
  blockedCount: number,
  overdueCount: number,
  completion: number,
  confidence: number,
  missingOutcome: boolean
): AiRecommendationKind {
  if (item.status === "killed" || confidence < 30) {
    return "kill"
  }

  if (blockedCount > 0 || overdueCount > 0) {
    return "reduce-scope"
  }

  if (missingOutcome) {
    return "clarify"
  }

  if (
    confidence < 60 ||
    item.confidenceTrend === "declining"
  ) {
    return "split"
  }

  if (completion >= 50 && confidence >= 75) {
    return "continue"
  }

  return "prioritize"
}

function getRoadmapReason(
  item: RoadmapItem,
  blockedCount: number,
  overdueCount: number,
  completion: number,
  missingOutcome: boolean,
  linkedIssueCount: number,
  confidence: number
) {
  if (blockedCount > 0) {
    return `${blockedCount} linked issue${
      blockedCount === 1 ? "" : "s"
    } are blocked, which can drag down strategic confidence.`
  }

  if (overdueCount > 0) {
    return `${overdueCount} linked issue${
      overdueCount === 1 ? "" : "s"
    } are overdue, indicating delivery friction against the initiative.`
  }

  if (missingOutcome) {
    return "The initiative is missing a target outcome, which makes validation and stop/continue decisions weaker."
  }

  if (item.confidenceTrend === "declining") {
    return "The initiative confidence trend is declining and should be reviewed before expanding scope."
  }

  if (completion >= 50 && confidence >= 75) {
    return `${linkedIssueCount} linked issue${
      linkedIssueCount === 1 ? "" : "s"
    } provide enough execution signal to continue.`
  }

  return "The initiative has manageable uncertainty but needs tighter execution focus."
}

function getRoadmapAction(kind: AiRecommendationKind) {
  const actions: Record<AiRecommendationKind, string> = {
    continue: "Continue the current initiative path while monitoring linked execution quality.",
    split: "Separate validation work from delivery execution before expanding scope.",
    kill: "Record the stop decision and fold learnings into the next roadmap review.",
    prioritize: "Focus the highest-impact linked work before adding new initiative scope.",
    clarify: "Define outcome criteria before expanding execution work.",
    "reduce-scope": "Reduce active scope until the confidence signal stabilizes.",
  }

  return actions[kind]
}
