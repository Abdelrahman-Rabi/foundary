# Current Feature - Roadmap System

## Current Objective

Build the Foundary Roadmap System as the strategic execution layer.

This phase establishes:
- Now / Next / Later roadmap structure
- confidence-aware initiative cards
- venture-aware roadmap filtering
- linked issue execution context
- focused roadmap drawer context
- lightweight mocked AI strategic insights
- calm strategic visibility across active ventures

The goal is NOT:
> building enterprise roadmap planning software.

The goal is:
> making strategic direction, confidence, and execution linkage easy to understand.

---

# Strategic Goal

The Roadmap System should communicate:
- venture direction
- initiative confidence
- execution progress
- strategic risk
- linked operational work
- disciplined continue / split / kill thinking

Users should immediately understand:
- what matters now
- what is likely next
- what is less certain
- where confidence is weak
- how execution connects to outcomes

---

# Current Implementation Scope

This phase includes ONLY:

## Roadmap Page
- roadmap header
- strategic toolbar
- venture context
- status and confidence filtering
- confidence summary
- Now / Next / Later board

---

## Roadmap Board
- Now column
- Next column
- Later column
- calm initiative cards
- stable responsive layout
- drawer open behavior

---

## Roadmap Drawer
- initiative header
- strategic goal
- progress and confidence
- linked issue execution context
- mocked AI strategic insight context

---

## State And Data
- use existing roadmap store
- keep roadmap state local and frontend-only
- derive linked issue execution context from issue data
- derive venture scoping from existing venture store

---

# Explicitly Out Of Scope

Do NOT build yet:
- real backend
- API routes
- authentication
- notifications
- comments
- dependency graphs
- Gantt charts
- release train planning
- portfolio financial forecasting
- real AI integration
- chatbot UI

This phase is ONLY:
> the strategic roadmap workflow layer.

---

# Required Components

## Roadmap Components

```txt
RoadmapHeader
RoadmapToolbar
RoadmapConfidenceSummary
RoadmapBoard
RoadmapColumn
RoadmapCard
RoadmapDrawerContent
RoadmapBadges
```

---

# Acceptance Criteria

- roadmap route feels like a real strategic workspace
- Now / Next / Later structure is clear
- cards emphasize goals, progress, confidence, and linked issues
- roadmap drawer preserves page context
- venture switching scopes visible initiatives
- filters and search work
- linked issue context is visible
- mocked AI roadmap insights feel structured and non-chatty
- no timeline, Gantt, or enterprise planning complexity was introduced
