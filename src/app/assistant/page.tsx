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
          scoped.insights
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
      signal.severity === "high" ||
      signal.reason.includes("blocked") ||
      signal.reason.includes("overdue")
  )
  const roadmapRecommendations = visibleSignals.filter(
    (signal) =>
      signal.entityType === "roadmap" &&
      ["continue", "split", "kill", "prioritize", "reduce-scope", "clarify"].includes(
        signal.recommendationKind ?? ""
      )
  )
  const claritySignals = visibleSignals.filter(
    (signal) => signal.recommendationKind === "clarify"
  )
  const prioritySignals = visibleSignals.slice(0, 5)
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
          title="Operational priorities"
          description="Highest-signal observations from current issue, roadmap, and venture state."
          meta={`${visibleSignals.length} signals`}
        >
          <div className="space-y-3">
            {prioritySignals.length > 0 ? (
              prioritySignals.map((signal) => (
                <AiOperationalInsight
                  key={signal.id}
                  signal={signal}
                  onOpenInsight={handleInspectSignal}
                  onOpenSource={handleOpenSource}
                />
              ))
            ) : hasExecutionContext ? (
              <AiSignalEmptyState
                title="No operational priorities detected."
                description="Signals will appear when delivery risk, clarity gaps, or roadmap confidence changes."
              />
            ) : (
              <NextBestAction
                icon={GitPullRequest}
                title="No operational signal yet."
                description="Capture the first execution issue so assistant signals can identify pressure, clarity gaps, and delivery risk."
                actionLabel="Create issue"
                onAction={openQuickCreateIssue}
              />
            )}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Delivery risk"
          description="Blocked, overdue, or confidence-sensitive work."
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
          title="Roadmap decisions"
          description="Continue, split, kill, reduce-scope, clarify, or prioritize guidance."
          meta={`${roadmapRecommendations.length} recommendations`}
        >
          <div className="space-y-3">
            {roadmapRecommendations.length > 0 ? (
              roadmapRecommendations.slice(0, 4).map((signal) => (
                <AiRecommendationBlock
                  key={signal.id}
                  signal={signal}
                  onOpenSource={handleOpenSource}
                  onOpenInsight={handleInspectSignal}
                />
              ))
            ) : hasExecutionContext ? (
              <AiSignalEmptyState title="No roadmap decisions require attention." />
            ) : (
              <NextBestAction
                icon={Map}
                title="No roadmap decisions yet."
                description="Define a validation initiative to give Foundary a strategic object for confidence and prioritization signals."
                actionLabel="Add roadmap initiative"
                onAction={openQuickCreateRoadmap}
              />
            )}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Clarity gaps"
          description="Execution work that needs sharper criteria, outcome, or validation context."
          meta={`${claritySignals.length} unclear`}
        >
          <AiSignalList
            signals={claritySignals.slice(0, 5)}
            emptyText="No missing clarity signals detected."
            onOpenSource={handleOpenSource}
            onOpenInsight={handleInspectSignal}
          />
        </AssistantSection>
      </div>
    </PageContainer>
  )
}
