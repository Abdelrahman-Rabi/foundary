# Current Feature — Foundation & App Shell

## Current Objective

Build the foundational application shell for Foundary.

This phase establishes:
- architecture stability
- navigation continuity
- visual consistency
- operational environment
- persistent venture-aware layout

This is the first major implementation milestone.

---

# Strategic Goal

The goal is NOT:
> building pages.

The goal is:
> making the product already feel like believable operational software before feature depth exists.

The shell should immediately communicate:
- calm execution UX
- venture-aware workflows
- modern AI-native product quality
- operational clarity

---

# Current Implementation Scope

This phase includes ONLY:

## Foundation Setup
- Next.js App Router setup
- Tailwind CSS v4 setup
- shadcn/ui setup
- Zustand setup
- theme foundation
- typography system
- spacing tokens
- motion utilities

---

## App Shell
- sidebar
- top navigation area
- global layout
- content container
- responsive structure

---

## Navigation
- dashboard route
- issues route
- roadmap route
- assistant route

---

## Venture Switcher
- global venture selector
- persistent active venture state
- instant venture switching behavior

---

## Drawer Infrastructure
- reusable sheet/drawer system
- contextual side panels
- foundation for issue/roadmap drawers

---

# Explicitly OUT OF SCOPE

Do NOT build yet:
- dashboard widgets
- issue CRUD
- kanban board
- roadmap cards
- AI recommendation engine
- charts
- analytics
- authentication
- notifications
- backend APIs

This phase is ONLY:
> foundation + operational shell.

---

# Required Components

## Layout Components

```txt
AppShell
Sidebar
SidebarNav
TopBar
ContentLayout
PageContainer
```

---

## Navigation Components

```txt
NavItem
NavSection
VentureSwitcher
```

---

## Infrastructure Components

```txt
AppDrawer
DrawerProvider
CommandTrigger
```

---

# UX Goals

The shell should feel:
- calm
- stable
- premium
- operational
- focused
- lightweight

Users should immediately feel:
> “This is real operational software.”

Even before major features exist.

---

# Visual Direction

## Design Language
- dark-first
- subtle borders
- restrained contrast
- compact spacing
- calm typography
- minimal visual noise

Inspired by:
- Linear
- Vercel
- Raycast

---

## Navigation Feel

Navigation should feel:
- persistent
- lightweight
- low-friction
- always accessible

Avoid:
- heavy admin panel feeling
- enterprise sidebar density
- excessive nesting

---

# Technical Notes

## Required Stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand
- Framer Motion

---

## Tailwind v4 Rule

DO NOT create:
```txt
tailwind.config.ts
```

Use:
```txt
src/app/globals.css
```

with:
```css
@theme
```

---

## State Management

Create:
```txt
venture-store.ts
ui-store.ts
```

Do NOT create:
- giant global stores
- unnecessary abstractions

---

## Routing Structure

```txt
src/app
  ├── dashboard
  ├── issues
  ├── roadmap
  ├── assistant
  └── layout.tsx
```

---

# Interaction Rules

Prefer:
- drawer-based workflows
- smooth hover interactions
- subtle transitions
- layout continuity

Avoid:
- page refresh feeling
- modal overload
- flashy animations

---

# Motion Rules

Motion should feel:
- subtle
- fast
- intentional
- restrained

Use motion for:
- sidebar collapse
- drawer transitions
- hover feedback

Avoid:
- exaggerated animations
- playful movement

---

# Acceptance Criteria

This phase is complete when:

- app shell feels structurally believable
- navigation feels stable
- venture switching works
- layout continuity exists
- theme system feels cohesive
- routing structure is stable
- drawer system foundation exists
- product already feels premium

---

# Anti-Patterns

DO NOT:
- build Mini Jira layouts
- create dense enterprise navigation
- overbuild state systems
- introduce backend complexity
- create oversized dashboard cards
- overanimate the interface
- create cluttered sidebars

---

# Future Follow-Ups

The following will be implemented later:
- dashboard intelligence layer
- issues system
- roadmap workflows
- AI assistant logic
- synchronization engine
- motion polish
- demo optimization

Do NOT partially implement them now.

---

# Progress Checklist

## Foundation
- [ ] Initialize Next.js app
- [ ] Setup Tailwind v4
- [ ] Setup shadcn/ui
- [ ] Setup Zustand
- [ ] Setup dark theme
- [ ] Create spacing tokens
- [ ] Create typography hierarchy

---

## Shell
- [ ] Build AppShell
- [ ] Build Sidebar
- [ ] Build VentureSwitcher
- [ ] Build TopBar
- [ ] Build ContentLayout

---

## Navigation
- [ ] Setup routes
- [ ] Setup persistent navigation
- [ ] Add active state handling

---

## Drawer Infrastructure
- [ ] Create drawer system
- [ ] Create reusable sheet wrapper
- [ ] Add transition animations

---

## Validation
- [ ] Verify layout responsiveness
- [ ] Verify navigation continuity
- [ ] Verify theme consistency
- [ ] Run production build
- [ ] Fix TypeScript issues