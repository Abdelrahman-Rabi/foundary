# Project Specifications - Foundary

## Product Summary

Foundary is a studio operating intelligence layer for venture studios deciding
where to spend scarce time, talent, and capital across multiple ventures.

The system is intentionally optimized for:
- lean venture studios
- async operating reviews
- portfolio attention decisions
- rapid validation cycles
- shared operator capacity
- evidence-based continue / narrow / pause / kill decisions
- venture-aware execution workflows

The application should feel:
- calm
- fast
- focused
- strategically intelligent
- decision-ready
- studio-native

---

# Product Scope

## Included in V1 / Current Product Direction

### Core Areas

- Venture switching
- Local-first venture creation
- Studio Command Center
- Validation gate visibility
- Execution evidence across issues and roadmap work
- Shared operator capacity mock data
- Studio Analyst intelligence
- Mock operational recommendations
- Drag and drop workflows
- Responsive desktop-first UI
- Global app shell
- Contextual drawers
- Venture-aware metrics
- Local-first workspace persistence
- Reset / export / import workspace utilities

### Strategic Product Layers

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

These layers should guide naming, data modeling, UI hierarchy, and demo story
decisions.

---

## Explicitly Excluded

DO NOT implement:
- authentication
- RBAC
- notifications
- comments system
- real backend
- real database
- backend database persistence
- websocket infrastructure
- real AI integrations
- activity feeds
- audit logs
- advanced permissions
- enterprise reporting
- settings pages
- billing
- multi-user collaboration
- real multi-tenant security
- real scheduling optimization
- real finance, bill-back, or cap-table workflows

The goal is:

> believable studio operating intelligence.

NOT:

> production infrastructure completeness.

---

# Application Architecture

## Application Structure

The existing app routes may remain while their product meaning evolves:

```txt
App Shell
  - Sidebar
  - Venture Switcher
  - Main Content
  - Studio Analyst / Intelligence Panel

Pages
  - Dashboard / Command Center
  - Issues / Evidence
  - Roadmap / Bets
  - Assistant / Studio Analyst
```

Route renaming can happen gradually. Implementation should prioritize product
behavior and hierarchy over cosmetic route churn.

---

# Core Routes

## Command Center

```txt
/dashboard
```

Product meaning:
- portfolio decision command center
- top studio decision
- venture attention queue
- validation risk
- capacity pressure
- execution evidence summary
- Studio Analyst recommendation

The route may still be `/dashboard`, but the screen should no longer read as a
generic metrics dashboard.

## Evidence

```txt
/issues
```

Product meaning:
- execution evidence workflow
- issue management
- delivery coordination
- assumption and validation linkage
- operator effort and impact visibility

Issues should still be fast and operational, but they must explain how work
supports or challenges venture progress.

## Roadmap / Bets

```txt
/roadmap
```

Product meaning:
- venture bets
- validation initiatives
- strategic planning
- confidence tracking
- gate-linked roadmap work

Roadmap items should represent bets or validation initiatives, not generic
planning cards.

## Studio Analyst

```txt
/assistant
```

Product meaning:
- embedded studio intelligence
- evidence analysis
- capacity contention analysis
- sunk-cost risk detection
- recommended studio moves

The route may still be `/assistant`, but the product behavior should not be
chatbot-like.

---

# Venture System

## Supported Ventures

Seeded demo ventures:

```ts
[
  "Sentra",
  "Reson8",
  "Internal Ops"
]
```

Each venture should contain:
- lifecycle phase
- current validation gate
- current studio decision
- issues
- roadmap bets / initiatives
- execution evidence
- operator allocations
- metrics
- Studio Analyst insights
- health and confidence signals

Users may add custom local ventures. Custom ventures should behave as
first-class venture contexts across the shell, command center, evidence,
roadmap, analyst surfaces, and local workspace persistence.

Custom venture creation remains local-first. It does not imply backend accounts,
team management, organization settings, permissions, billing, CRM records, or
legal entity management.

Minimum custom venture input:

```ts
type CreateVentureInput = {
  name: string
  description: string
  stage: "idea" | "validation" | "mvp" | "growth"
}
```

Future model direction:

```ts
type VenturePhase = "explore" | "validate" | "build" | "scale"

type StudioDecision =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"
```

