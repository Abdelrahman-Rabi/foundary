import { Badge } from "@/components/ui/badge"
import type { CommandCenterData } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  attentionQueue: CommandCenterData["attentionQueue"]
  activeVentureId: string | null
  onVentureSelect: (ventureId: string) => void
}

const DECISION_LABELS: Record<string, string> = {
  continue: "Continue",
  narrow: "Narrow",
  pause: "Pause",
  kill: "Stop",
  "staff-up": "Staff Up",
  defer: "Defer",
  "partner-review": "Escalate",
}

const COLOR_MAP: Record<string, string> = {
  narrow: "border-warning/50 text-warning bg-warning/5",
  pause: "border-warning/50 text-warning bg-warning/5",
  kill: "border-destructive/50 text-destructive bg-destructive/5",
  "staff-up": "border-info/40 text-info bg-info/5",
  defer: "border-muted-foreground/40 text-muted-foreground bg-muted-foreground/5",
  "partner-review": "border-destructive/50 text-destructive bg-destructive/5",
  continue: "border-success/40 text-success bg-success/5",
}

const PRESSURE_COLOR: Record<string, string> = {
  critical: "text-destructive",
  high: "text-destructive",
  medium: "text-warning",
  low: "text-success",
}

const CAPACITY_COLOR: Record<string, string> = {
  overloaded: "border-destructive/50 text-destructive",
  watch: "border-warning/50 text-warning",
  healthy: "border-success/40 text-success",
}

export function AttentionQueueCard({ attentionQueue, activeVentureId, onVentureSelect }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Portfolio Attention Queue
        </h3>
        <p className="text-xs text-muted-foreground">
          Ventures ranked dynamically by decision pressure, gate status, confidence, and capacity contention.
        </p>
      </div>

      <div className="divide-y divide-border">
        {attentionQueue.length === 0 ? (
          <div className="py-4 text-center text-xs text-muted-foreground">
            No ventures loaded. Add a venture to start tracking.
          </div>
        ) : (
          attentionQueue.map((item) => {
            const isActive = activeVentureId === item.ventureId

            return (
              <div
                key={item.ventureId}
                onClick={() => onVentureSelect(item.ventureId)}
                className={cn(
                  "flex flex-col gap-3 py-3.5 transition-colors cursor-pointer md:flex-row md:items-center md:justify-between hover:bg-muted/30 px-2 rounded-lg",
                  isActive && "bg-muted/50 border border-border"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{item.ventureName}</span>
                    <Badge variant="secondary" className="text-[10px] uppercase font-semibold h-4 py-0 px-1 text-muted-foreground bg-muted/60">
                      {item.phase}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {item.gateName ?? "No gates active"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-5">
                  {/* Validation Confidence */}
                  <div className="flex flex-col gap-0.5 min-w-[70px]">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Validation</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-info"
                          style={{ width: `${item.validationConfidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {item.validationConfidence}%
                      </span>
                    </div>
                  </div>

                  {/* Decision Pressure */}
                  <div className="flex flex-col gap-0.5 min-w-[70px]">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Pressure</span>
                    <span className={cn("text-xs font-semibold uppercase", PRESSURE_COLOR[item.decisionPressure])}>
                      {item.decisionPressure}
                    </span>
                  </div>

                  {/* Capacity Load */}
                  <div className="flex flex-col gap-0.5 min-w-[70px]">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Capacity</span>
                    <span className={cn("text-xs font-semibold capitalize", CAPACITY_COLOR[item.capacityPressure])}>
                      {item.capacityPressure}
                    </span>
                  </div>

                  {/* Recommended Move */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Recommended move</span>
                    <Badge variant="outline" className={cn("h-5 text-[10px] py-0 px-1.5", COLOR_MAP[item.recommendedDecision])}>
                      {DECISION_LABELS[item.recommendedDecision] || item.recommendedDecision}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
