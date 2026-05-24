# Feature Specification — Dashboard

## Purpose

The Dashboard is the:
> strategic operational overview layer of Foundary.

It provides:
- venture visibility
- portfolio awareness
- execution clarity
- roadmap health
- operational risk visibility
- AI-native intelligence summaries

The dashboard should feel:
- calm
- executive-readable
- operationally intelligent
- focused
- lightweight

It should NOT feel:
- analytics-heavy
- enterprise-like
- cluttered
- overly data-dense

---

# Dashboard Philosophy

The Dashboard is NOT:
> a reporting center.

It IS:
> a venture operations control layer.

The goal is to help users quickly understand:
- what is moving
- what is blocked
- what needs attention
- which ventures are healthy
- where execution confidence is weak

The dashboard should support:
- fast operational scanning
- async coordination
- strategic awareness

---

# UX Goals

Users should immediately feel:
- clarity
- momentum
- confidence
- operational awareness

The dashboard should answer:

| Question | Purpose |
|---|---|
| What needs attention? | Risk awareness |
| Which ventures are healthy? | Portfolio visibility |
| What is actively shipping? | Execution momentum |
| What is blocked or delayed? | Operational intervention |
| Which roadmap items are risky? | Strategic confidence |
| Where should leadership focus? | Decision support |

---

# Experience Principles

## 1. Calm Information Density

Prefer:
- concise cards
- compact layouts
- breathable spacing
- focused hierarchy

Avoid:
- oversized widgets
- dense analytics grids
- dashboard clutter
- excessive charts

---

## 2. Strategic Readability

The dashboard should be:
- understandable within seconds
- visually scannable
- operationally coherent

The user should not need:
- deep exploration
- complex filtering
- analytical interpretation

---

## 3. Portfolio Awareness

The dashboard must reinforce:
> venture-awareness.

Everything should clearly communicate:
- which venture is affected
- venture health differences
- cross-venture operational conditions

---

## 4. Embedded Intelligence

AI insights should feel:
- contextual
- concise
- operationally useful

NOT:
- chatbot-like
- noisy
- gimmicky

---

# Dashboard Layout Structure

## Recommended Structure

```txt
Header
  ├── Venture Context
  ├── Date / Status Context
  └── Quick Actions

KPI Row
  ├── Total Issues
  ├── Overdue Issues
  ├── Active Roadmaps
  └── Killed Initiatives

Main Grid
  ├── Venture Health
  ├── Roadmap Overview
  ├── Issues by Status
  ├── Risk Panel
  └── AI Insights

Lower Section
  ├── Recent Operational Activity
  └── Delivery Attention Areas
```

---

# Required Dashboard Components

# 1. Dashboard Header

## Purpose

Provide:
- venture context
- operational framing
- quick orientation

---

## Required Content

Display:
- current venture
- portfolio mode indicator
- operational summary text

Example:

```txt
Portfolio operating normally.
2 ventures require attention.
```

---

## Optional Actions

Can include:
- quick create issue
- quick roadmap entry
- AI analyze portfolio

Keep actions minimal.

---

# 2. KPI Cards

## Purpose

Provide:
- rapid operational scanning
- high-level execution visibility

---

# Required KPI Cards

## Total Issues

Display:
- total count
- delta indicator (optional)

---

## Overdue Issues

Display:
- overdue count
- urgency state

Should visually stand out slightly.

---

## Active Roadmap Items

Display:
- active initiatives
- execution momentum

---

## Killed Initiatives

Display:
- intentionally stopped initiatives

This is strategically important because:
- venture studios validate quickly
- killing work is healthy behavior

---

# KPI Card UX Rules

Cards should feel:
- compact
- premium
- calm
- operational

Avoid:
- giant numbers
- flashy analytics
- enterprise BI styling

---

# 3. Venture Health Section

## Purpose

This is one of the CORE differentiators.

Surface:
- venture execution health
- operational momentum
- delivery confidence

---

# Required Venture Health Data

Each venture card should display:

| Data | Purpose |
|---|---|
| Venture Name | Context |
| Momentum Level | Execution energy |
| Risk Level | Delivery awareness |
| Active Work Count | Operational load |
| Roadmap Progress | Strategic progress |
| Confidence Indicator | Execution confidence |

---

# Momentum States

```ts
type Momentum =
  | "strong"
  | "stable"
  | "slowing"
  | "at-risk"
```

---

# Risk States

```ts
type RiskLevel =
  | "low"
  | "medium"
  | "high"
```

---

# Venture Health UX Rules

Cards should feel:
- strategic
- calm
- readable
- lightweight

Avoid:
- dashboard overload
- complex scoring systems
- excessive charts

---

# 4. Issues by Status

## Purpose

Help users understand:
- operational flow
- execution bottlenecks
- work distribution

---

# Required Statuses

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

# Recommended UI

Prefer:
- horizontal segmented visualization
- compact stacked bars
- lightweight charts

Avoid:
- enterprise reporting visuals
- oversized graph sections

---

# Important Insight

This section should communicate:
> workflow momentum.

NOT:
> reporting analytics.

---

# 5. Roadmap Overview

## Purpose

Provide:
- strategic visibility
- initiative awareness
- roadmap confidence

---

# Required Data

Each roadmap item preview should show:
- title
- venture
- progress
- confidence
- status
- linked issue count

