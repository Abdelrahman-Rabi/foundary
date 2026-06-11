# Seeded Demo Story — Foundary Data

## Purpose

This file defines the seeded demo data story for Foundary.

It should guide the implementation of:

* ventures
* evidence items
* bets
* studio decisions
* analyst recommendations
* capacity signals
* cross-screen source links

The goal is not to create generic mock data.

The goal is to create a coherent, believable venture studio operating environment that makes Foundary’s product value obvious.

The seeded data must help the reviewer understand:

> Foundary helps venture studios decide where to spend time, talent, and capital.

---

# Core Demo Story

The primary seeded story is:

```txt
Reson8 is consuming product and engineering capacity, but retention evidence is weak.

Foundary recommends narrowing Reson8 instead of continuing broad buildout.

The recommendation is supported by creator retention evidence, a low-confidence validation bet, and high capacity pressure.

Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.

Internal Ops remains stable and should not distract the studio from higher-leverage venture decisions.
```

This story should appear consistently across:

* Command Center
* Evidence
* Bets
* Studio Analyst
* drawers
* context banners
* seeded data objects
* README demo flow
* product note

---

# Required Venture Portfolio

Use exactly these three ventures:

```txt
Sentra
Reson8
Internal Ops
```

Do not introduce additional ventures unless explicitly requested.

The three ventures must represent different operating conditions.

---

# Portfolio Roles

## Reson8

Role:

```txt
Validation uncertainty with active execution and sunk-cost risk.
```

Meaning:

* weak retention proof
* active product and engineering work
* low validation confidence
* high capacity pressure
* broad execution should be narrowed or paused
* primary recommended move: Narrow

Reson8 is the main demo venture.

---

## Sentra

Role:

```txt
High-confidence growth opportunity with capacity strain.
```

Meaning:

* stronger validation confidence
* improving activation signals
* growth or referral upside
* capacity bottleneck
* primary recommended move: Staff up or Continue

Sentra should contrast with Reson8.

---

## Internal Ops

Role:

```txt
Stable studio leverage with contained scope.
```

Meaning:

* stable confidence
* low capacity pressure
* useful internal operating leverage
* no urgent studio decision
* primary recommended move: Continue or Defer

Internal Ops should feel healthy and contained.

---

# Required Anchor Values

Preserve these values unless the entire demo story is intentionally updated:

```txt
Reson8 validation confidence: 23%
Reson8 execution progress: 41%
Studio Analyst confidence on Reson8 recommendation: 82%
Sentra validation confidence: 78%
Internal Ops validation confidence: 71%
```

These values support the core product insight:

> Execution progress is not the same as validation confidence.

---

# Required Data Invariants

The seed data must always satisfy these rules.

## Rule 1 — Reson8 Is Highest Urgency

Reson8 should always have:

```txt
lowest validation confidence
highest capacity pressure
clearest missing proof
most urgent recommended move
most decision-critical evidence
```

---

## Rule 2 — Sentra Is Promising But Constrained

Sentra should always have:

```txt
higher validation confidence than Reson8
improving or stable confidence trend
capacity bottleneck
recommended move: Continue or Staff up
```

---

## Rule 3 — Internal Ops Is Stable

Internal Ops should always have:

```txt
stable confidence
low capacity pressure
contained scope
recommended move: Continue or Defer
```

---

## Rule 4 — Progress Does Not Equal Confidence

At least one seeded bet must show execution progress higher than validation confidence.

Use Reson8:

```txt
Execution progress: 41%
Validation confidence: 23%
```

This is the clearest data proof of Foundary’s product insight.

---

## Rule 5 — Evidence Must Link To Bets

Every important evidence item should include:

```txt
supportedBetId
supports
evidenceRole
decisionImpact
recommendedMove
```

---

## Rule 6 — Recommendations Must Cite Sources

Every analyst recommendation should include:

```txt
sourceEvidenceIds
sourceBetIds
sourceSummary
capacityImpact
reasoning
```

No recommendation should feel unsupported.

---

# Recommended Data File Structure

Recommended implementation files:

```txt
src/data/ventures.ts
src/data/bets.ts
src/data/evidence.ts
src/data/studio-decisions.ts
src/data/analyst-recommendations.ts
src/data/capacity.ts
```

If the app already has another mock data structure, adapt the existing structure instead of over-refactoring.

Avoid large rewrites unless required.

---

# Shared Types

Use or adapt the following shared types.

