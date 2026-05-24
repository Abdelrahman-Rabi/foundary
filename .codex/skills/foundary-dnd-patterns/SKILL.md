---
name: foundary-dnd-patterns
description: Apply Foundary's drag and drop interaction standards when implementing or refining Kanban boards, sortable issue lists, roadmap movement, drag interactions, reorderable UI, operational workflow movement, drag overlays, placeholders, collision detection, board density, DnD synchronization, accessibility, and dnd-kit patterns. Use for Foundary frontend drag-and-drop implementation, review, or polish tasks.
---

# Foundary DnD Patterns

## Purpose

Use this skill when implementing Kanban boards, sortable issue lists, roadmap movement, drag interactions, reorderable UI, and operational workflow movement.

This skill defines the drag-and-drop interaction system for Foundary.

DnD quality is a high-impact sophistication signal. The goal is fluid operational movement, not playful draggable UI.

## DnD Philosophy

Foundary DnD should feel fast, stable, responsive, and operationally alive.

Use inspiration from Linear, modern operational tooling, and high-performance productivity software.

DnD should reinforce execution momentum, workflow continuity, and interaction confidence.

Avoid playful drag interactions, exaggerated movement, Trello-style toy feeling, and unstable layouts.

## Core Principles

Speed is critical. DnD should feel immediate, low-latency, and frictionless.

Dragging should never feel delayed, sticky, or heavy.

Avoid animation lag, delayed state updates, and rerender-heavy interactions.

Layout stability matters. The UI should remain predictable, spatially coherent, and visually stable.

Users should always understand where items belong, where items will land, and what changed.

Avoid collapsing columns, jumping layouts, and unstable placeholders.

DnD should feel operational. Treat it as workflow movement, not visual playfulness.

Motion should feel restrained, efficient, and professional.

Avoid rotations, bouncing, elastic physics, and exaggerated scaling.

## Recommended Stack

Use `dnd-kit`, sortable contexts, predictable collision detection, and optimistic local state updates.

Avoid HTML5 native DnD, overly abstracted DnD wrappers, and giant generic DnD systems.

## Architecture

Recommended structure:

```txt
IssueBoard
 ├── IssueColumn
 │     ├── SortableContext
 │     └── IssueCard
 │
 └── DndContext
```

Keep DnD feature-scoped, isolated, and predictable.

Avoid global drag architecture and deeply nested drag trees.

## Columns

Columns should remain visually stable, preserve spacing rhythm, and maintain predictable heights.

Use fixed column widths, vertical scrolling, and lightweight headers.

Avoid auto-resizing chaos, collapsing columns, and giant dynamic width calculations.

Recommended width:

```txt
320px-360px
```

Desktop board layout should be horizontally scrollable, with stable spacing and compact density.

Avoid oversized Kanban columns, full-width columns, and excessive whitespace.

## Cards

Cards should feel compact, operational, scannable, and draggable without noise.

Each card should display title, priority, owner, tags, venture indicator, and optional risk indicator.

Avoid oversized cards, metadata overload, and excessive controls.

## Drag State

While dragging, preserve card dimensions, maintain visual continuity, and increase elevation subtly.

Recommended drag state:

```tsx
scale: 1.01
opacity: 0.96
shadow: increased subtly
```

Avoid large scaling, rotation effects, floating animations, and glow effects.

## Drop Placeholders

Drop zones should remain subtle, preserve layout continuity, and clearly indicate placement.

Use spacing preservation and lightweight placeholder styling.

Avoid flashing indicators, giant drop targets, and animated placeholder chaos.

## Drag Overlays

Use drag overlays when useful.

The drag overlay should match original card dimensions, preserve visual identity, and move smoothly.

Avoid drastically different drag previews, oversized overlays, and transparent ghost cards.

## Motion

DnD motion should feel smooth, restrained, and responsive.

Use subtle easing, short transitions, and stable transforms.

Recommended timing:

```txt
120ms-180ms
```

Avoid bounce physics, elastic movement, and slow transitions.

