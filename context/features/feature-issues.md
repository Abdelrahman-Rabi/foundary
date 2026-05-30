# Feature Specification — Issues System

## Purpose

The Issues System is:
> the operational execution layer of Foundary.

This is where venture teams:
- coordinate delivery
- track execution
- manage experiments
- prioritize work
- reduce operational ambiguity
- maintain momentum

The Issues experience should feel:
- alive
- responsive
- fast
- operationally focused
- lightweight
- premium
- continuous across refreshes

This is one of the MOST important product areas because it creates:
> execution credibility.

---

# Issues System Philosophy

The Issues System is NOT:
> enterprise workflow management.

It IS:
> high-velocity venture execution coordination.

The product should optimize for:
- small elite teams
- async execution
- rapid iteration
- low-friction workflows
- operational clarity

Avoid:
- process bureaucracy
- excessive workflow configuration
- enterprise ticketing behavior

---

# Core UX Goals

Users should feel:
- momentum
- focus
- operational clarity
- execution confidence

The Issues System should answer:

| Question | Purpose |
|---|---|
| What is actively moving? | Momentum visibility |
| What is blocked? | Operational awareness |
| What needs attention? | Prioritization |
| What is overdue? | Delivery coordination |
| Which roadmap initiatives are affected? | Strategic visibility |
| Which ventures are overloaded? | Portfolio balance |

---

# Local-First Continuity

Issue state should persist locally across refreshes.

Persist:
- issue records
- status moves
- quick-created issues
- filters
- search
- sort state
- list / board view mode

Reset demo data should restore seeded issues and default issue preferences.
Importing invalid workspace state must not overwrite current issue state.

---

# Experience Principles

## 1. Speed Is a Feature

The Issues experience should feel:
- immediate
- low-friction
- lightweight

Prefer:
- inline interactions
- quick create
- keyboard-friendly flows
- fast updates
- contextual editing

Avoid:
- large forms
- workflow interruptions
- page-heavy navigation

---

## 2. Operational Clarity

Issues should be:
- highly scannable
- compact
- readable
- visually organized

Users should quickly identify:
- priority
- status
- ownership
- venture
- risk
- roadmap linkage

---

## 3. Venture Awareness

Everything must reinforce:
> venture context awareness.

Every issue should clearly communicate:
- which venture it belongs to
- strategic importance
- roadmap relationship
- execution impact

---

## 4. Workflow Momentum

The system should feel:
> operationally alive.

Interactions should reinforce:
- movement
- progress
- delivery flow
- execution momentum

Especially in:
- Kanban interactions
- status changes
- drawer transitions
- filters
- search flows

---

# Core Issue Data Model

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

  riskLevel?:
    | "low"
    | "medium"
    | "high"

  aiSummary?: string

  createdAt: string
  updatedAt: string
}
```

---

# Issue Types

## Supported Types

```ts
[
  "feature",
  "bug",
  "experiment",
  "tech-debt",
  "research"
]
```

---

# Type Philosophy

## Feature
Product delivery work.

---

## Bug
Execution blockers and quality issues.

---

## Experiment
Validation-oriented work.

VERY important for venture studios.

---

## Tech Debt
Operational sustainability work.

---

## Research
Discovery and ambiguity reduction.

Strategically important because:
venture teams operate with uncertainty.

---

# Issue Statuses

## Supported Statuses

```ts
[
  "backlog",
  "planned",
  "in-progress",
  "in-review",
  "done",
  "killed"
]
```

---

# Status Philosophy

## Backlog
Unprioritized work.

---

## Planned
Approved upcoming work.

---

## In Progress
Active execution.

---

## In Review
Validation and review stage.

---

## Done
Successfully completed work.

---

## Killed
Intentionally stopped work.

This is strategically important.

The product should normalize:
> stopping low-value work quickly.

This aligns strongly with:
- venture experimentation
- lean execution
- fast iteration philosophy

---

# Issues Layout Structure

## Recommended Layout

```txt
Issues Header
  ├── Search
  ├── Filters
  ├── Venture Context
  ├── View Switcher
  └── Quick Create

Issues Content
  ├── List View
  └── Board View

Persistent Elements
  ├── Issue Drawer
  └── AI Context Panel
