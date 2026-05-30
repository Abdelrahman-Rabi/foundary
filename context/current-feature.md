# Current Feature - Phase 3 Venture Setup Planning

## Current Objective

Prepare the context and specifications for the next Foundary product phase:
local-first venture setup.

This phase should define how users can create a new venture context without
introducing backend, auth, team management, settings-heavy UX, or portfolio CRM
complexity.

---

## Expected Product Behavior

- **Create venture** from a compact shell-level or command-palette entry point.
- **New venture appears in the venture switcher** immediately.
- **New venture becomes the active context** after creation.
- **Dashboard, issues, roadmap, and assistant** all handle the custom venture.
- **Empty venture states** guide users toward first issue or first roadmap item.
- **Local-first persistence** includes custom ventures in refresh/export/import.
- **Reset demo data** returns to seeded ventures only.
- **Invalid imported ventures** must not overwrite current state or crash the app.

---

## Technical Approach

1. **Feature spec**: Use `context/features/feature-venture-setup.md` as the source of truth for Phase 3 planning.
2. **Venture store expansion**: Plan for `useVentureStore` to own seeded and custom ventures instead of treating `src/data/ventures.ts` as the only runtime lookup source.
3. **Persistence schema update**: Plan for custom ventures to become part of the versioned local workspace state.
4. **Shell entry points**: Prefer a compact venture switcher action and command palette command.
5. **Cross-feature empty states**: Dashboard, issues, roadmap, and assistant should all respond coherently to a newly created venture with no work yet.

---

## Required Context For Implementation Agents

Load:

```txt
context/features/feature-venture-setup.md
context/features/feature-navigation.md
context/data/domain-models.md
context/current-feature.md
```

Load additional feature specs only when modifying that surface:

```txt
Dashboard: context/features/feature-dashboard.md
Issues: context/features/feature-issues.md
Roadmap: context/features/feature-roadmap.md
Assistant: context/features/feature-ai-assistant.md
```

---

## Explicitly Out Of Scope

- Backend APIs / Database
- Auth / RBAC
- Real-time / Comments / Notifications
- Real LLM integration
- Settings-heavy UX pages
- Team invites / organization management
- Venture CRM profiles
- Venture detail routes
