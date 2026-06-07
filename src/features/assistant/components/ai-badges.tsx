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
  split: "Narrow",
  kill: "Kill",
  prioritize: "Continue",
  clarify: "Narrow",
  "reduce-scope": "Narrow",
  narrow: "Narrow",
  pause: "Pause",
  "staff-up": "Staff up",
  defer: "Defer",
  "partner-review": "Partner review",
}

const recommendationClassName: Record<AiRecommendationKind, string> = {
  continue: "border-success/40 text-success",
  split: "border-warning/50 text-warning",
  kill: "border-muted-foreground/40 text-muted-foreground",
  prioritize: "border-info/40 text-info",
  clarify: "border-warning/50 text-warning",
  "reduce-scope": "border-warning/50 text-warning",
  narrow: "border-warning/50 text-warning",
  pause: "border-warning/50 text-warning",
  "staff-up": "border-info/40 text-info",
  defer: "border-muted-foreground/40 text-muted-foreground",
  "partner-review": "border-info/40 text-info",
}


export function AiRiskBadge({
  severity,
  className,
}: BadgeProps & { severity: RiskLevel }) {
  return (
    <Badge variant="outline" className={cn(riskClassName[severity], className)}>
      {severity} severity
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
