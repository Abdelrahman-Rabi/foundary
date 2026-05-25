import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRecommendationBadge, AiRiskBadge } from "@/features/assistant/components/ai-badges"
import { AiConfidenceIndicator } from "@/features/assistant/components/ai-confidence-indicator"

type AiRecommendationBlockProps = {
  signal: AiSignal
}

export function AiRecommendationBlock({ signal }: AiRecommendationBlockProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-muted/20 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Recommendation</p>
          <h3 className="mt-1 text-sm font-medium text-foreground">
            {signal.title}
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <AiRiskBadge severity={signal.severity} />
          {signal.recommendationKind ? (
            <AiRecommendationBadge kind={signal.recommendationKind} />
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        {signal.reason}
      </p>
      <p className="mt-2 text-xs leading-5 text-foreground">
        {signal.suggestedAction}
      </p>
      <AiConfidenceIndicator
        confidence={signal.confidence}
        className="mt-3 max-w-40"
      />
    </section>
  )
}
