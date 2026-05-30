# Feature Specification - Venture Setup

## Purpose

Venture Setup is the next product-phase layer after local-first continuity.

It allows a user to add a new venture context inside the local Foundary
workspace without introducing backend, account, organization, or settings
complexity.

The feature should make Foundary feel:
- more personally usable
- venture-aware beyond the seeded demo
- still calm, lightweight, and local-first

It should NOT turn Foundary into:
- an admin console
- a company settings product
- a multi-user workspace manager
- a CRM or portfolio database

---

# Product Goal

Users should be able to create a new venture and immediately see it become a
first-class operational context across the shell, dashboard, issues, roadmap,
assistant, and persistence layer.

The experience should answer:

| Question | Purpose |
|---|---|
| What venture am I creating? | Establish operational context |
| What stage is it in? | Seed believable default health and momentum |
| Where does it appear? | Confirm venture switcher and portfolio awareness |
| Can I start execution work? | Connect venture creation to issues and roadmap |
| Will it survive refresh/export/import? | Preserve local-first continuity |

---

# Scope

## Included

- Add a local-first venture creation workflow.
- Add the created venture to the venture switcher.
- Make created ventures available to dashboard, issues, roadmap, and assistant
  derived views.
- Persist custom ventures through local workspace storage.
- Include custom ventures in export/import/reset behavior.
- Provide a useful empty operational state for a newly created venture.
- Allow the user to create first issue or first roadmap initiative from the new
  venture context.

## Explicitly Excluded

- Backend venture APIs.
- Backend database persistence.
- Authentication or user ownership.
- Team invitations.
- RBAC or permissions.
- Billing or plans.
- Workspace settings pages.
- Venture archival workflows.
- Detailed portfolio CRM fields.
- Logo upload or asset storage.
- Multi-step onboarding tours.

---

# Recommended UX

## Entry Points

Preferred entry points:
- Venture switcher dropdown: compact "New venture" action.
- Command palette: "Create venture".

Optional if it stays lightweight:
- Empty portfolio prompt when only seeded/reset state exists.

Avoid:
- A dedicated settings page.
- A large onboarding wizard.
- A marketing-style creation screen.

---

## Creation Surface

Use a compact overlay or drawer consistent with the existing quick-create
patterns.

The surface should include:
- venture name
- short description
- stage
- optional color/icon preview

Keep it fast. A user should be able to create a believable venture in under
30 seconds.

---

## Minimum Fields

```ts
type CreateVentureInput = {
  name: string
  description: string
  stage: "idea" | "validation" | "mvp" | "growth"
}
```

Generated fields:
- `id`
- `slug`
- `icon`
- `color`
- `health`
- `momentum`
- `activeRoadmapCount`
- `activeIssueCount`
- `overdueIssueCount`
- `progress`
- `confidence`
- `createdAt`
- `updatedAt`

---

# Default Venture Seeding Rules

Created ventures should start with calm, believable defaults:

```ts
{
  health: "stable",
  momentum: "moderate",
  activeRoadmapCount: 0,
  activeIssueCount: 0,
  overdueIssueCount: 0,
  progress: 0,
  confidence: 60
}
```

Stage may lightly influence defaults:

| Stage | Health | Momentum | Confidence |
|---|---|---|---|
| idea | stable | slow | 50 |
| validation | stable | moderate | 58 |
| mvp | stable | moderate | 64 |
| growth | stable | high | 70 |

These defaults should be easy to understand and not pretend the system knows
more than the user has entered.

---

# Cross-Feature Behavior

## App Shell

- Newly created ventures appear in the venture switcher immediately.
- After creation, switch active context to the new venture.
- Portfolio mode should include the new venture in counts and health summaries.
- The command palette should expose venture creation without feeling like a
  settings system.

## Dashboard

For a new venture with no issues or roadmap items:
- show a quiet operational empty state
- avoid implying risk where no work exists
- provide direct actions for first issue and first roadmap initiative

Portfolio dashboard should include the new venture with zero/initial metrics.

## Issues

When the new venture is active:
- list and board views should show an empty state scoped to that venture
- quick-created issues should attach to the active venture
- filters should not hide the empty state in a confusing way

## Roadmap

When the new venture is active:
- Now / Next / Later columns should show empty venture-specific states
- quick-created initiatives should attach to the active venture
- linked issue options should only include issues from the active venture

## AI Assistant

For a new venture with little or no work:
- assistant should surface clarity-oriented setup guidance
- avoid fake risks or invented operational claims
- suggest first useful actions, such as defining a validation initiative or
  capturing the first execution issue

Do not create chatbot behavior.

---

# Persistence Behavior

Custom ventures are execution state and must be included in the local-first
workspace schema.

Persistence must cover:
- custom venture records
- active custom venture context
- issue and roadmap records linked to custom ventures
- export/import of custom ventures
- reset back to seeded demo ventures only

Invalid imported ventures must not crash the app or overwrite current valid
state.

---

# Data And Validation Rules

## Venture Name

- Required.
- Trim whitespace.
- Prefer 2-48 visible characters.
- Do not allow duplicate slugs in the current workspace.

## Slug

- Generated from name.
- Lowercase.
- URL-safe style.
- If duplicate, append a short numeric suffix.

## Icon

- Generated from the first meaningful letter of the venture name.
- Keep current compact lettermark style.

## Color

- Use a small fixed palette of local UI-safe colors.
- Avoid adding a custom color picker.
- Color should work in the dark theme.

---

# State Management Guidance

`useVentureStore` should become the source of truth for both seeded and custom
ventures.

Required store capabilities:

```ts
createVenture(input: CreateVentureInput): Venture
hydrate(state: { ventures?: Venture[]; activeVentureId?: string | null; mode?: VentureMode }): void
reset(): void
```

Avoid keeping `src/data/ventures.ts` as the only lookup source once custom
ventures exist. Derived code should read current ventures from the store when
runtime-created ventures matter.

---

# Implementation Notes For Future Agents

Likely files:

```txt
src/types/venture.ts
src/data/ventures.ts
src/stores/venture-store.ts
src/lib/persistence.ts
src/hooks/use-workspace-persistence.ts
src/components/app-shell/venture-switcher.tsx
src/components/app-shell/command-palette.tsx
src/components/app-shell/app-shell.tsx
src/features/dashboard/*
src/features/issues/*
src/features/roadmap/*
src/features/assistant/*
context/current-feature.md
context/agent-handoff.md
```

Touch with care:
- dashboard and assistant utilities may currently assume seeded ventures
- issue and roadmap filters may need to tolerate custom venture IDs
- reset/import behavior must protect current local state

---

# Anti-Patterns

Do NOT:
- add organization settings
- add invite flows
- add user management
- add backend-shaped repositories or service clients
- add a venture detail route
- add a CRM-like profile page
- add long onboarding steps
- generate fake AI certainty for empty ventures

---

# Success Criteria

Venture Setup succeeds when:
- a user can create a venture locally
- the new venture appears in the switcher immediately
- switching to the new venture updates all major surfaces
- first issue and first roadmap initiative workflows work in that context
- refresh/export/import preserve the custom venture
- reset returns to seeded demo ventures
- the product still feels compact, premium, and operational

The desired feeling is:

> "Foundary can hold my own venture context now."

NOT:

> "Foundary has become a settings-heavy admin product."
