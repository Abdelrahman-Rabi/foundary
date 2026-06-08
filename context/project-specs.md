# Project Specifications - Foundary

## Product Summary

Foundary is a Linear-inspired studio command center for venture builders managing multiple ventures at the same time.

Foundary helps venture studios decide which ventures to continue, narrow, pause, stop, staff up, or defer based on evidence, validation confidence, and shared team capacity.

The system is intentionally optimized for:

- lean venture studios
- async operating reviews
- rapid validation cycles
- portfolio attention decisions
- shared team capacity
- evidence-backed decisions
- venture-aware execution workflows
- compact, calm, fast, Linear-inspired UX

The application should feel:

- calm
- fast
- focused
- strategically intelligent
- decision-ready
- studio-native
- easy to understand without a long walkthrough

---

# Current Product Clarity Requirement

The current implementation focus is not to add more product areas.

The current focus is to make the existing product clearer, easier to understand, and easier to demo.

Within 30 seconds, a first-time reviewer should understand:

- which venture needs attention
- why it needs attention
- what studio move is recommended
- what evidence supports that move
- what capacity tradeoff is involved

Primary UI promise:

> Decide where your studio should focus next.

Strategic product promise:

> Foundary helps venture studios prevent wasted execution.

---

# Global Decision Pattern

Every major surface should support the same compact decision pattern:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

This pattern should be visible through page hierarchy, cards, drawers, labels, source links, or actions.

Do not add onboarding tours, coach marks, walkthroughs, or heavy explanatory overlays to solve comprehension. The product should explain itself through the work.

---

# Product Scope

## Included in Current Product Direction

Core areas:

- venture switching
- local-first venture creation
- Command Center
- Evidence screen with list and board views
- Bets / Validation Initiatives screen
- Studio Analyst screen
- validation checkpoint visibility
- execution evidence linkage
- team capacity signals
- mocked Studio Analyst recommendations
- drag and drop workflows
- desktop-first responsive UI
- global app shell
- contextual drawers
- venture-aware metrics
- local-first workspace persistence
- reset / export / import workspace utilities

Strategic product layers:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

User-facing translation:

```txt
What should we do?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

---

## Explicitly Excluded

Do not implement:

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
- settings-heavy pages
- billing
- multi-user collaboration
- real multi-tenant security
- real scheduling optimization
- real finance, bill-back, LP reporting, or cap-table workflows
- onboarding tours
- coach marks
- chatbot-first AI
- heavy capacity planning workflows
- complex gate configuration systems

The goal is believable studio operating intelligence, not production infrastructure completeness.

---

# Application Architecture

## Application Structure

The existing app routes may remain while their product meaning evolves:

```txt
App Shell
  - Sidebar
  - Venture Switcher
  - Main Content
  - Studio Analyst / Intelligence Panel when needed

Pages
  - Dashboard / Command Center
  - Issues / Evidence
  - Roadmap / Bets
  - Assistant / Studio Analyst
