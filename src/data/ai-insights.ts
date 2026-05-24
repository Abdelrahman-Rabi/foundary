import type { AiInsight } from "@/types/ai"

export const aiInsights: AiInsight[] = [
  {
    id: "insight-sentra-analytics-risk",
    ventureId: "venture-sentra",
    entityType: "roadmap",
    entityId: "roadmap-sentra-onboarding",
    type: "risk",
    title: "Onboarding confidence is declining",
    message:
      "Analytics infrastructure work is blocked while onboarding experimentation remains active.",
    confidence: 84,
    severity: "high",
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
    message:
      "The retention research work defines interviews but not a decision threshold.",
    confidence: 76,
    severity: "medium",
    suggestedAction:
      "Define the retention signal required before implementation work begins.",
    createdAt: "2026-05-24T10:00:00.000Z",
  },
]
