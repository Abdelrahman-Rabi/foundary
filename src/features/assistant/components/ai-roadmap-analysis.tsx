"use client"

import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import { AiSignalEmptyState } from "@/features/assistant/components/ai-signal-empty-state"

type AiRoadmapAnalysisProps = {
  signals: AiSignal[]
  onOpenSource?: (signal: AiSignal) => void
  onOpenInsight?: (signalId: string) => void
}

export function AiRoadmapAnalysis({
  signals,
  onOpenSource,
  onOpenInsight,
}: AiRoadmapAnalysisProps) {
  if (signals.length === 0) {
    return (
      <AiSignalEmptyState title="No strategic risk insight detected for this initiative." />
    )
  }

  return (
    <div className="space-y-3">
      {signals.map((signal) =>
        signal.recommendationKind ? (
          <AiRecommendationBlock
            key={signal.id}
            signal={signal}
            onOpenSource={onOpenSource}
            onOpenInsight={onOpenInsight}
          />
        ) : (
          <AiInsightCard
            key={signal.id}
            signal={signal}
            compact
            onOpenSource={onOpenSource}
            onOpenInsight={onOpenInsight}
          />
        )
      )}
    </div>
  )
}
