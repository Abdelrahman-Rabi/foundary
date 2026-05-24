---
name: foundary-drawer-patterns
description: Apply Foundary's drawer interaction standards when implementing or refining issue drawers, roadmap drawers, AI insight drawers, contextual side panels, detail workspaces, drawer headers, drawer sections, metadata layouts, drawer actions, scroll behavior, animation, backdrops, loading states, empty states, and drawer accessibility. Use for Foundary frontend drawer implementation, review, or polish tasks.
---

# Foundary Drawer Patterns

## Purpose

Use this skill when implementing issue drawers, roadmap drawers, AI insight drawers, contextual side panels, and detail workspaces.

Drawers are a core interaction pattern in Foundary. They preserve operational continuity, context awareness, workflow momentum, and spatial stability.

Prefer drawers over full-page navigation.

## Drawer Philosophy

Foundary drawers should feel calm, focused, uninterrupted, and operationally efficient.

Use inspiration from Linear, Raycast, and modern operational tooling.

Drawers should preserve user context, reduce navigation friction, support rapid scanning, and allow lightweight editing.

Avoid modal heaviness, fullscreen interruption, and enterprise-detail-page complexity.

## Core Principles

Preserve workflow momentum. Users should never feel removed from the workflow. Opening a drawer should feel lightweight, immediate, and contextual.

Avoid route changes, full-page reloads, and workflow interruption.

Treat drawers as contextual execution workspaces, not form containers. A drawer should support scanning, editing, decision-making, and operational awareness.

Keep density controlled. Drawers should feel information-rich, compact, and readable.

Avoid giant forms, excessive metadata, cluttered sections, and dense enterprise layouts.

## Structure

Use this recommended structure:

```txt
Drawer
 ├── Header
 ├── Summary / Description
 ├── Metadata
 ├── AI Insights
 ├── Related Context
 └── Actions
```

Keep this structure consistent across issues, roadmap items, and AI insights.

## Width

Recommended widths:

```txt
Default drawer:        480px-560px
Complex detail drawer: 620px-720px
AI analysis drawer:    520px-640px
```

Avoid ultra-wide drawers, fullscreen takeover, and cramped narrow drawers.

## Position

Use right-side slide-in drawers.

Avoid center modal drawers, floating dialogs, and stacked modal systems.

## Header

Headers should remain compact, preserve hierarchy, and support quick scanning.

Recommended structure:

```tsx
<header className="border-b border-border/50 px-5 py-4">
  <div className="flex items-start justify-between gap-4">
    <div>
      <h2 className="text-base font-semibold">
        Issue title
      </h2>

      <div className="mt-2 flex items-center gap-2">
        <StatusBadge />
        <PriorityBadge />
        <TypeBadge />
      </div>
    </div>

    <DrawerActions />
  </div>
</header>
```

Avoid oversized titles, multi-row action chaos, and excessive metadata at the top.

## Sticky Header

Keep headers sticky when useful. Use sticky top positioning, subtle backdrop blur, and lightweight border separation.

Recommended class pattern:

```tsx
sticky top-0 z-10 bg-background/90 backdrop-blur-sm
```

## Sections

Each drawer section should have clear separation, compact spacing, and readable hierarchy.

Recommended spacing:

```txt
Section gap:      gap-5
Section padding:  px-5 py-4
```

Recommended structure:

```tsx
<section className="border-b border-border/40 px-5 py-4">
  <div className="mb-3">
    <h3 className="text-sm font-medium">
      Section Title
    </h3>
  </div>

  ...
</section>
```

Avoid giant spacing, card-inside-card overload, and weak section hierarchy.

## Typography

Use restrained hierarchy.

Recommended pattern:

```txt
Drawer title:         text-base font-semibold
Section title:        text-sm font-medium
Body text:            text-sm
Metadata labels:      text-xs text-muted-foreground
Metadata values:      text-sm
```

Avoid large marketing headings, excessive boldness, and oversized metadata.

## Metadata

Metadata should feel compact, structured, and scannable.

Preferred pattern:

```tsx
<div className="grid grid-cols-2 gap-4">
  <MetadataItem />
</div>
```

Metadata item pattern:

```tsx
<div className="space-y-1">
  <p className="text-xs text-muted-foreground">
    Owner
  </p>

  <p className="text-sm">
    Sarah Chen
  </p>
</div>
```

