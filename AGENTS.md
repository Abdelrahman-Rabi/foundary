# AGENTS.md — Foundary

## Purpose

This file defines:
- agent workflow rules
- context loading strategy
- implementation discipline
- token efficiency rules

Product philosophy and specifications live inside:
- `/context/project-overview.md`
- `/context/project-specs.md`
- `/context/features/*`

Do NOT duplicate those rules here.

---

# Core Rule

Load ONLY the context required for the current task.

Avoid loading unnecessary feature specs.

This improves:
- token efficiency
- implementation focus
- output quality

---

# Agent Startup Context

Before implementation or review work, load:

```txt
/context/agent-onboarding.md
/context/codebase-map.md
/context/agent-handoff.md
/context/current-feature.md
```

Then load only the current task's required feature context.

Use:
- `/context/agent-onboarding.md` for agent workflow, role boundaries, and handoff expectations
- `/context/codebase-map.md` for source layout, ownership, and connection points
- `/context/agent-handoff.md` for recent agent activity and merge-sensitive areas
- `/context/current-feature.md` for the active implementation focus

Do NOT treat startup context as permission to load all feature specs.

---

# Global Context Files

Load these when:
- starting a new feature
- making architecture decisions
- performing major refactors

```txt
/context/project-overview.md
/context/project-specs.md
/context/coding-standards.md
```

---

# Feature Context Rules

## Dashboard Work

Load:

```txt
/context/features/feature-dashboard.md
/context/current-feature.md
```

Optional only if needed:
```txt
/context/data/domain-models.md
```

---

## Issues Work

Load:

```txt
/context/features/feature-issues.md
/context/current-feature.md
```

Only load roadmap specs if implementing linkage behavior.

---

## Roadmap Work

Load:

```txt
/context/features/feature-roadmap.md
/context/current-feature.md
```

Only load issue specs if synchronization is required.

---

## AI Assistant Work

Load:

```txt
/context/features/feature-ai-assistant.md
/context/data/ai-behavior-rules.md
/context/current-feature.md
```

---

## Navigation / Layout Work

Load:

```txt
/context/features/feature-navigation.md
/context/features/feature-design-system.md
/context/current-feature.md
```

---

# Implementation Order

Follow this sequence:

```txt
Foundation
→ App Shell
→ Dashboard
→ Issues
→ Roadmap
→ AI Layer
→ Synchronization
→ Polish
```

Do NOT:
- jump randomly between features
- polish too early
- overbuild architecture

---

# Prompting Rules

Prefer:
- small scoped prompts
- feature-by-feature implementation
- isolated vertical slices

Avoid:
- "build the whole app"
- loading all context files
- broad multi-feature prompts

---

# Code Generation Rules

Use AI primarily for:
- scaffolding
- repetitive UI
- utilities
- state boilerplate
- component generation

Human decisions control:
- UX hierarchy
- product behavior
- architecture direction
- final polish

---

# Anti-Patterns

Never introduce:
- enterprise workflows
- RBAC systems
- backend complexity
- settings-heavy UX
- chatbot-style AI
- Mini Jira behavior
- unnecessary abstractions

---

# Success Criteria

The product should feel:
- calm
- fast
- operationally intelligent
- venture-aware
- premium
- strategically coherent
