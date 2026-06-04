# Codebase Map - Foundary

## Purpose

This file gives development agents a fast orientation to the current Foundary
codebase.

Use it after `AGENTS.md` and `context/agent-onboarding.md`, before scanning
source files. It is a navigation map, not a replacement for feature specs or
nearby code inspection.

---

## App Shape

Foundary is a Next.js App Router application.

```txt
src/app
  layout.tsx       Root layout, fonts, global AppShell
  page.tsx         Redirects to /dashboard
  dashboard/       Command Center / operational overview route
  issues/          Execution Evidence / issue execution route
  roadmap/         Venture Bets / strategic roadmap route
  assistant/       Studio Analyst / operational intelligence route
```

The root layout wraps every route in:

```txt
src/components/app-shell/app-shell.tsx
```

Most product routes are thin client orchestrators. They import feature
components, pull state from stores/hooks, and wire navigation or drawer actions.

---

## Core Stack

```txt
Next.js App Router
React
TypeScript
Tailwind CSS v4
shadcn/ui style primitives
Zustand
Framer Motion
dnd-kit
Recharts
Lucide Icons
```

Do not add a new state library, styling system, routing layer, backend, or data
fetching architecture unless a plan explicitly authorizes it.

---

## Route Ownership

### `/dashboard`

Phase 14 meaning:

```txt
Studio Command Center
```

This route should increasingly answer:
- which venture needs attention
- which validation gate is weak
- which execution work is evidence
- which operator capacity is constrained
- which studio move is recommended

Start here:

```txt
src/app/dashboard/page.tsx
src/features/dashboard/hooks/use-dashboard-data.ts
src/features/dashboard/utils/dashboard-metrics.ts
src/features/dashboard/components/*
```

Owns:

- portfolio and active venture decision overview
- KPI row
- venture health / decision pressure
- risk and attention panels
- issue status counts
- roadmap / venture bet overview
- dashboard-facing Studio Analyst signals

Connection points:

- reads issues from `useIssueStore`
- reads roadmap from `useRoadmapStore`
- reads venture context from `useVentureStore`
- opens issue, roadmap, and assistant drawers through `useUiStore`
- routes KPI/status interactions into `/issues` or `/roadmap`
- derives synced roadmap and venture health through synchronization utilities

Use dashboard specs:

```txt
context/features/feature-studio-command-center.md
context/features/feature-dashboard.md
context/current-feature.md
```

### `/issues`

Phase 14 meaning:

```txt
Execution Evidence
```

This route should remain fast for issue execution, while gradually showing how
work proves, disproves, unblocks, de-risks, or consumes capacity against a
studio decision.

Start here:

```txt
src/app/issues/page.tsx
src/features/issues/hooks/use-issues-data.ts
src/features/issues/utils/issue-utils.ts
src/features/issues/components/*
src/stores/issue-store.ts
```

Owns:

- issue list view
- issue board view
- issue filters and sorting
- quick create issue
- issue drawer content
- status updates and board movement
- execution evidence indicators and drawer context when implemented

Connection points:

- issue data lives in `useIssueStore`
- current list/board mode lives in `useUiStore`
- venture scoping comes from `useVentureStore`
- roadmap options come from `useRoadmapStore`
- drawer opening uses `useUiStore.openDrawer({ type: "issue", id })`

Use issues specs:

```txt
context/features/feature-execution-evidence.md
context/features/feature-issues.md
context/current-feature.md
```

### `/roadmap`

Phase 14 meaning:

```txt
Venture Bets / Validation Initiatives
```

This route should keep Now / Next / Later board behavior, while gradually
framing roadmap items as bets linked to gates, assumptions, evidence, and
operator impact.

Start here:

```txt
src/app/roadmap/page.tsx
src/features/roadmap/utils/roadmap-utils.ts
src/features/roadmap/components/*
src/stores/roadmap-store.ts
src/features/synchronization/utils/sync-utils.ts
```

Owns:

- Now / Next / Later roadmap board
- roadmap filters
- confidence summary
- quick create roadmap item
- roadmap drawer content
- roadmap issue linkage UI
- venture bet / validation initiative context when implemented

Connection points:

- roadmap data lives in `useRoadmapStore`
- linked issue impact comes from `useIssueStore`
- venture scoping comes from `useVentureStore`
- synced progress, confidence, risk, and status come from synchronization utils
- drawer opening uses `useUiStore.openDrawer({ type: "roadmap", id })`

Use roadmap specs:

```txt
context/features/feature-execution-evidence.md
context/features/feature-roadmap.md
context/current-feature.md
```

Only load issue specs if the task changes issue-roadmap synchronization behavior.
Only load validation/capacity specs if the task changes gate or operator impact
behavior.

### `/assistant`

Phase 14 meaning:

```txt
Studio Analyst
```

This route may remain `/assistant`, but visible behavior should move toward
source-linked analyst recommendations for continue, narrow, pause, kill, staff
up, defer, or partner-review decisions.

Start here:

```txt
src/app/assistant/page.tsx
src/features/assistant/utils/assistant-analysis.ts
src/features/assistant/utils/*-signals.ts
src/features/assistant/components/*
src/stores/assistant-store.ts
```

Owns:

- operational priorities
- delivery risk summaries
- roadmap recommendations
- clarity gaps
- Studio Analyst signal inspection
- assistant / analyst drawer content

Connection points:

- derives signals from issues, roadmap items, ventures, and mocked insights
- filters dismissed/inspected signals through `useAssistantStore`
- uses synced roadmap items before analysis
- opens source issue/roadmap/assistant drawers through `useUiStore`

Use assistant specs:

```txt
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md
context/current-feature.md
```

---

## App Shell

Start here:

```txt
src/components/app-shell/app-shell.tsx
src/components/app-shell/app-drawer.tsx
src/components/app-shell/sidebar.tsx
src/components/app-shell/top-bar.tsx
src/components/app-shell/venture-switcher.tsx
src/components/app-shell/command-palette.tsx
src/components/app-shell/route-metadata.ts
src/components/app-shell/use-shell-shortcuts.ts
src/stores/ui-store.ts
src/stores/venture-store.ts
```

Owns:

- persistent shell layout
- sidebar and top bar
- venture switching
- mobile navigation
- command palette
- assistant side panel shell
- global drawer
- quick create overlays
- keyboard shortcuts

Important flow:

```txt
Route or component action
  -> useUiStore.openDrawer(...)
  -> AppDrawer
  -> IssueDrawerContent / RoadmapDrawerContent / AssistantDrawerContent
```

Quick create flow:

```txt
Header, command palette, or shell action
  -> useUiStore.openQuickCreateIssue/openQuickCreateRoadmap
  -> AppShell renders QuickCreateIssue/QuickCreateRoadmapItem
  -> feature store creates item
```

Use navigation/layout specs:

```txt
context/features/feature-navigation.md
context/features/feature-design-system.md
context/current-feature.md
```

---

## State Stores

```txt
src/stores/venture-store.ts
```

Owns portfolio vs single-venture mode and active venture selection.

```txt
src/stores/ui-store.ts
```

Owns UI-only state: drawer, sidebar, assistant panel, mobile nav, command
palette, quick create overlays, and issues list/board mode.

```txt
src/stores/issue-store.ts
```

Owns issue records, issue filters, issue creation, issue updates, sorting state,
and issue status movement.

```txt
src/stores/roadmap-store.ts
```

Owns roadmap records, roadmap filters, roadmap creation, roadmap updates,
timeframe/status movement, and roadmap-issue linkage.

```txt
src/stores/assistant-store.ts
```

Owns selected signal, assistant filters, inspected signals, and dismissed
signals.

Store guidance:

- select only the state/actions needed by a component
- avoid selectors that create fresh arrays or objects every render
- derive collections in hooks/utilities with `useMemo`
- keep backend-like concerns out of stores

---

## Data And Types

Mock data lives in:

```txt
src/data/ventures.ts
src/data/issues.ts
src/data/roadmap.ts
src/data/ai-insights.ts
src/data/users.ts
src/data/tags.ts
src/data/index.ts
```

Phase 14 may add:

```txt
src/data/validation-gates.ts
src/data/evidence-signals.ts
src/data/operator-capacity.ts
```

Domain types live in:

```txt
src/types/venture.ts
src/types/issue.ts
src/types/roadmap.ts
src/types/ai.ts
src/types/dashboard.ts
src/types/user.ts
src/types/tag.ts
src/types/index.ts
```

Phase 14 model additions should usually start in the closest existing type file:

```txt
src/types/venture.ts     phases, gates, decisions, venture health
src/types/issue.ts       execution evidence and operator impact
src/types/roadmap.ts     venture bets and validation initiatives
src/types/ai.ts          Studio Analyst signals
src/types/dashboard.ts   Command Center derived data
```

When adding data fields, update the matching type and mock data together.

Use explicit domain unions where possible. Avoid `any`.

---

## Shared UI And Layout

Shared layout helpers:

```txt
src/components/layout/page-container.tsx
src/components/layout/page-header.tsx
src/components/layout/page-transition.tsx
src/components/layout/section-shell.tsx
```

Shared primitives:

```txt
src/components/ui/*
```

Shared status surfaces:

```txt
src/components/shared/empty-state.tsx
src/components/shared/skeleton.tsx
```

Use existing primitives before creating new shared components.

Feature-specific UI should usually stay inside its feature folder until there is
real reuse across features.

---

## Feature Folder Pattern

Feature folders use this shape:

```txt
src/features/<feature>/components
src/features/<feature>/hooks
src/features/<feature>/utils
```

Current feature folders:

```txt
src/features/dashboard
src/features/issues
src/features/roadmap
src/features/assistant
src/features/synchronization
```

Dashboard uses a hook plus metric utilities. In Phase 14, this route is the
likely implementation home for Command Center panels until a dedicated feature
folder is justified.

Issues uses a hook plus filter/sort utilities. In Phase 14, this remains the
execution workflow home while gaining evidence context.

Roadmap uses board components plus roadmap utilities. In Phase 14, this remains
the Now / Next / Later board while roadmap items become venture bets.

Assistant uses signal-generation utilities and presentational signal components.
In Phase 14, visible product behavior should be Studio Analyst.

Synchronization contains shared calculations that connect issues, roadmap, and
venture health. Phase 14 may extend it to gates, evidence, capacity, and Command
Center ranking. Treat it as cross-feature logic.

---

## Cross-Feature Connections

### Venture Context

Venture mode affects dashboard, issues, roadmap, assistant, app shell labels, and
drawer validity.

Source of truth:

```txt
src/stores/venture-store.ts
```

When implementing local-first venture setup, also load:

```txt
context/features/feature-venture-setup.md
context/features/feature-navigation.md
context/data/domain-models.md
```

Likely touch points:

```txt
src/types/venture.ts
src/data/ventures.ts
src/stores/venture-store.ts
src/lib/persistence.ts
src/hooks/use-workspace-persistence.ts
src/components/app-shell/venture-switcher.tsx
src/components/app-shell/command-palette.tsx
```

### Drawer System

All global drill-downs flow through:

```txt
src/stores/ui-store.ts
src/components/app-shell/app-drawer.tsx
```

Drawer content is feature-owned:

```txt
src/features/issues/components/issue-drawer-content.tsx
src/features/roadmap/components/roadmap-drawer-content.tsx
src/features/assistant/components/assistant-drawer-content.tsx
```

### Issue And Roadmap Synchronization

Issue-roadmap calculations flow through:

```txt
src/features/synchronization/utils/sync-utils.ts
```

This affects:

- roadmap progress
- roadmap confidence
- roadmap risk
- roadmap status
- venture health
- dashboard metrics
- assistant signals

Change with care.

### Studio Operating Intelligence

Phase 14 introduces a new product spine:

```txt
Portfolio Decisions
  -> Validation Gates
  -> Execution Evidence
  -> Operator Capacity
  -> Studio Analyst Recommendations
```

Likely cross-feature touch points:

```txt
src/types/venture.ts
src/types/issue.ts
src/types/roadmap.ts
src/types/ai.ts
src/types/dashboard.ts
src/data/*
src/features/dashboard/*
src/features/issues/components/issue-drawer-content.tsx
src/features/roadmap/components/roadmap-drawer-content.tsx
src/features/assistant/utils/assistant-analysis.ts
src/features/synchronization/utils/sync-utils.ts
```

Use these specs as the primary routing layer:

```txt
context/strategy/studio-operating-intelligence.md
context/features/feature-studio-command-center.md
context/features/feature-validation-gates.md
context/features/feature-execution-evidence.md
context/features/feature-operator-capacity.md
context/features/feature-ai-assistant.md
context/data/domain-models.md
context/data/mock-data-strategy.md
```

Do not add backend, scheduling, finance, bill-back, cap-table, or enterprise
resource planning systems for this phase.

### Assistant / Studio Analyst Signals

Signal generation starts at:

```txt
src/features/assistant/utils/assistant-analysis.ts
```

Supporting signal modules:

```txt
src/features/assistant/utils/issue-signals.ts
src/features/assistant/utils/roadmap-signals.ts
src/features/assistant/utils/portfolio-signals.ts
src/features/assistant/utils/signal-dedupe.ts
```

Assistant is embedded operational intelligence, not a chatbot. In Phase 14,
visible product behavior should be Studio Analyst: source-linked recommendations
grounded in gates, execution evidence, and capacity tradeoffs.

---

## Touch With Care

These files affect many surfaces:

```txt
src/components/app-shell/app-shell.tsx
src/components/app-shell/app-drawer.tsx
src/stores/ui-store.ts
src/stores/venture-store.ts
src/stores/issue-store.ts
src/stores/roadmap-store.ts
src/features/synchronization/utils/sync-utils.ts
src/features/assistant/utils/assistant-analysis.ts
src/features/dashboard/hooks/use-dashboard-data.ts
```

Before changing one of these, inspect all directly affected feature surfaces.

---

## Recommended Start Points By Task

Dashboard task:

```txt
context/features/feature-studio-command-center.md
context/features/feature-dashboard.md
src/app/dashboard/page.tsx
src/features/dashboard/hooks/use-dashboard-data.ts
src/features/dashboard/components/*
```

Issues task:

```txt
context/features/feature-execution-evidence.md
context/features/feature-issues.md
src/app/issues/page.tsx
src/features/issues/hooks/use-issues-data.ts
src/features/issues/components/*
src/stores/issue-store.ts
```

Roadmap task:

```txt
context/features/feature-execution-evidence.md
context/features/feature-roadmap.md
src/app/roadmap/page.tsx
src/features/roadmap/components/*
src/stores/roadmap-store.ts
```

Assistant task:

```txt
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md
src/app/assistant/page.tsx
src/features/assistant/utils/assistant-analysis.ts
src/features/assistant/components/*
```

Studio Operating Intelligence task:

```txt
context/strategy/studio-operating-intelligence.md
context/features/feature-studio-command-center.md
context/features/feature-validation-gates.md
context/features/feature-execution-evidence.md
context/features/feature-operator-capacity.md
context/features/feature-ai-assistant.md
context/data/domain-models.md
context/data/mock-data-strategy.md
src/data/*
src/types/*
src/features/dashboard/*
src/features/issues/*
src/features/roadmap/*
src/features/assistant/*
```

Load only the needed subset for the current slice.

Navigation or shell task:

```txt
context/features/feature-navigation.md
context/features/feature-design-system.md
src/components/app-shell/*
src/stores/ui-store.ts
src/stores/venture-store.ts
```

PLG activation task:

```txt
context/features/feature-plg-activation.md
context/features/feature-navigation.md
context/data/domain-models.md
src/data/*
src/features/dashboard/*
src/features/issues/*
src/features/roadmap/*
src/features/assistant/*
src/components/shared/empty-state.tsx
```

Synchronization task:

```txt
context/features/feature-roadmap.md
context/features/feature-issues.md
src/features/synchronization/utils/sync-utils.ts
src/stores/issue-store.ts
src/stores/roadmap-store.ts
```

---

## Current Verification Commands

Available scripts:

```txt
npm run dev
npm run build
npm run start
npm run lint
```

There is no dedicated `typecheck` script currently listed in `package.json`.

For documentation-only changes, at minimum run:

```txt
git diff --check -- <changed-file>
```

For source changes, prefer lint and a browser check of the affected route.

---

## Agent Reminder

This map should reduce initial scan cost, not replace judgment.

For every implementation, read the task plan, load only the required context,
inspect nearby code, and preserve Foundary's calm, compact, venture-aware product
shape.
