# Feature Specification — Command Center Aha Moment

## Purpose

The Command Center is the first and most important screen in Foundary.

Its job is to create the product Aha moment immediately.

The user should understand within 30 seconds:

> Foundary helps venture studios decide where to focus next based on evidence, validation confidence, and team capacity.

The Command Center should not feel like a normal dashboard.

It should feel like:

> the studio’s weekly decision surface.

The screen should answer:

```txt
Which venture needs attention?
Why does it need attention?
What move should the studio make?
What evidence supports that move?
What capacity tradeoff is involved?
What should the user inspect next?
```

---

# Core Problem This Feature Solves

The current product direction is strategically strong, but first-time comprehension is still too delayed.

A reviewer may understand that Foundary has:

* ventures
* evidence
* bets
* analyst recommendations
* validation confidence
* capacity signals

But they may not immediately understand:

> what decision the product is helping them make.

This feature fixes that by making the Command Center open with one clear studio decision.

---

# Command Center North Star

The Command Center should feel like:

> “Here is the most important studio move this week — and why.”

It should not feel like:

> “Here are several dashboard widgets you need to interpret yourself.”

The screen must turn operational noise into a recommended studio move.

---

# Target Aha Moment

The target Aha moment is:

```txt
Foundary shows the venture studio what to continue, narrow, pause, kill, staff up, or defer before wasting more execution time.
```

The first viewport should communicate this without explanation.

---

# Screen-Level UX Goal

When the user lands on Command Center, they should immediately know:

```txt
Reson8 needs attention.
The recommended move is Narrow.
Validation confidence is weak.
Capacity is being consumed.
There is specific evidence behind the recommendation.
The next action is to inspect evidence.
```

This creates a clear product story.

---

# What This Screen Is Not

The Command Center is NOT:

* a KPI dashboard
* a reporting page
* a generic portfolio overview
* an analytics screen
* an investor reporting surface
* a project management dashboard
* a collection of unrelated widgets

Avoid building a screen that requires the user to mentally connect many panels.

---

# What This Screen Is

The Command Center IS:

* a decision overview layer
* a studio attention surface
* an evidence-backed recommendation system
* a capacity tradeoff surface
* the entry point into the demo story

It should help the user decide where to focus next.

---

# Required First Viewport Structure

The first viewport must prioritize one dominant recommendation.

Recommended structure:

```txt
Page Header
  ├── Title
  └── Subtitle

Hero Recommendation
  ├── Recommended Move
  ├── Why Now
  ├── Studio Decision
  ├── Supporting Evidence
  ├── Capacity Impact
  └── Primary Actions

Supporting Context Row
  ├── Ventures Needing Attention
  ├── Validation Confidence
  └── Team Capacity Pressure
```

The hero recommendation must visually dominate the first viewport.

Supporting panels should be useful, but subordinate.

---

# Page Header

## Title

Use:

```txt
Command Center
```

## Subtitle

Use:

```txt
Decide which ventures deserve more studio attention — and which ones are consuming capacity without enough evidence.
```

Shorter version:

```txt
Decide where the studio should focus next.
```

Do not use:

```txt
Portfolio dashboard and operational metrics.
```

---

# Hero Recommendation

## Purpose

The hero recommendation is the most important component on the page.

It should communicate:

```txt
What should the studio do next?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

This component creates the Aha moment.

---

# Hero Recommendation Content Model

Use this structure:

```ts
type HeroRecommendation = {
  id: string

  ventureId: string
  ventureName: string

  recommendedMove:
    | "continue"
    | "narrow"
    | "pause"
    | "kill"
    | "staff-up"
    | "defer"
    | "partner-review"

  headline: string

  whyNow: string

  studioDecision: string

  supportingSignals: {
    label: string
    value: string
    severity?: "low" | "medium" | "high"
  }[]

  capacityImpact: string

  sourceEvidenceIds: string[]
  sourceBetIds: string[]

  primaryAction: {
    label: string
    target: "evidence" | "bet" | "analyst"
    filter?: Record<string, string>
  }

  secondaryActions?: {
    label: string
    target: "evidence" | "bet" | "analyst"
    filter?: Record<string, string>
  }[]

  confidence: number
}
```

---

# Hero Recommendation Example

Use this as the target pattern:

```txt
Recommended Move: Narrow Reson8

