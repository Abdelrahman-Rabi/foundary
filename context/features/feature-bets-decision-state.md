# Feature Specification — Bets Decision State

## Purpose

The Bets screen is the validation decision layer of Foundary.

Its job is to show:

> what the studio is testing before committing more time, talent, or capital.

Bets are not generic roadmap items.

A Bet represents a strategic venture initiative that requires evidence before the studio decides whether to:

* continue
* narrow
* pause
* kill
* staff up
* defer
* escalate for partner review

The Bets screen should make those decisions visible.

---

# Core Product Problem

The current Roadmap/Bets screen may already look polished, but it can still feel like:

> roadmap cards grouped by Now, Next, Later.

That is useful, but not enough.

Foundary’s product wedge is stronger:

> execution progress is not the same as validation confidence.

A venture studio does not only need to know:

```txt
What are we working on?
```

It needs to know:

```txt
Is this still worth spending scarce studio capacity on?
```

The Bets screen must expose that decision state clearly.

---

# Bets North Star

The Bets screen should feel like:

> “Here are the studio bets currently being tested — and what we should do with each one.”

It should not feel like:

> “Here is a roadmap board.”

Every bet card should answer:

```txt
What are we testing?
How confident are we?
What proof is missing?
What should the studio do next?
What capacity is affected?
```

---

# Target User Understanding

Within a few seconds, the user should understand:

```txt
Reson8 has a retention bet with weak confidence.
The recommended move is Narrow.
The missing proof is weekly retained creator signal.
Execution may be active, but validation confidence is still low.
Continuing broad buildout could waste product and engineering capacity.
```

That is the Aha moment for the Bets screen.

---

# What This Screen Is Not

The Bets screen is NOT:

* a generic roadmap
* a Gantt chart
* an enterprise planning board
* an epic tracker
* a feature backlog
* a release planning system
* a delivery forecast tool
* an investor reporting surface

Do not optimize it for timeline planning.

---

# What This Screen Is

The Bets screen IS:

* a validation board
* a strategic decision surface
* a confidence-aware roadmap layer
* a bridge between Evidence and Studio Analyst
* a way to see what deserves more capacity and what should stop consuming it

It connects:

```txt
Strategy
→ Evidence
→ Validation Confidence
→ Capacity Tradeoff
→ Recommended Move
```

---

# Screen-Level Copy

## Page Title

Use:

```txt
Bets
```

## Page Subtitle

Use:

```txt
Bets are the venture initiatives your studio is testing before committing more time, talent, or capital.
```

Shorter version:

```txt
Track what the studio is testing before committing more capacity.
```

Avoid:

```txt
Roadmap items grouped by Now, Next, Later.
```

---

# Primary Concept Shift

Replace roadmap language with validation-decision language.

## Label Changes

Use:

```txt
Roadmap → Bets
Roadmap Item → Bet
New Roadmap Item → Add Bet
Goal / Outcome → Testing Statement
Progress → Execution Progress
Confidence → Validation Confidence
Linked Issues → Linked Evidence
AI Recommendation → Recommended Move
Risk → Missing Proof / Decision Risk
```

Internal code may still use `roadmap` if refactoring is risky.

User-facing UI must use Bets language.

---

# Required Bet Card Questions

Every bet card must answer:

```txt
1. What are we testing?
2. How confident are we?
3. What proof is missing?
4. What should the studio do next?
```

Optional, but valuable:

```txt
5. What capacity is affected?
6. What evidence is linked?
```

---

# Bet Data Model

Recommended user-facing model:

```ts
type Bet = {
  id: string

  title: string
  ventureId: string
  ventureName: string

  timeframe:
    | "now"
    | "next"
    | "later"

  testingStatement: string
  targetOutcome?: string

  status:
    | "planned"
    | "active"
    | "at-risk"
    | "validated"
    | "killed"
    | "paused"

  validationConfidence: number
  confidenceTrend:
    | "improving"
    | "stable"
    | "declining"

  executionProgress: number

  recommendedMove:
    | "continue"
    | "narrow"
    | "pause"
    | "kill"
    | "staff-up"
    | "defer"
    | "partner-review"

  missingProof: string[]

  linkedEvidenceIds: string[]

  capacityImpact?: {
    teams: (
      | "Product"
      | "Engineering"
      | "Design"
      | "Growth"
      | "Research"
    )[]
    level: "low" | "medium" | "high"
    note: string
  }

  owner?: string

  createdAt: string
  updatedAt: string
}
```

