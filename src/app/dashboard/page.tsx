"use client"

import { PageContainer } from "@/components/layout/page-container"
import { aiInsights } from "@/data/ai-insights"
import { issues } from "@/data/issues"
import { roadmapItems } from "@/data/roadmap"
import { ventures } from "@/data/ventures"
import { AiInsightsPanel } from "@/features/dashboard/components/ai-insights-panel"
import { AttentionPanel } from "@/features/dashboard/components/attention-panel"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { IssuesStatusPanel } from "@/features/dashboard/components/issues-status-panel"
import { KpiRow } from "@/features/dashboard/components/kpi-row"
import { RiskPanel } from "@/features/dashboard/components/risk-panel"
import { RoadmapOverviewPanel } from "@/features/dashboard/components/roadmap-overview-panel"
import { VentureHealthPanel } from "@/features/dashboard/components/venture-health-panel"
import {
  getAttentionItems,
  getDashboardRisks,
  getKpiMetrics,
  getRoadmapOverviewItems,
  getScopedAiInsights,
  getScopedIssues,
  getScopedRoadmapItems,
  getScopedVentures,
  getStatusCounts,
} from "@/features/dashboard/utils/dashboard-metrics"
import { useVentureStore } from "@/stores/venture-store"

export default function DashboardPage() {
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const context = { mode, activeVentureId }
  const scopedVentures = getScopedVentures(ventures, context)
  const scopedIssues = getScopedIssues(issues, context)
  const scopedRoadmapItems = getScopedRoadmapItems(roadmapItems, context)
  const scopedInsights = getScopedAiInsights(aiInsights, context)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null
  const kpiMetrics = getKpiMetrics(scopedVentures, scopedIssues, scopedRoadmapItems)
  const statusCounts = getStatusCounts(scopedIssues)
  const roadmapOverviewItems = getRoadmapOverviewItems(scopedRoadmapItems)
  const risks = getDashboardRisks(
    scopedIssues,
    scopedRoadmapItems,
    scopedInsights,
    ventures
  )
  const attentionItems = getAttentionItems(
    scopedIssues,
    scopedRoadmapItems,
    scopedInsights,
    ventures
  )

  return (
    <PageContainer>
      <DashboardHeader
        mode={mode}
        activeVenture={activeVenture}
        scopedVentures={scopedVentures}
      />

      <KpiRow metrics={kpiMetrics} />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <VentureHealthPanel ventures={scopedVentures} />
        <RiskPanel risks={risks} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <RoadmapOverviewPanel
          roadmapItems={roadmapOverviewItems}
          ventures={ventures}
        />
        <IssuesStatusPanel statusCounts={statusCounts} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AiInsightsPanel insights={scopedInsights} ventures={ventures} />
        <AttentionPanel items={attentionItems} />
      </div>
    </PageContainer>
  )
}