Why now
Reson8 is consuming product and engineering capacity, but retention evidence is still weak.

Studio decision
Pause broad buildout. Continue only the retained-creator threshold experiment.

Supporting evidence
Validation confidence: 23%
Capacity pressure: High
Missing proof: Retained creator signal

Capacity impact
Protects product and engineering capacity for higher-confidence Sentra activation work.

Primary action
Inspect evidence
```

---

# Hero Recommendation Visual Hierarchy

The visual hierarchy should be:

```txt
1. Recommended Move
2. Venture affected
3. Why now
4. Supporting evidence
5. Capacity impact
6. Primary action
```

The user should not have to scan the entire screen to find the recommendation.

---

# Recommended Move Display

## Format

Use:

```txt
Recommended Move: Narrow Reson8
```

or:

```txt
Narrow Reson8
```

The recommended move should be visually stronger than ordinary metrics.

---

# Allowed Recommended Moves

```ts
type RecommendedMove =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"
```

---

# Recommended Move Definitions

## Continue

Use when evidence supports the current direction.

Example:

```txt
Continue Sentra
Evidence supports the current direction.
```

---

## Narrow

Use when there is some signal, but scope is too broad or capacity is being consumed without enough proof.

Example:

```txt
Narrow Reson8
Reduce scope and focus only on the strongest validation path.
```

---

## Pause

Use when confidence is weak and broad execution should stop until missing proof is resolved.

Example:

```txt
Pause Reson8
Stop broad execution until retention proof improves.
```

---

## Kill

Use when evidence contradicts the bet or continued work would waste capacity.

Example:

```txt
Kill referral expansion
Stop this bet and redirect capacity.
```

---

## Staff up

Use when validation confidence is strong but progress is constrained by limited team capacity.

Example:

```txt
Staff up Sentra
Add capacity to avoid slowing a validated opportunity.
```

---

## Defer

Use when the idea may be useful later, but capacity is better used elsewhere now.

Example:

```txt
Defer Internal Ops expansion
Keep visible, but do not spend capacity now.
```

---

## Partner review

Use when evidence is mixed, the stakes are high, or the decision requires leadership judgment.

Example:

```txt
Partner review required
Escalate for a studio-level decision.
```

---

# Hero Copy Rules

## Use Clear Decision Language

Use:

```txt
Recommended Move
Why now
Studio decision
Supporting evidence
Capacity impact
Next action
```

Avoid:

```txt
Portfolio status
AI insight
Dashboard summary
Operational metrics
Recommendation output
```

---

## Keep Copy Concise

The hero should be readable in seconds.

Avoid long paragraphs.

Each text block should be short enough to scan quickly.

Good:

```txt
Retention evidence is weak while engineering capacity is being consumed.
```

Bad:

```txt
Based on a comprehensive review of several operational signals across the venture portfolio, it appears that the current initiative may require additional validation before the studio continues broader execution activities.
```

---

# Supporting Panels

Supporting panels should explain the hero recommendation, not compete with it.

Required supporting panels:

```txt
Ventures Needing Attention
Validation Checkpoints
Team Capacity Pressure
Evidence Behind This Decision
Analyst Reasoning
Supporting Signals
```

Do not present all panels with equal visual weight.

The hero recommendation is the story.

Supporting panels are proof.

---

# 1. Ventures Needing Attention

## Purpose

Show which ventures require studio attention and why.

This panel should reinforce portfolio prioritization.

---

## Data Model

```ts
type VentureAttentionItem = {
  ventureId: string
  ventureName: string

  recommendedMove:
    | "continue"
    | "narrow"
    | "pause"
    | "kill"
    | "staff-up"
    | "defer"
    | "partner-review"

  reason: string

  validationConfidence: number

  capacityPressure:
    | "low"
    | "medium"
    | "high"

  urgency:
    | "low"
    | "medium"
    | "high"
}
```

---

## Example Items

```txt
Reson8
Move: Narrow
Reason: Weak retention evidence with active engineering capacity.
Confidence: 23%
Capacity pressure: High
```

```txt
Sentra
Move: Staff up
Reason: Stronger activation evidence, but capacity is slowing execution.
Confidence: 78%
Capacity pressure: Medium
```

```txt
Internal Ops
Move: Continue
Reason: Stable leverage work with contained scope.
Confidence: 71%
Capacity pressure: Low
```

---

## UX Rules

The panel should make the portfolio story obvious:

```txt
Reson8 needs attention.
Sentra is promising but constrained.
Internal Ops is stable.
```

Avoid making this look like a generic venture list.

---

# 2. Validation Checkpoints

## Purpose

Show the proof status behind the decision.

This panel should answer:

```txt
What proof exists?
What proof is missing?
What is blocking confidence?
```

---

## Data Model

```ts
type ValidationCheckpoint = {
  id: string

  ventureId: string
  ventureName: string

  label: string

  status:
    | "proven"
    | "missing"
    | "weak"
    | "blocked"

  confidence: number

  relatedBetId?: string
  relatedEvidenceIds: string[]

  implication: string
}
```

---

## Example

```txt
Retained creator signal
Status: Missing
Confidence: 23%
Implication: Broad Reson8 buildout should be narrowed.
```

```txt
Activation analytics recovery
Status: Proven
Confidence: 78%
Implication: Sentra can continue, but capacity is constrained.
```

---

## UX Rules

Validation Checkpoints should not feel like analytics.

They should feel like decision proof.

Use labels like:

```txt
Proof status
Missing proof
Decision implication
```

Avoid labels like:

```txt
Metric
KPI
Report
Tracking
```

---

# 3. Team Capacity Pressure

## Purpose

Show whether the recommended move is caused by capacity constraints.

Foundary should make capacity tradeoffs visible because venture studios operate with shared teams.

---

## Data Model

```ts
type CapacityPressure = {
  team:
    | "Product"
    | "Engineering"
    | "Design"
    | "Growth"
    | "Research"

  pressure:
    | "low"
    | "medium"
    | "high"

  allocatedVentures: {
    ventureId: string
    ventureName: string
    load: number
  }[]

  implication: string
}
```

---

## Example

```txt
Engineering capacity
Pressure: High

