# Project Overview - Foundary

## Project Identity

Foundary is a Linear-inspired studio command center that helps venture builders decide which ventures to continue, narrow, pause, stop, staff up, or defer based on evidence, validation confidence, and shared team capacity.

Foundary helps venture studios decide where to spend scarce time, talent, and capital across multiple ventures.

The system helps lean studio teams understand:

- which ventures need attention now
- which ventures are consuming capacity without enough evidence
- which validation checkpoints are weak or blocked
- which execution work proves, disproves, unblocks, de-risks, or only consumes capacity
- which team functions are overloaded across the portfolio
- what studio move should happen next

Foundary is intentionally optimized for:

- small elite venture teams
- async operating reviews
- rapid validation cycles
- scarce shared operator capacity
- evidence-based continue / narrow / pause / stop decisions
- operational clarity without enterprise process
- compact, calm, fast, Linear-inspired workflows

This is not a generic project management tool.

---

## Clear Product Promise

User-facing promise:

> Decide where your studio should focus next.

Strategic product promise:

> Foundary helps venture studios prevent wasted execution.

Expanded explanation:

> Foundary turns venture execution noise into evidence-backed studio decisions.

The product should be immediately understandable without a long verbal explanation.

Within 30 seconds, a first-time reviewer should understand:

- which venture needs attention
- why it needs attention
- what move the studio should make
- what evidence supports that move
- what capacity tradeoff is involved

---

## Current Product Clarity Goal

Foundary's strategy is strong, but the UI must make the value obvious faster.

The current improvement focus is Product Clarity and Aha Moment Improvement.

This means improving:

- first-time comprehension
- decision hierarchy
- user-facing copy
- screen-to-screen narrative
- source-linked evidence clarity
- Studio Analyst recommendation hierarchy
- seeded demo story coherence

The goal is not to add more features.

The goal is to make the current product easier to understand, easier to demo, and more obviously valuable.

For the full improvement plan, load:

```txt
context/product-clarity-improvement-plan.md
```

---

# Core Product Positioning

Foundary should feel like:

> A calm command center for deciding what deserves the studio's attention next.

The product combines:

- portfolio decision visibility
- validation checkpoint intelligence
- execution evidence across issues and roadmap work
- shared team capacity awareness
- embedded Studio Analyst recommendations

The system prioritizes:

- decisions over dashboards
- evidence over activity
- operator leverage over task volume
- validation confidence over roadmap theater
- clarity over configurability
- local-first continuity over backend infrastructure

---

# Product Spine

Foundary's internal product model is:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

This is the strategic model.

The user-facing UX should translate this into simpler questions:

