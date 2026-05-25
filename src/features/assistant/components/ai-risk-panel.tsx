"use client"

import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiSignalList } from "@/features/assistant/components/ai-signal-list"

type AiRiskPanelProps = {
  signals: AiSignal[]
  onOpenSource?: (signal: AiSignal) => void
  onOpenInsight?: (signalId: string) => void
}

export function AiRiskPanel({
  signals,
  onOpenSource,
  onOpenInsight,
}: AiRiskPanelProps) {
  return (
    <AiSignalList
      signals={signals}
      emptyText="No significant delivery risks detected."
      onOpenSource={onOpenSource}
      onOpenInsight={onOpenInsight}
    />
  )
}
