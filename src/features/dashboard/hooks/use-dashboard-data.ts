"use client"

import { useMemo } from "react"

import { analystSignals } from "@/data/analyst-signals"
import { aiInsights } from "@/data/ai-insights"
import {
  getAssistantSignals,
  sortSignals,
} from "@/features/assistant/utils/assistant-analysis"
import {
  getAttentionItems,
  getDashboardRisks,
  getKpiMetrics,
  getOperationalActivity,
  getRoadmapOverviewItems,
  getScopedAiInsights,
  getScopedIssues,
  getScopedRoadmapItems,
  getScopedVentures,
  getStatusCounts,
} from "@/features/dashboard/utils/dashboard-metrics"
import { getCommandCenterData } from "@/features/dashboard/utils/command-center-metrics"
import {
  getSyncedRoadmapItems,
  getSyncedVentureHealth,
} from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useVentureStore } from "@/stores/venture-store"

export function useDashboardData() {
  const ventures = useVentureStore((state) => state.ventures)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)

  return useMemo(() => {
    const context = { mode, activeVentureId }
    const syncedRoadmapItems = getSyncedRoadmapItems(roadmapItems, issues)
    const syncedVentures = ventures.map((venture) =>
      getSyncedVentureHealth(venture, issues, syncedRoadmapItems)
    )
    const scopedVentures = getScopedVentures(syncedVentures, context)
    const scopedIssues = getScopedIssues(issues, context)
    const scopedRoadmapItems = getScopedRoadmapItems(syncedRoadmapItems, context)
    const scopedInsights = getScopedAiInsights(aiInsights, context, ventures)
    const activeVenture =
      ventures.find((venture) => venture.id === activeVentureId) ?? null
    const aiSignals = sortSignals(
      getAssistantSignals(
        scopedIssues,
        scopedRoadmapItems,
        scopedVentures,
        scopedInsights,
        analystSignals.filter((signal) =>
          scopedVentures.some((venture) => venture.id === signal.ventureId)
        )
      )
    ).slice(0, 5)

    const commandCenterData = getCommandCenterData(
      ventures,
      issues,
      syncedRoadmapItems,
      context
    )

    return {
      mode,
      activeVenture,
      scopedVentures,
      scopedIssues,
      scopedRoadmapItems,
      kpiMetrics: getKpiMetrics(
        scopedVentures,
        scopedIssues,
        scopedRoadmapItems
      ),
      statusCounts: getStatusCounts(scopedIssues),
      roadmapOverviewItems: getRoadmapOverviewItems(scopedRoadmapItems),
      risks: getDashboardRisks(
        scopedIssues,
        scopedRoadmapItems,
        scopedInsights,
        ventures
      ),
      attentionItems: getAttentionItems(
        scopedIssues,
        scopedRoadmapItems,
        scopedInsights,
        ventures
      ),
      operationalActivity: getOperationalActivity(
        scopedIssues,
        scopedRoadmapItems,
        scopedInsights,
        ventures
      ),
      aiSignals,
      ventures,
      commandCenterData,
    }
  }, [activeVentureId, issues, mode, roadmapItems, ventures])
}
