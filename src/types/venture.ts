export type VentureStage = "idea" | "validation" | "mvp" | "growth"

export type VentureHealthState = "strong" | "stable" | "at-risk" | "critical"

export type VentureMomentum = "high" | "moderate" | "slow"

export type Venture = {
  id: string
  name: string
  slug: string
  description: string
  stage: VentureStage
  health: VentureHealthState
  momentum: VentureMomentum
  color: string
  icon: string
  activeRoadmapCount: number
  activeIssueCount: number
  overdueIssueCount: number
  progress: number
  confidence: number
  createdAt: string
  updatedAt: string
}
