# Feature Specification - PLG Activation

## Purpose

PLG Activation makes Foundary understandable and useful for a first-time visitor
without requiring a sales demo, support call, onboarding tour, or explanatory
marketing layer.

The product should teach itself through:
- realistic demo data
- clear first-screen hierarchy
- contextual empty states
- obvious next actions
- venture-aware product language

This phase should show strong product management judgment by making Foundary
feel immediately discoverable while preserving its calm, compact, premium
operational identity.

---

# Product Goal

A new visitor should understand Foundary's value within 30 seconds:

| Question | Product Answer |
|---|---|
| What is this? | A venture execution workspace |
| Why does it matter? | It connects venture health, roadmap confidence, issues, and operational intelligence |
| What should I do first? | Follow the highest-signal next action |
| Can I use it for my own venture? | Create or start from a local venture context |

The experience should feel:

> "I can understand the product by using it."

NOT:

> "I need someone to explain this dashboard to me."

---

# Scope

## Included

- Improve the first-time dashboard impression.
- Tune seeded demo data into a coherent venture story.
- Add contextual next-best-action guidance across major surfaces.
- Improve empty states for clean/custom ventures.
- Clarify product copy so new visitors understand Foundary's mental model.
- Make venture creation and start-clean flows feel like intentional PLG entry
  points, not utilities hidden in the shell.
- Keep the experience fully frontend-first and local-first.

## Explicitly Excluded

- Product tours.
- Onboarding checklists.
- Support widgets.
- Chatbot onboarding.
- Marketing landing pages.
- Backend onboarding analytics.
- Account setup.
- Team invites.
- Lifecycle email flows.
- Billing or plans.
- Settings-heavy setup flows.

---

# Activation Principles

## 1. Show The Aha Moment Immediately

The seeded demo should open with enough operational signal to explain Foundary:
- venture health
- execution pressure
- roadmap confidence
- linked issue risk
- assistant recommendations

Avoid showing an empty or generic dashboard as the first experience.

## 2. Teach Through Product Objects

Use realistic ventures, roadmap items, issues, and AI signals to explain the
system.

Avoid instructional copy that says how the app works. The data and surface
composition should make the model obvious.

## 3. One Obvious Next Action

Every major surface should have a calm next-best-action pattern:
- inspect top risk
- create first issue
- create first roadmap initiative
- review assistant signal
- switch or create venture context

This should not become a wizard or task checklist.

## 4. Empty States Should Be Useful

Empty states should explain what belongs in that surface and offer one clear
action.

Example direction:

```txt
No execution issues in this venture yet.
Capture the first blocker, validation task, or delivery risk.
```

Avoid celebratory, playful, or generic empty-state language.

## 5. Keep PLG Inside The Product

PLG should feel like product clarity, not an onboarding overlay.

Prefer:
- inline contextual guidance
- better labels
- better hierarchy
- operational examples
- focused next actions

Avoid:
- walkthrough modals
- coach marks
- long help text
- tutorial banners

---

# Phase Plan

## Phase 13.1 - First Impression Audit

Goal:
Identify where a first-time visitor may feel lost, overloaded, or unsure what
Foundary is for.

Required audit areas:
- `/dashboard`
- venture switcher
- top bar workspace utilities
- seeded demo data
- custom venture empty states
- issues empty/list/board views
- roadmap empty/board views
- assistant signals

Output:
- concise implementation notes
- prioritized UX fixes
- no code changes unless explicitly scoped

Success criteria:
- clear list of activation friction points
- no broad redesign
- no new product systems invented

## Phase 13.2 - Demo Story And Data Coherence

Goal:
Make seeded data tell a believable venture operating story.

Required work:
- ensure each seeded venture has a distinct operational situation
- align issues, roadmap items, and AI insights around that story
- remove generic placeholder-feeling copy
- make the dashboard's first viewport communicate status, risk, and momentum

