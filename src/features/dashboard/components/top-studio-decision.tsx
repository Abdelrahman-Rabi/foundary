import { AlertOctagon, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CommandCenterDecision } from "@/types/dashboard"

interface Props {
  decision: CommandCenterDecision | null
  onVentureSelect?: (ventureId: string) => void
}

const DECISION_LABELS: Record<string, string> = {
  continue: "Continue",
  narrow: "Narrow Scope",
  pause: "Pause Execution",
  kill: "Stop Venture",
  "staff-up": "Staff Up",
  defer: "Defer Scope",
  "partner-review": "Partner Review",
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

export function TopStudioDecision({ decision, onVentureSelect }: Props) {
  if (!decision) {
    return (
      <div className="rounded-xl border border-dashed border-border p-5 text-center text-muted-foreground">
        No active studio decisions recommended.
      </div>
    )
  }

  const { ventureId, ventureName, recommendedDecision, decisionPressure, reason, gateName } = decision

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            <AlertOctagon className="h-3.5 w-3.5 text-warning" />
            Top Studio Decision
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {ventureName} &mdash; {gateName ?? "Validation Gate"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={COLOR_MAP[recommendedDecision]}>
            {DECISION_LABELS[recommendedDecision] || recommendedDecision}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground capitalize">
            {decisionPressure} pressure
          </Badge>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {reason}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-muted-foreground">Recommended move</span>
        {onVentureSelect && (
          <button
            onClick={() => onVentureSelect(ventureId)}
            className="flex items-center gap-1 text-info hover:underline"
          >
            Switch to {ventureName} view <ArrowUpRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
