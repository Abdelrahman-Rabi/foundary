"use client"

import { AlertTriangle, GitPullRequest, Map, Plus, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import { PageContainer } from "@/components/layout/page-container"
import { NextBestAction } from "@/components/shared/next-best-action"
import { AiInsightsPanel } from "@/features/dashboard/components/ai-insights-panel"
import { AttentionPanel } from "@/features/dashboard/components/attention-panel"
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header"
import { IssuesStatusPanel } from "@/features/dashboard/components/issues-status-panel"
import { KpiRow } from "@/features/dashboard/components/kpi-row"
import { OperationalActivityPanel } from "@/features/dashboard/components/operational-activity-panel"
import { RiskPanel } from "@/features/dashboard/components/risk-panel"
import { RoadmapOverviewPanel } from "@/features/dashboard/components/roadmap-overview-panel"
import { VentureHealthPanel } from "@/features/dashboard/components/venture-health-panel"
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  AttentionItem,
  DashboardRisk,
  KpiMetric,
  OperationalActivity,
  StatusCount,
} from "@/features/dashboard/utils/dashboard-metrics"
import type { IssueFilters } from "@/types/issue"

export default function DashboardPage() {
  const router = useRouter()
  const setIssueFilters = useIssueStore((state) => state.setFilters)
  const resetIssueFilters = useIssueStore((state) => state.resetFilters)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const openQuickCreateIssue = useUiStore((state) => state.openQuickCreateIssue)
  const openQuickCreateRoadmap = useUiStore(
    (state) => state.openQuickCreateRoadmap
  )
  const openQuickCreateVenture = useUiStore(
    (state) => state.openQuickCreateVenture
  )
  const selectSignal = useAssistantStore((state) => state.selectSignal)
  const markInspected = useAssistantStore((state) => state.markInspected)
  const {
    mode,
    activeVenture,
    scopedVentures,
    kpiMetrics,
    scopedIssues,
    scopedRoadmapItems,
    statusCounts,
    roadmapOverviewItems,
    risks,
    attentionItems,
    operationalActivity,
    aiSignals,
    ventures,
  } = useDashboardData()

  const openDashboardSource = (
    source: Pick<
      DashboardRisk | AttentionItem | OperationalActivity,
      "sourceType" | "sourceId"
    >
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

  const openAssistantSignal = (signal: AiSignal) => {
    selectSignal(signal.id)
    markInspected(signal.id)
    openDrawer({ type: "assistant", id: signal.id })
  }

  const openSignalSource = (signal: AiSignal) => {
    selectSignal(signal.id)
    markInspected(signal.id)

    if (signal.sourceType === "issue" && signal.sourceId) {
      openDrawer({ type: "issue", id: signal.sourceId })
      return
    }

    if (signal.sourceType === "roadmap" && signal.sourceId) {
      openDrawer({ type: "roadmap", id: signal.sourceId })
      return
    }

    openDrawer({ type: "assistant", id: signal.id })
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

  const renderNextAction = () => {
    if (ventures.length === 0) {
      return (
        <NextBestAction
          icon={Plus}
          title="Create the first venture context"
          description="Start with a local venture so Foundary can organize issues, roadmap confidence, and operational signals around one company."
          actionLabel="Create venture"
          onAction={openQuickCreateVenture}
        />
      )
    }

    if (scopedIssues.length === 0 && scopedRoadmapItems.length === 0) {
      return (
        <NextBestAction
          icon={GitPullRequest}
          title="Capture the first execution signal"
          description="Add a blocker, validation task, or delivery risk to turn this empty venture into an operating workspace."
          actionLabel="Create issue"
          onAction={openQuickCreateIssue}
        />
      )
    }

    if (risks[0]) {
      return (
        <NextBestAction
          icon={AlertTriangle}
          title="Inspect the highest delivery risk"
          description={`${risks[0].title}: ${risks[0].suggestedAction}`}
          actionLabel="Inspect risk"
          onAction={() => openDashboardSource(risks[0])}
        />
      )
    }

    if (aiSignals[0]) {
      return (
        <NextBestAction
          icon={Sparkles}
          title="Review the strongest operational signal"
          description={aiSignals[0].reason}
          actionLabel="Review signal"
          onAction={() => openAssistantSignal(aiSignals[0])}
        />
      )
    }

    return (
      <NextBestAction
        icon={Map}
        title="Define the next validation initiative"
        description="Add a roadmap initiative to connect venture direction, execution confidence, and follow-up work."
        actionLabel="Add roadmap initiative"
        onAction={openQuickCreateRoadmap}
      />
    )
  }

  return (
    <PageContainer>
      <DashboardHeader
        mode={mode}
        activeVenture={activeVenture}
        scopedVentures={scopedVentures}
        onAnalyzeContext={() => openDrawer({ type: "assistant" })}
      />

      {renderNextAction()}

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
          onOpenSignal={openAssistantSignal}
          onOpenSource={openSignalSource}
        />
        <AttentionPanel
          items={attentionItems}
          onOpenAttention={openDashboardSource}
        />
      </div>

      <OperationalActivityPanel
        items={operationalActivity}
        onOpenActivity={openDashboardSource}
      />
    </PageContainer>
  )
}
