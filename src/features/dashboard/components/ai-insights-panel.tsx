import { Badge } from "@/components/ui/badge"
import { getVentureName } from "@/features/dashboard/utils/dashboard-metrics"
import { cn } from "@/lib/utils"
import type { AiInsight } from "@/types/ai"
import type { Venture } from "@/types/venture"

type AiInsightsPanelProps = {
  insights: AiInsight[]
  ventures: Venture[]
}

const severityClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function AiInsightsPanel({ insights, ventures }: AiInsightsPanelProps) {
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
        <span className="text-xs text-muted-foreground">{insights.length} active</span>
      </div>

      <div className="space-y-3">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-lg border border-border/50 bg-muted/20 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-foreground">
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {getVentureName(ventures, insight.ventureId)} / Confidence {insight.confidence}%
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", severityClassName[insight.severity])}
                >
                  {insight.severity}
                </Badge>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {insight.message}
              </p>
              {insight.suggestedAction ? (
                <p className="mt-2 text-xs leading-5 text-foreground">
                  {insight.suggestedAction}
                </p>
              ) : null}
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
