"use client"

import { motion } from "framer-motion"

import { EmptyState } from "@/components/shared/empty-state"
import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import { AiSignalList } from "@/features/assistant/components/ai-signal-list"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import {
  getAssistantSignals,
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

type AssistantDrawerContentProps = {
  insightId?: string
}

export function AssistantDrawerContent({
  insightId,
}: AssistantDrawerContentProps) {
  const ventures = useVentureStore((state) => state.ventures)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const selectedSignalId = useAssistantStore((state) => state.selectedSignalId)
  const selectSignal = useAssistantStore((state) => state.selectSignal)
  const markInspected = useAssistantStore((state) => state.markInspected)
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
  const isInspectingSignal = Boolean(insightId)
  const signal =
    isInspectingSignal
      ? signals.find((item) => item.id === insightId) ??
        signals.find((item) => item.id === selectedSignalId) ??
        null
      : null

  function handleInspectSignal(signalId: string) {
    selectSignal(signalId)
    markInspected(signalId)
    openDrawer({ type: "assistant", id: signalId })
  }

  function handleOpenSource(sourceSignal: AiSignal) {
    selectSignal(sourceSignal.id)
    markInspected(sourceSignal.id)

    if (sourceSignal.sourceType === "issue" && sourceSignal.sourceId) {
      openDrawer({ type: "issue", id: sourceSignal.sourceId })
      return
    }

    if (sourceSignal.sourceType === "roadmap" && sourceSignal.sourceId) {
      openDrawer({ type: "roadmap", id: sourceSignal.sourceId })
      return
    }

    openDrawer({ type: "assistant", id: sourceSignal.id })
  }

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-popover/95 px-5 py-4 backdrop-blur-sm">
        <div className="pr-8">
          <p className="text-xs text-muted-foreground">
            Operational intelligence
          </p>
          <h2 className="mt-2 text-base font-semibold leading-6 text-foreground">
            {signal?.title ?? "Operational signals"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {signal
              ? `${signal.ventureName} / ${signal.sourceLabel}`
              : `${signals.length} contextual signals from current issue and roadmap state.`}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {signal ? (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            {signal.recommendationKind ? (
              <AiRecommendationBlock
                signal={signal}
                onOpenSource={handleOpenSource}
              />
            ) : (
              <AiInsightCard signal={signal} onOpenSource={handleOpenSource} />
            )}
          </motion.div>
        ) : signals.length > 0 ? (
          <AiSignalList
            signals={signals}
            emptyText="No operational signal available."
            onOpenSource={handleOpenSource}
            onOpenInsight={handleInspectSignal}
          />
        ) : (
          <EmptyState
            title="No operational signal available."
            description="No significant intelligence signal is active for the current context."
          />
        )}
      </div>
    </div>
  )
}
