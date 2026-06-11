# AI Agent Execution Rules - Foundary

## Purpose

This document defines how AI coding agents should work on Foundary.

It exists to prevent:

* overbuilding
* product drift
* generic project-management behavior
* Mini Jira complexity
* inconsistent UI decisions
* unnecessary backend work
* chatbot-style AI
* weak first-time product clarity

Foundary is currently in the Product Clarity and Aha Moment Improvement phase.

The agent's job is not to invent a new product direction.

The agent's job is to implement the existing product clarity plan with discipline, restraint, and high UI quality.

---

# 1. Core Product Rule

Foundary is a Linear-inspired studio command center for venture builders.

It helps venture studios decide which ventures to:

* continue
* narrow
* pause
* stop
* staff up
* defer
* escalate for partner review

based on:

* evidence
* validation confidence
* shared team capacity
* Studio Analyst recommendations

The product should help venture studios prevent wasted execution.

The simplest UI-facing promise is:

> Decide where your studio should focus next.

---

# 2. Current Implementation Focus

The current phase is:

> Product Clarity and Aha Moment Improvement

This phase improves:

* first-time comprehension
* Aha moment speed
* decision hierarchy
* user-facing copy
* screen-to-screen narrative
* evidence linkage
* seeded demo story coherence

The goal is not to add more product areas.

The goal is to make the current product easier to understand, easier to demo, and more obviously valuable.

---

# 3. Required Context Loading Order

Before implementing, always read:

```txt
context/current-feature.md
context/product-clarity-improvement-plan.md
context/project-overview.md
context/project-specs.md
context/strategy/studio-operating-intelligence.md
```

Then read only the feature-specific file for the current task.

For example:

## Copy and hierarchy work

```txt
context/features/feature-copy-hierarchy.md
```

## Command Center work

```txt
context/features/feature-command-center-aha.md
context/data/seeded-demo-story.md
```

## Evidence work

```txt
context/features/feature-evidence-decision-linkage.md
context/data/domain-models.md
```

## Bets work

```txt
context/features/feature-bets-decision-state.md
context/data/domain-models.md
context/data/seeded-demo-story.md
```

## Studio Analyst work

```txt
context/features/feature-studio-analyst-decision-first.md
context/data/ai-behavior-rules.md
context/data/seeded-demo-story.md
```

## Cross-screen narrative work

```txt
context/features/feature-cross-screen-narrative.md
context/data/seeded-demo-story.md
```

## Final QA work

```txt
context/qa/final-review-checklist.md
```

Do not load every feature file by default unless the user explicitly asks for a full audit.

---

# 4. Global UX Rule

Every major screen should support the same decision pattern:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

This pattern should appear through:

* page hierarchy
* cards
* source links
* drawers
* action labels
* supporting panels
* seeded data

Do not solve clarity using:

* onboarding tours
* coach marks
* tutorial overlays
* long explanatory modals
* marketing-style hero sections inside the app

The product should explain itself through the work.

---

# 5. Product Feel Rules

Foundary must remain:

* compact
* calm
* fast
* Linear-inspired
* dark-first
* local-first
* decision-led
* evidence-backed
* premium but restrained
* mocked but believable
* strategically clear

The UI should feel like serious operational software for a small elite venture studio.

It should not feel like:

* Jira
* ClickUp
* Monday.com
* an enterprise admin panel
* a BI dashboard
* a chatbot product
* an investor reporting tool
* a resource planning system

---

# 6. Implementation Philosophy

Prefer:

* copy improvements
* hierarchy improvements
* existing component adaptation
* existing route reuse
* lightweight derived fields
* existing stores and selectors
* compact metadata
* drawers instead of new pages
* source links instead of deep navigation
* mocked but coherent data
* local-first behavior

Avoid:

* new routes unless explicitly required
* new product areas
* heavy state systems
* backend APIs
* real databases
* authentication
* RBAC
* billing
* settings-heavy UX
* real AI provider integration
* fake infrastructure sophistication
* enterprise workflow engines

Always optimize for:

> believable studio operating intelligence with minimum implementation waste.

---

# 7. Scope Control Rules

Do not add features just because they seem useful.

Before adding anything, ask whether it strengthens one of these goals:

```txt
Does it make the product easier to understand?
Does it make the recommended move clearer?
Does it connect evidence to a decision?
Does it clarify capacity tradeoffs?
Does it improve the demo story?
Does it preserve the Linear-inspired feel?
```

