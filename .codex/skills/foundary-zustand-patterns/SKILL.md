---
name: foundary-zustand-patterns
description: Apply Foundary's lightweight Zustand state management architecture when implementing or refining global state, feature stores, filters, UI state, venture synchronization, derived metrics, optimistic updates, drag and drop state, drawer state, persistence, async actions, selectors, and store performance. Use for Foundary frontend store implementation, review, or refactoring tasks.
---

# Foundary Zustand Patterns

## Purpose

Use this skill when implementing global state, feature stores, filters, UI state, venture synchronization, derived metrics, and optimistic updates.

Foundary state management should be lightweight, modular, predictable, and operationally responsive.

Avoid Redux-style complexity, giant monolithic stores, excessive abstractions, and enterprise state architecture.

## State Philosophy

Foundary state should feel simple, modular, scoped, and operationally responsive.

State exists to support fast workflows, contextual UI, synchronized operational behavior, and smooth interactions.

Do not use state architecture to build enterprise event systems, backend simulation, or over-engineered frontend infrastructure.

## Core Principles

Prefer small stores over giant stores. Use focused feature stores, isolated responsibilities, and modular state domains.

Avoid one giant app store, deeply nested global state, and feature coupling.

Prefer derived state over stored state. Use selectors, computed values, and memoized derivations.

Avoid storing duplicate metrics, derived counts, and calculated filters.

Bad:

```ts
overdueIssueCount: number
```

Good:

```ts
getOverdueIssues(): Issue[]
```

Treat UI state as valid state. Use Zustand for drawers, filters, view modes, selected entities, AI context, and active venture.

Avoid prop drilling UI state and excessive local synchronization.

Prioritize optimistic UX. Updates should feel immediate, responsive, and uninterrupted.

Prefer optimistic local updates and instant visual feedback. Avoid delayed UI updates and simulated loading everywhere.

## Store Architecture

Recommended structure:

```txt
/stores
  ├── venture-store.ts
  ├── issue-store.ts
  ├── roadmap-store.ts
  ├── dashboard-store.ts
  ├── ai-store.ts
  └── ui-store.ts
```

Avoid deeply nested folders, generic `globalStore.ts`, and mixing unrelated concerns.

## Store Responsibilities

`venture-store` owns active venture, venture switching, portfolio mode, and venture metadata.

It should not contain issue CRUD, roadmap logic, or UI drawer state.

`issue-store` owns issues, filters, search, sorting, status updates, and drag and drop updates.

It should not contain roadmap state or dashboard UI state.

`roadmap-store` owns roadmap items, confidence updates, initiative filtering, and linked issue synchronization.

`dashboard-store` owns derived dashboard metrics, venture health summaries, portfolio insights, and risk calculations.

Avoid duplicating issue source data in the dashboard store.

`ai-store` owns AI insight visibility, contextual recommendations, AI analysis state, and AI panel state.

Avoid storing entire app state inside the AI store.

`ui-store` owns drawer visibility, selected entity, active tabs, layout state, view mode, and sidebar collapse state.

## Store Creation

Recommended pattern:

```ts
export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [],

  filters: {
    priority: [],
    status: [],
  },

  setIssues: (issues) => set({ issues }),

  updateIssueStatus: (id, status) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id
          ? { ...issue, status }
          : issue
      ),
    }))
  },
}))
```

## Selectors

Prefer selectors for filtered data, counts, grouped state, and dashboard summaries.

Recommended:

```ts
const overdueIssues = useIssueStore(
  (state) => state.getOverdueIssues()
)
```

Avoid large component-level calculations and repeated filtering logic everywhere.

## Derived State

Use computed selectors for overdue counts, roadmap progress, risk indicators, filtered issues, venture metrics, and dashboard summaries.

Avoid storing duplicated counts, precomputed UI metrics, and static derived data.

## Synchronization

Venture switching should update dashboard, issues, roadmap, and AI context instantly, predictably, and without page reloads.