Generated venture defaults should remain believable and restrained:
- generated id, slug, icon, and color
- phase-aware health
- stable initial confidence
- no fake risk when no evidence exists
- zero issue and roadmap counts until work exists

---

# Studio Command Center Specifications

## Purpose

The Command Center is:
- decision-first
- portfolio-aware
- executive-readable
- operationally informative
- strategically calm

It should answer:
- Which venture needs attention?
- Which gate is weak?
- Which execution work is evidence?
- Which operator capacity is constrained?
- Which studio decision should happen next?

It should NOT feel:
- cluttered
- analytical-heavy
- enterprise-like
- passively report-driven

---

## Required Command Center Components

### Top Studio Decision

Display the highest-signal portfolio decision.

Should include:
- venture name
- recommended decision
- decision reason
- linked validation gate
- linked execution evidence
- capacity implication
- primary action

Example:

```txt
Reson8 needs a narrow decision before another build cycle.
Retention evidence is below gate threshold while engineering work remains active.
```

### Portfolio Attention Queue

Rank ventures by decision pressure.

Each row/card should show:
- venture
- lifecycle phase
- current gate
- confidence
- capacity pressure
- recommended move
- attention reason

### Validation Risk Panel

Surface:
- weak gates
- missing evidence
- stale assumptions
- confidence drops
- execution activity with low evidence

### Operator Capacity Panel

Surface:
- overloaded functions
- venture-to-venture contention
- allocation pressure
- likely downstream impact

This is lightweight capacity intelligence, not a scheduling system.

### Execution Evidence Summary

Surface:
- issues linked to current gates
- roadmap bets linked to assumptions
- work that proves or disproves progress
- work consuming capacity without enough evidence

### Studio Analyst Recommendation

Surface:
- concise recommendation
- reason
- supporting evidence
- suggested next studio move

---

# Validation Gate Specifications

## Purpose

Validation gates prevent the sunk-cost trap where teams keep building because
tasks exist.

They should make it clear whether a venture has enough evidence to justify more
operator time, engineering work, or capital.

---

## Lifecycle Phases

Supported phases:

```ts
type VenturePhase = "explore" | "validate" | "build" | "scale"
```

Phase meaning:
- `explore`: problem discovery, market sizing, early founder/customer signal
- `validate`: demand, retention, willingness to pay, ICP clarity
- `build`: MVP scope, launch readiness, technical execution risk
- `scale`: GTM repeatability, revenue signal, operational scaling

---

## Gate Data Model Direction

```ts
type ValidationGate = {
  id: string
  ventureId: string
  phase: VenturePhase
  name: string
  assumption: string
  requiredEvidence: string[]
  evidenceSignalIds: string[]
  linkedIssueIds: string[]
  linkedRoadmapIds: string[]
  confidence: number
  status: "healthy" | "watch" | "at-risk" | "blocked" | "passed" | "failed"
  recommendedDecision: StudioDecision
  decisionReason: string
  updatedAt: string
}
```

This model may be implemented incrementally. Early versions can derive gate
signals from seeded data, issues, roadmap items, and mock intelligence.

---

## Gate Behavior

Each gate should clarify:
- what assumption is being tested
- what evidence is required
- what evidence exists
- what work is linked
- what confidence level exists
- what decision pressure exists
- what should happen next

Gate confidence should not be a decorative number. It should affect:
- Command Center attention ranking
- roadmap confidence
- Studio Analyst recommendations
- issue and roadmap drawer context
- seeded demo story

---

# Execution Evidence Specifications

## Purpose

The execution layer should prove or disprove venture progress.

Issues and roadmap items should no longer behave like generic delivery objects.
They should link to validation gates, assumptions, evidence signals, and
operator capacity impact.

---

# Issue Data Model Direction

```ts
type Issue = {
  id: string
  title: string
  description: string
  ventureId: string

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

  owner: string
  dueDate?: string
  tags: string[]
  roadmapId?: string

  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  evidenceRole?: "prove" | "disprove" | "unblock" | "de-risk" | "capacity-cost"
  operatorImpact?: OperatorImpact

  createdAt: string
  updatedAt: string
}
```

The existing issue model can evolve toward this incrementally.

