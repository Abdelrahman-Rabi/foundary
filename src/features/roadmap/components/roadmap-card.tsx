"use client"

import { GitBranch, Target } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AiInsight } from "@/types/ai"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import {
  RoadmapConfidenceBadge,
  RoadmapStatusBadge,
  RoadmapTrendBadge,
} from "@/features/roadmap/components/roadmap-badges"
import {
  getIssueCompletion,
  getLinkedIssues,
  getRoadmapInsights,
  getVenture,
} from "@/features/roadmap/utils/roadmap-utils"

type RoadmapCardProps = {
  item: RoadmapItem
  ventures: Venture[]
  issues: Issue[]
  insights: AiInsight[]
  onOpenRoadmapItem: (roadmapId: string) => void
}

export function RoadmapCard({
  item,
  ventures,
  issues,
  insights,
  onOpenRoadmapItem,
}: RoadmapCardProps) {
  const venture = getVenture(ventures, item.ventureId)
  const linkedIssues = getLinkedIssues(issues, item)
  const issueCompletion = getIssueCompletion(linkedIssues)
  const [insight] = getRoadmapInsights(insights, item)

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpenRoadmapItem(item.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpenRoadmapItem(item.id)
        }
      }}
      className="cursor-pointer border-border/60 bg-card/60 shadow-none transition-all duration-150 hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {venture?.name ?? "Unknown venture"}
            </p>
            <h3 className="mt-1 text-sm font-medium leading-5 text-foreground">
              {item.title}
            </h3>
          </div>
          <RoadmapStatusBadge status={item.status} />
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-border/50 bg-background/30 p-3">
          <Target className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">
            {item.goal}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <MetricBar label="Progress" value={item.progress} tone="primary" />
          <MetricBar
            label="Confidence"
            value={item.confidence}
            tone={item.confidence < 50 ? "warning" : "success"}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <RoadmapConfidenceBadge confidence={item.confidence} />
          <RoadmapTrendBadge trend={item.confidenceTrend} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <GitBranch className="size-3.5" />
            {linkedIssues.length} linked issue
            {linkedIssues.length === 1 ? "" : "s"}
          </span>
          <span>
            {issueCompletion.completed} done
            {issueCompletion.killed > 0 ? ` / ${issueCompletion.killed} killed` : ""}
          </span>
        </div>

        {insight ? (
          <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 p-3">
            <p className="text-xs font-medium text-foreground">
              {insight.title}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
              {insight.suggestedAction ?? insight.message}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function MetricBar({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "primary" | "success" | "warning"
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/60">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "primary" && "bg-primary/80",
            tone === "success" && "bg-success",
            tone === "warning" && "bg-warning"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
