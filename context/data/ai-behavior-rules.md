# Studio Analyst Behavior Rules - Foundary

## Purpose

This document defines the behavior rules for Foundary's Studio Analyst.

It covers:
- analyst philosophy
- recommendation rules
- gate/evidence/capacity reasoning
- signal generation patterns
- UX behavior constraints
- response formatting
- synchronization rules
- anti-patterns

The Studio Analyst should feel like:

> embedded operating intelligence for venture studio decisions.

NOT:

> a generic chatbot or AI summary panel.

---

# Core Analyst Philosophy

## Most Important Principle

The Studio Analyst exists to help venture studios decide where to spend time,
talent, and capital.

It should answer:
- what studio move is recommended
- what evidence supports it
- what evidence is missing
- whether execution is outpacing validation
- whether capacity is being spent well
- which source objects explain the recommendation

The Studio Analyst should behave like:

> a concise operating analyst embedded inside the product.

---

# Product Spine

All important analyst behavior should connect to the Studio Operating
Intelligence spine:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Avoid analyst output that is not connected to at least two of:
- venture
- validation gate
- execution evidence
- operator capacity
- studio decision
- source issue or roadmap item

---

# Analyst Product Positioning

The Studio Analyst is:
- contextual
- operational
- concise
- embedded
- venture-aware
- evidence-backed
- decision-oriented
- source-linked

The Studio Analyst is NOT:
- conversational entertainment
- autonomous agent infrastructure
- generative writing assistant
- fake AGI simulation
- chat-first UX
- a replacement for studio judgment

---

# Core Analyst Responsibilities

| Behavior | Purpose |
|---|---|
| Recommended studio move | Clarify continue / narrow / pause / kill / staff-up / defer / partner-review |
| Evidence gap analysis | Show what is missing before more commitment |
| Sunk-cost risk detection | Catch active execution with weak validation |
| Capacity tradeoff analysis | Show whether scarce operator time is spent well |
| Gate confidence explanation | Explain validation confidence and decision pressure |
| Execution evidence interpretation | Explain what work proves, disproves, unblocks, de-risks, or costs |
| Source-linked analysis | Make recommendations inspectable |

---

# Studio Decision Vocabulary

Use:

```ts
type StudioDecision =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"
```

## Decision Rules

### Continue

Recommend when:
- gate confidence is healthy or improving
- evidence supports the current assumption
- capacity pressure is manageable
- execution is producing learning or progress

### Narrow

Recommend when:
- evidence is mixed
- gate confidence is weak but not failed
- scope, ICP, or bet definition is too broad
- execution is active but should tighten before more capacity is spent

### Pause

Recommend when:
- work is active but evidence is missing
- capacity is constrained
- gate confidence is blocked or materially weak
- the next action should be evidence collection, not execution

### Kill

Recommend when:
- evidence is negative
- assumptions are invalidated
- confidence is low and capacity cost is high
- continued execution would likely waste another cycle

### Staff Up

Recommend when:
- evidence is strong
- gate confidence is high
- capacity is the main constraint
- additional operator time is justified

### Defer

Recommend when:
- the work is valid but not urgent
- another venture has higher decision pressure
- evidence is stable and no intervention is needed

### Partner Review

Recommend when:
- decision pressure is high
- signals are mixed
- strategic tradeoff requires leadership judgment
- capacity or venture direction has portfolio-level consequences

---

# Analyst Behavior Categories

## 1. Recommended Studio Move

## Goal

Surface the clearest next studio decision.

## Required Inputs

Use:
- venture phase
- validation gate status
- validation confidence
- evidence signals
- linked issues
- linked roadmap bets
- operator capacity pressure

## Example Output

```txt
Recommended move: Narrow

Reason:
Reson8 has active engineering work, but retention evidence remains below the
Validate gate threshold.

Capacity tradeoff:
Engineering effort is competing with Sentra activation work, where evidence
confidence is stronger.

Suggested action:
Pause broad build work and run targeted retention interviews before another
cycle.
```

---

## 2. Evidence Gap Analysis

## Goal

Show what evidence is missing before the studio should commit more capacity.

## Trigger When

- required gate evidence is missing
- roadmap bet lacks expected evidence
- issue work is active without gate linkage
- completed work has neutral confidence impact
- assumptions remain untested

## Example Output

```txt
Evidence gap:
The retention gate lacks repeat-use evidence from the target ICP.

Suggested action:
Link onboarding research tasks to the retention gate before extending build
scope.
```

---

## 3. Sunk-Cost Risk Detection

## Goal

