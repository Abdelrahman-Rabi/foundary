import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DashboardRisk } from "@/features/dashboard/utils/dashboard-metrics"

type RiskPanelProps = {
  risks: DashboardRisk[]
  onOpenRisk: (risk: DashboardRisk) => void
}

const severityClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function RiskPanel({ risks, onOpenRisk }: RiskPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            Validation confidence risk
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Execution signals that can change venture validation confidence.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{risks.length} signals</span>
      </div>

      <div className="space-y-3">
        {risks.length > 0 ? (
          risks.map((risk) => (
            <div
              role="button"
              tabIndex={0}
              key={risk.id}
              className="w-full rounded-lg border border-border/50 bg-background/35 p-3 text-left transition-colors hover:border-border hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              onClick={() => onOpenRisk(risk)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onOpenRisk(risk)
                }
              }}
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
          <div className="rounded-lg border border-border/50 bg-background/35 p-3">
            <p className="text-sm text-muted-foreground">
              No active validation confidence risks detected.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Current issue and roadmap signals do not require an operating
              decision.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
