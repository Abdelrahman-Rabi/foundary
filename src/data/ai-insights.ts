import type { AiInsight } from "@/types/ai"

export const aiInsights: AiInsight[] = [
  {
    id: "insight-sentra-analytics-risk",
    ventureId: "venture-sentra",
    entityType: "roadmap",
    entityId: "roadmap-sentra-onboarding",
    type: "risk",
    title: "Onboarding confidence is declining",
    observation:
      "Sentra onboarding confidence is declining while analytics ingestion remains blocked and event taxonomy is still unresolved.",
    reason:
      "The active onboarding initiative depends on reliable analytics ingestion before experimentation can expand.",
    message:
      "Analytics infrastructure work is blocked while onboarding experimentation remains active.",
    confidence: 84,
    severity: "high",
    recommendationKind: "reduce-scope",
    suggestedAction:
      "Reduce onboarding experiment scope until ingestion reliability and activation events are stable.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-validation-criteria",
    ventureId: "venture-reson8",
    entityType: "issue",
    entityId: "issue-reson8-retention-assumptions",
    type: "warning",
    title: "Validation criteria need tightening",
    observation:
      "Reson8 retention research defines activity but not the signal threshold required to continue.",
    reason:
      "Without a validation threshold, delivery work can continue without a clear signal.",
    message:
      "The retention research work defines interviews but not a decision threshold.",
    confidence: 76,
    severity: "medium",
    recommendationKind: "clarify",
    suggestedAction:
      "Define the retained-creator signal required before additional implementation work begins.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-sentra-priority-focus",
    ventureId: "venture-sentra",
    entityType: "issue",
    entityId: "issue-sentra-analytics-ingestion",
    type: "priority",
    title: "Analytics reliability should stay the priority",
    observation:
      "A blocked urgent analytics issue is holding down confidence for Sentra's active onboarding initiative.",
    reason:
      "The issue is linked to onboarding optimization, which currently carries high strategic impact.",
    message:
      "Sentra has active growth work depending on analytics reliability before additional onboarding scope is useful.",
    confidence: 82,
    severity: "high",
    recommendationKind: "prioritize",
    suggestedAction:
      "Prioritize dependency resolution before adding new onboarding experiments.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-split-initiative",
    ventureId: "venture-reson8",
    entityType: "roadmap",
    entityId: "roadmap-reson8-retention",
    type: "recommendation",
    title: "Split discovery from delivery",
    observation:
      "Retention discovery, message threshold definition, and prototype delivery are coupled while confidence remains uncertain.",
    reason:
      "Blocked research and in-review prototype work are moving at different confidence levels.",
    message:
      "Creator retention work would be clearer if validation and implementation were managed separately.",
    confidence: 79,
    severity: "medium",
    recommendationKind: "split",
    suggestedAction:
      "Separate validation criteria from prototype delivery before widening scope.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-internal-ops-continue",
    ventureId: "venture-internal-ops",
    entityType: "roadmap",
    entityId: "roadmap-internal-meeting-intelligence",
    type: "recommendation",
    title: "Meeting intelligence can continue",
    observation:
      "Execution confidence remains strong with linked work moving through review.",
    reason:
      "The initiative has stable confidence, low risk, and active issue progress.",
    message:
      "Internal Ops shows enough execution stability to continue the current meeting intelligence rollout.",
    confidence: 86,
    severity: "low",
    recommendationKind: "continue",
    suggestedAction:
      "Continue rollout while keeping issue capture review lightweight.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-kill-broadcast",
    ventureId: "venture-reson8",
    entityType: "roadmap",
    entityId: "roadmap-reson8-broadcast-loop",
    type: "recommendation",
    title: "Low-signal loop should stay killed",
    observation:
      "The broadcast collaboration loop was stopped after weak creator return intent.",
    reason:
      "Killed experiments preserve focus when validation signal is low and retention work remains uncertain.",
    message:
      "Reson8 should keep the broadcast collaboration loop closed and fold learnings into retention discovery.",
    confidence: 73,
    severity: "medium",
    recommendationKind: "kill",
    suggestedAction:
      "Keep the stop decision recorded and reuse learnings in the retention signal review.",
    createdAt: "2026-05-22T15:00:00.000Z",
  },
  {
    id: "insight-internal-metrics-scope",
    ventureId: "venture-internal-ops",
    entityType: "roadmap",
    entityId: "roadmap-internal-metrics-dashboard",
    type: "summary",
    title: "Metrics dashboard scope is contained",
    observation:
      "Internal Ops is defining a narrow portfolio metrics surface without adding reporting overhead.",
    reason:
      "The initiative has clear acceptance criteria, stable confidence, and no blocked linked work.",
    message:
      "Studio metrics work is healthy because scope is constrained to operating review decisions.",
    confidence: 78,
    severity: "low",
    recommendationKind: "continue",
    suggestedAction:
      "Continue with the lean metrics scope and avoid expanding into broad analytics reporting.",
    createdAt: "2026-05-24T11:00:00.000Z",
  },
]