Detect when a venture keeps consuming capacity despite weak validation.

## Trigger When

- gate confidence is low
- roadmap bet remains active
- in-progress issue count is high
- capacity pressure is watch or overloaded
- evidence signals are weak or negative
- execution continues without confidence movement

## Example Output

```txt
Sunk-cost risk: High

Reason:
Reson8 has active implementation work and high engineering effort, but the
retention gate remains at-risk with weak supporting evidence.

Recommended move:
Narrow before another build cycle.
```

---

## 4. Capacity Tradeoff Analysis

## Goal

Explain whether scarce studio capacity is being spent well.

## Trigger When

- a function is overloaded
- two or more ventures compete for the same function
- capacity-cost evidence roles appear
- high-confidence and low-confidence ventures compete for capacity
- high-effort work is linked to a weak gate

## Example Output

```txt
Capacity tradeoff:
Design is overloaded across Sentra and Reson8.

Sentra has stronger activation evidence, while Reson8 still lacks retention
signal.

Recommended move:
Protect Sentra design capacity and narrow Reson8 scope.
```

---

## 5. Gate Confidence Explanation

## Goal

Explain why a gate is healthy, at risk, blocked, passed, or failed.

## Use

- required evidence
- evidence signals
- linked issues
- linked roadmap bets
- confidence impact
- stale or blocked work

## Example Output

```txt
Gate confidence: At risk

Reason:
The activation gate has instrumentation work in progress, but no completed
evidence signal has moved confidence yet.
```

---

## 6. Execution Evidence Interpretation

## Goal

Explain what issue or roadmap work means for the studio decision.

Evidence roles:

```txt
prove
disprove
unblock
de-risk
capacity-cost
```

## Important Rule

Done work does not automatically increase validation confidence.

An issue can be completed and still:
- have neutral confidence impact
- disprove an assumption
- expose a capacity-cost concern
- suggest narrowing scope

---

# Context Awareness Rules

All analyst output should be:
- venture-aware
- gate-aware when gates exist
- evidence-aware when source evidence exists
- capacity-aware when capacity affects the decision
- state-aware
- source-linked

The analyst should reference:
- venture phase
- gate confidence
- evidence signal strength
- issue status
- roadmap bet confidence
- capacity pressure
- recommended studio decision

Avoid:
- generic recommendations
- isolated observations
- disconnected AI summaries
- recommendations without source objects when sources exist

---

# Confidence Rules

Confidence should feel directional, not scientific.

Preferred:

```ts
type AnalystConfidence =
  | "high"
  | "medium"
  | "low"
```

Numeric confidence may still appear in existing UI, but avoid implying
predictive certainty.

## High Confidence

Use when:
- evidence is clear
- gate status is aligned
- source objects are strong
- capacity tradeoff is obvious

## Medium Confidence

Use when:
- signals are mixed
- source data is incomplete
- recommendation is plausible but not definitive

## Low Confidence

Use when:
- data is sparse
- venture is custom/clean
- no gate or evidence exists
- analyst should avoid certainty

---

# Output Style Rules

## Tone

Analyst output should sound:
- concise
- calm
- strategic
- operational
- analytical
- evidence-backed

Avoid:
- excitement
- hype
- marketing language
- emotional phrasing
- conversational filler
- assistant personality simulation

---

# Preferred Output Structure

Use this for major recommendations:

```txt
Recommended move:
...

Reason:
...

Evidence:
...

Capacity tradeoff:
...

Suggested action:
...
```

Use this for smaller embedded notes:

```txt
Observation:
...

Suggested action:
...
```

Keep outputs short. Avoid long reasoning essays.

---

# Good Output Example

```txt
Recommended move: Narrow

Reason:
Reson8's retention gate is at risk while implementation work remains active.

Evidence:
Interview signals show weak repeat-use intent from the target creator segment.

Capacity tradeoff:
Engineering effort is competing with Sentra activation work, where confidence is
stronger.

Suggested action:
Pause broad onboarding polish and run targeted retention interviews.
```

---

# Bad Output Example

```txt
Great news! I analyzed your project and found some exciting opportunities.
Reson8 might need a little focus, so maybe review it when you have time.
```

Problems:
- conversational
- vague
- not source-linked
- no studio decision
- no evidence or capacity reasoning

---

# UI Behavior Rules

## Most Important Principle

The Studio Analyst should feel:

> embedded into workflows.

NOT:

> separated as a chat product.

## Preferred UI Patterns

Use:
- analyst cards
- recommendation panels
- contextual sidebars
- embedded analysis blocks
- confidence indicators
- source chips
- decision badges

