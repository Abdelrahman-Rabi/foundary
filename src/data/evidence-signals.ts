import type { EvidenceSignal } from "@/types/venture"
import type { EvidenceStrength } from "@/types/issue"

export const evidenceSignals: EvidenceSignal[] = [
  {
    id: "signal-sentra-cohort-pass",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    title: "Referral activation cohort rate passes threshold",
    summary: "Cohort data shows referral-sourced workspaces are activating above target 80% with strong invite engagement.",
    signalType: "activation",
    strength: "strong" as EvidenceStrength,
    confidenceImpact: "increase",
    sourceIssueIds: ["issue-sentra-referral-cohort-review"],
    sourceRoadmapIds: ["roadmap-sentra-referral-foundation"],
    observedAt: "2026-05-23T16:00:00.000Z"
  },
  {
    id: "signal-sentra-taxonomy-pending",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    title: "Adaptive experiments blocked by event logging",
    summary: "Event taxonomy remains unmapped, creating measurement uncertainty for the next onboarding variant.",
    signalType: "technical-risk",
    strength: "moderate" as EvidenceStrength,
    confidenceImpact: "decrease",
    sourceIssueIds: ["issue-sentra-event-taxonomy"],
    sourceRoadmapIds: ["roadmap-sentra-onboarding"],
    observedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "signal-reson8-interviews-fail",
    ventureId: "venture-reson8",
    gateId: "gate-reson8-retention",
    title: "Creator interviews show retention resistance",
    summary: "Creator interview logs show creator hesitation to return weekly without guaranteed audience reach.",
    signalType: "customer-interview",
    strength: "negative" as EvidenceStrength,
    confidenceImpact: "decrease",
    sourceIssueIds: ["issue-reson8-positioning-interviews"],
    sourceRoadmapIds: ["roadmap-reson8-retention"],
    observedAt: "2026-05-21T10:00:00.000Z"
  },
  {
    id: "signal-reson8-broadcast-archive",
    ventureId: "venture-reson8",
    gateId: "gate-reson8-retention",
    title: "Broadcast collaboration loop fails validation",
    summary: "Collaborator notification test archived after creators reported low urgency to maintain loops.",
    signalType: "retention",
    strength: "negative" as EvidenceStrength,
    confidenceImpact: "decrease",
    sourceIssueIds: ["issue-reson8-archive-broadcast-test"],
    sourceRoadmapIds: ["roadmap-reson8-broadcast-loop"],
    observedAt: "2026-05-22T15:00:00.000Z"
  },
  {
    id: "signal-internal-meeting-rollout",
    ventureId: "venture-internal-ops",
    gateId: "gate-internal-ops-leverage",
    title: "AI summary rollout cuts prep overhead",
    summary: "Studio reviews confirm reduced preparation time and faster follow-up issue capture after weekly meetings.",
    signalType: "qualitative",
    strength: "strong" as EvidenceStrength,
    confidenceImpact: "increase",
    sourceIssueIds: ["issue-internal-meeting-rollout-notes"],
    sourceRoadmapIds: ["roadmap-internal-meeting-intelligence"],
    observedAt: "2026-05-24T12:00:00.000Z"
  }
]
