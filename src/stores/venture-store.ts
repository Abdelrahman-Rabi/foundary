"use client"

import { create } from "zustand"

import { ventures as seededVentures } from "@/data/ventures"
import type { Venture, CreateVentureInput, VentureHealthState, VentureMomentum } from "@/types/venture"

type VentureMode = "portfolio" | "venture"

type VentureStore = {
  ventures: Venture[]
  activeVentureId: string | null
  mode: VentureMode
  setActiveVenture: (ventureId: string) => void
  setPortfolioMode: () => void
  getActiveVenture: () => Venture | null
  createVenture: (input: CreateVentureInput) => Venture
  hydrate: (state: Partial<Pick<VentureStore, "ventures" | "activeVentureId" | "mode">>) => void
  reset: () => void

}

const VENTURE_COLORS = [
  "#35b48a", // Sentra Green
  "#6b9df5", // Reson8 Blue
  "#d7aa35", // Internal Ops Gold
  "#ff7c3b", // Coral
  "#a855f7", // Purple
  "#06b6d4", // Cyan
  "#ec4899"  // Pink
]

export const useVentureStore = create<VentureStore>((set, get) => ({
  ventures: seededVentures,
  activeVentureId: null,
  mode: "portfolio",
  setActiveVenture: (ventureId) =>
    set({ activeVentureId: ventureId, mode: "venture" }),
  setPortfolioMode: () => set({ activeVentureId: null, mode: "portfolio" }),
  getActiveVenture: () => {
    const { activeVentureId, ventures } = get()

    if (!activeVentureId) {
      return null
    }

    return ventures.find((venture) => venture.id === activeVentureId) ?? null
  },
  createVenture: (input) => {
    const name = input.name.trim()
    if (!name) {
      throw new Error("Venture name cannot be empty")
    }

    const baseSlug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    
    const targetSlug = baseSlug || "venture"
    let slug = targetSlug
    let suffix = 1
    const { ventures } = get()
    const existingSlugs = ventures.map((v) => v.slug)
    
    while (existingSlugs.includes(slug)) {
      slug = `${targetSlug}-${suffix}`
      suffix++
    }

    const id = `venture-${slug}`
    const icon = name.charAt(0).toUpperCase() || "V"
    const color = VENTURE_COLORS[ventures.length % VENTURE_COLORS.length]

    let health: VentureHealthState = "stable"
    let momentum: VentureMomentum = "moderate"
    let confidence = 60

    switch (input.stage) {
      case "idea":
        health = "stable"
        momentum = "slow"
        confidence = 50
        break
      case "validation":
        health = "stable"
        momentum = "moderate"
        confidence = 58
        break
      case "mvp":
        health = "stable"
        momentum = "moderate"
        confidence = 64
        break
      case "growth":
        health = "stable"
        momentum = "high"
        confidence = 70
        break
    }

    const newVenture: Venture = {
      id,
      name,
      slug,
      description: input.description.trim(),
      stage: input.stage,
      health,
      momentum,
      color,
      icon,
      activeRoadmapCount: 0,
      activeIssueCount: 0,
      overdueIssueCount: 0,
      progress: 0,
      confidence,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    set((state) => ({
      ventures: [...state.ventures, newVenture],
      activeVentureId: id,
      mode: "venture",
    }))

    return newVenture
  },
  hydrate: (state) =>
    set((prev) => ({
      ventures: state.ventures !== undefined ? state.ventures : prev.ventures,
      activeVentureId: state.activeVentureId !== undefined ? state.activeVentureId : prev.activeVentureId,
      mode: state.mode !== undefined ? state.mode : prev.mode,
    })),
  reset: () => set({ ventures: seededVentures, activeVentureId: null, mode: "portfolio" }),
}))

