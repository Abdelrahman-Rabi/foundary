# Coding Standards — Foundary

## Purpose

This document defines:
- engineering standards
- architectural conventions
- implementation constraints
- UX consistency rules
- AI-assisted development guidelines

These standards exist to ensure:
- coherent implementation
- premium interaction quality
- maintainable architecture
- consistent design behavior
- fast AI-assisted development

This project prioritizes:
> believable sophistication over infrastructure complexity.

---

# Core Engineering Philosophy

## Optimize For

- fast iteration
- frontend excellence
- interaction quality
- architectural clarity
- operational realism
- maintainable composability
- AI-assisted acceleration

---

## Do NOT Optimize For

- enterprise architecture
- backend sophistication
- premature abstractions
- overengineering
- production infrastructure realism
- feature quantity

---

# Core Product Principle

Every implementation decision should reinforce:

- operational clarity
- venture awareness
- execution momentum
- calm UX
- AI-native workflows
- premium interaction quality

If a feature does not reinforce those goals:
> it probably should not exist.

---

# Technology Stack

## Core Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand
- Framer Motion
- dnd-kit
- Recharts
- Lucide Icons

---

# TypeScript Standards

## Strict Mode

TypeScript strict mode must remain enabled.

---

## Avoid `any`

Never use:
```ts
any
```

Use:
```ts
unknown
```

Or proper explicit typing.

---

## Type Definitions

Define types/interfaces for:
- props
- stores
- domain models
- utility functions
- AI response structures

---

## Prefer Explicit Domain Types

Prefer:
```ts
type VentureHealth = "healthy" | "at-risk" | "blocked"
```

Over:
```ts
string
```

---

## Shared Types Structure

```txt
src/types
  ├── issue.ts
  ├── roadmap.ts
  ├── venture.ts
  ├── dashboard.ts
  └── ai.ts
```

---

# React Standards

## Functional Components Only

Do NOT use:
- class components
- legacy React patterns

---

## Component Responsibility

Each component should have:
> one clear responsibility.

Avoid:
- giant multi-purpose components
- deeply nested render logic

---

## Extract Reusable Logic

Use:
- custom hooks
- utility functions
- composable primitives

Avoid:
- duplicated interaction logic

---

## Client Components

Use `"use client"` ONLY when necessary.

Valid reasons:
- Zustand state
- browser APIs
- drag and drop
- animations
- event handlers

Default to server components where possible.

---

# Next.js Standards

## App Router Required

Use:
```txt
src/app
```

architecture only.

---

## Route Structure

```txt
src/app
  ├── dashboard
  ├── issues
  ├── roadmap
  ├── assistant
  └── layout.tsx
```

---

## Layout Usage

Use layouts for:
- persistent shell
- sidebar
- assistant panel
- navigation continuity

---

## No API Overengineering

DO NOT create:
- unnecessary API routes
- fake backend architecture
- mock REST infrastructure

This project is frontend-first.

---

# Tailwind CSS v4 Standards

## CRITICAL

This project uses:
> Tailwind CSS v4

DO NOT create:
- tailwind.config.js
- tailwind.config.ts

Theme configuration belongs inside:
```txt
src/app/globals.css
```

using:
```css
@theme
```

---

## Design Tokens

All tokens should use CSS variables.

Example:
```css
@theme {
  --color-background: oklch(0.18 0.01 240);
  --color-border: oklch(0.28 0.01 240);
}
```

---

## Styling Philosophy

The UI should feel:
- restrained
- calm
- compact
- premium
- operational

Avoid:
- loud gradients
- excessive shadows
- oversized spacing
- colorful dashboards

---

# shadcn/ui Standards

## Use shadcn/ui As Foundation

Prefer extending:
- Card
- Dialog
- Sheet
- DropdownMenu
- Tooltip
- Tabs
- ScrollArea

Avoid:
- reinventing primitives unnecessarily

---

## Component Customization

Customize through:
- composition
- utility classes
- variants

Avoid:
- modifying core library internals

---

# File Organization

## Folder Structure

```txt
src
  ├── app
  ├── components
  ├── features
  ├── stores
  ├── hooks
  ├── lib
  ├── data
  ├── types
  └── styles
```

---

# Feature Structure

```txt
src/features/issues
  ├── components
  ├── hooks
  ├── stores
  ├── utils
  └── types
```

---

