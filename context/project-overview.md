# Project Overview - Foundary

## Project Identity

Foundary is a studio operating intelligence layer for venture studios deciding
where to spend scarce time, talent, and capital across multiple ventures.

The system helps lean studio teams understand:
- which ventures need intervention
- which ventures are consuming capacity without enough evidence
- which validation gates are weak or blocked
- which execution work proves or disproves venture progress
- which operators or functions are overloaded across the portfolio
- what studio decision should happen next

Foundary is intentionally optimized for:
- small elite venture teams
- async operating reviews
- rapid validation cycles
- scarce shared operator capacity
- evidence-based continue / narrow / pause / kill decisions
- operational clarity without enterprise process

This is NOT a generic project management tool.

---

# Core Product Positioning

Foundary should feel like:

> "A calm command center for deciding what deserves the studio's attention next."

The product combines:
- portfolio decision visibility
- validation-gate intelligence
- execution evidence across issues and roadmap work
- shared operator capacity awareness
- embedded studio analyst recommendations

The system prioritizes:
- decisions over dashboards
- evidence over activity
- operator leverage over task volume
- validation confidence over roadmap theater
- clarity over configurability
- local-first continuity over backend infrastructure

Foundary should help studios prevent wasted execution.

---

# Product Spine

Foundary's product model is:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

## 1. Portfolio Decisions

The first product question is:

> Which venture deserves attention, intervention, or restraint this week?

The primary surface should make studio-level decisions visible:
- continue
- narrow
- pause
- kill
- staff up
- defer
- escalate for partner review

Issues, roadmap items, and AI signals should support these decisions instead of
becoming disconnected task-management artifacts.

## 2. Validation Gates

Each venture should be understood by lifecycle phase and current validation
gate.

Example phases:
- Explore
- Validate
- Build
- Scale

Each gate should clarify:
- the assumption being tested
- required evidence
- current confidence
- missing signal
- decision pressure
- next studio move

Foundary should distinguish execution progress from validation progress.

## 3. Execution Evidence

Issues and roadmap items are not generic delivery artifacts.

They are execution evidence linked to:
- assumptions
- validation gates
- evidence signals
- roadmap bets
- operator effort
- capacity impact
- studio decision outcomes

An issue should help answer:

> Does this work prove, disprove, unblock, or merely consume capacity?

A roadmap item should represent a venture bet or validation initiative, not a
static planning object.

## 4. Operator Capacity

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

## 5. Studio Analyst Recommendations

AI should behave like an embedded studio analyst.

It should:
- recommend studio moves
- explain evidence gaps
- detect sunk-cost risk
- flag operator contention
- connect execution activity to validation confidence
- summarize why a venture should continue, narrow, pause, kill, or receive more
  capacity

The AI is NOT a chatbot.

---

# Product Philosophy

## 1. Decisions Over Dashboards

Prioritize:
- decision pressure
- intervention needs
- portfolio attention ranking
- evidence-backed recommendations

Avoid:
- passive reporting
- vanity metrics
- generic status summaries
- dashboards that require a meeting to interpret

## 2. Evidence Over Activity

Venture studios do not win by completing more tasks for weak ideas.

Foundary should show whether work is increasing confidence, reducing risk, or
revealing that a venture should be narrowed, paused, or killed.

Avoid treating:
- completed issues as automatic progress
- roadmap movement as automatic confidence
- velocity as proof of venture quality

## 3. Operator Leverage Over Task Volume

The core studio constraint is scarce shared talent.

Foundary should show whether operator time is being used against the highest
confidence opportunities or being trapped in low-evidence execution.

Avoid:
- single-team project assumptions
- unbounded backlog growth
- hidden cross-venture contention

## 4. Venture Awareness

The core differentiator from Linear is venture context awareness.

Everything should become venture-aware:
- portfolio decisions
- validation gates
- issues
- roadmap items
- dashboard metrics
- AI insights
- health signals
- operator capacity

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

Foundary should feel premium because it is coherent and decisive, not because it
adds more systems.

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
- roadmap and issue linkage to assumptions
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

