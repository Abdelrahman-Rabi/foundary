# Domain Models - Foundary

## Purpose

This document defines Foundary's domain model direction for the Studio
Operating Intelligence repositioning.

It covers:
- core domain entities
- data relationships
- validation gate models
- execution evidence models
- operator capacity models
- Studio Analyst signal models
- synchronization logic
- mock data architecture

These models are intentionally optimized for:
- frontend-first architecture
- mocked operational realism
- local-first continuity
- venture-aware execution
- evidence-backed studio decisions
- believable product sophistication

The system should model:

> studio operating intelligence, not generic task management.

---

# Domain Modeling Philosophy

The data architecture should prioritize:
- clarity
- interoperability
- venture-awareness
- evidence linkage
- AI contextualization
- frontend simplicity
- believable operational behavior

Avoid:
- enterprise-level normalization
- backend-driven complexity
- unnecessary relational depth
- infrastructure-oriented schemas
- finance or cap-table modeling
- scheduling-system complexity

Models in this document are directional. Implementation may migrate toward them
incrementally using existing `src/types/*`, seeded data, stores, and derived
utilities.

---

# Product Spine

Foundary's data model should support:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Every major entity should either:
- belong to a venture
- support a validation gate
- act as execution evidence
- describe operator capacity
- support a studio decision
- provide analyst reasoning

---

# Core Domain Relationships

```txt
Workspace
  -> Ventures
      -> Validation Gates
          -> Assumptions
          -> Evidence Signals
          -> Linked Issues
          -> Linked Roadmap Bets
      -> Issues / Execution Evidence
      -> Roadmap Bets / Validation Initiatives
      -> Operator Allocations
      -> Studio Analyst Signals
      -> Decision Pressure / Health
```

The old relationship model was:

```txt
Venture -> Issues / Roadmap / AI / Metrics
```

The new model is:

```txt
Venture -> Gates -> Evidence -> Capacity -> Decision
```

Issues and roadmap items still exist, but their strategic meaning changes.

---

# Domain Entity Overview

| Entity | Purpose |
|---|---|
| Venture | Top-level studio operating context |
| ValidationGate | Phase-aware decision gate |
| Assumption | Optional first-class statement being tested |
| EvidenceSignal | Signal that affects validation confidence |
| Issue | Fast execution item that may act as evidence |
| RoadmapItem | Venture bet or validation initiative |
| OperatorAllocation | Shared capacity allocation by venture/function |
| OperatorImpact | Capacity impact attached to work |
| CapacitySignal | Derived cross-venture capacity pressure |
| AnalystSignal | Studio Analyst recommendation or observation |
| VentureHealth | Derived venture status and decision pressure |
| CommandCenterData | Derived portfolio decision surface data |
| User | Lightweight ownership representation |
| Tag | Lightweight categorization |
| ActivityEvent | Derived operational event |

---

# Shared Types

## Venture Phase

```ts
type VenturePhase =
  | "explore"
  | "validate"
  | "build"
  | "scale"
```

Phase mapping from older venture stages:

```txt
idea -> explore
validation -> validate
mvp -> build
growth -> scale
```

## Studio Decision

```ts
type StudioDecision =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"
```

## Decision Pressure

```ts
type DecisionPressure =
  | "low"
  | "medium"
  | "high"
  | "critical"
```

## Confidence Impact

```ts
type ConfidenceImpact =
  | "increase"
  | "decrease"
  | "neutral"
```

---

# 1. Venture Model

## Purpose

Represents:

> an independent startup or operational initiative inside the venture studio
> ecosystem.

Every major system object should be venture-aware.

---

## Venture Type Direction

```ts
type Venture = {
  id: string

  name: string
  slug: string
  description: string

  stage:
    | "idea"
    | "validation"
    | "mvp"
    | "growth"

  phase?: VenturePhase

  health:
    | "strong"
    | "stable"
    | "at-risk"
    | "critical"

  momentum:
    | "high"
    | "moderate"
    | "slow"

  color: string
  icon: string

  currentGateId?: string
  recommendedDecision?: StudioDecision
  decisionPressure?: DecisionPressure

  activeRoadmapCount: number
  activeIssueCount: number
  overdueIssueCount: number

  progress: number
  confidence: number

  createdAt: string
  updatedAt: string
}
```

`stage` may remain for existing compatibility. `phase` should become the Studio
Operating Intelligence phase model.

---

# Venture Design Notes

Ventures should feel:
- operationally alive
- strategically distinct
- contextually meaningful
- decision-bearing

