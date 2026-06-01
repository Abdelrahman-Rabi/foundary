import { Button } from "@/components/ui/button"
import type { Venture } from "@/types/venture"

type DashboardHeaderProps = {
  mode: "portfolio" | "venture"
  activeVenture: Venture | null
  scopedVentures: Venture[]
  onAnalyzeContext: () => void
}

export function DashboardHeader({
  mode,
  activeVenture,
  scopedVentures,
  onAnalyzeContext,
}: DashboardHeaderProps) {
  const attentionCount = scopedVentures.filter(
    (venture) => venture.health === "at-risk" || venture.health === "critical"
  ).length
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name
  const summary =
    scopedVentures.length === 0
      ? "No venture context is active yet. Create a venture or reset demo data to begin shaping operational signal."
      : mode === "portfolio"
        ? `${attentionCount} venture${attentionCount === 1 ? "" : "s"} require attention. Review venture health, execution pressure, and roadmap confidence from one operating view.`
        : `${contextLabel} is ${activeVenture?.health ?? "stable"} with ${activeVenture?.confidence ?? 0}% roadmap confidence. Use the highest-signal work below to decide the next operating move.`

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
          {summary}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="hidden border-border/60 bg-card/40 transition-colors hover:bg-muted/50 md:inline-flex"
        onClick={onAnalyzeContext}
      >
        Analyze context
      </Button>
    </header>
  )
}
