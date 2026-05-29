import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"

type AiInsightsPanelProps = {
  signals: AiSignal[]
  onOpenSignal: (signal: AiSignal) => void
  onOpenSource: (signal: AiSignal) => void
}

export function AiInsightsPanel({
  signals,
  onOpenSignal,
  onOpenSource,
}: AiInsightsPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            AI operational insights
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Embedded observations from current execution signals.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{signals.length} active</span>
      </div>

      <div className="space-y-3">
        {signals.length > 0 ? (
          signals.map((signal) => (
            <div key={signal.id}>
              <p className="mb-2 text-xs text-muted-foreground">
                {signal.ventureName} / {signal.sourceLabel}
              </p>
              <AiInsightCard
                signal={signal}
                compact
                onOpenSource={onOpenSource}
                onOpenInsight={() => onOpenSignal(signal)}
              />
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-border/50 bg-background/35 p-3">
            <p className="text-sm text-muted-foreground">
              No significant operational insights for this context.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              AI signals will appear when issue or roadmap confidence changes.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
