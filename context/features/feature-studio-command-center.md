# Feature Specification - Studio Command Center

## Purpose

The Studio Command Center is Foundary's primary portfolio decision surface.

It replaces the old dashboard-first mental model with a decision-first operating
view for venture studios deciding where to spend attention, talent, and capital.

The Command Center should answer:
- which venture needs attention
- which validation gate is weak
- which execution work is evidence
- which operator capacity is constrained
- which studio move is recommended next

The Command Center should feel like:

> the weekly studio operating meeting, already synthesized.

It should NOT feel like:

> a generic metrics dashboard.

---

# Strategic Role

The Command Center is the top of the Studio Operating Intelligence spine:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Its job is to make the portfolio decision obvious before users inspect issues,
roadmap items, or analyst details.

The screen should help a studio partner decide:
- continue a venture
- narrow a venture
- pause a venture
- kill a venture
- staff up a venture
- defer work
- escalate to partner review

---

# Route And Implementation Context

Primary route:

```txt
/dashboard
```

The route may remain `/dashboard` during the transition, but the product meaning
should become Command Center.

Likely implementation areas:

```txt
src/app/dashboard/page.tsx
src/features/dashboard/hooks/use-dashboard-data.ts
src/features/dashboard/utils/dashboard-metrics.ts
src/features/dashboard/components/*
src/features/synchronization/utils/sync-utils.ts
src/features/assistant/utils/assistant-analysis.ts
src/stores/venture-store.ts
src/stores/issue-store.ts
src/stores/roadmap-store.ts
```

Future implementation may introduce a `studio-command-center` feature folder if
the surface becomes too distinct from dashboard internals. Until then, reuse the
existing dashboard route and component patterns.

---

# Required Context

Load before implementation:

```txt
context/strategy/studio-operating-intelligence.md
context/project-overview.md
context/project-specs.md
context/current-feature.md
context/features/feature-studio-command-center.md
```

Load additionally when touching related layers:

```txt
Validation gates:
context/features/feature-validation-gates.md

Execution evidence:
context/features/feature-execution-evidence.md

Operator capacity:
context/features/feature-operator-capacity.md

Studio Analyst:
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md

Domain data:
context/data/domain-models.md
context/data/mock-data-strategy.md
```

---

# Product Questions

The first viewport should answer these questions without a walkthrough:

| Question | Product Answer |
|---|---|
| Which venture needs attention? | Portfolio attention queue and top studio decision |
| Why does it need attention? | Validation gate status and evidence summary |
| Is work still justified? | Execution evidence and confidence impact |
| What capacity is constrained? | Operator capacity pressure |
| What should the studio do next? | Recommended studio move |

---

# Core Components

## 1. Top Studio Decision

## Purpose

This is the highest-signal decision card on the screen.

It should summarize the single most important studio move.

## Required Content

Display:
- venture name
- lifecycle phase
- current validation gate
- recommended decision
- decision reason
- confidence or pressure indicator
- linked evidence count
- capacity implication
- primary action

Example:

```txt
Reson8 needs a narrow decision before another build cycle.

Retention evidence is below the Validate gate threshold while engineering work
remains active.
```

## Recommended Decisions

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

## UX Rules

The card should feel:
- decisive
- compact
- evidence-backed
- calm
- serious without being alarmist

Avoid:
- vague status summaries
- decorative health labels
- "AI says" novelty framing
- multiple competing primary decisions

---

## 2. Portfolio Attention Queue

## Purpose

Ranks ventures by decision pressure.

This is the Command Center's primary portfolio comparison layer.

## Required Content

Each venture row/card should show:
- venture name
- lifecycle phase
- current validation gate
- decision pressure
- validation confidence
- capacity pressure
- recommended move
- concise attention reason

## Recommended Ordering

Sort by:
1. blocked or failed validation gate
2. low confidence with active execution
3. high capacity pressure
4. overdue or blocked execution evidence
5. partner-review urgency

## Example Rows

```txt
Reson8 | Validate | Retention gate at risk | Narrow | Engineering active despite weak evidence
```

```txt
Sentra | Build | Activation gate healthy | Continue | Design capacity needs protection
```

```txt
Internal Ops | Scale | Operating leverage stable | Defer | Low intervention needed
```

## UX Rules

Prefer:
- compact table-card hybrid
- clear venture identity
- restrained badges
- one concise reason per venture

Avoid:
- dense enterprise tables
- too many metrics per row
- generic traffic-light dashboards

---

## 3. Validation Risk Panel

## Purpose

Shows where validation confidence is weak or blocked.