---

# Required Issue Views

## 1. List View

Must support:
- filtering
- searching
- sorting
- compact rows
- inline metadata visibility
- gate / assumption indicators when available
- evidence role indicators when available

The list should feel:
- scannable
- dense but breathable
- operationally efficient
- connected to venture decisions

## 2. Board View

Kanban-style workflow.

Columns:
- Backlog
- Planned
- In Progress
- In Review
- Done
- Killed

Must support:
- drag and drop
- smooth transitions
- responsive interactions
- clear evidence/gate context on cards when useful

## 3. Issue Drawer

Should open from:
- list items
- board cards
- Command Center evidence links
- Studio Analyst recommendations

Contains:
- full issue details
- linked roadmap item
- linked validation gate
- assumption or evidence role
- operator impact
- Studio Analyst context
- editable metadata

Use drawer pattern instead of page navigation.

---

# Roadmap / Bets Specifications

## Purpose

The roadmap system is:

> the strategic bet and validation initiative layer.

It should feel:
- calmer
- more strategic
- less operational than Issues
- directly connected to validation confidence

---

# Roadmap Data Model Direction

```ts
type RoadmapItem = {
  id: string
  title: string
  ventureId: string

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

  linkedIssueIds: string[]
  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  betType?: "validation" | "growth" | "delivery" | "risk-reduction" | "leverage"
  operatorImpact?: OperatorImpact

  progress: number
  confidence: number

  createdAt: string
  updatedAt: string
}
```

---

# Roadmap Layout

Columns:
- Now
- Next
- Later

Each roadmap card should display:
- title
- goal
- progress
- confidence
- linked issue count
- venture indicator
- gate indicator when available
- bet type when available

---

# Roadmap Interactions

Users should be able to:
- open roadmap drawer
- view linked issues
- view linked gate context
- navigate between roadmap and issues
- understand execution confidence
- understand whether a bet is proving, disproving, or consuming capacity

---

# Operator Capacity Specifications

## Purpose

The capacity layer shows how scarce shared operators are allocated across the
studio portfolio.

It should make contention visible without becoming a full workforce planning
tool.

---

## Operator Model Direction

```ts
type OperatorFunction =
  | "product"
  | "design"
  | "engineering"
  | "gtm"
  | "partner"

type OperatorImpact = {
  function: OperatorFunction
  effort: "low" | "medium" | "high"
  capacityPercent?: number
  note: string
}

type OperatorAllocation = {
  id: string
  ventureId: string
  function: OperatorFunction
  operatorName?: string
  allocationPercent: number
  pressure: "healthy" | "watch" | "overloaded"
  impact: string
}
```

---

## Required Capacity Behaviors

Capacity surfaces should show:
- function-level load
- venture allocation
- contention between ventures
- over-capacity warnings
- downstream impact on gates or roadmap bets
- execution work that is expensive relative to evidence quality

Avoid:
- calendar scheduling
- utilization bureaucracy
- approval workflows
- enterprise resource planning density

---

# Studio Analyst Specifications

## Purpose

The Studio Analyst should feel:

> embedded operating intelligence for studio decisions.

NOT:

> chatbot UX.

---

# Analyst Behaviors

Supported mocked behaviors:
- recommend continue / narrow / pause / kill / staff-up / defer decisions
- summarize evidence gaps
- detect delivery risk
- detect sunk-cost risk
- flag weak validation gates
- flag operator contention
- connect issues and roadmap items to gates
- explain capacity-versus-confidence tradeoffs
- identify missing acceptance or success criteria

---

# Analyst Output Style

Analyst responses should feel:
- concise
- operational
- strategic
- evidence-backed
- believable
- low-noise

---

# Example Analyst Response

```txt
Recommended move: Narrow

Reason:
Reson8 has active engineering work against the onboarding loop, but retention
evidence remains below the Validate gate threshold.

Capacity impact:
Design and PM are already above healthy allocation, pulling attention from
Sentra's higher-confidence activation work.

Suggested action:
Pause broad build work and run targeted retention interviews before another
cycle.
```

---

# Analyst UI Rules

Avoid:
- chat bubbles
- playful AI styling
- assistant avatars
- conversational UI

