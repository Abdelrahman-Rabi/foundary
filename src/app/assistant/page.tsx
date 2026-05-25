"use client"

import { useMemo } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { aiInsights } from "@/data/ai-insights"
import { issues } from "@/data/issues"
import { roadmapItems } from "@/data/roadmap"
import { ventures } from "@/data/ventures"
import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import { AiSignalList } from "@/features/assistant/components/ai-signal-list"
import { AssistantHeader } from "@/features/assistant/components/assistant-header"
import { AssistantSection } from "@/features/assistant/components/assistant-section"
import { AssistantSummaryRow } from "@/features/assistant/components/assistant-summary-row"
import {
  getAssistantSignals,
  getAssistantSummary,
  getScopedAssistantData,
  sortSignals,
} from "@/features/assistant/utils/assistant-analysis"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export default function AssistantPage() {
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null
  const scoped = useMemo(
    () =>
      getScopedAssistantData(issues, roadmapItems, ventures, aiInsights, {
        mode,
        activeVentureId,
      }),
    [activeVentureId, mode]
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
  const summary = useMemo(
    () => getAssistantSummary(signals, scoped.issues, scoped.roadmapItems),
    [scoped.issues, scoped.roadmapItems, signals]
  )
  const highRiskSignals = signals.filter((signal) => signal.severity === "high")
  const roadmapRecommendations = signals.filter(
    (signal) =>
      signal.entityType === "roadmap" &&
      ["continue", "split", "kill", "prioritize"].includes(
        signal.recommendationKind ?? ""
      )
  )
  const claritySignals = signals.filter(
    (signal) => signal.recommendationKind === "clarify"
  )

  return (
    <PageContainer>
      <AssistantHeader mode={mode} activeVenture={activeVenture} />
      <AssistantSummaryRow summary={summary} />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <AssistantSection
          title="Operational insights"
          description="Highest-signal observations from current issue, roadmap, and venture state."
          meta={`${signals.length} signals`}
        >
          <div className="space-y-3">
            {signals.slice(0, 4).map((signal) => (
              <AiInsightCard
                key={signal.id}
                signal={signal}
                onOpenInsight={() => openDrawer({ type: "assistant", id: signal.id })}
              />
            ))}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Risk analysis"
          description="Blocked, overdue, or confidence-sensitive work."
          meta={`${highRiskSignals.length} high`}
        >
          <AiSignalList
            signals={highRiskSignals.slice(0, 5)}
            emptyText="No significant delivery risks detected."
          />
        </AssistantSection>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AssistantSection
          title="Roadmap recommendations"
          description="Continue, split, kill, or prioritize guidance for strategic initiatives."
          meta={`${roadmapRecommendations.length} recommendations`}
        >
          <div className="space-y-3">
            {roadmapRecommendations.slice(0, 4).map((signal) => (
              <AiRecommendationBlock key={signal.id} signal={signal} />
            ))}
          </div>
        </AssistantSection>

        <AssistantSection
          title="Issue clarity"
          description="Execution work that needs sharper criteria or priority context."
          meta={`${claritySignals.length} unclear`}
        >
          <AiSignalList
            signals={claritySignals.slice(0, 5)}
            emptyText="No missing clarity signals detected."
          />
        </AssistantSection>
      </div>
    </PageContainer>
  )
}
