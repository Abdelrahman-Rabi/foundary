import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { isIssueOverdue } from "@/features/assistant/utils/issue-signals"
import { getSignalDedupeKey } from "@/features/assistant/utils/signal-dedupe"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"

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
    signals.push(
      withDedupe({
        id: "portfolio-execution-risk",
        title: "Execution friction is affecting confidence",
        signalType: "execution-risk",
        type: "risk",
        severity: blockedIssues.length > 0 ? "high" : "medium",
        confidence: 84,
        analystConfidence: blockedIssues.length > 0 ? "high" : "medium",
        ventureName: "Portfolio",
        entityType: "portfolio",
        sourceType: "portfolio",
        sourceLabel: "Portfolio execution",
        sourceActionLabel: "Inspect signal",
        signalOrigin: "portfolio",
        recommendedDecision: "narrow",
        recommendationKind: "narrow",
        observation: `${blockedIssues.length} blocked and ${overdueIssues.length} overdue issues are active in the current context.`,
        reason:
          "Blocked or overdue work tends to reduce validation confidence before progress visibly stalls.",
        suggestedAction:
          "Reduce concurrent scope and resolve blocked execution paths before adding new work.",
        gateIds: [],
        evidenceSignalIds: [],
        issueIds: [...blockedIssues, ...overdueIssues].map((issue) => issue.id),
        roadmapIds: [],
        capacitySignalIds: [],
      })
    )
  }

  if (decliningRoadmaps.length > 0) {
    signals.push(
      withDedupe({
        id: "portfolio-declining-roadmaps",
        title: "Validation confidence requires attention",
        signalType: "sunk-cost-risk",
        type: "recommendation",
        severity: "medium",
        confidence: 79,
        analystConfidence: "medium",
        ventureName: "Portfolio",
        entityType: "portfolio",
        sourceType: "portfolio",
        sourceLabel: "Portfolio roadmap",
        sourceActionLabel: "Inspect signal",
        signalOrigin: "portfolio",
        recommendedDecision: "narrow",
        recommendationKind: "narrow",
        observation: `${decliningRoadmaps.length} initiative${
          decliningRoadmaps.length === 1 ? "" : "s"
        } show declining confidence.`,
        reason:
          "Declining confidence often indicates coupled discovery and delivery work.",
        suggestedAction:
          "Review linked issues and split validation work from implementation where ambiguity remains high.",
        gateIds: decliningRoadmaps.flatMap((item) =>
          item.validationGateId ? [item.validationGateId] : []
        ),
        evidenceSignalIds: decliningRoadmaps.flatMap(
          (item) => item.evidenceSignalIds ?? []
        ),
        issueIds: [],
        roadmapIds: decliningRoadmaps.map((item) => item.id),
        capacitySignalIds: [],
      })
    )
  }

  if (atRiskVentures.length > 0) {
    signals.push(
      withDedupe({
        id: "portfolio-venture-health",
        title: "Decision pressure is uneven",
        signalType: "studio-decision",
        type: "summary",
        severity: "medium",
        confidence: 74,
        analystConfidence: "medium",
        ventureName: "Portfolio",
        entityType: "portfolio",
        sourceType: "portfolio",
        sourceLabel: "Portfolio health",
        sourceActionLabel: "Inspect signal",
        signalOrigin: "portfolio",
        recommendedDecision: "continue",
        recommendationKind: "continue",
        observation: `${atRiskVentures
          .map((venture) => venture.name)
          .join(", ")} need focused operating attention.`,
        reason:
          "Decision pressure combines confidence, momentum, overdue work, and roadmap progress.",
        suggestedAction:
          "Prioritize the highest-confidence path and defer lower-signal execution work.",
        gateIds: [],
        evidenceSignalIds: [],
        issueIds: [],
        roadmapIds: [],
        capacitySignalIds: [],
      })
    )
  }

  return signals
}

function withDedupe(signal: AiSignal): AiSignal {
  return { ...signal, dedupeKey: getSignalDedupeKey(signal) }
}
