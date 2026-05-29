import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ConfidenceTrend, RoadmapStatus } from "@/types/roadmap"
import {
  confidenceTrendLabels,
  getConfidenceLabel,
  roadmapStatusLabels,
} from "@/features/roadmap/utils/roadmap-utils"

type BadgeProps = {
  className?: string
}

const statusClassName: Record<RoadmapStatus, string> = {
  planned: "border-info/40 text-info",
  active: "border-success/40 text-success",
  "at-risk": "border-warning/50 text-warning",
  completed: "border-success/40 text-success",
  killed: "border-muted-foreground/40 text-muted-foreground",
}

const trendClassName: Record<ConfidenceTrend, string> = {
  improving: "border-success/40 text-success",
  stable: "border-border/60 text-muted-foreground",
  declining: "border-warning/50 text-warning",
}

export function RoadmapStatusBadge({
  status,
  className,
}: BadgeProps & { status: RoadmapStatus }) {
  return (
    <Badge variant="outline" className={cn(statusClassName[status], className)}>
      {roadmapStatusLabels[status]}
    </Badge>
  )
}

export function RoadmapConfidenceBadge({
  confidence,
  className,
}: BadgeProps & { confidence: number }) {
  const label = getConfidenceLabel(confidence)
  const tone =
    confidence >= 80
      ? "border-success/40 text-success"
      : confidence >= 60
        ? "border-info/40 text-info"
        : confidence >= 40
          ? "border-warning/50 text-warning"
          : "border-destructive/50 text-destructive"

  return (
    <Badge variant="outline" className={cn(tone, className)}>
      {label}
    </Badge>
  )
}

export function RoadmapTrendBadge({
  trend,
  className,
}: BadgeProps & { trend: ConfidenceTrend }) {
  return (
    <Badge variant="outline" className={cn(trendClassName[trend], className)}>
      {confidenceTrendLabels[trend]}
    </Badge>
  )
}