## Avoid

Do NOT implement:
- chat bubbles
- typing animations
- fake streaming responses
- avatar-based assistants
- prompt playground UX
- conversational thread interfaces
- glowing AI theatrics
- autonomous agent panels

---

# Trigger Rules

## Automatic Triggers

Analyst signals should update when:
- issue status changes
- issue evidence role changes
- roadmap confidence changes
- validation gate confidence changes
- blocked work appears
- overdue issues increase
- venture changes
- capacity pressure changes
- roadmap bet moves to Now

## Manual Triggers

Allow users to inspect:
- issue analyst note
- roadmap analyst note
- gate confidence explanation
- top portfolio recommendation

Do not build prompt-based manual chat unless explicitly scoped.

---

# Synchronization Rules

## Issue -> Analyst

Issue changes should affect:
- evidence interpretation
- sunk-cost risk
- capacity tradeoff
- gate confidence explanation
- recommended move

## Roadmap -> Analyst

Roadmap changes should affect:
- validation initiative confidence
- decision pressure
- capacity pressure interpretation
- recommended move

## Gate -> Analyst

Gate changes should affect:
- evidence gap analysis
- studio decision recommendation
- venture attention ranking

## Capacity -> Analyst

Capacity changes should affect:
- top studio decision
- capacity tradeoff analysis
- staff-up / narrow / pause recommendations

## Venture -> Analyst

Venture changes should affect:
- portfolio context
- active venture context
- available source objects

Prefer deterministic derived analysis over persisted generated responses.

---

# Clean And Custom Venture Rules

The Analyst must not invent:
- fake gates
- fake evidence
- fake capacity pressure
- fake certainty
- fake recommendations

## Clean Platform Output

```txt
No studio decisions to analyze.
Create a venture and capture the first gate or evidence item.
```

## New Custom Venture Output

```txt
No analyst recommendation yet.
Start by defining the venture's current assumption or first validation gate.
```

---

# Seeded Demo Rules

## Sentra

Analyst should show:
- stronger activation/growth evidence
- design or product capacity pressure
- continue or staff-up recommendation with capacity protection

Example:

```txt
Continue with capacity protection.
Sentra has stronger activation evidence, but design load is crossing watch
threshold.
```

## Reson8

Analyst should show:
- weak validation confidence
- active execution
- capacity-cost concern
- narrow or pause recommendation

Example:

```txt
Narrow before another build cycle.
Retention evidence is weak while engineering remains active.
```

## Internal Ops

Analyst should show:
- stable operating leverage
- low intervention urgency
- defer or continue steady-state recommendation

Example:

```txt
Defer new Internal Ops scope.
Current leverage work is stable and can free PM attention for higher-pressure
ventures.
```

---

# AI / Analyst State Design

## Persist

Persist lightweight user intent:
- inspected signal IDs
- dismissed signal IDs
- selected analyst signal if already supported

## Do Not Persist

Do not persist:
- fake chat transcripts
- generated reasoning
- LLM responses
- streaming state
- autonomous agent memory

Analyst analysis should remain deterministic and derived from current local
workspace state.

---

# Performance Rules

The analyst layer should remain:
- lightweight
- frontend-driven
- deterministic
- derived from current state

Avoid:
- fake API latency
- unnecessary async complexity
- simulated streaming
- real LLM infrastructure

---

# Demo Optimization Rules

## Recommended Hero Flow

```txt
Command Center top decision
  -> Validation gate risk
  -> Execution evidence source
  -> Operator capacity tradeoff
  -> Studio Analyst recommendation
```

This creates:
- studio operating realism
- decision clarity
- evidence-backed intelligence
- AI-native sophistication without chatbot theatrics

---

# Anti-Patterns

Do NOT:
- build ChatGPT clone UX
- simulate fake LLM streaming
- generate excessive text
- create AI-first workflows
- overwhelm interfaces with AI
- prioritize novelty over utility
- introduce autonomous agent theatrics
- recommend decisions without source evidence
- summarize task status without connecting to gates, evidence, or capacity
- use anthropomorphic language
- present analyst judgment as infallible

---

# Final Analyst Philosophy

The Studio Analyst should feel like:

> source-linked operating intelligence for venture studio decisions.

The analyst should reinforce:
- decision clarity
- validation confidence
- execution evidence
- operator leverage
- venture awareness
- strategic focus

The reviewer should feel:

> Foundary recommends what the studio should do next and shows the evidence
> behind that recommendation.

NOT:

> This product added AI because AI is trendy.
