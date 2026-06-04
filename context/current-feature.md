# Current Feature - Phase 14 Studio Operating Intelligence Repositioning

## Current Objective

Reposition Foundary from a venture execution workspace into a studio operating
intelligence layer for venture studios deciding where to spend time, talent, and
capital.

This phase should make Foundary feel like:

> a calm studio command center for preventing wasted execution.

The active product spine is:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

---

## Expected Product Behavior

- **Command Center first impression** shows the top studio decision, portfolio
  attention queue, validation risk, capacity pressure, execution evidence, and
  Studio Analyst recommendation.
- **Validation gates** clarify each venture's phase, assumption, required
  evidence, confidence, decision pressure, and recommended move.
- **Execution evidence** reframes issues and roadmap items as work that proves,
  disproves, unblocks, de-risks, or consumes capacity against a studio decision.
- **Operator capacity** makes shared product, design, engineering, GTM, and
  partner contention visible without becoming scheduling software.
- **Studio Analyst** recommends continue, narrow, pause, kill, staff up, defer,
  or partner-review decisions with source-linked evidence and capacity reasoning.
- **Seeded data** tells a coherent studio operating story:
  - Sentra: higher-confidence growth opportunity with capacity strain.
  - Reson8: validation uncertainty with active execution and sunk-cost risk.
  - Internal Ops: stable studio leverage with contained scope and freed capacity.
- **Existing workflows** remain fast, local-first, compact, and non-enterprise.

---

## Technical Approach

1. **Strategy source of truth**: Use
   `context/strategy/studio-operating-intelligence.md`.
2. **Implementation roadmap**: Follow Phase 14 in
   `context/implementation-roadmap.md`.
3. **Feature specs**: Load only the relevant Phase 14 feature spec for the
   current slice:
   - `context/features/feature-studio-command-center.md`
   - `context/features/feature-validation-gates.md`
   - `context/features/feature-execution-evidence.md`
   - `context/features/feature-operator-capacity.md`
   - `context/features/feature-ai-assistant.md`
4. **Data/model context**: Use `context/data/domain-models.md`,
   `context/data/mock-data-strategy.md`, and `context/data/ai-behavior-rules.md`
   when changing models, seeded data, derived intelligence, or analyst behavior.
5. **Incremental implementation**: Prefer typed mock data and derived utilities
   before adding new stores or feature folders.
6. **Existing route reuse**: Keep current routes unless a task explicitly scopes
   route renaming:
   - `/dashboard` -> Studio Command Center
   - `/issues` -> Execution Evidence
   - `/roadmap` -> Venture Bets / Validation Initiatives
   - `/assistant` -> Studio Analyst

---

## Required Context For Implementation Agents

Always load:

```txt
context/strategy/studio-operating-intelligence.md
context/current-feature.md
```

Then load only the feature context required by the current task:

```txt
Command Center:
context/features/feature-studio-command-center.md

Validation Gates:
context/features/feature-validation-gates.md

Execution Evidence:
context/features/feature-execution-evidence.md

Operator Capacity:
context/features/feature-operator-capacity.md

Studio Analyst:
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md
```

Load data context when changing models, seeded data, persistence, or derived
intelligence:

```txt
context/data/domain-models.md
context/data/mock-data-strategy.md
```

Load legacy feature specs only when compatibility with existing implementation
details is needed:

```txt
Dashboard route: context/features/feature-dashboard.md
Issues route: context/features/feature-issues.md
Roadmap route: context/features/feature-roadmap.md
Navigation/layout: context/features/feature-navigation.md
Design system: context/features/feature-design-system.md
```

---

## Explicitly Out Of Scope

- Backend APIs
- Authentication / RBAC
- Team invitations or organization management
- Real multi-tenant security
- Real AI provider integration
- Chatbot-first AI
- Product tours / onboarding walkthroughs
- Coach marks / tutorial overlays
- Support widgets
- Backend analytics / event tracking
- Billing / plans
- Settings-heavy UX pages
- Venture CRM profiles or venture detail routes
- Real scheduling systems
- Timesheets or staffing workflows
- Finance, bill-back, LP reporting, or cap-table systems
- Enterprise resource planning

---

## Verification Expectations

For documentation-only changes:

```txt
git diff --check -- <changed-files>
```

For implementation changes:

```txt
npm run lint
npm run build
```

For UI changes, browser-check the affected route and verify:
- seeded demo state tells the Phase 14 studio operating story
- start-clean state does not invent fake gates, evidence, capacity, or analyst
  certainty
- custom venture state offers a direct first action
- local-first reset/export/import behavior remains intact where touched