Each venture should have:
- lifecycle phase
- current validation gate
- distinct evidence situation
- distinct capacity situation
- clear recommended studio move

Custom local ventures may be created and should remain frontend-only local
workspace state.

Minimum creation input remains:

```ts
type CreateVentureInput = {
  name: string
  description: string
  stage: "idea" | "validation" | "mvp" | "growth"
}
```

Generated fields should include:
- stable local id
- duplicate-safe slug
- compact lettermark icon
- UI-safe color
- stage-aware health, momentum, progress, confidence, and phase defaults

Custom ventures should not receive fake gates, fake evidence, or fake analyst
certainty until work exists.

---

# Recommended Seeded Venture Roles

```txt
Sentra:
Higher-confidence growth opportunity with activation upside and capacity strain.

Reson8:
Validation uncertainty with active execution and sunk-cost risk.

Internal Ops:
Stable studio leverage with contained scope and freed capacity.
```

---

# 2. Validation Gate Model

## Purpose

Represents:

> the phase-aware evidence threshold that determines whether a venture deserves
> more studio commitment.

Validation gates separate validation confidence from execution activity.

---

## Validation Gate Type

```ts
type ValidationGateStatus =
  | "healthy"
  | "watch"
  | "at-risk"
  | "blocked"
  | "passed"
  | "failed"

type ValidationGate = {
  id: string
  ventureId: string

  phase: VenturePhase
  name: string
  description: string

  assumption: string
  requiredEvidence: string[]
  evidenceSignalIds: string[]

  linkedIssueIds: string[]
  linkedRoadmapIds: string[]

  confidence: number
  status: ValidationGateStatus
  decisionPressure: DecisionPressure

  recommendedDecision: StudioDecision
  decisionReason: string

  updatedAt: string
}
```

---

# Validation Gate Philosophy

Gates should answer:
- what assumption is being tested
- what evidence is required
- what evidence exists
- what evidence is missing
- whether execution is justified
- which studio move is recommended

Avoid:
- approval workflows
- permission systems
- stage-gate bureaucracy
- blocking edits to issues or roadmap items

---

# 3. Assumption Model

## Purpose

Represents:

> a venture belief that must be supported or challenged by evidence.

Assumptions can remain strings on `ValidationGate` until the UI requires
first-class assumption management.

---

## Optional Assumption Type

```ts
type Assumption = {
  id: string
  ventureId: string
  gateId: string

  statement: string

  status:
    | "untested"
    | "testing"
    | "supported"
    | "challenged"
    | "invalidated"

  evidenceSignalIds: string[]

  updatedAt: string
}
```

Do not introduce an assumption store unless the product needs editable
assumption objects.

---

# 4. Evidence Signal Model

## Purpose

Represents:

> an observed signal that affects validation confidence.

Evidence signals can be seeded, derived, or later user-created.

---

## Evidence Signal Type

```ts
type EvidenceStrength =
  | "weak"
  | "moderate"
  | "strong"
  | "negative"

type EvidenceSignal = {
  id: string
  ventureId: string
  gateId: string

  title: string
  summary: string

  signalType:
    | "customer-interview"
    | "activation"
    | "retention"
    | "conversion"
    | "revenue"
    | "technical-risk"
    | "capacity"
    | "market"
    | "qualitative"

  strength: EvidenceStrength
  confidenceImpact: ConfidenceImpact

  sourceIssueIds: string[]
  sourceRoadmapIds: string[]

  observedAt: string
}
```

---

# Evidence Signal Philosophy

Signals should feel:
- believable
- directional
- source-linked
- useful for decisions

Avoid:
- fake precision
- invented evidence in clean states
- long research-report behavior
- standalone evidence database complexity

---

# 5. Issue Model

## Purpose

Represents:

> fast execution work that may also act as execution evidence.

Issues remain the high-velocity execution layer, but their strategic role is to
show how work supports or challenges a venture decision.

---

## Issue Type Direction

```ts
type EvidenceRole =
  | "prove"
  | "disprove"
  | "unblock"
  | "de-risk"
  | "capacity-cost"

type Issue = {
  id: string

  ventureId: string
  roadmapId?: string

  title: string
  description: string

  type:
    | "feature"
    | "bug"
    | "experiment"
    | "tech-debt"
    | "research"

  priority:
    | "urgent"
    | "high"
    | "medium"
    | "low"

  status:
    | "backlog"
    | "planned"
    | "in-progress"
    | "in-review"
    | "done"
    | "killed"

  ownerId: string
  dueDate?: string
  tags: string[]

  riskLevel:
    | "low"
    | "medium"
    | "high"

  confidence: number

  effort:
    | "small"
    | "medium"
    | "large"

  blocked: boolean
  acceptanceCriteria?: string[]

  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  evidenceRole?: EvidenceRole
  evidenceStrength?: EvidenceStrength
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision

  aiInsightIds: string[]

  createdAt: string
  updatedAt: string
}
```

