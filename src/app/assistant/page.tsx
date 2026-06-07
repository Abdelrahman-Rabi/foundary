"use client"

import { GitPullRequest, Map } from "lucide-react"
import { useEffect, useMemo } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { NextBestAction } from "@/components/shared/next-best-action"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiOperationalInsight } from "@/features/assistant/components/ai-operational-insight"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import { AiRiskPanel } from "@/features/assistant/components/ai-risk-panel"
import { AiSignalList } from "@/features/assistant/components/ai-signal-list"
import { AiSignalEmptyState } from "@/features/assistant/components/ai-signal-empty-state"
import { AssistantHeader } from "@/features/assistant/components/assistant-header"
import { AssistantSection } from "@/features/assistant/components/assistant-section"
import { AssistantSummaryRow } from "@/features/assistant/components/assistant-summary-row"
import {
  getAssistantSignals,
  getAssistantSummary,
  getScopedAssistantData,
  sortSignals,
} from "@/features/assistant/utils/assistant-analysis"
import { getSyncedRoadmapItems } from "@/features/synchronization/utils/sync-utils"
import { analystSignals } from "@/data/analyst-signals"
import { aiInsights } from "@/data/ai-insights"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export default function AssistantPage() {
  const ventures = useVentureStore((state) => state.ventures)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const openQuickCreateIssue = useUiStore((state) => state.openQuickCreateIssue)
  const openQuickCreateRoadmap = useUiStore(
    (state) => state.openQuickCreateRoadmap
  )
  const selectSignal = useAssistantStore((state) => state.selectSignal)
  const markInspected = useAssistantStore((state) => state.markInspected)
  const dismissedSignalIds = useAssistantStore((state) => state.dismissedSignalIds)
  const setActiveContext = useAssistantStore((state) => state.setActiveContext)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null

  useEffect(() => {
    setActiveContext(mode)
  }, [mode, setActiveContext])
  const scoped = useMemo(
    () =>
      getScopedAssistantData(
        issues,
        getSyncedRoadmapItems(roadmapItems, issues),
        ventures,
        aiInsights,
        analystSignals,
        {
          mode,
          activeVentureId,
        }
      ),
    [activeVentureId, issues, mode, roadmapItems, ventures]
  )
  const signals = useMemo(
    () =>
      sortSignals(
        getAssistantSignals(
          scoped.issues,
          scoped.roadmapItems,
          scoped.ventures,
          scoped.insights,
          scoped.analystSignals
        )
      ),
    [scoped]
  )
  const visibleSignals = useMemo(
    () => signals.filter((signal) => !dismissedSignalIds.includes(signal.id)),
    [dismissedSignalIds, signals]
  )
  const summary = useMemo(
    () => getAssistantSummary(visibleSignals, scoped.issues, scoped.roadmapItems),
    [scoped.issues, scoped.roadmapItems, visibleSignals]
  )
  const highRiskSignals = visibleSignals.filter(
    (signal) =>
      signal.signalType === "sunk-cost-risk" ||
      signal.signalType === "gate-confidence" ||
      signal.severity === "high"
  )
  const recommendedMoves = visibleSignals.filter(
    (signal) =>
      signal.signalType === "studio-decision" || signal.recommendedDecision
  )
  const evidenceGapSignals = visibleSignals.filter(
    (signal) => signal.signalType === "evidence-gap"
  )
  const capacityTradeoffSignals = visibleSignals.filter(
    (signal) => signal.signalType === "capacity-tradeoff"
  )
  const hasExecutionContext =
    scoped.issues.length > 0 || scoped.roadmapItems.length > 0

  function handleInspectSignal(signalId: string) {
    selectSignal(signalId)
    markInspected(signalId)
    openDrawer({ type: "assistant", id: signalId })
  }

  function handleOpenSource(signal: AiSignal) {
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

  return (
    <PageContainer>
      <AssistantHeader mode={mode} activeVenture={activeVenture} />
      <AssistantSummaryRow summary={summary} />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <AssistantSection
          title="Recommended studio moves"
          description="Continue, narrow, pause, kill, staff up, defer, or partner-review guidance from current source evidence."
          meta={`${visibleSignals.length} signals`}
        >
          <div className="space-y-3">
            {recommendedMoves.length > 0 ? (
              recommendedMoves.slice(0, 5).map((signal) => (
                <AiOperationalInsight
                  key={signal.id}
                  signal={signal}
                  onOpenInsight={handleInspectSignal}
                  onOpenSource={handleOpenSource}
                />
              ))
            ) : hasExecutionContext ? (
              <AiSignalEmptyState
                title="No analyst signals yet."
                description="Add ventures, gates, evidence, or capacity context to generate studio recommendations."
              />
            ) : (
              <NextBestAction
                icon={GitPullRequest}
                title={
                  mode === "portfolio"
                    ? "No studio decisions to analyze."
                    : "No analyst recommendation yet."
                }
                description={
                  mode === "portfolio"
                    ? "Create a venture and capture the first gate or evidence item."
                    : "Start by defining the venture's current assumption or first validation gate."
                }
                actionLabel="Create issue"
                onAction={openQuickCreateIssue}
              />
            )}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Validation risks"
          description="Sunk-cost risk, gate confidence, and execution outpacing validation."
          meta={`${highRiskSignals.length} high`}
        >
          <AiRiskPanel
            signals={highRiskSignals.slice(0, 5)}
            onOpenSource={handleOpenSource}
            onOpenInsight={handleInspectSignal}
          />
        </AssistantSection>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AssistantSection
          title="Evidence gaps"
          description="Missing proof before the studio spends more execution capacity."
          meta={`${evidenceGapSignals.length} gaps`}
        >
          <div className="space-y-3">
            {evidenceGapSignals.length > 0 ? (
              evidenceGapSignals.slice(0, 4).map((signal) => (
                <AiRecommendationBlock
                  key={signal.id}
                  signal={signal}
                  onOpenSource={handleOpenSource}
                  onOpenInsight={handleInspectSignal}
                />
              ))
            ) : hasExecutionContext ? (
              <AiSignalEmptyState title="No evidence gaps require attention." />
            ) : (
              <NextBestAction
                icon={Map}
                title="No analyst recommendation yet."
                description="Start by defining the venture's current assumption or first validation gate."
                actionLabel="Add roadmap initiative"
                onAction={openQuickCreateRoadmap}
              />
            )}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Capacity tradeoffs"
          description="Operator contention, high-effort bets, and capacity-cost work affecting studio focus."
          meta={`${capacityTradeoffSignals.length} tradeoffs`}
        >
          <AiSignalList
            signals={capacityTradeoffSignals.slice(0, 5)}
            emptyText="No capacity tradeoff signals detected."
            onOpenSource={handleOpenSource}
            onOpenInsight={handleInspectSignal}
          />
        </AssistantSection>
      </div>
    </PageContainer>
  )
}