---

# Migration From Existing Roadmap Model

If the current app already uses a `RoadmapItem` model, do not over-refactor immediately.

Map existing fields like this:

```txt
roadmapItem.title → bet.title
roadmapItem.goal → bet.testingStatement
roadmapItem.progress → bet.executionProgress
roadmapItem.confidence → bet.validationConfidence
roadmapItem.linkedIssueIds → bet.linkedEvidenceIds
roadmapItem.aiRecommendation → bet.recommendedMove
roadmapItem.timeframe → bet.timeframe
```

Internal names can remain `RoadmapItem` temporarily if a full refactor is risky.

The UI must speak in Bet language.

---

# Timeframe Structure

Keep the simple roadmap grouping:

```txt
Now
Next
Later
```

This should remain because it is:

* simple
* familiar
* Linear-inspired
* aligned with the assignment
* easy to scan

But the meaning should be decision-oriented.

---

# Timeframe Definitions

## Now

Meaning:

> Bets currently consuming meaningful studio capacity.

Use for:

* active validation
* active execution
* bets requiring near-term decision
* high-confidence initiatives being staffed
* low-confidence initiatives at risk of wasting capacity

Example copy:

```txt
Now
Active bets using studio capacity.
```

---

## Next

Meaning:

> Bets that may deserve capacity soon if proof improves.

Use for:

* upcoming validation
* emerging opportunities
* bets waiting for missing proof
* initiatives not yet ready for broad execution

Example copy:

```txt
Next
Bets waiting for proof or capacity.
```

---

## Later

Meaning:

> Bets worth remembering but not worth capacity now.

Use for:

* deferred opportunities
* low-urgency initiatives
* ideas with insufficient evidence
* expansion paths that should not distract the studio

Example copy:

```txt
Later
Possible bets, not active commitments.
```

---

# Bet Card Required Fields

Each bet card should include:

```txt
Title
Venture
Testing statement
Validation Confidence
Execution Progress
Recommended Move
Missing Proof
Linked Evidence Count
Capacity Impact
```

---

# Bet Card Information Hierarchy

The card should prioritize:

```txt
1. Title
2. Testing statement
3. Recommended move
4. Validation confidence
5. Missing proof
6. Execution progress
7. Linked evidence
8. Capacity impact
```

Recommended move and validation confidence should be more visible than execution progress.

This is important because:

> a bet can be moving operationally while still being strategically weak.

---

# Bet Card Example

Use this as the target pattern:

```txt
Creator Retention Signal Validation

Testing
Define the retained-creator threshold for a continue, narrow, or stop decision.

Validation confidence
23% · Declining

Execution progress
41%

Recommended move
Narrow

Missing proof
Weekly retained creator signal

Capacity impact
Product + Engineering

4 evidence items · 1 complete
```

---

# Progress vs Confidence Rule

This is one of the most important product rules.

Execution progress must not overpower validation confidence.

When execution progress is higher than validation confidence, expose that tension.

Use:

```txt
Execution is moving, but validation confidence remains weak.
```

Alternative:

```txt
Work is progressing faster than proof.
```

This tension is a core Foundary differentiator.

---

# Validation Confidence

## Purpose

Validation confidence shows how strongly the current evidence supports the bet.

It answers:

```txt
Do we have enough proof to justify more capacity?
```

---

## Confidence Scale

Use:

```txt
0–100
```

---

## Confidence Interpretation

```txt
80–100: Strong
60–79: Moderate
40–59: Weak
0–39: Critical
```

---

## Confidence Trend

Use:

```ts
type ConfidenceTrend =
  | "improving"
  | "stable"
  | "declining"
```

---

## Confidence UX Rules

Confidence should feel:

* lightweight
* strategic
* easy to scan
* more important than progress

Avoid:

