# Domain Models — Foundary

## Purpose

This document defines:
- core domain entities
- data relationships
- operational state models
- derived intelligence models
- synchronization logic
- mock data architecture

These domain models are intentionally optimized for:
- frontend-first architecture
- mocked operational realism
- AI-native workflows
- venture-aware execution
- believable product sophistication

The system should model:
> venture operations, not generic task management.

---

# Domain Modeling Philosophy

The data architecture should prioritize:

- clarity
- interoperability
- venture-awareness
- AI contextualization
- frontend simplicity
- believable operational behavior

Avoid:
- enterprise-level normalization
- backend-driven complexity
- unnecessary relational depth
- infrastructure-oriented schemas

---

# Core Domain Relationships

```txt
Workspace
  └── Ventures
        ├── Issues
        ├── Roadmap Items
        ├── AI Insights
        ├── Health Signals
        └── Metrics
```

---

# Domain Entity Overview

| Entity | Purpose |
|---|---|
| Venture | Top-level operational context |
| Issue | Execution workflow item |
| RoadmapItem | Strategic initiative |
| AIInsight | Embedded operational intelligence |
| VentureHealth | Venture operational status |
| DashboardMetric | Aggregated visibility layer |
| User | Lightweight ownership representation |
| Tag | Issue categorization |
| ActivityEvent | Derived operational events |

---

# 1. Venture Model

## Purpose

Represents:
> an independent startup or operational initiative inside the venture studio ecosystem.

Every major system object should be venture-aware.

---

## Venture Type

```ts
type Venture = {
  id: string

  name: string
  slug: string

  description: string

  stage:
    | "idea"
    | "validation"
    | "mvp"
    | "growth"

  health:
    | "strong"
    | "stable"
    | "at-risk"
    | "critical"

  momentum:
    | "high"
    | "moderate"
    | "slow"

  color: string
  icon: string

  activeRoadmapCount: number
  activeIssueCount: number
  overdueIssueCount: number

  progress: number
  confidence: number

  createdAt: string
  updatedAt: string
}
```

---

# Venture Design Notes

## Important Principles

Ventures should feel:
- operationally alive
- strategically distinct
- contextually meaningful

Each venture should have:
- unique operational characteristics
- different roadmap maturity
- different issue patterns
- different AI observations

---

# Recommended Initial Ventures

```ts
[
  {
    name: "Sentra",
    stage: "growth"
  },
  {
    name: "Reson8",
    stage: "validation"
  },
  {
    name: "Internal Ops",
    stage: "mvp"
  }
]
```

---

# 2. User Model

## Purpose

Represents lightweight ownership and execution accountability.

This is NOT a full authentication system.

---

## User Type

```ts
type User = {
  id: string

  name: string
  role: string

  avatar: string

  activeVentureIds: string[]

  createdAt: string
}
```

---

# Recommended Mock Users

```ts
[
  {
    name: "Sarah Chen",
    role: "Venture Product Lead"
  },
  {
    name: "Omar Khaled",
    role: "AI Engineer"
  },
  {
    name: "Maya Rodriguez",
    role: "Studio Operator"
  },
  {
    name: "Lina Haddad",
    role: "Product Designer"
  }
]
```

---

# 3. Issue Model

## Purpose

Represents:
> operational execution work.

Issues are the core execution layer of the product.

---

# Issue Type

```ts
type Issue = {
  id: string

  ventureId: string
  roadmapId?: string

  title: string
  description: string

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

  ownerId: string

  dueDate?: string

  tags: string[]

  riskLevel:
    | "low"
    | "medium"
    | "high"

  confidence: number

  effort:
    | "small"
    | "medium"
    | "large"

  blocked: boolean

  acceptanceCriteria?: string[]

  aiInsightIds: string[]

  createdAt: string
  updatedAt: string
}
```

---

# Issue Modeling Philosophy

Issues should support:
- operational realism
- believable AI analysis
- roadmap synchronization
- risk visibility

Avoid:
- excessive enterprise workflow states
- deeply nested issue hierarchies
- story-point complexity

---

# Important Derived Behaviors

