"use client"

import { create } from "zustand"

export type ActiveDrawer =
  | { type: "issue"; id: string }
  | { type: "roadmap"; id: string }
  | { type: "assistant"; id?: string }
  | null

export type IssuesViewMode = "list" | "board"

type UiStore = {
  sidebarCollapsed: boolean
  assistantPanelOpen: boolean
  mobileNavOpen: boolean
  commandPaletteOpen: boolean
  quickCreateIssueOpen: boolean
  quickCreateRoadmapOpen: boolean
  activeDrawer: ActiveDrawer
  issuesViewMode: IssuesViewMode
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  setAssistantPanelOpen: (open: boolean) => void
  setMobileNavOpen: (open: boolean) => void
  setCommandPaletteOpen: (open: boolean) => void
  openQuickCreateIssue: () => void
  closeQuickCreateIssue: () => void
  openQuickCreateRoadmap: () => void
  closeQuickCreateRoadmap: () => void
  openDrawer: (drawer: Exclude<ActiveDrawer, null>) => void
  closeDrawer: () => void
  setIssuesViewMode: (mode: IssuesViewMode) => void
  hydrate: (state: Partial<Pick<UiStore, "issuesViewMode">>) => void
  reset: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarCollapsed: false,
  assistantPanelOpen: false,
  mobileNavOpen: false,
  commandPaletteOpen: false,
  quickCreateIssueOpen: false,
  quickCreateRoadmapOpen: false,
  activeDrawer: null,
  issuesViewMode: "list",
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setAssistantPanelOpen: (open) => set({ assistantPanelOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  openQuickCreateIssue: () =>
    set({ quickCreateIssueOpen: true, quickCreateRoadmapOpen: false }),
  closeQuickCreateIssue: () => set({ quickCreateIssueOpen: false }),
  openQuickCreateRoadmap: () =>
    set({ quickCreateRoadmapOpen: true, quickCreateIssueOpen: false }),
  closeQuickCreateRoadmap: () => set({ quickCreateRoadmapOpen: false }),
  openDrawer: (drawer) => set({ activeDrawer: drawer }),
  closeDrawer: () => set({ activeDrawer: null }),
  setIssuesViewMode: (mode) => set({ issuesViewMode: mode }),
  hydrate: (state) =>
    set((prev) => ({
      issuesViewMode: state.issuesViewMode !== undefined ? state.issuesViewMode : prev.issuesViewMode,
    })),
  reset: () => set({ issuesViewMode: "list" }),
}))