Evidence fields should be optional. Quick create must remain fast.

---

# Issue Modeling Philosophy

Issues should support:
- operational realism
- quick capture
- roadmap synchronization
- validation linkage
- capacity interpretation
- Studio Analyst reasoning

Avoid:
- mandatory evidence metadata on every issue
- enterprise workflow states
- deep issue hierarchies
- story-point complexity
- assuming done work means validation progress

---

# 6. Roadmap Item Model

## Purpose

Represents:

> a venture bet or validation initiative.

Roadmap items are outcome-oriented and evidence-aware, not generic planning
cards.

---

## Roadmap Item Type Direction

```ts
type RoadmapBetType =
  | "validation"
  | "growth"
  | "delivery"
  | "risk-reduction"
  | "leverage"

type RoadmapItem = {
  id: string

  ventureId: string

  title: string
  description: string

  timeframe:
    | "now"
    | "next"
    | "later"

  goal: string

  status:
    | "planned"
    | "active"
    | "at-risk"
    | "completed"
    | "killed"

  ownerId: string
  linkedIssueIds: string[]

  progress: number
  confidence: number

  impact:
    | "low"
    | "medium"
    | "high"

  riskLevel:
    | "low"
    | "medium"
    | "high"

  targetMetric?: string

  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  betType?: RoadmapBetType
  expectedEvidence?: string[]
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision

  aiInsightIds: string[]

  createdAt: string
  updatedAt: string
}
```

---

# Roadmap Philosophy

Roadmap items should emphasize:
- venture bets
- validation initiatives
- strategic direction
- evidence expectations
- confidence
- outcomes

NOT:
- detailed sprint planning
- engineering estimation
- delivery bureaucracy
- timeline-heavy planning

---

# 7. Operator Capacity Models

## Purpose

Represent:

> shared studio capacity and function-level contention across ventures.

Capacity models should explain where scarce operator time is spent and whether
that spend is justified by evidence.

---

## Operator Types

```ts
type OperatorFunction =
  | "product"
  | "design"
  | "engineering"
  | "gtm"
  | "partner"

type CapacityPressure =
  | "healthy"
  | "watch"
  | "overloaded"
```

---

## Operator Impact

Attached to issues, roadmap items, evidence signals, and analyst outputs.

```ts
type OperatorImpact = {
  function: OperatorFunction
  effort: "low" | "medium" | "high"
  capacityPercent?: number
  note: string
}
```

---

## Operator Allocation

Venture-level seeded or derived capacity.

```ts
type OperatorAllocation = {
  id: string
  ventureId: string
  function: OperatorFunction
  operatorName?: string
  allocationPercent: number
  pressure: CapacityPressure
  impact: string
  linkedIssueIds: string[]
  linkedRoadmapIds: string[]
  updatedAt: string
}
```

---

## Capacity Signal

Derived signal for Command Center and Studio Analyst surfaces.

```ts
type CapacitySignal = {
  id: string
  function: OperatorFunction
  pressure: CapacityPressure
  totalAllocationPercent: number
  affectedVentureIds: string[]
  contentionReason: string
  downstreamImpact: string
  recommendedDecision?: StudioDecision
  sourceIssueIds: string[]
  sourceRoadmapIds: string[]
}
```

---

# Operator Capacity Philosophy

Capacity should show:
- overloaded functions
- cross-venture contention
- high-effort work against weak evidence
- capacity protection for higher-confidence work

Avoid:
- calendars
- timesheets
- staffing workflows
- utilization reports
- bill-back logic
- cap-table implications
- fake precision

---

# 8. Studio Analyst Signal Model

## Purpose

Represents:

> a source-linked analyst recommendation or observation that supports a studio
> decision.

The Studio Analyst replaces generic assistant summaries with decision-oriented
intelligence.

---

## Analyst Signal Type

Existing `AIInsight` may remain temporarily. Future model direction:

```ts
type AnalystSignal = {
  id: string
  ventureId?: string

  signalType:
    | "studio-decision"
    | "evidence-gap"
    | "sunk-cost-risk"
    | "capacity-tradeoff"
    | "gate-confidence"
    | "execution-risk"

  title: string
  summary: string

  recommendedDecision?: StudioDecision
  confidence: "low" | "medium" | "high"
  severity: "low" | "medium" | "high"

  gateIds: string[]
  evidenceSignalIds: string[]
  issueIds: string[]
  roadmapIds: string[]
  capacitySignalIds: string[]

  suggestedAction?: string
  createdAt: string
}
```

---

# Analyst Signal Philosophy

Analyst signals should:
- recommend studio moves
- cite gates, evidence, and capacity where available
- explain sunk-cost risk
- be concise and source-linked

Avoid:
- chatbot transcripts
- fake streaming state
- generic task summaries
- recommendations without evidence

---

# 9. Venture Health / Decision Pressure Model

## Purpose

Represents:

> derived venture status interpreted through gates, evidence, and capacity.

Health is no longer just operational status. It should indicate decision
pressure.

---

## Venture Health Type Direction

```ts
type VentureHealth = {
  ventureId: string

  health:
    | "strong"
    | "stable"
    | "at-risk"
    | "critical"

  momentum:
    | "high"
    | "moderate"
    | "slow"

  validationConfidence: number
  roadmapConfidence: number

  currentGateId?: string
  recommendedDecision?: StudioDecision
  decisionPressure: DecisionPressure

  overdueIssues: number
  blockedIssues: number
  completedThisWeek: number
  activeInitiatives: number

  capacityPressure?: CapacityPressure
  riskScore: number

  updatedAt: string
}
```

---

# Venture Health Philosophy

Health should communicate:
- validation confidence
- execution evidence
- capacity strain
- decision urgency

NOT:
- vanity analytics
- generic traffic-light status
- task completion alone

---

# 10. Command Center Data Model

## Purpose

Represents:

> derived portfolio decision data for the Studio Command Center.

This should usually be derived from ventures, gates, issues, roadmap items,
capacity, and analyst signals. Avoid a separate persisted dashboard store unless
user-editable state requires it.

---

## Command Center Type Direction

```ts
type CommandCenterDecision = {
  ventureId: string
  phase: VenturePhase
  gateId?: string
  recommendedDecision: StudioDecision
  pressure: DecisionPressure
  reason: string
  evidenceIds: string[]
  roadmapIds: string[]
  issueIds: string[]
  capacityImpact?: OperatorImpact
}

type CommandCenterData = {
  topDecision?: CommandCenterDecision
  attentionQueue: CommandCenterDecision[]
  validationRisks: ValidationGate[]
  capacitySignals: CapacitySignal[]
  analystSignals: AnalystSignal[]
}
```

---

# 11. User Model

## Purpose

Represents lightweight ownership and execution accountability.

This is NOT a full authentication system.

---

## User Type

```ts
type User = {
  id: string
  name: string
  role: string
  avatar: string
  activeVentureIds: string[]
  createdAt: string
}
```

Recommended role language may include:
- Venture Product Lead
- Studio Operator
- Product Designer
- AI Engineer
- GTM Operator
- Studio Partner

---

# 12. Tag Model

## Purpose

Lightweight issue and evidence categorization.

---

## Tag Type

```ts
type Tag = {
  id: string
  label: string
  color: string
}
```

Recommended tags:

```txt
AI
Growth
Infrastructure
Onboarding
Retention
Mobile
Analytics
Research
Performance
Validation
Capacity
GTM
```

---

# 13. Activity Event Model

## Purpose

Represents derived operational activity.

Used for timeline signals, operating awareness, and analyst source context.

---

## Activity Event Type

```ts
type ActivityEvent = {
  id: string
  ventureId: string
  actorId: string

  entityType:
    | "issue"
    | "roadmap"
    | "gate"
    | "evidence"
    | "capacity"

  entityId: string

  action:
    | "created"
    | "updated"
    | "moved"
    | "completed"
    | "killed"
    | "blocked"
    | "linked"
    | "unlinked"

  message: string
  createdAt: string
}
```

Activity should reinforce operational realism, not become a noisy social feed.

---

# Domain Relationships

## Venture Relationships

```txt
Venture
  -> ValidationGates
  -> Issues
  -> RoadmapItems
  -> OperatorAllocations
  -> AnalystSignals
  -> VentureHealth
```

## Validation Gate Relationships

```txt
ValidationGate
  -> belongs to Venture
  -> may represent Assumption
  -> links to EvidenceSignals
  -> links to Issues
  -> links to RoadmapItems
  -> informs StudioDecision
```

## Issue Relationships

