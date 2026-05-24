import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DashboardRisk } from "@/features/dashboard/utils/dashboard-metrics"

type RiskPanelProps = {
  risks: DashboardRisk[]
}

const severityClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function RiskPanel({ risks }: RiskPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Portfolio risk</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Operational concerns that may need intervention.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{risks.length} signals</span>
      </div>

      <div className="space-y-3">
        {risks.length > 0 ? (
          risks.map((risk) => (
            <div
              key={risk.id}
              className="rounded-lg border border-border/50 bg-background/35 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-foreground">
                    {risk.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {risk.ventureName}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", severityClassName[risk.severity])}
                >
                  {risk.severity}
                </Badge>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {risk.explanation}
              </p>
              <p className="mt-2 text-xs leading-5 text-foreground">
                {risk.suggestedAction}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-border/50 bg-background/35 p-3 text-sm text-muted-foreground">
            No active delivery risks detected.
          </div>
        )}
      </div>
    </section>
  )
}