```ts
export type VentureId =
  | "sentra"
  | "reson8"
  | "internal-ops"

export type RecommendedMove =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"

export type ConfidenceTrend =
  | "improving"
  | "stable"
  | "declining"

export type CapacityLevel =
  | "low"
  | "medium"
  | "high"

export type EvidenceRole =
  | "proving"
  | "disproving"
  | "unlocking"
  | "de-risking"
  | "challenging"
  | "capacity-cost"

export type DecisionImpact =
  | "low"
  | "medium"
  | "high"
  | "critical"

export type EvidenceStatus =
  | "backlog"
  | "planned"
  | "in-progress"
  | "in-review"
  | "done"
  | "killed"

export type BetTimeframe =
  | "now"
  | "next"
  | "later"

export type BetStatus =
  | "planned"
  | "active"
  | "at-risk"
  | "validated"
  | "paused"
  | "killed"

export type Urgency =
  | "low"
  | "medium"
  | "high"
  | "critical"
```

---

# Shared Capacity Type

```ts
export type CapacityImpact = {
  teams: (
    | "Product"
    | "Engineering"
    | "Design"
    | "Growth"
    | "Research"
  )[]
  level: CapacityLevel
  note: string
}
```

---

# Venture Data Model

```ts
export type Venture = {
  id: VentureId
  name: string
  description: string

  stage:
    | "validation"
    | "growth"
    | "operating-system"

  operatingCondition: string

  recommendedMove: RecommendedMove

  validationConfidence: number
  confidenceTrend: ConfidenceTrend

  capacityPressure: CapacityLevel

  healthState:
    | "attention-needed"
    | "promising-constrained"
    | "stable-contained"

  why: string
  nextAction: string
}
```

---

# Seeded Ventures

## Reson8

```ts
export const reson8: Venture = {
  id: "reson8",
  name: "Reson8",
  description:
    "Creator broadcast tooling for repeat audience engagement.",

  stage: "validation",

  operatingCondition:
    "Validation uncertainty with active execution and sunk-cost risk.",

  recommendedMove: "narrow",

  validationConfidence: 23,
  confidenceTrend: "declining",

  capacityPressure: "high",

  healthState: "attention-needed",

  why:
    "Retention proof is weak while onboarding buildout continues to consume product and engineering capacity.",

  nextAction:
    "Narrow scope to retained-creator validation before continuing broad buildout."
}
```

---

## Sentra

```ts
export const sentra: Venture = {
  id: "sentra",
  name: "Sentra",
  description:
    "Activation analytics and mobile referral loops for growth teams.",

  stage: "growth",

  operatingCondition:
    "High-confidence growth opportunity with capacity strain.",

  recommendedMove: "staff-up",

  validationConfidence: 78,
  confidenceTrend: "improving",

  capacityPressure: "medium",

  healthState: "promising-constrained",

  why:
    "Activation confidence is improving, but engineering capacity is slowing recovery and referral instrumentation.",

  nextAction:
    "Protect focused engineering capacity for activation recovery and referral instrumentation."
}
```

---

## Internal Ops

```ts
export const internalOps: Venture = {
  id: "internal-ops",
  name: "Internal Ops",
  description:
    "Studio operating workflows, partner reporting, and internal leverage systems.",

  stage: "operating-system",

  operatingCondition:
    "Stable studio leverage with contained scope.",

  recommendedMove: "continue",

  validationConfidence: 71,
  confidenceTrend: "stable",

  capacityPressure: "low",

  healthState: "stable-contained",

  why:
    "Internal Ops work is stable, low capacity, and supports studio visibility without creating major delivery risk.",

  nextAction:
    "Continue studio metrics scope, but defer broader partner reporting workflow expansion."
}
```

---

# Venture Export

```ts
export const ventures: Venture[] = [
  sentra,
  reson8,
  internalOps
]
```

---

# Bet Data Model

```ts
export type Bet = {
  id: string

  title: string
  ventureId: VentureId
  ventureName: string

  timeframe: BetTimeframe

  testingStatement: string
  targetOutcome: string

  status: BetStatus

  validationConfidence: number
  confidenceTrend: ConfidenceTrend

  executionProgress: number

  recommendedMove: RecommendedMove

  missingProof: string[]

  linkedEvidenceIds: string[]

  capacityImpact: CapacityImpact

  owner: string
}
```

---

# Seeded Bets

## Reson8 — Creator Retention Signal Validation

```ts
export const betCreatorRetentionSignal: Bet = {
  id: "bet-creator-retention-signal",
  title: "Creator Retention Signal Validation",
  ventureId: "reson8",
  ventureName: "Reson8",

  timeframe: "now",

  testingStatement:
    "Define the retained-creator threshold for a continue, narrow, or stop decision.",

  targetOutcome:
    "Confirm whether creators return weekly after first broadcast setup.",

  status: "at-risk",

  validationConfidence: 23,
  confidenceTrend: "declining",

  executionProgress: 41,

  recommendedMove: "narrow",

  missingProof: [
    "Weekly retained creator signal",
    "Retained creator threshold"
  ],

  linkedEvidenceIds: [
    "evidence-weekly-creator-cohort",
    "evidence-retention-threshold",
    "evidence-reson8-onboarding-buildout",
    "evidence-broadcast-loop-review"
  ],

  capacityImpact: {
    teams: ["Product", "Engineering"],
    level: "high",
    note:
      "Broad onboarding work is consuming capacity before retention proof is clear."
  },

  owner: "Lina"
}
```

