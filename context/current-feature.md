# Current Feature - System Synchronization

## Current Objective

Make Foundary feel alive and interconnected through lightweight derived synchronization.

This phase establishes:
- live Zustand-backed data flow across major routes
- venture-scoped dashboard, issues, roadmap, and assistant context
- issue state affecting roadmap progress and confidence displays
- issue and roadmap state affecting dashboard metrics
- issue and roadmap state affecting AI analysis
- drawer content that reflects current local state

The goal is NOT:
> building a backend sync engine.

The goal is:
> making the local product feel systemic, coherent, and operationally responsive.

---

# Strategic Goal

System synchronization should communicate:
- changes matter across the product
- issue movement affects roadmap confidence
- roadmap state affects dashboard and AI context
- venture switching scopes the full operating system
- portfolio mode aggregates the full operating picture

Users should immediately feel:
- dashboard, issues, roadmap, and assistant share one operating context
- local state changes are reflected without reloads
- the product is a connected venture execution system

---

# Current Implementation Scope

This phase includes ONLY:

## Live Store Reads
- dashboard reads issue and roadmap stores
- roadmap reads issue store for linked execution state
- issues reads roadmap store for linked initiative labels
- assistant reads issue and roadmap stores
- drawers read live store state

---

## Derived Synchronization
- scoped venture / portfolio data
- linked issue completion
- derived roadmap progress and confidence display
- dashboard metrics from current local state
- assistant signals from current local state
- venture health display derived from scoped local issue and roadmap state

---

## Explicitly Out Of Scope

Do NOT build:
- backend APIs
- persistence
- event buses
- websocket simulation
- sync queues
- notification systems
- complex state machines
- cross-store mutation chains
- enterprise workflow automation

This phase is ONLY:
> selector-driven frontend synchronization.

---

# Acceptance Criteria

- issue status movement updates dashboard issue status counts
- linked issue completion updates roadmap progress displays
- roadmap drawer reflects current issue state
- issue drawer reflects current roadmap state
- assistant route and drawer derive signals from current stores
- venture switching scopes dashboard, issues, roadmap, and assistant consistently
- portfolio mode aggregates all ventures
- no fake backend, event bus, or enterprise sync architecture was introduced
