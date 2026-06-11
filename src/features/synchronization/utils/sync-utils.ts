import { isIssueOverdue } from "@/features/issues/utils/issue-utils"
import type { Issue, RiskLevel } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"

export type SyncedRoadmapMetrics = {
  progress: number
  confidence: number
  completedIssues: number
  linkedIssues: number
  activeIssues: number
  blockedIssues: number
  overdueIssues: number
  killedIssues: number
}

export type SyncedVentureHealth = Venture & {
  activeIssueCount: number
  overdueIssueCount: number
  activeRoadmapCount: number
  progress: number
  confidence: number
}

export function getLinkedIssues(issues: Issue[], item: RoadmapItem) {
  return issues.filter(
    (issue) =>
      issue.roadmapId === item.id || item.linkedIssueIds.includes(issue.id)
  )
}

export function getSyncedRoadmapMetrics(
  item: RoadmapItem,
  issues: Issue[]
): SyncedRoadmapMetrics {
  const linkedIssues = getLinkedIssues(issues, item)
  const activeLinkedIssues = linkedIssues.filter(
    (issue) => issue.status !== "killed"
  )
  const completedIssues = activeLinkedIssues.filter(
    (issue) => issue.status === "done"
  ).length
  const blockedIssues = linkedIssues.filter((issue) => issue.blocked).length
  const overdueIssues = linkedIssues.filter((issue) => isIssueOverdue(issue)).length
  const killedIssues = linkedIssues.filter((issue) => issue.status === "killed").length
  const activeIssues = linkedIssues.filter(
    (issue) => issue.status !== "done" && issue.status !== "killed"
  ).length
  const issueProgress =
    activeLinkedIssues.length > 0
      ? Math.round((completedIssues / activeLinkedIssues.length) * 100)
      : item.progress
  const riskPenalty = blockedIssues * 12 + overdueIssues * 7
  const penalizedConfidence = Math.max(
    0,
    Math.min(100, Math.round(item.confidence - riskPenalty))
  )
  const progress = item.manualProgress ?? issueProgress
  const confidence = item.manualConfidence ?? penalizedConfidence

  return {
    progress,
    confidence,
    completedIssues,
    linkedIssues: linkedIssues.length,
    activeIssues,
    blockedIssues,
    overdueIssues,
    killedIssues,
  }
}

export function getSyncedRoadmapItems(
  roadmapItems: RoadmapItem[],
  issues: Issue[]
) {
  return roadmapItems.map((item) => {
    const metrics = getSyncedRoadmapMetrics(item, issues)

    return {
      ...item,
      progress: metrics.progress,
      confidence: metrics.confidence,
      riskLevel: getRoadmapRiskLevel(item.riskLevel, metrics),
      status:
        item.status !== "completed" &&
        item.status !== "killed" &&
        (metrics.blockedIssues > 0 || metrics.confidence < 45)
          ? "at-risk"
          : item.status,
    }
  })
}

export function getSyncedVentureHealth(
  venture: Venture,
  issues: Issue[],
  roadmapItems: RoadmapItem[]
): SyncedVentureHealth {
  const ventureIssues = issues.filter((issue) => issue.ventureId === venture.id)
  const ventureRoadmapItems = roadmapItems.filter(
    (item) => item.ventureId === venture.id
  )
  const activeIssues = ventureIssues.filter(
    (issue) => issue.status !== "done" && issue.status !== "killed"
  )
  const overdueIssues = ventureIssues.filter((issue) => isIssueOverdue(issue))
  const activeRoadmapItems = ventureRoadmapItems.filter((item) =>
    ["planned", "active", "at-risk"].includes(item.status)
  )
  const progress =
    ventureRoadmapItems.length > 0
      ? Math.round(
          ventureRoadmapItems.reduce((total, item) => total + item.progress, 0) /
            ventureRoadmapItems.length
        )
      : venture.progress
  const confidence =
    ventureRoadmapItems.length > 0
      ? Math.round(
          ventureRoadmapItems.reduce(
            (total, item) => total + item.confidence,
            0
          ) / ventureRoadmapItems.length
        )
      : venture.confidence

  return {
    ...venture,
    activeIssueCount: activeIssues.length,
    overdueIssueCount: overdueIssues.length,
    activeRoadmapCount: activeRoadmapItems.length,
    progress,
    confidence,
  }
}

function getRoadmapRiskLevel(
  fallback: RiskLevel,
  metrics: SyncedRoadmapMetrics
): RiskLevel {
  if (metrics.blockedIssues > 0 || metrics.confidence < 40) {
    return "high"
  }

  if (metrics.overdueIssues > 0 || metrics.confidence < 65) {
    return "medium"
  }

  return fallback === "high" ? "medium" : fallback
}