Success criteria:
- demo data feels interconnected
- dashboard reads like a live operating environment
- a reviewer can infer the product value without a walkthrough

## Phase 13.3 - Next Best Action Pattern

Goal:
Add a lightweight pattern that helps users decide what to do next.

Recommended surfaces:
- dashboard attention area
- empty custom venture dashboard
- issues empty state
- roadmap empty state
- assistant priority area

Rules:
- one primary next action per context
- action must connect to an existing workflow
- no onboarding checklist
- no gamified progress tracker
- no settings-style setup steps

Example actions:
- "Inspect top risk"
- "Create first issue"
- "Add first roadmap initiative"
- "Review confidence signal"
- "Start from a clean venture"

Success criteria:
- first-time users always have a clear next step
- experienced users are not slowed down
- the UI still feels compact and calm

## Phase 13.4 - Empty State Upgrade

Goal:
Make clean/custom venture states useful and product-defining.

Required surfaces:
- dashboard
- issues list and board
- roadmap board
- assistant

Rules:
- explain what belongs in the surface
- offer one direct action
- avoid fake risk or invented AI certainty
- keep copy short and operational

Success criteria:
- a user who starts clean knows how to build their first venture workspace
- empty states do not feel like dead ends
- no support or tutorial layer is required

## Phase 13.5 - Product Copy And Label Pass

Goal:
Sharpen language so the product feels venture-aware and PM-led.

Prefer:
- "Venture health"
- "Execution pressure"
- "Roadmap confidence"
- "Attention needed"
- "Operational signal"
- "Validation initiative"
- "Delivery risk"

Avoid:
- generic task-manager language
- enterprise reporting language
- playful onboarding language
- chatbot framing

Success criteria:
- labels reinforce Foundary's differentiated mental model
- copy is concise enough for repeated use
- the app feels more strategic without becoming verbose

## Phase 13.6 - Activation Verification

Goal:
Verify the product can be discovered without explanation.

Suggested checks:
- fresh local storage session opens to a useful demo state
- start-clean path leads to helpful empty states
- new venture creation leads to obvious first actions
- dashboard to issue/roadmap/assistant flow is understandable
- no activation UI blocks normal workflows

Success criteria:
- a first-time visitor can understand what Foundary does in one pass
- the product feels self-guided, not tutorial-driven
- existing power workflows remain fast

---

# Likely Files

```txt
src/data/ventures.ts
src/data/issues.ts
src/data/roadmap.ts
src/data/ai-insights.ts
src/features/dashboard/components/*
src/features/dashboard/hooks/use-dashboard-data.ts
src/features/issues/components/*
src/features/roadmap/components/*
src/features/assistant/components/*
src/components/shared/empty-state.tsx
src/components/app-shell/venture-switcher.tsx
src/components/app-shell/top-bar.tsx
src/components/app-shell/command-palette.tsx
context/current-feature.md
context/agent-handoff.md
```

Touch with care:
- dashboard metrics and assistant analysis depend on seeded data relationships
- empty state components may be shared across multiple surfaces
- command palette and top bar already carry workspace utilities

---

# Anti-Patterns

Do NOT:
- add a tutorial wizard
- add support/onboarding chat
- create a marketing landing page inside the app
- add onboarding analytics infrastructure
- turn venture setup into account setup
- add team, billing, permissions, or CRM fields
- make every surface explain itself with long text
- create a generic SaaS activation checklist

---

# Success Criteria

PLG Activation succeeds when:
- a new visitor understands Foundary from the first dashboard session
- seeded demo data communicates a coherent venture operating story
- clean/custom ventures guide users toward useful first actions
- empty states are educational without feeling instructional
- product copy feels venture-aware and PM-led
- no support, demo, onboarding tour, or chatbot explanation is required

The desired feeling is:

> "This product tells me where the venture stands and what to do next."

NOT:

> "This product has onboarding screens."