Issue changes should affect roadmap progress, dashboard metrics, AI insights, and venture health.

Prefer derived synchronization and selector-driven recalculation. Avoid manually syncing everywhere.

Roadmap updates should affect confidence indicators, dashboard summaries, and AI recommendations.

Avoid deeply coupled cross-store logic.

## Cross-Store Access

Prefer lightweight selector usage and isolated store ownership.

Avoid circular store dependencies and stores mutating each other directly.

Bad:

```ts
issueStore.updateRoadmapStore()
```

Good:

```ts
dashboard selectors derive from issue + roadmap state
```

## UI State

Use Zustand for drawer visibility, selected issue, selected roadmap item, board/list mode, active filters, and AI panel visibility.

Avoid globalizing temporary local input state.

Keep local input typing state, temporary form state, hover state, and transient animations.

Do not put everything in Zustand.

## Drag And Drop State

DnD interactions should update immediately, preserve layout continuity, and avoid unnecessary rerenders.

Use optimistic updates, stable IDs, and memoized selectors.

Avoid rebuilding entire lists on drag and giant rerender chains.

## Filter State

Filters should be lightweight, serializable, and easy to reset.

Recommended structure:

```ts
filters: {
  venture: string[]
  priority: string[]
  status: string[]
  owner: string[]
}
```

Avoid deeply nested filter builders and enterprise query systems.

## Drawer State

Use centralized UI state for active drawer, selected entity, and drawer mode.

Recommended:

```ts
activeDrawer: "issue" | "roadmap" | null
selectedIssueId?: string
selectedRoadmapId?: string
```

Avoid multiple competing drawer states and duplicated visibility flags everywhere.

## Performance

Prefer selectors, shallow comparison, component isolation, and derived computations.

Avoid selecting entire store objects, unnecessary rerenders, and giant reactive trees.

Bad:

```ts
const store = useIssueStore()
```

Good:

```ts
const issues = useIssueStore((s) => s.issues)
```

## Mock Data

Use deterministic seeded mock data, believable operational relationships, and interconnected venture data.

Avoid random disconnected mock data, fake backend complexity, and async simulation everywhere.

## Persistence

Persistence is optional. If needed, persist lightweight UI preferences only.

Examples include sidebar collapsed, board/list mode, and selected venture.

Avoid persisting entire operational state.

## Async

Keep async simple. Use lightweight async actions and local mock fetch simulation only when useful.

Avoid enterprise API layers, complex async orchestration, and fake backend architecture.

## Naming

Use explicit store naming:

```txt
useIssueStore
useRoadmapStore
useUiStore
```

Avoid generic names and ambiguous store ownership.

## Component Usage

Components should subscribe only to required state, remain isolated, and avoid giant reactive dependencies.

Prefer small selectors and focused subscriptions.

## Anti-Patterns

Never introduce Redux boilerplate, giant app stores, backend simulation layers, event-driven complexity, excessive async orchestration, deeply nested state trees, over-abstraction, CQRS-style frontend architecture, or enterprise data modeling.

## Store Quality Checklist

Before finalizing store architecture, verify:

```txt
[ ] Stores are modular
[ ] State ownership is clear
[ ] Derived state is not duplicated
[ ] Cross-store coupling is minimal
[ ] UI updates feel immediate
[ ] Selectors are lightweight
[ ] No giant monolithic store
[ ] No unnecessary async complexity
[ ] DnD updates remain responsive
[ ] State supports operational UX
```

## Default Bias

When uncertain, choose simple over abstract, modular over centralized, derived over duplicated, optimistic over delayed, selectors over giant subscriptions, and frontend simplicity over backend realism.

## North Star

Foundary state management should feel like lightweight operational synchronization with minimal architectural friction.

The system should support fast interactions, coherent workflows, venture-aware synchronization, and premium responsiveness without becoming enterprise frontend infrastructure.
