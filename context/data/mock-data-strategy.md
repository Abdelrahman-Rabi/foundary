# Mock Data Strategy - Foundary

## Purpose

This document defines the seeded data strategy for Foundary's Studio Operating
Intelligence repositioning.

It covers:
- mock dataset philosophy
- seeded studio operating narrative
- venture scenarios
- validation gate coherence
- execution evidence relationships
- operator capacity tension
- Studio Analyst signal patterns
- Command Center storytelling logic

The mock data system is one of the most important parts of Foundary because:

> believable studio data creates perceived product sophistication.

The goal is NOT:
- random demo content
- placeholder data
- disconnected issues and roadmap items
- generic AI summaries
- fake enterprise reporting

The goal IS:

> a believable venture studio operating environment where decisions, gates,
> evidence, capacity, and analyst recommendations connect.

---

# Core Mock Data Philosophy

## Most Important Principle

The data should show that Foundary prevents wasted execution.

Reviewers should feel:

> This product catches when a venture is consuming studio capacity without enough
> evidence.

NOT:

> This is a polished demo workspace.

---

# Product Spine In Data

Seeded data must support:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Every seeded venture should have:
- lifecycle phase
- current validation gate
- evidence signals
- linked issues
- linked roadmap bets
- operator capacity context
- recommended studio move
- analyst signal

---

# Mock Data System Goals

| Goal | Why |
|---|---|
| Decision clarity | Command Center needs one obvious top move |
| Validation realism | Gates must distinguish evidence from activity |
| Evidence linkage | Issues and roadmap work must have consequence |
| Capacity tension | Studio-specific pain must be visible |
| Analyst credibility | Recommendations need source objects |
| Venture differentiation | Each venture must tell a different operating story |
| Local-first stability | Demo state must remain deterministic |

---

# Mock Data Architecture

## Recommended Structure

Existing files may remain:

```txt
src/data/ventures.ts
src/data/users.ts
src/data/issues.ts
src/data/roadmap.ts
src/data/ai-insights.ts
src/data/tags.ts
src/data/index.ts
```

Future files may be added when implementation needs them:

```txt
src/data/validation-gates.ts
src/data/evidence-signals.ts
src/data/operator-capacity.ts
```

Prefer:
- handcrafted core data
- deterministic relationships
- derived metrics
- stable IDs

Avoid:
- fully random generation
- fake-data libraries
- incoherent issue-roadmap-gate links
- adding many files before the UI needs them

---

# Seeded Studio Narrative

The seeded portfolio should tell one clear story:

```txt
A studio partner opens Foundary before the weekly operating review.

Sentra has the strongest evidence but is creating design/product capacity strain.
Reson8 is still consuming engineering effort despite weak validation evidence.
Internal Ops is stable and freeing operating leverage.

The recommended move is to narrow Reson8, protect Sentra capacity, and keep
Internal Ops steady.
```

This should be visible from the Command Center without a long explanation.

---

# Seeded Venture Strategy

## 1. Sentra

## Studio Role

Higher-confidence growth opportunity with activation upside and capacity strain.

## Suggested State

```txt
Phase: Build or Scale
Current gate: Activation quality / growth readiness
Validation confidence: moderate-high
Decision pressure: medium
Recommended move: continue or staff-up with capacity protection
Capacity pressure: design or product watch / overloaded
```

## Narrative

Sentra is:
- showing stronger activation or growth evidence
- worth continued studio attention
- creating design/product capacity strain
- at risk if capacity is pulled into weaker ventures

## Required Data Signals

Include:
- at least one strong or moderate positive evidence signal
- roadmap bet linked to activation or growth
- issues that prove or de-risk the activation gate
- at least one capacity-cost issue or operator pressure signal
- analyst recommendation that says continue/staff-up/protect capacity

## Example Gate

```txt
Gate:
Activation readiness

Assumption:
New users can reach first value quickly enough to support growth spend.

Required evidence:
- activation cohort reaches target threshold
- setup completion improves in target segment
- instrumentation is reliable

Recommended move:
Continue with capacity protection.
```

## Example Evidence Roles

```txt
prove:
Activation cohort analysis confirms setup completion lift.

de-risk:
Analytics reliability fix improves confidence in activation data.

capacity-cost:
Design iteration work is consuming scarce design capacity.
```

---

# 2. Reson8

## Studio Role

Validation uncertainty with active execution and sunk-cost risk.

## Suggested State

```txt
Phase: Validate
Current gate: Retention / repeat-use signal
Validation confidence: low or at-risk
Decision pressure: high
Recommended move: narrow or pause
Capacity pressure: engineering and product active despite weak evidence
```

## Narrative

Reson8 is:
- strategically interesting but not yet validated
- still running active execution work
- lacking strong retention or repeat-use evidence
- consuming engineering/product capacity that may not be justified

## Required Data Signals

Include:
- weak or negative evidence signal
- roadmap bet linked to retention or positioning
- active issues linked to the weak gate
- at least one capacity-cost issue
- analyst recommendation that says narrow before another build cycle

## Example Gate