```

Route renaming can happen gradually. Implementation should prioritize product behavior, hierarchy, and visible clarity over cosmetic route churn.

---

# Core Routes

## Command Center

```txt
/dashboard
```

Product meaning:

- top recommended studio move
- why the move matters now
- ventures needing attention
- validation risk
- capacity pressure
- evidence behind the decision
- Studio Analyst reasoning

The route may still be `/dashboard`, but the screen should no longer read as a generic metrics dashboard.

## Evidence

```txt
/issues
```

Product meaning:

- execution evidence workflow
- issue management with evidence meaning
- delivery coordination
- decision and bet linkage
- capacity impact visibility

Issues should still be fast and operational, but the screen must explain how work supports, challenges, de-risks, unlocks, or consumes capacity against a studio decision.

## Bets / Validation Initiatives

```txt
/roadmap
```

Product meaning:

- venture bets
- validation initiatives
- strategic planning
- confidence tracking
- missing proof visibility
- evidence-linked roadmap work

Roadmap items should represent bets or validation initiatives, not generic planning cards.

## Studio Analyst

```txt
/assistant
```

Product meaning:

- embedded studio intelligence
- source-linked recommendations
- evidence analysis
- capacity contention analysis
- sunk-cost risk detection
- recommended studio moves

The route may still be `/assistant`, but the product behavior should not be chatbot-like.

---

# Venture System

## Seeded Ventures

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
- current validation checkpoint
- current studio move
- evidence items
- bets / validation initiatives
- team capacity allocation
- metrics
- Studio Analyst insights
- health and confidence signals

## Seeded Demo Story

The seeded data should make the portfolio story obvious:

### Sentra

Story:

> Promising growth opportunity with capacity strain.

Should show:

- stronger validation confidence
- activation or growth upside
- meaningful design or engineering bottleneck
- recommended move may be Continue, Staff up, or Protect capacity

### Reson8

Story:

> Weak validation with active execution and sunk-cost risk.

Should show:

- weak retention evidence
- active product or engineering work
- low or declining confidence
- high decision pressure
- recommended move should be Narrow or Pause

### Internal Ops

Story:

> Stable studio leverage with contained scope and freed capacity.

Should show:

- stable confidence
- low risk
- contained work
- reduced capacity pressure
- recommended move should be Continue or Defer expansion

## Custom Local Ventures

Users may add custom local ventures. Custom ventures should behave as first-class venture contexts across the shell, Command Center, Evidence, Bets, Studio Analyst, and local workspace persistence.

Custom venture creation remains local-first. It does not imply backend accounts, team management, organization settings, permissions, billing, CRM records, or legal entity management.

Minimum custom venture input:

```ts
type CreateVentureInput = {
  name: string
  description: string
  stage: "idea" | "validation" | "mvp" | "growth"
}
```

Generated venture defaults should remain believable and restrained:

- generated id, slug, icon, and color
- phase-aware health
- stable initial confidence
- no fake risk when no evidence exists
- zero evidence and bet counts until work exists

---

# Studio Decision Model

## Studio Move Values

```ts
type StudioMove =
  | "continue"
  | "narrow"
  | "pause"
  | "stop"
  | "staff-up"
  | "defer"
  | "partner-review"
```

Use this language across Command Center, Bets, Evidence, and Studio Analyst.

## Move Meanings

### Continue

Use when momentum is healthy, evidence is acceptable, and capacity cost is justified.

### Narrow

Use when the opportunity may still be valuable, but scope must be reduced until proof improves.

### Pause

Use when more execution would be premature until missing proof is resolved.

### Stop

Use when confidence has collapsed or the initiative should no longer consume studio capacity.

### Staff Up

Use when confidence is strong but the venture is constrained by scarce team capacity.

### Defer

Use when the idea is valid but not the highest-leverage use of studio capacity now.

### Partner Review

Use when the decision requires leadership judgment, tradeoff discussion, or portfolio-level intervention.

---

# Command Center Specifications

## Purpose

The Command Center is the primary portfolio decision surface.

It should be:

- decision-first
- portfolio-aware
- executive-readable
- operationally informative
- strategically calm
- understandable within 30 seconds

It should answer:

```txt
Which venture needs attention?
Why?
What move should the studio make?
What evidence supports it?
What capacity is constrained?
```

It should not feel:

- cluttered
- analytical-heavy
- enterprise-like
- passively report-driven
- KPI-first

---

## First Viewport Requirement

The first viewport must make the top recommended move obvious.

Recommended hero pattern:

```txt
Recommended Move: Narrow Reson8

Why now:
Reson8 is consuming product and engineering capacity, but retention evidence is still weak.

Studio decision:
Pause broad buildout. Continue only the retained-creator threshold experiment.

Supporting signals:
- Validation confidence: 23%
- Capacity pressure: High
- Missing proof: Retained creator signal

