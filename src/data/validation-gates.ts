import type { ValidationGate } from "@/types/venture"

export const validationGates: ValidationGate[] = [
  {
    id: "gate-sentra-activation",
    ventureId: "venture-sentra",
    phase: "build",
    name: "Activation Quality & Growth Readiness",
    description: "Protect a higher-confidence activation path while clearing the measurement work needed for growth.",
    assumption: "Referral-sourced workspaces can activate above quality threshold once analytics confidence is restored.",
    requiredEvidence: [
      "Activation cohort rate > 80%",
      "Setup completion lift verified",
      "Event taxonomy defined"
    ],
    evidenceSignalIds: ["signal-sentra-cohort-pass", "signal-sentra-taxonomy-pending"],
    linkedIssueIds: [
      "issue-sentra-analytics-ingestion",
      "issue-sentra-event-taxonomy",
      "issue-sentra-referral-flow",
      "issue-sentra-referral-cohort-review"
    ],
    linkedRoadmapIds: [
      "roadmap-sentra-onboarding",
      "roadmap-sentra-referrals",
      "roadmap-sentra-referral-foundation"
    ],
    confidence: 78,
    status: "watch",
    decisionPressure: "medium",
    recommendedDecision: "continue",
    decisionReason: "Referral evidence is strong enough to continue, but Sentra needs protected product and engineering capacity to clear analytics recovery.",
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "gate-reson8-retention",
    ventureId: "venture-reson8",
    phase: "validate",
    name: "Creator Weekly Retention",
    description: "Confirm creators return weekly to collaborate on workflow drafts.",
    assumption: "Target creators experience weekly collaborative pull with draft-based workflows.",
    requiredEvidence: [
      "Weekly retained-creator cohort clears 40%",
      "Creator interviews confirm urgent repeat collaboration need",
      "Onboarding scope stays narrow until retention proof improves"
    ],
    evidenceSignalIds: [
      "signal-reson8-weekly-cohort-weak",
      "signal-reson8-interviews-fail",
      "signal-reson8-buildout-capacity-cost",
      "signal-reson8-broadcast-archive"
    ],
    linkedIssueIds: [
      "issue-reson8-retention-assumptions",
      "issue-reson8-positioning-interviews",
      "issue-reson8-message-threshold",
      "issue-reson8-onboarding-variant",
      "issue-reson8-kill-low-signal-loop",
      "issue-reson8-archive-broadcast-test"
    ],
    linkedRoadmapIds: [
      "roadmap-reson8-retention",
      "roadmap-reson8-broadcast-loop",
      "roadmap-reson8-pricing-signal"
    ],
    confidence: 23,
    status: "at-risk",
    decisionPressure: "critical",
    recommendedDecision: "narrow",
    decisionReason: "Retention evidence is weak while product and engineering capacity are actively being consumed. Recommend narrowing Reson8 before expanding onboarding scope.",
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "gate-internal-ops-leverage",
    ventureId: "venture-internal-ops",
    phase: "build",
    name: "Studio Operating Leverage",
    description: "Reduce repeated coordination overhead and follow-up leakage across meetings.",
    assumption: "Meeting summaries and action sync workflows reduce weekly missed actions below 5%.",
    requiredEvidence: [
      "Meeting summary rollout complete",
      "Issue capture automated"
    ],
    evidenceSignalIds: ["signal-internal-meeting-rollout"],
    linkedIssueIds: [
      "issue-internal-meeting-summary",
      "issue-internal-meeting-action-sync",
      "issue-internal-meeting-rollout-notes",
      "issue-internal-metrics-dashboard",
      "issue-internal-knowledge-base-cleanup",
      "issue-internal-hiring-automation"
    ],
    linkedRoadmapIds: [
      "roadmap-internal-meeting-intelligence",
      "roadmap-internal-hiring-workflow",
      "roadmap-internal-metrics-dashboard"
    ],
    confidence: 71,
    status: "healthy",
    decisionPressure: "low",
    recommendedDecision: "continue",
    decisionReason: "Internal Ops is stable and contained. Maintain the current operating cadence without distracting capacity from Reson8 and Sentra decisions.",
    updatedAt: "2026-05-24T12:00:00.000Z"
  }
]
