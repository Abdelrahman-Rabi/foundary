"use client"

import { create } from "zustand"

type ActiveDrawer =
  | { type: "issue"; id: string }
  | { type: "roadmap"; id: string }
  | { type: "assistant"; id?: string }
  | null

type IssuesViewMode = "list" | "board"

type UiStore = {
  sidebarCollapsed: boolean
  assistantPanelOpen: boolean
  activeDrawer: ActiveDrawer
  issuesViewMode: IssuesViewMode
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  setAssistantPanelOpen: (open: boolean) => void
  openDrawer: (drawer: Exclude<ActiveDrawer, null>) => void
  closeDrawer: () => void
  setIssuesViewMode: (mode: IssuesViewMode) => void
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarCollapsed: false,
  assistantPanelOpen: false,
  activeDrawer: null,
  issuesViewMode: "list",
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setAssistantPanelOpen: (open) => set({ assistantPanelOpen: open }),
  openDrawer: (drawer) => set({ activeDrawer: drawer }),
  closeDrawer: () => set({ activeDrawer: null }),
  setIssuesViewMode: (mode) => set({ issuesViewMode: mode }),
}))
