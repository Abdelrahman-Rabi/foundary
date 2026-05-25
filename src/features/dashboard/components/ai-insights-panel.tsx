import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { getInsightSignals } from "@/features/assistant/utils/assistant-analysis"
import { getVentureName } from "@/features/dashboard/utils/dashboard-metrics"
import type { AiInsight } from "@/types/ai"
import type { Venture } from "@/types/venture"

type AiInsightsPanelProps = {
  insights: AiInsight[]
  ventures: Venture[]
}

export function AiInsightsPanel({ insights, ventures }: AiInsightsPanelProps) {
  const signals = getInsightSignals(insights)

  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            AI operational insights
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Embedded observations from mocked intelligence signals.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{signals.length} active</span>
      </div>

      <div className="space-y-3">
        {signals.length > 0 ? (
          signals.map((signal) => (
            <div key={signal.id}>
              <p className="mb-2 text-xs text-muted-foreground">
                {signal.ventureId
                  ? getVentureName(ventures, signal.ventureId)
                  : "Portfolio"}
              </p>
              <AiInsightCard signal={signal} compact />
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-border/50 bg-background/35 p-3 text-sm text-muted-foreground">
            No significant operational insights for this context.
          </div>
        )}
      </div>
    </section>
  )
}
