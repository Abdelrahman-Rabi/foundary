import type { ValidationGate } from "@/types/venture"

export const validationGates: ValidationGate[] = [
  {
    id: "gate-sentra-activation",
    ventureId: "venture-sentra",
    phase: "build",
    name: "Activation Quality & Growth Readiness",
    description: "Prove users reach first key value quickly enough to support acquisition spend.",
    assumption: "New workspaces can complete setup and reach key actions within 72 hours.",
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
    confidence: 66,
    status: "watch",
    decisionPressure: "medium",
    recommendedDecision: "continue",
    decisionReason: "Referral loops are healthy, but event taxonomy and ingestion must be resolved to trust future onboarding variants.",
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
      "Weekly retention > 40%",
      "Qualitative urgency confirmed in positioning interviews"
    ],
    evidenceSignalIds: ["signal-reson8-interviews-fail", "signal-reson8-broadcast-archive"],
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
    confidence: 41,
    status: "at-risk",
    decisionPressure: "high",
    recommendedDecision: "narrow",
    decisionReason: "Broadcast experiment failed and qualitative retention signal is weak. Recommend narrowing scope to creator-only retention validation before monetization or platform build-out.",
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "gate-internal-ops-leverage",
    ventureId: "venture-internal-ops",
    phase: "build",
    name: "Studio Operating Leverage",
    description: "Reduce repeated coordination overhead and follow-up leakage across meetings.",
    assumption: "AI summaries and sync workflows reduce weekly missed actions below 5%.",
    requiredEvidence: [
      "AI summary rollout complete",
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
    confidence: 74,
    status: "healthy",
    decisionPressure: "low",
    recommendedDecision: "continue",
    decisionReason: "Meeting intelligence rollout is healthy and show-stopper risks are low. Defer new operational workflows and continue steady execution.",
    updatedAt: "2026-05-24T12:00:00.000Z"
  }
]
