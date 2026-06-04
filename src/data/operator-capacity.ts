import type { OperatorAllocation, CapacitySignal } from "@/types/venture"

export const operatorAllocations: OperatorAllocation[] = [
  // Sentra Allocations
  {
    id: "alloc-sentra-design",
    ventureId: "venture-sentra",
    function: "design",
    operatorName: "Lina Haddad",
    allocationPercent: 35,
    pressure: "watch",
    impact: "Onboarding copy tests and referral screens active.",
    linkedIssueIds: ["issue-sentra-mobile-conversion-copy", "issue-sentra-referral-flow"],
    linkedRoadmapIds: ["roadmap-sentra-referrals", "roadmap-sentra-referral-foundation"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-sentra-product",
    ventureId: "venture-sentra",
    function: "product",
    operatorName: "Sarah Chen",
    allocationPercent: 25,
    pressure: "healthy",
    impact: "Validation gate review and taxonomy mapping.",
    linkedIssueIds: ["issue-sentra-referral-cohort-review"],
    linkedRoadmapIds: ["roadmap-sentra-onboarding"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-sentra-engineering",
    ventureId: "venture-sentra",
    function: "engineering",
    operatorName: "Omar Khaled",
    allocationPercent: 20,
    pressure: "healthy",
    impact: "Referral loops launch and ingestion recovery.",
    linkedIssueIds: ["issue-sentra-analytics-ingestion"],
    linkedRoadmapIds: ["roadmap-sentra-onboarding"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },

  // Reson8 Allocations
  {
    id: "alloc-reson8-engineering",
    ventureId: "venture-reson8",
    function: "engineering",
    operatorName: "Omar Khaled",
    allocationPercent: 50,
    pressure: "overloaded",
    impact: "Active prototype variant builds despite weak retention evidence.",
    linkedIssueIds: ["issue-reson8-onboarding-variant"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-reson8-product",
    ventureId: "venture-reson8",
    function: "product",
    operatorName: "Sarah Chen",
    allocationPercent: 40,
    pressure: "watch",
    impact: "Positioning interviews and retention threshold validation planning.",
    linkedIssueIds: ["issue-reson8-retention-assumptions", "issue-reson8-positioning-interviews", "issue-reson8-message-threshold"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-reson8-design",
    ventureId: "venture-reson8",
    function: "design",
    operatorName: "Lina Haddad",
    allocationPercent: 45,
    pressure: "overloaded",
    impact: "Active onboarding prototypes design iteration.",
    linkedIssueIds: ["issue-reson8-onboarding-variant"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },

  // Internal Ops Allocations
  {
    id: "alloc-internal-product",
    ventureId: "venture-internal-ops",
    function: "product",
    operatorName: "Sarah Chen",
    allocationPercent: 15,
    pressure: "healthy",
    impact: "Hiring workflow automation design.",
    linkedIssueIds: ["issue-internal-hiring-automation"],
    linkedRoadmapIds: ["roadmap-internal-hiring-workflow"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-internal-engineering",
    ventureId: "venture-internal-ops",
    function: "engineering",
    operatorName: "Omar Khaled",
    allocationPercent: 10,
    pressure: "healthy",
    impact: "Meeting summary sync integration and metrics scoping.",
    linkedIssueIds: ["issue-internal-meeting-action-sync", "issue-internal-metrics-dashboard"],
    linkedRoadmapIds: ["roadmap-internal-meeting-intelligence", "roadmap-internal-metrics-dashboard"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  }
]

export const capacitySignals: CapacitySignal[] = [
  {
    id: "cap-signal-design-contention",
    function: "design",
    pressure: "watch",
    totalAllocationPercent: 80, // 35% Sentra + 45% Reson8
    affectedVentureIds: ["venture-sentra", "venture-reson8"],
    contentionReason: "Lina Haddad is split between active Sentra mobile referral expansion copy and Reson8 onboarding prototypes design.",
    downstreamImpact: "Sentra referral loops launch delayed by creative delivery speed.",
    recommendedDecision: "pause",
    sourceIssueIds: ["issue-sentra-mobile-conversion-copy", "issue-reson8-onboarding-variant"],
    sourceRoadmapIds: ["roadmap-sentra-referrals", "roadmap-reson8-retention"]
  },
  {
    id: "cap-signal-engineering-contention",
    function: "engineering",
    pressure: "watch",
    totalAllocationPercent: 80, // 20% Sentra + 50% Reson8 + 10% Internal Ops
    affectedVentureIds: ["venture-sentra", "venture-reson8"],
    contentionReason: "Omar Khaled is overloaded with Reson8 prototype coding while Sentra analytics ingestion recovery is blocked.",
    downstreamImpact: "Sentra analytics recovery is delayed, maintaining high confidence risk.",
    recommendedDecision: "narrow",
    sourceIssueIds: ["issue-sentra-analytics-ingestion", "issue-reson8-onboarding-variant"],
    sourceRoadmapIds: ["roadmap-sentra-onboarding", "roadmap-reson8-retention"]
  }
]

