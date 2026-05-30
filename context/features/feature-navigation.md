# Feature Specification — Navigation & App Shell

## Purpose

The Navigation System is:
> the operational foundation layer of Foundary.

It creates:
- spatial continuity
- venture context persistence
- operational stability
- navigation clarity
- workflow flow-state
- local workspace continuity controls

The navigation experience should feel:
- calm
- lightweight
- stable
- fast
- unobtrusive
- premium

This is one of the MOST important architectural systems because:
> the shell determines how "real" the product feels.

---

# Navigation Philosophy

The navigation should feel like:
> modern operational software for high-velocity teams.

Inspired by:
- Linear
- Vercel
- Raycast
- modern AI-native SaaS tools

The shell should prioritize:
- continuity
- focus
- low cognitive load
- operational efficiency

---

# Core UX Goals

Users should feel:
- oriented
- focused
- uninterrupted
- contextually aware

The navigation system should answer:

| Question | Purpose |
|---|---|
| Where am I? | Spatial clarity |
| Which venture is active? | Context awareness |
| What can I access quickly? | Operational efficiency |
| How do I switch contexts rapidly? | Momentum preservation |
| What requires attention? | Operational awareness |
| Is my local workspace state saved? | Continuity confidence |

---

# Local Workspace Controls

The app shell may expose compact local-first utilities for:
- saved-state visibility
- resetting seeded demo data
- exporting workspace state
- importing valid workspace state

These controls should stay subtle, shell-level, and utility-like. They should
not become a settings page or backend account surface.

---

# Experience Principles

## 1. Navigation Should Disappear

The shell should feel:
- invisible
- stable
- natural

Users should focus on:
- execution
- strategy
- operational decisions

NOT:
- navigating the product

---

## 2. Venture Context Must Always Be Visible

This is a CORE differentiator.

The active venture should always feel:
- visible
- persistent
- operationally important

Users constantly switch venture contexts.

The shell must support:
> rapid context switching without friction.

When local-first venture setup is active, the venture switcher may also expose
a compact "New venture" action. This should feel like adding an operational
context, not entering a settings or administration area.

---

## 3. Operational Calmness

The navigation should feel:
- restrained
- quiet
- focused

Avoid:
- noisy indicators
- crowded menus
- admin-panel complexity

---

## 4. Stable Spatial Memory

The UI should maintain:
- predictable layout structure
- stable positioning
- consistent navigation behavior

This improves:
- speed
- confidence
- workflow continuity

---

# App Shell Structure

## Recommended Layout

```txt
AppShell
├── Sidebar
│   ├── Logo / Identity
│   ├── Venture Switcher
│   ├── Navigation Links
│   ├── Context Actions
│   └── User Area
│
├── Main Content Area
│   ├── Page Header
│   ├── Content Region
│   └── Contextual Actions
│
└── Optional Assistant Panel
```

---

# App Shell Philosophy

The shell should feel:
> operationally persistent.

Avoid:
- layout instability
- route disorientation
- navigation reflow

The user should always feel:
- grounded
- oriented
- uninterrupted

---

# Sidebar Navigation

## Purpose

The sidebar is:
> the persistent operational anchor.

It provides:
- navigation clarity
- venture awareness
- workflow continuity

---

# Sidebar Requirements

Must contain:
- product identity
- venture switcher
- primary navigation
- contextual shortcuts
- assistant access

---

# Primary Navigation

## Required Navigation Items

```ts
[
  "Dashboard",
  "Issues",
  "Roadmap",
  "AI Assistant"
]
```

---

# Navigation Philosophy

Navigation items should feel:
- lightweight
- operational
- minimal
- stable

Avoid:
- deep nesting
- complex hierarchies
- enterprise menu systems

---

# Navigation States

Each nav item should support:
- idle
- hover
- active
- focused

States should feel:
- subtle
- premium
- restrained

---

# Active State Philosophy

Active navigation should:
- communicate orientation clearly
- avoid visual noise

Prefer:
- subtle highlights
- soft background shifts
- restrained borders

Avoid:
- oversized indicators
- excessive contrast
- flashy active states

---

# Sidebar Collapse Behavior

## Optional Feature

Sidebar may support:
- collapsed mode
- icon-only navigation

Must preserve:
- usability
- spatial continuity
- venture awareness

---

# Collapse UX Rules

Collapsed navigation should still feel:
- recognizable
- operational
- calm

Avoid:
- tooltip overload
- hidden context confusion

---

# Venture Switcher

## Purpose

The Venture Switcher is:
> the core operational context controller.

This is one of the MOST important differentiators in the product.

---

# Venture Switcher Requirements

Must support:
- instant switching
- persistent visibility
- low-friction access
- venture context clarity
- compact local venture creation when enabled by the current phase

---

# Supported Ventures

```ts
[
  "Sentra",
  "Reson8",
  "Internal Ops"
]
```

---

# Venture Switcher UX Philosophy

Switching ventures should feel:
- immediate
- lightweight
- uninterrupted

Users should never feel:
- lost
- context-swapped unexpectedly
- forced into reload-heavy transitions

Creating a venture from this surface should:
- add the venture to the local workspace
- make it immediately selectable
- switch into the new venture context after creation
- preserve the existing compact dropdown rhythm

---

# Venture Switching Behavior

Changing ventures should update:
- dashboard metrics
- issues
- roadmap items
- AI insights
- operational context

Transitions should feel:
- fast
- stable
- coherent

---

# Venture Visual Identity

Each venture may include:
- subtle color indicator
- venture icon
- short label

