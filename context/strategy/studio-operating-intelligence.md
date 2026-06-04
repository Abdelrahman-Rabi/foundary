# Studio Operating Intelligence Strategy

## Purpose

This document defines the strategic repositioning of Foundary from a venture
execution workspace into a studio operating intelligence layer.

Use this file when:
- making product positioning decisions
- planning the Studio Operating Intelligence phase
- deciding whether a feature supports the new wedge
- reviewing whether implementation has drifted back toward generic project
  management
- explaining why dashboard, issues, roadmap, and AI surfaces are being reframed

This is a strategy document, not a component spec.

---

# Strategic Repositioning

## Previous Positioning

Foundary was previously framed as:

> A calm venture execution workspace for fast-moving venture teams.

That direction produced a coherent product, but it risked being perceived as a
polished Linear-style project management tool with venture-aware labels.

The weakness:
- studios already have project management tools
- better issue tracking does not solve the deepest studio operating pain
- roadmap visibility alone does not show whether execution is justified
- AI insights are not compelling if they only summarize work
- a beautiful dashboard is not enough if it still leaves the hard decision to
  the studio partner

## New Positioning

Foundary should now be framed as:

> A studio operating intelligence layer for deciding where to spend time,
> talent, and capital.

Shorter product promise:

> Foundary helps venture studios prevent wasted execution.

The app should help a studio operator answer:

> Which venture deserves more of the studio this week, and which one should
> stop consuming it?

---

# Why This Change Matters

Venture studios do not primarily suffer because they lack task tracking.

Their deeper operating pains are:
- too many ventures are moving at once
- shared operators are stretched across competing companies
- weak ideas keep receiving execution effort because work is already in motion
- studio partners lack a consolidated view of which venture needs intervention
- progress updates often hide validation weakness
- issues and roadmap items are disconnected from assumptions, evidence, and
  capacity cost
- capital and operator time can be consumed before a continue / narrow / pause /
  kill decision is forced

The old product direction emphasized:
- venture-aware work management
- roadmap clarity
- dashboard visibility
- embedded operational AI

The new direction emphasizes:
- portfolio decisions
- validation gates
- execution evidence
- shared capacity pressure
- analyst-backed studio moves

This is not a total rebuild. It is a change in product center of gravity.

---

# Core Strategic Thesis

Foundary should distinguish activity from evidence.

Generic project management tools ask:

> What work is happening?

Foundary should ask:

> Is this work still justified by evidence, capacity, and the studio decision
> we need to make?

This distinction is the product wedge.

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

Every major product decision should strengthen at least one layer of this spine.

## Portfolio Decisions

The product should start from the studio-level decision, not from task lists.

Supported decision language:
- continue
- narrow
- pause
- kill
- staff up
- defer
- partner review

The Command Center should make the top decision obvious before users inspect
lower-level details.

## Validation Gates

Each venture should have a lifecycle phase and current validation gate.

Lifecycle phases:
- Explore
- Validate
- Build
- Scale

Gates should clarify:
- the assumption being tested
- required evidence
- existing evidence
- missing signals
- confidence level
- decision pressure
- recommended studio move

The gate layer exists to prevent execution from continuing when validation
confidence is weak.

## Execution Evidence

Issues and roadmap items should become evidence-bearing objects.

They should link to:
- assumptions
- validation gates
- evidence signals
- operator effort
- capacity impact
- confidence movement
- studio decision outcomes

An issue should help answer:

> Does this work prove, disprove, unblock, de-risk, or merely consume capacity?

A roadmap item should represent a venture bet or validation initiative, not a
generic planning artifact.

## Operator Capacity

Studios operate through shared people and functions.

Foundary should expose capacity pressure across:
- product
- design
- engineering
- GTM
- partner / studio leadership time

The purpose is not calendar scheduling. The purpose is to show when scarce
operator time is being spent on low-confidence work or when one venture is
creating downstream drag across the portfolio.

## Studio Analyst Recommendations

AI should behave like a studio analyst, not a chatbot.

It should:
- recommend studio moves
- summarize evidence gaps
- flag sunk-cost risk
- explain validation confidence
- identify capacity contention
- connect execution work to the venture decision

The analyst should be concise, structured, and evidence-backed.

---

# Competitive Reframe

Foundary should not compete as:

> Linear for venture studios.

That framing invites comparison on issue tracking and speed.

Foundary should compete as:

> The operating intelligence layer Linear cannot provide for venture studios.

