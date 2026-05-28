# Agent Onboarding - Foundary

## Purpose

This document helps a new development agent understand how to work inside
Foundary without scanning the entire codebase on every task.

Use it as the first codebase orientation layer after `AGENTS.md`.

This file is not the product spec. Product philosophy, feature behavior, and
implementation details stay in the existing context files.

---

## Agent Role Model

Foundary uses a supervised agent workflow:

- the super agent prepares implementation plans, sets scope, and reviews work
- implementation agents execute focused plans against limited context
- every agent protects the product direction and avoids unnecessary expansion

When you are an implementation agent, do not reinterpret broad product strategy
unless the plan explicitly asks you to. Execute the scoped plan, inspect nearby
code, verify the result, and leave a concise handoff.

---

## Product Identity

Foundary is an AI-native venture execution platform for venture studios managing
multiple startups.

It should feel:

- calm
- fast
- operationally intelligent
- venture-aware
- premium
- strategically coherent

It is inspired by Linear, Vercel, and Raycast, but it is not a generic project
management tool.

The product favors:

- speed over process
- outcomes over output
- operational clarity over configurability
- believable frontend sophistication over infrastructure completeness

---

## Hard Boundaries

Do not introduce:

- authentication
- RBAC
- real backend services
- real database work
- websocket infrastructure
- real AI provider integrations
- notifications
- comments systems
- audit logs
- billing
- settings-heavy UX
- enterprise reporting
- Mini Jira behavior

Unless the user explicitly changes scope, Foundary remains a frontend-first app
with local or mocked data and believable operational intelligence.

---

## Required First Steps

Before changing code:

1. Read `AGENTS.md`.
2. Read this file.
3. Read `context/current-feature.md`.
4. Read only the feature context required by the task.
5. Run `git status --short`.
6. Inspect the existing files directly related to the planned change.

Do not load every context file by default.

---

## Context Loading Rules

Load global context only for new features, architecture decisions, or major
refactors:

```txt
context/project-overview.md
context/project-specs.md
context/coding-standards.md
```

For feature work, load the matching feature spec and `current-feature.md`:

```txt
Dashboard:
context/features/feature-dashboard.md
context/current-feature.md

Issues:
context/features/feature-issues.md
context/current-feature.md

Roadmap:
context/features/feature-roadmap.md
context/current-feature.md

AI Assistant:
context/features/feature-ai-assistant.md
context/data/ai-behavior-rules.md
context/current-feature.md

Navigation / Layout:
context/features/feature-navigation.md
context/features/feature-design-system.md
context/current-feature.md
```

Only load additional specs when the task directly requires them.

---

## Implementation Discipline

Prefer small vertical slices.

Follow the existing app structure, naming, and component patterns before adding
new abstractions.

Keep state lightweight. Use existing Zustand stores, hooks, and local/mock data
patterns where possible.

Use drawers for drill-down workflows when that matches the current interaction
model.

Do not add backend-shaped architecture to solve frontend-only behavior.

Do not polish unrelated areas while implementing a feature. If you notice a
separate issue, mention it in the handoff instead of expanding scope.

---

## Design Discipline

Foundary UI should be compact, calm, and operational.

Prefer:

- dense but readable layouts
- restrained motion
- clear hierarchy
- focused controls
- venture-aware labels and data
- Lucide icons for actions
- concise microcopy

Avoid:

- decorative marketing sections
- oversized hero treatment inside app screens
- loud gradients
- card-heavy clutter
- settings-style configuration panels
- chat-first AI surfaces
- enterprise dashboard density

Every screen should help a lean venture team understand status, risk, momentum,
or next action.

---

## Verification Expectations

Run the most relevant available checks before handoff.

Prefer, when available:

```txt
npm run lint
npm run typecheck
npm run build
```

For UI changes, also run the app and inspect the affected route when feasible.

If a command cannot run because of environment constraints, report the exact
gap and any lower-cost checks you performed.

---

## Handoff Format

End every implementation task with a concise handoff:

```txt
Task:
Changed:
Verification:
Notes:
Risks / Follow-ups:
```

Mention:

- files changed
- behavior implemented
- verification commands and results
- any skipped checks
- any scope intentionally avoided

The handoff should be useful to the super agent reviewing the work and to the
next implementation agent entering the codebase.

---

## Review Expectations

When reviewing another agent's work, prioritize:

1. product fit
2. correctness
3. scope control
4. consistency with existing patterns
5. accessibility and responsive behavior
6. verification coverage

Look for accidental expansion into excluded systems, overly broad abstractions,
fresh render-loop risks, unstable Zustand selectors, and UI that feels generic
instead of venture-aware.

---

## Working With Other Agents

Before starting, check current repository state and recent handoff notes if they
exist.

Do not overwrite another agent's uncommitted work.

If files you need are already modified, inspect them carefully and build on the
current state. Ask for direction only when overlapping changes make the task
unsafe to continue.

Prefer separate branches or clearly separated feature areas when multiple
agents work in parallel.

---

## Default Mental Model

Foundary is not trying to look complete by adding more systems.

Foundary should feel complete because the few systems it has are coherent,
fast, well-composed, and venture-aware.
