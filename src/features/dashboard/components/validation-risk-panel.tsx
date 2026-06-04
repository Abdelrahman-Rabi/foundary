import { AlertTriangle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ValidationRiskSummary } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  risks: ValidationRiskSummary[]
  onOpenGate?: (gateId: string) => void
}

const STATUS_COLOR: Record<string, string> = {
  blocked: "border-destructive/40 text-destructive bg-destructive/5",
  failed: "border-destructive/40 text-destructive bg-destructive/5",
  "at-risk": "border-destructive/40 text-destructive bg-destructive/5",
  watch: "border-warning/40 text-warning bg-warning/5",
  healthy: "border-success/40 text-success bg-success/5",
}

export function ValidationRiskPanel({ risks, onOpenGate }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Validation risk
        </h3>
        <p className="text-xs text-muted-foreground">
          Gates and unproven assumptions holding back venture validation.
        </p>
      </div>

      <div className="space-y-4">
        {risks.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-1">
            <ShieldCheck className="h-6 w-6 text-success mb-1" />
            No active validation risks.
          </div>
        ) : (
          risks.map((risk) => (
            <div
              key={risk.gateId}
              onClick={() => onOpenGate?.(risk.gateId)}
              className="rounded-lg border border-border p-3.5 space-y-2 hover:bg-muted/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-xs text-foreground line-clamp-1">{risk.ventureName} &mdash; {risk.gateName}</span>
                <Badge variant="outline" className={cn("text-[9px] py-0 h-4 uppercase", STATUS_COLOR[risk.status])}>
                  {risk.status}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                <span className="font-semibold text-[10px] uppercase text-muted-foreground block mb-0.5">Tested Assumption</span>
                {risk.assumption}
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Validation Confidence</span>
                <span className="font-semibold text-foreground">{risk.confidence}%</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
