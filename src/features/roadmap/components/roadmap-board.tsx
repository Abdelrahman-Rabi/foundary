"use client"

import { Plus } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { NextBestAction } from "@/components/shared/next-best-action"
import { Button } from "@/components/ui/button"
import type { AiInsight } from "@/types/ai"
import type { Issue } from "@/types/issue"
import type { RoadmapItem, RoadmapTimeframe } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import { RoadmapColumn } from "@/features/roadmap/components/roadmap-column"
import { roadmapTimeframes } from "@/features/roadmap/utils/roadmap-utils"

type RoadmapBoardProps = {
  groupedItems: Record<RoadmapTimeframe, RoadmapItem[]>
  ventures: Venture[]
  issues: Issue[]
  insights: AiInsight[]
  hasActiveFilters: boolean
  scopedRoadmapCount: number
  contextLabel: string
  onOpenQuickCreate: () => void
  onClearFilters: () => void
  onOpenRoadmapItem: (roadmapId: string) => void
}

export function RoadmapBoard({
  groupedItems,
  ventures,
  issues,
  insights,
  hasActiveFilters,
  scopedRoadmapCount,
  contextLabel,
  onOpenQuickCreate,
  onClearFilters,
  onOpenRoadmapItem,
}: RoadmapBoardProps) {
  const visibleRoadmapCount = Object.values(groupedItems).flat().length

  if (
    visibleRoadmapCount === 0 &&
    scopedRoadmapCount === 0 &&
    !hasActiveFilters
  ) {
    return (
      <NextBestAction
        icon={Plus}
        title={`No roadmap initiatives in ${contextLabel.toLowerCase()} yet.`}
        description="Define the first validation initiative so Foundary can connect strategic direction, confidence, and execution work."
        actionLabel="Add roadmap initiative"
        onAction={onOpenQuickCreate}
      />
    )
  }

  if (visibleRoadmapCount === 0 && hasActiveFilters) {
    return (
      <EmptyState
        title="No roadmap initiatives match the current filters."
        description="Clear filters to return to the full strategic roadmap for this context."
        action={
          <Button variant="outline" className="h-8" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {roadmapTimeframes.map((timeframe) => (
        <RoadmapColumn
          key={timeframe}
          timeframe={timeframe}
          items={groupedItems[timeframe]}
          ventures={ventures}
          issues={issues}
          insights={insights}
          hasActiveFilters={hasActiveFilters}
          onOpenRoadmapItem={onOpenRoadmapItem}
        />
      ))}
    </div>
  )
}
