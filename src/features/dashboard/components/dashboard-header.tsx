import { Button } from "@/components/ui/button"
import type { Venture } from "@/types/venture"

type DashboardHeaderProps = {
  mode: "portfolio" | "venture"
  activeVenture: Venture | null
  scopedVentures: Venture[]
}

export function DashboardHeader({
  mode,
  activeVenture,
  scopedVentures,
}: DashboardHeaderProps) {
  const attentionCount = scopedVentures.filter(
    (venture) => venture.health === "at-risk" || venture.health === "critical"
  ).length
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name
  const summary =
    mode === "portfolio"
      ? `${attentionCount} venture${attentionCount === 1 ? "" : "s"} require attention.`
      : `${contextLabel} is ${activeVenture?.health ?? "stable"} with ${activeVenture?.confidence ?? 0}% confidence.`

  return (
    <header className="flex items-start justify-between gap-6 border-b border-border/60 pb-5">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {contextLabel} overview
        </p>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {summary} Operational signals are derived from local venture, issue,
          roadmap, and AI insight data.
        </p>
      </div>
      <Button variant="outline" className="hidden border-border/60 bg-card/40 md:inline-flex">
        Analyze context
      </Button>
    </header>
  )
}
