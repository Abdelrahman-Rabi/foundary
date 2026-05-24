# AI Development Rules — Foundary

## Purpose

This document defines:
- AI development behavior
- implementation workflow rules
- architectural constraints
- interaction quality expectations
- collaboration standards for AI coding agents

The goal is to ensure AI agents:
- generate consistent code
- preserve product philosophy
- avoid overengineering
- maintain UX quality
- reinforce venture-aware operational workflows

This project is NOT a generic CRUD application.

It is:
> a calm AI-native venture execution platform.

Every implementation decision should reinforce that identity.

---

# Core AI Development Philosophy

## AI Is An Accelerator

AI should accelerate:
- scaffolding
- repetitive implementation
- UI composition
- utility generation
- state wiring

Humans remain responsible for:
- product thinking
- UX hierarchy
- architectural direction
- interaction quality
- strategic decisions
- polish and restraint

---

# Core Product Understanding

Before implementing anything, the AI agent must understand:

Foundary is:
- venture-aware
- operationally calm
- outcome-oriented
- AI-native
- focused on lean execution

The system should feel:
- fast
- focused
- lightweight
- strategically intelligent

The system should NOT feel:
- enterprise-heavy
- process-driven
- cluttered
- over-configured
- Jira-like

---

# Most Important Product Rule

DO NOT accidentally build:
> Mini Jira.

This is the single most important implementation constraint.

Avoid:
- excessive workflows
- dense admin UI
- enterprise settings
- overcomplicated permissions
- configuration-heavy experiences
- operational bureaucracy

Favor:
- simplicity
- clarity
- speed
- continuity
- low-friction execution

---

# Required AI Workflow

The following workflow should be followed for ALL implementation tasks.

---

# 1. Understand Context First

Before implementing:
- read relevant context files
- understand feature scope
- understand UX expectations
- understand architectural constraints

Minimum required context:

```txt
@context/project-overview.md
@context/project-specs.md
@context/coding-standards.md
@context/current-feature.md
```

If working on a specific feature:
also read corresponding:
```txt
@context/features/*
```

---

# 2. Do NOT Implement Blindly

Before coding:
- understand WHY the feature exists
- understand HOW it supports venture workflows
- understand WHAT experience it should create

Do NOT optimize only for:
- technical correctness

Optimize for:
- operational realism
- interaction quality
- strategic coherence

---

# 3. Prefer Small Iterative Changes

Implement:
- small
- reviewable
- isolated improvements

Avoid:
- massive uncontrolled rewrites
- unrelated refactors
- speculative abstractions

---

# 4. Stabilize Before Expanding

Before adding complexity:
ensure:
- layouts are stable
- spacing is coherent
- interactions feel polished
- architecture remains clean

Do NOT stack complexity onto unstable foundations.

---

# Development Workflow

## Standard Workflow

For every feature/fix:

```txt
1. Read context
2. Update current-feature.md
3. Create feature branch
4. Implement incrementally
5. Verify behavior visually
6. Run build validation
7. Refine interactions
8. Review generated output
9. Commit only after approval
10. Merge after validation
```

---

# Branching Rules

## Required Branch Naming

```txt
feature/[feature-name]
fix/[fix-name]
refactor/[scope]
```

Examples:
```txt
feature/dashboard-shell
feature/roadmap-drawer
fix/issue-dnd-state
```

---

# Commit Rules

## NEVER Commit Automatically

Always ask before committing.

---

## Commit Standards

Use conventional commits:

```txt
feat:
fix:
refactor:
chore:
style:
```

---

## Keep Commits Focused

One commit should represent:
> one logical improvement.

Avoid:
- mixed-purpose commits
- giant unstable commits

---

# Architecture Rules

## Respect Existing Structure

Do NOT:
- reorganize architecture randomly
- rename files unnecessarily
- introduce competing patterns

Preserve:
- established conventions
- feature structure
- state organization

---

## Avoid Premature Abstractions

Do NOT create:
- generic framework systems
- plugin architectures
- unnecessary factories
- enterprise layering

Prefer:
- explicitness
- readability
- straightforward composition

