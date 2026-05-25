"use client"

import { AlertCircle, GitBranch, Target } from "lucide-react"

import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import {
  getInsightSignals,
  getRoadmapSignals,
} from "@/features/assistant/utils/assistant-analysis"
import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/features/issues/components/issue-badges"
import {
  RoadmapConfidenceBadge,
  RoadmapStatusBadge,
  RoadmapTrendBadge,
} from "@/features/roadmap/components/roadmap-badges"
import {
  formatRoadmapDate,
  getIssueCompletion,
  getLinkedIssues,
  getOwner,
  getRoadmapInsights,
  getVenture,
  issueStatusLabels,
} from "@/features/roadmap/utils/roadmap-utils"
import { aiInsights } from "@/data/ai-insights"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { cn } from "@/lib/utils"
import { getSyncedRoadmapMetrics } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"

type RoadmapDrawerContentProps = {
  roadmapId: string
}

export function RoadmapDrawerContent({
  roadmapId,
}: RoadmapDrawerContentProps) {
  const item = useRoadmapStore((state) =>
    state.roadmapItems.find((roadmapItem) => roadmapItem.id === roadmapId)
  )
  const issues = useIssueStore((state) => state.issues)

  if (!item) {
    return (
      <div className="p-5 text-sm text-muted-foreground">
        Roadmap context is no longer available.
      </div>
    )
  }

  const venture = getVenture(ventures, item.ventureId)
  const owner = getOwner(users, item.ownerId)
  const linkedIssues = getLinkedIssues(issues, item)
  const issueCompletion = getIssueCompletion(linkedIssues)
  const syncedMetrics = getSyncedRoadmapMetrics(item, issues)
  const insights = getRoadmapInsights(aiInsights, item)
  const analysisSignals = getRoadmapSignals(item, issues, ventures)
  const insightSignals = getInsightSignals(insights)
  const allSignals = [...insightSignals, ...analysisSignals]
  const blockedCount = linkedIssues.filter((issue) => issue.blocked).length

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-popover/95 px-5 py-4 backdrop-blur-sm">
        <div className="pr-8">
          <p className="text-xs text-muted-foreground">
            {venture?.name ?? "Unknown venture"} / {item.id}
          </p>
          <h2 className="mt-2 text-base font-semibold leading-6 text-foreground">
            {item.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <RoadmapStatusBadge status={item.status} />
            <RoadmapConfidenceBadge confidence={syncedMetrics.confidence} />
            <RoadmapTrendBadge trend={item.confidenceTrend} />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">
              Strategic goal
            </h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.goal}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
          {item.targetMetric ? (
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">Target outcome</p>
              <p className="mt-1 text-sm text-foreground">{item.targetMetric}</p>
            </div>
          ) : null}
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Progress and confidence
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricBar
              label="Progress"
              value={syncedMetrics.progress}
              tone="primary"
            />
            <MetricBar
              label="Confidence"
              value={syncedMetrics.confidence}
              tone={syncedMetrics.confidence < 50 ? "warning" : "success"}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <MetadataItem label="Owner" value={owner?.name ?? "Unassigned"} />
            <MetadataItem label="Impact" value={item.impact} />
            <MetadataItem label="Linked completion" value={`${issueCompletion.percent}%`} />
            <MetadataItem label="Blocked linked work" value={`${blockedCount}`} />
          </div>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground">
                Linked issues
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {issueCompletion.completed} of {issueCompletion.activeTotal} done
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {linkedIssues.length > 0 ? (
              linkedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="rounded-lg border border-border/60 bg-muted/20 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {issue.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getOwner(users, issue.ownerId)?.name ?? "Unassigned"} /{" "}
                        {formatRoadmapDate(issue.dueDate)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      <IssueStatusBadge status={issue.status} />
                      <IssuePriorityBadge priority={issue.priority} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{issueStatusLabels[issue.status]}</span>
                    {issue.blocked ? (
                      <span className="flex items-center gap-1 text-warning">
                        <AlertCircle className="size-3.5" />
                        Blocked
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
                No linked execution work yet.
              </p>
            )}
          </div>
        </section>

        <section className="px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            AI strategic insights
          </h3>
          <div className="mt-3 space-y-3">
            {allSignals.length > 0 ? (
              allSignals.map((signal) =>
                signal.recommendationKind ? (
                  <AiRecommendationBlock key={signal.id} signal={signal} />
                ) : (
                  <AiInsightCard key={signal.id} signal={signal} compact />
                )
              )
            ) : (
              <p className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
                No strategic risk insight detected for this initiative.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 capitalize text-sm text-foreground">{value}</p>
    </div>
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