```txt
Issue
  -> belongs to Venture
  -> optionally links to RoadmapItem
  -> optionally links to ValidationGate
  -> optionally links to EvidenceSignals
  -> may carry OperatorImpact
  -> informs AnalystSignals
```

## Roadmap Relationships

```txt
RoadmapItem
  -> belongs to Venture
  -> links to Issues
  -> optionally links to ValidationGate
  -> optionally links to EvidenceSignals
  -> may carry OperatorImpact
  -> informs AnalystSignals
```

## Capacity Relationships

```txt
OperatorAllocation
  -> belongs to Venture
  -> links to Issues and RoadmapItems
  -> derives CapacitySignals
  -> informs StudioDecision
```

---

# Synchronization Rules

## Venture Switching

Switching venture should update:
- issues
- roadmap items
- validation gate context
- evidence summaries
- capacity signals
- analyst signals
- Command Center scope

Immediately and globally.

## Issue Synchronization

Issue updates should affect:
- roadmap progress
- validation gate context
- execution evidence summary
- capacity interpretation
- analyst recommendations
- Command Center attention queue

## Roadmap Synchronization

Roadmap updates should affect:
- linked issue interpretation
- validation confidence
- execution evidence summary
- capacity pressure
- analyst recommendations
- Command Center top decision

## Gate Synchronization

Gate changes should affect:
- venture decision pressure
- Command Center ranking
- issue and roadmap drawer context
- analyst recommendations

## Capacity Synchronization

Capacity changes should affect:
- Command Center top decision
- portfolio attention queue
- analyst capacity tradeoffs
- gate confidence interpretation when work consumes capacity without evidence

Prefer derived calculations over fragile circular store updates.

---

# Mock Data Strategy

## Important Principle

Mock data quality heavily affects:

> perceived product sophistication.

The data should feel:
- realistic
- interconnected
- strategically coherent
- operationally believable
- studio-native
- decision-oriented

## Required Relationships

Mock data should connect:
- ventures
- lifecycle phases
- validation gates
- assumptions
- evidence signals
- issues
- roadmap bets
- operator allocations
- analyst signals

## Seeded Venture Stories

```txt
Sentra:
Higher-confidence growth opportunity with activation upside and capacity strain.

Reson8:
Validation uncertainty with active execution and sunk-cost risk.

Internal Ops:
Stable studio leverage with contained scope and freed capacity.
```

---

# Derived Intelligence Rules

## Gate Confidence Rules

Increase confidence when:
- required evidence exists
- strong evidence signals appear
- linked work produces meaningful learning
- blocked evidence collection is resolved

Decrease confidence when:
- required evidence is missing
- weak or negative signals appear
- execution continues without learning
- capacity is consumed without confidence movement

Do not increase validation confidence just because issues are done.

## Capacity Pressure Rules

Suggested interpretation:

```txt
0-85%      healthy
86-105%    watch
106%+      overloaded
```

Capacity pressure is strongest when interpreted with validation confidence:

```txt
high capacity + high confidence -> protect capacity or staff up
high capacity + low confidence -> narrow, pause, or partner review
low capacity + high confidence -> continue efficiently
low capacity + low confidence -> defer or clarify gate
```

## Studio Analyst Rules

Analyst signals should prefer:
- gate-backed reasoning
- evidence-backed recommendations
- capacity tradeoff explanation
- source object links

Avoid:
- generic AI outputs
- recommendations without evidence
- chatbot-like phrasing

---

# Zustand Store Architecture

## Recommended Store Separation

Existing stores remain valid:

```txt
useVentureStore
useIssueStore
useRoadmapStore
useAssistantStore
useUiStore
```

Potential future additions:

```txt
useValidationGateStore
useCapacityStore
```

Add future stores only when the state is:
- user-editable
- persisted
- shared across distant surfaces
- too complex to derive cleanly

Prefer typed mock data and derived utilities first.

---

# Local-First Persistence

Persist user-editable state:
- ventures
- issues
- roadmap items
- filters and view modes
- assistant / analyst inspected and dismissed signal state
- future gates, evidence, and capacity only when user-editable

Do not persist:
- fake AI transcripts
- generated reasoning
- derived Command Center data
- derived capacity signals unless explicitly user-authored

Invalid imports must not overwrite current valid state.

---

# Final Modeling Principles

Every domain model should reinforce:
- venture-awareness
- decision clarity
- validation confidence
- execution evidence
- operator leverage
- Studio Analyst reasoning
- believable sophistication

The system should feel like:

> a living studio operating environment.

NOT:

> a collection of disconnected CRUD entities.
