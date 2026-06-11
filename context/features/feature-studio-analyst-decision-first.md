# Feature Specification — Studio Analyst Decision-First

## Purpose

The Studio Analyst is the decision-support layer of Foundary.

Its job is to answer:

> what should the studio do next, and why?

Studio Analyst should not feel like:

> a chatbot.

It should feel like:

> an embedded operating analyst that reviews evidence, bets, validation confidence, and capacity tradeoffs to recommend studio moves.

The screen should help venture studio operators decide whether to:

* continue
* narrow
* pause
* kill
* staff up
* defer
* escalate for partner review

---

# Core Product Problem

The current AI/Analyst screen may contain strong insights, but it can still feel like:

> a smart feed of recommendations.

That is not enough.

A venture studio does not need more AI output.

It needs clearer operating decisions.

The Studio Analyst should not begin with:

```txt id="bcogfr"
Here are some AI insights.
```

It should begin with:

```txt id="dlzthg"
Here is the highest-leverage studio move right now.
```

---

# Studio Analyst North Star

The Studio Analyst should feel like:

> “A concise operating analyst that recommends the next studio move and shows the source evidence behind it.”

It should not feel like:

> “A chat assistant that users need to prompt.”

The user should not need to ask the system what matters.

The system should surface the most important decision.

---

# Target User Understanding

Within a few seconds, the user should understand:

```txt id="ez7wct"
The top recommendation is to narrow Reson8.
The reason is weak retention evidence plus active capacity consumption.
The recommendation is based on specific evidence items, one bet, and capacity signals.
The next action is to inspect source evidence or open the related bet.
```

---

# What This Screen Is Not

The Studio Analyst is NOT:

* a chatbot
* a prompt box
* a generic AI assistant
* an AI feed
* a conversational support panel
* a brainstorming tool
* a writing assistant
* a magic insight generator
* a decorative AI feature

Do not optimize it for conversation.

---

# What This Screen Is

The Studio Analyst IS:

* a decision-support layer
* a structured recommendation surface
* a source-linked reasoning view
* a studio operating analyst
* a bridge between Command Center, Evidence, Bets, and Capacity
* the explanation layer for why Foundary recommends a move

It should make the product feel intelligent without feeling gimmicky.

---

# Screen-Level Copy

## Page Title

Use:

```txt id="g34plx"
Studio Analyst
```

## Page Subtitle

Use:

```txt id="mr5uwb"
Review recommended studio moves, the evidence behind them, and the capacity tradeoffs they create.
```

Shorter version:

```txt id="fqe1l9"
Review what the studio should do next — and why.
```

Avoid:

```txt id="pslxda"
AI assistant insights and recommendations.
```

---

# Primary Concept Shift

Replace generic AI language with decision-support language.

## Label Changes

Use:

```txt id="l1bow3"
AI Assistant → Studio Analyst
AI Insight → Analyst Recommendation
AI Feed → Recommendations
High-risk Signals → Urgent Decisions
Evidence Gaps → Missing Proof
Declining Initiatives → Bets Losing Confidence
Open Issue → View Evidence
Open Roadmap → Open Bet
Inspect Signal → Inspect Reasoning
Ask AI → Review Reasoning
AI Output → Source-Linked Recommendation
```

Internal component names can remain `Assistant` if refactoring is risky.

User-facing UI must use Studio Analyst language.

---

# Required First Viewport Structure

The first viewport must prioritize one dominant recommendation.

Recommended structure:

```txt id="yul1d4"
Page Header
  ├── Title
  └── Subtitle

Hero Recommendation
  ├── Recommended Move
  ├── Why
  ├── Next Action
  ├── Source Evidence
  ├── Capacity Impact
  ├── Confidence
  └── Actions

Supporting Context
  ├── Urgent Decisions
  ├── Missing Proof
  ├── Bets Losing Confidence
  └── Capacity Tradeoffs
```

The hero recommendation must visually dominate the page.

The recommendation feed should come after the hero.

---

# Hero Recommendation

## Purpose

The hero recommendation is the most important component on the Studio Analyst screen.

It should answer:

```txt id="mzb58q"
What should the studio do?
Why?
What evidence supports this?
What capacity is affected?
What should happen next?
How confident is the analyst?
```

---

# Hero Recommendation Example

Use this pattern:

```txt id="j1xi8h"
Recommended Move

Pause Reson8 build and narrow validation focus.

Why
Retention evidence is weak while product and engineering capacity are being consumed.

Next
Stop broad build work. Continue only retained-creator threshold validation.

Source evidence
3 evidence items · 1 bet · 2 capacity signals

Capacity impact
Protects engineering capacity for Sentra activation work.

Confidence
82%

Actions
Inspect evidence
Open bet
View capacity impact
```

---

# Hero Visual Hierarchy

The hierarchy should be:

```txt id="dp3i3e"
1. Recommended Move
2. Venture affected
3. Why
4. Next action
5. Source evidence
6. Capacity impact
7. Confidence
8. Actions
```

Do not bury the recommended move inside a feed card.

---

# Analyst Recommendation Data Model

Recommended model:

```ts id="tk94gh"
type AnalystRecommendation = {
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

  title: string

  why: string

  nextAction: string

  confidence: number

  urgency:
    | "low"
    | "medium"
    | "high"
    | "critical"

  sourceEvidenceIds: string[]
  sourceBetIds: string[]

  sourceSummary: {
    evidenceCount: number
    betCount: number
    capacitySignalCount: number
  }

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

  reasoning: string

  createdAt: string
  updatedAt: string
}
```

---

# Recommended Move Values

Use exactly:

```ts id="n34t1s"
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

Use when evidence supports the current direction.

Example:

```txt id="o05niy"
Continue Sentra activation work.
Evidence supports the current direction and capacity usage is justified.
```

---

## Narrow

Use when there is some signal, but the scope is too broad or proof is weak.

Example:

```txt id="xo72qr"
Narrow Reson8 to retained-creator validation.
Reduce scope to the strongest proof path.
```

---

## Pause

Use when broad execution should stop until missing proof is resolved.

Example:

```txt id="gbdd2f"
Pause broad Reson8 buildout.
Do not continue broad execution until retention proof improves.
```

---

## Kill

Use when evidence contradicts the bet and continuing would waste capacity.

Example:

```txt id="d7dsp1"
Kill referral expansion.
Stop this bet and redirect capacity.
```

---

## Staff up

Use when confidence is strong but capacity is limiting progress.

Example:

```txt id="kozisl"
Staff up Sentra.
Add capacity to avoid slowing a validated opportunity.
```

---

## Defer

Use when the idea may matter later but should not consume capacity now.

Example:

```txt id="zq9s76"
Defer partner reporting workflow.
Keep visible, but do not spend capacity now.
```

---

## Partner Review

Use when evidence is mixed or the tradeoff requires leadership judgment.

Example:

```txt id="pfvxi0"
Partner review required.
Escalate the decision because evidence is mixed and capacity tradeoff is high.
```

---

# Recommendation Feed

## Purpose

The recommendation feed supports the hero.

It should show additional decision signals after the primary recommendation.

It should not compete with the hero.

---

## Feed Sections

Use:

```txt id="iw3sjp"
Recommendations
Urgent Decisions
Missing Proof
Bets Losing Confidence
Capacity Tradeoffs
Source Evidence
```

Avoid:

```txt id="fmchur"
AI Feed
AI Output
Insight Stream
Signals
Generated Responses
Chat History
```

---

# Recommendation Card Pattern

Each recommendation card should show:

```txt id="y4s3cv"
Recommended move
Venture
Why
Source summary
Capacity impact
Confidence
Actions
```

Example:

```txt id="eoxk2a"
Narrow Reson8

Why
Retention proof remains weak while onboarding buildout is active.

Source
3 evidence items · 1 bet

Capacity
Product + Engineering · High

Confidence
82%