## Compared With Linear / Jira

Linear and Jira are strong at:
- issue tracking
- delivery velocity
- developer workflows
- team-level execution

They are weak at:
- cross-venture attention ranking
- validation gate enforcement
- shared operator contention
- continue / narrow / pause / kill decisions
- connecting execution to evidence and capacity cost

Foundary should retain the speed and calmness of Linear-like workflows, but the
reason to use Foundary is studio decision intelligence.

## Compared With Enterprise Portfolio Tools

Enterprise SPM tools are strong at:
- heavy resource planning
- program governance
- financial controls
- executive reporting

They are weak at:
- startup-speed workflows
- lightweight venture validation
- modern builder UX
- low-friction studio operations

Foundary should remain compact, calm, and fast. It should not become enterprise
resource planning.

## Compared With VC Portfolio Reporting Tools

VC portfolio tools are strong at:
- KPI consolidation
- LP reporting
- cap tables
- retrospective reporting

They are weak at:
- active venture building
- daily execution linkage
- validation-gate decisions
- operator allocation during company creation

Foundary should focus on active studio operating decisions, not static portfolio
reporting.

---

# Demo Narrative

The strongest demo should begin with a studio operating moment:

> A studio partner opens Foundary before the weekly operating review.

The product shows:
- Sentra is a higher-confidence growth opportunity, but design capacity is
  strained
- Reson8 is still consuming engineering effort despite weak validation evidence
- Internal Ops is stable and freeing operating leverage

The recommended studio moves are:
- continue Sentra, but protect activation design capacity
- narrow Reson8 before another build cycle
- keep Internal Ops steady and reallocate PM time

This narrative should make the app feel like it catches waste before the studio
spends another week building the wrong thing.

---

# Strategic Product Changes

## 1. Dashboard Becomes Command Center

The first screen should not lead with generic KPIs.

It should lead with:
- top studio decision
- portfolio attention queue
- validation risk
- capacity pressure
- execution evidence
- analyst recommendation

## 2. Roadmap Becomes Venture Bets

Roadmap items should represent:
- validation initiatives
- growth bets
- risk-reduction efforts
- delivery bets
- operating leverage work

They should connect to gates and assumptions.

## 3. Issues Become Execution Evidence

Issues should still support fast execution workflows, but their strategic role
is to show how work supports, challenges, or consumes capacity against a venture
decision.

## 4. AI Becomes Studio Analyst

AI should recommend studio moves and explain them through evidence, gates, and
capacity.

Avoid generic assistant language and chatbot interaction patterns.

## 5. Venture Health Becomes Decision Pressure

Health should be interpreted through:
- validation confidence
- execution evidence
- capacity strain
- decision urgency

Avoid treating health as a decorative status label.

---

# What To Preserve

Keep:
- calm dark-first product feel
- compact operational layouts
- local-first mocked data
- browser-persisted workspace continuity
- venture switcher
- issues list and board
- roadmap board
- drawers for drill-down workflows
- embedded AI intelligence
- fast Linear-inspired interactions
- no backend infrastructure

The pivot should reuse Foundary's existing strengths while changing the meaning
of the core surfaces.

---

# What To Avoid

Do not drift into:
- Mini Jira
- generic dashboarding
- enterprise SPM
- full resource scheduling
- full finance / cap-table systems
- RBAC or account management
- settings-heavy studio configuration
- chatbot-first AI
- decorative AI summaries
- passive reporting
- broad feature expansion without decision leverage

The question for new work is:

> Does this help the studio decide where attention, talent, or capital should go?

If not, it is probably not part of this phase.

---

# Phase Outcome

The Studio Operating Intelligence phase succeeds when a reviewer can understand
the new product value without a long explanation:

> Foundary shows which ventures are worth more studio effort, which ones need to
> be narrowed or paused, and what evidence supports that decision.

The product should make reviewers feel:

> "This person understands the operating model of venture studios."

NOT:

> "This is a nice project management frontend."

---

# Strategic One-Liners

Use these lines when explaining Foundary:

```txt
Foundary helps venture studios prevent wasted execution.
```

```txt
Foundary connects validation evidence, operator capacity, and execution work so
studios can decide where to intervene next.
```

```txt
Foundary turns issues and roadmap work into evidence for continue, narrow,
pause, or kill decisions.
```

```txt
Foundary is not trying to replace Linear for every team. It gives venture
studios the operating intelligence Linear cannot provide.
```
