# Feature Specification — Roadmap System

## Purpose

The Roadmap System is:
> the strategic execution layer of Foundary.

This is where venture teams:
- coordinate direction
- align initiatives
- manage uncertainty
- evaluate progress
- connect execution to outcomes

The Roadmap experience should feel:
- calm
- strategic
- focused
- outcome-oriented
- confidence-aware
- operationally intelligent
- continuous across refreshes

Unlike the Issues System, the Roadmap should feel:
- less tactical
- less noisy
- more directional
- more reflective of venture momentum

---

# Roadmap Philosophy

The Roadmap is NOT:
> delivery micromanagement.

It IS:
> strategic venture coordination.

The roadmap should help teams answer:
- what are we trying to achieve?
- which initiatives matter most?
- where are we uncertain?
- what is progressing?
- what should be stopped?
- where is execution confidence weak?

---

# Core Product Insight

Traditional roadmaps optimize for:
- delivery tracking
- feature timelines
- output visibility

Foundary's roadmap optimizes for:
- venture outcomes
- execution confidence
- strategic momentum
- validation progress
- uncertainty management

This is a CORE differentiator.

---

# UX Goals

Users should feel:
- strategic clarity
- operational confidence
- directional alignment
- reduced ambiguity

The Roadmap should answer:

| Question | Purpose |
|---|---|
| What are we trying to achieve? | Strategic alignment |
| Which initiatives matter most? | Prioritization |
| What changed since I last opened the workspace? | Local continuity |
| Which roadmap items are risky? | Confidence visibility |
| What is progressing well? | Momentum awareness |
| What should be reconsidered? | Venture discipline |
| How does execution connect to outcomes? | Strategic coherence |

---

# Local-First Continuity

Roadmap state should persist locally across refreshes.

Persist:
- roadmap items
- quick-created initiatives
- timeframe/status/progress/confidence edits
- linked issue relationships
- roadmap filters

Reset demo data should restore seeded roadmap items and default roadmap filters.
Importing invalid workspace state must not overwrite current roadmap state.

---

# Experience Principles

## 1. Outcomes Over Output

Roadmaps should emphasize:
- goals
- validation
- confidence
- strategic movement

NOT:
- task volume
- delivery reporting
- feature counting

---

## 2. Calm Strategic Visibility

The Roadmap should feel:
- quieter than Issues
- more reflective
- more directional
- less operationally noisy

Spacing and hierarchy should support:
- thinking
- scanning
- prioritization

---

## 3. Confidence Awareness

Every roadmap item should communicate:
- execution confidence
- uncertainty level
- strategic risk

This is strategically important for:
- venture studios
- early-stage products
- high-ambiguity environments

---

## 4. Venture Awareness

Everything should reinforce:
> venture context.

Every roadmap item should clearly communicate:
- venture ownership
- execution state
- strategic significance
- linked delivery work

---

# Core Roadmap Data Model

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

  confidenceTrend?:
    | "improving"
    | "stable"
    | "declining"

  owner?: string

  targetOutcome?: string

  aiRecommendation?: string

  createdAt: string
  updatedAt: string
}
```

---

# Timeframe Structure

## Required Timeframes

```ts
[
  "now",
  "next",
  "later"
]
```

---

# Timeframe Philosophy

## Now
Active strategic focus.

Work currently being executed.

---

## Next
Upcoming strategic initiatives.

Validated but not yet active.

---

## Later
Longer-term opportunities.

Less certain and lower commitment.

---

# Important UX Insight

Timeframes should feel:
- directional
- strategic
- lightweight

Avoid:
- timeline-heavy roadmap software
- Gantt-chart complexity
- rigid planning systems

---

# Roadmap Statuses

## Supported Statuses

```ts
[
  "planned",
  "active",
  "at-risk",
  "completed",
  "killed"
]
```

---

# Status Philosophy

## Planned
Approved strategic direction.

---

## Active
Currently being executed.

---

## At Risk
Execution confidence is declining.

VERY important strategic signal.

---

## Completed
Successfully achieved outcome.

---

## Killed
Strategically stopped initiative.

This is HIGHLY important.

The product should normalize:
> disciplined stopping behavior.

Because venture studios must:
- validate quickly
- reduce wasted execution
- pivot aggressively

---

# Roadmap Layout Structure

## Recommended Layout

```txt
Roadmap Header
  ├── Venture Context
  ├── Filters
  ├── Confidence Overview
  ├── AI Strategic Insights
  └── Quick Create