Actions
Inspect evidence · Open bet
```

---

# Recommendation Card Rules

Cards should be:

* compact
* structured
* source-linked
* operational
* easy to scan

Avoid:

* long AI paragraphs
* conversational phrasing
* chat bubble UI
* vague “insight” cards
* unsupported recommendations

---

# Source Evidence

## Purpose

Source Evidence makes the analyst trustworthy.

It answers:

```txt id="qzocrm"
What is this recommendation based on?
```

Every important recommendation should cite source objects.

---

# Source Types

Use:

```ts id="jv2s1d"
type AnalystSource =
  | {
      type: "evidence"
      id: string
      title: string
      role: string
      decisionImpact: string
    }
  | {
      type: "bet"
      id: string
      title: string
      validationConfidence: number
      recommendedMove: string
    }
  | {
      type: "capacity"
      id: string
      team: string
      level: "low" | "medium" | "high"
      note: string
    }
```

---

# Source Summary Format

Use:

```txt id="mt3rbq"
3 evidence items · 1 bet · 2 capacity signals
```

or:

```txt id="stxewq"
4 evidence items · proof still weak
```

Avoid:

```txt id="xrlzh2"
Based on AI analysis
Generated from internal data
Model output
```

---

# Source Link Interactions

Users should be able to:

```txt id="n6igda"
Inspect evidence
Open bet
View capacity impact
Review source
```

Expected flows:

```txt id="tsueug"
Studio Analyst → Evidence filtered to source evidence
Studio Analyst → Bet drawer
Studio Analyst → Command Center capacity context
```

---

# Analyst Reasoning

## Purpose

Analyst Reasoning explains the logic behind the recommendation.

It should be structured and concise.

---

## Reasoning Format

Use:

```txt id="p1zvdn"
Reasoning
[One concise paragraph explaining the recommendation.]

Signals considered
- Validation confidence
- Missing proof
- Evidence role
- Capacity pressure
- Execution progress

Confidence
82%
```

---

## Reasoning Example

```txt id="sx89li"
Reasoning
Reson8 has active product and engineering work, but the retained creator signal remains unresolved. Continuing broad buildout risks spending capacity before the core retention proof is clear.

Signals considered
- Validation confidence: 23%
- Missing proof: Weekly retained creator signal
- Evidence role: Challenging
- Capacity pressure: High

Confidence
82%
```

---

# Confidence

## Purpose

Confidence shows how strongly the analyst supports the recommendation.

It answers:

```txt id="tyqfqf"
How reliable is this recommendation?
```

---

# Confidence Scale

Use:

```txt id="p1ww64"
0–100
```

---

# Confidence Interpretation

```txt id="vt4pf4"
80–100: Strong reasoning
60–79: Moderate reasoning
40–59: Weak reasoning
0–39: Low confidence
```

---

# Confidence UX Rules

Confidence should be visible but not overly scientific.

Avoid:

* fake precision
* complex model-score language
* “AI certainty”
* ML terminology
* predictive theatrics

Use:

```txt id="oiacx8"
Confidence
82%
```

Do not use:

```txt id="pkcoy3"
LLM confidence score
AI certainty index
Prediction probability
```

---

# Capacity Tradeoffs

## Purpose

Capacity tradeoffs are central to the Studio Analyst.

The analyst should explain:

```txt id="v21zo1"
What capacity is being protected, consumed, or constrained?
```

This is especially important because venture studios share talent across ventures.

---

# Capacity Impact Format

Use:

```txt id="rs5w4q"
Capacity impact
Product + Engineering · High

Why it matters
Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.
```

---

# Capacity Rules

Keep capacity simple.

Do not build:

* resource scheduling
* workload planning
* utilization forecasting
* calendar allocation
* team capacity management

Capacity exists to support decisions, not manage people.

---

# Urgent Decisions

## Purpose

Urgent Decisions are recommendations that require near-term attention.

They should answer:

```txt id="zkme6q"
What decision should not wait?
```

---

# Urgent Decision Examples

```txt id="e1zc88"
Narrow Reson8 before more onboarding work is started.
```

```txt id="p2z0ye"
Staff up Sentra if activation recovery remains strong.
```

```txt id="tbi0c5"
Defer partner reporting workflow until repeat demand is clearer.
```

---

# Missing Proof

## Purpose

Missing Proof shows what evidence is required before the studio commits more capacity.

It should answer:

```txt id="kgcas2"
What do we still need to know?
```

---

# Missing Proof Examples

```txt id="q3nyg6"
Weekly retained creator signal
Retained creator threshold
Activation bottleneck recovery
Referral conversion baseline
Repeat partner demand
Broadcast loop repeat usage
```

---

# Missing Proof Card Pattern

Use:

```txt id="qa9zzf"
Missing proof
Weekly retained creator signal

