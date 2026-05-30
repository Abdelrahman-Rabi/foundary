import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useUiStore } from "@/stores/ui-store"
import {
  getHealthLabel,
  getRiskLevelForVenture,
} from "@/features/dashboard/utils/dashboard-metrics"
import { cn } from "@/lib/utils"
import type { Venture } from "@/types/venture"

type VentureHealthPanelProps = {
  ventures: Venture[]
}

const riskClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function VentureHealthPanel({ ventures }: VentureHealthPanelProps) {
  const openQuickCreateVenture = useUiStore((state) => state.openQuickCreateVenture)

  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Venture health</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Momentum, load, and confidence by venture.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{ventures.length} visible</span>
      </div>

      <div className="space-y-3">
        {ventures.length > 0 ? (
          ventures.map((venture) => {
            const risk = getRiskLevelForVenture(venture)

          return (
            <div
              key={venture.id}
              className="rounded-lg border border-border/50 bg-background/35 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: venture.color }}
                    />
                    <h3 className="truncate text-sm font-medium text-foreground">
                      {venture.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {venture.stage} / {venture.momentum} momentum
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", riskClassName[risk])}
                >
                  {risk} risk
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Active work</p>
                  <p className="mt-1 font-medium text-foreground">
                    {venture.activeIssueCount}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Overdue</p>
                  <p className="mt-1 font-medium text-foreground">
                    {venture.overdueIssueCount}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Health</p>
                  <p className="mt-1 font-medium text-foreground">
                    {getHealthLabel(venture.health)}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Roadmap progress</span>
                  <span className="text-foreground">{venture.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="h-full rounded-full bg-primary/80"
                    style={{ width: `${venture.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-foreground">{venture.confidence}%</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="rounded-lg border border-dashed border-border/60 bg-background/25 p-6 text-center">
          <p className="text-sm font-medium text-foreground">No ventures yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Create your first venture context to begin execution tracking.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4 gap-1.5"
            onClick={openQuickCreateVenture}
          >
            <Plus className="size-3.5" strokeWidth={1.8} />
            Create venture
          </Button>
        </div>
      )}
      </div>
    </section>
  )
}