## Collision Detection

Prefer `closestCorners` or `closestCenter`, whichever preserves predictable movement and minimizes accidental drops.

Avoid unstable collision behavior and jumpy drop targeting.

## State Updates

DnD updates should apply immediately, update local state optimistically, and avoid fake loading.

Recommended flow:

```txt
drag start
-> optimistic update
-> derived metric updates
-> AI insight recalculation
```

Avoid delayed synchronization, spinner-based DnD, and server-style confirmation flows.

## Synchronization

Issue movement should affect issue status, dashboard metrics, roadmap progress, venture health, and AI observations.

These updates should feel immediate, coherent, and lightweight.

Avoid visible recalculation lag and inconsistent UI updates.

## Scrolling

Boards should support horizontal scrolling and preserve stable vertical columns.

Use independent column scrolling and smooth overflow behavior.

Avoid page-level drag scrolling chaos and nested unstable scroll regions.

## Density

Boards should feel compact, operational, and premium.

Use tight card rhythm, consistent spacing, and controlled vertical density.

Avoid giant Trello-like spacing, oversized cards, and visual clutter.

## Hover

Cards should subtly react on hover and reveal contextual actions carefully.

Use slight background emphasis and lightweight border change.

Avoid dramatic hover motion and control overload.

## Accessibility

DnD should support keyboard movement, focus visibility, and accessible drag interactions.

Avoid mouse-only workflows and inaccessible drag states.

## Mobile

Mobile DnD support is optional. Desktop experience is the priority.

If mobile is implemented, simplify interactions, preserve stable card movement, and avoid complex gestures.

## Loading

Board loading should preserve column layout and avoid layout jumping.

Use skeleton cards and placeholder columns.

Avoid collapsing board structure and spinner-only loading.

## Empty Columns

Empty columns should feel intentional, stable, and operational.

Good example:

```txt
No issues in review.
```

Avoid playful empty states such as "Drop something here!"

## AI Integration

AI indicators inside cards should remain subtle, secondary, and lightweight.

Examples include a small risk badge, confidence dot, or blocked state indicator.

Avoid giant AI overlays and noisy recommendation cards inside DnD.

## Performance

DnD must remain smooth under load, rerender-efficient, and interaction-first.

Prefer memoized cards, stable IDs, and isolated subscriptions.

Avoid rerendering full boards, unstable list keys, and giant reactive trees.

## Component Structure

Suggested components:

```txt
IssueBoard
IssueColumn
IssueColumnHeader
IssueCard
IssueCardMeta
IssueCardTags
IssueDragOverlay
SortableIssueCard
```

## dnd-kit Patterns

Prefer `SortableContext`, `useSortable`, and `DragOverlay`.

Keep implementation simple, explicit, and feature-scoped.

Avoid deeply abstracted DnD systems and generic drag frameworks.

## Visual Design

DnD UI should feel calm, premium, operational, and focused.

Avoid gamified drag interactions, playful Kanban boards, and colorful drag states.

## Anti-Patterns

Never introduce Trello-style toy interactions, bounce-heavy dragging, giant drag animations, unstable board layouts, excessive drag shadows, gamified movement, delayed optimistic updates, drag handles everywhere, or draggable chaos.

## DnD Quality Checklist

Before finalizing DnD, verify:

```txt
[ ] Dragging feels responsive
[ ] Layout remains stable
[ ] Columns preserve spacing
[ ] Card dimensions remain consistent
[ ] Motion is restrained
[ ] State updates are immediate
[ ] No jitter during movement
[ ] No visual clutter
[ ] Board feels operational
[ ] DnD reinforces workflow momentum
```

## Default Bias

When uncertain, choose stable over flashy, fast over animated, operational over playful, compact over oversized, predictable over clever, and subtle over dramatic.

## North Star

Foundary DnD should feel like operational workflow movement with premium responsiveness.

Users should feel fast, in control, uninterrupted, and execution-focused. Never make them feel like they are dragging toys around a board.