Affects
Creator Retention Signal Validation

Move implication
Do not continue broad Reson8 buildout.
```

---

# Bets Losing Confidence

## Purpose

This section shows bets where validation confidence is declining or weak.

It should answer:

```txt id="hcjiov"
Which bets are becoming harder to justify?
```

---

# Bet Confidence Card Pattern

Use:

```txt id="mfl39h"
Creator Retention Signal Validation

Confidence
23% · Declining

Recommended move
Narrow

Missing proof
Weekly retained creator signal

Action
Open bet
```

---

# Capacity Tradeoff Cards

## Purpose

Capacity Tradeoff cards show where team capacity is under pressure.

They should answer:

```txt id="sk8e7i"
What work is consuming capacity without enough proof?
```

---

# Capacity Tradeoff Example

```txt id="zotdd2"
Engineering capacity pressure

Reson8 is consuming 42% of engineering capacity while validation confidence is 23%.

Recommended move
Narrow Reson8 and protect capacity for Sentra activation work.

Action
Inspect evidence
```

---

# Interaction Requirements

## Inspect Evidence

Clicking “Inspect evidence” should open Evidence filtered to the source evidence.

Example state:

```ts id="myasv7"
setActiveRoute("evidence")
setEvidenceFilters({
  sourceIds: recommendation.sourceEvidenceIds,
  ventureId: recommendation.ventureId
})
```

---

## Open Bet

Clicking “Open bet” should open the related Bet drawer or navigate to Bets with the bet selected.

Example state:

```ts id="qxir5o"
setActiveRoute("bets")
setSelectedBetId(recommendation.sourceBetIds[0])
```

---

## View Capacity Impact

Clicking “View capacity impact” should either:

* scroll to capacity context inside Studio Analyst
* open capacity detail drawer if already supported
* route back to Command Center capacity section

Do not build a full capacity planning module.

---

## Review Reasoning

Clicking “Review reasoning” should open a drawer or expanded panel with:

```txt id="ui87sl"
Recommended Move
Why
Source Evidence
Capacity Impact
Confidence
Signals Considered
Next Action
```

---

# Relationship To Command Center

Command Center should surface the same top recommendation as Studio Analyst.

Difference:

```txt id="s1lmmb"
Command Center = fast decision overview
Studio Analyst = deeper reasoning and source explanation
```

Command Center should link to Studio Analyst for review.

Studio Analyst should link back to source Evidence and Bets.

---

# Relationship To Evidence

Evidence items are source objects for recommendations.

Expected flow:

```txt id="w5u3ii"
Studio Analyst recommends Narrow Reson8.
User clicks Inspect evidence.
Evidence opens filtered to Creator Retention Signal evidence.
```

Studio Analyst must not make recommendations that feel detached from source evidence.

---

# Relationship To Bets

Bets are the strategic objects affected by analyst recommendations.

Expected flow:

```txt id="bw0h7k"
Studio Analyst recommends Narrow Reson8.
User clicks Open bet.
Creator Retention Signal Validation opens.
```

The Bet drawer should show the same recommended move and missing proof.

---

# Relationship To Capacity

Capacity is not a standalone resource planning module.

Capacity is a supporting signal for decisions.

Use capacity only to explain:

* why a bet should narrow
* why a bet should pause
* why a bet should be staffed up
* why a bet should be deferred

---

# State Synchronization Rules

Studio Analyst should update when:

```txt id="n9oavf"
evidence status changes
evidence role changes
bet confidence changes
bet missing proof changes
recommended move changes
capacity pressure changes
active venture changes
```

The analyst should feel connected to the system.

Do not make it feel like static placeholder text.

---

# Recommendation Selection Logic

Do not build a complex AI engine.

Use simple deterministic logic that feels believable.

Top recommendation can be selected by:

```txt id="nm5mmk"
highest urgency
+ lowest validation confidence
+ highest capacity pressure
+ strongest evidence conflict
+ active execution progress
```

For seeded data, Reson8 should usually be the top recommendation.

---

# Recommendation Logic Examples

## Narrow

Use when:

```txt id="n5spw2"
validation confidence is weak or critical
and execution progress is active
and capacity impact is medium/high
and some evidence still supports a narrower path
```

## Pause

Use when:

```txt id="a8gndb"
validation confidence is critical
and missing proof is unresolved
and broad execution is active
```

## Kill

Use when:

```txt id="rrrvi4"
validation confidence is critical
and disproving evidence is strong
and capacity cost remains high
```

## Staff up

Use when:

```txt id="ej3u8m"
validation confidence is strong
and capacity pressure is blocking progress
```

## Defer

Use when:

```txt id="fl03kb"
confidence is moderate or weak
and timing is not urgent
and capacity is better used elsewhere
```

## Partner Review

Use when:

```txt id="y7iahy"
evidence is mixed
or decision impact is high
or capacity tradeoff requires leadership judgment
```

---

# Seeded Demo Recommendations

## Primary Recommendation — Reson8

Use this as the hero recommendation:

```txt id="qnppbe"
Recommended Move
Narrow Reson8