Primary action:
Inspect evidence
```

The exact seeded numbers may change, but the structure should remain decision-led.

---

## Required Command Center Components

### Recommended Move Hero

Display the highest-signal portfolio decision.

Should include:

- venture name
- recommended move
- concise reason
- linked validation checkpoint or bet
- linked evidence items
- capacity implication
- primary action

### Ventures Needing Attention

Rank ventures by decision pressure.

Each row/card should show:

- venture
- lifecycle phase
- current checkpoint
- confidence
- capacity pressure
- recommended move
- attention reason

### Validation Checkpoints / Risk Panel

Surface:

- weak checkpoints
- missing proof
- stale assumptions
- confidence drops
- execution activity with low evidence

### Team Capacity Panel

Surface:

- overloaded functions
- venture-to-venture contention
- allocation pressure
- likely downstream impact

This is lightweight capacity intelligence, not a scheduling system.

### Evidence Behind This Decision

Surface:

- evidence items linked to the top decision
- bets linked to assumptions
- work that proves or disproves progress
- work consuming capacity without enough proof

### Analyst Reasoning Block

Surface:

- concise recommendation
- why it matters
- supporting evidence
- suggested next move

---

# Validation Checkpoint Specifications

## Purpose

Validation checkpoints prevent the sunk-cost trap where teams keep building because work is already in motion.

They should make it clear whether a venture has enough evidence to justify more team time, engineering work, or capital.

## Lifecycle Phases

```ts
type VenturePhase = "explore" | "validate" | "build" | "scale"
```

Phase meaning:

- `explore`: problem discovery, market sizing, early founder/customer signal
- `validate`: demand, retention, willingness to pay, ICP clarity
- `build`: MVP scope, launch readiness, technical execution risk
- `scale`: GTM repeatability, revenue signal, operational scaling

## Validation Checkpoint Model Direction

```ts
type ValidationCheckpoint = {
  id: string
  ventureId: string
  phase: VenturePhase
  name: string
  assumption: string
  requiredProof: string[]
  existingProof: string[]
  missingProof: string[]
  linkedEvidenceIds: string[]
  linkedBetIds: string[]
  confidence: number
  status: "healthy" | "watch" | "at-risk" | "blocked" | "passed" | "failed"
  recommendedMove: StudioMove
  decisionReason: string
  updatedAt: string
}
```

This model may be implemented incrementally. Early versions can derive checkpoint signals from seeded data, evidence items, bets, and mock intelligence.

## Checkpoint Behavior

Each checkpoint should clarify:

- what assumption is being tested
- what proof is required
- what proof exists
- what proof is missing
- what work is linked
- what confidence level exists
- what decision pressure exists
- what should happen next

Checkpoint confidence should affect:

- Command Center attention ranking
- bet confidence
- Studio Analyst recommendations
- evidence and bet drawer context
- seeded demo story

---

# Evidence Specifications

## Purpose

The Evidence screen is the execution work layer.

It should remain fast and Linear-inspired while making every work item explain why it exists.

Evidence items answer:

> What work is proving, disproving, unlocking, de-risking, challenging, or consuming capacity against a studio decision?

---

## Evidence Item Data Model Direction

```ts
type EvidenceRole =
  | "proving"
  | "disproving"
  | "unlocking"
  | "de-risking"
  | "challenging"
  | "capacity-cost"

type EvidenceItem = {
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

  status:
    | "backlog"
    | "planned"
    | "in-progress"
    | "in-review"
    | "done"
    | "stopped"

  owner: string
  dueDate?: string
  tags: string[]

  supports: string
  evidenceRole: EvidenceRole
  decisionImpact?: StudioMove
  priority?: "urgent" | "high" | "medium" | "low"
  betId?: string
  checkpointId?: string
  capacityImpact?: CapacityImpact

  createdAt: string
  updatedAt: string
}
```

The existing issue model can evolve toward this incrementally. Avoid breaking current interactions unless the current task explicitly scopes it.

---

## Evidence List View

Required columns:

```txt
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

The old issue-tracking columns may remain in the data model, but visible hierarchy should move toward evidence meaning.

List view must support:

- filtering
- searching
- sorting
- compact rows
- inline metadata visibility
- supports field
- evidence role indicators
- decision impact when useful

The list should feel:

- scannable
- dense but breathable
- operationally efficient
- connected to venture decisions

## Evidence Board View

Kanban-style workflow.

Columns:

- Backlog
- Planned
- In Progress
- In Review
- Done
- Stopped

Board cards should show:

- title
- venture indicator
- supports field
- evidence role
- decision impact
- owner
- status / priority where useful

Example card metadata:

```txt
Supports: Creator Retention Signal
Role: Challenging
Decision impact: May force Narrow
```

Drag and drop must remain stable, smooth, and fast.

## Evidence Drawer

Should open from:

- list rows
- board cards
- Command Center evidence links
- Studio Analyst recommendations
- Bet source links

The drawer should answer:

- What decision does this support?
- What is this work trying to prove, disprove, unblock, de-risk, challenge, or reveal?
- Which bet or checkpoint is connected?
- What is the capacity impact?
- What is the recommended next action?

Use drawer pattern instead of page navigation.

---

# Bets / Validation Initiatives Specifications

## Purpose

