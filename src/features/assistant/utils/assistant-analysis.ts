import type {
  AnalystConfidence,
  AnalystSignal,
  AnalystSignalType,
  AiInsight,
  AiInsightType,
  AiRecommendationKind,
  AiSignalSourceType,
} from "@/types/ai"
import type { Issue, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { StudioDecision, Venture } from "@/types/venture"
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
  signalType: AnalystSignalType
  type: AiInsightType
  severity: RiskLevel
  confidence: number
  analystConfidence: AnalystConfidence
  ventureId?: string
  ventureName: string
  entityType: "issue" | "roadmap" | "venture" | "portfolio"
  entityId?: string
  sourceType: AiSignalSourceType
  sourceId?: string
  sourceLabel: string
  sourceActionLabel?: string
  recommendedDecision?: StudioDecision
  recommendationKind?: AiRecommendationKind
  observation: string
  reason: string
  evidenceSummary?: string
  capacityTradeoff?: string
  suggestedAction: string
  gateIds: string[]
  evidenceSignalIds: string[]
  issueIds: string[]
  roadmapIds: string[]
  capacitySignalIds: string[]
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
  analystSignals: AnalystSignal[],
  context: { mode: "portfolio" | "venture"; activeVentureId: string | null }
) {
  const ventureIds = new Set(ventures.map((v) => v.id))
  const validInsights = insights.filter(
    (insight) => !insight.ventureId || ventureIds.has(insight.ventureId)
  )
  const validAnalystSignals = analystSignals.filter((signal) =>
    ventureIds.has(signal.ventureId)
  )

  if (context.mode === "venture" && context.activeVentureId) {
    return {
      issues: issues.filter((issue) => issue.ventureId === context.activeVentureId),
      roadmapItems: roadmapItems.filter(
        (item) => item.ventureId === context.activeVentureId
      ),
      ventures: ventures.filter((venture) => venture.id === context.activeVentureId),
      insights: validInsights.filter(
        (insight) => insight.ventureId === context.activeVentureId
      ),
      analystSignals: validAnalystSignals.filter(
        (signal) => signal.ventureId === context.activeVentureId
      ),
    }
  }

  return {
    issues,
    roadmapItems,
    ventures,
    insights: validInsights,
    analystSignals: validAnalystSignals,
  }
}

export function getSeededAnalystSignals(
  analystSignals: AnalystSignal[],
  issues: Issue[] = [],
  roadmapItems: RoadmapItem[] = [],
  ventures: Venture[] = []
): AiSignal[] {
  return analystSignals.map((signal) => {
    const source = getAnalystSource(signal, issues, roadmapItems, ventures)
    const normalized: AiSignal = {
      id: signal.id,
      title: signal.title,
      signalType: signal.signalType ?? "studio-decision",
      type: "recommendation",
      severity: signal.severity,
      confidence:
        signal.confidenceScore ??
        getNumericAnalystConfidence(signal.confidence, signal.severity),
      analystConfidence: signal.confidence ?? getAnalystConfidence(signal.severity),
      ventureId: signal.ventureId,
      ventureName: getVentureName(ventures, signal.ventureId),
      entityType: source.entityType,
      entityId: source.entityId,
      sourceType: source.entityType,
      sourceId: source.entityId,
      sourceLabel: source.label,
      sourceActionLabel: source.actionLabel,
      signalOrigin: "static",
      recommendedDecision: signal.recommendedDecision,
      recommendationKind: signal.recommendedDecision,
      observation: signal.message,
      reason: signal.reason,
      evidenceSummary: signal.evidenceSummary,
      capacityTradeoff: signal.capacityTradeoff,
      suggestedAction: signal.suggestedAction,
      gateIds: normalizeIds(signal.gateIds, signal.gateId),
      evidenceSignalIds: normalizeIds(
        signal.evidenceSignalIds,
        signal.evidenceSignalId
      ),
      issueIds: normalizeIds(signal.issueIds, signal.issueId),
      roadmapIds: normalizeIds(signal.roadmapIds, signal.roadmapId),
      capacitySignalIds: normalizeIds(
        signal.capacitySignalIds,
        signal.capacitySignalId
      ),
    }

    return { ...normalized, dedupeKey: getSignalDedupeKey(normalized) }
  })
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
      signalType: mapLegacySignalType(insight),
      type: insight.type,
      severity: insight.severity,
      confidence: insight.confidence,
      analystConfidence: getAnalystConfidence(insight.severity),
      ventureId: insight.ventureId,
      ventureName: getVentureName(ventures, insight.ventureId),
      entityType: insight.entityType,
      entityId: insight.entityId,
      sourceType: insight.entityType,
      sourceId: insight.entityId,
      sourceLabel: source.label,
      sourceActionLabel: source.actionLabel,
      signalOrigin: "static",
      recommendedDecision: normalizeRecommendationKind(insight.recommendationKind),
      recommendationKind: normalizeRecommendationKind(insight.recommendationKind),
      observation: insight.observation ?? insight.message,
      reason:
        insight.reason ??
        "The signal is based on current issue, roadmap, and venture context.",
      suggestedAction: insight.suggestedAction ?? "Review operational context.",
      gateIds: [],
      evidenceSignalIds: [],
      issueIds: insight.entityType === "issue" ? [insight.entityId] : [],
      roadmapIds: insight.entityType === "roadmap" ? [insight.entityId] : [],
      capacitySignalIds: [],
    }

    return { ...signal, dedupeKey: getSignalDedupeKey(signal) }
  })
}

