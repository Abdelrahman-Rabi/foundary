"use client"

import { create } from "zustand"

import { ventures } from "@/data/ventures"
import type { Venture } from "@/types/venture"

type VentureMode = "portfolio" | "venture"

type VentureStore = {
  ventures: Venture[]
  activeVentureId: string | null
  mode: VentureMode
  setActiveVenture: (ventureId: string) => void
  setPortfolioMode: () => void
  getActiveVenture: () => Venture | null
  hydrate: (state: Partial<Pick<VentureStore, "activeVentureId" | "mode">>) => void
  reset: () => void
}

export const useVentureStore = create<VentureStore>((set, get) => ({
  ventures,
  activeVentureId: null,
  mode: "portfolio",
  setActiveVenture: (ventureId) =>
    set({ activeVentureId: ventureId, mode: "venture" }),
  setPortfolioMode: () => set({ activeVentureId: null, mode: "portfolio" }),
  getActiveVenture: () => {
    const { activeVentureId } = get()

    if (!activeVentureId) {
      return null
    }

    return ventures.find((venture) => venture.id === activeVentureId) ?? null
  },
  hydrate: (state) =>
    set((prev) => ({
      activeVentureId: state.activeVentureId !== undefined ? state.activeVentureId : prev.activeVentureId,
      mode: state.mode !== undefined ? state.mode : prev.mode,
    })),
  reset: () => set({ activeVentureId: null, mode: "portfolio" }),
}))
