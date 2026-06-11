# Feature Specification — Cross-Screen Narrative

## Purpose

This file defines how Foundary’s core screens should connect into one coherent decision system.

The goal is to make the product feel like:

> one studio operating intelligence layer.

Not:

> four separate product modules.

The main screens are:

```txt id="2j1zzt"
Command Center
Evidence
Bets
Studio Analyst
```

Each screen has a distinct role, but they must all tell the same story.

---

# Core Narrative Problem

Foundary has strong individual screens, but the product can still feel too modular if each screen operates independently.

A reviewer may understand each page separately:

* Command Center shows recommendations
* Evidence shows work/signals
* Bets shows initiatives
* Studio Analyst shows reasoning

But the stronger product experience is when the reviewer understands:

```txt id="mz182w"
Command Center recommends a studio move.
Evidence shows what supports that move.
Bets shows the validation state behind the move.
Studio Analyst explains the reasoning and capacity tradeoff.
```

This is the difference between:

> a polished app

and:

> a coherent venture operating system.

---

# Cross-Screen North Star

Foundary should feel like:

> “Every screen explains the same studio decision from a different angle.”

The product should repeatedly answer:

```txt id="p9jk17"
What should we do?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

This pattern should be visible across:

* Command Center
* Evidence
* Bets
* Studio Analyst
* drawers
* cards
* source links
* filtered views

---

# Primary Demo Narrative

The primary demo story should follow this path:

```txt id="fdl9zp"
1. Command Center
   Foundary recommends narrowing Reson8.

2. Evidence
   The user inspects the source evidence behind the recommendation.

3. Bets
   The user opens the related validation bet and sees confidence is weak.

4. Studio Analyst
   The user reviews the reasoning, capacity tradeoff, and next action.
```

This flow should be possible without verbal explanation.

The UI itself should guide the user through the decision chain.

---

# Main Demo Story

Use this seeded story as the core product narrative:

```txt id="p8x94v"
Reson8 is consuming product and engineering capacity, but retention evidence is weak.

Foundary recommends narrowing Reson8 instead of continuing broad buildout.

The recommendation is supported by creator retention evidence, a low-confidence validation bet, and high capacity pressure.

Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.
```

This story should appear consistently across all major screens.

---

# Portfolio Story

The seeded ventures should represent three distinct operating conditions.

## Reson8

Story:

```txt id="rgvkg0"
Validation uncertainty with active execution and sunk-cost risk.
```

Expected decision state:

```txt id="40yr2z"
Recommended move: Narrow or Pause
Validation confidence: Low / Critical
Capacity pressure: High
Missing proof: Retained creator signal
```

## Sentra

Story:

```txt id="6fc4cn"
High-confidence growth opportunity with capacity strain.
```

Expected decision state:

```txt id="z7xv9s"
Recommended move: Continue or Staff up
Validation confidence: Strong
Capacity pressure: Medium
Missing proof: Activation bottleneck recovery or referral baseline
```

## Internal Ops

Story:

```txt id="c3jiq3"
Stable studio leverage with contained scope.
```

Expected decision state:

```txt id="hlx28j"
Recommended move: Continue or Defer
Validation confidence: Moderate / Strong
Capacity pressure: Low
Missing proof: None urgent or partner alignment
```

---

# Screen Roles

Each screen should have a clear narrative responsibility.

## Command Center

Role:

```txt id="11nlf6"
Decision overview.
```

It answers:

```txt id="n2xejw"
What should the studio focus on next?
```

Command Center should show the top recommended move and make the first click obvious.

Primary CTA:

```txt id="o4i6lo"
Inspect evidence
```

Secondary CTA:

```txt id="muxfwv"
Open bet
```

---

## Evidence

Role:

```txt id="p9jvjs"
Source proof.
```

It answers:

```txt id="hbn7ap"
What work or signal supports the decision?
```

Evidence should show why the recommended move is justified.

Primary pattern:

```txt id="m5h4le"
Evidence Item
→ Supports
→ Evidence Role
→ Decision Impact
→ Connected Bet
```

---

## Bets

Role:

```txt id="z3qgkl"
Validation state.
```

It answers:

```txt id="lp8pbc"
What is the studio testing before committing more capacity?
```

Bets should show confidence, missing proof, linked evidence, and recommended move.

Primary pattern:

```txt id="w52pwl"
Bet
→ Missing Proof
→ Linked Evidence
→ Validation Confidence
→ Recommended Move
```

---

## Studio Analyst

Role:

```txt id="yyik2j"
Reasoning layer.
```

It answers:

```txt id="zbg7g5"
Why is this move recommended?
```

Studio Analyst should explain the recommendation using evidence, bets, confidence, and capacity signals.

Primary pattern:

```txt id="4tzdbw"
Recommended Move
→ Why
→ Source Evidence
→ Capacity Impact
→ Next Action
```

---

# Required Cross-Screen Links

The following links are required.

## 1. Command Center → Evidence

When the user clicks:

```txt id="afsn3d"
Inspect evidence
```

The app should open Evidence filtered to the relevant source evidence.

Example:

```txt id="2wxa49"
Command Center: Narrow Reson8
→ Evidence filtered to Reson8 + Creator Retention Signal
```

Expected filter context banner:

```txt id="y4fh2i"
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

