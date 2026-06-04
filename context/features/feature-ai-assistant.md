# Feature Specification - Studio Analyst

## Purpose

The Studio Analyst is Foundary's embedded intelligence layer for venture studio
decisions.

It replaces the old AI Assistant framing with analyst-backed recommendations
grounded in:
- portfolio decisions
- validation gates
- execution evidence
- operator capacity
- venture context

The Studio Analyst should answer:
- which studio move is recommended
- what evidence supports that move
- what evidence is missing
- whether execution is outpacing validation
- whether capacity is being spent well
- which source objects explain the recommendation

The Studio Analyst should feel like:

> a concise operating analyst embedded inside the product.

It should NOT feel like:

> a chatbot, companion, or generic AI assistant.

---

# Strategic Role

The Studio Analyst is the final reasoning layer in the Studio Operating
Intelligence spine:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Its job is to synthesize the other layers into a clear studio move.

Generic AI tools answer:

> What can I summarize for you?

Foundary's Studio Analyst should answer:

> What should the studio do next, and what evidence justifies it?

---

# Route And Implementation Context

Primary route:

```txt
/assistant
```

The route may remain `/assistant` during transition, but visible product
language and behavior should move toward Studio Analyst.

The Analyst also appears inside:

```txt
/dashboard   -> Command Center analyst recommendation
/issues      -> issue evidence and risk analysis
/roadmap     -> bet / gate analysis
App Shell    -> contextual analyst panel
Drawers      -> source-linked analyst notes
```

Likely implementation areas:

```txt
src/app/assistant/page.tsx
src/features/assistant/components/*
src/features/assistant/utils/assistant-analysis.ts
src/features/assistant/utils/issue-signals.ts
src/features/assistant/utils/roadmap-signals.ts
src/features/assistant/utils/portfolio-signals.ts
src/features/assistant/utils/signal-dedupe.ts
src/features/dashboard/*
src/features/issues/components/issue-drawer-content.tsx
src/features/roadmap/components/roadmap-drawer-content.tsx
src/components/app-shell/assistant-panel-shell.tsx
src/components/app-shell/app-drawer.tsx
src/stores/assistant-store.ts
```

Implementation should reuse existing assistant infrastructure and deterministic
mock analysis. Do not add real LLM integration.

---

# Required Context

Load before implementation:

```txt
context/strategy/studio-operating-intelligence.md
context/project-overview.md
context/project-specs.md
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md
context/current-feature.md
```

Load additionally when touching:

```txt
Command Center:
context/features/feature-studio-command-center.md

Validation gates:
context/features/feature-validation-gates.md

Execution evidence:
context/features/feature-execution-evidence.md

Operator capacity:
context/features/feature-operator-capacity.md

Domain data:
context/data/domain-models.md
context/data/mock-data-strategy.md
```

Note: `context/data/ai-behavior-rules.md` may still use AI Assistant language
until it is updated. When the two files differ, this feature spec is the source
of truth for Phase 14 Studio Analyst behavior.

---

# Core Product Principle

The Studio Analyst should recommend decisions, not perform generic AI
summarization.

Every important analyst output should connect at least two of:
- venture
- validation gate
- execution evidence
- operator capacity
- studio decision
- source issue or roadmap item

Avoid analyst outputs that are merely:
- nice summaries
- generic productivity advice
- isolated risk notes
- decorative AI copy

---

# Studio Decisions

The Analyst should use this decision vocabulary:

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

## Decision Guidance

| Decision | Use When |
|---|---|
| `continue` | Evidence supports another cycle of work |
| `narrow` | Evidence is mixed; scope, ICP, or bet must tighten |
| `pause` | Work should stop until evidence or capacity changes |
| `kill` | Evidence is negative or insufficient enough to stop |
| `staff-up` | Confidence is high enough to justify more capacity |
| `defer` | Valid work exists but attention is better spent elsewhere |
| `partner-review` | Strategic judgment is needed before more capacity is spent |

---

# Core Analyst Behaviors

## 1. Recommended Studio Move

## Purpose

Surface the clearest next studio decision.

## Required Inputs

Use:
- venture phase
- validation gate status
- validation confidence
- execution evidence
- operator capacity
- linked issue and roadmap state

## Example