* fake precision
* complex formulas
* predictive theatrics
* heavy analytics visuals

---

# Execution Progress

## Purpose

Execution progress shows how much related work is moving.

It answers:

```txt
How much work has been done?
```

It does not answer:

```txt
Should we keep going?
```

That is validation confidence.

---

## Progress UX Rule

Progress should be visible but secondary.

Use:

```txt
Execution progress
```

Do not label it only as:

```txt
Progress
```

This prevents users from confusing delivery motion with validation proof.

---

# Recommended Move

## Purpose

Recommended Move is the decision state of the bet.

It answers:

```txt
What should the studio do with this bet now?
```

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

# Move Definitions

## Continue

Use when:

* validation confidence is healthy
* evidence supports the current direction
* capacity usage is justified

Card copy:

```txt
Continue
Evidence supports the current direction.
```

---

## Narrow

Use when:

* there is some signal
* scope is too broad
* capacity is being consumed faster than proof is improving

Card copy:

```txt
Narrow
Reduce scope to the strongest validation path.
```

---

## Pause

Use when:

* confidence is weak
* execution is active
* more proof is needed before broad work continues

Card copy:

```txt
Pause
Stop broad execution until missing proof is resolved.
```

---

## Kill

Use when:

* evidence contradicts the bet
* confidence is low
* continued execution would waste capacity

Card copy:

```txt
Kill
Stop this bet and redirect capacity.
```

---

## Staff up

Use when:

* confidence is strong
* opportunity is constrained by limited team capacity

Card copy:

```txt
Staff up
Add capacity to avoid slowing a validated opportunity.
```

---

## Defer

Use when:

* idea may matter later
* timing is wrong
* capacity is better used elsewhere now

Card copy:

```txt
Defer
Keep visible, but do not spend capacity now.
```

---

## Partner review

Use when:

* evidence is mixed
* decision is strategic
* tradeoff requires leadership judgment

Card copy:

```txt
Partner review
Escalate for a studio-level decision.
```

---

# Missing Proof

## Purpose

Missing Proof is the clearest way to make a bet feel validation-driven.

It answers:

```txt
What do we still need to know before committing more capacity?
```

---

# Missing Proof Examples

Use realistic examples:

```txt
Weekly retained creator signal
Activation bottleneck recovery
Referral conversion baseline
Partner reporting scope agreement
Broadcast loop repeat usage
Studio metrics trust threshold
AI meeting summary accuracy
```

---

# Missing Proof UX Rules

Missing proof should be visible on cards.

It should not only appear in the drawer.

Use concise phrases.

Avoid long explanations on cards.

---

# Linked Evidence

## Purpose

Linked Evidence connects Bets to the Evidence screen.

It answers:

```txt
What proof or work is connected to this bet?
```

---

# Linked Evidence Display

Use:

```txt
4 evidence items · 1 complete
```

or:

```txt
3 evidence items · 2 challenging
```

For high-risk bets, show evidence quality:

```txt
4 evidence items · proof still weak
```

---

# Linked Evidence Interaction

Users should be able to:

* open Evidence filtered by this bet
* see evidence count on the card
* view linked evidence inside the Bet drawer
* navigate from evidence item back to the bet

---

# Capacity Impact

## Purpose

Capacity Impact shows whether the bet is consuming scarce team capacity.

It answers:

```txt
What team capacity is affected by this bet?
```

---

# Capacity Impact Examples

```txt
Product + Engineering
Design + Research
Growth
Engineering
Low capacity impact
```

---

# Capacity UX Rules

Capacity should be simple.

Do not build a resource planning system.

Use capacity to explain tradeoffs, not manage schedules.

---

# Bets Board Layout

## Recommended Structure

```txt
Bets Header
  ├── Title
  ├── Subtitle
  ├── View / Filter Controls
  └── Add Bet

Decision Summary Row
  ├── Bets Losing Confidence
  ├── Missing Proof
  ├── Capacity at Risk
  └── Recommended Moves

Bets Board
  ├── Now
  ├── Next
  └── Later

Persistent Elements
  ├── Bet Drawer
  └── Linked Evidence Context
```

---