---

# Important UX Rule

Roadmap overview should feel:
- calmer
- more strategic
- less operational

Compared to:
- Issues System

---

# Required Status Indicators

```ts
type RoadmapStatus =
  | "planned"
  | "active"
  | "at-risk"
  | "completed"
  | "killed"
```

---

# Confidence Indicators

Display:
- confidence percentage
- confidence trend

Example:

```txt
Confidence: 72%
Trend: Declining
```

---

# 6. Portfolio Risk Panel

## Purpose

Surface:
- operational concerns
- delivery blockers
- execution uncertainty

This is a HIGH-VALUE dashboard area.

---

# Required Risk Signals

Examples:
- overdue high-priority issues
- roadmap confidence drops
- blocked execution
- overloaded ventures
- ambiguous initiatives

---

# Risk Item Structure

Each risk item should contain:
- title
- affected venture
- severity
- concise explanation
- suggested action

---

# Severity Levels

```ts
type Severity =
  | "low"
  | "medium"
  | "high"
```

---

# UX Rules

Risk panel should feel:
- focused
- concise
- operationally useful

Avoid:
- alarm fatigue
- excessive warnings
- noisy alerts

---

# 7. AI Operational Insights

## Purpose

Create:
> embedded intelligence visibility.

The AI layer should feel:
- ambient
- contextual
- strategic

---

# Example Insights

```txt
Sentra delivery confidence dropped 12% this week due to unresolved research dependencies.
```

```txt
Reson8 roadmap momentum improved after reducing in-progress issue count.
```

```txt
Internal Ops has accumulated high-priority technical debt with no linked roadmap initiative.
```

---

# AI Insight Rules

Insights should:
- remain concise
- feel believable
- avoid excessive verbosity
- avoid chatbot language

---

# AI Tone

Use:
- operational tone
- strategic tone
- calm confidence

Avoid:
- excitement
- emojis
- playful AI copy

---

# 8. Delivery Attention Section

## Purpose

Highlight:
- areas requiring intervention
- initiatives needing decisions
- execution friction

---

# Examples

```txt
3 roadmap items have declining confidence.
```

```txt
Sentra has 5 overdue issues linked to active initiatives.
```

```txt
Research bottlenecks detected in Reson8 onboarding initiative.
```

---

# Interaction Rules

# Dashboard Navigation Behavior

Users should be able to:
- open roadmap items
- open issue drawers
- navigate to filtered issue views
- switch ventures instantly

---

# Interaction Philosophy

Prefer:
- lightweight navigation
- contextual transitions
- drawers over page jumps

Avoid:
- excessive routing
- modal stacking
- heavy interactions

---

# Animation & Motion Rules

Motion should feel:
- restrained
- smooth
- premium
- subtle

Use motion for:
- card hover
- loading states
- dashboard refresh transitions
- venture switching

Avoid:
- flashy movement
- animated charts everywhere
- excessive motion noise

---

# Loading States

Use:
- skeleton loaders
- shimmer placeholders
- subtle opacity transitions

Loading should feel:
- fast
- stable
- premium

---

# Empty States

Empty states should feel:
- operational
- intentional
- calm

Example:

```txt
No active delivery risks detected.
```

NOT:

```txt
🎉 Everything looks amazing!
```

---

# Data Relationships

Dashboard data should synchronize with:
- issues
- roadmap items
- venture state
- AI insights

---

# Synchronization Rules

## Issue Changes Affect

- KPI counts
- overdue metrics
- risk detection
- venture health
- roadmap progress

---

## Roadmap Changes Affect

- confidence visibility
- health scoring
- strategic summaries
- risk analysis

---

## Venture Switching Affects

- all dashboard metrics
- roadmap summaries
- AI insights
- operational visibility

---

# Dashboard Data Model

## Suggested Dashboard State

```ts
type DashboardState = {
  totalIssues: number
  overdueIssues: number
  activeRoadmaps: number
  killedInitiatives: number

  ventureHealth: VentureHealth[]
  roadmapOverview: RoadmapSummary[]
  risks: RiskItem[]
  aiInsights: AIInsight[]
}
```

---

# Component Recommendations

## Suggested Components

```txt
DashboardHeader
KpiCard
VentureHealthCard
RoadmapOverviewCard
IssuesStatusCard
RiskPanel
AiInsightCard
AttentionSection
```

---

# Design Constraints

## Must Feel

- premium
- calm
- focused
- operational
- strategically intelligent

---

## Must Avoid

- enterprise BI dashboards
- excessive charts
- analytics overload
- visual clutter
- noisy widgets
- admin-panel energy

---

# Anti-Patterns

DO NOT:
- add complex dashboard customization
- add chart-heavy reporting
- build enterprise analytics
- overload with metrics
- create dense tables
- simulate investor reporting systems
- create noisy alert systems

---

# Success Criteria

The dashboard succeeds when users feel:

> "I immediately understand the operational state of the portfolio."

AND:

> "This system helps venture teams move with clarity."

NOT:

> "This is another analytics dashboard."

---

# Final Dashboard North Star

The Dashboard should feel like:

> "A calm operational command layer for high-velocity venture teams."

Every implementation decision should reinforce:
- operational clarity
- venture awareness
- strategic visibility
- embedded intelligence
- calm execution UX
- premium product quality