## High Risk Issues

Issues become high risk when:
- overdue
- no acceptance criteria
- linked to critical roadmap items
- blocked
- urgent + low confidence

---

## Confidence Calculation

Confidence should derive from:
- completion progress
- blocked state
- issue age
- roadmap linkage
- overdue state

This allows:
> believable AI recommendations.

---

# 4. Roadmap Item Model

## Purpose

Represents:
> strategic venture initiatives.

Roadmap items are outcome-oriented, not ticket-oriented.

---

# Roadmap Item Type

```ts
type RoadmapItem = {
  id: string

  ventureId: string

  title: string
  description: string

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

  ownerId: string

  linkedIssueIds: string[]

  progress: number
  confidence: number

  impact:
    | "low"
    | "medium"
    | "high"

  riskLevel:
    | "low"
    | "medium"
    | "high"

  targetMetric?: string

  aiInsightIds: string[]

  createdAt: string
  updatedAt: string
}
```

---

# Roadmap Philosophy

Roadmap items should emphasize:
- strategic direction
- validation
- confidence
- outcomes
- momentum

NOT:
- detailed sprint planning
- engineering estimation
- delivery bureaucracy

---

# Important Derived Behaviors

## Progress Computation

Roadmap progress should derive from:
- linked issue completion
- issue statuses
- blocked issue count

---

## Confidence Computation

Confidence should decrease when:
- too many blocked issues
- roadmap overdue
- high-risk issues exist
- acceptance criteria missing
- initiative is stagnant

---

# 5. AI Insight Model

## Purpose

Represents:
> embedded operational intelligence.

AI insights should feel:
- contextual
- concise
- believable
- operationally useful

---

# AI Insight Type

```ts
type AIInsight = {
  id: string

  ventureId: string

  entityType:
    | "issue"
    | "roadmap"
    | "venture"
    | "portfolio"

  entityId: string

  type:
    | "risk"
    | "priority"
    | "recommendation"
    | "warning"
    | "summary"

  title: string

  message: string

  confidence: number

  severity:
    | "low"
    | "medium"
    | "high"

  suggestedAction?: string

  createdAt: string
}
```

---

# AI Insight Philosophy

AI should NOT:
- behave conversationally
- simulate generic chat
- generate noisy text

AI SHOULD:
- surface operational signals
- identify delivery concerns
- reinforce strategic awareness

---

# Example AI Insights

## Risk Detection

```txt
Risk Level: High

Reason:
The roadmap initiative contains multiple blocked issues and lacks measurable validation criteria.

Suggested Action:
Split validation work from implementation delivery.

Confidence:
84%
```

---

## Priority Suggestion

```txt
Recommendation:
Elevate priority to High.

Reason:
This issue directly impacts a growth-stage roadmap initiative with declining confidence.
```

---

# 6. Venture Health Model

## Purpose

Represents:
> operational health visibility at venture level.

Used heavily in:
- dashboard
- AI assistant
- portfolio overview

---

# Venture Health Type

```ts
type VentureHealth = {
  ventureId: string

  health:
    | "strong"
    | "stable"
    | "at-risk"
    | "critical"

  momentum:
    | "high"
    | "moderate"
    | "slow"

  roadmapConfidence: number

  overdueIssues: number
  blockedIssues: number

  completedThisWeek: number

  activeInitiatives: number

  riskScore: number

  updatedAt: string
}
```

---

# Venture Health Philosophy

Health should communicate:
- operational clarity
- execution momentum
- portfolio confidence

NOT:
- vanity analytics

---

# 7. Dashboard Metrics Model

## Purpose

Aggregated operational visibility layer.

---

# Dashboard Metric Type

```ts
type DashboardMetrics = {
  totalIssues: number

  overdueIssues: number
  blockedIssues: number

  activeRoadmapItems: number
  killedRoadmapItems: number

  completedIssues: number

  roadmapConfidenceAverage: number

  ventureDistribution: {
    ventureId: string
    issueCount: number
  }[]

  updatedAt: string
}
```

---

# Dashboard Modeling Philosophy