If the answer is no, do not add it.

---

# 8. Naming and Copy Rules

Use simple decision language in the UI.

## Preferred labels

Use:

```txt
Recommended Move
Ventures Needing Attention
Validation Checkpoints
Evidence
Evidence Item
Supports
Evidence Role
Missing Proof
Team Capacity
Urgent Decisions
Bets Losing Confidence
Studio Analyst
View Evidence
Open Bet
Inspect Reasoning
Review Source
Add Evidence
Add Bet
```

## Avoid heavy or abstract labels

Avoid:

```txt
Studio Operating Intelligence Layer
Portfolio Intelligence Graph
Operator Capacity Framework
Execution Signal Matrix
AI Chat
AI says
Portfolio Analytics
Strategic Graph
Global Signal Engine
```

The product note and README can carry deeper strategy.

The app UI should help users act quickly.

---

# 9. Route Meaning Rules

Existing routes can remain.

Do not rename routes unless explicitly scoped.

Product meaning should be:

```txt
/dashboard  -> Command Center
/issues     -> Evidence
/roadmap    -> Bets / Validation Initiatives
/assistant  -> Studio Analyst
```

The route path may stay old.

The UI meaning should be updated.

---

# 10. Command Center Rules

The Command Center is the most important first impression.

It should answer within 30 seconds:

```txt
Which venture needs attention?
Why?
What move should the studio make?
What evidence supports it?
What capacity is constrained?
```

The first viewport should make the top recommended move obvious.

Use this pattern:

```txt
Recommended Move: Narrow Reson8

Why now:
Reson8 is consuming product and engineering capacity, but retention evidence is still weak.

Studio decision:
Pause broad buildout. Continue only the retained-creator threshold experiment.

Supporting signals:
- Validation confidence
- Capacity pressure
- Missing proof

Primary action:
Inspect evidence
```

Do not make the Command Center a generic KPI dashboard.

Supporting panels should help explain the hero decision, not compete with it.

---

# 11. Evidence Rules

The Evidence screen should not feel like issues renamed to evidence.

Every evidence item should answer:

> Evidence for what decision?

Use this visible table direction:

