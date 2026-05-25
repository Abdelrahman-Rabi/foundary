"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { IssueDrawerContent } from "@/features/issues/components/issue-drawer-content"
import { RoadmapDrawerContent } from "@/features/roadmap/components/roadmap-drawer-content"
import type { ActiveDrawer } from "@/stores/ui-store"
import { useUiStore } from "@/stores/ui-store"

function getDrawerContent(drawer: NonNullable<ActiveDrawer>) {
  if (drawer.type === "issue") {
    return {
      title: "Issue workspace",
      description: "Issue details will open here in the issues phase.",
      body: "This drawer is reserved for focused execution context without leaving the current workflow.",
    }
  }

  return {
    title: "Operational intelligence",
    description: "Assistant insights will be embedded here in the AI phase.",
    body: "No chat interface or live AI behavior is implemented yet. This is drawer infrastructure only.",
  }
}

export function AppDrawer() {
  const activeDrawer = useUiStore((state) => state.activeDrawer)
  const closeDrawer = useUiStore((state) => state.closeDrawer)
  const content = activeDrawer ? getDrawerContent(activeDrawer) : null

  return (
    <Sheet
      open={Boolean(activeDrawer)}
      onOpenChange={(open) => !open && closeDrawer()}
    >
      <SheetContent
        side="right"
        className="w-[520px] border-border/70 bg-popover p-0 sm:max-w-xl"
      >
        {activeDrawer?.type === "issue" ? (
          <IssueDrawerContent issueId={activeDrawer.id} />
        ) : activeDrawer?.type === "roadmap" ? (
          <RoadmapDrawerContent roadmapId={activeDrawer.id} />
        ) : content ? (
          <>
            <SheetHeader className="border-b border-border/60 p-5">
              <SheetTitle>{content.title}</SheetTitle>
              <SheetDescription>{content.description}</SheetDescription>
            </SheetHeader>
            <div className="p-5 text-sm leading-6 text-muted-foreground">
              {content.body}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
