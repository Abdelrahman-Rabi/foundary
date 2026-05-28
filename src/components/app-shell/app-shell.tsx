"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { AppDrawer } from "@/components/app-shell/app-drawer"
import { AssistantPanelShell } from "@/components/app-shell/assistant-panel-shell"
import { CommandPalette } from "@/components/app-shell/command-palette"
import { MobileNav } from "@/components/app-shell/mobile-nav"
import { PageTransition } from "@/components/layout/page-transition"
import { Sidebar } from "@/components/app-shell/sidebar"
import { TopBar } from "@/components/app-shell/top-bar"
import { useShellShortcuts } from "@/components/app-shell/use-shell-shortcuts"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QuickCreateIssue } from "@/features/issues/components/quick-create-issue"
import { QuickCreateRoadmapItem } from "@/features/roadmap/components/quick-create-roadmap-item"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  useShellShortcuts()

  const sidebarPreferenceLoaded = useRef(false)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const activeDrawer = useUiStore((state) => state.activeDrawer)
  const closeDrawer = useUiStore((state) => state.closeDrawer)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)
  const setSidebarCollapsed = useUiStore((state) => state.setSidebarCollapsed)
  const quickCreateIssueOpen = useUiStore((state) => state.quickCreateIssueOpen)
  const quickCreateRoadmapOpen = useUiStore(
    (state) => state.quickCreateRoadmapOpen
  )
  const closeQuickCreateIssue = useUiStore((state) => state.closeQuickCreateIssue)
  const closeQuickCreateRoadmap = useUiStore(
    (state) => state.closeQuickCreateRoadmap
  )
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const selectSignal = useAssistantStore((state) => state.selectSignal)

  useEffect(() => {
    const stored = window.localStorage.getItem("foundary-sidebar-collapsed")

    if (stored) {
      setSidebarCollapsed(stored === "true")
    }
    sidebarPreferenceLoaded.current = true
  }, [setSidebarCollapsed])

  useEffect(() => {
    if (!sidebarPreferenceLoaded.current) {
      return
    }

    window.localStorage.setItem(
      "foundary-sidebar-collapsed",
      String(sidebarCollapsed)
    )
  }, [sidebarCollapsed])

  useEffect(() => {
    selectSignal(null)
  }, [activeVentureId, mode, selectSignal])

  useEffect(() => {
    if (mode === "portfolio" || !activeVentureId || !activeDrawer) {
      return
    }

    if (activeDrawer.type === "issue") {
      const issue = issues.find((item) => item.id === activeDrawer.id)

      if (!issue || issue.ventureId !== activeVentureId) {
        closeDrawer()
      }
    }

    if (activeDrawer.type === "roadmap") {
      const roadmapItem = roadmapItems.find((item) => item.id === activeDrawer.id)

      if (!roadmapItem || roadmapItem.ventureId !== activeVentureId) {
        closeDrawer()
      }
    }
  }, [
    activeDrawer,
    activeVentureId,
    closeDrawer,
    issues,
    mode,
    roadmapItems,
  ])

  return (
    <TooltipProvider>
      <div className="fixed inset-0 overflow-hidden bg-background text-foreground">
        <div className="flex h-full min-h-0">
          <Sidebar />
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <TopBar />
            <div className="min-h-0 flex-1 overflow-y-auto">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
          <AssistantPanelShell />
        </div>
        <AppDrawer />
        <MobileNav />
        <CommandPalette />
        <div className="pointer-events-none fixed inset-x-3 top-16 z-40 lg:left-72 lg:right-8">
          <div className="pointer-events-auto mx-auto max-w-[1500px]">
            <QuickCreateIssue
              key={
                quickCreateIssueOpen
                  ? `issue-${activeVentureId ?? "portfolio"}`
                  : "issue-closed"
              }
              open={quickCreateIssueOpen}
              activeVentureId={mode === "venture" ? activeVentureId : null}
              ventures={ventures}
              users={users}
              roadmapItems={roadmapItems}
              onClose={closeQuickCreateIssue}
            />
            <QuickCreateRoadmapItem
              key={
                quickCreateRoadmapOpen
                  ? `roadmap-${activeVentureId ?? "portfolio"}`
                  : "roadmap-closed"
              }
              open={quickCreateRoadmapOpen}
              activeVentureId={mode === "venture" ? activeVentureId : null}
              ventures={ventures}
              users={users}
              onClose={closeQuickCreateRoadmap}
              onCreated={(roadmapId) =>
                openDrawer({ type: "roadmap", id: roadmapId })
              }
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
