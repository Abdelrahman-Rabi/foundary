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
    allocationPercent: 35,
    pressure: "watch",
    impact: "Activation analytics recovery and referral quality review need protected focus.",
    linkedIssueIds: ["issue-sentra-referral-cohort-review", "issue-sentra-event-taxonomy"],
    linkedRoadmapIds: ["roadmap-sentra-onboarding"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-sentra-engineering",
    ventureId: "venture-sentra",
    function: "engineering",
    operatorName: "Omar Khaled",
    allocationPercent: 35,
    pressure: "watch",
    impact: "Referral loops launched, but analytics ingestion recovery still needs attention.",
    linkedIssueIds: ["issue-sentra-analytics-ingestion"],
    linkedRoadmapIds: ["roadmap-sentra-onboarding"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-sentra-gtm",
    ventureId: "venture-sentra",
    function: "gtm",
    operatorName: "Noah Patel",
    allocationPercent: 20,
    pressure: "healthy",
    impact: "Customer outreach and referral activation quality checks.",
    linkedIssueIds: ["issue-sentra-referral-cohort-review"],
    linkedRoadmapIds: ["roadmap-sentra-referral-foundation"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },

  // Reson8 Allocations
  {
    id: "alloc-reson8-engineering",
    ventureId: "venture-reson8",
    function: "engineering",
    operatorName: "Omar Khaled",
    allocationPercent: 55,
    pressure: "overloaded",
    impact: "Active onboarding prototype builds despite weak retained-creator evidence.",
    linkedIssueIds: ["issue-reson8-onboarding-variant"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-reson8-product",
    ventureId: "venture-reson8",
    function: "product",
    operatorName: "Sarah Chen",
    allocationPercent: 45,
    pressure: "overloaded",
    impact: "Weekly cohort analysis, positioning interviews, and retention threshold work remain active.",
    linkedIssueIds: ["issue-reson8-retention-assumptions", "issue-reson8-positioning-interviews", "issue-reson8-message-threshold"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-reson8-design",
    ventureId: "venture-reson8",
    function: "design",
    operatorName: "Lina Haddad",
    allocationPercent: 50,
    pressure: "overloaded",
    impact: "Active onboarding prototype design despite weak retention evidence.",
    linkedIssueIds: ["issue-reson8-onboarding-variant"],
    linkedRoadmapIds: ["roadmap-reson8-retention"],
    updatedAt: "2026-05-24T10:00:00.000Z"
  },
  {
    id: "alloc-reson8-partner",
    ventureId: "venture-reson8",
    function: "partner",
    operatorName: "Maya Rodriguez",
    allocationPercent: 30,
    pressure: "watch",
    impact: "Strategic pressure review and weekly retention threshold validation.",
    linkedIssueIds: ["issue-reson8-retention-assumptions"],
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
    pressure: "overloaded",
    totalAllocationPercent: 85, // 35% Sentra + 50% Reson8
    affectedVentureIds: ["venture-sentra", "venture-reson8"],
    contentionReason: "Lina Haddad is split between Sentra referral activation work and Reson8 onboarding prototypes that lack retention proof.",
    downstreamImpact: "Narrowing Reson8 protects design capacity for higher-confidence Sentra activation work.",
    recommendedDecision: "narrow",
    sourceIssueIds: ["issue-sentra-mobile-conversion-copy", "issue-reson8-onboarding-variant"],
    sourceRoadmapIds: ["roadmap-sentra-referrals", "roadmap-reson8-retention"]
  },
  {
    id: "cap-signal-engineering-contention",
    function: "engineering",
    pressure: "overloaded",
    totalAllocationPercent: 100, // 35% Sentra + 55% Reson8 + 10% Internal Ops
    affectedVentureIds: ["venture-sentra", "venture-reson8"],
    contentionReason: "Omar Khaled is overloaded with Reson8 prototype coding while Sentra analytics ingestion recovery needs protected engineering focus.",
    downstreamImpact: "Narrowing Reson8 protects engineering capacity for higher-confidence Sentra activation work.",
    recommendedDecision: "narrow",
    sourceIssueIds: ["issue-sentra-analytics-ingestion", "issue-reson8-onboarding-variant"],
    sourceRoadmapIds: ["roadmap-sentra-onboarding", "roadmap-reson8-retention"]
  },
  {
    id: "cap-signal-product-contention",
    function: "product",
    pressure: "overloaded",
    totalAllocationPercent: 95, // 35% Sentra + 45% Reson8 + 15% Internal Ops
    affectedVentureIds: ["venture-sentra", "venture-reson8", "venture-internal-ops"],
    contentionReason: "Sarah Chen is split between Sentra activation recovery, Reson8 retention proof, and contained Internal Ops work.",
    downstreamImpact: "Narrowing Reson8 frees product focus for Sentra while keeping Internal Ops steady-state.",
    recommendedDecision: "narrow",
    sourceIssueIds: [
      "issue-sentra-event-taxonomy",
      "issue-reson8-retention-assumptions",
      "issue-reson8-message-threshold",
      "issue-internal-metrics-dashboard"
    ],
    sourceRoadmapIds: [
      "roadmap-sentra-onboarding",
      "roadmap-reson8-retention",
      "roadmap-internal-metrics-dashboard"
    ]
  }
]