```txt
Gate:
Repeat-use retention signal

Assumption:
Target creators will return weekly to manage collaboration workflows.

Required evidence:
- repeat-use signal from target ICP
- interview evidence that the workflow is urgent
- activation path completed by a meaningful cohort

Recommended move:
Narrow before another build cycle.
```

## Example Evidence Roles

```txt
disprove:
Retention interviews show weak repeat-use intent.

unblock:
Add cohort instrumentation before evaluating the onboarding loop.

capacity-cost:
Engineering continues onboarding polish before retention evidence improves.
```

---

# 3. Internal Ops

## Studio Role

Stable studio leverage with contained scope and freed capacity.

## Suggested State

```txt
Phase: Build or Scale
Current gate: Operating leverage
Validation confidence: stable
Decision pressure: low
Recommended move: defer new scope or continue steady-state
Capacity pressure: healthy
```

## Narrative

Internal Ops is:
- improving studio operating leverage
- stable and low-drama
- not the highest intervention area
- freeing PM or partner attention for higher-pressure ventures

## Required Data Signals

Include:
- stable evidence signal
- roadmap bet linked to leverage or internal workflow
- completed or de-risking issues
- low capacity pressure
- analyst recommendation that says defer new scope or continue steady-state

## Example Gate

```txt
Gate:
Studio operating leverage

Assumption:
Internal workflow automation reduces repeated coordination load.

Required evidence:
- meeting prep time reduced
- repeated status updates automated
- no new coordination burden introduced

Recommended move:
Continue steady-state; defer new scope.
```

## Example Evidence Roles

```txt
prove:
Meeting intelligence rollout reduces prep time across operating reviews.

de-risk:
Internal metrics scope stays contained.
```

---

# User Dataset Strategy

## Goal

Users should feel:
- role-specific
- operationally credible
- cross-functional
- studio-native

Avoid:
- fake startup stereotypes
- excessive user count
- assigning every person to every venture without logic

---

# Recommended Team Composition

```txt
Sarah Chen
Role: Venture Product Lead
Capacity: product
Focus: validation planning and roadmap decisions

Omar Khaled
Role: AI Engineer
Capacity: engineering
Focus: instrumentation and AI workflows

Lina Haddad
Role: Product Designer
Capacity: design
Focus: activation, onboarding, and UX research

Maya Rodriguez
Role: Studio Operator
Capacity: partner / product
Focus: portfolio visibility and operating reviews

Noah Patel
Role: GTM Operator
Capacity: gtm
Focus: pilots, customer development, and launch experiments
```

Users should appear across ventures in ways that create believable capacity
contention.

---

# Validation Gate Dataset Strategy

## Required Gate Coverage

Each seeded venture should have at least one current gate.

Recommended additional historical gates:
- one passed gate for Sentra
- one failed or killed learning for Reson8
- one stable passed gate for Internal Ops

## Gate Quality Rules

Each gate should include:
- assumption
- required evidence
- evidence signals
- confidence
- status
- decision pressure
- recommended decision
- linked issues
- linked roadmap bets

Avoid:
- generic gate names
- gates without linked work
- confidence values that do not match the story

---

# Execution Evidence Dataset Strategy

## Required Evidence Roles

Seeded issues and roadmap items should include a mix of:

```txt
prove
disprove
unblock
de-risk
capacity-cost
```

## Important Rule

Do not make every completed issue positive.

Some completed work should have:
- neutral confidence impact
- negative confidence impact
- capacity-cost interpretation
- evidence that narrows or kills a direction

This makes the product feel strategically mature.

---

# Issue Dataset Strategy

## Goal

Issues should communicate:
- active execution
- evidence collection
- delivery complexity
- capacity cost
- venture momentum
- decision pressure

## Recommended Distribution

Sentra:

```txt
Higher issue volume
More growth/build work
Several proof/de-risk issues
Some capacity-cost pressure
```

Reson8:

```txt
Moderate issue volume
More research/experiment work
Active implementation despite weak gate
Clear capacity-cost issue
```

Internal Ops:

```txt
Lower issue volume
More leverage/de-risk work
Stable completed work
Low urgent pressure
```

## Required Issue Scenarios

Include:
- overdue work
- blocked work
- recently completed wins
- stalled initiatives
- killed experiments
- urgent operational fixes
- evidence-linked research
- capacity-cost execution

---

# Roadmap Dataset Strategy

## Goal

Roadmap items should read as:

> venture bets or validation initiatives.

They should create:
- strategic visibility
- gate linkage
- confidence tension
- portfolio decision clarity

## Required Roadmap Variety

The roadmap must include:
- high-confidence bet
- uncertain validation initiative
- at-risk bet
- recently completed bet
- killed or narrowed learning

## Recommended Roadmap Composition

Sentra:

```txt
Activation Quality Program
Mobile Referral Expansion
Analytics Reliability Foundation
```

Reson8:

```txt
Creator Retention Validation
Collaboration Workflow Narrowing
Messaging Positioning Experiments
```

Internal Ops:

```txt
Studio Meeting Intelligence
Hiring Workflow Automation
Internal Metrics Scope Control
```