Dashboard metrics should feel:
- strategically useful
- executive-readable
- lightweight
- calm

Avoid:
- analytics overload
- enterprise BI behavior

---

# 8. Activity Event Model

## Purpose

Represents derived operational activity.

Used for:
- timeline signals
- operational awareness
- recent activity UI

---

# Activity Event Type

```ts
type ActivityEvent = {
  id: string

  ventureId: string

  actorId: string

  entityType:
    | "issue"
    | "roadmap"

  entityId: string

  action:
    | "created"
    | "updated"
    | "moved"
    | "completed"
    | "killed"
    | "blocked"

  message: string

  createdAt: string
}
```

---

# Activity Philosophy

Activity should:
- reinforce operational realism
- make ventures feel alive
- support async awareness

Avoid:
- noisy social feed behavior

---

# 9. Tag Model

## Purpose

Lightweight issue categorization.

---

# Tag Type

```ts
type Tag = {
  id: string

  label: string
  color: string
}
```

---

# Recommended Tags

```ts
[
  "AI",
  "Growth",
  "Infrastructure",
  "Onboarding",
  "Retention",
  "Mobile",
  "Analytics",
  "Research",
  "Performance"
]
```

---

# Domain Relationships

## Venture Relationships

```txt
Venture
 ├── Issues
 ├── RoadmapItems
 ├── AIInsights
 ├── VentureHealth
 └── DashboardMetrics
```

---

## Issue Relationships

```txt
Issue
 ├── belongs to Venture
 ├── optionally linked to RoadmapItem
 ├── assigned to User
 ├── linked to AIInsights
 └── generates ActivityEvents
```

---

## Roadmap Relationships

```txt
RoadmapItem
 ├── belongs to Venture
 ├── contains Issues
 ├── linked to AIInsights
 └── affects DashboardMetrics
```

---

# Synchronization Rules

## Venture Switching

Switching venture should update:
- issues
- roadmap
- metrics
- AI insights
- health indicators

Immediately and globally.

---

## Issue Synchronization

Issue updates should affect:
- roadmap progress
- dashboard counts
- venture health
- AI recommendations

---

## Roadmap Synchronization

Roadmap updates should affect:
- venture confidence
- dashboard health
- AI insights

---

# Mock Data Strategy

## Important Principle

Mock data quality heavily affects:
> perceived product sophistication.

The data should feel:
- realistic
- interconnected
- strategically coherent
- operationally believable

---

# Mock Data Requirements

## Issues

Create:
- active delivery work
- blocked work
- overdue work
- completed wins
- killed experiments

---

## Roadmaps

Create:
- strong initiatives
- uncertain initiatives
- high-risk initiatives
- recently completed initiatives

---

## AI Insights

Create:
- believable risk observations
- nuanced recommendations
- contextual warnings

Avoid:
- repetitive AI phrasing
- generic AI outputs

---

# Derived Intelligence Rules

## AI Risk Detection Rules

Increase risk when:
- blocked = true
- overdue = true
- no acceptance criteria
- urgent + low confidence
- roadmap confidence declining

---

## Roadmap Confidence Rules

Reduce confidence when:
- linked issues blocked
- overdue work increases
- roadmap stagnates
- too many urgent issues

---

## Venture Momentum Rules

Momentum increases when:
- roadmap progress improves
- issue completion velocity rises
- blocked work decreases

Momentum decreases when:
- overdue work rises
- roadmap confidence drops
- many issues become stalled

---

# Zustand Store Architecture

## Recommended Store Separation

```txt
/use-venture-store
/use-issues-store
/use-roadmap-store
/use-dashboard-store
/use-ai-store
/use-ui-store
```

---

# Store Philosophy

Stores should remain:
- lightweight
- composable
- frontend-oriented
- predictable

Avoid:
- excessive abstraction
- enterprise state patterns
- premature optimization

---

# Final Modeling Principles

Every domain model should reinforce:
- venture-awareness
- operational clarity
- strategic execution
- AI-native behavior
- believable sophistication

The system should feel like:
> a living venture operating environment.

NOT:
> a collection of disconnected CRUD entities.