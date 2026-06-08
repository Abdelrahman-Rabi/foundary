# Current Feature - Product Clarity and Aha Moment Improvement

## Current Objective

Improve Foundary's first-time comprehension, Aha moment speed, decision hierarchy, and cross-screen narrative without weakening the Studio Operating Intelligence strategy.

The previous phase repositioned Foundary from a venture execution workspace into a studio operating intelligence layer for deciding where to spend time, talent, and capital.

This phase does not reposition the product again.

This phase translates the existing strategy into a clearer, easier-to-understand product experience.

Foundary should now feel like:

> a compact, Linear-inspired studio command center that helps venture builders decide where to focus next.

The core product promise remains:

> Foundary helps venture studios prevent wasted execution.

The target Aha moment is:

> Foundary helps venture studios decide what to continue, narrow, pause, or stop before wasting more execution time.

---

## Active Product Spine

The internal product spine remains:

```txt
Portfolio Decisions
-> Validation Gates
-> Execution Evidence
-> Operator Capacity
-> Studio Analyst Recommendations
```

For user-facing UX, translate this into simpler decision language:

```txt
What should we do?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```

Every major screen should help answer these questions without requiring a verbal walkthrough.

---

## Why This Phase Exists

After reviewing the current product UI, the strategic direction is strong but the Aha moment is still too delayed.

A first-time reviewer may still ask:

- What is Foundary?
- What problem does it solve?
- What should I do first?
- Why is this different from Linear?
- How do Command Center, Evidence, Bets, and Studio Analyst connect?

The product currently contains the right concepts, but the hierarchy and copy do not make the value obvious fast enough.

The goal is to make Foundary easier to understand without making it heavier.

---

## Expected Product Behavior

- **Command Center** opens with a dominant recommended move and explains why it matters, what evidence supports it, and what capacity is constrained.
- **Evidence** shows execution work as proof, risk, unlocks, de-risking, or capacity cost against a studio decision.
- **Bets** show validation initiatives with confidence, missing proof, evidence count, capacity impact, and recommended studio move.
- **Studio Analyst** leads with the highest-leverage recommendation before showing the supporting signal feed.
- **Cross-screen navigation** connects Command Center decisions to Evidence, Evidence to Bets, and Studio Analyst reasoning to source objects.
- **Seeded data** makes the studio operating story obvious:
  - Sentra: promising but capacity constrained.
  - Reson8: weak validation with active execution and sunk-cost risk.
  - Internal Ops: stable, contained, and not distracting the studio.
- **Existing workflows** remain fast, compact, local-first, and Linear-inspired.

---

## Current Improvement Priorities

Follow this order:

```txt
1. Copy and hierarchy clarity pass
2. Command Center Aha redesign
3. Evidence decision linkage
4. Bets decision-state upgrade
5. Studio Analyst decision-first restructure
6. Cross-screen narrative and click path
7. Seeded story and demo data tuning
8. Final polish and Linear-inspired submission readiness
```

Do not add new product areas before completing the clarity and hierarchy pass.

---

## Technical Approach

1. **Master clarity plan**: Use `context/product-clarity-improvement-plan.md`.
2. **Strategy source of truth**: Use `context/strategy/studio-operating-intelligence.md`.
3. **Implementation roadmap**: Use `context/implementation-roadmap.md` only for sequencing and historical context.
4. **Feature specs**: Load only the relevant clarity feature spec for the current slice once created:
   - `context/features/feature-copy-hierarchy.md`
   - `context/features/feature-command-center-aha.md`
   - `context/features/feature-evidence-decision-linkage.md`
   - `context/features/feature-bets-decision-state.md`
   - `context/features/feature-studio-analyst-decision-first.md`
   - `context/features/feature-cross-screen-narrative.md`
5. **Data/story context**: Use `context/data/seeded-demo-story.md`, `context/data/domain-models.md`, `context/data/mock-data-strategy.md`, and `context/data/ai-behavior-rules.md` when changing data, source links, analyst behavior, or demo story coherence.
6. **Implementation style**: Prefer copy changes, hierarchy refinements, existing component adaptation, and lightweight derived fields before creating new stores or routes.
7. **Route reuse**: Keep current routes unless a task explicitly scopes route renaming:
   - `/dashboard` -> Command Center
   - `/issues` -> Evidence
   - `/roadmap` -> Bets / Validation Initiatives
   - `/assistant` -> Studio Analyst

---

## Required Context For Implementation Agents

Always load:

```txt
context/current-feature.md
context/product-clarity-improvement-plan.md
context/strategy/studio-operating-intelligence.md
```

Then load only the feature context required by the current task:

```txt
Copy and hierarchy:
context/features/feature-copy-hierarchy.md

Command Center:
context/features/feature-command-center-aha.md
context/data/seeded-demo-story.md

Evidence:
context/features/feature-evidence-decision-linkage.md
context/data/domain-models.md

Bets:
context/features/feature-bets-decision-state.md
context/data/domain-models.md
context/data/seeded-demo-story.md

Studio Analyst:
context/features/feature-studio-analyst-decision-first.md
context/data/ai-behavior-rules.md
context/data/seeded-demo-story.md

Cross-screen narrative:
context/features/feature-cross-screen-narrative.md
context/data/seeded-demo-story.md

Final QA:
context/qa/final-review-checklist.md
```

Load legacy feature specs only when compatibility with existing implementation details is needed:

```txt
Dashboard route: context/features/feature-dashboard.md
Issues route: context/features/feature-issues.md
Roadmap route: context/features/feature-roadmap.md
Navigation/layout: context/features/feature-navigation.md
Design system: context/features/feature-design-system.md
Previous Phase 14 specs:
context/features/feature-studio-command-center.md
context/features/feature-validation-gates.md
context/features/feature-execution-evidence.md
context/features/feature-operator-capacity.md
context/features/feature-ai-assistant.md
```

---

## Explicitly Out Of Scope

Do not add:

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
- New dashboards or heavy reporting surfaces
- Heavy capacity planning workflows
- Complex gate configuration systems

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

- the Command Center explains Foundary's value within 30 seconds
- the top recommended move is obvious
- Evidence feels like evidence, not renamed issues
- Bets show recommended move and missing proof
- Studio Analyst leads with a decision, not only a feed
- seeded demo state tells the clarity story
- start-clean state does not invent fake evidence, capacity, or analyst certainty
- custom venture state offers a direct first action
- local-first reset/export/import behavior remains intact where touched
- the product still feels compact, calm, fast, and Linear-inspired
