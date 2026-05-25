"use client"

import { GitBranch, Target } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { AiRoadmapAnalysis } from "@/features/assistant/components/ai-roadmap-analysis"
import {
  dedupeSignals,
  getInsightSignals,
  getRoadmapSignals,
} from "@/features/assistant/utils/assistant-analysis"
import {
  RoadmapConfidenceBadge,
  RoadmapStatusBadge,
  RoadmapTrendBadge,
} from "@/features/roadmap/components/roadmap-badges"
import { RoadmapConfidence } from "@/features/roadmap/components/roadmap-confidence"
import { RoadmapExecutionSummary } from "@/features/roadmap/components/roadmap-execution-summary"
import { RoadmapLinkedIssues } from "@/features/roadmap/components/roadmap-linked-issues"
import { RoadmapProgress } from "@/features/roadmap/components/roadmap-progress"
import {
  getIssueCompletion,
  getLinkedIssues,
  getRoadmapInsights,
  getVenture,
  roadmapStatuses,
  roadmapStatusLabels,
  roadmapTimeframes,
  timeframeLabels,
} from "@/features/roadmap/utils/roadmap-utils"
import { aiInsights } from "@/data/ai-insights"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import {
  getSyncedRoadmapItems,
  getSyncedRoadmapMetrics,
} from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  RoadmapStatus,
  RoadmapTimeframe,
} from "@/types/roadmap"

type RoadmapDrawerContentProps = {
  roadmapId: string
}

export function RoadmapDrawerContent({
  roadmapId,
}: RoadmapDrawerContentProps) {
  const router = useRouter()
  const item = useRoadmapStore((state) =>
    state.roadmapItems.find((roadmapItem) => roadmapItem.id === roadmapId)
  )
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const updateRoadmapItem = useRoadmapStore((state) => state.updateRoadmapItem)
  const issues = useIssueStore((state) => state.issues)
  const setIssueFilters = useIssueStore((state) => state.setFilters)
  const resetIssueFilters = useIssueStore((state) => state.resetFilters)
  const openDrawer = useUiStore((state) => state.openDrawer)

  if (!item) {
    return (
      <div className="p-5">
        <EmptyState
          title="Roadmap context is unavailable."
          description="The selected initiative is no longer present in the current workspace."
        />
      </div>
    )
  }

  const syncedItem =
    getSyncedRoadmapItems(roadmapItems, issues).find(
      (roadmapItem) => roadmapItem.id === item.id
    ) ?? item
  const venture = getVenture(ventures, item.ventureId)
  const linkedIssues = getLinkedIssues(issues, item)
  const issueCompletion = getIssueCompletion(linkedIssues)
  const syncedMetrics = getSyncedRoadmapMetrics(item, issues)
  const insights = getRoadmapInsights(aiInsights, item)
  const analysisSignals = getRoadmapSignals(syncedItem, issues, ventures)
  const insightSignals = getInsightSignals(
    insights,
    issues,
    roadmapItems,
    ventures
  )
  const allSignals = dedupeSignals([...insightSignals, ...analysisSignals])
  const itemId = item.id
  const itemVentureId = item.ventureId

  function handleViewLinkedIssues() {
    resetIssueFilters()
    setIssueFilters({
      roadmapIds: [itemId],
      ventureIds: itemVentureId ? [itemVentureId] : [],
      roadmapLinkedOnly: true,
    })
    router.push("/issues")
  }

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
            <RoadmapStatusBadge status={syncedItem.status} />
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
          <textarea
            value={item.goal}
            onChange={(event) =>
              updateRoadmapItem(item.id, { goal: event.target.value })
            }
            rows={3}
            aria-label="Roadmap strategic goal"
            className="mt-3 w-full resize-none rounded-lg border border-border/60 bg-background/50 p-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground"
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
          <label className="mt-4 block">
            <span className="text-xs text-muted-foreground">Target outcome</span>
            <input
              value={item.targetMetric ?? ""}
              onChange={(event) =>
                updateRoadmapItem(item.id, {
                  targetMetric: event.target.value || undefined,
                })
              }
              placeholder="Activation rate +12%"
              className="mt-2 h-9 w-full rounded-lg border border-border/60 bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </label>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Progress and confidence
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <RoadmapProgress value={syncedMetrics.progress} />
            <RoadmapConfidence value={syncedMetrics.confidence} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetadataSelect
              label="Status"
              value={item.status}
              onChange={(value) =>
                updateRoadmapItem(item.id, { status: value as RoadmapStatus })
              }
              options={roadmapStatuses.map((status) => ({
                value: status,
                label: roadmapStatusLabels[status],
              }))}
            />
            <MetadataSelect
              label="Timeframe"
              value={item.timeframe}
              onChange={(value) =>
                updateRoadmapItem(item.id, {
                  timeframe: value as RoadmapTimeframe,
                })
              }
              options={roadmapTimeframes.map((timeframe) => ({
                value: timeframe,
                label: timeframeLabels[timeframe],
              }))}
            />
            <MetadataSelect
              label="Owner"
              value={item.ownerId}
              onChange={(value) => updateRoadmapItem(item.id, { ownerId: value })}
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
            />
            <MetadataInput
              label="Confidence"
              value={String(item.confidence)}
              onChange={(value) =>
                updateRoadmapItem(item.id, {
                  confidence: Math.max(0, Math.min(100, Number(value) || 0)),
                })
              }
            />
            <MetadataItem label="Impact" value={item.impact} />
            <MetadataItem
              label="Linked completion"
              value={`${issueCompletion.percent}%`}
            />
          </div>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Execution overview
          </h3>
          <div className="mt-3">
            <RoadmapExecutionSummary metrics={syncedMetrics} />
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

          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={handleViewLinkedIssues}
            >
              View linked issues
            </Button>
          </div>

          <div className="mt-3">
            <RoadmapLinkedIssues
              issues={linkedIssues}
              onOpenIssue={(issueId) => openDrawer({ type: "issue", id: issueId })}
            />
          </div>
        </section>

        <section className="px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            AI strategic insights
          </h3>
          <div className="mt-3">
            <AiRoadmapAnalysis
              signals={allSignals}
              onOpenInsight={(signalId) =>
                openDrawer({ type: "assistant", id: signalId })
              }
            />
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

function MetadataSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) {
  return (
    <label>
      <span className="text-xs text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-9 w-full rounded-lg border border-border/60 bg-background/50 px-2 text-sm text-foreground"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function MetadataInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-9 w-full rounded-lg border border-border/60 bg-background/50 px-2 text-sm text-foreground"
      />
    </label>
  )
}
