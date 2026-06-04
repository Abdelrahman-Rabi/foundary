import type { AnalystSignal } from "@/types/ai"
import type { RiskLevel } from "@/types/issue"

export const analystSignals: AnalystSignal[] = [
  // 1. Top Portfolio Recommendation
  {
    id: "analyst-portfolio-top-decision",
    ventureId: "venture-reson8",
    gateId: "gate-reson8-retention",
    evidenceSignalId: "signal-reson8-interviews-fail",
    issueId: "issue-reson8-onboarding-variant",
    roadmapId: "roadmap-reson8-retention",
    title: "Pause active Reson8 build & narrow validation focus",
    message: "Reson8 is the top decision priority. The recommendation is to narrow the validation initiative and pause broad build work until creator return intent is proven.",
    reason: "Retention evidence is weak while active engineering and design allocations continue, creating sunk-cost risk and starving higher-confidence growth work.",
    suggestedAction: "Transition Omar Khaled and Lina Haddad off Reson8 prototypes and run creator-only positioning interviews.",
    recommendedDecision: "narrow",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },

  // 2. Reson8 Sunk-Cost Risk
  {
    id: "analyst-reson8-sunk-cost",
    ventureId: "venture-reson8",
    gateId: "gate-reson8-retention",
    evidenceSignalId: "signal-reson8-broadcast-archive",
    issueId: "issue-reson8-onboarding-variant",
    roadmapId: "roadmap-reson8-broadcast-loop",
    title: "Reson8 validation uncertainty vs active execution",
    message: "Reson8 is at high risk of wasted execution. Engineering prototype coding is active despite negative validation signal.",
    reason: "Creator interviews and archived loops show weak repeat-use intent, yet engineering has a 50% allocation to prototype variants.",
    suggestedAction: "Freeze the onboarding variant prototype task and define creator retention metric thresholds first.",
    recommendedDecision: "narrow",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },

  // 3. Sentra Capacity Protection Recommendation
  {
    id: "analyst-sentra-capacity",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    evidenceSignalId: "signal-sentra-cohort-pass",
    issueId: "issue-sentra-mobile-conversion-copy",
    roadmapId: "roadmap-sentra-referrals",
    title: "Protect Sentra design capacity",
    message: "Sentra is a higher-confidence growth opportunity with strong referral loops, but launch momentum is constrained by design bandwidth.",
    reason: "Lina Haddad is split between active Sentra mobile referral expansion copy and Reson8 onboarding prototypes design.",
    suggestedAction: "Protect Lina Haddad's active design focus for Sentra referrals and move Reson8 prototype design out of her current allocation.",
    recommendedDecision: "continue",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },

  // 4. Internal Ops Steady-State/Defer Recommendation
  {
    id: "analyst-internal-ops-stable",
    ventureId: "venture-internal-ops",
    gateId: "gate-internal-ops-leverage",
    evidenceSignalId: "signal-internal-meeting-rollout",
    issueId: "issue-internal-meeting-rollout-notes",
    roadmapId: "roadmap-internal-meeting-intelligence",
    title: "Maintain steady-state Internal Ops cadence",
    message: "Internal Ops shows stable studio leverage with contained metrics scope and freed operator capacity.",
    reason: "Rollout notes and summaries are complete, freeing product lead Sarah Chen to focus on Sentra and Reson8.",
    suggestedAction: "Defer new internal tool scope and maintain current meeting intelligence cadence.",
    recommendedDecision: "defer",
    severity: "low" as RiskLevel,
    createdAt: "2026-05-24T12:00:00.000Z"
  },

  // 5. Evidence Gap Signal
  {
    id: "analyst-sentra-evidence-gap",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    evidenceSignalId: "signal-sentra-taxonomy-pending",
    issueId: "issue-sentra-analytics-ingestion",
    roadmapId: "roadmap-sentra-onboarding",
    title: "Sentra validation blocked by event logging gap",
    message: "An evidence gap is blocking the activation gate validation. Sentra's growth experiments cannot be measured reliably.",
    reason: "Onboarding analytics ingestion is blocked, and event taxonomy remains unmapped in backlog research.",
    suggestedAction: "Unblock analytics ingestion and map activation event taxonomy before launching next adaptive variant.",
    recommendedDecision: "continue",
    severity: "medium" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },

  // 6. Capacity Tradeoff Signal
  {
    id: "analyst-portfolio-capacity-tradeoff",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    evidenceSignalId: "signal-sentra-taxonomy-pending",
    issueId: "issue-sentra-analytics-ingestion",
    roadmapId: "roadmap-sentra-onboarding",
    title: "Engineering capacity tradeoff: Sentra vs Reson8",
    message: "Shared engineering allocation creates a clear portfolio bottleneck. Ingestion fixes are delayed by prototype coding.",
    reason: "Omar Khaled is allocated 50% on Reson8 prototype variants while Sentra's urgent analytics ingestion fix is stalled.",
    suggestedAction: "Shift Omar Khaled off Reson8 prototype variant to unblock Sentra onboarding analytics ingestion.",
    recommendedDecision: "continue",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  }
]
