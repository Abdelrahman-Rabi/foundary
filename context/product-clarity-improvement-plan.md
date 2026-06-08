# Product Clarity Improvement Plan - Foundary

## Purpose

This document defines the product clarity improvement plan for Foundary.

Foundary has already been repositioned from a venture execution workspace into a studio operating intelligence layer. The current strategic direction is correct: Foundary helps venture studios decide where to spend time, talent, and capital.

The current product promise is: Foundary helps venture studios prevent wasted execution.

After reviewing the current UI screens, the product has a clarity problem: the strategy is strong, but the first-time user experience is still too hard to understand.

This plan exists to improve first-time comprehension, Aha moment speed, decision hierarchy, screen-to-screen narrative, user-facing language, and evidence-backed product clarity.

The goal is not to add more features. The goal is to make the current product easier to understand, easier to demo, and more obviously valuable.

---

## 1. Current Product Diagnosis

### What is working

Foundary already has strong foundations:

- compact, calm, Linear-inspired UI
- polished dark-first visual direction
- venture-aware operating model
- Command Center
- Evidence screen
- Bets screen
- Studio Analyst screen
- validation confidence model
- evidence-backed execution model
- capacity tradeoff concept
- AI repositioned as Studio Analyst instead of chatbot

The strategic direction is much stronger than a generic project management tool.

Foundary is no longer only asking: What work is happening?

It is now trying to ask: Is this work still justified by evidence, confidence, and scarce studio capacity?

That is the correct product wedge.

### What is not working yet

The product is still difficult to understand for a first-time reviewer.

A user may ask:

- What is Foundary?
- What problem does it solve?
- What should I do first?
- Why is this different from Linear?
- Why is this not just a sophisticated project dashboard?
- What is the Aha moment?
- How do Command Center, Evidence, Bets, and Studio Analyst connect?

The current UI contains the right concepts, but the hierarchy does not make the value obvious fast enough.

The biggest issue: Foundary is strategically advanced, but the UI still requires too much explanation.

---

## 2. Core Problem To Solve

Foundary currently risks feeling like a sophisticated venture dashboard that requires explanation.

It should instead feel like a command center that immediately tells the studio what to continue, narrow, pause, or stop, and why.

The Aha moment is currently too delayed. Within 30 seconds, a reviewer should understand:

- which venture needs attention
- why it needs attention
- what studio move is recommended
- what evidence supports that move
- what capacity tradeoff is involved

---

## 3. Target Aha Moment

The target Aha moment is:

> Foundary helps venture studios decide what to continue, narrow, pause, or stop before wasting more execution time.

A stronger product explanation:

> Foundary turns venture execution noise into evidence-backed studio decisions.

A simpler UI-facing product line:

> Decide where your studio should focus next.

---

## 4. Product North Star

Foundary should remain:

- compact
- calm
- fast
- Linear-inspired
- dark-first
- local-first
- evidence-backed
- decision-led
- mocked but believable
- premium but not decorative
- strategic but understandable

The final product should feel strategically sophisticated, but easy to understand.

---

## 5. What Must Not Change

This clarity phase should not weaken the existing strategic repositioning.

Foundary should still support the current product spine:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

However, this internal product spine should be translated into simpler user-facing UX:

```txt
What should we do?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

---

## 6. Core UX Rule

Every major screen should answer the same five questions:

```txt
1. What should the studio do next?
2. Why?
3. What evidence supports it?
4. What capacity is affected?
5. What is the next action?
```

This pattern should be visible across Command Center, Evidence, Bets, and Studio Analyst.

The pattern should be compact and embedded into the UI.

Do not create onboarding tours, walkthroughs, coach marks, or explanatory modals.

---

## 7. Improvement Strategy

Improve clarity before adding capability.

Prioritize:

- copy refinement
- hierarchy changes
- stronger first viewport
- clearer labels
- stronger decision language
- visible source linkage
- better screen-to-screen flow
- seeded story tuning

Avoid:

- new product areas
- new routes
- complex data models
- backend systems
- onboarding systems
- heavy configuration
- enterprise features

---

## 8. Final 8-Phase Improvement Plan

### Phase 1 - Copy and Hierarchy Clarity Pass

Goal: Make Foundary understandable without explanation.

Improve labels, subtitles, CTAs, card headings, metric names, table column names, empty states, and action labels.

Key label replacements:

| Current / Heavy Label | Better UI Label |
|---|---|
| Studio Analyst Recommendation | Recommended Move |
| Portfolio Attention Queue | Ventures Needing Attention |
| Validation Gates | Validation Checkpoints |
| Execution Evidence | Evidence |
| Operator Capacity | Team Capacity |
| Evidence Gaps | Missing Proof |
| High-risk Signals | Urgent Decisions |
| Declining Initiatives | Bets Losing Confidence |
| New Issue | Add Evidence |
| Issue | Evidence Item |
| New Bet | Add Bet |
| Open Issue | View Evidence |
| Open Roadmap | Open Bet |
| Inspect Signal | Inspect Reasoning |

Recommended subtitles:

- Command Center: Decide which ventures deserve more studio attention and which ones are consuming capacity without enough evidence.
- Evidence: Track the work behind each studio decision, including what is proving traction, exposing risk, or consuming capacity without enough evidence.
- Bets: Bets are the venture initiatives your studio is testing before committing more time, talent, or capital.
- Studio Analyst: Review recommended studio moves, the evidence behind them, and the capacity tradeoffs they create.

Success criteria:

- product purpose is clearer on every page
- labels use decision language instead of generic PM language
- UI feels simpler without losing strategic depth
- product remains compact, calm, and Linear-inspired

### Phase 2 - Command Center Aha Moment Redesign

Goal: Make the first screen communicate Foundary's value within 30 seconds.

The Command Center should not feel like a dense dashboard. It should feel like: Here is the most important studio move this week.

Target first viewport questions:

```txt
Which venture needs attention?
Why?
What move should the studio make?
What evidence supports it?
What capacity is constrained?
```

Required hero recommendation pattern:

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

Keep supporting panels, but make them subordinate to the hero decision:

- Ventures Needing Attention
- Validation Checkpoints
- Team Capacity Pressure
- Evidence Behind This Decision
- Recommended Move / Analyst Reasoning
- Supporting Signals

Avoid KPI-first dashboard design, passive reporting, enterprise analytics density, decorative status cards, marketing landing-page hero design, and onboarding panels.

Success criteria:

- top recommended move is obvious without explanation
- reviewer knows what to inspect first
- product value is visible in the first 30 seconds
- screen communicates a studio decision, not just dashboard intelligence

### Phase 3 - Evidence Screen Decision Linkage

Goal: Make Evidence feel like more than issue tracking.

The Evidence screen is currently usable and familiar, but it risks looking like issues renamed to evidence. Every evidence item should answer: Evidence for what decision?

Required label changes:

```txt
New Issue -> Add Evidence
Issue -> Evidence Item
Priority -> Decision Impact / Risk
Type -> Evidence Role
```

Required table direction:

```txt
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

Evidence role values:

- Proving
- Disproving
- Unlocking
- De-risking
- Challenging
- Capacity Cost

Every Evidence item should visibly show what it supports. Examples:

- Creator Retention Signal
- Activation Analytics Recovery
- Mobile Referral Expansion
- AI Meeting Intelligence
- Studio Metrics Scope
- Broadcast Loop Decision

Board cards should show:

```txt
Supports: Creator Retention Signal
Role: Challenging
Decision impact: May force Narrow
```

Evidence drawer should answer:

```txt
What decision does this support?
What is this work trying to prove, disprove, unblock, or de-risk?
Which bet/checkpoint is connected?
What is the capacity impact?
What is the recommended next action?
```

Success criteria:

- Evidence no longer feels like a generic issue tracker
- every work item has a visible reason to exist
- user can see how execution connects to a studio decision
- screen remains fast, compact, and familiar

### Phase 4 - Bets Screen Decision-State Upgrade

Goal: Make Bets represent validation decisions, not roadmap cards.

Every bet card should answer:

```txt
1. What are we testing?
2. How confident are we?
3. What proof is missing?
4. What should the studio do next?
```

Each bet card should include:

- title
- venture
- testing statement / target outcome
- confidence
- progress
- recommended move
- missing proof
- evidence count
- capacity impact when relevant