# Decision Summary Row

## Purpose

The summary row should orient the user before scanning cards.

It should answer:

```txt
Which bets require a decision?
```

---

## Recommended Summary Items

Use:

```txt
Bets Losing Confidence
Missing Proof
Capacity at Risk
Partner Review Needed
```

Avoid:

```txt
Total Roadmaps
Completed Items
Project Count
```

---

# Bets Board

## Purpose

The board gives a fast spatial overview of studio bets.

It should remain:

* simple
* compact
* scannable
* calm
* Linear-inspired

---

# Board Column Rules

Each column should show:

```txt
Column title
Short explanation
Bet count
Cards
```

Example:

```txt
Now
Active bets using studio capacity.
```

---

# Bet Card Visual Rules

Bet cards should feel:

* compact
* strategic
* calm
* evidence-backed
* premium

Avoid:

* oversized cards
* dense metadata
* colorful dashboard styling
* roadmap clutter
* Gantt/timeline visuals
* project management language

---

# Bet Drawer

## Purpose

The Bet drawer is the decision workspace for a single bet.

It should answer:

```txt
What are we testing?
What evidence is linked?
What proof is missing?
What move is recommended?
What capacity is affected?
What should happen next?
```

---

# Drawer Sections

Use:

```txt
Header
What We Are Testing
Recommended Move
Validation Confidence
Missing Proof
Evidence Linked
Capacity Impact
Analyst Reasoning
Next Action
```

Avoid:

```txt
Roadmap Details
Project Metadata
Epic Information
Timeline Planning
```

---

## Drawer Header

Show:

```txt
Bet title
Venture
Timeframe
Recommended move
Validation confidence
Status
```

Example:

```txt
Creator Retention Signal Validation
Reson8 · Now · Narrow · 23% confidence
```

---

## What We Are Testing Section

Explain the bet in plain language.

Example:

```txt
Define whether creators return weekly after first broadcast setup. This determines whether Reson8 should continue broad onboarding buildout or narrow to a retention-focused path.
```

---

## Recommended Move Section

Show the decision clearly.

Example:

```txt
Recommended move
Narrow

Why
Retention proof is weak while product and engineering capacity are actively being consumed.
```

---

## Validation Confidence Section

Show:

```txt
Validation confidence
23% · Declining
```

Also show short interpretation:

```txt
Critical confidence. Do not expand broad execution without resolving missing proof.
```

---

## Missing Proof Section

Show list of missing proof items.

Example:

```txt
Missing proof
- Weekly retained creator signal
- Retained creator threshold
- Broadcast loop repeat usage
```

---

## Evidence Linked Section

Show linked evidence items.

Each evidence preview should include:

```txt
Evidence title
Role
Status
Decision impact
```

Example:

```txt
Weekly creator cohort analysis
Challenging · In progress · High impact
```

CTA:

```txt
View all evidence
```

---

## Capacity Impact Section

Show affected teams and tradeoff.

Example:

```txt
Capacity impact
Product + Engineering · High

Why it matters
Continuing broad Reson8 buildout consumes shared capacity that could support Sentra activation work.
```

---

## Analyst Reasoning Section

Show concise structured reasoning.

Example:

```txt
Analyst reasoning
This bet has active execution but weak retained creator proof. Narrowing scope protects capacity while keeping the strongest validation path alive.

Confidence
82%
```

Do not say:

```txt
AI says
The assistant thinks
```

---

## Next Action Section

Use clear action language.

Examples:

```txt
Inspect evidence
Narrow scope
Pause broad buildout
Request partner review
Add missing proof
```

---

# Add Bet Flow

## Purpose

Add Bet should be lightweight.

It should not feel like creating a project plan.

---

## CTA Label

Use:

```txt
Add Bet
```

Avoid:

```txt
Create Roadmap
Add Project
Create Initiative
```

---

## Minimal Required Inputs

Use:

```txt
Bet title
Venture
Timeframe
Testing statement
Recommended move
Validation confidence
Missing proof
```

Optional:

```txt
Capacity impact
Owner
Linked evidence
Target outcome
```

---

# Add Bet UX Rule

The flow should support fast capture.