Avoid dense property tables, enterprise inspector layouts, and excessive labels.

## AI Insights

AI sections should feel embedded, contextual, and lightweight.

Use structured insight blocks, concise recommendations, risk summaries, and confidence indicators.

Recommended structure:

```tsx
<section className="rounded-xl border border-border/60 bg-muted/20 p-4">
  <InsightHeader />
  <InsightContent />
</section>
```

Avoid chatbot interfaces, fake conversations, typing indicators, and AI avatars.

## Descriptions

Descriptions should prioritize readability, preserve whitespace, and avoid giant text walls.

Use max line width control, muted body color, and compact paragraphs.

Avoid dense markdown rendering, huge prose sections, and oversized typography.

## Linked Context

Use linked context sections for roadmap relationships, issue dependencies, related execution work, and AI observations.

These sections should feel secondary, contextual, and lightweight.

Avoid giant nested relationship systems and enterprise dependency graphs.

## Actions

Drawer actions should remain minimal, contextual, and low-noise.

Use status update, priority update, quick edit, and open related item actions.

Avoid huge action toolbars, stacked button rows, and admin-panel controls.

## Scroll Behavior

Only drawer content should scroll. Keep the header stable.

Recommended:

```txt
Drawer container: fixed
Header: sticky
Body: overflow-y-auto
```

Avoid body/page double scrolling, layout jumping, and scrolling the entire app shell.

## Animation

Drawers should animate with subtle slide-in, opacity fade, and restrained motion.

Recommended timing:

```txt
220ms-280ms
```

Recommended easing:

```txt
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid bounce motion, dramatic slide animations, and slow transitions.

## Backdrop

Backdrop should preserve environmental awareness and lightly dim the background.

Recommended:

```tsx
bg-background/80 backdrop-blur-sm
```

Avoid heavy dark overlays, dramatic blur, and full visual isolation.

## Feature Rules

Issue drawers should feel operational, fast, and execution-focused. Prioritize metadata clarity, AI risk insights, roadmap linkage, and status visibility.

Roadmap drawers should feel strategic, calmer, and outcome-oriented. Prioritize confidence, progress, linked execution work, and strategic goal clarity.

AI drawers should feel analytical, concise, and operationally intelligent. Prioritize structured reasoning, recommendations, confidence indicators, and risk summaries. Avoid conversational UI.

## Mobile

Mobile support is secondary. If implemented, use full-height sheets, preserve spacing rhythm, and reduce metadata density.

Avoid modal stacking and cramped layouts.

## Empty States

Empty states inside drawers should feel calm, operational, and intentional.

Good example:

```txt
No linked roadmap initiative.
```

Avoid playful empty states, emojis, and celebratory language.

## Loading States

Use skeleton blocks, metadata placeholders, and subtle shimmer.

Avoid large spinners, blocking overlays, and content flashes.

## Accessibility

Drawers should trap focus correctly, close via Escape, support keyboard navigation, and preserve logical tab order.

Avoid inaccessible floating panels and broken focus states.

## Consistency

All Foundary drawers should share spacing rhythm, typography hierarchy, section structure, animation timing, backdrop style, and header structure.

Avoid feature-specific drawer redesigns, inconsistent layouts, and random spacing differences.

## Component Recommendations

Suggested reusable components:

```txt
DrawerShell
DrawerHeader
DrawerSection
DrawerMetadata
DrawerActions
DrawerInsights
DrawerFooter
MetadataItem
InsightCard
```

## Drawer Quality Checklist

Before finalizing any drawer, verify:

```txt
[ ] Header is compact and scannable
[ ] Sections are clearly separated
[ ] Metadata is readable
[ ] AI insights feel embedded
[ ] Layout feels calm
[ ] Drawer preserves workflow continuity
[ ] Motion is restrained
[ ] Actions are minimal
[ ] No enterprise-detail-page feeling
[ ] No modal heaviness
```

## Default Bias

When uncertain, choose context over complexity, compact over spacious, drawers over pages, structured over dense, embedded over isolated, calm over heavy, and operational over enterprise.

## North Star

Foundary drawers should feel like focused operational workspaces that preserve execution momentum.

Users should feel uninterrupted, context-aware, fast, and operationally clear. Never make them feel trapped inside enterprise detail pages.