This panel should distinguish validation risk from ordinary delivery risk.

## Required Content

Surface:
- weak gates
- missing evidence
- stale assumptions
- confidence drops
- active work with low evidence support

Each item should include:
- venture
- gate
- assumption or evidence gap
- current confidence
- recommended move
- linked source objects

## Example

```txt
Reson8 retention gate
Missing: repeat-use signal from target ICP
Confidence: 42%
Move: Narrow before build cycle
```

## UX Rules

Avoid generic risk language like:
- "project at risk"
- "needs attention"
- "blocked work"

Prefer studio-native language:
- "validation confidence dropped"
- "gate evidence missing"
- "execution outpacing evidence"
- "decision pressure rising"

---

## 4. Operator Capacity Panel

## Purpose

Shows when scarce shared studio capacity is constrained.

This panel should make operator contention visible without becoming a scheduling
or workforce-planning system.

## Required Content

Display capacity pressure across:
- product
- design
- engineering
- GTM
- partner / studio leadership time

Each capacity signal should show:
- function
- current pressure
- affected ventures
- contention reason
- downstream impact

## Example

```txt
Design capacity: 118%
Sentra activation work competes with Reson8 onboarding tests.
Impact: Reson8 validation milestone likely slips one cycle.
```

## UX Rules

Prefer:
- small load indicators
- compact contention summaries
- venture-linked impact notes

Avoid:
- calendar scheduling
- capacity spreadsheets
- utilization bureaucracy
- resource approval workflows

---

## 5. Execution Evidence Summary

## Purpose

Shows which issues and roadmap bets support or challenge the current studio
decision.

This panel should make execution work feel like evidence, not activity.

## Required Content

Surface:
- issues linked to current gates
- roadmap bets linked to assumptions
- evidence role counts
- work consuming capacity without enough evidence
- completed work that changed confidence

Evidence roles:

```ts
type EvidenceRole =
  | "prove"
  | "disprove"
  | "unblock"
  | "de-risk"
  | "capacity-cost"
```

## Example

```txt
4 active issues linked to Reson8 retention gate.
2 unblock evidence collection.
1 consumes engineering capacity without changing confidence.
```

## UX Rules

Evidence summaries should link to existing drawers and routes:
- issue drawer
- roadmap drawer
- filtered issues view
- filtered roadmap view

Avoid:
- creating a separate heavy evidence database UI
- turning the Command Center into a detailed task list
- duplicating every issue or roadmap field

---

## 6. Studio Analyst Recommendation

## Purpose

Provides a concise analyst-backed recommendation connected to gates, evidence,
and capacity.

## Required Content

Display:
- recommended move
- reason
- evidence basis
- capacity tradeoff
- suggested next action
- linked source objects

Example:

```txt
Recommended move: Narrow

Reason:
Reson8 has active engineering work, but retention evidence remains below the
Validate gate threshold.

Suggested action:
Pause broad build work and run targeted retention interviews before another
cycle.
```

## UX Rules

Avoid:
- chatbot framing
- assistant avatars
- decorative AI summaries
- long generated prose

Prefer:
- structured blocks
- short recommendation labels
- evidence links
- calm operational language

---

# Header And Page Framing

## Header Purpose

Orient the user without a marketing explanation.

## Recommended Header Content

Display:
- Command Center title
- portfolio or venture context
- concise operating summary
- optional date/status context

Example:

```txt
Command Center
Portfolio operating review. 1 venture needs a narrow decision, 1 has capacity pressure.
```

## Header Actions

Keep actions limited and existing-workflow aligned:
- create issue / evidence item
- create roadmap bet
- review analyst signals

Avoid:
- setup wizards
- onboarding prompts
- export/report CTAs as primary actions

---

# Portfolio Mode And Venture Mode

## Portfolio Mode

Portfolio mode should compare ventures and rank attention.

Prioritize:
- top studio decision
- attention queue
- cross-venture capacity pressure
- portfolio validation risks

## Active Venture Mode

Active venture mode should zoom into one venture's decision context.

Prioritize:
- current phase and gate
- recommended decision
- linked execution evidence
- operator impact
- analyst recommendation

## Switching Rules

Changing venture context should update:
- top decision
- attention queue scope
- validation risk panel
- capacity panel
- evidence summary
- analyst recommendation

---

# Empty And Clean States

## Clean Platform State

If no ventures or no work exists, the Command Center should not invent fake
risk.

It should explain what belongs here:

```txt
No studio decisions yet.
Create a venture, add a validation gate, or capture the first evidence item.
```