# Naming Conventions

## Components

PascalCase:
```txt
IssueCard.tsx
RoadmapDrawer.tsx
```

---

## Hooks

camelCase with `use` prefix:
```ts
useIssueFilters
useRoadmapMetrics
```

---

## Constants

SCREAMING_SNAKE_CASE:
```ts
MAX_VISIBLE_ISSUES
```

---

## Types

PascalCase:
```ts
Issue
RoadmapItem
VentureMetric
```

---

# State Management Standards

## Zustand Only

Use Zustand for:
- venture state
- issue state
- roadmap state
- filters
- assistant context
- UI state

---

## Store Philosophy

Stores should remain:
- small
- domain-focused
- composable

Avoid:
- giant global stores
- unrelated state coupling

---

## Store Structure

```txt
src/stores
  ├── venture-store.ts
  ├── issue-store.ts
  ├── roadmap-store.ts
  └── ui-store.ts
```

---

# Data Standards

## Mocked Data Only

Use:
- seeded JSON
- local stores
- deterministic mock generators

Do NOT implement:
- real databases
- Prisma
- Supabase
- backend persistence

This assignment optimizes for:
> operational realism, not backend realism.

---

## Mock Data Quality

Mock data should feel:
- believable
- interconnected
- strategically coherent
- operationally realistic

Relationships should exist between:
- ventures
- roadmap items
- issues
- AI insights

---

# Component Standards

## Component Size

Prefer components under:
```txt
200 lines
```

Split large components aggressively.

---

## Composition First

Prefer:
- composition
- reusable primitives
- modular UI blocks

Avoid:
- giant monolith components

---

## Drawer Pattern

Prefer:
- drawers
- sheets
- side panels

Avoid:
- full-page context switching

This is a core UX principle.

---

# UX & Interaction Standards

## Interaction Philosophy

The product should feel:
- fast
- stable
- operational
- calm

---

## Motion Standards

Use motion for:
- drawer transitions
- hover feedback
- drag interactions
- layout continuity

Motion should be:
- subtle
- disciplined
- responsive

Avoid:
- flashy animation
- exaggerated easing
- unnecessary transitions

---

## Density Standards

Maintain:
- compact layouts
- breathable spacing
- efficient scanning

Avoid:
- oversized cards
- excessive whitespace
- enterprise dashboard density

---

# AI Assistant Standards

## AI UX Rules

AI should feel:
> embedded and contextual.

NOT:
> chatbot-first.

---

## Avoid

Do NOT implement:
- chat bubbles
- assistant avatars
- fake typing animations
- conversational gimmicks

---

## Prefer

Use:
- analysis cards
- recommendation blocks
- contextual insights
- operational summaries

---

# Accessibility Standards

Maintain:
- keyboard navigability
- semantic HTML
- visible focus states
- sufficient contrast

Use accessible primitives from shadcn/ui.

---

# Code Quality Standards

## No Dead Code

Do NOT leave:
- commented code
- unused imports
- unused variables
- abandoned components

---

## Keep Logic Readable

Prefer:
- explicit logic
- descriptive naming
- small functions

Avoid:
- over-abstraction
- premature optimization

---

## Function Complexity

Prefer functions under:
```txt
50 lines
```

Extract helpers when necessary.

---

# AI-Assisted Development Standards

## AI Usage Philosophy

AI should accelerate:
- scaffolding
- repetitive UI
- utility generation
- boilerplate

Humans should control:
- UX quality
- architecture
- product decisions
- polish
- interaction design

---

## Required AI Workflow

Recommended workflow:

```txt
Define clear component goal
  ↓
Generate scaffold with AI
  ↓
Refine structure manually
  ↓
Polish interactions manually
  ↓
Refine spacing & typography
```

---

## Never Trust AI Blindly

Always review:
- spacing
- hierarchy
- accessibility
- motion
- responsiveness
- state logic

---

# Anti-Patterns

## DO NOT BUILD

- Mini Jira
- enterprise workflows
- settings-heavy systems
- RBAC systems
- dense analytics dashboards
- fake backend complexity
- real AI infrastructure
- over-abstracted architecture

---

# Success Criteria

The codebase should feel:
- modern
- intentional
- composable
- lightweight
- strategically focused

The product should feel:
> like a premium AI-native operational tool for venture studios.

NOT:
> a generic CRUD dashboard.