---

## 2. Command Center → Bets

When the user clicks:

```txt id="4ugnp2"
Open bet
```

The app should open the relevant Bet.

Example:

```txt id="rcv9pz"
Command Center: Narrow Reson8
→ Bets opens Creator Retention Signal Validation
```

Preferred behavior:

* open Bet drawer if drawer system exists
* otherwise navigate to Bets and highlight selected bet

---

## 3. Evidence → Bets

Every important evidence item should show the connected bet.

Example:

```txt id="enm6xc"
Evidence: Weekly creator cohort analysis
→ Connected Bet: Creator Retention Signal Validation
```

CTA:

```txt id="knycu4"
Open bet
```

Expected behavior:

```txt id="shl86c"
Evidence drawer → Bet drawer or Bets filtered to connected bet
```

---

## 4. Bets → Evidence

Every Bet should show linked evidence.

CTA:

```txt id="pulvpe"
View evidence
```

Expected behavior:

```txt id="5kv74q"
Bets → Evidence filtered to selected bet
```

Example context banner:

```txt id="9xfdpu"
Showing evidence for: Creator Retention Signal Validation
```

---

## 5. Studio Analyst → Evidence

Every recommendation should cite source evidence.

CTA:

```txt id="yxti5h"
Inspect evidence
```

Expected behavior:

```txt id="d5x0ij"
Studio Analyst recommendation → Evidence filtered to source evidence
```

---

## 6. Studio Analyst → Bets

Every recommendation connected to a bet should provide:

```txt id="oi51le"
Open bet
```

Expected behavior:

```txt id="lr6yv8"
Studio Analyst → Bet drawer with related validation state
```

---

## 7. Studio Analyst → Command Center

Studio Analyst should reinforce the same top recommendation visible in Command Center.

The relationship:

```txt id="i6hfwk"
Command Center = fast decision overview
Studio Analyst = deeper reasoning behind the same decision
```

---

# Shared Decision Object

To keep screens aligned, use a shared decision object or derived decision model.

Recommended model:

```ts id="dd7pbh"
type StudioDecision = {
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

  why: string

  nextAction: string

  validationConfidence: number

  confidenceTrend:
    | "improving"
    | "stable"
    | "declining"

  capacityImpact: {
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

  sourceEvidenceIds: string[]
  sourceBetIds: string[]

  missingProof: string[]

  urgency:
    | "low"
    | "medium"
    | "high"
    | "critical"

  confidence: number
}
```

This object can power:

* Command Center hero recommendation
* Studio Analyst hero recommendation
* Evidence context banners
* Bets selected state
* source links
* seeded demo flow

---

# Shared UI Pattern

Every screen should support this pattern:

```txt id="clxi0e"
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

The pattern does not need to appear identically on every screen, but it should be visible enough that the product feels coherent.

---

# Shared Recommended Move Language

Use consistent move values everywhere:

```txt id="fwhlq7"
Continue
Narrow
Pause
Kill
Staff up
Defer
Partner review
```

Do not introduce alternative labels like:

```txt id="3vvqvi"
Proceed
Stop
Review
Delay
Scale
Escalate
```

Consistency matters.

---

# Shared Context Banner

Use context banners when a screen is opened from another screen.

## Evidence Context Banner

Example:

```txt id="7ohd1w"
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

Actions:

```txt id="jt91ul"
Clear context
Open bet
Review reasoning
```

---

## Bets Context Banner

Example:

```txt id="1c0u63"
Showing bet for: Narrow Reson8
```

Actions:

```txt id="onf482"
View evidence
Review reasoning
Clear context
```

---

## Studio Analyst Context Banner

Example:

```txt id="0vx39d"
Reviewing reasoning for: Narrow Reson8
```

Actions:

```txt id="ndu9te"
Inspect evidence
Open bet
Clear context
```

---

# Context Banner Rules

Context banners should be:

* compact
* calm
* dismissible
* useful
* not tutorial-like

Avoid:

* onboarding banners
* explanation-heavy panels
* coach marks
* large instructional callouts

The banner should orient, not teach.

---

# Drawer Continuity

Drawers should preserve cross-screen narrative.

## Evidence Drawer

Should show:

```txt id="71pfz9"
Decision Supported
Connected Bet
Recommended Move
Capacity Impact
```

## Bet Drawer

Should show:

```txt id="thbwba"
Linked Evidence
Missing Proof
Recommended Move
Analyst Reasoning
```

## Analyst Drawer

Should show:

```txt id="01y7g5"
Source Evidence
Connected Bet
Signals Considered
Next Action
```

---

# Preferred Navigation Behavior

Prefer:

```txt id="oxvxzr"
filtered views
selected drawers
highlighted source objects
context banners
source links
```

Avoid:

```txt id="doigfx"
deep detail pages
complex routing trees
multi-step guided flows
modal stacks
onboarding tours
```

The product should stay lightweight and Linear-inspired.

---

# Route / State Suggestions

Routes can stay simple:

```txt id="4podnt"
/command-center
/evidence
/bets
/studio-analyst
```

If existing routes use older names, that is acceptable internally:

```txt id="7mdo7y"
/dashboard
/issues
/roadmap
/assistant
```

But user-facing labels should use:

```txt id="q9a47i"
Command Center
Evidence
Bets
Studio Analyst
```

---

# Suggested UI State

Use app state to preserve cross-screen context.

```ts id="e036nm"
type DecisionContext = {
  sourceScreen:
    | "command-center"
    | "evidence"
    | "bets"
    | "studio-analyst"

  decisionId?: string
  ventureId?: string
  recommendedMove?: string

  sourceEvidenceIds?: string[]
  sourceBetIds?: string[]

  supports?: string
  selectedBetId?: string
  selectedEvidenceId?: string

  contextLabel?: string
}
```

---

# Example Context Flow

## Command Center To Evidence

```ts id="3erg7g"
setDecisionContext({
  sourceScreen: "command-center",
  decisionId: "decision-reson8-narrow",
  ventureId: "reson8",
  recommendedMove: "narrow",
  supports: "Creator Retention Signal",
  sourceEvidenceIds: [
    "evidence-weekly-creator-cohort",
    "evidence-retention-threshold",
    "evidence-onboarding-buildout"
  ],
  sourceBetIds: [
    "bet-creator-retention-signal"
  ],
  contextLabel: "Narrow Reson8 · Creator Retention Signal"
})

setActiveRoute("evidence")
```

Evidence screen then shows:

