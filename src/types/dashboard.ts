import type { VentureHealthState, VentureMomentum } from "@/types/venture"

export type VentureHealth = {
  ventureId: string
  health: VentureHealthState
  momentum: VentureMomentum
  roadmapConfidence: number
  overdueIssues: number
  blockedIssues: number
  completedThisWeek: number
  activeInitiatives: number
  riskScore: number
  updatedAt: string
}

export type DashboardMetrics = {
  totalIssues: number
  overdueIssues: number
  blockedIssues: number
  activeRoadmapItems: number
  killedRoadmapItems: number
  completedIssues: number
  roadmapConfidenceAverage: number
  ventureDistribution: {
    ventureId: string
    issueCount: number
  }[]
  updatedAt: string
}
