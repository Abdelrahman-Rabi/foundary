# Feature Specification - Validation Gates

## Purpose

Validation Gates are Foundary's phase-aware decision layer.

They help venture studios decide whether a venture has enough evidence to
justify more operator time, engineering work, or capital.

Validation Gates should answer:
- what assumption is being tested
- what evidence is required
- what evidence exists
- what evidence is missing
- whether execution is justified
- which studio decision should happen next

Validation Gates should feel like:

> a lightweight operating discipline that prevents wasted execution.

They should NOT feel like:

> an enterprise approval workflow.

---

# Strategic Role

Validation Gates sit between portfolio decisions and execution evidence:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Their job is to distinguish validation progress from execution activity.

Generic project management asks:

> Is the work moving?

Foundary should ask:

> Is the work proving enough to justify the next studio commitment?

---

# Core Product Principle

Venture studios should not keep building because tasks exist.

A venture with active issues, roadmap movement, and strong delivery velocity may
still be a poor use of studio capacity if its validation gate is weak.

Validation Gates make that tension visible.

---

# Route And Implementation Context

Validation Gates are not necessarily a standalone route in the next phase.

They should appear inside:

```txt
/dashboard   -> Studio Command Center
/issues      -> Execution Evidence
/roadmap     -> Venture Bets / Validation Initiatives
/assistant   -> Studio Analyst
```

Likely implementation areas:

```txt
src/types/venture.ts
src/types/issue.ts
src/types/roadmap.ts
src/types/ai.ts
src/data/ventures.ts
src/data/issues.ts
src/data/roadmap.ts
src/data/ai-insights.ts
src/features/dashboard/*
src/features/issues/components/issue-drawer-content.tsx
src/features/roadmap/components/roadmap-drawer-content.tsx
src/features/assistant/utils/assistant-analysis.ts
src/features/synchronization/utils/sync-utils.ts
```

Implementation should prefer:
- typed mock data
- derived utilities
- existing drawers
- existing venture / issue / roadmap stores

before adding new global stores.

---

# Required Context

Load before implementation:

```txt
context/strategy/studio-operating-intelligence.md
context/project-overview.md
context/project-specs.md
context/features/feature-validation-gates.md
context/current-feature.md
```

Load additionally when touching:

```txt
Command Center:
context/features/feature-studio-command-center.md

Execution evidence:
context/features/feature-execution-evidence.md

Roadmap:
context/features/feature-roadmap.md

Issues:
context/features/feature-issues.md

Studio Analyst:
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md

Domain data:
context/data/domain-models.md
context/data/mock-data-strategy.md
```

---

# Lifecycle Phases

Supported phases:

```ts
type VenturePhase =
  | "explore"
  | "validate"
  | "build"
  | "scale"
```

## Explore

Purpose:
- problem discovery
- market understanding
- early customer signal
- founder / studio thesis clarity

Gate examples:
- problem urgency
- ICP clarity
- market pull
- interview quality

## Validate

Purpose:
- demand signal
- retention signal
- willingness to pay
- repeatable customer behavior

Gate examples:
- activation signal
- retention threshold
- conversion threshold
- paid pilot evidence

## Build

Purpose:
- MVP scope discipline
- launch readiness
- technical execution risk
- validation-backed delivery

Gate examples:
- MVP readiness
- launch scope confidence
- activation instrumentation
- critical path risk

## Scale

Purpose:
- GTM repeatability
- operating leverage
- revenue signal
- capacity expansion readiness

Gate examples:
- repeatable acquisition
- expansion signal
- margin / leverage signal
- operating system maturity

---

# Studio Decisions

Validation Gates should support explicit studio decisions:

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

## Decision Meaning

| Decision | Meaning |
|---|---|
| `continue` | Evidence supports another cycle of work |
| `narrow` | The venture may continue, but scope or ICP must tighten |
| `pause` | Stop active work until evidence or capacity changes |
| `kill` | Evidence is insufficient or negative enough to stop |
| `staff-up` | Confidence is high enough to justify more capacity |
| `defer` | Decision is valid but not urgent now |
| `partner-review` | Needs studio leadership judgment |