## 1. Studio Command Center

The primary portfolio surface.

It should show:
- top studio decision
- portfolio attention queue
- validation risk
- operator capacity pressure
- linked execution evidence
- recommended studio move

The command center should feel like:

> "The weekly studio operating meeting, already synthesized."

## 2. Venture Selector

Allows users to switch operational context between portfolio and individual
ventures.

Examples:
- Sentra
- Reson8
- Internal Ops

Each venture has:
- lifecycle phase
- current validation gate
- issues
- roadmap bets
- execution evidence
- operator allocations
- decision status
- studio analyst signals

Users should be able to create a new local venture context that behaves like a
first-class workspace object without turning Foundary into account setup,
settings, or CRM software.

## 3. Validation Gates

The phase-aware decision layer.

Supported behaviors:
- show current phase and gate
- identify required evidence
- track confidence
- expose missing signals
- recommend continue / narrow / pause / kill decisions
- connect gates to issues and roadmap work

Validation gates should prevent the sunk-cost trap where teams keep executing
because tasks exist.

## 4. Execution Evidence

Issues and roadmap items become evidence-bearing execution objects.

Includes:
- issue list and board
- roadmap bet board
- drawers that explain strategic linkage
- links to assumptions and gates
- operator capacity impact
- confidence impact

The execution experience should still feel fast and alive, but its purpose is
to prove or disprove venture progress.

## 5. Operator Capacity

A lightweight shared-capacity layer.

Includes:
- function-level capacity
- venture allocation
- contention warnings
- downstream impact notes
- over-capacity signals

This should be believable and useful without becoming enterprise resource
planning.

## 6. Studio Analyst

Embedded operational intelligence layer.

Supported behaviors:
- recommend studio moves
- summarize evidence gaps
- detect delivery and sunk-cost risks
- identify missing validation signals
- flag operator contention
- explain capacity-versus-confidence tradeoffs

AI outputs should feel:
- concise
- contextual
- operational
- evidence-backed
- believable

The Studio Analyst is not a chat-first assistant.

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

## Must Avoid

- Jira energy
- enterprise density
- spreadsheet feeling
- heavy configuration
- cluttered dashboards
- admin-panel UX
- generic portfolio reporting
- chatbot-first AI

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
- Roadmap / Bets
- Studio Analyst

The global venture switcher should always remain accessible.

Route names may evolve gradually from the existing app structure, but the
product meaning should move toward studio decisions, gates, evidence, capacity,
and analyst recommendations.

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

Avoid:
- marketing sections inside the app
- oversized hero treatment in product routes
- tutorial overlays
- settings-style configuration panels

---

# Technical Philosophy

This project optimizes for:

> believable studio operating intelligence.

NOT:
- backend realism
- enterprise architecture
- infrastructure complexity
- real multi-tenant security
- real finance or cap-table systems

Priority should be:
1. product coherence
2. decision quality
3. operational realism
4. UX quality
5. interaction polish
6. contextual AI behavior

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
- capable of modeling gates, evidence, decisions, and capacity without backend
  infrastructure

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

# Development Priorities

Highest implementation priority:
1. Studio Command Center
2. Validation gates and decision states
3. Execution evidence linkage
4. Operator capacity visibility
5. Studio Analyst recommendations
6. Navigation and copy repositioning
7. Motion and interaction polish

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

DO NOT:
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

---

# Success Criteria

The final product should make reviewers feel:

> "This person understands how venture studios decide where to spend attention,
> talent, and capital."

NOT:

> "They built a nice frontend."

Foundary succeeds when a studio operator can open it and understand:
- which venture needs attention
- which gate is weak
- which execution work is evidence
- which operator capacity is constrained
- which studio decision should happen next

---

# Final Product North Star

Foundary should feel like:

> "A calm, intelligent studio command center for preventing wasted execution."

Every implementation decision should reinforce:
- decision clarity
- venture awareness
- validation confidence
- execution evidence
- operator leverage
- AI-native studio reasoning
- strategic simplicity
- premium interaction quality
