---
name: foundary-issues-patterns
description: Apply Foundary's issues system standards when implementing or refining issues list view, issues board view, issue cards, issue rows, issue filters, issue toolbar, quick create issue, issue drawer content, issue metadata, status transitions, roadmap links, overdue indicators, issue loading states, and issue empty states. Use for Foundary frontend issues implementation, review, or polish tasks.
---

# Foundary Issues Patterns

## Purpose

Use this skill when implementing issues list view, issues board view, issue cards, issue rows, issue filters, issue toolbar, quick create issue, issue drawer content, issue metadata, and status transitions.

The Issues System is the operational execution layer of Foundary.

It should feel fast, compact, alive, and execution-focused.

## Issues Philosophy

Issues are not enterprise tickets.

Issues are lightweight execution objects for venture teams.

The experience should optimize for speed, clarity, workflow momentum, venture awareness, and low-friction execution.

Avoid Jira-style complexity, enterprise workflow builders, overly detailed ticket screens, noisy metadata, and dense admin tables.

## Core Principles

Prioritize operational speed. Users should be able to scan issues quickly, create issues quickly, change status quickly, and open details without losing context.

Prefer drawers, inline controls, quick actions, and compact rows or cards.

Avoid heavy forms, full-page issue detail screens, and slow navigation.

Make scannability the first priority. Every issue surface should make these visible:

```txt
Title
Status
Priority
Type
Owner
Venture
Due date
Roadmap link
```

Do not show everything with equal weight. The title is primary. Metadata is secondary.

Keep venture context visible. Every issue should communicate which venture it belongs to, whether it links to roadmap, and whether it affects risk or confidence.

Avoid hiding venture context only inside the drawer.

## Issue Views

Required views:

```txt
List View
Board View
Issue Drawer
Quick Create
```

Do not add extra views unless explicitly needed.

Avoid timeline view, calendar view, backlog grooming view, and reports view.

## Page Structure

Recommended:

```txt
Issues Page
 ├── Page Header
 ├── Issues Toolbar
 ├── View Switcher
 ├── Content Area
 │    ├── List View
 │    └── Board View
 └── Issue Drawer
```

## Header

Header should include page title, concise operational description, and one primary action: `New Issue`.

Example:

```txt
Issues
Track execution work across selected venture.
```

Avoid long explanations, multiple primary actions, and marketing copy.

## Toolbar

Toolbar should include search, filters, view switcher, and optional quick create.

Recommended:

```txt
Search | Status | Priority | Type | Owner | View Toggle | New Issue
```

Avoid advanced filter builders, multi-row toolbar complexity, and too many dropdowns.

## Search

Search should support title, owner, tags, and type.

Search should feel immediate, lightweight, and non-blocking.

Recommended placeholder:

```txt
Search issues...
```

## Filters

Supported filters:

```txt
status
priority
type
owner
venture
overdue
roadmap linked
```

Filters should be compact, chip or dropdown based, and easy to clear.

Avoid complex query builders, nested filters, and saved views.

## View Switcher

Allow switching between:

```txt
List
Board
```

Use a segmented control or compact toggle, with simple local persistence if helpful.

Avoid large tabs and page navigation for view switching.

## List View

The list view is the fastest operational scanning surface.

It should feel compact, precise, calm, and Linear-inspired.

Avoid spreadsheet feeling, enterprise table density, and excessive visible actions.

Recommended row content:

```txt
Status Icon
Issue Title
Type Badge
Priority Badge
Owner
Due Date
Roadmap Link
Venture
Actions on hover
```

Recommended row height:

```txt
40px-52px
```

Avoid large row heights, too many badges, and multi-line row clutter.

Recommended row styling:

```tsx
<div className="group flex items-center gap-3 border-b border-border/50 px-3 py-2 hover:bg-muted/40">
  ...
</div>
```

Use subtle hover state, muted metadata, and stable layout.

Avoid heavy row borders, zebra striping, and visible action overload.

Row click should open the issue drawer. Row hover should reveal lightweight actions such as status change, assign owner, copy issue ID, or open linked roadmap.

Avoid opening a full page or stacking modals.

## Board View

The board view is workflow movement visualization.

It should feel alive, fluid, operational, and compact.

Avoid Trello toy feeling, giant Kanban cards, and colorful board overload.

Required columns:

```txt
Backlog
Planned
In Progress
In Review
Done
Killed
```

Each column should show column name, issue count, and issue cards.

Use fixed-width columns, horizontal scroll if needed, compact headers, and stable spacing.

Suggested width:

```txt
320px-360px
```

Avoid variable-width columns, collapsing columns, and overly wide board layouts.

## Issue Cards

Recommended card content:

```txt
Title
Priority
Type
Owner
Tags
Venture
Roadmap indicator
Risk indicator optional
```

Keep cards compact, readable, and metadata-light.

Avoid large descriptions inside cards, too many badges, and excessive controls.

Recommended styling:

```tsx
<Card className="border-border/60 bg-card/60 shadow-none transition-all hover:bg-muted/30">
  <CardContent className="p-3">
    ...
  </CardContent>
</Card>
```

