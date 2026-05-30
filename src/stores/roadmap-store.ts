"use client"

import { create } from "zustand"

import { roadmapItems as initialRoadmapItems } from "@/data/roadmap"
import type { ConfidenceFilter } from "@/features/roadmap/utils/roadmap-utils"
import type { RoadmapItem, RoadmapStatus, RoadmapTimeframe } from "@/types/roadmap"

export type RoadmapFilters = {
  search: string
  status: RoadmapStatus | "all"
  confidence: ConfidenceFilter
}

export type CreateRoadmapItemInput = {
  title: string
  ventureId: string
  timeframe: RoadmapTimeframe
  goal: string
  ownerId?: string
  confidence?: number
}

export type UpdateRoadmapItemInput = Partial<
  Pick<
    RoadmapItem,
    | "title"
    | "description"
    | "timeframe"
    | "goal"
    | "status"
    | "ownerId"
    | "progress"
    | "confidence"
    | "confidenceTrend"
    | "impact"
    | "riskLevel"
    | "targetMetric"
  >
>

type RoadmapStore = {
  roadmapItems: RoadmapItem[]
  filters: RoadmapFilters
  setRoadmapItems: (items: RoadmapItem[]) => void
  setFilters: (filters: Partial<RoadmapFilters>) => void
  setSearch: (search: string) => void
  resetFilters: () => void
  createRoadmapItem: (input: CreateRoadmapItemInput) => RoadmapItem
  updateRoadmapItem: (roadmapId: string, updates: UpdateRoadmapItemInput) => void
  updateRoadmapStatus: (roadmapId: string, status: RoadmapStatus) => void
  updateRoadmapTimeframe: (
    roadmapId: string,
    timeframe: RoadmapTimeframe
  ) => void
  linkIssueToRoadmap: (roadmapId: string, issueId: string) => void
  unlinkIssueFromRoadmap: (roadmapId: string, issueId: string) => void
  getRoadmapItemsByVenture: (ventureId: string) => RoadmapItem[]
  getRoadmapItemsByTimeframe: (timeframe: RoadmapTimeframe) => RoadmapItem[]
  hydrate: (state: Partial<Pick<RoadmapStore, "roadmapItems" | "filters">>) => void
  reset: () => void

}

const defaultFilters: RoadmapFilters = {
  search: "",
  status: "all",
  confidence: "all",
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmapItems: initialRoadmapItems,
  filters: defaultFilters,
  setRoadmapItems: (roadmapItems) => set({ roadmapItems }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  resetFilters: () => set({ filters: defaultFilters }),
  createRoadmapItem: (input) => {
    const now = new Date().toISOString()
    const confidence = Math.max(0, Math.min(100, input.confidence ?? 70))
    const item: RoadmapItem = {
      id: `roadmap-${slugify(input.ventureId.replace("venture-", ""))}-${slugify(input.title)}-${Date.now()}`,
      ventureId: input.ventureId,
      title: input.title,
      description: "New strategic initiative captured from roadmap quick create.",
      timeframe: input.timeframe,
      goal: input.goal,
      status: "planned",
      ownerId: input.ownerId ?? "user-sarah-chen",
      linkedIssueIds: [],
      progress: 0,
      confidence,
      confidenceTrend: "stable",
      impact: "medium",
      riskLevel: "low",
      targetMetric: undefined,
      aiInsightIds: [],
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({ roadmapItems: [item, ...state.roadmapItems] }))
    return item
  },
  updateRoadmapItem: (roadmapId, updates) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ),
    })),
  updateRoadmapStatus: (roadmapId, status) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      ),
    })),
  linkIssueToRoadmap: (roadmapId, issueId) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? {
              ...item,
              linkedIssueIds: Array.from(
                new Set([...item.linkedIssueIds, issueId])
              ),
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),
  unlinkIssueFromRoadmap: (roadmapId, issueId) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? {
              ...item,
              linkedIssueIds: item.linkedIssueIds.filter((id) => id !== issueId),
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),
  updateRoadmapTimeframe: (roadmapId, timeframe) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? { ...item, timeframe, updatedAt: new Date().toISOString() }
          : item
      ),
    })),
  getRoadmapItemsByVenture: (ventureId) =>
    get().roadmapItems.filter((item) => item.ventureId === ventureId),
  getRoadmapItemsByTimeframe: (timeframe) =>
    get().roadmapItems.filter((item) => item.timeframe === timeframe),
  hydrate: (state) =>
    set((prev) => ({
      roadmapItems: state.roadmapItems !== undefined ? state.roadmapItems : prev.roadmapItems,
      filters: state.filters !== undefined ? { ...prev.filters, ...state.filters } : prev.filters,
    })),
  reset: () => set({ roadmapItems: initialRoadmapItems, filters: defaultFilters }),

}))
