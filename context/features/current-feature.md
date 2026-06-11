# Current Feature — Product Clarity & Decision-Led Demo Readiness

## Active Implementation Focus

The current implementation focus is:

> Improve Foundary’s product clarity, Aha moment, and cross-screen decision narrative.

This is not a new feature expansion phase.

This is a product clarity and demo-readiness phase.

The goal is to make Foundary immediately understandable as:

> a studio operating intelligence layer that helps venture studios decide where to spend time, talent, and capital.

---

# Current Product Direction

Foundary has been repositioned from:

```txt
a Linear-inspired venture execution workspace
```

to:

```txt
a decision-led studio command center for venture builders
```

The product should help studio operators decide:

* what to continue
* what to narrow
* what to pause
* what to kill
* where to staff up
* where to defer effort
* when partner review is needed

---

# Active Product Promise

The product promise is:

> Foundary helps venture studios prevent wasted execution.

The UI should make this visible through:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

This pattern should appear across:

* Command Center
* Evidence
* Bets
* Studio Analyst
* drawers
* cards
* context banners
* source links

---

# Current Aha Moment Target

A first-time reviewer should understand this within 30 seconds:

```txt
Reson8 is moving, but proof is weak.
Foundary recommends narrowing the work before more capacity is wasted.
The recommendation is supported by evidence, a low-confidence bet, and capacity pressure.
```

If the reviewer needs a long verbal explanation, the product is not clear enough yet.

---

# Required Context Files To Load

Before implementing this phase, read these files:

```txt
@context/project-overview.md
@context/project-specs.md
@context/product-clarity-improvement-plan.md
@context/features/feature-copy-hierarchy.md
@context/features/feature-command-center-aha.md
@context/features/feature-evidence-decision-linkage.md
@context/features/feature-bets-decision-state.md
@context/features/feature-studio-analyst-decision-first.md
@context/features/feature-cross-screen-narrative.md
@context/features/feature-seeded-demo-story.md
@context/features/feature-polish-readiness.md
@context/data/domain-models.md
@context/data/mock-data-strategy.md
@context/data/ai-behavior-rules.md
```

If implementation touches layout, visual design, motion, or interaction polish, also read:

```txt
@context/features/feature-design-system.md
@context/features/feature-navigation.md
```

If implementation touches existing operational workflows, also read:

```txt
@context/features/feature-dashboard.md
@context/features/feature-issues.md
@context/features/feature-roadmap.md
@context/features/feature-ai-assistant.md
```

---

# Current Priority Order

Implement this phase in the following order:

```txt
1. Copy & hierarchy clarity pass
2. Command Center Aha redesign
3. Evidence decision linkage
4. Bets decision-state upgrade
5. Studio Analyst decision-first restructure
6. Cross-screen narrative and source links
7. Seeded demo story tuning
8. Final polish and readiness QA
```

Do not skip directly to polish before the decision hierarchy is clear.

Do not add new product areas.

---

# Current Screen Names

Use the following user-facing navigation labels:

```txt
Command Center
Evidence
Bets
Studio Analyst
```

Avoid user-facing labels:

```txt
Dashboard
Issues
Roadmap
AI Assistant
```

Internal route names or code names may remain unchanged if refactoring them would create unnecessary risk.

User-facing copy must reflect the new language.

---

# Active Demo Story

Use this as the primary demo story:

```txt
Reson8 is consuming product and engineering capacity, but retention evidence is weak.

Foundary recommends narrowing Reson8 instead of continuing broad buildout.

The recommendation is supported by creator retention evidence, a low-confidence validation bet, and high capacity pressure.

Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.

Internal Ops remains stable and should not distract the studio from higher-leverage venture decisions.
```

---

# Required Seeded Ventures

Use exactly these ventures:

```txt
Sentra
Reson8
Internal Ops
```

Their roles are:

```txt
Reson8 → validation uncertainty with active execution and sunk-cost risk
Sentra → high-confidence growth opportunity with capacity strain
Internal Ops → stable studio leverage with contained scope
```

---

# Required Seeded Values

Use these anchor values unless the entire demo story is intentionally updated:

```txt
Reson8 validation confidence: 23%
Reson8 execution progress: 41%
Studio Analyst confidence: 82%
Sentra validation confidence: 78%
Internal Ops validation confidence: 71%
```

