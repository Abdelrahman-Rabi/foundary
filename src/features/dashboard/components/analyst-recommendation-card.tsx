import { BrainCircuit, ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { AnalystSignal } from "@/types/ai"

interface Props {
  recommendation: AnalystSignal | null
  onOpenAssistant: () => void
  onOpenIssue: (issueId: string) => void
  onOpenRoadmap: (roadmapId: string) => void
}

export function AnalystRecommendationCard({
  recommendation,
  onOpenAssistant,
  onOpenIssue,
  onOpenRoadmap,
}: Props) {
  if (!recommendation) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 mb-4">
          <BrainCircuit className="h-4 w-4 text-info" />
          Studio Analyst Signal
        </h3>
        <div className="py-6 text-center text-xs text-muted-foreground">
          No analyst signals yet. Add ventures, gates, evidence, or capacity context to generate studio recommendations.
        </div>
      </div>
    )
  }

  const {
    title,
    message,
    reason,
    evidenceSummary,
    capacityTradeoff,
    suggestedAction,
    severity,
    recommendedDecision,
  } = recommendation

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid triggering card click when interactive link buttons are clicked
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    onOpenAssistant()
  }

  return (
    <div
      onClick={handleCardClick}
      className="rounded-xl border border-border bg-card p-5 hover:bg-muted/10 transition-colors cursor-pointer space-y-3 relative group"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
          <BrainCircuit className="h-4 w-4 text-info" />
          Studio Analyst Recommendation
        </h3>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge variant="outline" className="border-info/30 bg-info/5 text-info capitalize">
            {formatDecision(recommendedDecision)}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {severity} severity
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground group-hover:text-info transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded space-y-2">
        <div>
          <span className="font-semibold text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">Reason</span>
          {reason}
        </div>
        {evidenceSummary ? (
          <div className="border-t border-border pt-2">
            <span className="font-semibold text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">Evidence</span>
            {evidenceSummary}
          </div>
        ) : null}
        {capacityTradeoff ? (
          <div className="border-t border-border pt-2">
            <span className="font-semibold text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">Capacity tradeoff</span>
            {capacityTradeoff}
          </div>
        ) : null}
        <div className="border-t border-border pt-2 text-foreground font-medium">
          <span className="font-semibold text-[9px] uppercase tracking-wider text-muted-foreground block mb-0.5">Suggested action</span>
          {suggestedAction}
        </div>
      </div>

      {/* Structural source links */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          {recommendation.issueId && (
            <button
              onClick={() => onOpenIssue(recommendation.issueId!)}
              className="text-[10px] text-info hover:underline flex items-center gap-1 bg-info/5 border border-info/20 px-2 py-0.5 rounded"
            >
              Source Issue <ExternalLink className="h-2.5 w-2.5" />
            </button>
          )}
          {recommendation.roadmapId && (
            <button
              onClick={() => onOpenRoadmap(recommendation.roadmapId!)}
              className="text-[10px] text-info hover:underline flex items-center gap-1 bg-info/5 border border-info/20 px-2 py-0.5 rounded"
            >
              Source Bet <ExternalLink className="h-2.5 w-2.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => onOpenAssistant()}
          className="text-xs text-info hover:text-info/80 font-medium flex items-center gap-1 transition-colors"
        >
          View reasoning <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function formatDecision(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