```txt
What should we do?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

Every major product surface should help answer those questions.

---

## 1. Portfolio Decisions

The first product question is:

> Which venture deserves attention, intervention, or restraint this week?

The primary surface should make studio-level moves visible:

- continue
- narrow
- pause
- stop
- staff up
- defer
- partner review

Issues, bets, and analyst signals should support these moves instead of becoming disconnected task-management artifacts.

---

## 2. Validation Checkpoints

Each venture should be understood by lifecycle phase and current validation checkpoint.

Example phases:

- Explore
- Validate
- Build
- Scale

Each checkpoint should clarify:

- the assumption being tested
- required proof
- current confidence
- missing signal
- decision pressure
- next recommended move

Foundary should distinguish execution progress from validation confidence.

---

## 3. Execution Evidence

Issues and roadmap items are not generic delivery artifacts.

They are evidence-bearing execution objects linked to:

- assumptions
- validation checkpoints
- evidence signals
- venture bets
- operator effort
- capacity impact
- studio decision outcomes

An evidence item should help answer:

> Does this work prove, disprove, unblock, de-risk, or merely consume capacity?

A roadmap item should represent a venture bet or validation initiative, not a static planning object.

---

## 4. Team Capacity

Venture studios operate through shared builders and specialists.

Foundary should make fractional capacity visible across:

- product
- design
- engineering
- GTM
- partner / studio leadership time

The product should surface:

- overloaded functions
- venture-to-venture contention
- downstream impact of reallocating capacity
- execution work that is expensive relative to evidence quality

This should remain lightweight and operational, not a heavy scheduling engine.

---

## 5. Studio Analyst Recommendations

AI should behave like an embedded Studio Analyst.

It should:

- recommend studio moves
- explain missing proof
- detect sunk-cost risk
- flag team capacity contention
- connect execution activity to validation confidence
- summarize why a venture should continue, narrow, pause, stop, or receive more capacity

The AI is not a chatbot.

It should produce concise, structured, source-linked recommendations.

---

# Product Philosophy

## 1. Decisions Over Dashboards

Prioritize:

- recommended moves
- decision pressure
- intervention needs
- portfolio attention ranking
- evidence-backed recommendations

Avoid:

- passive reporting
- vanity metrics
- generic status summaries
- dashboards that require a meeting to interpret

---

## 2. Evidence Over Activity

Venture studios do not win by completing more tasks for weak ideas.

Foundary should show whether work is increasing confidence, reducing risk, or revealing that a venture should be narrowed, paused, or stopped.

Avoid treating:

- completed issues as automatic progress
- roadmap movement as automatic confidence
- velocity as proof of venture quality

---

## 3. Capacity Leverage Over Task Volume

The core studio constraint is scarce shared talent.

Foundary should show whether team capacity is being used against the highest-confidence opportunities or being trapped in low-evidence execution.

Avoid:

- single-team project assumptions
- unbounded backlog growth
- hidden cross-venture contention

---

## 4. Venture Awareness

The core differentiator from Linear is venture context awareness.

Everything should become venture-aware:

- portfolio decisions
- validation checkpoints
- evidence items
- venture bets
- command center metrics
- analyst recommendations
- health signals
- team capacity

---

## 5. Calm High-Performance UX

The UI should feel:

- focused
- elegant
- intentional
- lightweight
- operationally calm

Inspired by:

- Linear
- Vercel
- Raycast

Foundary should feel premium because it is coherent and decisive, not because it adds more systems.

---

# Core User Types

## Studio Partners / Operating Leads

Need:

- portfolio-level truth
- decision-ready venture status
- visibility into capacity contention
- confidence that scarce resources are being allocated well
- early warning when execution is outpacing evidence

## Venture Product Managers

Need:

- validation clarity
- prioritization confidence
- roadmap and evidence linkage to assumptions
- focused execution workflows
- clear next studio move

## Venture Builders / Studio Operators

Need:

- fractional workload visibility
- cross-venture contention awareness
- clarity on why work matters
- operational confidence
- fewer Slack-and-spreadsheet allocation fights

## Founders

Need:

- venture progress visibility
- evidence expectations
- delivery transparency
- clarity on why a venture is continuing, narrowing, pausing, or scaling

## AI-Native Engineers

Need:

- fast workflows
- low-friction execution
- clear validation context
- understanding of how technical work supports the venture decision

---

# Core Product Modules

## 1. Command Center

The primary portfolio decision surface.

It should show:

- top recommended move
- why the move matters now
- ventures needing attention
- validation risk
- team capacity pressure
- evidence behind the decision
- Studio Analyst reasoning

The Command Center should answer quickly:

```txt
Which venture needs attention?
Why?
What move should the studio make?
What evidence supports it?
What capacity is constrained?
```

The Command Center should feel like:

> the weekly studio operating meeting, already synthesized.

---

## 2. Venture Selector

Allows users to switch operational context between portfolio and individual ventures.

Examples:

- Sentra
- Reson8
- Internal Ops

Each venture has:

- lifecycle phase
- current validation checkpoint
- evidence items
- venture bets
- operator allocations
- decision status
- Studio Analyst signals

Users should be able to create a new local venture context that behaves like a first-class workspace object without turning Foundary into account setup, settings, or CRM software.

---

## 3. Evidence

The execution work layer.

Evidence items are the work behind each studio decision.

Each evidence item should show:

- what it supports
- its evidence role
- execution status
- owner
- decision impact
- venture context
- linked bet or checkpoint

Evidence roles include:

- Proving
- Disproving
- Unlocking
- De-risking
- Challenging
- Capacity Cost

The Evidence screen should remain familiar and Linear-inspired through:

- compact list view
- board view
- fast search
- filters
- drawers
- quick creation

But it should not feel like a generic issue tracker.

---

## 4. Bets / Validation Initiatives

The strategic validation layer.

Bets are the venture initiatives the studio is testing before committing more time, talent, or capital.

Each bet should show:

- what is being tested
- validation confidence
- execution progress
- recommended move
- missing proof
- evidence count
- capacity impact where relevant

A bet should help answer:

> Should the studio continue, narrow, pause, stop, staff up, defer, or review this initiative?

Progress should not overpower confidence.

Execution progress is not the same as validation confidence.

---

## 5. Team Capacity

A lightweight shared-capacity layer.

Includes:

- function-level capacity
- venture allocation
- contention warnings
- downstream impact notes
- over-capacity signals

This should be believable and useful without becoming enterprise resource planning.

---

## 6. Studio Analyst

Embedded operational intelligence layer.

Supported behaviors:

- recommend studio moves
- summarize missing proof
- detect execution and sunk-cost risks
- identify missing validation signals
- flag capacity contention
- explain capacity-versus-confidence tradeoffs
- link recommendations back to source evidence and bets

Studio Analyst should lead with the highest-leverage recommendation before showing supporting signals.

AI outputs should feel:

- concise
- contextual
- operational
- evidence-backed
- believable
- source-linked

The Studio Analyst is not a chat-first assistant.

---

# Global Decision Pattern

Every major screen should support this compact pattern:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

This pattern should appear through hierarchy, cards, drawers, labels, or source links.

Do not add tours or tutorial overlays to explain the product.

The product should explain itself through the work.

---

# UX Principles

## Must Feel

- fast
- calm
- focused
- intelligent
- lightweight
- premium
- decision-ready
- studio-native
- Linear-inspired

## Must Avoid

- Jira energy
- enterprise density
- spreadsheet feeling
- heavy configuration
- cluttered dashboards
- admin-panel UX
- generic portfolio reporting
- chatbot-first AI
- onboarding-tour dependency

---

# Navigation Philosophy

Navigation should feel:

- stable
- always available
- unobtrusive
- low cognitive load

Primary navigation:

- Command Center
- Evidence
- Bets
- Studio Analyst

The global venture switcher should always remain accessible.

Route names may evolve gradually from the existing app structure, but the product meaning should move toward studio decisions, evidence, bets, capacity, and analyst recommendations.

---

# Visual Direction

## Design Language

- dark-first
- compact layouts
- restrained motion
- subtle borders
- modern builder aesthetic
- high information clarity
- calm operational density

## Interaction Style

Prefer:

- drawers over page reloads
- inline editing
- hover actions
- fast transitions
- keyboard-friendly patterns
- compact decision cards
- evidence drill-downs
- source-linked actions

Avoid:

- marketing sections inside the app
- oversized hero treatment in product routes
- tutorial overlays
- settings-style configuration panels
- visual noise

---

# Technical Philosophy

This project optimizes for:

> believable studio operating intelligence.

Not:

- backend realism
- enterprise architecture
- infrastructure complexity
- real multi-tenant security
- real finance or cap-table systems

Priority should be:

1. product clarity
2. product coherence
3. decision quality
4. operational realism
5. UX quality
6. interaction polish
7. contextual AI behavior

---

# Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- dnd-kit
- Recharts
- Framer Motion

Data layer should remain:

- mocked
- lightweight
- frontend-driven
- browser-persisted for local workspace continuity
- capable of holding custom local venture contexts
- capable of modeling checkpoints, evidence, decisions, bets, and capacity without backend infrastructure

---

# AI-Assisted Development Philosophy

AI should be used for:

- acceleration
- scaffolding
- repetitive UI generation
- utility generation
- state scaffolding
- seeded data expansion

Humans should control:

- product decisions
- UX hierarchy
- strategic framing
- architecture direction
- final polish
- restraint

---

# Current Development Priorities

The current improvement cycle should follow:

1. Copy and hierarchy clarity pass
2. Command Center Aha redesign
3. Evidence decision linkage
4. Bets decision-state upgrade
5. Studio Analyst decision-first restructure
6. Cross-screen narrative and click path
7. Seeded story and demo data tuning
8. Final polish and Linear-inspired submission readiness

Lower priority:

- authentication
- notifications
- permissions
- backend infrastructure
- real scheduling optimization
- real finance / cap-table workflows
- production deployment complexity

---

# Anti-Goals

Do not:

- build Mini Jira
- create enterprise workflows
- add excessive settings
- build RBAC systems
- create dense reporting dashboards
- overcomplicate AI
- simulate real LLM infrastructure
- add unnecessary backend complexity
- build full multi-tenant security
- build real bill-back or cap-table systems
- prioritize feature quantity over product coherence
- add onboarding tours or coach marks
- create chatbot-style AI
- add heavy capacity planning workflows

---

# Success Criteria

The final product should make reviewers feel:

> This person understands how venture studios decide where to spend attention, talent, and capital.

Not:

> They built a nice frontend.

Foundary succeeds when a studio operator can open it and understand:

- which venture needs attention
- why it needs attention
- which execution work is evidence
- which capacity is constrained
- which studio move should happen next

Foundary also succeeds when the first-time reviewer can understand the core demo story without a long explanation:

```txt
Reson8 should be narrowed because validation is weak and capacity is being consumed.
Sentra is promising but constrained by shared capacity.
Internal Ops is stable and should not distract the studio.
```

---

# Final Product North Star

Foundary should feel like:

> A calm, intelligent, Linear-inspired command center for preventing wasted execution.

Every implementation decision should reinforce:

- product clarity
- decision clarity
- venture awareness
- validation confidence
- execution evidence
- capacity leverage
- AI-native studio reasoning
- strategic simplicity
- premium interaction quality
