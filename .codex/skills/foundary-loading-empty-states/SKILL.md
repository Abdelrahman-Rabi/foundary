---
name: foundary-loading-empty-states
description: Apply Foundary's loading and empty state standards when implementing or refining loading states, skeleton UIs, empty states, no-results screens, zero-data conditions, transitional UI states, dashboard placeholders, issue loading states, drawer loading states, AI placeholders, search empty states, and operational notices. Use for Foundary frontend placeholder, empty-state, and loading UX implementation, review, or polish tasks.
---

# Foundary Loading & Empty States

## Purpose

Use this skill when implementing loading states, skeleton UIs, empty states, no-results screens, zero-data conditions, and transitional UI states.

This skill defines how Foundary behaves when data is loading, content is unavailable, filters return nothing, or sections are empty.

These states are highly important for perceived product quality. The goal is calm operational continuity, not decorative placeholder experiences.

## Philosophy

Loading and empty states should feel stable, intentional, calm, and operationally believable.

Users should feel oriented, uninterrupted, and confident.

Avoid playful UX, loud messaging, dramatic animations, and onboarding-style illustrations.

## Core Principles

Preserve layout stability. The interface should never jump unexpectedly, collapse while loading, or dramatically resize.

Loading states should preserve layout rhythm, spacing, hierarchy, and visual continuity.

Avoid spinner-only loading, disappearing sections, and unstable content regions.

Empty states should feel operational. Foundary is an operational system, so empty states should feel neutral, intentional, and contextual.

Avoid emotional, playful, or celebratory empty states.

Do not use emojis, motivational language, onboarding illustrations, or cartoon empty states.

Loading should feel quiet. It should reduce cognitive interruption, maintain visual rhythm, and reinforce premium feel.

Avoid giant spinners, flashy shimmer effects, and excessive animation.

## Skeleton Philosophy

Skeletons should mirror final layouts, preserve spacing, and reduce layout shift.

The user should understand what is loading.

Avoid generic placeholder blocks, mismatched dimensions, and random skeleton structures.

## Skeleton Rules

Use muted surfaces, low-contrast shimmer, and restrained animation.

Recommended classes:

```tsx
animate-pulse bg-muted/40
```

Avoid bright shimmer effects, high-contrast flashing, and aggressive skeleton motion.

## Dashboard Loading

Dashboard loading should preserve KPI layout, dashboard grid structure, and panel dimensions.

Recommended placeholders include KPI skeleton rows, venture card skeletons, risk panel placeholders, and chart placeholders.

Avoid loading the entire page as blank, spinner-centered layouts, and collapsing dashboard sections.

## KPI Skeletons

KPI skeletons should preserve card dimensions and maintain metric hierarchy.

Recommended structure:

```tsx
<Card>
  <CardContent className="p-4">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="mt-3 h-8 w-16" />
  </CardContent>
</Card>
```

## Issues Loading

Issue loading should preserve row density, board structure, and workflow continuity.

Use skeleton rows, skeleton cards, and stable columns.

Avoid loading entire boards with spinners and collapsing drag-and-drop layout.

## Board Loading

Kanban boards should preserve columns, maintain spacing rhythm, and avoid layout instability.

Use placeholder issue cards and stable column headers.

Avoid shifting column widths and disappearing columns.

## Drawer Loading

Drawers should open immediately, load progressively, and preserve section layout.

Use skeleton metadata, skeleton paragraphs, and skeleton AI insight blocks.

Avoid blocking drawer open, fullscreen loading overlays, and delayed drawer rendering.

## AI Loading

AI loading should feel lightweight, believable, and embedded.

Use subtle insight placeholders and muted loading cards.

Avoid typing indicators, fake AI thinking states, and conversational loading animations.

Do not render copy such as:

```txt
AI is thinking...
Generating intelligent response...
```

Render placeholder insight blocks instead.

## Empty State Philosophy

Empty states should communicate current condition, operational meaning, and next available context.

Avoid emotional UX, motivational writing, and gamified messaging.

## Empty State Tone

Good examples:

```txt
No issues match the current filters.
No active roadmap initiatives.
No delivery risks detected.
```

Avoid examples such as:

```txt
You're all caught up!
Nothing to see here
Great job! Everything looks amazing!
```

Do not use emojis, excitement, or celebration language.

## Dashboard Empty States

Dashboard empty states should feel intentional, operational, and strategically calm.

Good examples:

```txt
No active operational risks detected.
No blocked initiatives across selected ventures.
```

Avoid empty dashboard illustrations and giant onboarding messaging.

## Issues Empty States

Issues empty states should support workflow clarity, filtering clarity, and operational calm.

Examples:

```txt
No issues assigned to this venture.
No issues currently in review.
No issues match the selected filters.
```

Avoid gamified productivity messaging and celebratory states.

## Roadmap Empty States

Roadmap empty states should feel strategic, calm, and lightweight.

Examples:

```txt
No initiatives planned for this timeframe.
No active roadmap items for this venture.
```

Avoid roadmap onboarding tutorials and empty timeline illustrations.

## AI Empty States

AI empty states should feel contextual and lightweight.

Examples:

```txt
No confidence concerns identified.
No operational risks detected.
```

Avoid assistant greetings, chatbot prompts, and conversational onboarding.

## Search Empty States

When filters or search return no results, use compact explanatory states and a filter reset option if useful.

Recommended structure:

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <p className="text-sm font-medium">
    No issues match the current filters.
  </p>

  <p className="mt-1 text-xs text-muted-foreground">
    Try adjusting filters or clearing search criteria.
  </p>
</div>
```

Avoid giant empty state illustrations, oversized typography, and emotional language.

## Layout Rules

Empty states should preserve section dimensions, maintain dashboard rhythm, and avoid abrupt visual gaps.

Use centered compact layouts and controlled spacing.

Avoid fullscreen empty screens and giant whitespace regions.

## Motion

Loading and empty states should use subtle opacity transitions, lightweight fades, and restrained shimmer.

Recommended durations:

```txt
120ms-180ms
```

Avoid animated mascots, bouncing loaders, and excessive shimmer speed.

## Accessibility

Loading and empty states should preserve readable hierarchy, maintain keyboard flow, and avoid flashing motion.

Avoid inaccessible animated loaders and disappearing focus states.

## Visual Design

Loading and empty states should visually integrate with dashboard, issues, roadmap, and AI surfaces.

Use muted tones, subtle borders, and compact spacing.

Avoid separate onboarding aesthetics, decorative visuals, and marketing illustrations.

## Suggested Components

```txt
SkeletonCard
SkeletonRow
SkeletonPanel
SkeletonIssueCard
SkeletonKpiCard
SkeletonDrawerSection

EmptyState
InlineEmptyState
SectionEmptyState
FilteredEmptyState
OperationalNotice
```

## Consistency

All loading states should share animation rhythm, muted surfaces, spacing consistency, and skeleton structure logic.

All empty states should share operational tone, typography hierarchy, and compact layout structure.

Avoid each feature inventing different placeholder styles.

## Anti-Patterns

Never introduce emoji empty states, motivational copy, onboarding mascots, giant loading spinners, playful placeholder illustrations, fake AI typing indicators, fullscreen loading interruptions, dashboard collapse during loading, or celebratory productivity messaging.

## Quality Checklist

Before finalizing loading and empty states, verify:

```txt
[ ] Layout remains stable
[ ] Skeletons match final structure
[ ] Empty states feel operational
[ ] Tone remains calm
[ ] No playful UX
[ ] Loading feels lightweight
[ ] Motion remains subtle
[ ] Dashboard rhythm is preserved
[ ] No giant spinners
[ ] States support premium product feel
```

## Default Bias

When uncertain, choose stability over animation, operational over playful, subtle over expressive, structured over decorative, and quiet over attention-seeking.

## North Star

Foundary loading and empty states should feel like calm operational continuity, even when no data is present.

Users should feel oriented, uninterrupted, and confident. Never make them feel like they entered onboarding software.