Bets represent the strategic validation initiatives the studio is testing before committing more time, talent, or capital.

Bets should feel more strategic than Evidence and more decision-oriented than a normal roadmap.

Every bet should answer:

```txt
What are we testing?
How confident are we?
What proof is missing?
What should the studio do next?
```

---

## Bet Data Model Direction

```ts
type BetTimeframe = "now" | "next" | "later"

type BetStatus = "planned" | "active" | "at-risk" | "completed" | "stopped"

type VentureBet = {
  id: string
  title: string
  ventureId: string
  timeframe: BetTimeframe
  status: BetStatus

  testingStatement: string
  targetOutcome: string
  confidence: number
  confidenceTrend?: "improving" | "stable" | "declining"
  progress: number

  recommendedMove: StudioMove
  missingProof: string
  evidenceIds: string[]
  capacityImpact?: CapacityImpact
  checkpointId?: string

  owner?: string
  analystNote?: string
  createdAt: string
  updatedAt: string
}
```

The existing roadmap model can evolve toward this incrementally. The UI can still use the `/roadmap` route and Now / Next / Later board.

---

## Bets Layout

Columns:

- Now
- Next
- Later

Column helper copy should clarify decision maturity:

- Now: active bets requiring a decision soon
- Next: validated or emerging bets ready for capacity consideration
- Later: lower-commitment opportunities to watch

## Bet Card Requirements

Each card should include:

- title
- venture
- testing statement or target outcome
- confidence
- progress
- recommended move
- missing proof
- evidence count
- capacity impact when relevant

Example:

```txt
Creator Retention Signal Validation

Testing:
Define retained-creator threshold for continue / narrow / stop decision.

Confidence: 23%
Progress: 0%

Recommended move: Narrow
Missing proof: weekly retained creator signal
Capacity impact: Product + Engineering

4 evidence items - 0 done
```

Important rule:

> Execution progress is not the same as validation confidence.

When progress and confidence diverge, expose that with concise copy such as:

```txt
Execution is moving, but validation confidence remains weak.
```

## Bets Filters

Add or support:

- All status
- All confidence
- All moves
- Venture

Move filter values:

- Continue
- Narrow
- Pause
- Stop
- Staff up
- Defer
- Partner review

## Bet Drawer

The drawer should show:

- title
- venture
- timeframe
- recommended move
- testing statement
- target outcome
- confidence and trend
- progress
- missing proof
- linked evidence items
- capacity impact
- analyst reasoning

---

# Team Capacity Specifications

## Purpose

Team capacity is a lightweight shared-capacity layer.

It should show when scarce studio talent is being spent on high-confidence work or trapped in low-evidence execution.

This is not scheduling software.

## Capacity Functions

```ts
type TeamFunction =
  | "product"
  | "design"
  | "engineering"
  | "gtm"
  | "partner"
```

## Capacity Impact Model Direction

```ts
type CapacityImpact = {
  functions: TeamFunction[]
  level: "low" | "medium" | "high"
  note: string
}
```

Surface capacity in:

- Command Center
- Evidence cards / drawers where relevant
- Bet cards / drawers where relevant
- Studio Analyst reasoning

Avoid utilization bureaucracy, schedules, timesheets, and approval flows.

---

# Studio Analyst Specifications

## Purpose

Studio Analyst is the embedded operational intelligence layer.

It should feel like a source-linked decision support layer, not a chatbot or generic insight feed.

---

## Decision-First Page Requirement

The Studio Analyst page should open with one dominant recommendation before the feed.

Required hero structure:

```txt
Recommended Move

Pause Reson8 build and narrow validation focus.

Why:
Retention evidence is weak while engineering and design capacity are being consumed.

Next:
Stop broad build work. Continue only retained-creator threshold validation.

Source evidence:
3 evidence items - 1 bet - 2 capacity signals

Capacity impact:
Protects engineering capacity for Sentra activation work.

Actions:
- Inspect evidence
- Open bet
```

The exact copy may adapt to data, but the structure should remain decision-first.

---

## Analyst Behaviors

Supported mocked behaviors:

- recommend studio moves
- summarize missing proof
- detect delivery risk
- detect sunk-cost risk
- identify capacity contention
- explain validation confidence
- connect evidence items to bets
- recommend continue / narrow / pause / stop / staff up / defer / partner review

## Analyst Signal Model Direction

