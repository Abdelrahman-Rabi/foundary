# Feature Specification - Operator Capacity

## Purpose

Operator Capacity is Foundary's lightweight shared-resource intelligence layer.

It helps venture studios see how scarce product, design, engineering, GTM, and
partner time is being spent across multiple ventures.

Operator Capacity should answer:
- which functions are overloaded
- which ventures are competing for the same operator capacity
- whether a venture's evidence justifies more capacity
- which execution work is expensive relative to validation confidence
- how capacity pressure affects the recommended studio move

Operator Capacity should feel like:

> a compact view of studio attention and specialist contention.

It should NOT feel like:

> enterprise resource planning or calendar scheduling.

---

# Strategic Role

Operator Capacity sits between execution evidence and Studio Analyst
recommendations:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Its job is to make scarce studio capacity visible before more work is assigned.

Generic project management asks:

> Who owns this task?

Foundary should ask:

> Is this the right use of the studio's limited people right now?

---

# Core Product Principle

Venture studios do not operate like dedicated product teams.

They rely on shared builders and specialists who move across ventures:
- product leads
- designers
- engineers
- GTM operators
- partners / studio leadership

Foundary should expose when one venture is pulling scarce capacity away from a
higher-confidence opportunity, or when low-evidence execution is consuming too
much of the studio.

---

# Route And Implementation Context

Operator Capacity is not a standalone route in the next phase.

It should appear inside:

```txt
/dashboard   -> Studio Command Center capacity panel
/issues      -> issue operator impact context
/roadmap     -> roadmap bet operator impact context
/assistant   -> Studio Analyst capacity reasoning
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
- seeded mock capacity data
- derived calculations
- compact panels and badges
- existing drawers

before adding new stores or standalone capacity management routes.

---

# Required Context

Load before implementation:

```txt
context/strategy/studio-operating-intelligence.md
context/project-overview.md
context/project-specs.md
context/features/feature-operator-capacity.md
context/current-feature.md
```

Load additionally when touching:

```txt
Command Center:
context/features/feature-studio-command-center.md

Validation gates:
context/features/feature-validation-gates.md

Execution evidence:
context/features/feature-execution-evidence.md

Studio Analyst:
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md

Domain data:
context/data/domain-models.md
context/data/mock-data-strategy.md
```

---

# Operator Functions

Supported function-level capacity:

```ts
type OperatorFunction =
  | "product"
  | "design"
  | "engineering"
  | "gtm"
  | "partner"
```

## Product

Represents:
- product strategy
- validation planning
- prioritization
- founder / studio coordination

## Design

Represents:
- product design
- UX research support
- prototypes
- activation and onboarding work

## Engineering

Represents:
- build cycles
- instrumentation
- technical de-risking
- MVP or product implementation

## GTM

Represents:
- customer development
- pilots
- sales motion experiments
- launch and growth work

## Partner

Represents:
- studio leadership attention
- investment committee judgment
- strategic escalation
- continue / narrow / pause / kill review

---

# Capacity Pressure

Capacity pressure should communicate load without fake precision.

```ts
type CapacityPressure =
  | "healthy"
  | "watch"
  | "overloaded"