---

## Reson8 — Broadcast Loop Decision

```ts
export const betBroadcastLoopDecision: Bet = {
  id: "bet-broadcast-loop-decision",
  title: "Broadcast Loop Decision",
  ventureId: "reson8",
  ventureName: "Reson8",

  timeframe: "next",

  testingStatement:
    "Validate whether creators repeat broadcast setup without manual intervention.",

  targetOutcome:
    "Confirm repeat usage before expanding broadcast automation.",

  status: "paused",

  validationConfidence: 38,
  confidenceTrend: "stable",

  executionProgress: 18,

  recommendedMove: "pause",

  missingProof: [
    "Repeat broadcast usage",
    "Setup completion quality"
  ],

  linkedEvidenceIds: [
    "evidence-broadcast-loop-review",
    "evidence-broadcast-setup-usability"
  ],

  capacityImpact: {
    teams: ["Product", "Design"],
    level: "medium",
    note:
      "Design and product effort should wait until repeat usage evidence is clearer."
  },

  owner: "Omar"
}
```

---

## Sentra — Activation Analytics Recovery

```ts
export const betActivationAnalyticsRecovery: Bet = {
  id: "bet-activation-analytics-recovery",
  title: "Activation Analytics Recovery",
  ventureId: "sentra",
  ventureName: "Sentra",

  timeframe: "now",

  testingStatement:
    "Recover activation visibility so the studio can safely scale the onboarding motion.",

  targetOutcome:
    "Restore reliable activation analytics and identify the highest-impact bottleneck.",

  status: "active",

  validationConfidence: 78,
  confidenceTrend: "improving",

  executionProgress: 66,

  recommendedMove: "continue",

  missingProof: [
    "Final activation bottleneck review"
  ],

  linkedEvidenceIds: [
    "evidence-activation-analytics-recovery",
    "evidence-sentra-bottleneck-review",
    "evidence-mobile-referral-event-fix"
  ],

  capacityImpact: {
    teams: ["Engineering"],
    level: "medium",
    note:
      "Focused engineering time is needed, but confidence supports continued execution."
  },

  owner: "Maya"
}
```

---

## Sentra — Mobile Referral Expansion

```ts
export const betMobileReferralExpansion: Bet = {
  id: "bet-mobile-referral-expansion",
  title: "Mobile Referral Expansion",
  ventureId: "sentra",
  ventureName: "Sentra",

  timeframe: "next",

  testingStatement:
    "Validate whether mobile referral loops can improve activation without increasing support load.",

  targetOutcome:
    "Confirm referral conversion baseline and support impact.",

  status: "planned",

  validationConfidence: 82,
  confidenceTrend: "stable",

  executionProgress: 32,

  recommendedMove: "staff-up",

  missingProof: [
    "Referral conversion baseline"
  ],

  linkedEvidenceIds: [
    "evidence-mobile-referral-event-fix",
    "evidence-referral-conversion-baseline"
  ],

  capacityImpact: {
    teams: ["Growth", "Engineering"],
    level: "medium",
    note:
      "A small focused team could accelerate a higher-confidence opportunity."
  },

  owner: "Nora"
}
```

---

## Internal Ops — Studio Metrics Scope

```ts
export const betStudioMetricsScope: Bet = {
  id: "bet-studio-metrics-scope",
  title: "Studio Metrics Scope",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  timeframe: "now",

  testingStatement:
    "Define a compact studio metrics layer that improves partner visibility without creating reporting overhead.",

  targetOutcome:
    "Create useful studio visibility without expanding reporting complexity.",

  status: "active",

  validationConfidence: 71,
  confidenceTrend: "stable",

  executionProgress: 74,

  recommendedMove: "continue",

  missingProof: [
    "Partner review alignment"
  ],

  linkedEvidenceIds: [
    "evidence-studio-metrics-scope-cleanup",
    "evidence-partner-review-alignment",
    "evidence-reporting-workflow-review"
  ],

  capacityImpact: {
    teams: ["Product"],
    level: "low",
    note:
      "Low capacity investment with useful studio visibility upside."
  },

  owner: "Yara"
}
```

---

## Internal Ops — Partner Reporting Workflow

