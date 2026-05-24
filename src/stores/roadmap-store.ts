"use client"

import { create } from "zustand"

import { roadmapItems as initialRoadmapItems } from "@/data/roadmap"
import type {
  RoadmapItem,
  RoadmapStatus,
  RoadmapTimeframe,
} from "@/types/roadmap"

type RoadmapStore = {
  roadmapItems: RoadmapItem[]
  setRoadmapItems: (items: RoadmapItem[]) => void
  updateRoadmapStatus: (roadmapId: string, status: RoadmapStatus) => void
  updateRoadmapTimeframe: (
    roadmapId: string,
    timeframe: RoadmapTimeframe
  ) => void
  getRoadmapItemsByVenture: (ventureId: string) => RoadmapItem[]
  getRoadmapItemsByTimeframe: (timeframe: RoadmapTimeframe) => RoadmapItem[]
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmapItems: initialRoadmapItems,
  setRoadmapItems: (roadmapItems) => set({ roadmapItems }),
  updateRoadmapStatus: (roadmapId, status) =>
    set((state) => ({
      roadmapItems: state.roadmapItems.map((item) =>
        item.id === roadmapId
          ? { ...item, status, updatedAt: new Date().toISOString() }
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
}))
