"use client"

import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import {
  getAssistantSignals,
  getScopedAssistantData,
  sortSignals,
} from "@/features/assistant/utils/assistant-analysis"
import { getSyncedRoadmapItems } from "@/features/synchronization/utils/sync-utils"
import { aiInsights } from "@/data/ai-insights"
import { ventures } from "@/data/ventures"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useVentureStore } from "@/stores/venture-store"

type AssistantDrawerContentProps = {
  insightId?: string
}

export function AssistantDrawerContent({
  insightId,
}: AssistantDrawerContentProps) {
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const syncedRoadmapItems = getSyncedRoadmapItems(roadmapItems, issues)
  const scoped = getScopedAssistantData(
    issues,
    syncedRoadmapItems,
    ventures,
    aiInsights,
    {
      mode,
      activeVentureId,
    }
  )
  const signals = sortSignals(
    getAssistantSignals(
      scoped.issues,
      scoped.roadmapItems,
      scoped.ventures,
      scoped.insights
    )
  )
  const signal =
    signals.find((item) => item.id === insightId) ?? signals[0] ?? null

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-popover/95 px-5 py-4 backdrop-blur-sm">
        <div className="pr-8">
          <p className="text-xs text-muted-foreground">
            Operational intelligence
          </p>
          <h2 className="mt-2 text-base font-semibold leading-6 text-foreground">
            Assistant signal
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Contextual analysis derived from current issue and roadmap state.
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {signal ? (
          signal.recommendationKind ? (
            <AiRecommendationBlock signal={signal} />
          ) : (
            <AiInsightCard signal={signal} />
          )
        ) : (
          <p className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
            No significant operational intelligence signals detected.
          </p>
        )}
      </div>
    </div>
  )
}
