---
name: foundary-app-shell-patterns
description: Apply Foundary's app shell standards when implementing or refining the app shell, sidebar, navigation, top bar, venture switcher, main layout, content containers, assistant panel placement, responsive shell behavior, active context indicators, and shell loading behavior. Use for Foundary frontend layout, shell implementation, review, or polish tasks.
---

# Foundary App Shell Patterns

## Purpose

Use this skill when implementing app shell, sidebar, navigation, top bar, venture switcher, main layout, content containers, assistant panel placement, and responsive shell behavior.

The app shell is the foundation of Foundary. It should make the product feel stable, operational, premium, and always ready for execution.

## App Shell Philosophy

The app shell should feel calm, persistent, lightweight, and spatially reliable.

It should help users move between product areas quickly, switch venture context easily, maintain orientation, and preserve workflow continuity.

Avoid admin-dashboard shell patterns, heavy enterprise navigation, cluttered top bars, deep nested menus, and excessive layout chrome.

## Core Principles

Stability comes first. The shell should remain visually stable across Dashboard, Issues, Roadmap, and AI Assistant.

Navigation should not shift unexpectedly.

Avoid changing sidebar widths per page, page-specific shell redesigns, and inconsistent padding.

Treat venture context as global. The venture switcher is a core shell element and should be always visible, easy to access, lightweight, and clearly connected to current page data.

Switching ventures should update dashboard metrics, issues, roadmap, and AI context.

Avoid hiding venture selection inside filters or treating venture as secondary metadata.

Navigation should be quiet. Use compact nav items, subtle active states, restrained icons, and clear labels.

Avoid colorful nav items, large icon buttons, sidebar clutter, and gamified navigation.

## Recommended Shell Structure

```txt
AppShell
 ├── Sidebar
 │    ├── Brand
 │    ├── VentureSwitcher
 │    ├── PrimaryNav
 │    └── SecondaryMeta / Footer
 │
 ├── MainArea
 │    ├── TopBar / PageHeader
 │    └── PageContent
 │
 └── OptionalAssistantPanel
```

## Recommended Folder Structure

```txt
/components/app-shell
  ├── app-shell.tsx
  ├── sidebar.tsx
  ├── sidebar-nav.tsx
  ├── venture-switcher.tsx
  ├── top-bar.tsx
  ├── page-container.tsx
  └── assistant-panel-shell.tsx
```

Avoid placing shell components inside feature folders, duplicating page layout wrappers, or creating page-specific sidebars.

## Layout

Recommended desktop layout:

```tsx
<div className="min-h-screen bg-background text-foreground">
  <div className="flex min-h-screen">
    <Sidebar />

    <main className="flex min-w-0 flex-1 flex-col">
      <TopBar />
      <PageContainer>{children}</PageContainer>
    </main>
  </div>
</div>
```

Main content should fill available width, preserve scrolling stability, and avoid horizontal overflow except for intentional boards.

## Sidebar

Sidebar should feel compact, premium, persistent, and low-noise.

Recommended width:

```txt
240px-280px
```

Good default:

```txt
w-64
```

Recommended styling:

```tsx
border-r border-border/60 bg-background/95
```

Avoid huge sidebars, heavy backgrounds, colorful sidebar sections, and admin-dashboard nav density.

## Sidebar Structure

Recommended order:

```txt
Brand / Product Name
Venture Switcher
Primary Navigation
Operational Context / Footer
```

Avoid too many nav sections, settings-heavy sidebars, nested navigation trees, and unrelated utility links.

## Brand Area

Brand area should be compact, confident, and minimal.

Use product name, a small mark or icon, and an optional short label.

Avoid large logos, marketing taglines, and colorful branding blocks.

Example:

```tsx
<div className="flex h-14 items-center px-4">
  <span className="text-sm font-semibold tracking-tight">
    Foundary
  </span>
</div>
```

## Venture Switcher

Treat the venture switcher as the operational context selector.

It should show the active venture, an optional venture health or risk hint, and a portfolio or all-ventures option if supported.

Place it near the top of the sidebar, below brand and above navigation.

Use a compact select or popover, subtle border, and muted metadata.

Avoid large dropdowns, complex venture management UI, and hidden venture filters.

## Primary Navigation

Primary nav items:

```txt
Dashboard
Issues
Roadmap
AI Assistant
```

Each nav item should include icon, label, and active state. A small count badge is optional if it adds value.

Avoid deep nested nav, secondary feature clutter, and admin-style menu groups.

## Nav Item Styling

Recommended:

```tsx
className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
```

Active state:

```tsx
bg-muted text-foreground
```

Avoid bright active states, thick colored indicators, and large nav items.

