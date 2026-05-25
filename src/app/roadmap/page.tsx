"use client"

import { useMemo, useState } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { aiInsights } from "@/data/ai-insights"
import { ventures } from "@/data/ventures"
import { RoadmapBoard } from "@/features/roadmap/components/roadmap-board"
import { RoadmapConfidenceSummary } from "@/features/roadmap/components/roadmap-confidence-summary"
import { RoadmapHeader } from "@/features/roadmap/components/roadmap-header"
import { RoadmapToolbar } from "@/features/roadmap/components/roadmap-toolbar"
import {
  type ConfidenceFilter,
  filterRoadmapItems,
  getConfidenceSummary,
  groupRoadmapItems,
} from "@/features/roadmap/utils/roadmap-utils"
import { getSyncedRoadmapItems } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import type { RoadmapStatus } from "@/types/roadmap"

export default function RoadmapPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<RoadmapStatus | "all">("all")
  const [confidence, setConfidence] = useState<ConfidenceFilter>("all")
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null

  const visibleRoadmapItems = useMemo(
    () =>
      filterRoadmapItems(getSyncedRoadmapItems(roadmapItems, issues), {
        mode,
        activeVentureId,
        search,
        status,
        confidence,
      }),
    [activeVentureId, confidence, issues, mode, roadmapItems, search, status]
  )
  const groupedItems = useMemo(
    () => groupRoadmapItems(visibleRoadmapItems),
    [visibleRoadmapItems]
  )
  const confidenceSummary = useMemo(
    () => getConfidenceSummary(visibleRoadmapItems),
    [visibleRoadmapItems]
  )
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <PageContainer>
      <RoadmapHeader
        contextLabel={contextLabel}
        visibleCount={visibleRoadmapItems.length}
      />
      <RoadmapToolbar
        search={search}
        status={status}
        confidence={confidence}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onConfidenceChange={setConfidence}
      />
      <RoadmapConfidenceSummary {...confidenceSummary} />
      <RoadmapBoard
        groupedItems={groupedItems}
        ventures={ventures}
        issues={issues}
        insights={aiInsights}
        onOpenRoadmapItem={(roadmapId) =>
          openDrawer({ type: "roadmap", id: roadmapId })
        }
      />
    </PageContainer>
  )
}
