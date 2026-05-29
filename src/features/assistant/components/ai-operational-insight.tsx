"use client"

import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"

type AiOperationalInsightProps = {
  signal: AiSignal
  onOpenSource?: (signal: AiSignal) => void
  onOpenInsight?: (signalId: string) => void
}

export function AiOperationalInsight({
  signal,
  onOpenSource,
  onOpenInsight,
}: AiOperationalInsightProps) {
  return (
    <AiInsightCard
      signal={signal}
      onOpenSource={onOpenSource}
      onOpenInsight={onOpenInsight}
    />
  )
}
