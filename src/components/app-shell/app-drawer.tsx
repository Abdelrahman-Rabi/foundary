"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { AssistantDrawerContent } from "@/features/assistant/components/assistant-drawer-content"
import { IssueDrawerContent } from "@/features/issues/components/issue-drawer-content"
import { RoadmapDrawerContent } from "@/features/roadmap/components/roadmap-drawer-content"
import { useUiStore } from "@/stores/ui-store"

export function AppDrawer() {
  const activeDrawer = useUiStore((state) => state.activeDrawer)
  const closeDrawer = useUiStore((state) => state.closeDrawer)
  const drawerLabel =
    activeDrawer?.type === "issue"
      ? "Issue details"
      : activeDrawer?.type === "roadmap"
        ? "Roadmap details"
        : "Assistant signal"

  return (
    <Sheet
      open={Boolean(activeDrawer)}
      onOpenChange={(open) => !open && closeDrawer()}
    >
      <SheetContent
        side="right"
        className="w-[min(100vw,560px)] border-border/70 bg-popover p-0 sm:max-w-xl"
      >
        <SheetTitle className="sr-only">{drawerLabel}</SheetTitle>
        <SheetDescription className="sr-only">
          Contextual Foundary drawer for the selected operational item.
        </SheetDescription>
        {activeDrawer?.type === "issue" ? (
          <IssueDrawerContent issueId={activeDrawer.id} />
        ) : activeDrawer?.type === "roadmap" ? (
          <RoadmapDrawerContent roadmapId={activeDrawer.id} />
        ) : activeDrawer?.type === "assistant" ? (
          <AssistantDrawerContent insightId={activeDrawer.id} />
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
