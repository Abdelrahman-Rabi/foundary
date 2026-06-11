# AGENTS.md — Foundary

## Purpose

This file provides root instructions for AI coding agents working on Foundary.

Foundary is a Linear-inspired studio operating intelligence layer for venture builders.

It is not a generic project management app.

It is not Mini Jira.

It is not a chatbot product.

The product helps venture studios decide where to spend time, talent, and capital by connecting:

```txt
Evidence
→ Bets
→ Validation Confidence
→ Capacity Impact
→ Recommended Move
→ Next Action
```

---

# Product North Star

Foundary helps venture studios prevent wasted execution.

The app should help operators decide what to:

* continue
* narrow
* pause
* kill
* staff up
* defer
* escalate for partner review

The UI should make this pattern visible:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

---

# Current Active Focus

Before making changes, always read:

```txt
@context/current-feature.md
```

That file defines the current implementation focus and should override older assumptions when there is conflict.

For the current phase, the active focus is:

```txt
Product clarity, Aha moment, cross-screen decision narrative, seeded demo story, and polish readiness.
```

Do not add new product scope unless explicitly requested.

---

# Required Context Files

Before coding, read these core files:

```txt
@context/project-overview.md
@context/project-specs.md
@context/current-feature.md
@context/implementation-roadmap.md
@context/coding-standards.md
@context/ai-development-rules.md
```

For the current clarity phase, also read:

```txt
@context/product-clarity-improvement-plan.md
@context/features/feature-copy-hierarchy.md
@context/features/feature-command-center-aha.md
@context/features/feature-evidence-decision-linkage.md
@context/features/feature-bets-decision-state.md
@context/features/feature-studio-analyst-decision-first.md
@context/features/feature-cross-screen-narrative.md
@context/features/feature-seeded-demo-story.md
@context/features/feature-polish-readiness.md
```

For data-related work, read:

```txt
@context/data/domain-models.md
@context/data/mock-data-strategy.md
@context/data/ai-behavior-rules.md
```

For visual, layout, navigation, or interaction work, read:

```txt
@context/features/feature-design-system.md
@context/features/feature-navigation.md
```

For older implementation areas, read as needed:

```txt
@context/features/feature-dashboard.md
@context/features/feature-issues.md
@context/features/feature-roadmap.md
@context/features/feature-ai-assistant.md
```

---

# Product Positioning

Foundary is:

```txt
A decision-led studio command center for venture builders.
```

It should feel like:

```txt
A calm operating system for high-velocity venture teams.
```

The product is inspired by Linear’s:

* speed
* focus
* calm UX
* compact workflows
* execution quality
* minimal friction

But Foundary adapts that model for venture studios by making the product:

* venture-aware
* evidence-backed
* confidence-aware
* capacity-sensitive
* decision-led

---

# User-Facing Navigation

Use these user-facing labels:

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

Internal route names, filenames, or existing variables may remain unchanged if renaming them creates unnecessary risk.

User-facing copy must use the updated product language.

---

# Main Demo Story

The seeded demo story is central to the product.

Use this narrative:

```txt
Reson8 is consuming product and engineering capacity, but retention evidence is weak.

Foundary recommends narrowing Reson8 instead of continuing broad buildout.

The recommendation is supported by creator retention evidence, a low-confidence validation bet, and high capacity pressure.

Narrowing Reson8 protects capacity for higher-confidence Sentra activation work.

Internal Ops remains stable and should not distract the studio from higher-leverage venture decisions.
```

---

# Required Ventures

Use exactly these seeded ventures:

```txt
Sentra
Reson8
Internal Ops
```

Their roles:

```txt
Reson8 → validation uncertainty with active execution and sunk-cost risk
Sentra → high-confidence growth opportunity with capacity strain
Internal Ops → stable studio leverage with contained scope
```

---

# Required Anchor Values

Preserve these values unless the entire seeded story is intentionally updated:

```txt
Reson8 validation confidence: 23%
Reson8 execution progress: 41%
Studio Analyst confidence: 82%
Sentra validation confidence: 78%
Internal Ops validation confidence: 71%
```

These values support the key product insight:

```txt
Execution progress is not the same as validation confidence.
```

---

# Required Primary Decision

The primary shared decision is:

```txt
Recommended Move: Narrow Reson8
```

Why:

```txt
Retention evidence is weak while product and engineering capacity are actively being consumed.
```

Next action:

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

Do not add a guided tour.

Do not add coach marks.

The UI itself should make this path obvious.

---

# Implementation Principles

## 1. Clarity Before Cleverness

The product must be understandable quickly.

Prefer clear decision language over abstract strategy language.