---

## Prefer Composition Over Complexity

Prefer:
- small components
- reusable primitives
- modular layouts

Avoid:
- giant monolithic components
- deeply nested logic
- hidden abstractions

---

# UI & UX Rules

## UX Quality Is Critical

This project is heavily evaluated on:
- interaction quality
- product taste
- calm UX
- operational clarity

AI agents must prioritize:
- spacing
- hierarchy
- readability
- motion discipline
- interaction continuity

---

# Interaction Philosophy

Prefer:
- drawers
- hover actions
- inline editing
- low-friction workflows
- fast transitions

Avoid:
- modal overload
- page refresh workflows
- excessive confirmations

---

# Motion Rules

Motion should feel:
- subtle
- intentional
- premium
- restrained

Avoid:
- flashy animation
- exaggerated motion
- excessive transitions

---

# Dashboard Rules

Dashboard should feel:
- executive-readable
- strategically informative
- calm
- focused

Avoid:
- noisy analytics
- dense enterprise dashboards
- excessive chart usage

---

# AI Assistant Rules

## AI Assistant Philosophy

The assistant should feel:
> embedded operational intelligence.

NOT:
> chatbot entertainment.

---

## Avoid

Do NOT implement:
- avatars
- typing indicators
- fake streaming
- conversational gimmicks
- assistant personalities

---

## Prefer

Use:
- insight cards
- recommendation panels
- risk summaries
- contextual operational analysis

---

# Data Rules

## Mocked Data Only

Use:
- local JSON
- seeded datasets
- deterministic mock data

Do NOT implement:
- real databases
- API infrastructure
- backend persistence
- authentication systems

---

## Mock Data Must Feel Real

Data should feel:
- operationally believable
- interconnected
- strategically coherent

Relationships should exist between:
- ventures
- roadmap items
- issues
- AI insights

---

# Code Generation Rules

## Generate Minimal Necessary Code

Do NOT:
- generate speculative systems
- add unused utilities
- create unnecessary abstractions

Generate:
- focused implementation only

---

## Keep Components Focused

Each component should have:
> one clear responsibility.

Split large components aggressively.

---

## Keep Functions Readable

Prefer:
- explicit naming
- small functions
- understandable flow

Avoid:
- over-condensed logic
- deeply nested conditions
- premature optimization

---

# Refactoring Rules

## Do NOT Refactor Unrelated Code

Only refactor when:
- necessary for current feature
- fixing architectural instability
- improving maintainability directly tied to task

---

## Preserve Existing UX Quality

Never degrade:
- spacing
- transitions
- interaction continuity
- layout stability

while refactoring.

---

# Validation Rules

## Always Validate Before Completion

Before considering work complete:

### Must Verify
- build passes
- no TypeScript errors
- no lint issues
- interactions work correctly
- responsive behavior remains stable

---

# Manual Quality Review Required

Always review:
- visual hierarchy
- spacing consistency
- component alignment
- motion quality
- interaction smoothness

Do NOT trust generated output blindly.

---

# When Stuck

If blocked after:
> 2–3 meaningful attempts

STOP.

Do NOT:
- continue random experimentation
- introduce hacks
- create unstable workarounds

Instead:
- explain issue clearly
- describe attempted approaches
- propose safest next step

---

# Anti-Patterns

## NEVER INTRODUCE

- Mini Jira complexity
- enterprise workflows
- settings-heavy UX
- fake backend sophistication
- unnecessary state complexity
- giant global stores
- over-abstraction
- noisy dashboards
- chatbot-first AI
- excessive animations

---

# AI Decision Hierarchy

When uncertain, prioritize in this order:

1. Product clarity
2. UX quality
3. Interaction continuity
4. Architectural simplicity
5. Maintainability
6. Speed of implementation

NOT:
- technical cleverness

---

# Success Criteria

The AI agent should help produce a product that feels:

- calm
- modern
- strategically intelligent
- operationally believable
- premium
- venture-aware
- AI-native

The final experience should make reviewers feel:

> "This product understands how modern venture studios operate."

NOT:

> "This is another generic project management clone."