```ts
export const betPartnerReportingWorkflow: Bet = {
  id: "bet-partner-reporting-workflow",
  title: "Partner Reporting Workflow",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  timeframe: "later",

  testingStatement:
    "Assess whether partner reporting should become a reusable studio workflow.",

  targetOutcome:
    "Confirm repeat partner demand before building a broader reporting workflow.",

  status: "planned",

  validationConfidence: 54,
  confidenceTrend: "stable",

  executionProgress: 12,

  recommendedMove: "defer",

  missingProof: [
    "Repeat partner demand",
    "Reporting scope agreement"
  ],

  linkedEvidenceIds: [
    "evidence-reporting-workflow-review"
  ],

  capacityImpact: {
    teams: ["Product", "Design"],
    level: "low",
    note:
      "Useful later, but not worth capacity before repeat demand is clearer."
  },

  owner: "Yara"
}
```

---

# Bets Export

```ts
export const bets: Bet[] = [
  betCreatorRetentionSignal,
  betBroadcastLoopDecision,
  betActivationAnalyticsRecovery,
  betMobileReferralExpansion,
  betStudioMetricsScope,
  betPartnerReportingWorkflow
]
```

---

# Evidence Data Model

```ts
export type EvidenceItem = {
  id: string

  title: string
  description: string

  ventureId: VentureId
  ventureName: string

  supports: string
  supportedBetId: string

  evidenceRole: EvidenceRole
  decisionImpact: DecisionImpact

  status: EvidenceStatus

  owner: string

  recommendedMove: RecommendedMove

  sourceQuality:
    | "strong"
    | "moderate"
    | "weak"
    | "missing"

  capacityImpact: CapacityImpact
}
```

---

# Seeded Evidence Items

## Reson8 — Weekly Creator Cohort Analysis

```ts
export const evidenceWeeklyCreatorCohort: EvidenceItem = {
  id: "evidence-weekly-creator-cohort",
  title: "Weekly creator cohort analysis",
  ventureId: "reson8",
  ventureName: "Reson8",

  supports: "Creator Retention Signal",
  supportedBetId: "bet-creator-retention-signal",

  evidenceRole: "challenging",
  decisionImpact: "high",

  status: "in-progress",

  owner: "Lina",

  recommendedMove: "narrow",

  sourceQuality: "weak",

  capacityImpact: {
    teams: ["Product"],
    level: "medium",
    note:
      "Product decisions are waiting on whether creators return weekly."
  },

  description:
    "Review early creator cohorts to verify whether creators return weekly after first broadcast setup."
}
```

---

## Reson8 — Creator Retention Threshold Research

```ts
export const evidenceRetentionThreshold: EvidenceItem = {
  id: "evidence-retention-threshold",
  title: "Creator retention threshold research",
  ventureId: "reson8",
  ventureName: "Reson8",

  supports: "Creator Retention Signal",
  supportedBetId: "bet-creator-retention-signal",

  evidenceRole: "proving",
  decisionImpact: "critical",

  status: "planned",

  owner: "Lina",

  recommendedMove: "narrow",

  sourceQuality: "missing",

  capacityImpact: {
    teams: ["Product", "Engineering"],
    level: "high",
    note:
      "Broad buildout should not continue without a clear retained-creator threshold."
  },

  description:
    "Define the minimum retained creator signal required before continuing broad onboarding buildout."
}
```

---

## Reson8 — Onboarding Buildout

```ts
export const evidenceReson8OnboardingBuildout: EvidenceItem = {
  id: "evidence-reson8-onboarding-buildout",
  title: "Reson8 onboarding buildout",
  ventureId: "reson8",
  ventureName: "Reson8",

  supports: "Creator Retention Signal",
  supportedBetId: "bet-creator-retention-signal",

  evidenceRole: "capacity-cost",
  decisionImpact: "high",

  status: "in-progress",

  owner: "Omar",

  recommendedMove: "pause",

  sourceQuality: "moderate",

  capacityImpact: {
    teams: ["Engineering"],
    level: "high",
    note:
      "Engineering capacity is being spent before retention proof is strong."
  },

  description:
    "Active onboarding implementation work that should be narrowed until retention evidence improves."
}
```

---

## Reson8 — Broadcast Loop Review

```ts
export const evidenceBroadcastLoopReview: EvidenceItem = {
  id: "evidence-broadcast-loop-review",
  title: "Broadcast loop decision review",
  ventureId: "reson8",
  ventureName: "Reson8",

  supports: "Broadcast Loop Decision",
  supportedBetId: "bet-broadcast-loop-decision",

  evidenceRole: "de-risking",
  decisionImpact: "medium",

  status: "backlog",

  owner: "Omar",

  recommendedMove: "pause",

  sourceQuality: "weak",

  capacityImpact: {
    teams: ["Product", "Design"],
    level: "medium",
    note:
      "Broadcast loop work should wait for stronger repeat usage evidence."
  },

  description:
    "Clarify whether creators repeat broadcast setup without manual intervention."
}
```

---

## Reson8 — Broadcast Setup Usability

