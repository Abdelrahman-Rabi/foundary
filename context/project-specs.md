# Project Specifications — Foundary

## Product Summary

Foundary is an AI-native venture execution platform inspired by Linear and adapted for venture studios managing multiple startups simultaneously.

The system is intentionally optimized for:
- lean venture teams
- async collaboration
- rapid execution
- operational clarity
- venture-aware workflows

The application should feel:
- calm
- fast
- focused
- strategically intelligent

---

# Product Scope

## Included in V1

### Core Areas
- Venture switching
- Local-first venture creation
- Dashboard
- Issues system
- Roadmap system
- AI assistant panel
- Mock operational intelligence
- Drag and drop workflows
- Responsive desktop-first UI
- Global app shell
- Contextual drawers
- Venture-aware metrics
- Local-first workspace persistence
- Reset / export / import workspace utilities

---

## Explicitly Excluded

DO NOT implement:
- authentication
- RBAC
- notifications
- comments system
- real backend
- real database
- backend database persistence
- websocket infrastructure
- real AI integrations
- activity feeds
- audit logs
- advanced permissions
- enterprise reporting
- settings pages
- billing
- multi-user collaboration

The goal is:
> believable operational sophistication.

NOT:
> production infrastructure completeness.

---

# Application Architecture

## Application Structure

```txt
App Shell
 ├── Sidebar
 ├── Venture Switcher
 ├── Main Content
 └── AI Assistant Panel

Pages
 ├── Dashboard
 ├── Issues
 ├── Roadmap
 └── AI Assistant
```

---

# Core Routes

## Dashboard
```txt
/dashboard
```

Purpose:
- operational overview
- venture visibility
- portfolio intelligence

---

## Issues
```txt
/issues
```

Purpose:
- execution workflows
- issue management
- delivery coordination

Views:
- list view
- board view

---

## Roadmap
```txt
/roadmap
```

Purpose:
- strategic planning
- outcome tracking
- roadmap visibility

---

## AI Assistant
```txt
/assistant
```

Purpose:
- operational intelligence
- contextual AI analysis
- venture insights

---

# Venture System

## Supported Ventures

Seeded demo ventures:

```ts
[
  "Sentra",
  "Reson8",
  "Internal Ops"
]
```

Each venture should contain:
- issues
- roadmap items
- metrics
- AI insights
- health signals

Users may add custom local ventures after the MVP continuity phase. Custom
ventures should behave as first-class venture contexts across the shell,
dashboard, issues, roadmap, assistant, and local workspace persistence.

Custom venture creation remains local-first. It does not imply backend
accounts, team management, organization settings, permissions, billing, or CRM
records.

Minimum custom venture input:

```ts
type CreateVentureInput = {
  name: string
  description: string
  stage: "idea" | "validation" | "mvp" | "growth"
}
```

Generated venture defaults should remain believable and restrained:
- generated id, slug, icon, and color
- stable initial health
- stage-aware momentum/confidence
- zero issue and roadmap counts until work exists

---

# Dashboard Specifications

## Purpose

The dashboard is:
- executive-readable
- operationally informative
- strategically calm

It should NOT feel:
- cluttered
- analytical-heavy
- enterprise-like

---

## Required Dashboard Components

### KPI Cards
Display:
- total issues
- overdue issues
- active roadmap items
- killed items

---

### Venture Health Section

Each venture should show:
- momentum
- risk level
- execution health
- roadmap progress

---

### Issues by Status

Visual representation of:
- backlog
- planned
- in progress
- in review
- done
- killed

Charts are optional.

---

### Roadmap Overview

Display:
- active roadmap initiatives
- roadmap confidence
- delivery health

---

### Portfolio Risk Panel

Surface:
- blocked initiatives
- delayed work
- AI risk observations

---

# Issues System Specifications

## Purpose

The issues system is:
> the operational execution layer.

It should feel:
- alive
- fast
- responsive
- workflow-oriented

---

# Issue Data Model

```ts
type Issue = {
  id: string
  title: string
  description: string
  ventureId: string

  type:
    | "feature"
    | "bug"
    | "experiment"
    | "tech-debt"
    | "research"

  priority:
    | "urgent"
    | "high"
    | "medium"
    | "low"

  status:
    | "backlog"
    | "planned"
    | "in-progress"
    | "in-review"
    | "done"
    | "killed"

  owner: string
  dueDate?: string
  tags: string[]
  roadmapId?: string

  createdAt: string
  updatedAt: string
}
```

---

# Required Issue Views

## 1. List View

Must support:
- filtering
- searching
- sorting
- compact rows
- inline metadata visibility

The list should feel:
- scannable
- dense but breathable
- operationally efficient

---

## 2. Board View

Kanban-style workflow.

Columns:
- Backlog
- Planned
- In Progress
- In Review
- Done
- Killed

Must support:
- drag and drop
- smooth transitions
- responsive interactions

---

## 3. Issue Drawer

