# Current Feature - Phase 4 PLG Activation Planning

## Current Objective

Prepare the context and phased implementation roadmap for the next Foundary
product phase: PLG activation and first-time visitor discoverability.

This phase should make Foundary easier to understand and use for someone seeing
it for the first time, without introducing support-heavy onboarding, product
tours, chatbot guidance, backend analytics, account setup, or settings-heavy UX.

---

## Expected Product Behavior

- **First dashboard impression** explains venture health, execution pressure,
  roadmap confidence, and attention areas without a walkthrough.
- **Seeded demo data** tells a coherent venture operating story across ventures,
  issues, roadmap items, and assistant signals.
- **Next-best-action guidance** gives users one clear contextual move without
  turning into an onboarding checklist.
- **Clean/custom venture empty states** explain what belongs in each surface and
  offer direct first actions.
- **Product copy** feels venture-aware, strategic, compact, and PM-led.
- **Existing workflows** remain fast for returning users.

---

## Technical Approach

1. **Feature spec**: Use `context/features/feature-plg-activation.md` as the
   source of truth for Phase 4 planning.
2. **Implementation roadmap**: Follow Phase 13 in
   `context/implementation-roadmap.md`.
3. **Demo data coherence**: Tune seeded ventures, issues, roadmap items, and AI
   insights together rather than changing copy in isolation.
4. **Next-best-action pattern**: Reuse existing dashboard, empty state,
   quick-create, drawer, and command palette flows before adding new UI.
5. **Activation verification**: Test fresh demo state, start-clean state, and
   custom venture state as separate first-time paths.

---

## Required Context For Implementation Agents

Load:

```txt
context/features/feature-plg-activation.md
context/features/feature-navigation.md
context/data/domain-models.md
context/current-feature.md
```

Load additional feature specs only when modifying that surface:

```txt
Dashboard: context/features/feature-dashboard.md
Issues: context/features/feature-issues.md
Roadmap: context/features/feature-roadmap.md
Assistant: context/features/feature-ai-assistant.md
```

---

## Explicitly Out Of Scope

- Product tours / onboarding walkthroughs
- Coach marks / tutorial overlays
- Support widgets / chatbot onboarding
- Backend analytics / event tracking
- Account setup / auth / RBAC
- Team invites / organization management
- Billing / plans
- Real AI provider integration
- Settings-heavy UX pages
- Venture CRM profiles or venture detail routes