```ts
export const evidenceBroadcastSetupUsability: EvidenceItem = {
  id: "evidence-broadcast-setup-usability",
  title: "Broadcast setup usability review",
  ventureId: "reson8",
  ventureName: "Reson8",

  supports: "Broadcast Loop Decision",
  supportedBetId: "bet-broadcast-loop-decision",

  evidenceRole: "challenging",
  decisionImpact: "medium",

  status: "planned",

  owner: "Omar",

  recommendedMove: "pause",

  sourceQuality: "weak",

  capacityImpact: {
    teams: ["Design", "Research"],
    level: "medium",
    note:
      "Usability concerns should be validated before expanding broadcast automation."
  },

  description:
    "Review whether creators can complete repeat broadcast setup without support."
}
```

---

## Sentra — Activation Analytics Recovery

```ts
export const evidenceActivationAnalyticsRecovery: EvidenceItem = {
  id: "evidence-activation-analytics-recovery",
  title: "Activation analytics recovery",
  ventureId: "sentra",
  ventureName: "Sentra",

  supports: "Activation Analytics Recovery",
  supportedBetId: "bet-activation-analytics-recovery",

  evidenceRole: "proving",
  decisionImpact: "high",

  status: "done",

  owner: "Maya",

  recommendedMove: "continue",

  sourceQuality: "strong",

  capacityImpact: {
    teams: ["Engineering"],
    level: "medium",
    note:
      "Recovery work supports continued execution on a higher-confidence activation path."
  },

  description:
    "Restore reliable analytics events so activation recovery work can be measured."
}
```

---

## Sentra — Activation Bottleneck Review

```ts
export const evidenceSentraBottleneckReview: EvidenceItem = {
  id: "evidence-sentra-bottleneck-review",
  title: "Sentra activation bottleneck review",
  ventureId: "sentra",
  ventureName: "Sentra",

  supports: "Activation Bottleneck Recovery",
  supportedBetId: "bet-activation-analytics-recovery",

  evidenceRole: "de-risking",
  decisionImpact: "high",

  status: "in-progress",

  owner: "Maya",

  recommendedMove: "continue",

  sourceQuality: "moderate",

  capacityImpact: {
    teams: ["Engineering"],
    level: "medium",
    note:
      "A clear bottleneck review helps justify continued engineering capacity."
  },

  description:
    "Identify the activation bottleneck that should be resolved before scaling referral loops."
}
```

---

## Sentra — Mobile Referral Event Fix

```ts
export const evidenceMobileReferralEventFix: EvidenceItem = {
  id: "evidence-mobile-referral-event-fix",
  title: "Mobile referral event fix",
  ventureId: "sentra",
  ventureName: "Sentra",

  supports: "Mobile Referral Expansion",
  supportedBetId: "bet-mobile-referral-expansion",

  evidenceRole: "unlocking",
  decisionImpact: "medium",

  status: "in-review",

  owner: "Nora",

  recommendedMove: "staff-up",

  sourceQuality: "moderate",

  capacityImpact: {
    teams: ["Growth", "Engineering"],
    level: "medium",
    note:
      "Referral instrumentation unlocks the next validation step."
  },

  description:
    "Fix mobile referral event tracking before measuring referral conversion."
}
```

---

## Sentra — Referral Conversion Baseline

```ts
export const evidenceReferralConversionBaseline: EvidenceItem = {
  id: "evidence-referral-conversion-baseline",
  title: "Referral conversion baseline",
  ventureId: "sentra",
  ventureName: "Sentra",

  supports: "Mobile Referral Expansion",
  supportedBetId: "bet-mobile-referral-expansion",

  evidenceRole: "proving",
  decisionImpact: "high",

  status: "planned",

  owner: "Nora",

  recommendedMove: "staff-up",

  sourceQuality: "moderate",

  capacityImpact: {
    teams: ["Growth"],
    level: "medium",
    note:
      "Baseline conversion proof is needed before expanding referral work."
  },

  description:
    "Measure early referral conversion before scaling mobile referral loops."
}
```

---

## Internal Ops — Studio Metrics Scope Cleanup

```ts
export const evidenceStudioMetricsScopeCleanup: EvidenceItem = {
  id: "evidence-studio-metrics-scope-cleanup",
  title: "Studio metrics scope cleanup",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  supports: "Studio Metrics Scope",
  supportedBetId: "bet-studio-metrics-scope",

  evidenceRole: "de-risking",
  decisionImpact: "medium",

  status: "done",

  owner: "Yara",

  recommendedMove: "continue",

  sourceQuality: "strong",

  capacityImpact: {
    teams: ["Product"],
    level: "low",
    note:
      "Clear metrics scope prevents partner reporting overhead."
  },

  description:
    "Reduce studio metrics scope to the smallest useful visibility layer."
}
```

---

## Internal Ops — Partner Review Alignment