```txt id="r5ptq7"
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

---

# Highlighting Source Objects

When navigating from one screen to another:

* highlight relevant evidence rows/cards
* highlight relevant bet card
* open selected drawer when helpful
* keep filter context visible
* provide Clear Context action

Avoid making the user search again.

---

# Cross-Screen Data Relationships

The following relationships should exist in seeded data.

```txt id="zd9l8y"
StudioDecision
→ sourceEvidenceIds
→ sourceBetIds
→ capacityImpact
→ recommendedMove
```

```txt id="q9ar7j"
EvidenceItem
→ supportedBetId
→ supports
→ evidenceRole
→ decisionImpact
→ recommendedMove
```

```txt id="ess1q3"
Bet
→ linkedEvidenceIds
→ missingProof
→ validationConfidence
→ recommendedMove
→ capacityImpact
```

```txt id="hgliva"
AnalystRecommendation
→ sourceEvidenceIds
→ sourceBetIds
→ capacityImpact
→ nextAction
```

---

# Seeded Decision Chain

Use this as the main connected data chain.

## Studio Decision

```txt id="j7ip92"
Decision ID: decision-reson8-narrow
Venture: Reson8
Recommended move: Narrow
Why: Retention evidence is weak while product and engineering capacity are being consumed.
Next action: Inspect creator retention evidence.
Capacity impact: Protect Product + Engineering capacity for Sentra activation work.
```

---

## Connected Bet

```txt id="8h133h"
Bet ID: bet-creator-retention-signal
Title: Creator Retention Signal Validation
Venture: Reson8
Validation confidence: 23%
Recommended move: Narrow
Missing proof: Weekly retained creator signal
```

---

## Connected Evidence

```txt id="sug2xj"
Evidence ID: evidence-weekly-creator-cohort
Title: Weekly creator cohort analysis
Supports: Creator Retention Signal
Role: Challenging
Decision impact: High
Connected bet: Creator Retention Signal Validation
```

```txt id="x7grb8"
Evidence ID: evidence-retention-threshold
Title: Creator retention threshold research
Supports: Creator Retention Signal
Role: Proving
Decision impact: Critical
Connected bet: Creator Retention Signal Validation
```

```txt id="6eh7gx"
Evidence ID: evidence-onboarding-buildout
Title: Reson8 onboarding buildout
Supports: Creator Retention Signal
Role: Capacity Cost
Decision impact: High
Connected bet: Creator Retention Signal Validation
```

---

## Connected Analyst Recommendation

```txt id="af78s9"
Recommendation ID: rec-reson8-narrow
Recommended move: Narrow Reson8
Why: Retention proof is weak while active buildout consumes capacity.
Source evidence: 3 evidence items · 1 bet · 2 capacity signals
Capacity impact: Protects engineering capacity for Sentra activation.
Confidence: 82%
```

---

# Cross-Screen Copy Consistency

Use the same decision language across all screens.

## Correct Pattern

```txt id="dmr7wz"
Narrow Reson8
Retention evidence is weak.
Inspect evidence.
Open bet.
Review reasoning.
```

## Incorrect Pattern

```txt id="a77kuc"
Roadmap risk detected.
Issue priority is high.
AI suggests action.
Open roadmap item.
```

---

# Screen-Specific Copy Alignment

## Command Center

Use:

```txt id="hqfvzt"
Recommended Move: Narrow Reson8
```

## Evidence

Use:

```txt id="5r8lvc"
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

## Bets

Use:

```txt id="1k6j9k"
Creator Retention Signal Validation
Recommended move: Narrow
```

## Studio Analyst

Use:

```txt id="a30vcu"
Recommended Move
Narrow Reson8
```

This repetition is intentional.

It makes the decision chain memorable.

---

# Cross-Screen Interaction Requirements

## Required Flow 1: Command Center → Evidence → Bet

The user should be able to:

```txt id="gtqaea"
1. See Narrow Reson8 in Command Center.
2. Click Inspect evidence.
3. Land on Evidence filtered to Creator Retention Signal.
4. Open Weekly creator cohort analysis.
5. See Connected Bet: Creator Retention Signal Validation.
6. Click Open bet.
7. See the bet drawer with confidence, missing proof, and recommended move.
```

---

## Required Flow 2: Command Center → Bet → Evidence

The user should be able to:

```txt id="8qzqau"
1. See Narrow Reson8 in Command Center.
2. Click Open bet.
3. See Creator Retention Signal Validation.
4. Click View evidence.
5. Land on Evidence filtered to linked evidence.
```

---

## Required Flow 3: Studio Analyst → Evidence → Bet

The user should be able to:

```txt id="m1a4o7"
1. See Narrow Reson8 recommendation in Studio Analyst.
2. Click Inspect evidence.
3. See source evidence.
4. Open evidence drawer.
5. Open connected bet.
```

---

## Required Flow 4: Bet → Studio Analyst

The user should be able to:

```txt id="u3jfpa"
1. Open Creator Retention Signal Validation.
2. See Recommended move: Narrow.
3. Click Review reasoning.
4. Open Studio Analyst reasoning for Narrow Reson8.
```

---

# Visual Continuity Rules

Cross-screen navigation should feel:

* instant
* calm
* connected
* source-linked
* contextual
* not disruptive

Use:

* consistent badges
* same move labels
* same venture labels
* same source names
* subtle highlight states
* context banners

Avoid:

* full-screen transitions that lose context
* unrelated page states
* resetting filters unexpectedly
* making users manually rebuild context

---

# Motion Rules

Use motion for:

* selected object highlight
* drawer opening
* context banner appearance
* filtered view transition
* source link navigation
* subtle card emphasis

Avoid:

* dramatic route transitions
* cinematic animations
* playful movement
* fake AI loading theatrics

Motion should help the user understand:

```txt id="ikn5am"
I came here because of this decision.
```

---

# Empty Context States

## No Source Evidence

Use:

```txt id="x9cfbo"
No source evidence linked yet.
```

Supporting copy:

```txt id="oq8uz4"
Link evidence so this recommendation can explain its reasoning.
```

---

## No Connected Bet

Use:

```txt id="tnfisy"
No connected bet.
```

Supporting copy:

```txt id="ecjbyg"
Connect this evidence to a bet so confidence and recommended moves stay aligned.
```

---

## No Decision Context

Use:

```txt id="nruaav"
No decision context active.
```

Supporting copy:

```txt id="v1zl9j"
Open a recommendation, bet, or evidence item to review its decision chain.
```

Use this sparingly.

Most screens should still be useful without active context.

---

# Loading States

Use skeletons and subtle transitions.

If text is needed:

```txt id="oefoz1"
Opening source evidence...
Loading connected bet...
Reviewing decision context...
Applying decision filters...
```

Avoid:

```txt id="tvysj6"
AI is thinking...
Preparing magic...
Loading roadmap...
Loading issues...
```

---

# Error States

Use calm operational language.

Examples:

```txt id="dxhu6m"
Could not open source evidence.
Could not open connected bet.
Could not apply decision context.
Could not load analyst reasoning.
```

Avoid:

```txt id="o0a1ql"
Oops!
Something went wrong!
AI failed!
```

---

# Component Recommendations

Suggested components:

```txt id="grwyyc"
DecisionContextProvider
DecisionContextBanner
SourceLink
SourceEvidenceLink
ConnectedBetLink
RecommendedMoveBadge
DecisionChainPreview
DecisionBreadcrumb
SourceObjectHighlight
ContextClearButton
CrossScreenActions
```

---

# Component Responsibilities

## DecisionContextProvider

Responsible for:

* storing active decision context
* preserving selected decision across screens
* exposing context to Evidence, Bets, and Studio Analyst
* clearing context when needed

---

## DecisionContextBanner

Responsible for:

* showing why the user is seeing a filtered view
* exposing related actions
* allowing context reset

---

## SourceLink

Responsible for:

* connecting recommendations to source objects
* preserving route/state context
* opening filtered screens or drawers

---

## DecisionChainPreview

Responsible for:

* showing the compact relationship chain

Example:

```txt id="5qmkbj"
Narrow Reson8 → Creator Retention Signal → 3 evidence items → 1 bet
```

---

## SourceObjectHighlight

Responsible for:

* visually highlighting the relevant evidence or bet after navigation
* fading highlight after a short delay
* keeping orientation clear

---

# Implementation Guidance

When implementing this feature:

1. Do not create new major screens.
2. Use existing routes and drawers.
3. Add shared decision context state.
4. Use context banners for filtered navigation.
5. Make Command Center, Evidence, Bets, and Studio Analyst share the same decision object where possible.
6. Keep the primary demo story focused on Reson8.
7. Use Sentra and Internal Ops as supporting portfolio contrast.
8. Avoid onboarding tours or explanatory overlays.
9. Keep the product compact and fast.
10. Make the UI itself explain the decision chain.

---

# Anti-Patterns

Do NOT:

* add onboarding walkthroughs
* add coach marks
* create multi-step guided tours
* add deep route nesting
* build a new “decision details” page
* create a graph visualization
* add heavy breadcrumbs
* create timeline dependency views
* add enterprise portfolio workflows
* introduce new terminology for the same concept
* make users manually search for source evidence
* break the Linear-inspired feel
* make screens feel disconnected
* hide context inside drawers only

---

# Acceptance Criteria

This feature is complete when:

* Command Center links to filtered Evidence
* Command Center links to connected Bet
* Studio Analyst links to filtered Evidence
* Studio Analyst links to connected Bet
* Evidence items show connected Bets
* Bet cards/drawers show linked Evidence
* Bet drawer can open Studio Analyst reasoning
* cross-screen context banner exists
* selected evidence or bet can be highlighted after navigation
* the Reson8 decision chain is fully connected
* Sentra and Internal Ops provide supporting contrast
* recommended move language is consistent everywhere
* source evidence names are consistent everywhere
* no onboarding tours or walkthroughs are added
* no new heavy route system is introduced
* the product feels systemic, not screen-based

---

# Final Cross-Screen North Star

The cross-screen narrative succeeds when a first-time reviewer thinks:

> “Every screen is helping me understand the same studio decision.”

The product should feel like one connected operating system:

```txt id="0lhb7x"
Command Center
→ recommends the move

Evidence
→ proves why the move is justified

Bets
→ shows the validation state

Studio Analyst
→ explains the reasoning and tradeoff
```
