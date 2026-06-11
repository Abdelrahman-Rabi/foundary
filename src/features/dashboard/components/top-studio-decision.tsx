import { AlertOctagon, ArrowRight, BrainCircuit, FileText, Map } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandCenterDecision } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  decision: CommandCenterDecision | null
  onInspectEvidence?: (decision: CommandCenterDecision) => void
  onOpenBet?: (decision: CommandCenterDecision) => void
  onReviewReasoning?: (decision: CommandCenterDecision) => void
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

const PRESSURE_LABELS: Record<string, string> = {
  overloaded: "High",
  watch: "Medium",
  healthy: "Low",
}

export function TopStudioDecision({
  decision,
  onInspectEvidence,
  onOpenBet,
  onReviewReasoning,
}: Props) {
  if (!decision) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
        <p className="text-sm font-medium text-foreground">
          No urgent studio decisions detected.
        </p>
        <p className="mt-1 text-xs">
          All active ventures have enough evidence for their current level of capacity.
        </p>
      </div>
    )
  }

  const {
    recommendedDecision,
    decisionPressure,
    headline,
    whyNow,
    studioDecision,
    validationConfidence,
    capacityPressure,
    missingProof,
    capacityImpact,
    analystConfidence,
    sourceIssueIds = [],
    sourceRoadmapIds = [],
  } = decision
  const capacityLabel = capacityPressure ? PRESSURE_LABELS[capacityPressure] : "High"

  return (
    <section className="relative overflow-hidden rounded-lg border border-warning/25 bg-card p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-warning/40 bg-warning/5 text-warning">
              <AlertOctagon className="mr-1 h-3 w-3" />
              Command Center Priority
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground capitalize">
              {decisionPressure} pressure
            </Badge>
            {analystConfidence ? (
              <Badge variant="outline" className="border-info/30 bg-info/5 text-info">
                {analystConfidence}% analyst confidence
              </Badge>
            ) : null}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recommended Move
            </p>
            <h2 className="text-2xl font-semibold tracking-normal text-foreground md:text-3xl">
              {headline ?? `${DECISION_LABELS[recommendedDecision] || recommendedDecision}`}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Why now
              </p>
              <p className="mt-1 text-sm leading-6 text-foreground">
                {whyNow ?? decision.reason}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Studio decision
              </p>
              <p className="mt-1 text-sm leading-6 text-foreground">
                {studioDecision ?? decision.reason}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Capacity impact
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              {capacityImpact ??
                "Protects product and engineering capacity for higher-confidence Sentra activation work."}
            </p>
          </div>
        </div>

        <div className="grid shrink-0 gap-2 sm:grid-cols-3 xl:w-[360px] xl:grid-cols-1">
          <SignalStat
            label="Validation confidence"
            value={`${validationConfidence ?? 0}%`}
            tone={(validationConfidence ?? 0) < 40 ? "critical" : "neutral"}
          />
          <SignalStat label="Capacity pressure" value={capacityLabel} tone="warning" />
          <SignalStat
            label="Missing proof"
            value={missingProof ?? "Weekly retained creator signal"}
            tone="neutral"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{sourceIssueIds.length} evidence items</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>{sourceRoadmapIds.length} connected bet</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>Product + engineering capacity</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="h-8"
            onClick={() => onInspectEvidence?.(decision)}
          >
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Inspect evidence
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 border-border/60 bg-card/40"
            onClick={() => onOpenBet?.(decision)}
          >
            <Map className="mr-1.5 h-3.5 w-3.5" />
            Open Bet
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-info hover:text-info"
            onClick={() => onReviewReasoning?.(decision)}
          >
            <BrainCircuit className="mr-1.5 h-3.5 w-3.5" />
            Review reasoning
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function SignalStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "critical" | "warning" | "neutral"
}) {
  return (
    <div className="rounded-md border border-border bg-background/40 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold leading-5 text-foreground",
          tone === "critical" && "text-destructive",
          tone === "warning" && "text-warning"
        )}
      >
        {value}
      </p>
    </div>
  )
}