Reson8: 42%
Sentra: 38%
Internal Ops: 20%

Implication
Narrowing Reson8 protects capacity for Sentra activation work.
```

---

## UX Rules

Capacity should be shown as a tradeoff, not a resource management system.

Do not create heavy resource planning.

Use simple, believable capacity signals.

---

# 4. Evidence Behind This Decision

## Purpose

Show the evidence items that caused the hero recommendation.

This panel should answer:

```txt
What source evidence supports this move?
```

---

## Data Model

```ts
type DecisionEvidencePreview = {
  id: string
  title: string

  ventureId: string
  ventureName: string

  supports: string

  evidenceRole:
    | "proving"
    | "disproving"
    | "unlocking"
    | "de-risking"
    | "challenging"
    | "capacity-cost"

  decisionImpact:
    | "low"
    | "medium"
    | "high"

  status:
    | "backlog"
    | "planned"
    | "in-progress"
    | "in-review"
    | "done"
    | "killed"

  linkedBetId?: string
}
```

---

## Example

```txt
Creator retention threshold research
Supports: Creator Retention Signal
Role: Challenging
Decision impact: High
Status: In progress
```

```txt
Weekly creator cohort analysis
Supports: Creator Retention Signal
Role: Proving
Decision impact: High
Status: Planned
```

---

## CTA Labels

Use:

```txt
Inspect evidence
View source
Open evidence
```

Avoid:

```txt
Open issue
View ticket
Task details
```

---

# 5. Analyst Reasoning

## Purpose

Provide structured explanation for the recommended move.

This should feel like embedded intelligence, not chatbot output.

---

## Data Model

```ts
type AnalystReasoning = {
  recommendationId: string

  reasoning: string

  sourceSummary: string

  confidence: number

  nextAction: string

  sourceEvidenceIds: string[]
  sourceBetIds: string[]
}
```

---

## Example

```txt
Reasoning
Reson8 has active build work, but the retained creator signal remains unresolved. Continuing broad execution risks consuming engineering capacity before the core retention proof is clear.