Should open from:
- list items
- board cards

Contains:
- full issue details
- linked roadmap item
- AI insights
- editable metadata

Use drawer pattern instead of page navigation.

---

# Roadmap System Specifications

## Purpose

The roadmap system is:
> the strategic execution layer.

It should feel:
- calmer
- more strategic
- less operational than Issues

---

# Roadmap Data Model

```ts
type RoadmapItem = {
  id: string
  title: string
  ventureId: string

  timeframe:
    | "now"
    | "next"
    | "later"

  goal: string

  status:
    | "planned"
    | "active"
    | "at-risk"
    | "completed"
    | "killed"

  linkedIssueIds: string[]

  progress: number
  confidence: number

  createdAt: string
  updatedAt: string
}
```

---

# Roadmap Layout

Columns:
- Now
- Next
- Later

Each roadmap card should display:
- title
- goal
- progress
- confidence
- linked issue count
- venture indicator

---

# Roadmap Interactions

Users should be able to:
- open roadmap drawer
- view linked issues
- navigate between roadmap and issues
- understand execution confidence

---

# AI Assistant Specifications

## Purpose

The AI assistant should feel:
> embedded operational intelligence.

NOT:
> chatbot UX.

---

# AI Behaviors

Supported mocked behaviors:
- summarize issue
- detect delivery risk
- suggest priority
- identify missing acceptance criteria
- recommend continue / kill / split decisions
- surface roadmap confidence concerns

---

# AI Output Style

AI responses should feel:
- concise
- operational
- strategic
- believable
- low-noise

---

# Example AI Response

```txt
Risk Level: High

Reason:
The issue lacks measurable success criteria and is linked to a high-priority roadmap initiative.

Suggested Action:
Split discovery validation from implementation delivery.

Confidence:
82%
```

---

# AI UI Rules

Avoid:
- chat bubbles
- playful AI styling
- assistant avatars
- conversational UI

Prefer:
- structured analysis blocks
- contextual panels
- embedded intelligence cards

---

# Navigation Specifications

## Sidebar Navigation

Primary navigation:
- Dashboard
- Issues
- Roadmap
- AI Assistant

Sidebar should:
- remain persistent
- support collapse behavior
- feel lightweight

---

# Venture Switcher

Requirements:
- globally accessible
- always visible
- instant switching
- low friction

Switching ventures should update:
- metrics
- roadmap
- issues
- AI context

---

# State Management

Use Zustand for:
- venture state
- issue state
- roadmap state
- UI state
- filters
- assistant context
- local-first hydration and reset state

---

# Data Strategy

## Data Source

Use:
- mocked JSON
- local frontend stores
- deterministic seeded datasets
- versioned browser localStorage for current workspace continuity

DO NOT:
- create backend APIs
- add database complexity
- simulate production infrastructure

Local-first persistence should cover:
- custom venture records
- issue records and filters
- roadmap records and filters
- venture context
- issues list / board view mode
- assistant inspected and dismissed signal state

Workspace utilities should support:
- reset to seeded demo data
- export current workspace state
- import valid workspace state without crashing on invalid JSON

Reset should remove custom local ventures and restore the seeded demo ventures.
Export/import should round-trip custom ventures and their linked issue/roadmap
records when valid.

---

# Mock Data Requirements

Data should feel:
- operationally believable
- strategically coherent
- interconnected

Relationships should exist between:
- ventures
- issues
- roadmap items
- AI insights

---

# UX Specifications

## Interaction Philosophy

Prefer:
- drawers
- inline editing
- hover actions
- keyboard-friendly workflows
- fast transitions

Avoid:
- full page reloads
- modal overload
- excessive confirmations

---

# Motion Philosophy

Motion should be:
- subtle
- disciplined
- responsive
- premium

Use motion for:
- drawer transitions
- DnD interactions
- hover feedback
- loading states

Avoid:
- flashy animations
- excessive transitions

---

# Responsive Strategy

Priority:
1. Desktop
2. Large tablet

Mobile support can remain minimal.

This assignment is desktop-first.

---

# Technical Stack

## Required Technologies

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- dnd-kit
- Recharts
- Framer Motion

---

# Build Priorities

Highest implementation priority:
1. App shell quality
2. Dashboard sophistication
3. Issues workflow quality
4. Roadmap clarity
5. AI behavior realism
6. Interaction polish

---

# Anti-Patterns

DO NOT:
- build Mini Jira
- create enterprise UX
- overcomplicate workflows
- create deeply nested navigation
- add unnecessary settings
- prioritize feature quantity
- simulate production backend systems
- create noisy dashboards
- implement chatbot interfaces

---

# Final UX Success Criteria

The product should feel:
- strategically intelligent
- operationally calm
- AI-native
- venture-aware
- premium
- modern
- cohesive

Users should feel:
> "This system helps venture teams move quickly with clarity."

NOT:
> "This is another generic PM dashboard."
