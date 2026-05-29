---
name: foundary-roadmap-patterns
description: Apply Foundary's roadmap system standards when implementing or refining roadmap board, Now/Next/Later columns, roadmap cards, roadmap drawer, confidence indicators, progress indicators, linked issue summaries, roadmap AI insights, initiative state transitions, roadmap loading states, and roadmap empty states. Use for Foundary frontend roadmap implementation, review, or polish tasks.
---

# Foundary Roadmap Patterns

## Purpose

Use this skill when implementing roadmap board, Now / Next / Later columns, roadmap cards, roadmap drawer, confidence indicators, progress indicators, linked issue summaries, roadmap AI insights, and initiative state transitions.

The Roadmap System is the strategic execution layer of Foundary.

It should feel calm, strategic, outcome-oriented, and confidence-aware.

## Roadmap Philosophy

Roadmap items are not large tickets.

Roadmap items are strategic venture initiatives connected to execution work.

The roadmap should help users understand what each venture is trying to achieve, what is active now, what is likely next, what is uncertain, and what should continue, split, or be killed.

Avoid Gantt charts, enterprise roadmap tools, feature timeline bloat, Jira epic management, and delivery micromanagement.

## Core Principles

Emphasize outcomes over output. Roadmap cards should emphasize goal, outcome, progress, confidence, and linked execution.

Do not emphasize task volume, detailed delivery planning, or feature checklists.

Treat confidence as a first-class signal. Every roadmap item should show confidence score, confidence trend, and risk state when relevant.

Confidence should feel directional and useful, not like fake predictive precision.

Keep roadmap calmer than Issues. Issues are tactical. Roadmap is strategic.

Roadmap UI should use more breathing room, fewer visible controls, clearer hierarchy, and calmer metadata.

Avoid noisy Kanban density, too many badges, and overloaded columns.

## Required Structure

```txt
Roadmap Page
 ├── Page Header
 ├── Roadmap Toolbar
 ├── Confidence Summary
 ├── Roadmap Board
 │    ├── Now
 │    ├── Next
 │    └── Later
 └── Roadmap Drawer
```

## Header

Header should include page title, short strategic description, and one primary action: `New Initiative`.

Example:

```txt
Roadmap
Coordinate venture direction through outcomes, confidence, and execution progress.
```

Avoid delivery-heavy copy, long roadmap explanations, and multiple primary actions.

## Toolbar

Toolbar can include venture filter, status filter, confidence filter, quick create, and optional search.

Keep toolbar lighter than Issues.

Avoid advanced planning controls, date-range complexity, and timeline configuration.

## Timeframe Columns

Required columns:

```txt
Now
Next
Later
```

Column meaning:

```txt
Now   = active strategic focus
Next  = validated upcoming work
Later = future opportunity / lower certainty
```

Avoid quarters, month timelines, Gantt-like periods, and complex release trains.

## Columns

Columns should feel calm, readable, and strategic.

Use a 3-column layout on desktop, equal-width columns, compact column headers, and vertical card stacks.

Avoid horizontal timeline complexity, dense board visuals, and too many columns.

## Column Headers

Each column header should show timeframe name, short explanation, and item count.

Example:

```txt
Now
Active strategic focus · 4 initiatives
```

Avoid large headers, decorative visuals, and excessive metadata.

## Roadmap Cards

Recommended card content:

```txt
Title
Venture
Goal / outcome
Status
Progress
Confidence
Linked issue count
AI recommendation snippet optional
```

Keep cards strategic, compact, and calm.

Avoid issue-style metadata overload, long descriptions, and too many badges.

Recommended styling:

```tsx
<Card className="border-border/60 bg-card/60 shadow-none transition-all hover:bg-muted/30">
  <CardContent className="p-4">
    ...
  </CardContent>
</Card>
```

Roadmap cards can be slightly more spacious than issue cards.

Avoid giant feature cards, bright status backgrounds, and heavy shadows.

## Card Interactions

Clicking a card should open the roadmap drawer.

Optional actions can include changing timeframe, opening linked issues, or viewing AI recommendation.

Avoid excessive inline controls, complex edit modes, and drag-heavy roadmap planning unless already stable.

## Progress Indicators

Progress should communicate execution movement.

Use lightweight progress bars, percentage labels, and linked issue completion.

Avoid burndown charts, delivery forecasting, and enterprise progress widgets.

Recommended:

```txt
Progress 64%
```

## Confidence Indicators

Confidence should communicate execution and validation certainty.

Recommended display:

```txt
Confidence 72% · Declining
```

Confidence ranges:

```txt
80-100 = Strong
60-79  = Moderate
40-59  = Uncertain
0-39   = High risk
```

Avoid giant gauges, fake precision, and futuristic AI scoring visuals.

## Confidence Trends

Supported trends:

```txt
Improving
Stable
Declining
```

Use compact label, subtle icon if helpful, and restrained color.

Avoid dramatic warning visuals and aggressive red UI unless the item is truly high risk.

## Status

Supported statuses:

```txt
Planned
Active
At Risk
Completed
Killed
```