```ts
export const evidencePartnerReviewAlignment: EvidenceItem = {
  id: "evidence-partner-review-alignment",
  title: "Partner review alignment",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  supports: "Studio Metrics Scope",
  supportedBetId: "bet-studio-metrics-scope",

  evidenceRole: "proving",
  decisionImpact: "medium",

  status: "in-review",

  owner: "Yara",

  recommendedMove: "continue",

  sourceQuality: "moderate",

  capacityImpact: {
    teams: ["Product"],
    level: "low",
    note:
      "Partner review should confirm the metrics layer is useful without adding reporting overhead."
  },

  description:
    "Validate whether the compact metrics scope is useful for partner updates."
}
```

---

## Internal Ops — Reporting Workflow Review

```ts
export const evidenceReportingWorkflowReview: EvidenceItem = {
  id: "evidence-reporting-workflow-review",
  title: "Partner reporting workflow review",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  supports: "Partner Reporting Scope",
  supportedBetId: "bet-partner-reporting-workflow",

  evidenceRole: "proving",
  decisionImpact: "low",

  status: "in-review",

  owner: "Yara",

  recommendedMove: "defer",

  sourceQuality: "weak",

  capacityImpact: {
    teams: ["Product", "Design"],
    level: "low",
    note:
      "Useful later, but not worth expanding before repeat demand is proven."
  },

  description:
    "Review whether partner reporting demand repeats often enough to justify a reusable workflow."
}
```

---

# Evidence Export

```ts
export const evidenceItems: EvidenceItem[] = [
  evidenceWeeklyCreatorCohort,
  evidenceRetentionThreshold,
  evidenceReson8OnboardingBuildout,
  evidenceBroadcastLoopReview,
  evidenceBroadcastSetupUsability,
  evidenceActivationAnalyticsRecovery,
  evidenceSentraBottleneckReview,
  evidenceMobileReferralEventFix,
  evidenceReferralConversionBaseline,
  evidenceStudioMetricsScopeCleanup,
  evidencePartnerReviewAlignment,
  evidenceReportingWorkflowReview
]
```

---

# Studio Decision Data Model

```ts
export type StudioDecision = {
  id: string

  ventureId: VentureId
  ventureName: string

  recommendedMove: RecommendedMove

  headline: string
  why: string
  nextAction: string

  validationConfidence: number
  confidenceTrend: ConfidenceTrend

  missingProof: string[]

  capacityImpact: CapacityImpact

  sourceEvidenceIds: string[]
  sourceBetIds: string[]

  urgency: Urgency

  confidence: number
}
```

---

# Primary Studio Decision

```ts
export const studioDecisionReson8Narrow: StudioDecision = {
  id: "decision-reson8-narrow",
  ventureId: "reson8",
  ventureName: "Reson8",

  recommendedMove: "narrow",

  headline:
    "Narrow Reson8 before continuing broad buildout",

  why:
    "Retention evidence is weak while product and engineering capacity are actively being consumed.",

  nextAction:
    "Inspect creator retention evidence before expanding onboarding scope.",

  validationConfidence: 23,
  confidenceTrend: "declining",

  missingProof: [
    "Weekly retained creator signal",
    "Retained creator threshold",
    "Broadcast loop repeat usage"
  ],

  capacityImpact: {
    teams: ["Product", "Engineering"],
    level: "high",
    note:
      "Narrowing Reson8 protects product and engineering capacity for higher-confidence Sentra activation work."
  },

  sourceEvidenceIds: [
    "evidence-weekly-creator-cohort",
    "evidence-retention-threshold",
    "evidence-reson8-onboarding-buildout",
    "evidence-broadcast-loop-review"
  ],

  sourceBetIds: [
    "bet-creator-retention-signal"
  ],

  urgency: "critical",

  confidence: 82
}
```

---

# Studio Decisions Export

```ts
export const studioDecisions: StudioDecision[] = [
  studioDecisionReson8Narrow
]
```

---

# Analyst Recommendation Data Model

```ts
export type AnalystRecommendation = {
  id: string

  ventureId: VentureId
  ventureName: string

  recommendedMove: RecommendedMove

  title: string
  why: string
  nextAction: string

  confidence: number
  urgency: Urgency

  sourceEvidenceIds: string[]
  sourceBetIds: string[]

  sourceSummary: {
    evidenceCount: number
    betCount: number
    capacitySignalCount: number
  }

  capacityImpact: CapacityImpact

  reasoning: string
}
```

---

# Seeded Analyst Recommendations

## Reson8 — Narrow

