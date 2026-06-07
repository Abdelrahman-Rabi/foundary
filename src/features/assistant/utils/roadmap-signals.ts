import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { getVentureName } from "@/features/assistant/utils/issue-signals"
import { getSignalDedupeKey } from "@/features/assistant/utils/signal-dedupe"
import {
  getLinkedIssues,
  getSyncedRoadmapMetrics,
} from "@/features/synchronization/utils/sync-utils"
import type { Issue, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { StudioDecision, Venture } from "@/types/venture"

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
    withDedupe({
      id: `roadmap-confidence-${item.id}`,
      title: "Roadmap confidence analysis",
      signalType:
        item.confidenceTrend === "declining" || metrics.confidence < 50
          ? "sunk-cost-risk"
          : missingOutcome
            ? "evidence-gap"
            : "gate-confidence",
      type: "summary",
      severity,
      confidence: Math.max(58, Math.min(89, metrics.confidence + 12)),
      analystConfidence:
        severity === "high" ? "high" : severity === "medium" ? "medium" : "low",
      ventureId: item.ventureId,
      ventureName,
      entityType: "roadmap",
      entityId: item.id,
      sourceType: "roadmap",
      sourceId: item.id,
      sourceLabel: item.title,
      sourceActionLabel: "Open roadmap",
      signalOrigin: "derived",
      recommendedDecision: recommendationKind,
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
      gateIds: item.validationGateId ? [item.validationGateId] : [],
      evidenceSignalIds: item.evidenceSignalIds ?? [],
      issueIds: linkedIssues.map((issue) => issue.id),
      roadmapIds: [item.id],
      capacitySignalIds: [],
    }),
  ]
}

export function getRoadmapRecommendationKind(
  item: RoadmapItem,
  blockedCount: number,
  overdueCount: number,
  completion: number,
  confidence: number,
  missingOutcome: boolean
): StudioDecision {
  if (item.status === "killed") {
    return "kill"
  }

  if (blockedCount > 0 || overdueCount > 0) {
    return "narrow"
  }

  if (confidence < 30) {
    return "pause"
  }

  if (missingOutcome) {
    return "narrow"
  }

  if (confidence < 60 || item.confidenceTrend === "declining") {
    return "narrow"
  }

  if (completion >= 50 && confidence >= 75) {
    return "continue"
  }

  return "continue"
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

function getRoadmapAction(kind: StudioDecision) {
  const actions: Record<StudioDecision, string> = {
    continue: "Continue the current initiative path while monitoring linked execution quality.",
    kill: "Record the stop decision and fold learnings into the next roadmap review.",
    narrow: "Narrow the initiative focus to core validation targets before another build cycle.",
    pause: "Pause execution on this initiative until validation gate conditions are met.",
    "staff-up": "Allocate additional studio operator capacity to unblock active execution.",
    defer: "Defer new initiative scope and maintain steady-state operations.",
    "partner-review": "Escalate the initiative to a studio partner review session.",
  }

  return actions[kind]
}


function withDedupe(signal: AiSignal): AiSignal {
  return { ...signal, dedupeKey: getSignalDedupeKey(signal) }
}
