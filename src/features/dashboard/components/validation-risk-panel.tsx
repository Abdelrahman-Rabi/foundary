import { AlertTriangle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ValidationRiskSummary } from "@/types/dashboard"
import { cn } from "@/lib/utils"
import { useVentureStore } from "@/stores/venture-store"
import { resolveValidationGateContext } from "@/features/synchronization/utils/validation-gate-resolver"

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

const PRESSURE_COLOR: Record<string, string> = {
  critical: "text-destructive border-destructive/20 bg-destructive/5",
  high: "text-destructive border-destructive/20 bg-destructive/5",
  medium: "text-warning border-warning/20 bg-warning/5",
  low: "text-success border-success/20 bg-success/5",
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

const STRENGTH_COLOR: Record<string, string> = {
  strong: "text-success",
  moderate: "text-info",
  weak: "text-warning",
  negative: "text-destructive",
}

export function ValidationRiskPanel({ risks, onOpenGate }: Props) {
  const ventures = useVentureStore((state) => state.ventures)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Validation Gates
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
          risks.map((risk) => {
            const context = resolveValidationGateContext(risk.ventureId, ventures, risk.gateId)
            
            // If context is null, fallback gracefully
            const gate = context?.gate || null
            const qualitativeList = context?.qualitativeEvidenceList || []
            const observedSignals = context?.observedSignals || []

            const decisionPressure = gate?.decisionPressure || "low"
            const recommendedDecision = gate?.recommendedDecision || "continue"

            return (
              <div
                key={risk.gateId}
                onClick={() => onOpenGate?.(risk.gateId)}
                className="rounded-lg border border-border p-4 space-y-3 hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-semibold text-xs text-foreground line-clamp-1">
                    {risk.ventureName} &mdash; {risk.gateName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className={cn("text-[9px] py-0 h-4 uppercase font-bold", STATUS_COLOR[risk.status])}>
                      {risk.status}
                    </Badge>
                    <Badge variant="outline" className={cn("text-[9px] py-0 h-4 uppercase font-bold", PRESSURE_COLOR[decisionPressure])}>
                      Pressure: {decisionPressure}
                    </Badge>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/20 p-2.5 rounded border border-border/40">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block mb-1">Tested Assumption</span>
                  {risk.assumption}
                </div>

                {/* Evidence Progress checklist */}
                {qualitativeList.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Evidence Status</span>
                    <ul className="text-xs space-y-1">
                      {qualitativeList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                          <span className={cn(
                            "inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                            item.status === "observed" ? "bg-success" : 
                            item.status === "challenged" ? "bg-destructive" : 
                            item.status === "pending" ? "bg-warning" : "bg-muted-foreground/40"
                          )} />
                          <span>
                            {item.required}{" "}
                            {item.status !== "missing" && (
                              <span className="text-[10px] text-muted-foreground/60 italic font-mono">
                                ({item.status})
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Observed signals */}
                {observedSignals.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Observed Signals</span>
                    <div className="space-y-1">
                      {observedSignals.map((signal) => (
                        <div key={signal.id} className="text-[11px] leading-relaxed text-muted-foreground bg-muted/10 p-1.5 rounded">
                          <span className={cn("font-bold capitalize mr-1", STRENGTH_COLOR[signal.strength])}>
                            {signal.strength}:
                          </span>
                          {signal.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] border-t border-border/40 pt-2 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Validation Confidence:</span>
                    <span className="font-semibold text-foreground">{risk.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Recommended Move:</span>
                    <Badge variant="outline" className={cn("h-4.5 text-[9px] py-0 px-1 font-semibold uppercase", COLOR_MAP[recommendedDecision])}>
                      {DECISION_LABELS[recommendedDecision] || recommendedDecision}
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