Recommended move values:

- Continue
- Narrow
- Pause
- Stop
- Staff up
- Defer
- Partner review

Example card pattern:

```txt
Creator Retention Signal Validation

Testing:
Define the retained-creator threshold for continue / narrow / stop decision.

Confidence: 23%
Progress: 0%

Recommended move: Narrow
Missing proof: weekly retained creator signal
Capacity impact: Product + Engineering

4 evidence items - 0 done
```

Add a move filter:

```txt
All moves
Continue
Narrow
Pause
Stop
Staff up
Defer
Partner review
```

Important UX rule: progress must not overpower confidence. Execution progress is not the same as validation confidence.

When progress and confidence diverge, expose it with a concise note such as: Execution is moving, but validation confidence remains weak.

Success criteria:

- Bets feel like validation decisions, not roadmap cards
- every bet shows the recommended studio move
- missing proof is visible
- user understands which bets deserve more capacity and which should stop consuming it

### Phase 5 - Studio Analyst Decision-First Restructure

Goal: Make Studio Analyst feel like a decision-support layer, not an intelligence feed.

The Studio Analyst page should open with one dominant recommendation.

Required hero recommendation:

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

Keep the analyst feed, but place it after the hero recommendation.

Metric label improvements:

| Current | Better |
|---|---|
| Analyst signals | Recommendations |
| High-risk signals | Urgent decisions |
| Evidence gaps | Missing proof |
| Declining initiatives | Bets losing confidence |

Action label improvements:

| Current | Better |
|---|---|
| Open issue | View evidence |
| Open roadmap | Open bet |
| Inspect signal | Inspect reasoning |
| Inspect | Review source |

Avoid chat bubbles, assistant avatars, fake typing, fake streaming, AI says framing, long conversational responses, and decorative AI visuals.

Prefer structured analyst blocks, recommended moves, source-linked reasoning, evidence-backed explanation, and capacity tradeoff explanation.

Success criteria:

- Studio Analyst clearly recommends a studio move
- recommendation explains why
- evidence and capacity links are visible
- AI feels operational and embedded, not chatbot-like

### Phase 6 - Cross-Screen Narrative and Click Path

Goal: Make Foundary feel like one connected decision system.

Primary demo flow:

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

Create or strengthen links between:

```txt
Command Center decision -> Evidence items
Evidence item -> Supported bet
Bet -> Studio Analyst reasoning
Studio Analyst signal -> Source evidence / bet
```

Every major surface should support:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

Keep navigation simple. Prefer existing routes, drawers, filtered views, compact source links, and lightweight CTA buttons.

Avoid deep detail pages, heavy modal stacks, multi-step guided flows, and onboarding walkthroughs.

Success criteria:

- screens feel connected
- demo tells one coherent story
- product feels systemic, not screen-based
- reviewer understands how decisions, evidence, bets, and analyst reasoning connect

### Phase 7 - Seeded Story and Demo Data Tuning

Goal: Make the demo story unmistakable.

The seeded data should explain the venture studio pain without verbal setup.

Required portfolio story:

#### Sentra

High-confidence growth opportunity with capacity strain.

Should show:

- stronger validation confidence
- activation or growth upside
- meaningful capacity bottleneck
- recommended move may be Staff up, Continue, or Protect capacity

#### Reson8

Validation uncertainty with active execution and sunk-cost risk.

Should show:

- weak retention evidence
- active product / engineering work
- low or declining confidence
- high decision pressure
- recommended move should be Narrow or Pause

#### Internal Ops

Stable studio leverage with contained scope and freed capacity.

Should show:

- stable confidence
- low risk
- contained work
- reduced capacity pressure
- recommended move should be Continue or Defer expansion

Required demo truth:

```txt
Reson8 is the clearest attention-needed venture.
Sentra is promising but capacity constrained.
Internal Ops is healthy and contained.
```

Tune venture states, validation confidence, recommended moves, evidence items, bets, capacity load, analyst signals, Command Center top decision, and source links between screens.

Success criteria:

- reviewer can infer the portfolio story from the UI
- Reson8 clearly demonstrates sunk-cost risk
- Sentra clearly demonstrates capacity tradeoff
- Internal Ops clearly demonstrates operating leverage
- demo feels like a living studio environment, not placeholder data

### Phase 8 - Final Polish, Linear Feel and Submission Readiness

Goal: Preserve the product's compact, calm, fast, Linear-inspired feel while improving clarity.

Keep:

- dark compact UI
- sidebar navigation
- fast search
- list / board toggle
- drawers
- inline metadata
- subtle badges
- keyboard-friendly interactions
- local-first behavior
- mocked but believable data
- restrained motion
- premium SaaS feel

Avoid:

- onboarding tours
- coach marks
- wizards
- heavy setup flows
- enterprise resource planning
- real backend
- RBAC
- billing
- finance / LP reporting
- chatbot UI
- more dashboards
- more configuration
- complex capacity planning
- settings-heavy setup

Final verification questions:

```txt
Does the Command Center explain the product in 30 seconds?
Does Evidence feel like evidence, not issues?
Do Bets show what should continue, narrow, pause, or stop?
Does Studio Analyst recommend a clear move?
Does the demo flow feel connected?
Does the app still feel fast and Linear-inspired?
```

For implementation changes, run:

```txt
npm run lint
npm run build
```

For documentation-only changes, run:

```txt
git diff --check -- <changed-files>
```

Success criteria:

- product is easier to understand
- Aha moment is faster
- no unnecessary complexity was added
- app still feels compact, calm, and premium
- final demo tells a clear venture studio operating story

---

## 9. Global Anti-Patterns

Do not introduce:

- Mini Jira complexity
- enterprise workflow engines
- heavy portfolio management
- real backend systems
- real AI provider integration
- onboarding tours
- coach marks
- product walkthroughs
- chatbot-style AI
- settings-heavy setup
- finance / LP reporting
- cap-table workflows
- resource planning bureaucracy
- calendar scheduling
- team management systems
- complex permissions
- account management
- billing

The product should remain lightweight, local-first, fast, and demo-optimized.

---

## 10. Implementation Priority Order

Implement in this order:

```txt
1. Copy and hierarchy clarity pass
2. Command Center Aha redesign
3. Evidence decision linkage
4. Bets decision-state upgrade
5. Studio Analyst decision-first restructure
6. Cross-screen narrative and click path
7. Seeded story and demo data tuning
8. Final polish and Linear-inspired submission readiness
```

Do not jump to data/model expansion before the copy and hierarchy pass unless required by the current implementation task.

---

## 11. Agent Implementation Guidance

When using an AI coding agent, always load:

```txt
context/current-feature.md
context/product-clarity-improvement-plan.md
context/strategy/studio-operating-intelligence.md
```

Then load only the feature spec required for the current phase.

Command Center work:

```txt
context/features/feature-command-center-aha.md
context/features/feature-copy-hierarchy.md
context/data/seeded-demo-story.md
```

Evidence work:

```txt
context/features/feature-evidence-decision-linkage.md
context/features/feature-copy-hierarchy.md
context/data/domain-models.md
```

Bets work:

```txt
context/features/feature-bets-decision-state.md
context/data/domain-models.md
context/data/seeded-demo-story.md
```

Studio Analyst work:

```txt
context/features/feature-studio-analyst-decision-first.md
context/data/seeded-demo-story.md
context/data/ai-behavior-rules.md
```

Final QA work:

```txt
context/features/feature-cross-screen-narrative.md
context/qa/final-review-checklist.md
```

---

## 12. Final Success Criteria

The improvement cycle succeeds when a first-time reviewer can understand Foundary without a long explanation.

The reviewer should feel:

> Foundary helps a venture studio decide where to focus next.

They should also understand:

```txt
Reson8 should be narrowed because validation is weak and capacity is being consumed.
Sentra is promising but constrained by shared capacity.
Internal Ops is stable and should not distract the studio.
```

The final product should communicate:

> Foundary helps venture studios prevent wasted execution by connecting recommended moves to evidence, validation confidence, and team capacity.

The product should not feel like a generic PM dashboard with AI labels.

The product should feel like a compact, Linear-inspired command center for evidence-backed venture studio decisions.