These values support the main product insight:

> execution progress is not the same as validation confidence.

---

# Required Primary Decision

The primary shared decision should be:

```txt
Recommended Move: Narrow Reson8
```

Supporting explanation:

```txt
Retention evidence is weak while product and engineering capacity are actively being consumed.
```

Recommended next action:

```txt
Inspect creator retention evidence before expanding onboarding scope.
```

Capacity impact:

```txt
Narrowing Reson8 protects product and engineering capacity for higher-confidence Sentra activation work.
```

---

# Required Main Demo Flow

The product should support this flow:

```txt
1. Start on Command Center.
2. Show Recommended Move: Narrow Reson8.
3. Click Inspect evidence.
4. Evidence opens filtered to Creator Retention Signal.
5. Open Weekly creator cohort analysis.
6. Evidence drawer shows Connected Bet: Creator Retention Signal Validation.
7. Open the connected Bet.
8. Bet drawer shows 23% validation confidence and 41% execution progress.
9. Open Studio Analyst reasoning.
10. Studio Analyst explains source evidence, capacity impact, confidence, and next action.
```

This flow should feel natural and connected.

Do not add a guided tour.

The UI itself should make the path obvious.

---

# Current Implementation Goals

## Goal 1 — Make Command Center Clear Immediately

Command Center must open with one dominant recommendation.

Required hero:

```txt
Recommended Move: Narrow Reson8

Why now
Retention evidence is weak while product and engineering capacity are actively being consumed.

Studio decision
Stop broad onboarding buildout. Continue only retained-creator threshold validation.

Supporting evidence
Validation confidence: 23%
Capacity pressure: High
Missing proof: Weekly retained creator signal

Capacity impact
Protects product and engineering capacity for higher-confidence Sentra activation work.

Primary action
Inspect evidence
```

Command Center should not feel like a KPI dashboard.

---

## Goal 2 — Make Evidence Feel Like Source Proof

Evidence should not feel like Issues renamed.

Required table direction:

```txt
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

Required visible fields:

```txt
Supports
Evidence Role
Decision Impact
Connected Bet
Recommended Move
Capacity Impact
```

Use:

```txt
Add Evidence
Inspect evidence
View source
Open bet
```

Avoid:

```txt
New Issue
Open issue
Ticket
Priority
Type
```

---

## Goal 3 — Make Bets Feel Like Validation Decisions

Bets should not feel like generic roadmap cards.

Every Bet card should show:

```txt
Testing statement
Validation Confidence
Execution Progress
Recommended Move
Missing Proof
Linked Evidence
Capacity Impact
```

The Reson8 bet must clearly show:

```txt
Validation confidence: 23%
Execution progress: 41%
Recommended move: Narrow
```

Use this tension copy where appropriate:

```txt
Execution is moving, but validation confidence remains weak.
```

---

## Goal 4 — Make Studio Analyst Decision-First

Studio Analyst must not be a chatbot.

It should open with:

```txt
Recommended Move
Narrow Reson8
```

Required hero fields:

```txt
Why
Next Action
Source Evidence
Capacity Impact
Confidence
Actions
```

Required actions:

```txt
Inspect evidence
Open bet
View capacity impact
```

Avoid:

```txt
Ask AI
Chat with AI
AI says
Typing animation
Assistant avatar
Prompt box as main interaction
```

---

## Goal 5 — Connect Screens Into One Decision System

The product must feel systemic.

Required links:

```txt
Command Center → Evidence
Command Center → Bet
Evidence → Bet
Bets → Evidence
Bets → Studio Analyst
Studio Analyst → Evidence
Studio Analyst → Bet
```

Use context banners when navigating from one screen to another.

Example:

```txt
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

Allow:

```txt
Clear context
Open bet
Review reasoning
```

---

# Current Data Requirements

Seeded data should include:

```txt
ventures
bets
evidence items
studio decisions
analyst recommendations
capacity signals
```

Recommended files:

```txt
src/data/ventures.ts
src/data/bets.ts
src/data/evidence.ts
src/data/studio-decisions.ts
src/data/analyst-recommendations.ts
src/data/capacity.ts
```

If the project already has a different structure, adapt existing files instead of over-refactoring.

