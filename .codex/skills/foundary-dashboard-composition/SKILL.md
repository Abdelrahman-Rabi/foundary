---
name: foundary-dashboard-composition
description: Apply Foundary's calm operational dashboard composition standards when implementing or refining dashboard layouts, KPI sections, venture health panels, operational overview screens, portfolio visibility areas, executive summary surfaces, risk panels, AI insight panels, roadmap overviews, issue status sections, charts, loading states, empty states, and dashboard interactions. Use for Foundary frontend dashboard implementation, review, or polish tasks.
---

# Foundary Dashboard Composition

## Purpose

Use this skill when implementing dashboard layouts, KPI sections, venture health panels, operational overview screens, portfolio visibility areas, and executive summary surfaces.

The goal is calm operational visibility, not analytics-heavy reporting.

## Dashboard Philosophy

Foundary dashboards should feel strategic, calm, executive-readable, and operationally intelligent.

Use inspiration from Linear, Vercel, and modern operational software.

The dashboard exists to help users quickly understand what is moving, what is blocked, where risk exists, and which ventures need attention.

Avoid BI dashboard energy, enterprise reporting UI, analytics overload, and chart-heavy layouts.

## Core Principles

Prefer clarity over density. Dashboards should communicate quickly, reduce scanning effort, and prioritize operational meaning.

Avoid giant widget grids, excessive metrics, visual clutter, and too many sections competing for attention.

Prefer strategic visibility over analytics. Foundary is an operational coordination system, not a reporting platform.

Dashboards should emphasize momentum, confidence, execution health, venture state, and delivery risk.

Avoid granular analytics, enterprise KPIs, and data warehouse aesthetics.

Use calm information hierarchy. The dashboard should feel breathable, intentional, and visually stable.

Prefer compact sections, controlled spacing, restrained typography, and lightweight cards.

Avoid oversized dashboards, giant metric numbers, and loud chart visuals.

Reinforce venture context awareness. Dashboard surfaces should clearly communicate affected venture, operational health, roadmap impact, and execution momentum.

## Recommended Structure

Use this dashboard structure as the default:

```txt
Dashboard Header
  ├── Venture Context
  ├── Operational Summary
  └── Primary Action

KPI Row
  ├── Total Issues
  ├── Overdue Work
  ├── Active Initiatives
  └── Killed Initiatives

Primary Grid
  ├── Venture Health
  ├── Roadmap Overview
  ├── Issues by Status
  └── Risk Panel

Secondary Grid
  ├── AI Operational Insights
  ├── Delivery Attention Areas
  └── Activity Context
```

Avoid giant dashboard sprawl, endless widget stacking, and overloaded sections.

## Width

Use centered max-width layouts and stable horizontal rhythm.

Suggested max width:

```txt
max-w-[1600px]
```

Use consistent gutters and controlled section spacing.

Avoid full-width uncontrolled dashboards and stretched analytics layouts.

## Header

Headers should orient users quickly, remain compact, and provide operational framing.

Recommended structure:

```tsx
<header className="flex items-start justify-between gap-6">
  <div>
    <h1 className="text-2xl font-semibold">
      Dashboard
    </h1>

    <p className="mt-1 text-sm text-muted-foreground">
      Portfolio operating normally. 2 ventures require attention.
    </p>
  </div>

  <DashboardActions />
</header>
```

Avoid marketing hero sections, giant dashboard headers, and excessive action buttons.

## KPI Row

KPI cards should support rapid scanning, remain compact, and avoid analytics-dashboard feeling.

Recommended metrics include total issues, overdue issues, active initiatives, blocked work, and killed initiatives.

Use a 4-column responsive KPI row:

```txt
Desktop: grid-cols-4
Tablet:  grid-cols-2
```

Avoid overly complex responsive behavior and oversized KPI cards.

## KPI Cards

KPI cards should feel operational, lightweight, and premium.

Recommended structure:

```tsx
<Card>
  <CardContent className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-muted-foreground">
          Overdue Issues
        </p>

        <p className="mt-2 text-2xl font-semibold">
          12
        </p>
      </div>

      <KpiTrend />
    </div>
  </CardContent>
</Card>
```

Avoid giant metric typography, colorful analytics visuals, and decorative chart clutter.

## Dashboard Grid

Use asymmetric operational layouts and intentional section hierarchy.

Recommended layouts:

```txt
Primary Grid:
  2fr / 1fr

or

  8-column + 4-column
```

Use asymmetry to create visual rhythm, operational focus, and strategic hierarchy.

Avoid perfectly equal widget grids and dashboard symmetry everywhere.

## Venture Health

Treat venture health as a core dashboard area. It should feel strategic, readable, and calm.