```txt
Recommended move: Narrow

Reason:
Reson8 has active engineering work, but retention evidence remains below the
Validate gate threshold.

Capacity tradeoff:
Engineering effort is now competing with Sentra activation work, where evidence
confidence is stronger.

Suggested action:
Pause broad build work and run targeted retention interviews before another
cycle.
```

---

## 2. Evidence Gap Analysis

## Purpose

Explain what evidence is missing before a venture deserves more commitment.

## Detection Signals

Flag when:
- a gate has required evidence missing
- execution is active without linked evidence
- roadmap bets lack expected evidence
- issues are completed without confidence movement
- assumptions are stale or untested

## Example

```txt
Evidence gap:
The retention gate lacks repeat-use evidence from the target ICP.

Suggested action:
Link the onboarding research tasks to the retention gate before extending build
scope.
```

---

## 3. Sunk-Cost Risk Detection

## Purpose

Detect when a venture keeps consuming capacity despite weak validation.

## Detection Signals

Increase sunk-cost risk when:
- gate confidence is low
- in-progress issues remain high
- roadmap bets stay active
- capacity pressure is high
- evidence signals are weak or negative
- work continues without confidence movement

## Example

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

## Purpose

Explain whether scarce studio capacity is being spent well.

## Detection Signals

Analyze:
- overloaded functions
- cross-venture contention
- high-effort issues
- high-effort roadmap bets
- capacity-cost evidence roles
- high confidence vs low confidence ventures competing for capacity

## Example

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

## Purpose

Explain why a gate is healthy, at risk, blocked, passed, or failed.

## Required Inputs

Use:
- required evidence
- evidence signals
- linked issues
- linked roadmap bets
- confidence impact
- stale or blocked work

## Example

```txt
Gate confidence: At risk

Reason:
The activation gate has instrumentation work in progress, but no completed
evidence signal has moved confidence yet.
```

---

## 6. Source-Linked Analysis

## Purpose

Make analyst recommendations inspectable.

Every important recommendation should link to source objects when available:
- issue
- roadmap item
- validation gate
- evidence signal
- capacity signal

Avoid recommendations that cannot be traced to product objects.

---

# Analyst Output Structure

Preferred structure:

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

Shorter contexts may use:

```txt
Observation:
...

Suggested action:
...
```

Avoid long prose and hidden reasoning chains.

---

# Analyst Confidence

Confidence should feel directional, not scientific.

```ts
type AnalystConfidence =
  | "high"
  | "medium"
  | "low"
```

Numeric confidence may still appear where existing UI expects it, but it should
not imply predictive certainty.

Guidance:

```txt
High: clear evidence and aligned capacity
Medium: mixed signals or incomplete source data
Low: sparse evidence or clean/custom venture state
```

---

# Data Model Direction

Existing `AIInsight` may evolve toward:

```ts
type AnalystSignal = {
  id: string
  ventureId?: string

  signalType:
    | "studio-decision"
    | "evidence-gap"
    | "sunk-cost-risk"
    | "capacity-tradeoff"
    | "gate-confidence"
    | "execution-risk"

  title: string
  summary: string

  recommendedDecision?: StudioDecision
  confidence: "low" | "medium" | "high"
  severity: "low" | "medium" | "high"

  gateIds: string[]
  evidenceSignalIds: string[]
  issueIds: string[]
  roadmapIds: string[]
  capacitySignalIds: string[]

  suggestedAction?: string
  createdAt: string
}
```

Implementation can keep the existing `AIInsight` type temporarily and map it to
Studio Analyst language. Do not force a full type migration before the UI needs
it.

---

# Surface Requirements

## Studio Command Center

Show:
- one primary analyst recommendation
- recommended studio move
- reason
- evidence basis
- capacity tradeoff
- source links

This should reinforce the top studio decision, not compete with it.

## Studio Analyst Route

The `/assistant` route should become the deeper analyst surface.

It should organize signals by:
- recommended moves
- evidence gaps
- capacity tradeoffs
- validation risks
- source-linked analysis

Avoid presenting a chat interface.

## App Shell Analyst Panel

The side panel should remain compact and contextual.

It should show:
- top analyst signal
- relevant source links
- quick path to deeper analyst route or drawer

## Issue Drawer

