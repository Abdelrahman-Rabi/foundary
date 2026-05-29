"use client"

import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRiskBadge } from "@/features/assistant/components/ai-badges"
import { AiSignalEmptyState } from "@/features/assistant/components/ai-signal-empty-state"
import { Button } from "@/components/ui/button"

type AiSignalListProps = {
  signals: AiSignal[]
  emptyText: string
  onOpenSource?: (signal: AiSignal) => void
  onOpenInsight?: (signalId: string) => void
}

export function AiSignalList({
  signals,
  emptyText,
  onOpenSource,
  onOpenInsight,
}: AiSignalListProps) {
  if (signals.length === 0) {
    return <AiSignalEmptyState title={emptyText} />
  }

  return (
    <div className="space-y-2">
      {signals.map((signal) => (
        <div
          key={signal.id}
          className="rounded-lg border border-border/50 bg-muted/20 p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {signal.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {signal.observation}
              </p>
            </div>
            <AiRiskBadge severity={signal.severity} />
          </div>
          <p className="mt-2 text-xs leading-5 text-foreground">
            {signal.suggestedAction}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {signal.ventureName} / {signal.sourceLabel}
            </span>
            {onOpenSource ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto h-7 px-2 text-xs"
                onClick={() => onOpenSource(signal)}
              >
                {signal.sourceActionLabel ?? "Open source"}
              </Button>
            ) : null}
            {onOpenInsight ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => onOpenInsight(signal.id)}
              >
                Inspect
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