Killed should feel like disciplined venture decision-making, not failure.

Avoid hiding killed initiatives completely.

## Linked Issues

Roadmap items should clearly connect strategy to execution.

Show linked issue count, completed issue count, and blocked or overdue hint if relevant.

Example:

```txt
8 linked issues · 5 done
```

Avoid showing full issue lists on every card or hiding execution connection until the drawer.

## Roadmap Drawer

Roadmap drawer should include:

```txt
Header
Strategic Goal
Progress & Confidence
Linked Issues
AI Strategic Insights
Actions
```

Priority order:

```txt
1. initiative title/status
2. goal/outcome
3. progress/confidence
4. linked issue execution
5. AI recommendation
```

Avoid giant planning forms, delivery-heavy issue detail UI, and full-page roadmap detail screens.

Refer to:

```txt
/skills/foundary-drawer-patterns.md
```

## Strategic Goal

The goal section should answer why the initiative exists, what outcome it supports, and what success means.

Keep it concise.

Avoid long PRD-style text, marketing language, and vague feature descriptions.

## Linked Issues Section

Inside the drawer, linked issues should show compact issue rows with status, priority, owner, and due date if relevant.

Avoid full issue table complexity and duplicating complete issue drawer content.

## AI Insights

Roadmap AI should support confidence risk detection, blocked initiative analysis, continue/split/kill recommendation, missing validation criteria, and scope reduction recommendation.

AI should appear as a structured insight block, confidence or risk summary, or recommendation card.

Avoid chatbot UI, long consultant-style advice, and fake AI forecasting.

Refer to:

```txt
/skills/foundary-ai-ui-patterns.md
```

## Quick Create

Quick create for roadmap items should be lightweight.

Required fields:

```txt
title
venture
timeframe
goal
```

Optional fields:

```txt
owner
confidence
linked issues
```

Avoid giant roadmap planning forms, complex prioritization frameworks, and date-heavy release planning.

## Empty States

Examples:

```txt
No active initiatives in this timeframe.
No roadmap items for this venture.
No at-risk initiatives detected.
```

Avoid playful roadmap empty states, emojis, and motivational planning copy.

## Loading

Use skeleton roadmap cards, stable columns, and drawer skeletons.

Avoid collapsing columns, full-page spinners, and layout jumps.

## State

Use Zustand for roadmap items, selected roadmap item, filters, timeframe changes, and confidence updates.

Avoid tightly coupling roadmap store to issue store, storing duplicated derived progress, and complex planning state machines.

Refer to:

```txt
/skills/foundary-zustand-patterns.md
```

## Synchronization

Roadmap should synchronize with Issues through derived state.

Issue changes should affect progress, confidence signals, linked issue completion, and risk indicators.

Avoid manually duplicating progress values everywhere and deep cross-store mutations.

## Dashboard Connection

Roadmap data should power active initiatives count, killed initiatives count, roadmap confidence, portfolio risk panel, and venture health.

Avoid dashboard-only roadmap duplicates.

## Visual Rules

Roadmap should feel strategic, calm, premium, spacious but compact, and less noisy than Issues.

Use subtle borders, muted metadata, controlled progress indicators, and compact badges.

Avoid timeline visuals, bright roadmap cards, dense metadata fields, and enterprise planning aesthetics.

## Motion

Motion should be subtle, smooth, and restrained.

Use drawer transitions, card hover states, and column update fades.

Avoid dramatic card movement, heavy timeline animation, and playful roadmap interactions.

## Components

Suggested components:

```txt
RoadmapPage
RoadmapHeader
RoadmapToolbar
RoadmapBoard
RoadmapColumn
RoadmapCard
RoadmapDrawer
RoadmapConfidence
RoadmapProgress
RoadmapLinkedIssues
RoadmapAiInsights
RoadmapQuickCreate
RoadmapEmptyState
RoadmapSkeleton
```

## Anti-Patterns

Never introduce Gantt charts, enterprise roadmap timelines, release train planning, complex dependency graphs, Jira epic behavior, priority scoring matrices, timeline zoom controls, heavy planning forms, roadmap bureaucracy, or predictive AI theatrics.

## Roadmap Quality Checklist

Before finalizing Roadmap work, verify:

```txt
[ ] Now / Next / Later structure is clear
[ ] Cards emphasize goals and confidence
[ ] Linked execution is visible
[ ] Roadmap feels calmer than Issues
[ ] Confidence is useful but not theatrical
[ ] Drawer explains strategic context
[ ] AI insights are structured and concise
[ ] Killed initiatives feel intentional
[ ] No Gantt/timeline complexity
[ ] No enterprise planning feeling
```

## Default Bias

When uncertain, choose outcome over output, confidence over certainty, strategic over tactical, calm over dense, linked execution over isolated planning, and directional over date-heavy.

## North Star

Foundary Roadmap should feel like a calm strategic coordination layer connecting venture outcomes to execution work.

Users should feel directionally clear, strategically informed, and confident about what matters now. Never make them feel trapped inside enterprise roadmap planning.