```ts
type AnalystSignal = {
  id: string
  ventureId?: string
  title: string
  severity: "low" | "medium" | "high"
  recommendedMove: StudioMove
  reason: string
  evidenceIds: string[]
  betIds: string[]
  capacityImpact?: CapacityImpact
  confidence: number
  createdAt: string
}
```

## Analyst UI Rules

Avoid:

- chat bubbles
- assistant avatars
- fake typing
- fake streaming
- generic "AI says" framing
- long conversational responses
- decorative AI visuals

Prefer:

- structured analyst blocks
- recommended moves
- source-linked reasoning
- evidence-backed explanation
- capacity tradeoff explanation

---

# Cross-Screen Narrative Specifications

## Primary Demo Flow

The app should support this narrative:

```txt
1. Command Center
   Foundary recommends narrowing Reson8.

2. Evidence
   Shows the work and signals behind that recommendation.

3. Bets
   Shows the validation bet losing confidence.

4. Studio Analyst
   Explains the reasoning, capacity tradeoff, and recommended move.
```

## Required Source Links

Create or strengthen links between:

```txt
Command Center decision -> Evidence items
Evidence item -> Supported bet
Bet -> Studio Analyst reasoning
Studio Analyst signal -> Source evidence / bet
```

Preferred interaction pattern:

- source links
- filtered views
- drawers
- lightweight CTA buttons

Avoid deep detail routes and heavy modal stacks.

---

# Navigation Specifications

## Sidebar Navigation

Primary navigation:

- Command Center
- Evidence
- Bets
- Studio Analyst

Existing routes can remain:

```txt
/dashboard
/issues
/roadmap
/assistant
```

Sidebar should:

- remain persistent
- feel lightweight
- show active route clearly
- preserve spatial memory

## Venture Switcher

Requirements:

- globally accessible
- always visible
- instant switching
- low friction

Switching ventures should update:

- metrics
- evidence
- bets
- analyst context
- empty states

---

# State Management

Use Zustand for:

- venture state
- evidence / issue state
- bet / roadmap state
- UI state
- filters
- analyst context
- workspace persistence

Prefer existing stores and lightweight derived selectors before creating new complex state systems.

---

# Data Strategy

Use:

- mocked data
- local frontend stores
- deterministic seeded datasets
- browser persistence where already supported

Do not create backend APIs, databases, or production infrastructure.

Mock data should feel:

- operationally believable
- strategically coherent
- interconnected
- demo-ready

Relationships should exist between:

- ventures
- validation checkpoints
- evidence items
- bets
- capacity signals
- analyst recommendations

---

# UX Specifications

## Interaction Philosophy

Prefer:

- drawers
- inline editing
- hover actions
- keyboard-friendly workflows
- fast transitions
- filtered views
- compact source links

Avoid:

- full page reloads
- modal overload
- excessive confirmations
- deep detail routes
- wizard flows

## Motion Philosophy

Motion should be:

- subtle
- disciplined
- responsive
- premium

Use motion for:

- drawer transitions
- drag and drop interactions
- hover feedback
- loading states
- venture switching

Avoid flashy animations and excessive transitions.

## Responsive Strategy

Priority:

1. Desktop
2. Large tablet

Mobile support can remain minimal. This assignment is desktop-first operational software.

---

# Technical Stack

Required technologies:

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

1. Product clarity
2. Command Center Aha moment
3. Evidence decision linkage
4. Bets decision state
5. Studio Analyst decision-first behavior
6. Cross-screen narrative
7. Seeded demo story
8. Interaction polish

Lower priority:

- backend realism
- authentication
- permissions
- notifications
- settings
- edge-case-heavy configuration
- mobile parity

---

# Anti-Patterns

Do not:

- build Mini Jira
- create enterprise UX
- overcomplicate workflows
- create deeply nested navigation
- add unnecessary settings
- prioritize feature quantity
- simulate production backend systems
- create noisy dashboards
- implement chatbot interfaces
- add onboarding tours
- create heavy capacity planning
- add investor reporting
- create finance or cap-table workflows

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
- easy to understand
- compact and Linear-inspired

A first-time reviewer should understand:

```txt
Reson8 should be narrowed because validation is weak and capacity is being consumed.
Sentra is promising but constrained by shared capacity.
Internal Ops is stable and should not distract the studio.
```

Users should feel:

> This system helps venture studios decide where to focus next.

Not:

> This is another generic PM dashboard.
