# Current Feature - Local-First Execution Continuity

## Current Objective

Implement local-first execution continuity for the existing Foundary MVP.
This ensures user actions survive page refreshes, and provides clean utilities for resetting demo data, exporting workspace state, and importing workspace state.

---

## Expected Product Behavior

- **Venture context** survives refresh.
- **Creating and moving issues** survives refresh.
- **Creating roadmap items** survives refresh.
- **Assistant inspected and dismissed signal states** survive refresh.
- **Reset demo data** restores seeded mock data.
- **Export/import workspace state** round-trips the persisted state.
- **Invalid import JSON** must not overwrite current state or crash the app.

---

## Technical Approach

1. **Persistence Utility (`src/lib/persistence.ts`)**: Versioned local storage helper with read/write/clear/export/import and validation/normalization logic.
2. **Store Hydration/Reset**: Explicit `.hydrate()` and `.reset()` methods added to Zustand stores:
   - `useVentureStore`
   - `useIssueStore`
   - `useRoadmapStore`
   - `useAssistantStore`
3. **App Shell Coordinator Hook (`src/hooks/use-workspace-persistence.ts`)**: Hydrates stores once on client mount and subscribes/autosaves store changes to localStorage.
4. **UI Access Points**: Integrated workspace database trigger dropdown in `src/components/app-shell/top-bar.tsx` and custom commands inside the command palette `src/components/app-shell/command-palette.tsx`.

---

## Explicitly Out Of Scope

- Backend APIs / Database
- Auth / RBAC
- Real-time / Comments / Notifications
- Real LLM integration
- Settings-heavy UX pages
