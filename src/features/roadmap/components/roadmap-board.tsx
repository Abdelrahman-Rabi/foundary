"use client"

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
  onOpenRoadmapItem: (roadmapId: string) => void
}

export function RoadmapBoard({
  groupedItems,
  ventures,
  issues,
  insights,
  hasActiveFilters,
  onOpenRoadmapItem,
}: RoadmapBoardProps) {
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
