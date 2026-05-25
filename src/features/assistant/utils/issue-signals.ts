import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { getSignalDedupeKey } from "@/features/assistant/utils/signal-dedupe"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"

const TODAY = new Date("2026-05-24T00:00:00.000Z")

export function isIssueOverdue(issue: Issue, today = TODAY) {
  if (!issue.dueDate || issue.status === "done" || issue.status === "killed") {
    return false
  }

  return new Date(`${issue.dueDate}T00:00:00.000Z`) < today
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
    signals.push(
      withDedupe({
        id: `issue-risk-${issue.id}`,
        title: issue.blocked ? "Blocked execution risk" : "Overdue delivery risk",
        type: "risk",
        severity: issue.blocked ? "high" : "medium",
        confidence: issue.blocked ? 86 : 73,
        ventureId: issue.ventureId,
        ventureName,
        entityType: "issue",
        entityId: issue.id,
        sourceType: "issue",
        sourceId: issue.id,
        sourceLabel: issue.title,
        sourceActionLabel: "Open issue",
        signalOrigin: "derived",
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
    )
  }

  if (missingCriteria) {
    signals.push(
      withDedupe({
        id: `issue-clarity-${issue.id}`,
        title: "Completion criteria need definition",
        type: "warning",
        severity: "medium",
        confidence: 78,
        ventureId: issue.ventureId,
        ventureName,
        entityType: "issue",
        entityId: issue.id,
        sourceType: "issue",
        sourceId: issue.id,
        sourceLabel: issue.title,
        sourceActionLabel: "Open issue",
        signalOrigin: "derived",
        recommendationKind: "clarify",
        observation: "The issue lacks measurable acceptance criteria.",
        reason:
          "Undefined completion conditions can weaken handoff quality and roadmap confidence.",
        suggestedAction:
          "Define validation conditions and expected delivery outcomes before implementation continues.",
      })
    )
  }

  if (roadmap && roadmap.confidenceTrend === "declining") {
    signals.push(
      withDedupe({
        id: `issue-roadmap-${issue.id}`,
        title: "Linked roadmap confidence is declining",
        type: "recommendation",
        severity: roadmap.confidence < 50 ? "high" : "medium",
        confidence: 81,
        ventureId: issue.ventureId,
        ventureName,
        entityType: "issue",
        entityId: issue.id,
        sourceType: "issue",
        sourceId: issue.id,
        sourceLabel: issue.title,
        sourceActionLabel: "Open issue",
        signalOrigin: "derived",
        recommendationKind: "prioritize",
        observation: `${roadmap.title} is trending down at ${roadmap.confidence}% confidence.`,
        reason:
          "Issue progress is directly connected to the initiative's confidence signal.",
        suggestedAction:
          "Prioritize the linked execution path before expanding initiative scope.",
      })
    )
  }

  return signals
}

function withDedupe(signal: AiSignal): AiSignal {
  return { ...signal, dedupeKey: getSignalDedupeKey(signal) }
}