```

---

# Required Views

# 1. List View

## Purpose

The List View is:
> the operational scanning layer.

It should optimize for:
- speed
- visibility
- prioritization
- rapid coordination

---

# List View Requirements

Must support:
- filtering
- searching
- sorting
- compact rows
- inline metadata
- quick scanning

---

# Required Columns

Display:
- title
- priority
- status
- type
- owner
- due date
- tags
- venture
- roadmap linkage

---

# List UX Philosophy

The list should feel:
- dense but breathable
- operationally efficient
- premium
- calm

Inspired by:
- Linear
- Raycast
- modern operational tooling

---

# List Interaction Rules

Users should be able to:
- open issue drawer
- change status quickly
- filter instantly
- search rapidly
- navigate efficiently

---

# Hover Behavior

On hover:
- reveal contextual actions
- maintain clean visual hierarchy

Possible actions:
- open issue
- quick status update
- assign owner
- link roadmap

Avoid:
- action overload
- noisy controls

---

# 2. Board View

## Purpose

The Board View is:
> the execution flow visualization layer.

It should emphasize:
- momentum
- movement
- workflow visibility

---

# Board Columns

```ts
[
  "backlog",
  "planned",
  "in-progress",
  "in-review",
  "done",
  "killed"
]
```

---

# Board UX Philosophy

The board should feel:
- lightweight
- fluid
- operational
- responsive

NOT:
- enterprise Kanban software

---

# Card Requirements

Each issue card should show:
- title
- priority
- owner
- tags
- venture indicator
- roadmap indicator

Optional:
- risk indicator
- overdue state

---

# Drag & Drop Requirements

DnD is HIGH PRIORITY.

Must feel:
- stable
- responsive
- premium
- fluid

---

# DnD Behavior Rules

Dragging an issue should:
- animate smoothly
- preserve layout continuity
- feel low-friction

Dropping should:
- update status instantly
- trigger synchronized metrics updates
- update AI insights if relevant

---

# Important DnD Insight

DnD quality dramatically affects:
> sophistication perception.

This interaction must feel polished.

---

# 3. Issue Drawer

## Purpose

The drawer is:
> the contextual execution workspace.

Avoid:
- full-page issue navigation

Prefer:
- persistent operational context

---

# Drawer Requirements

Must display:
- full issue details
- metadata
- roadmap linkage
- AI analysis
- related context

---

# Drawer Sections

## Header

Display:
- issue title
- status
- priority
- type
- venture

---

## Description

Display:
- issue details
- acceptance criteria
- context notes

---

## Metadata

Display:
- owner
- due date
- tags
- roadmap link
- timestamps

---

## AI Insights

Display:
- risk analysis
- missing criteria
- delivery concerns
- recommendations

---

## Linked Roadmap

Display:
- roadmap title
- initiative progress
- roadmap confidence

---

# Drawer UX Philosophy

Drawer should feel:
- calm
- focused
- contextual
- uninterrupted

Avoid:
- modal heaviness
- navigation disruption
- context loss

---

# 4. Quick Create

## Purpose

Quick Create should optimize:
> speed of execution capture.

This is VERY important.

---

# Quick Create Requirements

Users should rapidly create:
- issues
- experiments
- bugs
- research tasks

With minimal friction.

---

# Suggested Inputs

```txt
Title
Priority
Type
Venture
```

Additional fields optional.

---

# UX Rules

Quick Create should feel:
- instant
- lightweight
- keyboard-friendly

Avoid:
- large forms
- mandatory complexity
- setup friction

---

# Search & Filtering

# Search Requirements

Must support:
- title search
- tag search
- owner search

Search should feel:
- immediate
- responsive
- lightweight

---

# Filter Requirements

Supported filters:
- venture
- priority
- status
- type
- owner
- overdue
- roadmap linked

---

# Filter UX Rules

Prefer:
- lightweight chips
- compact dropdowns
- instant application

Avoid:
- enterprise filter builders
- advanced query systems

---

# AI Integration

## Purpose

AI should feel:
> embedded operational intelligence.

NOT:
> chatbot interaction.

---

# AI Behaviors

Supported issue intelligence:
- summarize issue
- detect delivery risk
- identify missing acceptance criteria
- suggest priority
- suggest splitting work
- detect ambiguous scope

---

# Example AI Outputs

```txt
Risk Level: Medium

Reason:
The issue depends on unresolved research outcomes and lacks delivery estimates.

Suggested Action:
Split discovery work from implementation execution.

Confidence:
78%
```

---

# AI Tone

Use:
- concise language
- operational language
- strategic clarity

Avoid:
- conversational AI
- emojis
- excessive explanation

---

# Synchronization Rules

# Issue Changes Affect

- roadmap progress
- dashboard metrics
- AI insights
- venture health

---

# Status Changes Affect

## Done
Increases:
- roadmap progress
- momentum score

---

## Killed
Increases:
- killed initiative count
- experimentation insights

---

## Overdue
Increases:
- risk level
- delivery concern signals

---

# Roadmap Synchronization

Linked roadmap items should:
- reflect issue completion
- update progress percentages
- influence confidence scoring

---

# Venture Switching Behavior

Switching ventures should update:
- issue list
- board state
- filters
- AI insights
- roadmap linkage

Transitions should feel:
- instant
- stable
- uninterrupted

---

# Suggested Components

```txt
IssuesHeader
IssuesToolbar
IssueSearch
IssueFilters
IssueList
IssueRow
IssueBoard
IssueColumn
IssueCard
IssueDrawer
QuickCreateIssue
IssuePriorityBadge
IssueStatusBadge
IssueTypeBadge
IssueAiInsights
```

---

# Visual Design Rules

## Must Feel

- compact
- operational
- premium
- calm
- modern
- fast

---

## Must Avoid

- enterprise ticketing UX
- dense table interfaces
- noisy Kanban boards
- oversized cards
- cluttered metadata
- admin-panel feeling

---

# Motion Rules

Motion should feel:
- responsive
- subtle
- intentional

Use motion for:
- DnD transitions
- drawer open/close
- hover feedback
- filtering transitions

Avoid:
- flashy movement
- excessive animation
- playful interactions

---

# Empty States

Empty states should feel:
- operational
- calm
- intentional

Example:

```txt
No active issues match current filters.
```

NOT:

```txt
🎉 You're all caught up!
```

---

# Loading States

Use:
- skeleton rows
- subtle placeholders
- lightweight transitions

Loading should feel:
- stable
- premium
- fast

---

# Anti-Patterns

DO NOT:
- build enterprise workflow engines
- add custom workflow builders
- create nested subtask systems
- add complex permissions
- build comment systems
- add excessive metadata
- overload issue cards
- simulate Jira behavior
- create noisy productivity gamification

---

# Success Criteria

The Issues System succeeds when users feel:

> "This system helps venture teams execute quickly with clarity."

AND:

> "The workflows feel operationally alive."

NOT:

> "This is another enterprise ticketing system."

---

# Final Issues System North Star

The Issues experience should feel like:

> "A calm, high-velocity execution layer for modern venture teams."

Every implementation decision should reinforce:
- operational momentum
- venture awareness
- execution clarity
- interaction quality
- embedded intelligence
- premium UX restraint