Do not create a multi-step wizard.

Do not require detailed planning.

Use drawer or inline panel, not a full-page form.

---

# Filtering Requirements

## Required Filters

Support:

```txt
Move
Venture
Confidence
Missing Proof
Capacity
Timeframe
Status
```

---

## Move Filter

This is required.

Use:

```txt
All moves
Continue
Narrow
Pause
Kill
Staff up
Defer
Partner review
```

---

## Confidence Filter

Use:

```txt
All confidence
Strong
Moderate
Weak
Critical
Declining
```

---

## Capacity Filter

Use:

```txt
All capacity
High capacity impact
Medium capacity impact
Low capacity impact
```

---

# Search Requirements

Search should support:

```txt
bet title
venture
testing statement
missing proof
recommended move
linked evidence
owner
```

---

## Search Placeholder

Use:

```txt
Search bets, ventures, proof, or recommended moves...
```

Avoid:

```txt
Search roadmap...
```

---

# Relationship To Evidence

Bets and Evidence must be tightly linked.

The relationship should feel obvious:

```txt
Bet
→ has missing proof
→ is supported by evidence
→ evidence changes confidence
→ confidence changes recommended move
```

---

## Evidence Link Interaction

From a Bet card or drawer, users should be able to:

```txt
View evidence
```

Expected behavior:

```txt
Bets → Evidence filtered to selected bet
```

Example route/state:

```ts
navigate("/evidence?bet=creator-retention-signal-validation")
```

or:

```ts
setActiveRoute("evidence")
setEvidenceFilters({
  supportedBetId: bet.id
})
```

---

# Relationship To Command Center

Command Center should be able to link into a Bet.

Example flow:

```txt
Command Center recommends Narrow Reson8.
User clicks Open bet.
Bets opens Creator Retention Signal Validation.
```

Preferred behavior:

* open bet drawer if drawer system exists
* otherwise navigate to Bets with selected bet highlighted

---

# Relationship To Studio Analyst

Studio Analyst should cite Bets as source objects.

Example:

```txt
Source evidence
3 evidence items · 1 bet · 2 capacity signals
```

Clicking “Open bet” should bring user to the Bet drawer.

---

# State Synchronization Rules

Bet changes should affect:

```txt
Command Center recommended move
Evidence context
Studio Analyst reasoning
Validation confidence
Capacity pressure
Recommended move counts
```

---

## Evidence Changes Affect Bets

When linked evidence changes:

### Completed proving evidence

```txt
- may increase validation confidence
- may support Continue or Staff up
```

### Completed de-risking evidence

```txt
- may increase confidence
- may reduce Missing Proof
```

### Challenging evidence

```txt
- may decrease confidence
- may trigger Narrow, Pause, or Partner review
```

### Disproving evidence

```txt
- may strongly decrease confidence
- may trigger Pause or Kill
```

### Capacity cost evidence

```txt
- may increase capacity impact
- may trigger Narrow or Defer if proof is weak
```

---

# Recommended Move Logic

Do not overbuild a complex scoring engine.

Use simple, believable rules.

## Continue

Use when:

```txt
validation confidence >= 60
and missing proof is not critical
and capacity impact is justified
```

## Narrow

Use when:

```txt
validation confidence is weak or critical
and some evidence exists
and scope is too broad
or capacity pressure is high
```

## Pause

Use when:

```txt
validation confidence is critical
and broad execution is active
and missing proof is unresolved
```

## Kill

Use when:

```txt
validation confidence is critical
and disproving evidence is strong
and capacity cost remains high
```

## Staff up

Use when:

```txt
validation confidence is strong
and execution is constrained by capacity
```

## Defer

Use when:

```txt
confidence is moderate or weak
and timing is not urgent
and capacity is better used elsewhere
```

## Partner review

Use when:

```txt
evidence is mixed
or confidence is moderate but capacity tradeoff is high
or strategic judgment is required
```

---

# Seeded Demo Bets

## Reson8

Use Reson8 to demonstrate validation uncertainty and sunk-cost risk.

### Bet 1

