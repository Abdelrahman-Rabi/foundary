"use client"

import { useMemo, useState } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { aiInsights } from "@/data/ai-insights"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { QuickCreateRoadmapItem } from "@/features/roadmap/components/quick-create-roadmap-item"
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
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const filters = useRoadmapStore((state) => state.filters)
  const setSearch = useRoadmapStore((state) => state.setSearch)
  const setFilters = useRoadmapStore((state) => state.setFilters)
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
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <PageContainer>
      <RoadmapHeader
        contextLabel={contextLabel}
        visibleCount={visibleRoadmapItems.length}
        onOpenQuickCreate={() => setQuickCreateOpen(true)}
      />
      <RoadmapToolbar
        search={filters.search}
        status={filters.status}
        confidence={filters.confidence}
        onSearchChange={setSearch}
        onStatusChange={(status) => setFilters({ status })}
        onConfidenceChange={(confidence) => setFilters({ confidence })}
      />
      <QuickCreateRoadmapItem
        key={quickCreateOpen ? activeVentureId ?? "portfolio" : "closed"}
        open={quickCreateOpen}
        activeVentureId={mode === "venture" ? activeVentureId : null}
        ventures={ventures}
        users={users}
        onClose={() => setQuickCreateOpen(false)}
        onCreated={(roadmapId) => openDrawer({ type: "roadmap", id: roadmapId })}
      />
      <RoadmapConfidenceSummary {...confidenceSummary} />
      <RoadmapBoard
        groupedItems={groupedItems}
        ventures={ventures}
        issues={issues}
        insights={aiInsights}
        hasActiveFilters={
          Boolean(filters.search.trim()) ||
          filters.status !== "all" ||
          filters.confidence !== "all"
        }
        onOpenRoadmapItem={(roadmapId) =>
          openDrawer({ type: "roadmap", id: roadmapId })
        }
      />
    </PageContainer>
  )
}
