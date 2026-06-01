"use client"

import { useMemo } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { aiInsights } from "@/data/ai-insights"
import { RoadmapBoard } from "@/features/roadmap/components/roadmap-board"
import { RoadmapConfidenceSummary } from "@/features/roadmap/components/roadmap-confidence-summary"
import { RoadmapHeader } from "@/features/roadmap/components/roadmap-header"
import { RoadmapToolbar } from "@/features/roadmap/components/roadmap-toolbar"
import {
  filterRoadmapItems,
  getConfidenceSummary,
  groupRoadmapItems,
} from "@/features/roadmap/utils/roadmap-utils"
import { getSyncedRoadmapItems } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export default function RoadmapPage() {
  const ventures = useVentureStore((state) => state.ventures)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const filters = useRoadmapStore((state) => state.filters)
  const setSearch = useRoadmapStore((state) => state.setSearch)
  const setFilters = useRoadmapStore((state) => state.setFilters)
  const resetFilters = useRoadmapStore((state) => state.resetFilters)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const openQuickCreateRoadmap = useUiStore(
    (state) => state.openQuickCreateRoadmap
  )
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null

  const visibleRoadmapItems = useMemo(
    () =>
      filterRoadmapItems(getSyncedRoadmapItems(roadmapItems, issues), {
        mode,
        activeVentureId,
        search: filters.search,
        status: filters.status,
        confidence: filters.confidence,
      }),
    [activeVentureId, filters, issues, mode, roadmapItems]
  )
  const groupedItems = useMemo(
    () => groupRoadmapItems(visibleRoadmapItems),
    [visibleRoadmapItems]
  )
  const confidenceSummary = useMemo(
    () => getConfidenceSummary(visibleRoadmapItems),
    [visibleRoadmapItems]
  )
  const filteredInsights = useMemo(() => {
    const ventureIds = new Set(ventures.map((v) => v.id))
    return aiInsights.filter((insight) => !insight.ventureId || ventureIds.has(insight.ventureId))
  }, [ventures])

  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name
  const scopedRoadmapCount = useMemo(
    () =>
      mode === "venture" && activeVentureId
        ? roadmapItems.filter((item) => item.ventureId === activeVentureId).length
        : roadmapItems.length,
    [activeVentureId, mode, roadmapItems]
  )
  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.status !== "all" ||
    filters.confidence !== "all"

  return (
    <PageContainer>
      <RoadmapHeader
        contextLabel={contextLabel}
        visibleCount={visibleRoadmapItems.length}
        onOpenQuickCreate={openQuickCreateRoadmap}
      />
      <RoadmapToolbar
        search={filters.search}
        status={filters.status}
        confidence={filters.confidence}
        onSearchChange={setSearch}
        onStatusChange={(status) => setFilters({ status })}
        onConfidenceChange={(confidence) => setFilters({ confidence })}
      />
      <RoadmapConfidenceSummary {...confidenceSummary} />
      <RoadmapBoard
        groupedItems={groupedItems}
        ventures={ventures}
        issues={issues}
        insights={filteredInsights}
        hasActiveFilters={hasActiveFilters}
        scopedRoadmapCount={scopedRoadmapCount}
        contextLabel={contextLabel}
        onOpenQuickCreate={openQuickCreateRoadmap}
        onClearFilters={resetFilters}
        onOpenRoadmapItem={(roadmapId) =>
          openDrawer({ type: "roadmap", id: roadmapId })
        }
      />
    </PageContainer>
  )
}
