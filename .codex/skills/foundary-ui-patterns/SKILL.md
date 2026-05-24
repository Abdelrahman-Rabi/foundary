---
name: foundary-ui-patterns
description: Apply Foundary's dark-first, compact, premium UI standards when building or refining Foundary frontend components, pages, dashboards, issues views, roadmap views, panels, cards, buttons, badges, tables, loading states, empty states, and embedded AI UI. Use for Foundary UI implementation, review, or visual polish tasks.
---

# Foundary UI Patterns

## Purpose

Use this skill when building or refining Foundary UI components. Apply practical rules for layout density, spacing, typography, cards, buttons, badges, tables, panels, and visual hierarchy.

Do not use this skill for product strategy. Product strategy lives in `/context/project-overview.md`.

## UI North Star

Foundary UI should feel calm, compact, premium, focused, and operationally intelligent.

Use inspiration from Linear, Vercel, and Raycast.

Avoid Jira-style density, admin dashboard feeling, colorful SaaS clutter, oversized components, and generic template UI.

## Visual Style

Use dark-first UI, subtle borders, muted surfaces, soft contrast, compact spacing, clean typography, and restrained highlights.

Avoid loud gradients, saturated backgrounds, excessive shadows, bright decorative colors, and playful visual language.

## Layout

Use this general page structure:

```tsx
<PageHeader />
<PrimaryContentGrid />
<SecondaryPanels />
```

Pages should have a clear title, short contextual description, one primary action, stable content width, and consistent vertical rhythm.

Avoid too many top-level actions, crowded headers, and inconsistent section spacing.

## Spacing

Use compact but breathable spacing.

Recommended defaults:

```txt
Page padding:        px-6 py-5
Section gap:         gap-4 or gap-5
Card padding:        p-4
Compact card:        p-3
Row padding:         px-3 py-2
Toolbar height:      h-10 to h-12
Badge height:        h-5 or h-6
```

Avoid huge vertical gaps, excessive whitespace, cramped metadata, and inconsistent padding.

## Typography

Use hierarchy through size, weight, and color.

Recommended pattern:

```txt
Page title:          text-xl or text-2xl font-semibold
Section title:       text-sm font-medium
Card title:          text-sm font-medium
Body text:           text-sm
Metadata:            text-xs
Muted labels:        text-xs text-muted-foreground
```

Avoid large marketing-style headings, too many font sizes, over-bolded metadata, and weak hierarchy.

## Cards

Cards should feel calm, compact, scannable, and premium.

Recommended base:

```tsx
<Card className="border-border/60 bg-card/60 shadow-none">
  <CardContent className="p-4">
    ...
  </CardContent>
</Card>
```

Use subtle borders, low contrast backgrounds, compact padding, and clear title/metadata hierarchy.

Avoid heavy shadows, oversized rounded corners everywhere, loud card backgrounds, and too much metadata inside one card.

## Panels

Use panels for dashboard sections, AI insights, roadmap summaries, risk areas, and secondary context.

Recommended pattern:

```tsx
<section className="rounded-xl border border-border/60 bg-card/50 p-4">
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-sm font-medium">Section title</h2>
    <span className="text-xs text-muted-foreground">Context</span>
  </div>

  ...
</section>
```

Panels should feel lightweight, not like enterprise widgets.

## Buttons

Use buttons sparingly. Primary actions should be obvious but not loud.

Use one primary action per page header, ghost or outline buttons for secondary actions, and icon buttons for row/card actions.

Avoid multiple competing primary buttons, colorful CTA overload, and large marketing-style buttons.

## Badges

Use badges for status, priority, type, venture, risk level, and confidence. Keep badges compact.

Recommended pattern:

```tsx
<Badge variant="outline" className="h-5 px-2 text-[11px] font-medium">
  High
</Badge>
```

Avoid large pill badges, excessive colors, and too many badges in one row.

## Status Colors

Use color as signal, not decoration.

Use controlled red for urgent or high risk, controlled amber for warning or medium risk, controlled green for healthy or success, muted foreground for neutral/default, and subtle outline or muted tint for venture/type labels.

Avoid rainbow UI, saturated status backgrounds, and decorative color usage.

## Tables And Lists

Rows should be compact, scannable, hover-responsive, and metadata-light.

Recommended row style:

```tsx
<div className="group flex items-center gap-3 border-b border-border/50 px-3 py-2 hover:bg-muted/40">
  ...
</div>
```

On hover, reveal contextual actions, slightly shift background, and keep layout stable.

Avoid dense spreadsheet feeling, too many visible actions, large row heights, and heavy borders.

## Toolbars

Toolbars should support speed. Use search input, compact filters, view switcher, and one primary action.

Avoid advanced filter builders, too many dropdowns, multi-row toolbars, and enterprise control panels.

Recommended height: `h-10` to `h-12`.

## Empty States

Empty states should be calm and operational.

Good examples:

```txt
No issues match the current filters.
No active delivery risks detected.
```

Avoid playful language, emojis, and overly celebratory copy.

## Loading States

Use skeleton rows, skeleton cards, and subtle opacity transitions.

Avoid spinners everywhere, large loading screens, and dramatic animations. Loading should feel stable and quiet.

## Icons

Use icons lightly. Prefer 14px to 16px icons in muted color, paired with text only when helpful.

Avoid icon-heavy navigation, decorative icon clutter, and oversized icons.

## Dashboard UI

Dashboard should feel executive-readable, calm, strategic, and compact.

Use KPI cards, venture health cards, risk panels, and lightweight charts only when useful.

Avoid analytics-heavy layouts, too many charts, dense reporting widgets, and oversized numbers.

## Issues UI

Issues should feel operational, fast, compact, and alive.

Use compact rows, clear metadata, quick filters, hover actions, and drawer-based details.

Avoid enterprise ticketing UI, large forms, overly dense tables, and noisy Kanban cards.

## Roadmap UI

Roadmap should feel calmer than Issues, strategic, outcome-oriented, and confidence-aware.

Use Now/Next/Later columns, compact initiative cards, progress indicators, and confidence signals.

Avoid Gantt charts, timeline complexity, and enterprise planning UI.

## AI UI

AI should look embedded, not separate.

Use insight cards, structured analysis blocks, risk/confidence indicators, and concise recommendations.

Avoid chat bubbles, avatars, fake typing animations, and playful AI styling.

## Component Quality Checklist

Before finishing any UI component, verify:

```txt
[ ] Spacing is compact but readable
[ ] Typography hierarchy is clear
[ ] Borders are subtle
[ ] Color is used only for signal
[ ] Hover states are restrained
[ ] Actions are not noisy
[ ] Component fits dark-first UI
[ ] No enterprise/admin-dashboard feeling
[ ] No unnecessary visual decoration
[ ] Component supports operational clarity
```

## Default Bias

When uncertain, choose compact over spacious, subtle over loud, structured over decorative, drawers over pages, metadata-light over metadata-heavy, calm over playful, premium over flashy, and clarity over feature quantity.
