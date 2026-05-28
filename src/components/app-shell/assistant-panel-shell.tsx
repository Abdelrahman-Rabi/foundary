"use client"

import { X } from "lucide-react"

import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import {
  getAssistantSignals,
  getScopedAssistantData,
} from "@/features/assistant/utils/assistant-analysis"
import { getSyncedRoadmapItems } from "@/features/synchronization/utils/sync-utils"
import { aiInsights } from "@/data/ai-insights"
import { ventures } from "@/data/ventures"
import { Button } from "@/components/ui/button"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export function AssistantPanelShell() {
  const open = useUiStore((state) => state.assistantPanelOpen)
  const setOpen = useUiStore((state) => state.setAssistantPanelOpen)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const selectSignal = useAssistantStore((state) => state.selectSignal)
  const markInspected = useAssistantStore((state) => state.markInspected)

  if (!open) {
    return null
  }

  const scoped = getScopedAssistantData(
    issues,
    getSyncedRoadmapItems(roadmapItems, issues),
    ventures,
    aiInsights,
    { mode, activeVentureId }
  )
  const signal =
    getAssistantSignals(
      scoped.issues,
      scoped.roadmapItems,
      scoped.ventures,
      scoped.insights
    )[0] ?? null

  function inspectSignal(signalId: string) {
    selectSignal(signalId)
    markInspected(signalId)
    openDrawer({ type: "assistant", id: signalId })
  }

  function openSignalSource(signalItem: AiSignal) {
    selectSignal(signalItem.id)
    markInspected(signalItem.id)

    if (signalItem.sourceType === "issue" && signalItem.sourceId) {
      openDrawer({ type: "issue", id: signalItem.sourceId })
      return
    }

    if (signalItem.sourceType === "roadmap" && signalItem.sourceId) {
      openDrawer({ type: "roadmap", id: signalItem.sourceId })
      return
    }

    openDrawer({ type: "assistant", id: signalItem.id })
  }

  return (
    <aside className="hidden w-80 shrink-0 border-l border-border/60 bg-background/85 xl:flex xl:flex-col">
      <header className="flex h-14 items-center justify-between gap-3 border-b border-border/50 px-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            Assistant signal
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Current operational context
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Hide assistant panel"
          onClick={() => setOpen(false)}
        >
          <X className="size-4" strokeWidth={1.8} />
        </Button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {signal ? (
          <AiInsightCard
            signal={signal}
            compact
            onOpenInsight={inspectSignal}
            onOpenSource={openSignalSource}
          />
        ) : (
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
            No significant operational signal in this context.
          </div>
        )}
      </div>
    </aside>
  )
}