```txt
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

Every evidence item should show:

* what it supports
* evidence role
* status
* owner
* decision impact
* venture context

Evidence roles should include:

```txt
Proving
Disproving
Unlocking
De-risking
Challenging
Capacity Cost
```

Board cards should include compact metadata such as:

```txt
Supports: Creator Retention Signal
Role: Challenging
Decision impact: May force Narrow
```

Evidence drawers should answer:

```txt
What decision does this support?
What is this trying to prove, disprove, unlock, de-risk, challenge, or reveal?
Which bet or checkpoint is connected?
What is the capacity impact?
What is the next action?
```

Keep the list and board fast, compact, and Linear-inspired.

---

# 12. Bets Rules

Bets are not generic roadmap cards.

Bets are venture initiatives the studio is testing before committing more time, talent, or capital.

Every bet should answer:

```txt
What are we testing?
How confident are we?
What proof is missing?
What should the studio do next?
```

Each bet card should include:

* venture
* testing statement
* confidence
* progress
* recommended move
* missing proof
* evidence count
* capacity impact when relevant

Important product rule:

> Execution progress is not the same as validation confidence.

When progress is high but confidence is weak, expose the gap.

Example:

```txt
Execution is moving, but validation confidence remains weak.
```

Do not make Bets feel like a standard project roadmap.

---

# 13. Studio Analyst Rules

Studio Analyst is not a chatbot.

It is a source-linked decision-support layer.

The page should lead with a dominant recommendation before showing the feed.

Use this structure:

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

Avoid:

* chat bubbles
* assistant avatars
* fake typing
* fake streaming
* generic AI says language
* long conversational responses
* glowing AI effects

Prefer:

* structured analyst blocks
* recommended moves
* source-linked reasoning
* evidence-backed explanation
* capacity tradeoff explanation

---

# 14. Seeded Story Rules

Seeded data must tell a clear studio operating story.

The default demo story should be:

## Sentra

Promising growth opportunity with capacity strain.

Should show:

* stronger validation confidence
* activation or growth upside
* capacity bottleneck
* recommended move may be Continue, Staff up, or Protect capacity

## Reson8

Weak validation with active execution and sunk-cost risk.

Should show:

* weak retention evidence
* active product or engineering work
* low or declining confidence
* high decision pressure
* recommended move should be Narrow or Pause

## Internal Ops

Stable studio leverage with contained scope and freed capacity.

Should show:

* stable confidence
* low risk
* contained work
* reduced capacity pressure
* recommended move should be Continue or Defer expansion

A first-time reviewer should infer:

```txt
Reson8 should be narrowed because validation is weak and capacity is being consumed.
Sentra is promising but constrained by shared capacity.
Internal Ops is stable and should not distract the studio.
```

---

# 15. Cross-Screen Narrative Rules

The product should demo as one connected decision system.

Primary flow:

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

Strengthen links between:

```txt
Command Center decision -> Evidence items
Evidence item -> Supported bet
Bet -> Studio Analyst reasoning
Studio Analyst signal -> Source evidence / bet
```

Prefer:

* source links
* filtered views
* drawers
* compact CTAs

Avoid:

* deep detail routes
* heavy modal stacks
* multi-step guided flows

---

# 16. UI Quality Rules

The UI must feel:

* compact
* premium
* calm
* fast
* focused
* readable
* restrained
* operational

Use:

* subtle borders
* compact cards
* clear typography
* restrained badges
* dark-first surfaces
* responsive hover states
* disciplined motion

Avoid:

* excessive gradients
* loud colors
* oversized cards
* playful gamification
* heavy shadows
* decorative AI effects
* cluttered metadata
* dashboard noise

---

# 17. Motion Rules

Motion should support clarity, not entertainment.

Use motion for:

* drawer transitions
* hover feedback
* drag and drop
* filtering updates
* venture switching
* skeleton loading

Motion should be:

* subtle
* fast
* responsive
* intentional

Avoid:

* flashy transitions
* cinematic animation
* playful bounce effects
* slow choreography
* excessive page motion

---

# 18. State and Data Rules

Use local-first mocked data.

Use Zustand where state is needed.

Prefer:

* existing stores
* derived selectors
* lightweight data additions
* deterministic seeded data
* browser persistence where already supported

Avoid:

* backend APIs
* real databases
* fake server abstractions
* overengineered state machines
* complex normalization unless necessary
* large rewrites without need

When evolving data models, preserve existing interactions unless the current task explicitly scopes a breaking change.

---

# 19. Technical Rules

Before editing code:

1. inspect existing file structure
2. identify current components and stores
3. reuse existing patterns where possible
4. make the smallest coherent change
5. avoid unrelated refactors

During implementation:

* keep TypeScript strict and readable
* avoid unnecessary abstractions
* prefer composable components
* keep components focused
* avoid duplicating business logic
* keep UI copy centralized when reasonable
* preserve existing working behavior

Do not introduce a dependency unless clearly required.

---

# 20. Verification Rules

For documentation-only changes, run:

```txt
git diff --check -- <changed-files>
```

For implementation changes, run:

```txt
npm run lint
npm run build
```

If either command fails, fix the issue before considering the task complete.

If the repo uses different scripts, inspect `package.json` and use the closest available verification commands.

For UI work, manually check the affected route in the browser if available.

---

# 21. Final Review Checklist For Any Change

Before completing any task, verify:

```txt
Did this improve product clarity?
Did this preserve the compact, calm, Linear-inspired feel?
Did this make the recommended move clearer?
Did this connect work to evidence, bets, capacity, or analyst reasoning?
Did this avoid backend/enterprise complexity?
Did this avoid chatbot-style AI?
Did this preserve existing local-first behavior?
Did this keep the demo story coherent?
```

If the answer is no, revise.

---

# 22. Absolute Anti-Patterns

Never introduce:

* Mini Jira complexity
* enterprise workflow engines
* noisy dashboards
* chatbot-first AI
* fake backend sophistication
* excessive abstraction
* settings-heavy UX
* onboarding tours
* coach marks
* workflow bureaucracy
* finance workflows
* LP reporting
* cap-table workflows
* resource planning bureaucracy
* timesheets
* scheduling systems
* permissions systems
* billing systems
* CRM detail routes

Foundary should remain lightweight, local-first, fast, and demo-optimized.

---

# 23. Final Agent Mission

Your mission is to make Foundary easier to understand without making it heavier.

Optimize for:

```txt
clarity
hierarchy
coherence
restraint
source-linked reasoning
venture awareness
evidence-backed decisions
premium execution quality
```

The product should make reviewers feel:

> This person understands how venture studios decide where to spend attention, talent, and capital.

Not:

> They built a nice frontend.

Every implementation decision should reinforce that outcome.
