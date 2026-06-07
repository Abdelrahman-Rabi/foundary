"use client"

import { GitBranch, Target } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import type { AiInsight } from "@/types/ai"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import { Badge } from "@/components/ui/badge"
import { evidenceSignals } from "@/data/evidence-signals"
import {
  RoadmapConfidenceBadge,
  RoadmapStatusBadge,
  RoadmapTrendBadge,
} from "@/features/roadmap/components/roadmap-badges"
import { RoadmapConfidence } from "@/features/roadmap/components/roadmap-confidence"
import { RoadmapProgress } from "@/features/roadmap/components/roadmap-progress"
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

  // Strict store-isolated evidence signals filter
  const matchingSignals = evidenceSignals.filter((es) => {
    if (es.ventureId !== item.ventureId) return false
    
    const matchesGate = item.validationGateId && es.gateId === item.validationGateId
    const matchesSignalId = item.evidenceSignalIds?.includes(es.id)
    const matchesSourceRoadmap = es.sourceRoadmapIds?.includes(item.id)
    const matchesLinkedIssue = es.sourceIssueIds?.some((id) =>
      linkedIssues.some((issue) => issue.id === id)
    )

    return !!(matchesGate || matchesSignalId || matchesSourceRoadmap || matchesLinkedIssue)
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
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
              <h3 className="mt-1 text-sm font-medium leading-5 text-foreground font-semibold">
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
            <RoadmapProgress value={item.progress} />
            <RoadmapConfidence value={item.confidence} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <RoadmapConfidenceBadge confidence={item.confidence} />
            <RoadmapTrendBadge trend={item.confidenceTrend} />
            {item.betType && (
              <Badge variant="outline" className="text-[9px] uppercase font-mono tracking-wider px-1 py-0 h-4 bg-muted/10 border-border">
                {item.betType.replace("-", " ")}
              </Badge>
            )}
            {matchingSignals.length > 0 && (
              <Badge variant="outline" className="text-[9px] font-mono px-1 py-0 h-4 bg-info/5 text-info border-info/20">
                {matchingSignals.length} evidence
              </Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/40 pt-2.5">
            <span className="flex items-center gap-1.5">
              <GitBranch className="size-3.5" />
              {linkedIssues.length} issue{linkedIssues.length === 1 ? "" : "s"}
            </span>
            <span>
              {issueCompletion.completed} done
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
    </motion.div>
  )
}