```txt
Creator Retention Signal Validation

Venture: Reson8
Timeframe: Now
Testing statement:
Define the retained-creator threshold for a continue, narrow, or stop decision.

Validation confidence: 23%
Confidence trend: Declining
Execution progress: 41%
Recommended move: Narrow
Missing proof:
- Weekly retained creator signal
- Retained creator threshold

Capacity impact:
Product + Engineering · High

Linked evidence:
4 evidence items · 1 complete
```

### Bet 2

```txt
Broadcast Loop Decision

Venture: Reson8
Timeframe: Next
Testing statement:
Validate whether creators repeat broadcast setup without manual intervention.

Validation confidence: 38%
Confidence trend: Stable
Execution progress: 18%
Recommended move: Pause
Missing proof:
- Repeat broadcast usage
- Setup completion quality

Capacity impact:
Product + Design · Medium

Linked evidence:
2 evidence items · 0 complete
```

---

## Sentra

Use Sentra to demonstrate high-confidence opportunity with capacity strain.

### Bet 1

```txt
Activation Analytics Recovery

Venture: Sentra
Timeframe: Now
Testing statement:
Recover activation visibility so the studio can safely scale the onboarding motion.

Validation confidence: 78%
Confidence trend: Improving
Execution progress: 66%
Recommended move: Continue
Missing proof:
- Final activation bottleneck review

Capacity impact:
Engineering · Medium

Linked evidence:
3 evidence items · 2 complete
```

### Bet 2

```txt
Mobile Referral Expansion

Venture: Sentra
Timeframe: Next
Testing statement:
Validate whether mobile referral loops can improve activation without increasing support load.

Validation confidence: 82%
Confidence trend: Stable
Execution progress: 32%
Recommended move: Staff up
Missing proof:
- Referral conversion baseline

Capacity impact:
Growth + Engineering · Medium

Linked evidence:
2 evidence items · 1 complete
```

---

## Internal Ops

Use Internal Ops to demonstrate stable studio leverage.

### Bet 1

```txt
Studio Metrics Scope

Venture: Internal Ops
Timeframe: Now
Testing statement:
Define a compact studio metrics layer that improves partner visibility without creating reporting overhead.

Validation confidence: 71%
Confidence trend: Stable
Execution progress: 74%
Recommended move: Continue
Missing proof:
- Partner review alignment

Capacity impact:
Product · Low

Linked evidence:
3 evidence items · 2 complete
```

### Bet 2

```txt
Partner Reporting Workflow

Venture: Internal Ops
Timeframe: Later
Testing statement:
Assess whether partner reporting should become a reusable studio workflow.

Validation confidence: 54%
Confidence trend: Stable
Execution progress: 12%
Recommended move: Defer
Missing proof:
- Repeat partner demand
- Reporting scope agreement

Capacity impact:
Product + Design · Low

Linked evidence:
1 evidence item · 0 complete
```

---

# Visual Design Rules

Bets should feel:

* strategic
* compact
* calm
* evidence-backed
* confidence-aware
* premium
* Linear-inspired

Avoid:

* Gantt chart visuals
* enterprise planning tools
* oversized roadmap cards
* dense project metadata
* timeline forecasting
* colorful portfolio charts
* generic epic cards
* investor reporting language

---

# Motion Rules

Use motion for:

* card hover states
* drawer open/close
* filter transitions
* selected bet highlight
* evidence link navigation
* lightweight column updates

Avoid:

* flashy animations
* dramatic roadmap transitions
* fake AI typing
* playful movement

Motion should support orientation, not decoration.

---

# Empty States

## No Bets In Timeframe

Use:

```txt
No bets in this timeframe.
```

Supporting copy:

```txt
Add a bet when the studio is testing whether to continue, narrow, pause, or kill an initiative.
```

CTA:

```txt
Add Bet
```

---

## No Linked Evidence

Use:

```txt
No linked evidence yet.
```

Supporting copy:

```txt
Link evidence so this bet can influence confidence and recommended moves.
```

CTA:

```txt
Link evidence
```

---

## No Missing Proof

Use:

```txt
No critical proof missing.
```

Supporting copy:

```txt
Current evidence supports the recommended move.
```

---

# Loading States