Source summary
3 evidence items · 1 bet · 2 capacity signals

Next action
Review creator retention evidence before continuing build scope.

Confidence
82%
```

---

## UX Rules

Do not frame this as:

```txt
AI says
The assistant thinks
Ask AI
```

Frame it as:

```txt
Analyst reasoning
Source evidence
Confidence
Next action
```

---

# 6. Supporting Signals

## Purpose

Show compact secondary signals that reinforce the hero decision.

These should not dominate.

---

## Example Signals

```txt
Validation confidence down 12%
Engineering capacity pressure high
4 evidence items linked to Reson8 retention
2 bets losing confidence
Sentra activation work waiting on capacity
```

---

## UX Rules

Supporting signals should be compact.

Use them to strengthen the narrative, not create noise.

---

# First Viewport Wireframe

Recommended layout:

```txt
┌──────────────────────────────────────────────────────────────┐
│ Command Center                                               │
│ Decide where the studio should focus next.                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Recommended Move: Narrow Reson8                         │ │
│ │                                                          │ │
│ │ Why now                                                 │ │
│ │ Reson8 is consuming product and engineering capacity,   │ │
│ │ but retention evidence is still weak.                   │ │
│ │                                                          │ │
│ │ Studio decision                                         │ │
│ │ Pause broad buildout. Continue only retained-creator    │ │
│ │ threshold validation.                                   │ │
│ │                                                          │ │
│ │ Supporting evidence                                     │ │
│ │ Confidence: 23% · Capacity: High · Missing proof        │ │
│ │                                                          │ │
│ │ Capacity impact                                         │ │
│ │ Protects engineering capacity for Sentra activation.    │ │
│ │                                                          │ │
│ │ [Inspect evidence] [Open bet]                           │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────┐ ┌──────────────────┐ ┌───────────────┐ │
│ │ Ventures Needing │ │ Validation       │ │ Team Capacity │ │
│ │ Attention        │ │ Checkpoints      │ │ Pressure      │ │
│ └──────────────────┘ └──────────────────┘ └───────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# Full Page Structure

Below the first viewport, show the supporting narrative.

Recommended order:

```txt
1. Hero Recommendation
2. Ventures Needing Attention
3. Evidence Behind This Decision
4. Validation Checkpoints
5. Team Capacity Pressure
6. Analyst Reasoning
7. Supporting Signals
```

Alternative if space is limited:

```txt
1. Hero Recommendation
2. Ventures Needing Attention + Team Capacity Pressure
3. Evidence Behind This Decision + Validation Checkpoints
4. Analyst Reasoning
```

---

# Interaction Requirements

## Primary Action: Inspect Evidence

Clicking “Inspect evidence” should route to Evidence with relevant filters applied.

Expected behavior:

```txt
Command Center decision → Evidence screen filtered to Reson8 + relevant supporting evidence
```

Implementation options:

```ts
navigate("/evidence?venture=reson8&supports=creator-retention-signal")
```

or use app state:

```ts
setActiveRoute("evidence")
setEvidenceFilters({
  ventureId: "reson8",
  supports: "creator-retention-signal"
})
```

---

## Secondary Action: Open Bet

Clicking “Open bet” should open the relevant bet or navigate to the Bets screen with context.

Expected behavior:

```txt
Command Center decision → Bet drawer or Bets screen filtered to Reson8 retention bet
```

Preferred behavior:

* open the Bet drawer if drawer system exists
* otherwise navigate to Bets with filter context

---

## Supporting Action: Review Reasoning

Clicking “Review reasoning” should open Studio Analyst with the matching recommendation highlighted.

Expected behavior:

```txt
Command Center decision → Studio Analyst recommendation
```

---

# State Synchronization Requirements

Command Center data should update when:

* active venture changes
* evidence status changes
* bet confidence changes
* recommended move changes
* capacity pressure changes

The Command Center should feel connected to the rest of the product.

Do not make it feel like a static dashboard.

---

# Suggested Store Shape

```ts
type CommandCenterState = {
  heroRecommendation: HeroRecommendation

  ventureAttention: VentureAttentionItem[]

  validationCheckpoints: ValidationCheckpoint[]

  capacityPressure: CapacityPressure[]

  decisionEvidence: DecisionEvidencePreview[]

  analystReasoning: AnalystReasoning[]

  supportingSignals: SupportingSignal[]
}
```

---

# Derived Data Rules

## Hero Recommendation Selection

The hero recommendation should be selected by:

```txt
highest urgency
+ weakest validation confidence
+ highest capacity pressure
+ active evidence or bet dependency
```

For the seeded demo, Reson8 should usually be the hero.

---

## Validation Confidence Interpretation

Use:

```txt
80–100: Strong
60–79: Moderate
40–59: Weak
0–39: Critical
```

For Reson8:

```txt
Validation confidence: 23%
```

This should clearly support Narrow or Pause.

---

## Capacity Pressure Interpretation

Use:

```txt
Low
Medium
High
```

High capacity pressure should help justify Narrow, Pause, or Staff up depending on confidence.

---

# Recommended Seeded Story

The Command Center should make the seeded story obvious.

## Reson8

Story:

```txt
Validation uncertainty with active execution and sunk-cost risk.
```

State:

```txt
Recommended move: Narrow or Pause
Validation confidence: Low
Capacity pressure: High
Missing proof: Retained creator signal
```

## Sentra

Story:

```txt
High-confidence growth opportunity with capacity strain.
```

State:

```txt
Recommended move: Staff up or Continue
Validation confidence: High
Capacity pressure: Medium
Missing proof: Activation bottleneck recovery
```

## Internal Ops

Story:

```txt
Stable studio leverage with contained scope.
```

State:

```txt
Recommended move: Continue or Defer expansion
Validation confidence: Moderate / Strong
Capacity pressure: Low
Missing proof: None urgent
```

---

# Visual Design Rules

The Command Center should feel:

* decisive
* compact
* calm
* premium
* studio-native
* evidence-backed
* Linear-inspired

Avoid:

* KPI-first dashboard layout
* enterprise analytics density
* large decorative cards
* colorful BI charts
* marketing hero sections
* onboarding panels
* coach marks
* tutorial overlays

---

# Density Rules

The screen should remain compact.

Use:

* short headings
* concise evidence rows
* subtle badges
* compact metadata
* one clear primary CTA
* limited secondary CTAs

Avoid:

* huge metric tiles
* long explanations
* multiple competing hero cards
* decorative visuals
* too many charts

---

# Motion Rules

Motion should support clarity.

Use motion for:

* subtle hero card entrance
* panel hover states
* drawer open/close
* filtered navigation transition
* refresh state after venture change

Avoid:

* flashy transitions
* animated charts everywhere
* playful movement
* fake AI typing

---

# Empty States

## No Urgent Decision

Use:

```txt
No urgent studio decisions detected.
```

Supporting copy:

```txt
All active ventures have enough evidence for their current level of capacity.
```

CTA:

```txt
Review bets
```

---

## No Evidence Behind Decision

Use:

```txt
No source evidence linked yet.
```

Supporting copy:

```txt
Add evidence to explain why this move is recommended.
```

CTA:

```txt
Add evidence
```

---

## No Capacity Pressure

Use:

```txt
No capacity pressure detected.
```

Supporting copy:

```txt
Current team load does not require a studio-level tradeoff.
```

---

# Loading States

Use skeletons rather than spinners.

Recommended loading labels if needed:

```txt
Refreshing studio signals...
Updating recommendation...
Loading source evidence...
```

Avoid:

```txt
AI is thinking...
Crunching magic...
Generating dashboard...
```

---

# Error States

Use calm operational language.

Examples:

```txt
Could not refresh the recommended move.
```

```txt
Could not load source evidence.
```

```txt
Could not open the connected bet.
```

Avoid:

```txt
Oops!
Something went wrong!
AI failed!
```

---

# Component Recommendations

Suggested components:

```txt
CommandCenterPage
CommandCenterHeader
HeroRecommendationCard
RecommendedMoveBadge
SupportingSignalList
VenturesNeedingAttention
VentureAttentionCard
ValidationCheckpointCard
TeamCapacityPressure
EvidenceBehindDecision
DecisionEvidenceRow
AnalystReasoningCard
CommandCenterActions
```

---

# Component Responsibilities

## CommandCenterPage

Responsible for:

* page composition
* data selection
* route-level layout
* connecting hero recommendation to supporting panels

---

## HeroRecommendationCard

Responsible for:

* showing the dominant decision
* creating the Aha moment
* explaining why now
* showing capacity impact
* exposing primary actions

---

## VenturesNeedingAttention

Responsible for:

* showing portfolio comparison
* making Reson8 / Sentra / Internal Ops story clear
* showing recommended move per venture

---

## ValidationCheckpointCard

Responsible for:

* showing proof status
* linking proof to bets and evidence
* exposing missing proof

---

## TeamCapacityPressure

Responsible for:

* showing shared capacity pressure
* explaining tradeoffs without becoming a resource planner

---

## EvidenceBehindDecision

Responsible for:

* showing source evidence
* linking to filtered Evidence screen
* making the recommendation feel grounded

---

## AnalystReasoningCard

Responsible for:

* explaining recommendation logic
* showing confidence
* linking to Studio Analyst

---

# Implementation Guidance

When implementing this feature:

1. Start with copy and hierarchy before adding new data.
2. Make the hero recommendation visually dominant.
3. Keep supporting panels subordinate.
4. Do not add onboarding tours.
5. Do not add a new dashboard route.
6. Do not add heavy charts.
7. Do not introduce resource planning.
8. Keep CTAs simple and source-linked.
9. Preserve the compact Linear-inspired feel.
10. Make the Reson8 story obvious from the first viewport.

---

# Anti-Patterns

Do NOT:

* build a generic KPI dashboard
* make every panel equal priority
* hide the recommended move below metrics
* lead with charts instead of decisions
* use “AI says” language
* add chatbot UI
* add onboarding walkthroughs
* add coach marks
* add investor reporting concepts
* add financial forecasting
* add capacity planning complexity
* create a marketing-style landing hero
* over-explain with long paragraphs

---

# Acceptance Criteria

This feature is complete when:

* Command Center opens with one dominant recommended move
* the first viewport clearly shows which venture needs attention
* the hero explains why the move is recommended
* supporting evidence is visible in the hero or immediately below it
* capacity impact is visible
* primary action links to filtered Evidence
* secondary action links to the connected Bet
* Analyst reasoning is visible or accessible
* Reson8 is clearly the attention-needed venture in seeded data
* Sentra appears promising but capacity constrained
* Internal Ops appears stable and contained
* the screen does not feel like a generic KPI dashboard
* no onboarding tours, coach marks, or heavy explanations are added
* the page remains compact, calm, dark-first, and Linear-inspired

---

# Final Command Center North Star

The Command Center succeeds when a first-time reviewer thinks:

> “I immediately understand what the studio should do next and why.”

Not:

> “This is a polished dashboard, but I need someone to explain it.”
