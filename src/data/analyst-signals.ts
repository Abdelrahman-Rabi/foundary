import type { AnalystSignal } from "@/types/ai"
import type { RiskLevel } from "@/types/issue"

export const analystSignals: AnalystSignal[] = [
  {
    id: "analyst-sentra-capacity",
    ventureId: "venture-sentra",
    gateId: "gate-sentra-activation",
    title: "Protect Sentra design capacity",
    message: "Sentra is a higher-confidence growth opportunity with activation upside but is experiencing design/product capacity strain.",
    reason: "Lina Haddad is split between active Sentra mobile referral expansion and Reson8 onboarding prototypes.",
    suggestedAction: "Pause Reson8 onboarding prototype work and focus Lina Haddad on Sentra referrals.",
    recommendedDecision: "continue",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "analyst-reson8-sunk-cost",
    ventureId: "venture-reson8",
    gateId: "gate-reson8-retention",
    title: "Narrow Reson8 scope to creator-only retention",
    message: "Reson8 has validation uncertainty with active engineering/product execution and high sunk-cost risk.",
    reason: "Creator retention interviews are showing weak weekly retention signals while engineering prototype work remains active.",
    suggestedAction: "Pause broad build work and run targeted creator interviews.",
    recommendedDecision: "narrow",
    severity: "high" as RiskLevel,
    createdAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "analyst-internal-ops-stable",
    ventureId: "venture-internal-ops",
    gateId: "gate-internal-ops-leverage",
    title: "Maintain steady-state Internal Ops cadence",
    message: "Internal Ops shows stable studio leverage with contained metrics scope and freed operator capacity.",
    reason: "Rollout notes and summaries are complete, freeing product lead Sarah Chen to focus on Sentra and Reson8.",
    suggestedAction: "Defer new internal tool scope and maintain current meeting intelligence cadence.",
    recommendedDecision: "defer",
    severity: "low" as RiskLevel,
    createdAt: "2026-05-24T12:00:00.000Z"
  }
]
