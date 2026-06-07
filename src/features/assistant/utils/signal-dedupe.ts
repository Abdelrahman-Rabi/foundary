import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import type { AiRecommendationKind } from "@/types/ai"
import type { RiskLevel } from "@/types/issue"

export function getSignalDedupeKey(signal: AiSignal) {
  const entityKey = `${signal.entityType}:${signal.entityId ?? signal.sourceId ?? "context"}`
  const kindKey = signal.recommendationKind ?? signal.type

  return `${entityKey}:${kindKey}`
}

export function dedupeSignals(signals: AiSignal[]) {
  const byKey = new Map<string, AiSignal>()

  signals.forEach((signal) => {
    const key = signal.dedupeKey ?? getSignalDedupeKey(signal)
    const existing = byKey.get(key)

    if (!existing || scoreSignal(signal) > scoreSignal(existing)) {
      byKey.set(key, { ...signal, dedupeKey: key })
    }
  })

  return sortSignals([...byKey.values()])
}

export function sortSignals(signals: AiSignal[]) {
  const severityRank: Record<RiskLevel, number> = {
    high: 0,
    medium: 1,
    low: 2,
  }

  return [...signals].sort(
    (a, b) =>
      signalTypeRank(b.signalType) - signalTypeRank(a.signalType) ||
      severityRank[a.severity] - severityRank[b.severity] ||
      recommendationRank(b.recommendationKind) -
        recommendationRank(a.recommendationKind) ||
      b.confidence - a.confidence
  )
}

function signalTypeRank(type: AiSignal["signalType"]) {
  const rank: Record<AiSignal["signalType"], number> = {
    "studio-decision": 6,
    "sunk-cost-risk": 5,
    "capacity-tradeoff": 4,
    "evidence-gap": 3,
    "gate-confidence": 2,
    "execution-risk": 1,
  }

  return rank[type]
}

function scoreSignal(signal: AiSignal) {
  const specificity =
    signal.signalOrigin === "static" ? 20 : signal.signalOrigin === "derived" ? 12 : 8
  const copyScore =
    signal.reason.length + signal.observation.length + signal.suggestedAction.length

  return specificity + Math.min(copyScore / 80, 8) + signal.confidence / 100
}

function recommendationRank(kind?: AiRecommendationKind) {
  if (!kind) {
    return 0
  }

  const rank: Record<AiRecommendationKind, number> = {
    kill: 6,
    "partner-review": 6,
    "reduce-scope": 5,
    narrow: 5,
    pause: 5,
    split: 4,
    clarify: 3,
    prioritize: 2,
    "staff-up": 2,
    continue: 1,
    defer: 1,
  }


  return rank[kind]
}
