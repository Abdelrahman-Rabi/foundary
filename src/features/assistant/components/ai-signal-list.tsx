import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRiskBadge } from "@/features/assistant/components/ai-badges"

type AiSignalListProps = {
  signals: AiSignal[]
  emptyText: string
}

export function AiSignalList({ signals, emptyText }: AiSignalListProps) {
  if (signals.length === 0) {
    return (
      <div className="rounded-lg border border-border/50 bg-background/35 p-3 text-sm text-muted-foreground">
        {emptyText}
      </div>
    )
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
        </div>
      ))}
    </div>
  )
}