Avoid heavy shadows, colorful card backgrounds, large spacing, and visual noise.

Card click should open the issue drawer. Dragging should change status. Hover can reveal lightweight actions if useful.

Avoid inline edit overload and nested buttons everywhere.

## Drag And Drop

Use drag and drop for board status movement.

When an issue moves:

```txt
update status immediately
preserve card position smoothly
update dashboard metrics through derived state
update roadmap progress if linked
```

Avoid delayed status updates, fake loading after drop, and unstable board rerenders.

Refer to:

```txt
/skills/foundary-dnd-patterns.md
```

## Issue Drawer

Issue drawer should include:

```txt
Header
Description
Metadata
Linked Roadmap
AI Insights
Actions
```

Priority order:

```txt
1. title/status/priority
2. description/context
3. metadata
4. linked roadmap
5. AI insights
```

Avoid giant forms, full-page detail screens, and dense metadata inspectors.

Refer to:

```txt
/skills/foundary-drawer-patterns.md
```

## Metadata

Metadata should be visible, compact, and structured.

Core metadata:

```txt
owner
status
priority
type
due date
venture
tags
roadmap item
```

Avoid excessive fields, custom field systems, and enterprise property panels.

## Priority

Supported priorities:

```txt
Urgent
High
Medium
Low
```

Priority should be visible but not visually loud.

Avoid saturated priority colors everywhere and large warning styling.

## Type

Supported types:

```txt
Feature
Bug
Experiment
Tech Debt
Research
```

Type matters because venture work includes discovery, validation, and experimentation.

Avoid treating all issues like delivery tasks.

## Status

Supported statuses:

```txt
Backlog
Planned
In Progress
In Review
Done
Killed
```

Killed is important. It should feel like disciplined stopping behavior, not failure.

Avoid hiding killed work or treating it as purely negative.

## Quick Create

Quick create should be fast, lightweight, and keyboard-friendly.

Required fields:

```txt
title
type
priority
venture
```

Optional fields:

```txt
owner
roadmap link
due date
```

Avoid large creation forms, mandatory descriptions, and blocking workflows.

Recommended UX includes a small drawer, inline popover, or command-style entry with defaults based on the active venture.

Good defaults:

```txt
venture = active venture
status = Backlog or Planned
priority = Medium
```

## AI Insights

Issue AI should support summary, missing acceptance criteria, delivery risk, priority suggestion, and split recommendation.

AI should appear as a structured insight card, drawer section, or compact risk note.

Avoid chatbot UI, AI rewriting whole issues, and fake streaming.

Refer to:

```txt
/skills/foundary-ai-ui-patterns.md
```

## Overdue

Overdue issues should be visible but not noisy.

Use subtle warning text, compact risk badge, or row and card indicators.

Avoid aggressive red UI and alert-heavy treatment.

## Roadmap Links

Roadmap linkage should be visible when present.

Use a small linked initiative label, icon plus roadmap title, or linked issue count where relevant.

Avoid hiding roadmap link only in the drawer or large roadmap previews inside list rows.

## Empty States

Examples:

```txt
No issues match the current filters.
No issues currently in review.
No issues assigned to this venture.
```

Avoid emojis, celebratory copy, and onboarding illustrations.

Refer to:

```txt
/skills/foundary-loading-empty-states.md
```

## Loading

Use skeleton rows, skeleton cards, and stable board columns.

Avoid full-page spinners, collapsing lists, and loading screens that hide the shell.

## Components

Suggested components:

```txt
IssuesPage
IssuesHeader
IssuesToolbar
IssueSearch
IssueFilters
IssueViewSwitcher
IssueList
IssueRow
IssueBoard
IssueColumn
IssueCard
IssueDrawer
IssueMetadata
IssueBadges
IssueQuickCreate
IssueEmptyState
IssueSkeleton
```

## State

Use Zustand for issue list, filters, search, selected issue, view mode, and status updates.

Avoid storing every temporary input globally and avoid a monolithic app store.

Refer to:

```txt
/skills/foundary-zustand-patterns.md
```

## Anti-Patterns

Never introduce Jira-style issue pages, enterprise workflow builders, subtask systems, complex permissions, comment threads, activity logs, custom field builders, dense spreadsheet tables, giant issue forms, or noisy Kanban boards.

## Issues Quality Checklist

Before finalizing Issues work, verify:

```txt
[ ] List view is compact and scannable
[ ] Board view feels stable and fluid
[ ] DnD updates status immediately
[ ] Issue drawer preserves context
[ ] Venture context is visible
[ ] Metadata is useful but not noisy
[ ] Quick create is lightweight
[ ] AI insights are structured, not chatty
[ ] Empty states are operational
[ ] No Jira/admin-panel feeling
```

## Default Bias

When uncertain, choose fast over complete, compact over detailed, drawer over page, metadata-light over metadata-heavy, operational over administrative, status movement over configuration, and clarity over field coverage.

## North Star

Foundary Issues should feel like a calm, high-velocity execution layer for venture teams.

Users should feel oriented, fast, in control, and operationally clear. Never make them feel trapped inside enterprise ticket management.