```

## Healthy

Capacity is within a believable operating range.

## Watch

Capacity is tight or becoming contentious.

## Overloaded

Capacity is overcommitted, delaying decisions or execution elsewhere.

---

# Data Model Direction

## Operator Impact

Use this on issues, roadmap bets, evidence signals, and analyst outputs.

```ts
type OperatorImpact = {
  function: OperatorFunction
  effort: "low" | "medium" | "high"
  capacityPercent?: number
  note: string
}
```

## Operator Allocation

Use this for venture-level seeded or derived capacity.

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

## Capacity Signal

Use this for Command Center and Studio Analyst summaries.

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

These models are directional. Implementation should name and place types in the
repo's existing `src/types/*` pattern.

---

# Allocation Rules

Capacity does not need perfect math.

It should be believable enough to support product judgment.

## Suggested Pressure Rules

```txt
0-85%      healthy
86-105%    watch
106%+      overloaded
```

These thresholds are guidance, not strict business logic.

## Decision Interpretation

Capacity pressure should be interpreted with validation confidence:

| Capacity | Gate Confidence | Product Meaning |
|---|---|---|
| high | high | consider staff-up or protect capacity |
| high | low | sunk-cost / narrow risk |
| low | high | continue efficiently |
| low | low | defer, pause, or clarify gate |

The strongest signal is not capacity alone. It is capacity relative to evidence.

---

# Capacity-To-Gate Linkage

Operator Capacity should show whether a gate justifies more work.

Examples:

```txt
Engineering is overloaded on Reson8 while retention confidence remains weak.
Recommended move: narrow before another build cycle.
```

```txt
Design is constrained across Sentra and Reson8, but Sentra has stronger
activation evidence.
Recommended move: protect Sentra activation design capacity.
```

Gate context should appear in:
- Command Center capacity panel
- validation risk panel
- Studio Analyst recommendations
- issue and roadmap drawers when relevant

---

# Capacity-To-Evidence Linkage

Execution Evidence should expose capacity impact.

Issues and roadmap bets can consume:
- low effort
- medium effort
- high effort

They can affect:
- one function
- multiple functions
- a capacity bottleneck

Important rule:

> Capacity-cost work is not automatically bad. It becomes risky when it consumes
> scarce capacity without moving validation confidence.

---

# Surface Requirements

## Studio Command Center

The Command Center should include an Operator Capacity panel.

It should show:
- overloaded functions
- affected ventures
- contention reason
- downstream impact
- recommended studio move

Example:

```txt
Design capacity: 118%
Sentra activation work competes with Reson8 onboarding tests.
Move: protect Sentra capacity; narrow Reson8 scope.
```

## Issues

Issue drawer should show operator impact when present:
- function
- effort
- capacity note
- whether the issue is evidence-moving or capacity-cost only

Issue cards may show a small capacity marker only when the impact is high or
contentious.

## Roadmap

Roadmap drawer should show operator impact for bets:
- functions required
- capacity pressure
- linked issues driving load
- expected confidence or decision impact

Roadmap cards may show a small capacity indicator when the bet is high-effort or
constrained.

## Studio Analyst

Analyst recommendations should cite capacity when it affects the decision.

Analyst should explain:
- what function is constrained
- which ventures are competing
- whether evidence justifies the capacity
- what move reduces waste

---

# Empty States

## No Capacity Data

```txt
No capacity pressure modeled yet.
Add work or allocation context when operator effort starts affecting studio decisions.
```

## New Custom Venture

```txt
No operator capacity linked to this venture yet.
Capacity signals will appear once work is assigned or evidence requires shared support.
```

## Clean Platform

```txt
No operator load to review.
Create a venture and add work before capacity pressure appears.
```

Empty states should avoid fake overload or fake utilization.

---

# Seeded Demo Requirements

Seeded data should make capacity tradeoffs obvious.

## Sentra

Suggested capacity story:
- design or product capacity is constrained
- activation work has higher validation confidence
- recommendation is continue or staff-up with capacity protection

Demo role:

> Shows that high-confidence work may deserve protected capacity.

## Reson8

Suggested capacity story:
- engineering and product work remain active
- validation confidence is weak
- recommendation is narrow or pause before another build cycle

Demo role:

> Shows the cost of low-evidence execution.

## Internal Ops

Suggested capacity story:
- stable internal work creates operating leverage
- fewer urgent capacity demands
- may free PM or partner time for higher-pressure ventures

Demo role:

> Shows capacity release and studio leverage.

---

# UX Requirements

## Must Feel

- lightweight
- calm
- decision-oriented
- comparative
- studio-native
- evidence-aware

## Must Avoid

- scheduling software
- staff management tools
- utilization dashboards
- spreadsheet-like workload grids
- time tracking
- approval flows
- enterprise resource planning

## Visual Guidance

Use:
- compact function badges
- small load bars
- restrained percent labels
- venture-linked contention notes
- concise downstream impact copy

Avoid:
- large heatmaps
- calendar views
- detailed timesheets
- resource tables with many columns
- exact capacity math theatrics

---

# Copy Guidelines

Prefer:
- Capacity pressure
- Operator load
- Shared capacity
- Function constrained
- Capacity tradeoff
- Protect capacity
- Reallocate attention
- Execution consuming capacity
- Capacity justified by evidence

Avoid:
- utilization management
- resource scheduling
- staffing plan
- billable hours
- approval queue
- team workload administration
- timesheets

---

# Anti-Patterns

DO NOT:
- add calendars
- add timesheets
- add staffing workflows
- add utilization reports
- add resource approval flows
- add bill-back or finance logic
- add cap-table implications
- require operator setup before using the app
- create a separate capacity management product
- show fake precision that implies real scheduling math

---

# Synchronization Rules

Capacity signals should affect:
- Command Center top decision
- portfolio attention queue ordering
- validation risk interpretation
- execution evidence interpretation
- Studio Analyst recommendations

Issue changes can affect capacity when:
- high-effort work is created
- work moves into active status
- capacity-cost work continues without evidence movement
- blocked work ties up an operator function

Roadmap changes can affect capacity when:
- high-effort bets move to Now
- bets expand scope
- bets connect to weak gates
- linked issues create function contention

Prefer derived calculations over fragile circular store updates.

---

# Verification

For implementation work, verify:
- Command Center shows capacity pressure when seeded data warrants it
- Sentra shows capacity protection or staff-up logic
- Reson8 shows low-evidence capacity-cost risk
- Internal Ops shows stable or freeing capacity
- issue drawer can show operator impact when present
- roadmap drawer can show operator impact when present
- Studio Analyst cites capacity tradeoffs when recommending a move
- start-clean state does not invent fake capacity
- custom ventures can exist without capacity setup

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

Operator Capacity succeeds when a reviewer understands:

> Foundary shows when scarce studio talent is being spent on the wrong venture
> or the wrong kind of work.

It fails if the reviewer thinks:

> This is a resource management dashboard.

The desired product feeling is:

> This studio can see where attention and specialist time should be protected,
> reallocated, or withheld.
