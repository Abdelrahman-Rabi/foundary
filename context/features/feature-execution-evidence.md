# Feature Specification - Execution Evidence

## Purpose

Execution Evidence reframes Foundary's issues and roadmap items as proof-bearing
work.

Issues and roadmap items should no longer behave like generic delivery objects.
They should help the studio understand whether execution is proving, disproving,
unblocking, de-risking, or merely consuming capacity against a venture decision.

Execution Evidence should answer:
- what assumption this work relates to
- which validation gate it supports
- what evidence role it plays
- whether it changes confidence
- what operator capacity it consumes
- how it affects the recommended studio move

Execution Evidence should feel like:

> fast execution work with strategic consequence.

It should NOT feel like:

> a long research database attached to every task.

---

# Strategic Role

Execution Evidence sits between validation gates and operator capacity:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

Its job is to make execution meaningful.

Generic project management asks:

> What tasks are done?

Foundary should ask:

> What did this work prove, disprove, unblock, de-risk, or cost?

---

# Core Product Principle

Completed work is not automatically progress.

In a venture studio, execution only matters if it:
- increases validation confidence
- reduces a meaningful risk
- produces evidence for a gate
- unlocks a decision
- justifies more capacity
- reveals that work should stop

Execution that consumes capacity without changing evidence should be visible as
a risk, not celebrated as momentum.

---

# Route And Implementation Context

Execution Evidence appears primarily through existing surfaces:

```txt
/issues      -> issue evidence list, board, drawer, quick create
/roadmap     -> venture bets and validation initiatives
/dashboard   -> Command Center evidence summaries
/assistant   -> Studio Analyst source reasoning
```

Likely implementation areas:

```txt
src/types/issue.ts
src/types/roadmap.ts
src/types/ai.ts
src/data/issues.ts
src/data/roadmap.ts
src/data/ai-insights.ts
src/features/issues/*
src/features/roadmap/*
src/features/dashboard/*
src/features/assistant/utils/assistant-analysis.ts
src/features/synchronization/utils/sync-utils.ts
src/stores/issue-store.ts
src/stores/roadmap-store.ts
```

Implementation should preserve existing fast workflows and drawer patterns.

---

# Required Context

Load before implementation:

```txt
context/strategy/studio-operating-intelligence.md
context/project-overview.md
context/project-specs.md
context/features/feature-execution-evidence.md
context/current-feature.md
```

Load additionally when touching:

```txt
Validation gates:
context/features/feature-validation-gates.md

Command Center:
context/features/feature-studio-command-center.md

Issues:
context/features/feature-issues.md

Roadmap:
context/features/feature-roadmap.md

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

# Evidence Roles

Every evidence-linked issue or roadmap item should have a lightweight role.

```ts
type EvidenceRole =
  | "prove"
  | "disprove"
  | "unblock"
  | "de-risk"
  | "capacity-cost"
```

## Prove

Work that supports a gate assumption.

Example:

```txt
Activation cohort analysis confirms trial users complete setup within target.
```

## Disprove

Work that challenges or invalidates an assumption.

Example:

```txt
Retention interviews show target users do not repeat the workflow.
```

## Unblock

Work required before evidence can be collected.

Example:

```txt
Add retention instrumentation before evaluating the onboarding loop.
```

## De-risk

Work that reduces execution or technical uncertainty.

Example:

```txt
Prototype integration path to confirm the MVP can support the validation test.
```

## Capacity Cost

Work that consumes operator capacity without directly moving evidence.

Example:

```txt
Engineering polish continues while the retention gate remains weak.
```

Capacity-cost work is not always bad, but it should be visible.

---

# Evidence Strength

Evidence signals should communicate strength without fake precision.

```ts
type EvidenceStrength =
  | "weak"
  | "moderate"
  | "strong"
  | "negative"
```

Use strength to explain confidence movement:
- `strong`: materially supports the gate
- `moderate`: directionally useful, not decisive
- `weak`: insufficient or early signal
- `negative`: challenges the gate assumption

---

# Confidence Impact

Evidence should describe how it affects validation confidence.

```ts
type ConfidenceImpact =
  | "increase"
  | "decrease"
  | "neutral"