## New Custom Venture State

For a new venture with no work:

```txt
No evidence linked to this venture yet.
Start with the first assumption, validation gate, or execution item.
```

## Empty State Rules

Prefer:
- one primary action
- short operational language
- no fake AI certainty
- no celebratory tone

Avoid:
- tutorial copy
- onboarding checklists
- generic empty dashboard language

---

# Data Requirements

The Command Center should derive from:
- ventures
- issues
- roadmap items
- validation gates
- evidence signals
- operator allocations
- assistant / analyst signals

Early implementation can use derived mock logic. Do not add backend APIs.

## Suggested Derived Model

```ts
type CommandCenterDecision = {
  ventureId: string
  phase: VenturePhase
  gateId?: string
  recommendedDecision: StudioDecision
  pressure: "low" | "medium" | "high" | "critical"
  reason: string
  evidenceIds: string[]
  roadmapIds: string[]
  issueIds: string[]
  capacityImpact?: OperatorImpact
}

type CommandCenterData = {
  topDecision?: CommandCenterDecision
  attentionQueue: CommandCenterDecision[]
  validationRisks: ValidationRisk[]
  capacitySignals: CapacitySignal[]
  evidenceSummary: EvidenceSummary
  analystRecommendation?: AnalystRecommendation
}
```

These types are directional. Final names should match the implementation
patterns in `src/types/*` and feature utilities.

---

# Interaction Requirements

Users should be able to:
- open the top decision source
- inspect linked issue evidence
- inspect linked roadmap bets
- inspect validation gate context
- navigate to filtered issues or roadmap views
- switch venture context
- open analyst signal details

Interaction pattern:

```txt
Command Center item
  -> existing drawer or filtered route
  -> linked issue / roadmap / analyst details
```

Prefer existing drawer infrastructure before adding new navigation patterns.

---

# Synchronization Rules

Issue changes should affect:
- evidence summary
- attention queue
- linked gate confidence
- capacity pressure
- analyst recommendation

Roadmap changes should affect:
- validation confidence
- decision pressure
- evidence summary
- analyst recommendation

Venture switching should affect:
- all Command Center panels
- shell labels
- analyst context

Capacity changes should affect:
- top decision
- attention queue ordering
- analyst recommendation

---

# Design Requirements

## Must Feel

- calm
- decisive
- compact
- premium
- studio-native
- operationally intelligent
- evidence-backed

## Must Avoid

- enterprise BI
- generic KPI dashboard
- card clutter
- alert fatigue
- decorative analytics
- admin-panel energy
- one-note chart grids

## Layout Guidance

Recommended first viewport:

```txt
Header
Top Studio Decision
Portfolio Attention Queue + Studio Analyst Recommendation
Validation Risk + Operator Capacity + Execution Evidence Summary
```

Keep the most important decision above the fold.

Avoid oversized hero treatment. This is an operational product screen, not a
marketing page.

---

# Copy Guidelines

Prefer:
- Command Center
- Studio decision
- Recommended move
- Validation confidence
- Execution evidence
- Capacity pressure
- Gate at risk
- Evidence missing
- Narrow before build cycle
- Continue with capacity protection

Avoid:
- dashboard metrics
- project status
- AI summary
- task progress
- generic productivity
- everything looks good
- project health score

---

# Anti-Patterns

DO NOT:
- lead with generic KPI cards
- build a chart-heavy analytics surface
- add enterprise report filters
- introduce real finance or cap-table systems
- introduce scheduling or staffing workflows
- make every card an AI-generated paragraph
- hide the top studio decision below secondary metrics
- treat completed issues as automatic venture progress
- turn validation gates into a heavy workflow engine

---

# Verification

For implementation work, verify:
- `/dashboard` opens to a decision-first Command Center
- portfolio mode shows a top studio decision
- seeded ventures rank into a clear attention queue
- validation risk is visible
- operator capacity pressure is visible
- execution evidence links to source work
- analyst recommendation uses studio decision language
- active venture mode scopes the panels correctly
- start-clean state does not invent fake risk
- custom venture empty state offers a direct first action
- existing issue, roadmap, and analyst drawers still work

Suggested checks:

```txt
npm run lint
npm run build
```

For UI changes, also run a browser check of `/dashboard`.

---

# Success Criteria

The Studio Command Center succeeds when a reviewer can say:

> I can see which venture needs attention, why, and what the studio should do
> next.

It fails if the reviewer says:

> This is a nice dashboard.

The screen should make the new Foundary wedge obvious:

> Foundary helps venture studios prevent wasted execution.
