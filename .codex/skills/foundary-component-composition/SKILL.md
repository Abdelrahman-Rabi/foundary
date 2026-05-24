---
name: foundary-component-composition
description: Apply Foundary's React component composition standards when creating, refactoring, or organizing components, including component structure, file organization, composition rules, naming conventions, abstraction boundaries, shadcn/ui usage, feature component patterns, hooks, utilities, props, state consumption, and shared component boundaries. Use for Foundary frontend component architecture, implementation, review, or refactoring tasks.
---

# Foundary Component Composition

## Purpose

Use this skill when creating, refactoring, or organizing React components in Foundary.

This skill defines component structure, file organization, composition rules, naming conventions, abstraction boundaries, shadcn/ui usage, and feature component patterns.

The goal is clean, readable, composable UI implementation, not over-abstracted enterprise component architecture.

## Component Philosophy

Foundary components should feel simple, focused, reusable where useful, and easy to reason about.

Prefer small focused components, clear composition, readable JSX, feature-local components, and reusable primitives only when repeated.

Avoid premature abstraction, generic component factories, deeply nested composition, giant multi-purpose components, and enterprise design-system overengineering.

## Core Principles

Compose before abstracting. Start with clear composition.

Extract only when UI is repeated, behavior is reused, readability improves, or component boundaries are obvious.

Avoid extracting just because code is long once.

Keep feature components near features.

Example:

```txt
/features/issues/components/issue-card.tsx
/features/issues/components/issue-row.tsx
/features/issues/components/issue-drawer.tsx
```

Avoid putting every component in `/components`.

Shared components must be truly shared.

Use `/components` only for app shell, reusable UI primitives, cross-feature patterns, and layout utilities.

Avoid dumping all components globally or letting feature concerns leak into shared components.

## Recommended Folder Structure

```txt
/app
  ├── dashboard/page.tsx
  ├── issues/page.tsx
  ├── roadmap/page.tsx
  └── assistant/page.tsx

/components
  ├── app-shell
  ├── ui
  ├── layout
  └── shared

/features
  ├── dashboard
  │   ├── components
  │   ├── hooks
  │   └── utils
  │
  ├── issues
  │   ├── components
  │   ├── hooks
  │   └── utils
  │
  ├── roadmap
  │   ├── components
  │   ├── hooks
  │   └── utils
  │
  └── assistant
      ├── components
      ├── hooks
      └── utils

/stores
/lib
/types
/data
```

Avoid flat component folders, deeply nested feature trees, and unclear ownership.

## Naming

Use clear, domain-specific names.

Good:

```txt
IssueCard
IssueRow
IssueDrawer
RoadmapCard
VentureHealthCard
AiInsightCard
DashboardKpiCard
```

Bad:

```txt
CardItem
DataWidget
InfoBlock
MainPanel
GenericDrawer
```

Names should communicate domain, purpose, and UI role.

## File Naming

Use kebab-case file names.

Good:

```txt
issue-card.tsx
roadmap-drawer.tsx
venture-switcher.tsx
ai-insight-card.tsx
```

Avoid:

```txt
IssueCard.tsx
cardItem.tsx
misc.tsx
components.tsx
```

## Component Size

Prefer components that are focused, readable, and easy to scan.

General guideline:

```txt
Small component:     30-80 lines
Medium component:    80-160 lines
Large component:     160-250 lines
```

If a component grows beyond 250 lines, consider extraction, split sections, or move helpers out.

Avoid 500-line page components, massive JSX blocks, and deeply nested conditionals.

## Page Components

Page files should compose feature components.

Example:

```tsx
export default function IssuesPage() {
  return (
    <PageContainer>
      <IssuesHeader />
      <IssuesToolbar />
      <IssuesContent />
      <IssueDrawer />
    </PageContainer>
  )
}
```

Avoid putting all feature UI in `page.tsx`, building stores or helpers inside page files, or letting page-level JSX trees grow too large.

## Feature Components

Feature components should own feature-specific UI, consume feature stores or selectors, remain readable, and avoid global assumptions.

Example:

```txt
/features/issues/components/issue-board.tsx
/features/issues/components/issue-list.tsx
/features/issues/components/issue-toolbar.tsx
```

Avoid feature components importing unrelated feature internals or hiding cross-feature coupling.

## Shared Components

Shared components should be generic enough to reuse, visually aligned with Foundary, and behavior-light where possible.

Good shared components:

```txt
PageContainer
PageHeader
EmptyState
MetricCard
StatusBadge
PriorityBadge
DrawerShell
```

Avoid over-generic configurable monsters, components with many optional props, and abstract dashboard widget factories.

## shadcn/ui

Use shadcn/ui as base primitives and extend them with Foundary styling.

Recommended primitives:

```txt
Card
Button
Badge
Sheet
DropdownMenu
Tabs
Select
Input
Separator
Tooltip
```

Avoid raw unstyled HTML for complex primitives, fighting shadcn APIs, or heavily rewriting primitives.