Each roadmap item should have:
- bet type
- linked gate when relevant
- expected evidence
- linked issues
- confidence
- capacity impact when relevant

---

# Operator Capacity Dataset Strategy

## Goal

Capacity data should make studio-specific resource contention visible.

## Required Function Coverage

Use:

```txt
product
design
engineering
gtm
partner
```

## Recommended Capacity Story

```txt
Design:
Watch / overloaded due to Sentra activation and Reson8 onboarding tests.

Engineering:
Overloaded or watch due to Reson8 build work with weak validation confidence.

Product:
Watch due to Reson8 validation planning and Sentra growth decisions.

GTM:
Healthy or watch depending on Sentra growth/pilot work.

Partner:
Watch only where partner-review decisions are needed.
```

## Capacity Rules

Capacity pressure should be believable, not mathematically perfect.

Suggested interpretation:

```txt
0-85%      healthy
86-105%    watch
106%+      overloaded
```

Never imply real scheduling precision.

---

# Studio Analyst Dataset Strategy

## Goal

Analyst signals should feel:

> source-linked and decision-ready.

They should not feel like generic AI summaries.

## Required Analyst Signals

At minimum include:
- one top portfolio recommendation
- one Reson8 sunk-cost risk
- one Sentra capacity protection recommendation
- one Internal Ops steady-state / defer recommendation
- one evidence gap signal
- one capacity tradeoff signal

## Analyst Output Rules

Signals should reference:
- venture
- gate
- evidence signal
- issue or roadmap source
- capacity tradeoff
- recommended decision

Avoid:
- repetitive phrasing
- generic "review this carefully" text
- recommendations without source objects
- excessive confidence certainty

---

# Command Center Data Strategy

## Goal

The first dashboard/Command Center viewport should make the new wedge obvious.

It should show:
- top studio decision
- portfolio attention queue
- validation risk
- capacity pressure
- execution evidence summary
- analyst recommendation

## Recommended First Screen Story

```txt
Top decision:
Reson8 needs a narrow decision before another build cycle.

Reason:
Retention evidence is weak while engineering work remains active.

Capacity:
Engineering/product attention is competing with higher-confidence Sentra work.

Next move:
Pause broad build work and run targeted retention interviews.
```

## Attention Queue Ordering

Recommended order:
1. Reson8
2. Sentra
3. Internal Ops

Rationale:
- Reson8 has highest decision pressure
- Sentra has capacity pressure but stronger evidence
- Internal Ops is stable and lower intervention

---

# Temporal Realism Strategy

## Important Principle

All timestamps should feel recent and operationally active.

## Recommended Distribution

Today:
- analyst signal generated
- issue moved or blocked
- capacity pressure updated

Past 7 days:
- evidence signals observed
- roadmap bet confidence changed
- issues completed or killed

Past 30 days:
- passed or failed gate learning
- killed experiment
- completed foundation work

Avoid stale data where every item appears created on the same day.

---

# Demo Storytelling Strategy

## New Hero Demo Flow

```txt
Command Center
  -> Top studio decision
  -> Validation gate risk
  -> Execution evidence source
  -> Operator capacity tradeoff
  -> Studio Analyst recommendation
```

This should replace the old:

```txt
Dashboard -> Risk -> Roadmap -> Issue -> AI
```

The new demo should communicate:

> Foundary helps studios decide where to continue, narrow, pause, kill, staff up,
> defer, or escalate.

---

# Data Generation Strategy

## Handcrafted Core Data

Manually create:
- ventures
- validation gates
- roadmap bets
- strategic issues
- evidence signals
- operator allocations
- analyst signals

## Programmatic Or Derived Data

Derive:
- counts
- status summaries
- Command Center attention ranking
- capacity signals
- venture health
- analyst grouping

Avoid fully random generation.

---

# Deterministic Data Rules

Use:
- stable seeded data
- stable IDs
- deterministic relationships
- coherent scenarios

This improves:
- debugging
- demos
- UI consistency
- analyst credibility
- local-first reset behavior

---

# UI-Oriented Data Rules

The data should improve:
- layout quality
- information hierarchy
- Command Center balance
- board realism
- drawer usefulness

Avoid:
- extremely long titles
- inconsistent metadata
- unrealistic counts
- empty relationships
- all ventures having the same status
- every signal being high severity

Preferred content style:
- concise operational language
- studio-native terminology
- strategic naming
- evidence-oriented phrasing

---

# Clean And Custom Venture Rules

Start-clean and custom venture states must not invent:
- fake gates
- fake evidence
- fake capacity pressure
- fake analyst certainty

Empty states should explain what belongs in the surface and offer one direct
first action.

Example:

```txt
No evidence linked yet.
Start with the first assumption, validation gate, or execution item.
```

---

# Final Mock Data Philosophy

The mock dataset should feel like:

> a venture studio actively deciding where scarce attention, talent, and capital
> should go.

The data should reinforce:
- decision clarity
- validation confidence
- execution evidence
- operator leverage
- Studio Analyst reasoning
- venture-awareness
- premium operational realism

The reviewer should feel:

> This environment exposes the operating pain of a venture studio.

NOT:

> This is static demo content.