Keep branding:
- restrained
- operational
- minimal

Avoid:
- excessive branding systems
- strong marketing visuals

---

# Top Navigation Area

## Purpose

The top region provides:
- contextual orientation
- page identity
- quick operational actions

---

# Recommended Content

Page headers may include:
- page title
- operational summary
- filters
- quick actions
- contextual AI insights

---

# Top Bar UX Rules

The top region should feel:
- lightweight
- uncluttered
- contextual

Avoid:
- dense toolbars
- enterprise ribbon behavior
- excessive controls

---

# Contextual Actions

## Purpose

Support:
- rapid execution
- quick creation
- low-friction workflows

---

# Examples

```txt
Create Issue
Create Roadmap Item
Analyze Risks
Open AI Insights
```

---

# Action UX Rules

Actions should feel:
- secondary
- lightweight
- operational

Avoid:
- CTA-heavy product marketing behavior
- oversized buttons
- excessive emphasis

---

# Assistant Panel

## Purpose

Optional persistent intelligence surface.

Provides:
- contextual AI insights
- operational observations
- risk visibility
- strategic recommendations

---

# Assistant Panel UX Philosophy

The assistant panel should feel:
- ambient
- supportive
- quiet

NOT:
- dominant
- conversational
- distracting

---

# Panel Behavior

Assistant panel may:
- remain collapsible
- preserve context
- react to navigation state

---

# Recommended Panel Content

Display:
- operational insights
- risk alerts
- roadmap observations
- issue recommendations

Avoid:
- chat interfaces
- AI conversations
- long-form text

---

# Drawer System

## Purpose

Drawers preserve:
- spatial continuity
- workflow momentum
- operational focus

Avoid:
- excessive page transitions
- route fragmentation

---

# Drawer Usage Areas

Use drawers for:
- issue details
- roadmap details
- AI analysis
- quick editing

---

# Drawer UX Rules

Drawers should feel:
- smooth
- stable
- contextual
- lightweight

Avoid:
- modal stacking
- full-screen interruptions
- nested overlays

---

# Routing Philosophy

## Core Principle

Routes should represent:
> operational areas.

NOT:
> every object state.

---

# Recommended Routes

```txt
/dashboard
/issues
/roadmap
/assistant
```

---

# Important Routing Rule

Issue details and roadmap details should:
- prefer drawers
- avoid deep route nesting

This preserves:
- operational continuity
- scanning momentum
- spatial stability

---

# Navigation Motion Rules

Motion should feel:
- restrained
- smooth
- premium
- intentional

---

# Use Motion For

- sidebar transitions
- venture switching
- drawer transitions
- hover interactions
- contextual updates

---

# Avoid Motion For

- flashy navigation animation
- excessive route choreography
- distracting transitions
- playful movement

---

# Keyboard Navigation

## Purpose

Support:
- operational speed
- power-user workflows
- low-friction interaction

---

# Recommended Keyboard Behaviors

Support:
- quick search
- quick create
- drawer open/close
- navigation switching

Optional:
- command palette behavior

---

# Command Palette Philosophy

If implemented, it should feel:
- minimal
- operational
- fast

Inspired by:
- Linear
- Raycast

Avoid:
- over-featured command systems

---

# Responsive Philosophy

Priority:
1. Desktop
2. Large tablet

The shell is:
> desktop-first.

---

# Desktop UX Goals

Desktop should feel:
- dense but breathable
- operationally efficient
- premium

---

# Mobile Strategy

Mobile support can remain:
- minimal
- simplified

Do NOT prioritize:
- complex responsive adaptation
- mobile parity perfection

---

# Navigation State Management

## Suggested State Areas

```ts
type NavigationState = {
  activeRoute: string

  activeVentureId: string

  sidebarCollapsed: boolean

  assistantPanelOpen: boolean

  activeDrawer?: {
    type: string
    id: string
  }
}
```

---

# Suggested Navigation Components

```txt
AppShell
Sidebar
SidebarNav
SidebarNavItem
VentureSwitcher
TopBar
PageHeader
ContextActions
AssistantPanel
GlobalDrawer
CommandPalette
```

---

# Visual Design Rules

## Must Feel

- calm
- premium
- lightweight
- operational
- stable
- modern

---

## Must Avoid

- enterprise admin panels
- crowded navigation
- excessive hierarchy
- dashboard clutter
- noisy sidebars
- aggressive visual states

---

# Empty State Philosophy

Navigation empty states should feel:
- operational
- intentional
- minimal

Example:

```txt
No active initiatives available in this venture.
```

NOT:

```txt
🎉 Looks like you're all done here!
```

---

# Loading State Philosophy

Use:
- skeleton layouts
- subtle shimmer
- lightweight opacity transitions

Loading should feel:
- stable
- premium
- non-disruptive

---

# Anti-Patterns

DO NOT:
- build enterprise side navigation
- add deep nested menus
- overload top bars
- create settings-heavy navigation
- use route-heavy workflows
- rely on modal-first interactions
- create cluttered assistant experiences
- introduce noisy status indicators

---

# Success Criteria

The Navigation System succeeds when users feel:

> "The product feels stable, calm, and operationally efficient."

AND:

> "I can move between ventures and workflows without losing focus."

NOT:

> "This is another enterprise admin dashboard."

---

# Final Navigation North Star

The navigation experience should feel like:

> "A calm operational shell for high-velocity venture execution."

Every implementation decision should reinforce:
- spatial continuity
- venture awareness
- operational clarity
- low cognitive load
- workflow momentum
- premium product restraint