```

Important rule:

> Work status and confidence impact are separate.

An issue can be `done` and still have neutral or negative confidence impact.

---

# Issue Evidence Model Direction

Extend issues incrementally toward:

```ts
type IssueExecutionEvidence = {
  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  evidenceRole?: EvidenceRole
  evidenceStrength?: EvidenceStrength
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision
}
```

Future issue shape may include:

```ts
type Issue = {
  id: string
  ventureId: string
  roadmapId?: string

  title: string
  description: string

  type: "feature" | "bug" | "experiment" | "tech-debt" | "research"
  priority: "urgent" | "high" | "medium" | "low"
  status: "backlog" | "planned" | "in-progress" | "in-review" | "done" | "killed"

  validationGateId?: string
  assumptionId?: string
  evidenceRole?: EvidenceRole
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact

  createdAt: string
  updatedAt: string
}
```

Do not make all evidence fields mandatory. Quick create must remain fast.

---

# Roadmap Evidence Model Direction

Roadmap items should become venture bets or validation initiatives.

```ts
type RoadmapBetType =
  | "validation"
  | "growth"
  | "delivery"
  | "risk-reduction"
  | "leverage"
```

Extend roadmap items incrementally toward:

```ts
type RoadmapExecutionEvidence = {
  validationGateId?: string
  assumptionId?: string
  evidenceSignalIds?: string[]
  betType?: RoadmapBetType
  expectedEvidence?: string[]
  confidenceImpact?: ConfidenceImpact
  operatorImpact?: OperatorImpact
  decisionImpact?: StudioDecision
}
```

Roadmap cards should still be compact. Detailed evidence context belongs in
drawers and summaries.

---

# Evidence Signal Model Direction

Evidence signals can be seeded, derived, or later user-created.

```ts
type EvidenceSignal = {
  id: string
  ventureId: string
  gateId: string

  title: string
  summary: string

  signalType:
    | "customer-interview"
    | "activation"
    | "retention"
    | "conversion"
    | "revenue"
    | "technical-risk"
    | "capacity"
    | "market"
    | "qualitative"

  strength: EvidenceStrength
  confidenceImpact: ConfidenceImpact

  sourceIssueIds: string[]
  sourceRoadmapIds: string[]

  observedAt: string
}
```

Early implementation can keep signals in mock data or derive them from issues,
roadmap items, and analyst insights.

Do not add a heavy evidence capture product unless explicitly scoped later.

---

# Issue Surface Requirements

## Issue List

Add evidence context without hurting scan speed.

Potential indicators:
- gate badge
- evidence role badge
- confidence impact icon/label
- capacity impact marker

Rows should still prioritize:
- title
- priority
- status
- owner
- venture
- roadmap link

## Issue Board

Cards should remain compact.

Optional evidence indicators:
- small role badge
- gate abbreviation
- capacity-cost warning
- confidence-impact dot

Avoid turning board cards into mini reports.

## Issue Drawer

Drawer should explain evidence linkage clearly.

Recommended sections:
- Validation linkage
- Evidence role
- Confidence impact
- Operator impact
- Related roadmap bet
- Analyst note

Example:

```txt
Validation linkage
Gate: Reson8 retention signal
Role: Unblock
Impact: Enables cohort measurement before another build cycle
```

---

# Roadmap Surface Requirements

## Roadmap Board

Cards should read as venture bets or validation initiatives.

Add lightweight context:
- bet type
- linked gate
- confidence impact
- linked evidence count

## Roadmap Drawer

Drawer should connect strategy to evidence.

Recommended sections:
- Bet / initiative purpose
- Linked validation gate
- Expected evidence
- Linked issues
- Evidence signals
- Operator impact
- Recommended studio decision

Example:

```txt
Expected evidence
- Activation rate reaches 40% in target segment
- Interview feedback confirms repeat use intent
```

---

# Command Center Requirements

The Command Center should summarize execution evidence at the decision level.

It should show:
- evidence linked to top decision
- work supporting the current gate
- work challenging the current gate
- work consuming capacity without confidence movement
- source links into issue and roadmap drawers

The Command Center should not duplicate full issue or roadmap views.

---

# Studio Analyst Requirements

Studio Analyst recommendations should cite execution evidence.

Analyst output should explain:
- which work supports the recommendation
- what evidence is missing
- whether execution is ahead of validation
- whether capacity cost is justified
- what source objects are linked

Avoid recommendations that only summarize task status.

---

# Quick Create Rules

Quick create must remain low-friction.

Default quick create fields should not become heavy.

Recommended approach:
- keep title, venture, type, priority as primary
- optionally include gate/evidence role only when context is already known
- allow evidence metadata to be added later in the drawer

Examples:
- creating from a gate can prefill `validationGateId`
- creating from a roadmap bet can prefill `roadmapId`
- creating from Command Center top decision can prefill evidence context

Do not force users to classify every issue before capture.

---

# Filter And Search Requirements

Future filters may include:
- validation gate
- evidence role
- confidence impact
- capacity impact
- linked / unlinked evidence
- decision impact

Keep filters compact.

Avoid enterprise query builders or complex advanced search.

---

# Empty States

## No Evidence Linked

```txt
No evidence linked yet.
Connect this work to a gate, assumption, or roadmap bet when it starts informing a studio decision.
```

## Work Without Evidence Context

```txt
This work is not linked to a validation gate.
Add evidence context if it should influence a continue, narrow, pause, or kill decision.
```

## Capacity Cost Without Confidence Movement

```txt
This work consumes capacity without moving validation confidence yet.
Confirm the gate before extending scope.
```

## Empty State Rules

Prefer:
- concise guidance
- direct action
- no fake certainty
- no guilt-heavy copy

Avoid:
- tutorials
- long explanations
- noisy warnings for every unlinked task

---

# Seeded Demo Requirements

Seeded issues and roadmap items should demonstrate different evidence roles.

## Sentra

Use evidence to show:
- activation or growth signal improving
- some capacity-cost tension around design/product work
- continue or staff-up decision with capacity protection

Example evidence roles:
- prove
- de-risk
- capacity-cost

## Reson8

Use evidence to show:
- retention or repeat-use signal is weak
- execution is active despite low gate confidence
- narrow or pause decision is justified

Example evidence roles:
- disprove
- unblock
- capacity-cost

## Internal Ops

Use evidence to show:
- operating leverage is stable
- internal work frees capacity
- intervention is low urgency

Example evidence roles:
- prove
- de-risk

---

# Synchronization Rules

Issue evidence changes should affect:
- validation gate confidence
- Command Center attention queue
- Studio Analyst recommendations
- roadmap bet confidence
- operator capacity interpretation

Roadmap evidence changes should affect:
- validation gate context
- Command Center top decision
- linked issue interpretation
- analyst recommendation

Evidence signal changes should affect:
- gate confidence
- decision pressure
- analyst reasoning

Do not implement fragile circular updates. Prefer derived calculations where
possible.

---

# UX Requirements

## Must Feel

- fast
- linked
- evidence-backed
- calm
- operational
- studio-native

## Must Avoid

- heavy metadata capture
- research database UI
- enterprise forms
- evidence bureaucracy
- slowing down issue creation
- hiding evidence only in AI summaries

## Visual Guidance

Use:
- compact badges
- small inline labels
- drawer sections
- linked source chips
- restrained confidence indicators

Avoid:
- large evidence panels on every card
- overloaded board cards
- multi-step classification flows
- mandatory evidence forms

---

# Copy Guidelines

Prefer:
- Execution evidence
- Evidence role
- Linked gate
- Assumption tested
- Confidence impact
- Capacity cost
- Proves
- Disproves
- Unblocks
- De-risks

Avoid:
- task output
- productivity
- project progress
- done means validated
- generic linked work
- AI-generated proof

---

# Anti-Patterns

DO NOT:
- make evidence metadata mandatory for every issue
- make quick create slow
- create a separate heavy evidence management route
- treat done issues as automatic confidence increases
- bury all evidence context in analyst text
- create enterprise traceability matrices
- add approval workflows
- add backend evidence services
- add finance or cap-table logic
- overstuff issue or roadmap cards

---

# Verification

For implementation work, verify:
- issues can still be created quickly
- list and board views remain compact
- issue drawer shows evidence context when present
- roadmap drawer shows evidence context when present
- Command Center can reference source evidence
- Studio Analyst cites evidence instead of only task status
- done work does not automatically imply validation confidence
- unlinked work does not create noisy warnings everywhere
- start-clean state does not invent evidence
- custom ventures can begin without fake evidence

Suggested checks:

```txt
npm run lint
npm run build
```

For UI changes, also browser-check:

```txt
/issues
/roadmap
/dashboard
/assistant
```

---

# Success Criteria

Execution Evidence succeeds when a reviewer understands:

> Foundary turns issues and roadmap work into evidence for studio decisions.

It fails if the reviewer thinks:

> These are just tickets with extra labels.

The desired product feeling is:

> This work has consequence. It either proves, disproves, unblocks, de-risks, or
> consumes scarce studio capacity.
