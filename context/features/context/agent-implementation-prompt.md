# Agent Implementation Prompt — Foundary Clarity & Demo Readiness

## Purpose

Use this prompt to start an AI coding-agent implementation session for the current Foundary clarity and demo-readiness phase.

The goal is to improve the existing product so it clearly communicates:

> Foundary helps venture studios decide where to spend time, talent, and capital.

This is not a feature expansion task.

This is a product clarity, decision hierarchy, seeded data, cross-screen narrative, and polish task.

---

# Copy-Paste Prompt For Coding Agent

```txt
You are working on Foundary, a Linear-inspired studio operating intelligence layer for venture builders.

Foundary is NOT a generic project management app.
Foundary is NOT Mini Jira.
Foundary is NOT a chatbot product.

Foundary helps venture studios decide what to continue, narrow, pause, kill, staff up, or defer based on evidence, validation confidence, and shared team capacity.

Your current task is to implement the product clarity and demo-readiness phase.

Before coding, read these files:

- @context/current-feature.md
- @context/project-overview.md
- @context/project-specs.md
- @context/product-clarity-improvement-plan.md
- @context/features/feature-copy-hierarchy.md
- @context/features/feature-command-center-aha.md
- @context/features/feature-evidence-decision-linkage.md
- @context/features/feature-bets-decision-state.md
- @context/features/feature-studio-analyst-decision-first.md
- @context/features/feature-cross-screen-narrative.md
- @context/features/feature-seeded-demo-story.md
- @context/features/feature-polish-readiness.md
- @context/data/domain-models.md
- @context/data/mock-data-strategy.md
- @context/data/ai-behavior-rules.md

If your changes touch visual design, motion, layout, navigation, drawers, or interaction behavior, also read:

- @context/features/feature-design-system.md
- @context/features/feature-navigation.md

If your changes touch older implementation areas, also read:

- @context/features/feature-dashboard.md
- @context/features/feature-issues.md
- @context/features/feature-roadmap.md
- @context/features/feature-ai-assistant.md

---

# Implementation Mission

Improve the app so a first-time reviewer understands the product within 30 seconds.

The target Aha moment is:

Reson8 is moving, but proof is weak.
Foundary recommends narrowing the work before more capacity is wasted.
The recommendation is supported by evidence, a low-confidence bet, and capacity pressure.

The product should feel like a decision-led studio command center, not a Linear clone.

---

# Primary Product Pattern

Every major screen should support this pattern:

Recommended Move
Why
Evidence
Capacity Impact
Next Action

Use this pattern across:

- Command Center
- Evidence
- Bets
- Studio Analyst
- drawers
- cards
- context banners
- source links

---

# User-Facing Screen Names

Use these user-facing labels:

- Command Center
- Evidence
- Bets
- Studio Analyst

Avoid user-facing labels:

- Dashboard
- Issues
- Roadmap
- AI Assistant

Internal route or variable names may remain unchanged if refactoring them would create unnecessary risk.

User-facing UI copy must use the new language.

---

# Active Demo Story

Use this as the main seeded story:

Reson8 is consuming product and engineering capacity, but retention evidence is weak.

Foundary recommends narrowing Reson8 instead of continuing broad buildout.

The recommendation is supported by creator retention evidence, a low-confidence validation bet, and high capacity pressure.

Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.

Internal Ops remains stable and should not distract the studio from higher-leverage venture decisions.

---

# Required Ventures

Use exactly these ventures:

- Sentra
- Reson8
- Internal Ops

Their roles:

- Reson8: validation uncertainty with active execution and sunk-cost risk
- Sentra: high-confidence growth opportunity with capacity strain
- Internal Ops: stable studio leverage with contained scope

---

# Required Anchor Values

Preserve these values unless you intentionally update the whole demo story:

- Reson8 validation confidence: 23%
- Reson8 execution progress: 41%
- Studio Analyst confidence: 82%
- Sentra validation confidence: 78%
- Internal Ops validation confidence: 71%

These values support the key product insight:

Execution progress is not the same as validation confidence.

---

# Required Main Decision

The primary shared decision is:

Recommended Move: Narrow Reson8

Why:

Retention evidence is weak while product and engineering capacity are actively being consumed.

Next action:

Inspect creator retention evidence before expanding onboarding scope.

Capacity impact:

Narrowing Reson8 protects product and engineering capacity for higher-confidence Sentra activation work.

---

# Required Main Demo Flow

The product must support this flow:

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

Do not create a guided tour.
Do not add coach marks.
The UI itself should make the path obvious.

---

# Implementation Priority Order

Work in this order:

1. Inspect existing implementation.
2. Identify current routes, data files, stores, and components.
3. Produce a short implementation plan before editing.
4. Apply copy and hierarchy clarity changes.
5. Update seeded demo data.
6. Improve Command Center Aha moment.
7. Improve Evidence decision linkage.
8. Improve Bets decision state.
9. Improve Studio Analyst decision-first structure.
10. Add or improve cross-screen context links.
11. Add final polish only after hierarchy and data are coherent.
12. Run lint/build checks.

Do not start by polishing visuals if the decision hierarchy is still unclear.

---

# Command Center Requirements

Command Center must open with one dominant recommendation.

Required hero content:

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

Command Center should not feel like a KPI dashboard.

The first viewport should clearly answer:

- What should the studio do?
- Why?
- What evidence supports it?
- What capacity is affected?
- What is the next action?

---

# Evidence Requirements

Evidence should feel like source proof, not issue tracking.

Required table direction:

Evidence Item | Supports | Role | Status | Owner | Impact | Venture

Every row/card should show:

- Supports
- Evidence Role
- Decision Impact
- Venture
- Connected Bet where relevant

Use:

- Add Evidence
- Inspect evidence
- View source
- Open bet
- Decision Impact
- Evidence Role
- Connected Bet

Avoid user-facing:

- New Issue
- Open issue
- Ticket
- Priority
- Type
- Linked Roadmap

Evidence must support this flow:

Command Center → Inspect evidence → Evidence filtered to Reson8 + Creator Retention Signal

Show a context banner such as:

Showing evidence for: Narrow Reson8 · Creator Retention Signal

---

# Bets Requirements

Bets should feel like validation decisions, not roadmap cards.

Every Bet card should show:

- Testing statement
- Validation Confidence
- Execution Progress
- Recommended Move
- Missing Proof
- Linked Evidence
- Capacity Impact

The Reson8 bet must clearly show:

- Validation confidence: 23%
- Execution progress: 41%
- Recommended move: Narrow

Use this tension copy where appropriate:

Execution is moving, but validation confidence remains weak.

Keep Now / Next / Later columns.

Do not add Gantt charts.
Do not add timeline planning complexity.
Do not make execution progress visually more important than validation confidence.

---

# Studio Analyst Requirements

Studio Analyst must feel like the reasoning layer behind the studio decision.

It must not feel like a chatbot.

The first viewport should include one dominant recommendation:

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

Primary actions:

- Inspect evidence
- Open bet
- View capacity impact

Avoid:

- chat bubbles
- assistant avatar
- fake typing
- fake streaming
- “AI says”
- prompt box as the main interaction
- long generic AI paragraphs

---

# Cross-Screen Link Requirements

The product must feel systemic.

Required links:

- Command Center → Evidence
- Command Center → Bet
- Evidence → Bet
- Bets → Evidence
- Bets → Studio Analyst
- Studio Analyst → Evidence
- Studio Analyst → Bet

Use context banners when navigating from one screen to another.

Example:

Showing evidence for: Narrow Reson8 · Creator Retention Signal

Actions can include:

- Clear context
- Open bet
- Review reasoning

Relevant rows/cards should be highlighted after navigation when possible.

Avoid deep routing complexity.
Prefer existing routes, filtered views, drawers, selected states, and lightweight context state.

---

# Seeded Data Requirements

Seeded data should include:

- ventures
- bets
- evidence items
- studio decisions
- analyst recommendations
- capacity signals

Recommended files if structure allows:

- src/data/ventures.ts
- src/data/bets.ts
- src/data/evidence.ts
- src/data/studio-decisions.ts
- src/data/analyst-recommendations.ts
- src/data/capacity.ts

If the project already has another mock data structure, adapt the existing structure instead of over-refactoring.

Seeded data must make these truths visible:

- Reson8 is the clearest attention-needed venture.
- Sentra is promising but capacity constrained.
- Internal Ops is stable and contained.
- Reson8 has progress higher than validation confidence.
- Recommendations cite source evidence.
- Evidence links to Bets.
- Bets link to Evidence.
- Studio Analyst cites source objects.

---

# UX & Visual Rules

The UI must feel:

- compact
- calm
- premium
- dark-first
- fast
- source-linked
- decision-led
- Linear-inspired
- operationally believable

Use:

- subtle borders
- muted surfaces
- compact cards
- consistent badges
- disciplined motion
- drawer-based detail views
- lightweight context banners
- concise copy

Avoid:

- rainbow dashboards
- oversized cards
- heavy gradients
- dramatic shadows
- pure black harshness
- playful colors
- decorative illustrations
- marketing-style hero sections
- noisy charts
- enterprise admin UI

---

# Motion Rules

Use motion only to support orientation.

Good motion areas:

- drawer open / close
- context banner appearance
- selected object highlight
- filtered navigation
- card hover states
- board drag and drop

Avoid:

- playful movement
- slow transitions
- fake AI typing
- fake AI streaming
- dramatic page transitions

Motion should help the user understand:

I came here because of this decision.

---

# Copy Rules

Use decision language.

Preferred terms:

- Recommended Move
- Why
- Evidence
- Capacity Impact
- Next Action
- Missing Proof
- Validation Confidence
- Execution Progress
- Decision Impact
- Evidence Role
- Connected Bet
- Source Evidence
- Studio Analyst

Avoid generic PM language:

- Issue
- Ticket
- Task
- Roadmap item
- AI insight
- Dashboard metric
- Project
- Epic
- Priority
- Type

Internal data names may remain if changing them creates risk.

User-facing copy should use the preferred terms.

---

# Strict Anti-Patterns

Do NOT add:

- authentication
- RBAC
- billing
- settings pages
- notifications
- comments
- real-time collaboration
- real database
- real AI provider integration
- onboarding tours
- coach marks
- wizards
- finance / LP reporting
- cap table workflows
- resource scheduling
- Gantt charts
- enterprise portfolio management
- chatbot UI
- fake AI streaming
- complex configuration

Do not increase scope.

Make the existing experience clearer and more connected.

---

# Verification Checklist

Before finishing, verify:

- Command Center explains the product within 30 seconds.
- Command Center hero shows Narrow Reson8.
- Evidence feels like source proof, not issue tracking.
- Evidence rows/cards show Supports, Role, Impact, and Connected Bet.
- Bets feel like validation decisions, not roadmap cards.
- Bets show Recommended Move and Missing Proof.
- Studio Analyst feels like reasoning layer, not chatbot AI.
- Studio Analyst hero shows source evidence, capacity impact, and confidence.
- Reson8 decision chain is fully connected.
- Sentra and Internal Ops provide clear contrast.
- context banners orient cross-screen navigation.
- seeded data feels realistic and coherent.
- copy uses decision language consistently.
- no unnecessary complexity was added.
- visual polish remains calm, compact, and Linear-inspired.

---

# Required Checks

Run:

npm run lint
npm run build

If either fails, fix the errors before stopping.

If there are existing unrelated failures, report them clearly and separate them from changes you made.

---

# Expected Agent Response Format

After implementation, report back with:

1. Summary of changes made
2. Files changed
3. Demo flow now supported
4. Checks run and results
5. Any known limitations or follow-up items

Do not produce a vague completion message.

Be specific.
```

---

# Final Reminder For Agent

The goal is not to build more.

The goal is to make the product obvious.

The final reviewer impression should be:

> This person understands how AI-native venture studios should decide where to spend execution capacity.

Not:

> This person built a nice Linear clone.