## Top Bar

Top bar should be optional and lightweight.

Use it for page title context, quick actions, global search if needed, and current venture hint.

Avoid duplicating sidebar content, stuffing filters into the global top bar, and heavy header chrome.

Recommended height:

```txt
h-14 or h-16
```

Recommended style:

```tsx
border-b border-border/50 bg-background/80 backdrop-blur-sm
```

## Page Header

Each page should include title, concise description, one primary action, and optional page-specific controls.

Example:

```tsx
<div className="flex items-start justify-between gap-6">
  <div>
    <h1 className="text-2xl font-semibold">Issues</h1>
    <p className="mt-1 text-sm text-muted-foreground">
      Track execution across selected venture work.
    </p>
  </div>

  <Button>New Issue</Button>
</div>
```

Avoid large hero headers, multiple competing primary actions, and marketing copy.

## Page Container

All pages should use a shared container.

Recommended:

```tsx
<div className="mx-auto w-full max-w-[1600px] px-6 py-5">
  {children}
</div>
```

For board-heavy pages, allow horizontal overflow inside feature content while keeping the shell stable.

Avoid page-specific padding values, inconsistent container widths, and uncontrolled full-width layouts.

## Content Scrolling

Use main area scrolling, stable sidebar, and contained board overflow when needed.

Recommended:

```tsx
<main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
  <div className="flex-1 overflow-y-auto">
    {children}
  </div>
</main>
```

Avoid double scrollbars, sidebar scrolling unless necessary, and body-level layout jumps.

## Assistant Panel

If using a persistent assistant panel, keep it secondary, allow collapse or hide, and avoid competing with the main work area.

Recommended width:

```txt
320px-380px
```

Avoid permanent oversized AI sidebars, chatbot-style dominance, and shrinking main content too aggressively.

AI should feel embedded, not overpowering.

## Layout Density

Shell density should feel compact, calm, and efficient.

Recommended defaults:

```txt
sidebar item height: h-9
top bar height: h-14/h-16
page padding: px-6 py-5
section gaps: gap-5
```

Avoid large SaaS dashboard spacing, cramped navigation, and inconsistent rhythm.

## Responsive Behavior

Desktop is the priority.

Recommended behavior: persistent sidebar on desktop, collapsible sidebar on tablet, and simplified sheet navigation on mobile if needed.

Avoid breaking desktop layout for mobile support or spending disproportionate effort on mobile polish.

## Active Context

The shell should always communicate the current page, active venture, and active navigation item.

Avoid ambiguous context, hidden active states, and relying on page title alone for orientation.

## Keyboard Support

Where practical, support quick navigation, preserve focus states, and keep controls reachable.

Avoid mouse-only patterns for core flows.

## Visual Design

Shell should feel dark-first, quiet, premium, operational, and modern.

Use subtle borders, muted backgrounds, compact nav, and restrained icons.

Avoid colorful admin shells, heavy gradients, large logos, and excessive decoration.

## Motion

Shell motion should be subtle, fast, and stable.

Use motion for sidebar collapse, panel reveal, and active state transitions.

Avoid animated navigation theatrics, sliding pages, and excessive shell movement.

## Loading

Shell should render immediately. Do not block shell rendering for feature data.

Page content can show skeletons.

Avoid full-app loading screens and hiding navigation during data loading.

## Suggested Components

```txt
AppShell
Sidebar
SidebarBrand
SidebarNav
SidebarNavItem
VentureSwitcher
TopBar
PageContainer
PageHeader
AssistantPanelShell
ShellDivider
```

## Anti-Patterns

Never introduce admin dashboard shell, heavy nested navigation, large marketing headers, hidden venture context, page-specific sidebars, inconsistent page padding, oversized AI panel, global layout jitter, sidebar clutter, or enterprise settings navigation.

## App Shell Quality Checklist

Before finalizing shell work, verify:

```txt
[ ] Sidebar is stable across pages
[ ] Active venture is always visible
[ ] Navigation is compact
[ ] Page padding is consistent
[ ] Top bar is not cluttered
[ ] Shell renders before feature content
[ ] No admin-dashboard feeling
[ ] AI panel does not overpower main content
[ ] Desktop layout feels premium
[ ] Page transitions preserve orientation
```

## Default Bias

When uncertain, choose persistent over hidden, compact over spacious, quiet over decorative, stable over dynamic, venture-visible over filter-hidden, sidebar over top-heavy nav, and clarity over configurability.

## North Star

Foundary app shell should feel like a stable operational workspace for moving across ventures quickly.

Users should always know where they are, which venture they are viewing, and what operational area they are in. Never make them feel like they are inside a generic admin template.