Roadmap Board
  ├── Now Column
  ├── Next Column
  └── Later Column

Persistent Elements
  ├── Roadmap Drawer
  └── Linked Issue Context
```

---

# Core Roadmap Views

# Main Roadmap Board

## Purpose

The Roadmap Board is:
> the strategic direction visualization layer.

It should provide:
- initiative visibility
- confidence awareness
- progress visibility
- execution context

---

# Board Structure

Columns:
- Now
- Next
- Later

Each column should feel:
- lightweight
- readable
- calm
- strategically organized

---

# Column UX Rules

Columns should:
- support vertical scanning
- maintain visual breathing room
- avoid dense stacking

The roadmap should feel:
- calmer than Issues
- more strategic
- more reflective

---

# Roadmap Cards

## Purpose

Roadmap cards represent:
> strategic venture initiatives.

NOT:
> delivery tasks.

---

# Required Card Content

Each roadmap card should display:
- title
- venture indicator
- goal summary
- progress
- confidence
- linked issue count
- status

Optional:
- owner
- AI recommendation snippet
- risk indicator

---

# Card UX Philosophy

Cards should feel:
- compact
- strategic
- premium
- calm

Avoid:
- large feature cards
- excessive metadata
- operational overload

---

# Progress Visibility

## Purpose

Progress should communicate:
- execution movement
- initiative advancement

NOT:
- precise delivery forecasting

---

# Progress Rules

Use:
- lightweight progress bars
- completion percentages
- subtle indicators

Avoid:
- detailed burndown logic
- enterprise forecasting visuals

---

# Confidence System

## Purpose

This is a CORE differentiator.

Confidence reflects:
- delivery certainty
- validation strength
- execution health
- strategic confidence

---

# Confidence Scale

```ts
0 → 100
```

---

# Confidence Interpretation

| Range | Meaning |
|---|---|
| 80–100 | Strong confidence |
| 60–79 | Moderate confidence |
| 40–59 | Uncertain |
| 0–39 | High risk |

---

# Confidence Trend States

```ts
[
  "improving",
  "stable",
  "declining"
]
```

---

# Confidence UX Rules

Confidence should feel:
- lightweight
- informative
- strategic

Avoid:
- analytics overload
- predictive AI theatrics
- fake precision

---

# Linked Issues System

## Purpose

Roadmap items should connect:
> strategy → execution.

This relationship is VERY important.

---

# Required Linked Issue Data

Display:
- linked issue count
- completion state
- execution health
- blocked work indicators

---

# Linked Issue Interactions

Users should be able to:
- open related issues
- filter issues by roadmap item
- understand execution dependencies

---

# Roadmap Drawer

## Purpose

The drawer is:
> the strategic initiative workspace.

It should preserve:
- operational context
- spatial continuity
- strategic visibility

Avoid:
- full-page navigation disruption

---

# Drawer Requirements

Must display:
- roadmap title
- goal
- progress
- confidence
- linked issues
- AI analysis
- strategic notes

---

# Drawer Sections

## Header

Display:
- title
- status
- venture
- confidence
- progress

---

## Strategic Goal

Display:
- initiative purpose
- target outcome
- validation objective

---

## Execution Overview

Display:
- linked issues
- issue progress
- blocked work
- overdue work

---

## AI Strategic Insights

Display:
- delivery concerns
- confidence risks
- recommendation signals
- execution observations

---

## Related Operational Context

Display:
- affected ventures
- dependencies
- execution health indicators

---

# Drawer UX Philosophy

Drawer should feel:
- strategic
- calm
- uninterrupted
- contextual

Avoid:
- dense operational overload
- modal heaviness
- excessive editing complexity

---

# AI Integration

## Purpose

AI should help users:
- understand uncertainty
- detect risk
- evaluate execution viability
- improve roadmap clarity

AI should feel:
> strategically useful.

NOT:
> conversational.

---

# Supported AI Behaviors

AI can:
- detect declining confidence
- identify blocked initiatives
- recommend splitting initiatives
- suggest killing low-confidence work
- identify missing validation criteria
- surface roadmap execution risks

---

# Example AI Outputs

```txt
Confidence Risk: High