## Styling

Use Tailwind classes directly unless patterns repeat heavily.

Prefer:

```tsx
<Card className="border-border/60 bg-card/60 shadow-none">
```

Avoid premature class abstraction, global CSS for one-off components, and inline styles unless necessary.

Use helper utilities only when class patterns repeat often or variants are clearly needed.

## Variants

Use variants for repeated badge, button, and card states.

Good examples:

```txt
priority badge variants
status badge variants
risk badge variants
```

Avoid huge variant systems, overly clever styling APIs, and variant abstractions for one-off UI.

## Props

Props should be explicit, typed, and domain-aware.

Good:

```ts
type IssueCardProps = {
  issue: Issue
  onOpen: (issueId: string) => void
}
```

Avoid:

```ts
type CardProps = {
  data: any
  config: object
  variant?: string
}
```

Never use `any` unless absolutely unavoidable.

## Event Handlers

Use explicit handler names.

Good:

```txt
onOpenIssue
onUpdateStatus
onSelectVenture
onOpenRoadmapItem
```

Bad:

```txt
handleClick
onAction
doThing
submit
```

Handlers should communicate intent.

## State Consumption

Components should subscribe only to the needed Zustand slices.

Good:

```ts
const issues = useIssueStore((state) => state.filteredIssues)
```

Bad:

```ts
const store = useIssueStore()
```

Avoid subscribing to entire stores or passing giant store objects through props.

## Derived UI

Keep repeated derivations in selectors, hooks, or utilities.

Examples:

```txt
useFilteredIssues
getIssueStatusLabel
getRoadmapProgress
getVentureHealth
```

Avoid repeating filtering logic in multiple components or doing large calculations inside JSX.

## Hooks

Create hooks when logic is reused, component readability improves, or feature logic needs isolation.

Good:

```txt
useIssueFilters
useIssueMetrics
useRoadmapProgress
useDashboardMetrics
```

Avoid hooks for tiny one-line values, over-engineered custom hooks, or hiding simple logic unnecessarily.

## Utilities

Utilities should be pure, typed, and feature-specific when appropriate.

Examples include status label mapping, priority sorting, overdue detection, and confidence calculation.

Avoid utility dumping grounds, giant `helpers.ts` files, and mixing unrelated logic.

## Imports

Prefer clean imports in this order:

```txt
1. React / Next
2. third-party libraries
3. shared components
4. feature components
5. stores/hooks/utils
6. types/data
```

Avoid circular imports, deep fragile import chains, and importing page components into feature components.

## Cross-Feature Composition

Feature components can display related data, but should not own unrelated state.

Examples:

```txt
Issue drawer can display linked roadmap summary.
Roadmap drawer can display linked issues.
```

But issue components should not mutate roadmap store directly, and roadmap components should not own issue filters.

Use selectors and utilities to derive relationships.

## Extraction

Extract a component when the JSX represents a clear UI concept, it is reused, it improves readability, or it has a stable responsibility.

Do not extract when it adds indirection, hides simple layout, creates vague names, or will only be used once and is clearer inline.

## Composition Patterns

Prefer this:

```tsx
<Card>
  <CardHeader />
  <CardContent />
</Card>
```

Over this:

```tsx
<GenericWidget
  title="..."
  metrics={...}
  config={...}
  actions={...}
/>
```

Foundary should be readable and explicit.

## Error Boundaries

Use lightweight error boundaries only if useful.

Avoid complex error infrastructure, enterprise error systems, and noisy fallback screens.

## Accessibility

Components should use semantic elements where possible, preserve focus states, support keyboard actions for core flows, and use accessible labels for icon buttons.

Avoid clickable divs without semantics, hidden focus outlines, and inaccessible menus.

## Performance

Prefer stable keys, memoization only when useful, small subscriptions, and isolated expensive calculations.

Avoid memoizing everything, premature performance optimization, and rerender-heavy store usage.

## Anti-Patterns

Never introduce giant page components, generic widget factories, over-configurable components, ambiguous component names, `any` props, global component dumping, deep prop drilling, Redux-style container/presenter overkill, or excessive abstraction layers.

## Component Quality Checklist

Before finalizing components, verify:

```txt
[ ] Component has one clear purpose
[ ] Name is domain-specific
[ ] File location matches ownership
[ ] Props are typed and explicit
[ ] Zustand subscription is scoped
[ ] JSX is readable
[ ] Styling follows Foundary UI patterns
[ ] No unnecessary abstraction
[ ] No giant component file
[ ] No generic unclear naming
```

## Default Bias

When uncertain, choose explicit over generic, feature-local over global, composition over abstraction, typed props over flexible configs, small stores over prop drilling, readability over cleverness, and domain names over generic names.

## North Star

Foundary components should feel like a clean, product-minded React codebase optimized for fast AI-assisted iteration.

The code should be easy to navigate, easy to modify, visually consistent, feature-organized, and not over-engineered. Never turn it into a generic template component maze.
