"use client"

import { create } from "zustand"

import type {
  AiEntityType,
  AiRecommendationKind,
  AiSignalSourceType,
} from "@/types/ai"
import type { RiskLevel } from "@/types/issue"

type AssistantFilters = {
  severity: RiskLevel | "all"
  recommendationKind: AiRecommendationKind | "all"
  entityType: AiEntityType | "all"
}

type AssistantStore = {
  selectedSignalId: string | null
  activeContext: "portfolio" | "venture"
  sourceType: AiSignalSourceType | "all"
  filters: AssistantFilters
  inspectedSignalIds: string[]
  dismissedSignalIds: string[]
  selectSignal: (signalId: string | null) => void
  setActiveContext: (context: "portfolio" | "venture") => void
  setSourceType: (sourceType: AiSignalSourceType | "all") => void
  setFilters: (filters: Partial<AssistantFilters>) => void
  resetFilters: () => void
  markInspected: (signalId: string) => void
  dismissSignal: (signalId: string) => void
  restoreSignal: (signalId: string) => void
  hydrate: (state: Partial<Pick<AssistantStore, "inspectedSignalIds" | "dismissedSignalIds">>) => void
  reset: () => void

}

const defaultFilters: AssistantFilters = {
  severity: "all",
  recommendationKind: "all",
  entityType: "all",
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  selectedSignalId: null,
  activeContext: "portfolio",
  sourceType: "all",
  filters: defaultFilters,
  inspectedSignalIds: [],
  dismissedSignalIds: [],
  selectSignal: (signalId) => set({ selectedSignalId: signalId }),
  setActiveContext: (activeContext) => set({ activeContext }),
  setSourceType: (sourceType) => set({ sourceType }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters, sourceType: "all" }),
  markInspected: (signalId) =>
    set((state) => ({
      inspectedSignalIds: state.inspectedSignalIds.includes(signalId)
        ? state.inspectedSignalIds
        : [...state.inspectedSignalIds, signalId],
    })),
  dismissSignal: (signalId) =>
    set((state) => ({
      dismissedSignalIds: state.dismissedSignalIds.includes(signalId)
        ? state.dismissedSignalIds
        : [...state.dismissedSignalIds, signalId],
    })),
  restoreSignal: (signalId) =>
    set((state) => ({
      dismissedSignalIds: state.dismissedSignalIds.filter(
        (id) => id !== signalId
      ),
    })),
  hydrate: (state) =>
    set((prev) => ({
      inspectedSignalIds: state.inspectedSignalIds !== undefined ? state.inspectedSignalIds : prev.inspectedSignalIds,
      dismissedSignalIds: state.dismissedSignalIds !== undefined ? state.dismissedSignalIds : prev.dismissedSignalIds,
    })),
  reset: () => set({ inspectedSignalIds: [], dismissedSignalIds: [] }),

}))