Use:

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
```

Avoid:

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

---

## 2. Build For Believable Sophistication

Perceived product maturity should come from:

* connected workflows
* realistic seeded data
* source-linked recommendations
* calm visual hierarchy
* disciplined motion
* contextual intelligence
* premium interaction quality

Not from:

* more features
* backend complexity
* enterprise workflows
* heavy configuration

---

## 3. Preserve Linear-Inspired Feel

The app should feel:

* compact
* calm
* fast
* dark-first
* scannable
* premium
* operational
* drawer-based
* low-friction

Avoid:

* Jira energy
* enterprise density
* admin-panel UI
* dashboard clutter
* noisy charts
* oversized cards
* flashy animations

---

## 4. AI Should Be Embedded, Not Chatbot-First

Studio Analyst should feel like:

```txt
an operating analyst
```

Not:

```txt
a chat assistant
```

Avoid:

* chat bubbles
* assistant avatars
* fake typing
* fake streaming
* “AI says” language
* prompt box as the main interaction
* playful AI visuals

Prefer:

* structured recommendations
* source evidence
* capacity tradeoffs
* confidence
* next actions

---

# Screen Responsibilities

## Command Center

Purpose:

```txt
Decision overview.
```

It should answer:

```txt
What should the studio focus on next?
```

Required:

* one dominant Recommended Move
* Reson8 as primary attention-needed venture
* clear Why
* source evidence
* capacity impact
* Inspect evidence CTA
* Open bet CTA

Do not let KPI cards dominate the screen.

---

## Evidence

Purpose:

```txt
Source proof.
```

It should answer:

```txt
What evidence supports or challenges the decision?
```

Required table direction:

```txt
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

Required visible fields:

* Supports
* Evidence Role
* Decision Impact
* Connected Bet
* Recommended Move
* Capacity Impact

Avoid generic issue-tracker language.

---

## Bets

Purpose:

```txt
Validation state.
```

It should answer:

```txt
What is the studio testing before committing more capacity?
```

Every Bet card should show:

* testing statement
* validation confidence
* execution progress
* recommended move
* missing proof
* linked evidence
* capacity impact

Keep:

```txt
Now / Next / Later
```

Do not add Gantt charts or timeline planning.

---

## Studio Analyst

Purpose:

```txt
Reasoning layer.
```

It should answer:

```txt
Why is this move recommended?
```

Required hero:

```txt
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

Do not build chatbot UI.

---

# Cross-Screen Link Rules

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

Use:

* filtered views
* selected drawers
* source links
* context banners
* highlighted source objects

Avoid:

* deep route trees
* new decision detail pages
* modal stacks
* guided tours
* manual search after navigation

Example context banner:

```txt
Showing evidence for: Narrow Reson8 · Creator Retention Signal
```

---

# Data Rules

Seeded data should include:

* ventures
* bets
* evidence items
* studio decisions
* analyst recommendations
* capacity signals

Recommended files if structure allows:

```txt
src/data/ventures.ts
src/data/bets.ts
src/data/evidence.ts
src/data/studio-decisions.ts
src/data/analyst-recommendations.ts
src/data/capacity.ts
```

If the current app already has a different mock-data structure, adapt existing files instead of over-refactoring.

Seeded data must make these truths visible:

* Reson8 is the clearest attention-needed venture.
* Sentra is promising but capacity constrained.
* Internal Ops is stable and contained.
* Reson8 has progress higher than validation confidence.
* Recommendations cite source evidence.
* Evidence links to Bets.
* Bets link to Evidence.
* Studio Analyst cites source objects.

---

# Technical Direction

Use the project’s existing stack and patterns.

Expected stack:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Zustand
* dnd-kit
* Recharts
* Framer Motion
* mocked/local data

Do not introduce backend infrastructure unless explicitly requested.

Do not add a real database unless explicitly requested.

Do not add real AI provider integration unless explicitly requested.

---

# Working Method

Before editing:

1. Inspect the existing implementation.
2. Identify relevant routes, components, stores, and data files.
3. Read the relevant context files.
4. Produce a short implementation plan.
5. Then make targeted changes.

While editing:

* prefer small, coherent changes
* preserve existing working patterns
* avoid unnecessary refactors
* do not rename internals unless needed
* keep user-facing copy aligned with product language
* update seeded data coherently
* maintain visual restraint

After editing:

* summarize files changed
* explain demo flow supported
* run required checks
* report known limitations

---

# Required Checks

Run:

```txt
npm run lint
npm run build
```

If checks fail because of your changes, fix them.

If checks fail due to pre-existing unrelated issues, report that clearly and separate it from your changes.

For documentation-only changes, run:

```txt
git diff --check
```

---

# Strict Anti-Patterns

Do not add:

* authentication
* RBAC
* billing
* settings pages
* notifications
* comments
* real-time collaboration
* real database
* real AI provider integration
* onboarding tours
* coach marks
* wizards
* finance / LP reporting
* cap table workflows
* resource scheduling
* Gantt charts
* enterprise portfolio management
* chatbot UI
* fake AI streaming
* complex configuration

Do not increase scope.

Make the existing experience clearer and more connected.

---

# Completion Report Format

When done, report:

```txt
1. Summary of changes made
2. Files changed
3. Demo flow now supported
4. Checks run and results
5. Known limitations or follow-up items
```

Do not give vague completion messages.

Be specific.

---

# Final Reviewer Impression Target

The final reviewer should think:

```txt
This person understands how AI-native venture studios should decide where to spend execution capacity.
```

Not:

```txt
This person built a nice Linear clone.
```