Reason:
This initiative depends on unresolved research work and has accumulated overdue implementation tasks.

Suggested Action:
Reduce scope and validate assumptions before continuing execution.

Confidence:
81%
```

---

# AI Tone

Use:
- concise language
- operational reasoning
- strategic framing

Avoid:
- motivational language
- conversational AI
- verbose analysis

---

# Strategic Recommendations

## Continue

Used when:
- momentum is healthy
- confidence is stable
- execution is progressing

---

## Split

Used when:
- initiative scope is too broad
- discovery and delivery are mixed
- uncertainty is high

---

## Kill

Used when:
- confidence collapses
- validation weakens
- strategic value decreases

This is strategically important.

The system should normalize:
> disciplined prioritization.

---

# Synchronization Rules

# Issue Changes Affect

- roadmap progress
- confidence scoring
- delivery health
- risk signals

---

# Overdue Issues Affect

- confidence decline
- risk escalation
- strategic warnings

---

# Done Issues Affect

- roadmap progress
- momentum indicators
- completion state

---

# Killed Issues Affect

- roadmap viability
- initiative health
- AI recommendations

---

# Dashboard Synchronization

Roadmap state should update:
- venture health
- portfolio visibility
- risk panels
- AI insights

---

# Venture Switching Behavior

Switching ventures should update:
- roadmap columns
- confidence summaries
- AI insights
- linked execution context

Transitions should feel:
- instant
- stable
- uninterrupted

---

# Suggested Components

```txt
RoadmapHeader
RoadmapBoard
RoadmapColumn
RoadmapCard
RoadmapDrawer
RoadmapProgress
RoadmapConfidence
RoadmapInsights
RoadmapLinkedIssues
RoadmapStatusBadge
RoadmapTimeframeHeader
```

---

# Visual Design Rules

## Must Feel

- strategic
- calm
- premium
- focused
- intelligent
- modern

---

## Must Avoid

- enterprise planning software
- timeline overload
- Gantt-chart feeling
- roadmap clutter
- analytics density
- noisy prioritization systems

---

# Motion Rules

Motion should feel:
- restrained
- smooth
- premium

Use motion for:
- card transitions
- drawer transitions
- hover interactions
- filtering updates

Avoid:
- flashy animation
- excessive transitions
- dramatic movement

---

# Empty States

Empty states should feel:
- intentional
- strategic
- calm

Example:

```txt
No active roadmap initiatives in this timeframe.
```

NOT:

```txt
🚀 Time to plan your next big idea!
```

---

# Loading States

Use:
- skeleton cards
- subtle placeholders
- lightweight shimmer effects

Loading should feel:
- stable
- premium
- fast

---

# Anti-Patterns

DO NOT:
- build Gantt charts
- simulate enterprise planning software
- add dependency management systems
- add roadmap bureaucracy
- overload cards with metrics
- create timeline complexity
- implement predictive AI theatrics
- build Jira-style epic management
- add portfolio financial forecasting

---

# Success Criteria

The Roadmap System succeeds when users feel:

> "I understand where the ventures are heading and how confident we are in execution."

AND:

> "This roadmap helps teams think strategically, not just track work."

NOT:

> "This is another roadmap planning tool."

---

# Final Roadmap North Star

The Roadmap experience should feel like:

> "A calm strategic coordination layer for high-velocity venture teams."

Every implementation decision should reinforce:
- strategic clarity
- execution confidence
- venture awareness
- operational alignment
- outcome orientation
- premium UX restraint
