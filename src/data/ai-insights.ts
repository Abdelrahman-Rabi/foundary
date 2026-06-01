import type { AiInsight } from "@/types/ai"

export const aiInsights: AiInsight[] = [
  {
    id: "insight-sentra-analytics-risk",
    ventureId: "venture-sentra",
    entityType: "roadmap",
    entityId: "roadmap-sentra-onboarding",
    type: "risk",
    title: "Activation analytics are blocking growth",
    observation:
      "Sentra has referral momentum, but activation analytics are blocked while event taxonomy remains unresolved.",
    reason:
      "The active activation recovery initiative cannot prove onboarding improvements until analytics ingestion is reliable.",
    message:
      "Growth work is active, but the measurement layer needed to trust onboarding experiments is blocked.",
    confidence: 84,
    severity: "high",
    recommendationKind: "reduce-scope",
    suggestedAction:
      "Pause new onboarding experiment scope until ingestion reliability and activation events are stable.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-validation-criteria",
    ventureId: "venture-reson8",
    entityType: "issue",
    entityId: "issue-reson8-retention-assumptions",
    type: "warning",
    title: "Retention threshold is still unclear",
    observation:
      "Reson8 has interview activity and a prototype in review, but the retained-creator threshold is not decision-ready.",
    reason:
      "Without a continue/split/stop threshold, delivery work can continue without proving creator retention.",
    message:
      "Retention validation has activity, but the decision threshold is still unclear.",
    confidence: 76,
    severity: "medium",
    recommendationKind: "clarify",
    suggestedAction:
      "Define the retained-creator signal required before additional prototype or pricing work begins.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-sentra-priority-focus",
    ventureId: "venture-sentra",
    entityType: "issue",
    entityId: "issue-sentra-analytics-ingestion",
    type: "priority",
    title: "Unblock analytics before adding growth scope",
    observation:
      "Sentra's urgent analytics ingestion issue is the main blocker behind the activation recovery risk.",
    reason:
      "The issue is linked to the active activation roadmap and directly affects confidence in growth decisions.",
    message:
      "Sentra should protect the referral win by fixing activation measurement before adding new onboarding scope.",
    confidence: 82,
    severity: "high",
    recommendationKind: "prioritize",
    suggestedAction:
      "Prioritize analytics ingestion and event taxonomy before adding new onboarding experiments.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-split-initiative",
    ventureId: "venture-reson8",
    entityType: "roadmap",
    entityId: "roadmap-reson8-retention",
    type: "recommendation",
    title: "Split retention discovery from delivery",
    observation:
      "Reson8 is mixing blocked interviews, threshold definition, and prototype work while confidence remains uncertain.",
    reason:
      "Discovery work and prototype delivery are moving at different confidence levels and need separate decisions.",
    message:
      "Creator retention work needs a clearer split between validation evidence and delivery execution.",
    confidence: 79,
    severity: "medium",
    recommendationKind: "split",
    suggestedAction:
      "Separate threshold validation from prototype delivery before widening scope.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-internal-ops-continue",
    ventureId: "venture-internal-ops",
    entityType: "roadmap",
    entityId: "roadmap-internal-meeting-intelligence",
    type: "recommendation",
    title: "Meeting intelligence rollout is healthy",
    observation:
      "Internal Ops has meeting intelligence work moving through review with follow-up capture already in progress.",
    reason:
      "The initiative has stable confidence, low risk, and a contained operating cadence goal.",
    message:
      "Internal Ops shows disciplined execution on studio operating leverage without expanding into heavy process.",
    confidence: 86,
    severity: "low",
    recommendationKind: "continue",
    suggestedAction:
      "Continue rollout while keeping issue capture review lightweight and tied to weekly operating meetings.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "insight-reson8-kill-broadcast",
    ventureId: "venture-reson8",
    entityType: "roadmap",
    entityId: "roadmap-reson8-broadcast-loop",
    type: "recommendation",
    title: "Broadcast loop should stay killed",
    observation:
      "Reson8 stopped the broadcast collaboration loop after weak creator return intent and archived the learning.",
    reason:
      "Killed experiments preserve focus when validation signal is low and retention work remains uncertain.",
    message:
      "Reson8 should keep the broadcast loop closed and reuse the learning in retention threshold review.",
    confidence: 73,
    severity: "medium",
    recommendationKind: "kill",
    suggestedAction:
      "Keep the stop decision recorded and fold the learning into the retained-creator threshold.",
    createdAt: "2026-05-22T15:00:00.000Z",
  },
  {
    id: "insight-internal-metrics-scope",
    ventureId: "venture-internal-ops",
    entityType: "roadmap",
    entityId: "roadmap-internal-metrics-dashboard",
    type: "summary",
    title: "Studio metrics scope is contained",
    observation:
      "Internal Ops is defining a narrow portfolio metrics surface for review decisions without adding reporting overhead.",
    reason:
      "The initiative has clear acceptance criteria, stable confidence, and no blocked linked work.",
    message:
      "Studio metrics work is healthy because scope stays constrained to operating review decisions.",
    confidence: 78,
    severity: "low",
    recommendationKind: "continue",
    suggestedAction:
      "Continue with the lean metrics scope and avoid expanding into broad analytics reporting.",
    createdAt: "2026-05-24T11:00:00.000Z",
  },
]