---

# Current UX Rules

## Must Feel

The product must feel:

* compact
* calm
* premium
* dark-first
* fast
* source-linked
* decision-led
* Linear-inspired
* operationally believable

---

## Must Avoid

Do not add:

* onboarding tours
* coach marks
* wizards
* chatbot UI
* fake AI streaming
* real AI provider integration
* real backend
* database setup
* auth
* RBAC
* billing
* settings pages
* notifications
* comments
* enterprise workflows
* Gantt charts
* financial reporting
* LP reporting
* capacity planning module
* complex resource scheduling

---

# Current Visual Rules

Keep the UI:

* restrained
* dark-first
* compact
* scannable
* consistent
* calm

Use:

* subtle borders
* muted surfaces
* compact cards
* consistent badges
* disciplined motion
* drawer-based detail views
* lightweight context banners

Avoid:

* rainbow dashboards
* oversized cards
* heavy gradients
* dramatic shadows
* pure black harshness
* playful colors
* decorative illustrations
* marketing-style hero sections

---

# Current Motion Rules

Motion should support orientation.

Use motion for:

* drawer open / close
* context banner appearance
* selected object highlight
* filtered navigation
* card hover states
* board drag and drop

Avoid:

* playful movement
* slow transitions
* fake AI typing
* fake AI streaming
* dramatic page transitions

Motion should help the user understand:

```txt
I came here because of this decision.
```

---

# Current Copy Rules

Use decision language.

Preferred terms:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
Missing Proof
Validation Confidence
Execution Progress
Decision Impact
Evidence Role
Connected Bet
Source Evidence
Studio Analyst
```

Avoid generic PM language:

```txt
Issue
Ticket
Task
Roadmap item
AI insight
Dashboard metric
Project
Epic
Priority
Type
```

Internal data names may remain if needed.

User-facing copy should use the preferred terms.

---

# Current Acceptance Criteria

This phase is complete when:

* Command Center explains the product within 30 seconds
* Command Center hero shows Narrow Reson8
* Evidence feels like source proof, not issue tracking
* Evidence rows/cards show Supports, Role, Impact, and Connected Bet
* Bets feel like validation decisions, not roadmap cards
* Bets show Recommended Move and Missing Proof
* Studio Analyst feels like reasoning layer, not chatbot AI
* Studio Analyst hero shows source evidence, capacity impact, and confidence
* Reson8 decision chain is fully connected
* Sentra and Internal Ops provide clear contrast
* context banners orient cross-screen navigation
* seeded data feels realistic and coherent
* copy uses decision language consistently
* no unnecessary complexity was added
* visual polish remains calm, compact, and Linear-inspired
* `npm run lint` passes
* `npm run build` passes

---

# Recommended Agent Prompt For This Phase

Use this prompt when starting implementation:

```txt
You are implementing the current Foundary clarity and demo-readiness phase.

Before coding, read:
- @context/current-feature.md
- @context/product-clarity-improvement-plan.md
- @context/features/feature-copy-hierarchy.md
- @context/features/feature-command-center-aha.md
- @context/features/feature-evidence-decision-linkage.md
- @context/features/feature-bets-decision-state.md
- @context/features/feature-studio-analyst-decision-first.md
- @context/features/feature-cross-screen-narrative.md
- @context/features/feature-seeded-demo-story.md
- @context/features/feature-polish-readiness.md

Then inspect the existing implementation and produce a short implementation plan before editing.

Your task is to improve product clarity, decision hierarchy, seeded data coherence, and cross-screen flow.

Do not add new major features.
Do not add backend, auth, settings, onboarding, chatbot UI, or enterprise workflows.

Focus on:
- Command Center Aha moment
- Evidence decision linkage
- Bets decision state
- Studio Analyst decision-first structure
- cross-screen context links
- seeded Reson8/Sentra/Internal Ops story
- final polish and readiness QA.

The product should feel like a decision-led studio command center, not a Linear clone.
```

---

# Final Reminder

Do not optimize for feature quantity.

Optimize for:

```txt
clarity
decision hierarchy
source linkage
demo coherence
operational realism
polish
```

The final reviewer impression should be:

> This person understands how AI-native venture studios should decide where to spend execution capacity.
