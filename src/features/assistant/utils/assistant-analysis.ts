import type {
  AiInsight,
  AiInsightType,
  AiRecommendationKind,
  AiSignalSourceType,
} from "@/types/ai"
import type { Issue, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import {
  getIssueSignals,
  getIssueSummary,
  getVentureName,
  isIssueOverdue,
} from "@/features/assistant/utils/issue-signals"
import { getPortfolioSignals } from "@/features/assistant/utils/portfolio-signals"
import { getRoadmapSignals } from "@/features/assistant/utils/roadmap-signals"
import {
  dedupeSignals,
  getSignalDedupeKey,
  sortSignals,
} from "@/features/assistant/utils/signal-dedupe"

export type AiSignalOrigin = "static" | "derived" | "portfolio"

export type AiSignal = {
  id: string
  title: string
  type: AiInsightType
  severity: RiskLevel
  confidence: number
  ventureId?: string
  ventureName: string
  entityType: "issue" | "roadmap" | "venture" | "portfolio"
  entityId?: string
  sourceType: AiSignalSourceType
  sourceId?: string
  sourceLabel: string
  sourceActionLabel?: string
  recommendationKind?: AiRecommendationKind
  observation: string
  reason: string
  suggestedAction: string
  signalOrigin: AiSignalOrigin
  dedupeKey?: string
}

export type AssistantSummary = {
  activeInsights: number
  highRiskSignals: number
  unclearIssues: number
  decliningRoadmaps: number
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

export function getInsightSignals(
  insights: AiInsight[],
  issues: Issue[] = [],
  roadmapItems: RoadmapItem[] = [],
  ventures: Venture[] = []
): AiSignal[] {
  return insights.map((insight) => {
    const source = getInsightSource(insight, issues, roadmapItems, ventures)
    const signal: AiSignal = {
      id: insight.id,
      title: insight.title,
      type: insight.type,
      severity: insight.severity,
      confidence: insight.confidence,
      ventureId: insight.ventureId,
      ventureName: getVentureName(ventures, insight.ventureId),
      entityType: insight.entityType,
      entityId: insight.entityId,
      sourceType: insight.entityType,
      sourceId: insight.entityId,
      sourceLabel: source.label,
      sourceActionLabel: source.actionLabel,
      signalOrigin: "static",
      recommendationKind: insight.recommendationKind,
      observation: insight.observation ?? insight.message,
      reason:
        insight.reason ??
        "The signal is based on current issue, roadmap, and venture context.",
      suggestedAction: insight.suggestedAction ?? "Review operational context.",
    }

    return { ...signal, dedupeKey: getSignalDedupeKey(signal) }
  })
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
  const staticSignals = getInsightSignals(insights, issues, roadmapItems, ventures)

  return dedupeSignals([
    ...staticSignals,
    ...getPortfolioSignals(issues, roadmapItems, ventures),
    ...roadmapSignals,
    ...issueSignals,
  ])
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

function getInsightSource(
  insight: AiInsight,
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[]
) {
  if (insight.entityType === "issue") {
    const issue = issues.find((item) => item.id === insight.entityId)
    return {
      label: issue?.title ?? "Issue context",
      actionLabel: "Open issue",
    }
  }

  if (insight.entityType === "roadmap") {
    const roadmap = roadmapItems.find((item) => item.id === insight.entityId)
    return {
      label: roadmap?.title ?? "Roadmap context",
      actionLabel: "Open roadmap",
    }
  }

  if (insight.entityType === "venture") {
    const venture = ventures.find((item) => item.id === insight.entityId)
    return {
      label: venture?.name ?? getVentureName(ventures, insight.ventureId),
      actionLabel: "Review venture",
    }
  }

  return {
    label: "Portfolio context",
    actionLabel: "Inspect signal",
  }
}

export {
  dedupeSignals,
  getIssueSignals,
  getIssueSummary,
  getPortfolioSignals,
  getRoadmapSignals,
  getSignalDedupeKey,
  getVentureName,
  isIssueOverdue,
  sortSignals,
}
