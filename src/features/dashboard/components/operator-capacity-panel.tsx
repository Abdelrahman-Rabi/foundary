import { Users, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CapacityPressureSummary } from "@/types/dashboard"
import { cn } from "@/lib/utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"

interface Props {
  pressures: CapacityPressureSummary[]
  onOpenSignalSource?: (source: { sourceType: "issue" | "roadmap"; sourceId: string }) => void
}

const PRESSURE_COLOR: Record<string, string> = {
  overloaded: "border-destructive/40 text-destructive bg-destructive/5",
  watch: "border-warning/40 text-warning bg-warning/5",
  healthy: "border-success/40 text-success bg-success/5",
}

const DECISION_COLOR: Record<string, string> = {
  continue: "border-success/40 text-success bg-success/5",
  narrow: "border-warning/50 text-warning bg-warning/5",
  pause: "border-warning/50 text-warning bg-warning/5",
  kill: "border-destructive/50 text-destructive bg-destructive/5",
  "staff-up": "border-info/40 text-info bg-info/5",
  defer: "border-muted-foreground/40 text-muted-foreground bg-muted-foreground/5",
  "partner-review": "border-destructive/50 text-destructive bg-destructive/5",
}

/**
 * Build a venture-explicit recommended move label.
 * For actions that reduce load on a venture (pause/narrow/defer/kill),
 * the target is the last affected venture (the one consuming the contested capacity).
 * For protective actions (staff-up/protect), the target is the first venture (the one to protect).
 * Single-venture pressures always use the sole name directly.
 */
function buildDecisionLabel(decision: string, ventureNames: string[]): string {
  const reducingActions = ["pause", "narrow", "defer", "kill"]
  const protectActions = ["staff-up"]

  if (ventureNames.length === 0) {
    const fallbacks: Record<string, string> = {
      continue: "Continue",
      narrow: "Narrow",
      pause: "Pause",
      kill: "Stop",
      "staff-up": "Protect capacity",
      defer: "Defer",
      "partner-review": "Escalate review",
    }
    return fallbacks[decision] ?? decision
  }

  // Pick the venture the action targets
  let targetVenture: string
  if (ventureNames.length === 1) {
    targetVenture = ventureNames[0]
  } else if (reducingActions.includes(decision) && ventureNames.includes("Reson8")) {
    targetVenture = "Reson8"
  } else if (reducingActions.includes(decision)) {
    // For reducing actions, target the last named venture
    // (seeded data orders protected venture first, contested last)
    targetVenture = ventureNames[ventureNames.length - 1]
  } else if (protectActions.includes(decision)) {
    // For protective actions, target the first named venture (the one to protect)
    targetVenture = ventureNames[0]
  } else {
    targetVenture = ventureNames[0]
  }

  switch (decision) {
    case "continue": return "Continue"
    case "narrow":   return `Narrow ${targetVenture}`
    case "pause":    return `Pause ${targetVenture}`
    case "kill":     return `Stop ${targetVenture}`
    case "staff-up": return `Protect ${targetVenture} capacity`
    case "defer":    return `Defer ${targetVenture}`
    case "partner-review": return "Escalate review"
    default:         return decision
  }
}

export function OperatorCapacityPanel({ pressures, onOpenSignalSource }: Props) {
  // Query stores once at the top to avoid render churn
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)

  const getIssueLabel = (id: string) => {
    const issue = issues.find((i) => i.id === id)
    if (!issue) return id
    return issue.title.length > 20 ? issue.title.slice(0, 18) + "..." : issue.title
  }

  const getRoadmapLabel = (id: string) => {
    const roadmap = roadmapItems.find((r) => r.id === id)
    if (!roadmap) return id
    return roadmap.title.length > 20 ? roadmap.title.slice(0, 18) + "..." : roadmap.title
  }

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
              className="rounded-lg border border-border p-3.5 space-y-2.5 bg-muted/5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs text-foreground uppercase tracking-wider">{press.function} function</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-[10px] text-muted-foreground font-bold">{press.totalAllocationPercent}% load</span>
                  <Badge variant="outline" className={cn("text-[9px] py-0 h-4 uppercase font-bold", PRESSURE_COLOR[press.pressure])}>
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

              {press.recommendedDecision && (
                <div className="flex items-center gap-1.5 text-xs pt-1">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground">Recommended Move:</span>
                  <Badge variant="outline" className={cn("text-[9px] py-0 h-4.5 uppercase font-mono font-bold px-1.5", DECISION_COLOR[press.recommendedDecision])}>
                    {buildDecisionLabel(press.recommendedDecision, press.affectedVentureNames)}
                  </Badge>
                </div>
              )}

              {(press.sourceIssueIds.length > 0 || press.sourceRoadmapIds.length > 0) && onOpenSignalSource && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Related work:</span>
                  {press.sourceIssueIds.slice(0, 2).map((id) => (
                    <button
                      key={id}
                      onClick={() => onOpenSignalSource({ sourceType: "issue", sourceId: id })}
                      className="text-[10px] text-info hover:underline bg-info/5 border border-info/20 rounded px-1.5 py-0.5 font-medium transition-colors"
                      title={id}
                    >
                      {getIssueLabel(id)}
                    </button>
                  ))}
                  {press.sourceRoadmapIds.slice(0, 2).map((id) => (
                    <button
                      key={id}
                      onClick={() => onOpenSignalSource({ sourceType: "roadmap", sourceId: id })}
                      className="text-[10px] text-info hover:underline bg-info/5 border border-info/20 rounded px-1.5 py-0.5 font-medium transition-colors"
                      title={id}
                    >
                      {getRoadmapLabel(id)}
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
