import { Users, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CapacityPressureSummary } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  pressures: CapacityPressureSummary[]
  onOpenSignalSource?: (source: { sourceType: "issue" | "roadmap"; sourceId: string }) => void
}

const PRESSURE_COLOR: Record<string, string> = {
  overloaded: "border-destructive/40 text-destructive bg-destructive/5",
  watch: "border-warning/40 text-warning bg-warning/5",
  healthy: "border-success/40 text-success bg-success/5",
}

export function OperatorCapacityPanel({ pressures, onOpenSignalSource }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
          <Users className="h-4 w-4 text-info" />
          Operator capacity
        </h3>
        <p className="text-xs text-muted-foreground">
          Shared studio talent contention and function-level pressure alerts.
        </p>
      </div>

      <div className="space-y-4">
        {pressures.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-1">
            <AlertCircle className="h-6 w-6 text-muted mb-1" />
            Operator allocations healthy.
          </div>
        ) : (
          pressures.map((press) => (
            <div
              key={press.id}
              className="rounded-lg border border-border p-3.5 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs text-foreground uppercase tracking-wider">{press.function} function</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">{press.totalAllocationPercent}% load</span>
                  <Badge variant="outline" className={cn("text-[9px] py-0 h-4 uppercase", PRESSURE_COLOR[press.pressure])}>
                    {press.pressure}
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-[10px] uppercase text-muted-foreground block mb-0.5">Contention Reason</span>
                {press.contentionReason}
              </div>

              <div className="text-xs text-muted-foreground border-l-2 border-border pl-2 italic">
                <span className="font-semibold text-[10px] uppercase text-muted-foreground block not-italic mb-0.5">Downstream Impact</span>
                {press.downstreamImpact}
              </div>

              {(press.sourceIssueIds.length > 0 || press.sourceRoadmapIds.length > 0) && onOpenSignalSource && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-border/60">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Related work:</span>
                  {press.sourceIssueIds.slice(0, 2).map((id) => (
                    <button
                      key={id}
                      onClick={() => onOpenSignalSource({ sourceType: "issue", sourceId: id })}
                      className="text-[10px] text-info hover:underline bg-info/5 border border-info/20 rounded px-1"
                    >
                      Issue
                    </button>
                  ))}
                  {press.sourceRoadmapIds.slice(0, 2).map((id) => (
                    <button
                      key={id}
                      onClick={() => onOpenSignalSource({ sourceType: "roadmap", sourceId: id })}
                      className="text-[10px] text-info hover:underline bg-info/5 border border-info/20 rounded px-1"
                    >
                      Roadmap
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