export function getAssistantSignals(
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[],
  insights: AiInsight[],
  analystSignals: AnalystSignal[] = []
) {
  const issueSignals = issues.flatMap((issue) =>
    getIssueSignals(issue, roadmapItems, ventures)
  )
  const roadmapSignals = roadmapItems.flatMap((item) =>
    getRoadmapSignals(item, issues, ventures)
  )
  const staticSignals = getInsightSignals(insights, issues, roadmapItems, ventures)
  const seededAnalystSignals = getSeededAnalystSignals(
    analystSignals,
    issues,
    roadmapItems,
    ventures
  )

  return dedupeSignals([
    ...seededAnalystSignals,
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
    unclearIssues:
      signals.filter((signal) => signal.signalType === "evidence-gap").length +
      issues.filter(
        (issue) =>
          !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0
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
      label: issue?.title ?? "Evidence context",
      actionLabel: "Open issue",
    }
  }

  if (insight.entityType === "roadmap") {
    const roadmap = roadmapItems.find((item) => item.id === insight.entityId)
    return {
      label: roadmap?.title ?? "Bet context",
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

function getAnalystSource(
  signal: AnalystSignal,
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  ventures: Venture[]
) {
  const issueId = signal.issueId ?? signal.issueIds?.[0]
  if (issueId) {
    const issue = issues.find((item) => item.id === issueId)
    if (issue) {
      return {
        entityType: "issue" as const,
        entityId: issue.id,
        label: issue.title,
        actionLabel: "Open source issue",
      }
    }
  }

  const roadmapId = signal.roadmapId ?? signal.roadmapIds?.[0]
  if (roadmapId) {
    const roadmap = roadmapItems.find((item) => item.id === roadmapId)
    if (roadmap) {
      return {
        entityType: "roadmap" as const,
        entityId: roadmap.id,
        label: roadmap.title,
        actionLabel: "Open source bet",
      }
    }
  }

  return {
    entityType: "venture" as const,
    entityId: signal.ventureId,
    label: getVentureName(ventures, signal.ventureId),
    actionLabel: "Inspect signal",
  }
}

function getAnalystConfidence(severity: RiskLevel): AnalystConfidence {
  if (severity === "high") return "high"
  if (severity === "medium") return "medium"
  return "low"
}

function getNumericAnalystConfidence(
  confidence: AnalystConfidence | undefined,
  severity: RiskLevel
) {
  const normalized = confidence ?? getAnalystConfidence(severity)
  if (normalized === "high") return 86
  if (normalized === "medium") return 68
  return 45
}

function normalizeIds(ids: string[] | undefined, fallback?: string) {
  if (ids && ids.length > 0) {
    return ids
  }

  return fallback ? [fallback] : []
}

function normalizeRecommendationKind(
  kind?: AiRecommendationKind
): StudioDecision | undefined {
  if (!kind) return undefined
  if (kind === "split" || kind === "reduce-scope" || kind === "clarify") {
    return "narrow"
  }
  if (kind === "prioritize") {
    return "continue"
  }
  return kind
}

function mapLegacySignalType(insight: AiInsight): AnalystSignalType {
  if (insight.recommendationKind) {
    return "studio-decision"
  }
  if (insight.type === "risk") {
    return "execution-risk"
  }
  if (insight.type === "warning") {
    return "evidence-gap"
  }
  return "gate-confidence"
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