Decision language should appear in:
- Command Center
- venture attention queue
- validation risk panel
- issue drawer context
- roadmap drawer context
- Studio Analyst recommendations

---

# Gate Status And Pressure

## Gate Status

```ts
type ValidationGateStatus =
  | "healthy"
  | "watch"
  | "at-risk"
  | "blocked"
  | "passed"
  | "failed"
```

## Decision Pressure

```ts
type DecisionPressure =
  | "low"
  | "medium"
  | "high"
  | "critical"
```

Status describes the gate.

Decision pressure describes how urgently the studio should act.

Example:

```txt
Gate status: at-risk
Decision pressure: high
Reason: execution is active while retention evidence remains weak
```

---

# Data Model Direction

## Validation Gate

```ts
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

## Evidence Signal

```ts
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

  strength:
    | "weak"
    | "moderate"
    | "strong"
    | "negative"

  confidenceImpact:
    | "increase"
    | "decrease"
    | "neutral"

  sourceIssueIds: string[]
  sourceRoadmapIds: string[]

  observedAt: string
}
```

## Assumption

Early implementation may keep assumptions as strings on `ValidationGate`.

If assumptions need first-class treatment later:

```ts
type Assumption = {
  id: string
  ventureId: string
  gateId: string
  statement: string
  status: "untested" | "testing" | "supported" | "challenged" | "invalidated"
  evidenceSignalIds: string[]
}
```

Do not introduce first-class assumption management unless the UI needs it.

---

# Gate Confidence Rules

Confidence should represent validation confidence, not delivery progress.

## Confidence Should Increase When

- required evidence is present
- evidence signals are strong
- customer behavior supports the assumption
- linked execution produces meaningful learning
- blocked evidence collection is resolved

## Confidence Should Decrease When

- required evidence is missing
- evidence signals are weak or negative
- execution continues without learning
- linked work is stale or blocked
- operator capacity is consumed without confidence movement
- roadmap scope expands before gate evidence exists

## Confidence Should Not Increase Just Because

- issues were completed
- roadmap progress moved
- more work was created
- delivery velocity improved
- AI generated a positive summary

This distinction is central to the Foundary pivot.

---

# Gate-To-Execution Linkage

Validation Gates should connect to execution evidence.

## Issues

Issues can support a gate by:
- collecting evidence
- building instrumentation
- unblocking a test
- reducing technical risk
- consuming capacity without improving confidence
- proving or disproving an assumption

Issue drawers should show:
- linked gate
- assumption tested
- evidence role
- confidence impact
- capacity impact

## Roadmap Bets

Roadmap items can support a gate by:
- defining a validation initiative
- representing a growth bet
- reducing a known risk
- coordinating gate-linked execution

Roadmap drawers should show:
- linked gate
- bet type
- expected evidence
- linked issues
- confidence impact
- recommended decision context

---

# Gate-To-Capacity Linkage

Validation Gates should expose when capacity is being spent without enough
evidence.

Capacity context should answer:
- which function is constrained
- which venture is consuming the capacity
- whether the gate justifies more work
- what downstream tradeoff exists

Example:

```txt
Engineering is active on Reson8 onboarding, but retention evidence remains weak.
Recommendation: narrow before allocating another build cycle.
```

---

# Gate-To-Analyst Linkage

Studio Analyst recommendations should use gate context as a primary input.

Analyst outputs should reference:
- gate name
- confidence level
- missing evidence
- linked execution evidence
- capacity tradeoff
- recommended studio decision

Avoid analyst recommendations that do not cite a gate, evidence, or capacity
reason when those objects exist.

---

# Surface Requirements

## Studio Command Center

Show:
- current gate per venture
- gate confidence
- gate status
- decision pressure
- recommended decision
- missing evidence

The top studio decision should usually come from the most urgent gate/capacity
combination.

## Issues

Show gate context without slowing execution workflows.

Possible UI:
- compact gate badge
- evidence role label
- drawer section for validation linkage
- filter by gate when useful

## Roadmap

Show gate context as part of venture bets.

Possible UI:
- gate badge on card
- confidence impact in drawer
- linked evidence section
- validation initiative language

## Studio Analyst

Show:
- recommendations grounded in gates
- evidence gaps
- decision reasoning
- source links

---

# Empty States

## Venture With No Gate

```txt
No validation gate set for this venture.
Define the assumption that should justify the next studio commitment.
```

## Gate With No Evidence

```txt
No evidence linked to this gate yet.
Capture the first interview, experiment, metric, or execution item.
```

## Gate With Work But No Evidence

```txt
Execution is active, but this gate has no supporting evidence yet.
Link work to an assumption before adding another build cycle.
```

## Empty State Rules

Prefer:
- direct first action
- concise operating language
- no fake certainty
- no celebratory copy

Avoid:
- tutorial panels
- long education text
- generic setup checklists

---

# Seeded Demo Requirements

Seeded ventures should have distinct gate stories:

## Sentra

Suggested state:
- phase: Build or Scale
- gate: activation / growth readiness
- confidence: moderate-high
- decision: continue or staff-up with capacity protection
- risk: design or product capacity strain

Demo role:

> Shows a healthier venture that still requires capacity discipline.

## Reson8

Suggested state:
- phase: Validate
- gate: retention or repeat-use signal
- confidence: low or at-risk
- decision: narrow or pause
- risk: active execution outpacing evidence

Demo role:

> Shows the sunk-cost trap Foundary is designed to catch.

## Internal Ops

Suggested state:
- phase: Scale or Build
- gate: operating leverage
- confidence: stable
- decision: defer or continue steady-state
- risk: contained scope

Demo role:

> Shows internal studio leverage and capacity release.

---

# UX Requirements

## Must Feel

- decisive
- lightweight
- evidence-backed
- studio-native
- calm
- operational

## Must Avoid

- approval workflow energy
- enterprise governance
- long forms
- bureaucratic stage gates
- decorative status labels
- confusing validation with delivery

## Visual Guidance

Use:
- compact badges
- small confidence indicators
- concise evidence summaries
- drawer sections
- linked source chips

Avoid:
- large process diagrams
- multi-step wizard flows
- heavy gate setup screens
- workflow-builder UI

---

# Copy Guidelines

Prefer:
- Validation gate
- Evidence required
- Evidence missing
- Confidence
- Decision pressure
- Recommended move
- Execution outpacing evidence
- Narrow before build cycle
- Continue with capacity protection

Avoid:
- approval stage
- governance workflow
- project phase complete
- task progress
- productivity score
- generic health score

---

# Anti-Patterns

DO NOT:
- make gates a full workflow engine
- block users from editing issues or roadmap items
- add permission or approval systems
- create enterprise stage-gate bureaucracy
- equate completed tasks with validation confidence
- hide gate status inside secondary drawers only
- invent fake evidence for clean/custom ventures
- add backend validation services
- add finance or cap-table logic

---

# Verification

For implementation work, verify:
- each seeded venture has phase and gate context
- Command Center displays gate status and decision pressure
- Reson8 clearly shows weak validation with active execution
- Sentra shows higher confidence with capacity tradeoff
- Internal Ops shows stable leverage or low intervention
- issue drawer can explain gate linkage when present
- roadmap drawer can explain gate linkage when present
- Studio Analyst recommendation cites gate/evidence/capacity context
- start-clean state does not invent gates or fake evidence
- custom venture empty state explains how to start with a gate or evidence item

Suggested checks:

```txt
npm run lint
npm run build
```

For UI changes, also browser-check:

```txt
/dashboard
/issues
/roadmap
/assistant
```

---

# Success Criteria

Validation Gates succeed when a reviewer understands:

> Foundary does not just show whether work is moving. It shows whether the work
> is justified by evidence.

They fail if gates feel like:

> a project approval process.

The desired product feeling is:

> This studio knows when to continue, narrow, pause, or kill before wasting
> another cycle.