Prefer:
- structured analysis blocks
- contextual panels
- embedded intelligence cards
- evidence links
- decision recommendations

---

# Navigation Specifications

## Sidebar Navigation

Current primary navigation may remain:
- Dashboard
- Issues
- Roadmap
- AI Assistant

Product language should gradually move toward:
- Command Center
- Evidence
- Bets
- Studio Analyst

Sidebar should:
- remain persistent
- support collapse behavior
- feel lightweight

---

# Venture Switcher

Requirements:
- globally accessible
- always visible
- instant switching
- low friction

Switching ventures should update:
- command center mode
- metrics
- validation gates
- roadmap / bets
- issues / evidence
- capacity context
- analyst context

---

# State Management

Use Zustand for:
- venture state
- issue state
- roadmap state
- UI state
- filters
- assistant / analyst context
- local-first hydration and reset state

Future domain state can be added incrementally for:
- validation gates
- evidence signals
- operator capacity
- studio decisions

Prefer derived utilities before adding global stores. Add a store only when the
state is user-editable, persisted, or shared across multiple distant surfaces.

---

# Data Strategy

## Data Source

Use:
- mocked JSON
- local frontend stores
- deterministic seeded datasets
- versioned browser localStorage for current workspace continuity

DO NOT:
- create backend APIs
- add database complexity
- simulate production infrastructure

Local-first persistence should cover:
- custom venture records
- issue records and filters
- roadmap records and filters
- venture context
- issues list / board view mode
- assistant inspected and dismissed signal state
- future gate, evidence, capacity, and decision state when user-editable

Workspace utilities should support:
- reset to seeded demo data
- start with clean local platform state
- export current workspace state
- import valid workspace state without crashing on invalid JSON

Reset should remove custom local ventures and restore the seeded demo ventures.
Export/import should round-trip custom ventures and their linked issue/roadmap
records when valid.

---

# Mock Data Requirements

Data should feel:
- operationally believable
- strategically coherent
- interconnected
- studio-native
- decision-oriented

Relationships should exist between:
- ventures
- lifecycle phases
- validation gates
- assumptions
- evidence signals
- issues
- roadmap bets
- operator allocations
- analyst insights

Seeded ventures should tell distinct studio operating stories:
- Sentra: higher-confidence growth opportunity with capacity strain
- Reson8: validation uncertainty with active execution and sunk-cost risk
- Internal Ops: stable studio leverage with contained scope and freed capacity

---

# UX Specifications

## Interaction Philosophy

Prefer:
- drawers
- inline editing
- hover actions
- keyboard-friendly workflows
- fast transitions
- compact decision cards
- evidence drill-downs

Avoid:
- full page reloads
- modal overload
- excessive confirmations
- tutorial overlays
- settings-style setup

---

# Motion Philosophy

Motion should be:
- subtle
- disciplined
- responsive
- premium

Use motion for:
- drawer transitions
- DnD interactions
- hover feedback
- loading states

Avoid:
- flashy animations
- excessive transitions

---

# Responsive Strategy

Priority:
1. Desktop
2. Large tablet

Mobile support can remain minimal.

This assignment is desktop-first.

---

# Technical Stack

## Required Technologies

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- dnd-kit
- Recharts
- Framer Motion

---

# Build Priorities

Highest implementation priority:
1. Studio Command Center quality
2. Validation gates and decision states
3. Execution evidence linkage
4. Operator capacity visibility
5. Studio Analyst behavior realism
6. Navigation and product-copy repositioning
7. Interaction polish

---

# Anti-Patterns

DO NOT:
- build Mini Jira
- create enterprise UX
- overcomplicate workflows
- create deeply nested navigation
- add unnecessary settings
- prioritize feature quantity
- simulate production backend systems
- create noisy dashboards
- implement chatbot interfaces
- make issues or roadmap feel disconnected from validation
- add full finance, cap-table, or bill-back systems
- overbuild resource planning

---

# Final UX Success Criteria

The product should feel:
- strategically intelligent
- operationally calm
- AI-native
- venture-aware
- premium
- modern
- cohesive
- decision-ready

Users should feel:

> "This system shows which venture deserves the studio's next hour, person, and
> dollar."

NOT:

> "This is another generic PM dashboard."