```ts
export const recommendationReson8Narrow: AnalystRecommendation = {
  id: "rec-reson8-narrow",
  ventureId: "reson8",
  ventureName: "Reson8",

  recommendedMove: "narrow",

  title:
    "Narrow Reson8 before continuing broad buildout",

  why:
    "Retention evidence is weak while product and engineering capacity are actively being consumed.",

  nextAction:
    "Stop broad onboarding buildout. Continue only retained-creator threshold validation.",

  confidence: 82,

  urgency: "critical",

  sourceEvidenceIds: [
    "evidence-weekly-creator-cohort",
    "evidence-retention-threshold",
    "evidence-reson8-onboarding-buildout",
    "evidence-broadcast-loop-review"
  ],

  sourceBetIds: [
    "bet-creator-retention-signal"
  ],

  sourceSummary: {
    evidenceCount: 4,
    betCount: 1,
    capacitySignalCount: 2
  },

  capacityImpact: {
    teams: ["Product", "Engineering"],
    level: "high",
    note:
      "Narrowing Reson8 protects product and engineering capacity for higher-confidence Sentra activation work."
  },

  reasoning:
    "Reson8 has active onboarding work, but the retained creator signal remains unresolved. Continuing broad execution risks spending shared capacity before the core retention proof is clear."
}
```

---

## Sentra — Staff Up

```ts
export const recommendationSentraStaffUp: AnalystRecommendation = {
  id: "rec-sentra-staff-up",
  ventureId: "sentra",
  ventureName: "Sentra",

  recommendedMove: "staff-up",

  title:
    "Staff up Sentra activation work",

  why:
    "Activation confidence is improving, but engineering capacity is slowing recovery and referral instrumentation.",

  nextAction:
    "Add limited engineering capacity to complete activation recovery and referral instrumentation.",

  confidence: 78,

  urgency: "medium",

  sourceEvidenceIds: [
    "evidence-activation-analytics-recovery",
    "evidence-sentra-bottleneck-review",
    "evidence-mobile-referral-event-fix"
  ],

  sourceBetIds: [
    "bet-activation-analytics-recovery",
    "bet-mobile-referral-expansion"
  ],

  sourceSummary: {
    evidenceCount: 3,
    betCount: 2,
    capacitySignalCount: 1
  },

  capacityImpact: {
    teams: ["Engineering"],
    level: "medium",
    note:
      "Focused engineering time supports a higher-confidence activation opportunity."
  },

  reasoning:
    "Sentra has stronger validation signals than Reson8. Activation analytics have improved, but execution may slow without focused engineering capacity."
}
```

---

## Internal Ops — Continue

```ts
export const recommendationInternalOpsContinue: AnalystRecommendation = {
  id: "rec-internal-ops-continue",
  ventureId: "internal-ops",
  ventureName: "Internal Ops",

  recommendedMove: "continue",

  title:
    "Continue Internal Ops metrics scope",

  why:
    "The work is stable, low capacity, and supports studio-level visibility without creating major delivery risk.",

  nextAction:
    "Complete partner review alignment, but defer reporting workflow expansion.",

  confidence: 74,

  urgency: "low",

  sourceEvidenceIds: [
    "evidence-studio-metrics-scope-cleanup",
    "evidence-partner-review-alignment",
    "evidence-reporting-workflow-review"
  ],

  sourceBetIds: [
    "bet-studio-metrics-scope"
  ],

  sourceSummary: {
    evidenceCount: 3,
    betCount: 1,
    capacitySignalCount: 1
  },

  capacityImpact: {
    teams: ["Product"],
    level: "low",
    note:
      "Internal Ops work is useful and contained, but broader reporting expansion should wait."
  },

  reasoning:
    "Internal Ops is producing useful studio leverage without major capacity pressure. The broader partner reporting workflow should remain deferred until repeat demand is clearer."
}
```

---

# Analyst Recommendations Export

```ts
export const analystRecommendations: AnalystRecommendation[] = [
  recommendationReson8Narrow,
  recommendationSentraStaffUp,
  recommendationInternalOpsContinue
]
```

---

# Capacity Signal Data Model

```ts
export type CapacitySignal = {
  id: string

  team:
    | "Product"
    | "Engineering"
    | "Design"
    | "Growth"
    | "Research"

  pressure: CapacityLevel

  allocatedVentures: {
    ventureId: VentureId
    ventureName: string
    load: number
  }[]

  implication: string
}
```

---

# Seeded Capacity Signals

## Engineering Capacity

```ts
export const engineeringCapacityPressure: CapacitySignal = {
  id: "capacity-engineering-pressure",
  team: "Engineering",

  pressure: "high",

  allocatedVentures: [
    {
      ventureId: "reson8",
      ventureName: "Reson8",
      load: 42
    },
    {
      ventureId: "sentra",
      ventureName: "Sentra",
      load: 38
    },
    {
      ventureId: "internal-ops",
      ventureName: "Internal Ops",
      load: 20
    }
  ],

  implication:
    "Narrowing Reson8 protects engineering capacity for higher-confidence Sentra activation work."
}
```

---

## Product Capacity

