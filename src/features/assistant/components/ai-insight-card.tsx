"use client"

import { BrainCircuit } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRecommendationBadge, AiRiskBadge } from "@/features/assistant/components/ai-badges"
import { AiConfidenceIndicator } from "@/features/assistant/components/ai-confidence-indicator"

type AiInsightCardProps = {
  signal: AiSignal
  onOpenInsight?: (signalId: string) => void
  compact?: boolean
}

export function AiInsightCard({
  signal,
  onOpenInsight,
  compact = false,
}: AiInsightCardProps) {
  return (
    <article className="rounded-lg border border-border/60 bg-muted/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">
              {signal.title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {signal.observation}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <AiRiskBadge severity={signal.severity} />
          {signal.recommendationKind ? (
            <AiRecommendationBadge kind={signal.recommendationKind} />
          ) : null}
        </div>
      </div>

      {!compact ? (
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <SignalText label="Reason" value={signal.reason} />
            <SignalText label="Suggested action" value={signal.suggestedAction} />
          </div>
          <AiConfidenceIndicator confidence={signal.confidence} />
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-foreground">
          {signal.suggestedAction}
        </p>
      )}

      {onOpenInsight ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-3 h-8 px-2 text-xs"
          onClick={() => onOpenInsight(signal.id)}
        >
          Inspect signal
        </Button>
      ) : null}
    </article>
  )
}

function SignalText({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs leading-5 text-foreground">{value}</p>
    </div>
  )
}