Each venture card should display venture name, momentum, confidence, roadmap progress, and risk level.

Recommended structure:

```tsx
<VentureHealthCard>
  <VentureHeader />
  <MomentumIndicator />
  <ConfidenceIndicator />
  <RiskSummary />
  <RoadmapProgress />
</VentureHealthCard>
```

Cards should feel concise, strategic, and operationally useful.

Avoid giant health dashboards, excessive charting, and enterprise scoring systems.

## Risk Panels

Risk panels should surface operational concerns, remain concise, and avoid alert fatigue.

Use compact issue summaries, risk severity, affected venture, and suggested action.

Avoid giant warning systems, enterprise alert dashboards, and excessive red UI.

## AI Insight Panels

AI insights should feel ambient, embedded, and operational.

Use concise summaries, confidence observations, execution concerns, and recommendation snippets.

Avoid giant AI summaries, chatbot experiences, and conversational interfaces.

## Roadmap Overview

Roadmap overview should feel calmer than Issues, emphasize confidence and progress, and surface strategic movement.

Display active initiatives, confidence, progress, and linked execution state.

Avoid timeline complexity, roadmap overload, and excessive metadata.

## Issues Status

Issues status should communicate workflow momentum, not reporting analytics.

Use lightweight segmented bars, compact status distributions, and subtle charts only when useful.

Avoid giant pie charts, enterprise analytics graphs, and dashboard chart overload.

## Charts

Charts are optional. If used, keep them minimal, muted, and low-noise.

Prefer stacked bars, lightweight trend indicators, and progress visuals.

Avoid giant analytics dashboards, chart-heavy layouts, and decorative data visualizations.

## Spacing

Dashboard spacing should feel compact, breathable, and intentional.

Recommended:

```txt
Section gap:       gap-5
Card gap:          gap-4
Grid spacing:      gap-5
```

Avoid huge vertical spacing, cramped widgets, and inconsistent rhythm.

## Typography

Use restrained hierarchy.

Recommended:

```txt
Dashboard title:       text-2xl font-semibold
Section title:         text-sm font-medium
Card title:            text-sm font-medium
Metric value:          text-2xl font-semibold
Metadata:              text-xs text-muted-foreground
```

Avoid giant enterprise metrics, oversized typography, and marketing-style headings.

## Motion

Dashboard motion should feel calm, stable, and subtle.

Use fade transitions, lightweight refresh updates, and restrained hover interactions.

Avoid animated dashboards, constantly moving widgets, and flashy chart transitions.

## Loading

Loading should feel stable, premium, and low-noise.

Use skeleton cards, skeleton KPI rows, and placeholder panels.

Avoid giant loading screens, spinner-heavy UI, and dramatic shimmer effects.

## Empty States

Empty states should feel operational, intentional, and calm.

Good examples:

```txt
No active delivery risks detected.
No roadmap confidence concerns identified.
```

Avoid celebratory, playful, or emoji-driven empty states.

## Interactions

Users should be able to open issue drawers, open roadmap drawers, navigate to filtered views, and switch ventures instantly.

Prefer contextual transitions and drawer-based workflows.

Avoid page-heavy navigation, modal stacking, and workflow interruption.

## Component Recommendations

Suggested components:

```txt
DashboardHeader
KpiRow
KpiCard
VentureHealthCard
RoadmapOverviewPanel
IssuesStatusPanel
RiskPanel
AiInsightsPanel
AttentionPanel
OperationalSummary
```

## Consistency

All dashboard sections should share spacing rhythm, typography hierarchy, border treatment, interaction patterns, and visual density.

Avoid each widget looking like a different product, inconsistent card systems, and random layouts.

## Anti-Patterns

Never introduce enterprise BI dashboards, giant analytics grids, excessive charts, colorful widget overload, investor-reporting aesthetics, dashboard clutter, oversized metrics, noisy alert systems, or admin-panel feeling.

## Dashboard Quality Checklist

Before finalizing dashboard UI, verify:

```txt
[ ] Dashboard feels calm
[ ] Sections are scannable
[ ] KPI cards remain compact
[ ] Risk visibility is clear
[ ] AI feels embedded
[ ] Venture awareness is visible
[ ] Charts remain lightweight
[ ] Layout hierarchy is intentional
[ ] No analytics overload
[ ] Dashboard supports operational clarity
```

## Default Bias

When uncertain, choose clarity over density, strategic over analytical, compact over oversized, calm over noisy, operational over enterprise, and embedded over decorative.

## North Star

Foundary dashboards should feel like a calm operational command layer for high-velocity venture teams.

Users should feel strategically informed, operationally aware, and cognitively clear. Never make them feel trapped inside enterprise reporting software.
