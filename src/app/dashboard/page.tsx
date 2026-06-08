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

import { TopStudioDecision } from "@/features/dashboard/components/top-studio-decision"
import { AttentionQueueCard } from "@/features/dashboard/components/attention-queue-card"
import { ValidationRiskPanel } from "@/features/dashboard/components/validation-risk-panel"
import { OperatorCapacityPanel } from "@/features/dashboard/components/operator-capacity-panel"
import { ExecutionEvidenceSummary } from "@/features/dashboard/components/execution-evidence-summary"
import { AnalystRecommendationCard } from "@/features/dashboard/components/analyst-recommendation-card"

import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useVentureStore } from "@/stores/venture-store"
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
  const setActiveVenture = useVentureStore((state) => state.setActiveVenture)
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
    commandCenterData,
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

  const handleOpenAnalystSignal = () => {
    const recommendation = commandCenterData.analystRecommendation

    if (recommendation) {
      selectSignal(recommendation.id)
      markInspected(recommendation.id)
      openDrawer({ type: "assistant", id: recommendation.id })
      return
    }

    openDrawer({ type: "assistant" })
  }

  const renderNextAction = () => {
    if (ventures.length === 0) {
      return (
        <NextBestAction
          icon={Plus}
          title="Create the first venture context"
          description="Start with a local venture so Foundary can organize evidence, validation confidence, and analyst signals around one company."
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
          title="Review the strongest analyst signal"
          description={aiSignals[0].reason}
          actionLabel="Review signal"
          onAction={() => openAssistantSignal(aiSignals[0])}
        />
      )
    }

    return (
      <NextBestAction
        icon={Map}
        title="Define the first validation bet"
        description="Add a venture bet to connect validation assumptions, execution evidence, and gate confidence."
        actionLabel="Add validation bet"
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



      {/* 1. Leading Decision-First Section */}
      <div className="space-y-5">
        <TopStudioDecision
          decision={commandCenterData.topDecision}
          onVentureSelect={setActiveVenture}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <AttentionQueueCard
            attentionQueue={commandCenterData.attentionQueue}
            activeVentureId={activeVenture?.id ?? null}
            onVentureSelect={setActiveVenture}
          />
          <AnalystRecommendationCard
            recommendation={commandCenterData.analystRecommendation}
            onOpenAssistant={handleOpenAnalystSignal}
            onOpenIssue={(issueId) => openDrawer({ type: "issue", id: issueId })}
            onOpenRoadmap={(roadmapId) => openDrawer({ type: "roadmap", id: roadmapId })}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ValidationRiskPanel
            risks={commandCenterData.validationRisks}
            onOpenGate={() => {
              openDrawer({ type: "assistant" })
            }}
          />
          <OperatorCapacityPanel
            pressures={commandCenterData.capacityPressures}
            onOpenSignalSource={openDashboardSource}
          />
          <ExecutionEvidenceSummary
            summary={commandCenterData.evidenceSummary}
            onOpenIssue={(issueId) => openDrawer({ type: "issue", id: issueId })}
            onOpenRoadmap={(roadmapId) => openDrawer({ type: "roadmap", id: roadmapId })}
          />
        </div>
      </div>

      {renderNextAction()}

      <div className="border-t border-border pt-6 mt-8">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">
          Secondary Operational Views
        </span>
      </div>

      {/* 2. Secondary Context / Legacy Dashboard Views */}
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