Show analyst notes related to:
- evidence role
- missing criteria
- gate linkage
- capacity impact
- risk to studio decision

## Roadmap Drawer

Show analyst notes related to:
- bet confidence
- linked gate
- missing evidence
- execution outpacing validation
- capacity tradeoff

---

# Empty States

## No Analyst Signals

```txt
No analyst signals yet.
Add ventures, gates, evidence, or capacity context to generate studio recommendations.
```

## Clean Platform

```txt
No studio decisions to analyze.
Create a venture and capture the first gate or evidence item.
```

## New Custom Venture

```txt
No analyst recommendation yet.
Start by defining the venture's current assumption or first validation gate.
```

Do not invent fake recommendations for empty states.

---

# Local-First Continuity

Persist lightweight user intent:
- inspected signal IDs
- dismissed signal IDs
- selected analyst signal if already supported

Do not persist:
- fake chat transcripts
- LLM responses
- streaming state
- autonomous agent memory

Analyst analysis should remain deterministic and derived from current local
workspace state.

---

# Seeded Demo Requirements

## Sentra

Analyst story:
- higher-confidence growth / activation work
- design or product capacity needs protection
- recommended move: continue or staff-up with capacity protection

Example:

```txt
Continue with capacity protection.
Sentra has stronger activation evidence, but design load is crossing watch
threshold.
```

## Reson8

Analyst story:
- validation confidence is weak
- active execution continues
- capacity cost is visible
- recommended move: narrow or pause

Example:

```txt
Narrow before another build cycle.
Retention evidence is weak while engineering remains active.
```

## Internal Ops

Analyst story:
- stable operating leverage
- contained scope
- capacity may be reallocated
- recommended move: defer or continue steady-state

Example:

```txt
Defer new Internal Ops scope.
Current leverage work is stable and can free PM attention for higher-pressure
ventures.
```

---

# UI Rules

## Avoid

- chat bubbles
- avatars
- typing animations
- fake streaming
- conversational windows
- anthropomorphic copy
- glowing AI branding
- long generated prose
- autonomous agent theatrics

## Prefer

- structured analyst blocks
- decision badges
- evidence links
- confidence indicators
- source chips
- compact recommendation panels
- contextual drawer sections

---

# Copy Guidelines

Prefer:
- Studio Analyst
- Recommended move
- Evidence gap
- Capacity tradeoff
- Sunk-cost risk
- Gate confidence
- Source evidence
- Narrow before build cycle
- Continue with capacity protection

Avoid:
- AI assistant
- ask AI
- chat with AI
- AI says
- magic insight
- productivity summary
- generated response

Some internal component names may remain `assistant` until refactored. Visible
product copy should move toward Studio Analyst language.

---

# Anti-Patterns

DO NOT:
- build chatbot-first UX
- simulate autonomous agents
- add fake streaming responses
- create AI gimmicks
- overload users with analysis
- create overly verbose recommendations
- use anthropomorphic language
- pretend analyst recommendations are always correct
- recommend decisions without source evidence
- summarize task status without connecting to gates, evidence, or capacity
- add real LLM infrastructure

---

# Verification

For implementation work, verify:
- `/assistant` uses Studio Analyst framing in visible copy
- Command Center analyst block recommends a studio move
- Reson8 analyst signal recommends narrow or pause with gate/evidence reasoning
- Sentra analyst signal references capacity protection or staff-up logic
- Internal Ops analyst signal remains stable and low-noise
- issue drawer analyst note cites evidence/gate context when present
- roadmap drawer analyst note cites gate/evidence/capacity context when present
- clean platform state does not invent analyst certainty
- custom venture state offers a direct first action
- dismissed / inspected signal state still persists

Suggested checks:

```txt
npm run lint
npm run build
```

For UI changes, also browser-check:

```txt
/assistant
/dashboard
/issues
/roadmap
```

---

# Success Criteria

The Studio Analyst succeeds when a reviewer understands:

> Foundary recommends what the studio should do next and shows the evidence
> behind that recommendation.

It fails if the reviewer thinks:

> This is a generic AI summary panel.

The desired product feeling is:

> The intelligence is quiet, source-linked, and useful for continue, narrow,
> pause, kill, staff-up, defer, or partner-review decisions.
