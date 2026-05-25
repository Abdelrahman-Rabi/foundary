import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { AiRecommendationKind } from "@/types/ai"
import type { RiskLevel } from "@/types/issue"

type BadgeProps = {
  className?: string
}

const riskClassName: Record<RiskLevel, string> = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

const recommendationLabels: Record<AiRecommendationKind, string> = {
  continue: "Continue",
  split: "Split",
  kill: "Kill",
  prioritize: "Prioritize",
  clarify: "Clarify",
  "reduce-scope": "Reduce scope",
}

const recommendationClassName: Record<AiRecommendationKind, string> = {
  continue: "border-success/40 text-success",
  split: "border-warning/50 text-warning",
  kill: "border-muted-foreground/40 text-muted-foreground",
  prioritize: "border-info/40 text-info",
  clarify: "border-warning/50 text-warning",
  "reduce-scope": "border-warning/50 text-warning",
}

export function AiRiskBadge({
  severity,
  className,
}: BadgeProps & { severity: RiskLevel }) {
  return (
    <Badge variant="outline" className={cn(riskClassName[severity], className)}>
      {severity} risk
    </Badge>
  )
}

export function AiRecommendationBadge({
  kind,
  className,
}: BadgeProps & { kind: AiRecommendationKind }) {
  return (
    <Badge
      variant="outline"
      className={cn(recommendationClassName[kind], className)}
    >
      {recommendationLabels[kind]}
    </Badge>
  )
}
