"use client"

import { useRouter } from "next/navigation"

import { PageContainer } from "@/components/layout/page-container"
import { AiInsightsPanel } from "@/features/dashboard/components/ai-insights-panel"
import { AttentionPanel } from "@/features/dashboard/components/attention-panel"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { IssuesStatusPanel } from "@/features/dashboard/components/issues-status-panel"
import { KpiRow } from "@/features/dashboard/components/kpi-row"
import { RiskPanel } from "@/features/dashboard/components/risk-panel"
import { RoadmapOverviewPanel } from "@/features/dashboard/components/roadmap-overview-panel"
import { VentureHealthPanel } from "@/features/dashboard/components/venture-health-panel"
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data"
import { useIssueStore } from "@/stores/issue-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  AttentionItem,
  DashboardRisk,
  KpiMetric,
  StatusCount,
} from "@/features/dashboard/utils/dashboard-metrics"
import type { IssueFilters } from "@/types/issue"

export default function DashboardPage() {
  const router = useRouter()
  const setIssueFilters = useIssueStore((state) => state.setFilters)
  const resetIssueFilters = useIssueStore((state) => state.resetFilters)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const {
    mode,
    activeVenture,
    scopedVentures,
    kpiMetrics,
    statusCounts,
    roadmapOverviewItems,
    risks,
    attentionItems,
    aiSignals,
    ventures,
  } = useDashboardData()

  const openDashboardSource = (
    source: Pick<DashboardRisk | AttentionItem, "sourceType" | "sourceId">
  ) => {
    if (source.sourceType === "issue") {
      openDrawer({ type: "issue", id: source.sourceId })
      return
    }

    if (source.sourceType === "roadmap") {
      openDrawer({ type: "roadmap", id: source.sourceId })
      return
    }

    openDrawer({ type: "assistant", id: source.sourceId })
  }

  const openFilteredIssues = (issueFilter: Partial<IssueFilters>) => {
    resetIssueFilters()
    setIssueFilters(issueFilter)
    router.push("/issues")
  }

  const handleMetricSelect = (metric: KpiMetric) => {
    if (metric.targetRoute === "/issues") {
      openFilteredIssues(metric.issueFilter ?? {})
      return
    }

    if (metric.targetRoute === "/roadmap") {
      router.push("/roadmap")
    }
  }

  const handleStatusSelect = (status: StatusCount) => {
    openFilteredIssues(status.issueFilter)
  }

  return (
    <PageContainer>
      <DashboardHeader
        mode={mode}
        activeVenture={activeVenture}
        scopedVentures={scopedVentures}
        onAnalyzeContext={() => openDrawer({ type: "assistant" })}
      />

      <KpiRow metrics={kpiMetrics} onSelectMetric={handleMetricSelect} />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <VentureHealthPanel ventures={scopedVentures} />
        <RiskPanel risks={risks} onOpenRisk={openDashboardSource} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <RoadmapOverviewPanel
          roadmapItems={roadmapOverviewItems}
          ventures={ventures}
          onOpenRoadmapItem={(roadmapId) =>
            openDrawer({ type: "roadmap", id: roadmapId })
          }
        />
        <IssuesStatusPanel
          statusCounts={statusCounts}
          onSelectStatus={handleStatusSelect}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AiInsightsPanel
          signals={aiSignals}
          ventures={ventures}
          onOpenSignal={(signalId) =>
            openDrawer({ type: "assistant", id: signalId })
          }
        />
        <AttentionPanel
          items={attentionItems}
          onOpenAttention={openDashboardSource}
        />
      </div>
    </PageContainer>
  )
}
