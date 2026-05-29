---
name: foundary-agent-kickoff
description: Use when starting Foundary implementation planning, dispatching work to another agent, reviewing another agent's work, or preparing a handoff in Y:\foundary.
---

# Foundary Agent Kickoff

## Overview

Use this skill to start Foundary agent work with the right context, scope, and handoff discipline. It keeps planning and review fast without asking agents to scan the full repo.

## Required Startup

First load:

```txt
AGENTS.md
context/agent-onboarding.md
context/codebase-map.md
context/agent-handoff.md
context/current-feature.md
```

Then load only the feature context required by the task.

Do not load all feature specs. Do not broaden scope because more context is available.

## Choose The Mode

### Super Agent Planning

Use when converting user intent into work for an implementation agent.

Produce a compact plan with:

```txt
Goal:
Required context:
Allowed scope:
Likely files:
Implementation steps:
Anti-patterns to avoid:
Verification:
Handoff requirements:
```

The plan must preserve Foundary's phase boundaries and avoid backend, RBAC, settings-heavy UX, comments, enterprise workflows, or Mini Jira behavior unless explicitly requested.

### Implementation Agent Start

Use when executing a plan.

Sequence:

1. Read the startup files.
2. Read the plan.
3. Load only the required feature spec.
4. Run `git status --short`.
5. Inspect likely files from `context/codebase-map.md`.
6. Implement the smallest complete vertical slice.
7. Verify with the most relevant available command.
8. Append a concise entry to `context/agent-handoff.md`.

Never overwrite unrelated dirty work. If overlapping files are already modified, inspect and work with them.

### Review Agent Start

Use when reviewing another agent's work.

Review in this order:

1. Product fit and scope control.
2. Correctness and regressions.
3. Consistency with existing code patterns.
4. Zustand selector stability and derived data safety.
5. UX quality, responsive behavior, and accessibility.
6. Verification coverage and remaining risk.

Lead with findings. If no issues are found, say that clearly and note residual test gaps.

### Handoff Update

Append entries at the top of `context/agent-handoff.md` using:

```txt
## YYYY-MM-DD - Agent Name - Short Task Name

Task:
Changed:
Verification:
Notes:
Risks / Follow-ups:
```

Keep entries factual and short. Mention merge-sensitive dirty files.

## Foundary Defaults

Foundary should remain:

- frontend-first
- local/mock-data driven
- drawer-oriented for drill-downs
- calm, compact, premium, operational
- venture-aware and strategically coherent

Prefer existing stores, hooks, utilities, feature folders, and UI primitives.

## Quick Invocation Examples

User:

```txt
Use $foundary-agent-kickoff to prepare an implementation plan for roadmap polish.
```

User:

```txt
Use $foundary-agent-kickoff to review Implementation Agent A's changes.
```

User:

```txt
Use $foundary-agent-kickoff and start the next Foundary feature task.
```