Why
Retention evidence is weak while product and engineering capacity are actively being consumed.

Next
Stop broad onboarding buildout. Continue only retained-creator threshold validation.

Source evidence
4 evidence items · 1 bet · 2 capacity signals

Capacity impact
Protects product and engineering capacity for Sentra activation work.

Confidence
82%
```

---

## Supporting Recommendation — Sentra

```txt id="nwkfyc"
Recommended Move
Staff up Sentra activation work

Why
Activation confidence is improving, but engineering capacity is slowing execution.

Next
Add limited engineering capacity to complete activation recovery and referral instrumentation.

Source evidence
3 evidence items · 2 bets · 1 capacity signal

Capacity impact
Uses focused engineering time on a higher-confidence opportunity.

Confidence
78%
```

---

## Supporting Recommendation — Internal Ops

```txt id="tul7qg"
Recommended Move
Continue Internal Ops metrics scope

Why
The work is stable, low capacity, and supports studio-level visibility without creating major delivery risk.

Next
Complete partner review alignment, but defer reporting workflow expansion.

Source evidence
3 evidence items · 1 bet

Capacity impact
Low product capacity impact.

Confidence
74%
```

---

# Visual Design Rules

Studio Analyst should feel:

* structured
* calm
* analytical but not dense
* source-linked
* decision-first
* premium
* operational
* Linear-inspired

Avoid:

* chat bubbles
* avatars
* typing indicators
* neon AI styling
* large “AI magic” visuals
* generic assistant panels
* long generated paragraphs
* model/debug terminology

---

# Motion Rules

Use motion for:

* hero recommendation entrance
* expanding reasoning
* opening source drawers
* filtered navigation
* card hover states
* confidence update transitions

Avoid:

* fake streaming
* typing animation
* playful AI movement
* dramatic animated insight reveals

Motion should communicate continuity, not AI theatrics.

---

# Empty States

## No Urgent Recommendations

Use:

```txt id="cvms9w"
No urgent recommendations detected.
```

Supporting copy:

```txt id="oc6cql"
Recommendations appear when evidence, confidence, or capacity signals suggest a studio move.
```

CTA:

```txt id="basycn"
Review bets
```

---

## No Source Evidence

Use:

```txt id="g0jijg"
No source evidence linked yet.
```

Supporting copy:

```txt id="ev4l91"
Link evidence so recommendations can explain their reasoning.
```

CTA:

```txt id="ep27px"
View evidence
```

---

## No Capacity Tradeoff

Use:

```txt id="fw8tcn"
No major capacity tradeoff detected.
```

Supporting copy:

```txt id="m6aruo"
Current recommendations are based on confidence and evidence signals.
```

---

# Loading States

Use skeletons where possible.

If text is needed:

```txt id="c2byii"
Refreshing recommendations...
Loading source evidence...
Updating analyst reasoning...
```

Avoid:

```txt id="dy8nsh"
AI is thinking...
Generating magic...
Preparing insights...
```

---

# Error States

Use calm operational language.

Examples:

```txt id="yhwz73"
Could not refresh recommendations.
Could not open source evidence.
Could not open connected bet.
Could not update analyst reasoning.
```

Avoid:

```txt id="qj6scv"
Oops!
AI failed!
Something went wrong!!!
```

---

# Component Recommendations

Suggested components:

```txt id="an0j6n"
StudioAnalystPage
StudioAnalystHeader
HeroRecommendationCard
AnalystRecommendationCard
RecommendedMoveBadge
SourceSummary
SourceEvidenceLinks
CapacityImpactBlock
ReasoningPanel
UrgentDecisionsSection
MissingProofSection
BetsLosingConfidenceSection
CapacityTradeoffSection
AnalystDrawer
```

---

# Component Responsibilities

## StudioAnalystPage

Responsible for:

* page composition
* top recommendation selection
* supporting sections
* connection to Evidence, Bets, and Command Center

---

## HeroRecommendationCard

Responsible for:

* showing the dominant recommended move
* explaining why
* showing source evidence
* showing capacity impact
* exposing primary actions

---

## AnalystRecommendationCard

Responsible for:

* showing secondary recommendations
* keeping source linkage visible
* supporting quick navigation

---

## SourceSummary

Responsible for:

* showing evidence / bet / capacity source count
* making recommendation reasoning trustworthy

---

## ReasoningPanel

Responsible for:

* explaining why the recommendation exists
* showing signals considered
* showing confidence

---

## AnalystDrawer

Responsible for:

* expanded reasoning
* source evidence list
* connected bet
* capacity impact
* next action

---

# Implementation Guidance

When implementing this feature:

1. Do not build chatbot UI.
2. Do not add a prompt box unless already required elsewhere.
3. Lead with one dominant recommendation.
4. Make source evidence visible.
5. Make capacity tradeoff visible.
6. Use Recommended Move language everywhere.
7. Keep reasoning concise and structured.
8. Link recommendations to Evidence and Bets.
9. Keep AI language calm and operational.
10. Make Reson8 the clearest primary recommendation in seeded data.

---

# Anti-Patterns

Do NOT:

* call this screen AI Assistant in user-facing UI
* add chat bubbles
* add avatars
* add fake typing
* add fake streaming
* use “AI says” language
* make the feed more important than the hero recommendation
* generate long paragraphs
* create generic insights without source links
* make recommendations feel unsupported
* build a real AI provider integration
* expose model prompts or model mechanics
* add complex confidence formulas
* build a standalone capacity planning system
* use playful AI copy
* add flashy AI visuals

---

# Acceptance Criteria

This feature is complete when:

* page title is Studio Analyst
* first viewport includes one dominant recommended move
* hero recommendation explains why
* hero recommendation shows source evidence count
* hero recommendation shows capacity impact
* hero recommendation shows confidence
* primary actions include Inspect evidence and Open bet
* recommendations use Continue, Narrow, Pause, Kill, Staff up, Defer, Partner review
* recommendation cards are source-linked
* Studio Analyst can route to filtered Evidence
* Studio Analyst can open connected Bet
* Missing Proof section exists
* Bets Losing Confidence section exists
* Capacity Tradeoffs section exists
* no chatbot UI is introduced
* no fake typing or AI theatrics are introduced
* Reson8 clearly appears as the primary recommendation
* Sentra appears as higher-confidence but capacity constrained
* Internal Ops appears stable and lower urgency
* the screen remains compact, calm, dark-first, and Linear-inspired

---

# Final Studio Analyst North Star

The Studio Analyst succeeds when a first-time reviewer thinks:

> “This is not a chatbot. This is the reasoning layer behind the studio’s operating decisions.”

Every recommendation should make the decision chain visible:

```txt id="rvxkpe"
Evidence
→ Bet
→ Validation Confidence
→ Capacity Impact
→ Recommended Move
→ Next Action
```