```ts
export const productCapacityPressure: CapacitySignal = {
  id: "capacity-product-pressure",
  team: "Product",

  pressure: "high",

  allocatedVentures: [
    {
      ventureId: "reson8",
      ventureName: "Reson8",
      load: 45
    },
    {
      ventureId: "sentra",
      ventureName: "Sentra",
      load: 30
    },
    {
      ventureId: "internal-ops",
      ventureName: "Internal Ops",
      load: 25
    }
  ],

  implication:
    "Product capacity is tied up in Reson8 validation and should be narrowed until retention proof improves."
}
```

---

## Growth Capacity

```ts
export const growthCapacityPressure: CapacitySignal = {
  id: "capacity-growth-pressure",
  team: "Growth",

  pressure: "medium",

  allocatedVentures: [
    {
      ventureId: "reson8",
      ventureName: "Reson8",
      load: 10
    },
    {
      ventureId: "sentra",
      ventureName: "Sentra",
      load: 70
    },
    {
      ventureId: "internal-ops",
      ventureName: "Internal Ops",
      load: 20
    }
  ],

  implication:
    "Growth capacity is mostly focused on Sentra, where validation confidence is stronger."
}
```

---

# Capacity Export

```ts
export const capacitySignals: CapacitySignal[] = [
  engineeringCapacityPressure,
  productCapacityPressure,
  growthCapacityPressure
]
```

---

# Central Demo Data Export

If useful, create a central seed file:

```ts
export const demoData = {
  ventures,
  bets,
  evidenceItems,
  studioDecisions,
  analystRecommendations,
  capacitySignals
}
```

---

# Required Cross-Object Relationships

Preserve these exact relationships.

## Primary Decision Chain

```txt
decision-reson8-narrow
→ sourceEvidenceIds:
  - evidence-weekly-creator-cohort
  - evidence-retention-threshold
  - evidence-reson8-onboarding-buildout
  - evidence-broadcast-loop-review
→ sourceBetIds:
  - bet-creator-retention-signal
```

---

## Reson8 Creator Retention Bet

```txt
bet-creator-retention-signal
→ linkedEvidenceIds:
  - evidence-weekly-creator-cohort
  - evidence-retention-threshold
  - evidence-reson8-onboarding-buildout
  - evidence-broadcast-loop-review
```

---

## Sentra Activation Bet

```txt
bet-activation-analytics-recovery
→ linkedEvidenceIds:
  - evidence-activation-analytics-recovery
  - evidence-sentra-bottleneck-review
  - evidence-mobile-referral-event-fix
```

---

## Sentra Referral Bet

```txt
bet-mobile-referral-expansion
→ linkedEvidenceIds:
  - evidence-mobile-referral-event-fix
  - evidence-referral-conversion-baseline
```

---

## Internal Ops Metrics Bet

```txt
bet-studio-metrics-scope
→ linkedEvidenceIds:
  - evidence-studio-metrics-scope-cleanup
  - evidence-partner-review-alignment
  - evidence-reporting-workflow-review
```

---

# UI Story Expectations

The seeded data should drive these visible UI states.

## Command Center

Must show:

```txt
Recommended Move: Narrow Reson8
Validation confidence: 23%
Capacity pressure: High
Missing proof: Weekly retained creator signal
Primary action: Inspect evidence
```

---

## Evidence

Must show:

```txt
Reson8 evidence is not proving enough yet.
Some Reson8 work is actively consuming capacity.
Evidence supports the Narrow recommendation.
```

---

## Bets

Must show:

```txt
Creator Retention Signal Validation
Validation confidence: 23%
Execution progress: 41%
Recommended move: Narrow
Missing proof: Weekly retained creator signal
```

Also show:

```txt
Execution is moving, but validation confidence remains weak.
```

---

## Studio Analyst

Must show:

```txt
Recommended Move
Narrow Reson8

Source evidence
4 evidence items · 1 bet · 2 capacity signals

Capacity impact
Protects product and engineering capacity for Sentra activation work.

Confidence
82%
```

---

# Acceptance Criteria

This seeded demo story is complete when:

* Sentra, Reson8, and Internal Ops exist consistently across app data
* Reson8 is the clear primary attention-needed venture
* Command Center recommends Narrow Reson8
* Evidence items support the Reson8 decision chain
* Bets show Reson8 has low confidence despite active execution
* Studio Analyst explains the Reson8 recommendation
* Sentra appears promising but capacity constrained
* Internal Ops appears stable and contained
* every primary recommendation has source evidence
* every important Bet has linked evidence
* at least one Bet shows progress higher than validation confidence
* context links work across Command Center, Evidence, Bets, and Studio Analyst
* seeded data feels realistic and operational
* no Lorem Ipsum or random placeholder data remains in primary demo surfaces

---

# Final Data North Star

The seeded data succeeds when a reviewer can infer this within 30 seconds:

> Reson8 is moving, but proof is weak. Foundary recommends narrowing the work before more capacity is wasted.

The data should make the product strategy visible without needing verbal explanation.