Use skeletons where possible.

If text is needed:

```txt
Loading bets...
Opening bet context...
Refreshing confidence...
```

Avoid:

```txt
Loading roadmap...
AI is thinking...
Preparing magic...
```

---

# Error States

Use calm operational language.

Examples:

```txt
Could not update bet.
Could not open linked evidence.
Could not refresh validation confidence.
Could not apply move filter.
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
BetsPage
BetsHeader
BetsToolbar
BetsSearch
BetsFilters
MoveFilter
ConfidenceFilter
DecisionSummaryRow
BetsBoard
BetColumn
BetCard
BetDrawer
RecommendedMoveBadge
ValidationConfidenceIndicator
ExecutionProgressBar
MissingProofList
LinkedEvidencePreview
CapacityImpactBadge
AddBetDrawer
```

---

# Component Responsibilities

## BetsPage

Responsible for:

* page composition
* active filters
* board layout
* selected bet state
* navigation from Command Center and Studio Analyst

---

## BetsHeader

Responsible for:

* title
* subtitle
* primary Add Bet CTA
* optional context summary

---

## DecisionSummaryRow

Responsible for:

* showing decision-level overview
* highlighting bets losing confidence
* surfacing missing proof
* showing capacity risk

---

## BetsBoard

Responsible for:

* Now / Next / Later columns
* filtering
* card ordering
* compact board layout

---

## BetCard

Responsible for:

* showing testing statement
* validation confidence
* recommended move
* missing proof
* linked evidence count
* capacity impact

---

## BetDrawer

Responsible for:

* explaining the full decision context
* showing evidence linkage
* showing confidence, proof, capacity, and next action

---

# Implementation Guidance

When implementing this feature:

1. Replace user-facing Roadmap language with Bets language.
2. Keep Now / Next / Later grouping.
3. Make Recommended Move visible on every card.
4. Make Missing Proof visible on every card.
5. Show Validation Confidence more prominently than Execution Progress.
6. Add Move filter.
7. Link Bets to Evidence.
8. Preserve compact Linear-inspired board feel.
9. Do not build Gantt charts or timeline planning.
10. Make Reson8 clearly demonstrate low-confidence execution risk.

---

# Anti-Patterns

Do NOT:

* call this screen Roadmap in user-facing UI
* make cards look like generic roadmap initiatives
* hide recommended move in the drawer only
* make progress more prominent than confidence
* remove Now / Next / Later
* add Gantt charts
* add timeline dependencies
* build enterprise planning workflows
* add financial forecasting
* add investor reporting
* add resource planning complexity
* create large decorative roadmap cards
* use chatbot language
* overbuild confidence scoring

---

# Acceptance Criteria

This feature is complete when:

* Bets page uses Bets language, not Roadmap language
* page subtitle explains bets as initiatives tested before committing capacity
* Now / Next / Later columns remain available
* every Bet card shows a testing statement
* every Bet card shows Validation Confidence
* every Bet card shows Recommended Move
* every Bet card shows Missing Proof
* every Bet card shows Linked Evidence count
* cards expose capacity impact where relevant
* Execution Progress is secondary to Validation Confidence
* move filter exists and includes Continue, Narrow, Pause, Kill, Staff up, Defer, Partner review
* Bet drawer explains what is being tested
* Bet drawer shows missing proof
* Bet drawer shows linked evidence
* Bet drawer shows capacity impact
* Bet drawer shows recommended next action
* Command Center can open a specific Bet
* Bet can navigate to filtered Evidence
* Studio Analyst can cite and open Bets
* Reson8 bets clearly support Narrow or Pause
* Sentra bets clearly support Continue or Staff up
* Internal Ops bets clearly support Continue or Defer
* the screen remains compact, calm, dark-first, and Linear-inspired

---

# Final Bets North Star

The Bets screen succeeds when a first-time reviewer thinks:

> “This is not just a roadmap. This shows what the studio is testing and what decision each initiative is moving toward.”

Every bet should make the decision chain visible:

```txt
Bet
→ Missing Proof
→ Linked Evidence
→ Validation Confidence
→ Capacity Impact
→ Recommended Move
```
