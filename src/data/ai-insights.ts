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
      "Roadmap confidence is declining while linked analytics work remains blocked.",
    reason:
      "The active onboarding initiative depends on reliable analytics ingestion before experimentation can expand.",
    message:
      "Analytics infrastructure work is blocked while onboarding experimentation remains active.",
    confidence: 84,
    severity: "high",
    recommendationKind: "reduce-scope",
    suggestedAction:
      "Resolve ingestion reliability before expanding experiment scope.",
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
      "Retention research defines interview activity but not a decision threshold.",
    reason:
      "Without a validation threshold, delivery work can continue without a clear signal.",
    message:
      "The retention research work defines interviews but not a decision threshold.",
    confidence: 76,
    severity: "medium",
    recommendationKind: "clarify",
    suggestedAction:
      "Define the retention signal required before implementation work begins.",
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
      "A blocked urgent issue is holding confidence down for an active growth initiative.",
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
      "Retention discovery and implementation work are coupled while confidence remains uncertain.",
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
]
