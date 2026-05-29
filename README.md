# Foundary

Foundary is an AI-native venture execution platform inspired by Linear and adapted for venture studios managing multiple startups at once.

It is designed as a calm operating system for high-velocity venture teams: issues for execution, roadmap for strategic direction, dashboard for portfolio awareness, and embedded AI-style intelligence for concise operational judgment.

The project is intentionally frontend-only. It prioritizes product thinking, workflow quality, venture-aware data relationships, and interaction polish over backend completeness.

## Demo Flow

The preferred reviewer path starts in portfolio mode:

1. Open `/dashboard` and review the portfolio risk signal.
2. Follow the Sentra onboarding risk into the at-risk roadmap initiative.
3. Inspect the linked blocked analytics issue.
4. Review the AI recommendation to reduce scope or prioritize dependency resolution.

Supporting flows:

- Reson8 shows validation-stage ambiguity with clarify and split recommendations.
- Internal Ops shows stable operating work with continue recommendations.
- Venture switching scopes dashboard, issues, roadmap, and assistant context instantly.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Validate the project:

```bash
npm run lint
npm run build
```

## Core Routes

- `/dashboard` - portfolio and venture-level operational overview
- `/issues` - Linear-inspired issue list and board workflows
- `/roadmap` - Now / Next / Later strategic execution board
- `/assistant` - deterministic operational intelligence workspace

## Architecture

Foundary uses the Next.js App Router with a persistent application shell. The shell owns the sidebar, top bar, venture switcher, page transitions, and global drawer.

The app is organized around feature-local components:

- `src/features/dashboard` for metrics, risk panels, venture health, and activity
- `src/features/issues` for list, board, issue cards, quick create, and drawer content
- `src/features/roadmap` for roadmap board, cards, confidence summaries, and drawer content
- `src/features/assistant` for AI insight cards, recommendations, summaries, and analysis utilities
- `src/features/synchronization` for derived cross-surface state

State is held in small Zustand stores:

- venture context
- issue state
- roadmap state
- UI drawer state

Mock data initializes the stores, then dashboard, roadmap, assistant, and drawer surfaces derive their visible state from the current local store state. Synchronization is intentionally render-time and selector-driven rather than an event bus or backend simulation.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- shadcn/Radix UI primitives
- Zustand
- dnd-kit
- Framer Motion
- Recharts
- Lucide icons

## Mocked vs Real Systems

Implemented:

- mocked ventures, issues, roadmap items, users, tags, and AI insights
- Zustand-backed local runtime state
- deterministic AI-style recommendations and risk signals
- derived issue, roadmap, dashboard, and assistant synchronization
- local drag-and-drop issue movement
- global contextual drawers
- route loading states, skeletons, empty states, and restrained motion

Not implemented by design:

- backend API routes
- database persistence
- authentication or RBAC
- multi-user collaboration
- realtime sockets
- notifications or comments
- real LLM calls, streaming, chat threads, or fake typing states
- production deployment infrastructure

This scope is deliberate. The prototype is meant to demonstrate a coherent product direction and believable operational sophistication, not production infrastructure completeness.

## Delivery Notes

- Product rationale: see `product-note.md`.
- AI-assisted development process: see `ai-usage-note.md`.

# Foundary

Foundary is an AI-native venture execution platform inspired by Linear and adapted for venture studios managing multiple startups at once.

It is designed as a calm operating system for high-velocity venture teams: issues for execution, roadmap for strategic direction, dashboard for portfolio awareness, and embedded AI-style intelligence for concise operational judgment.

The project is intentionally frontend-only. It prioritizes product thinking, workflow quality, venture-aware data relationships, and interaction polish over backend completeness.

## Demo Flow

The preferred reviewer path starts in portfolio mode:

1. Open `/dashboard` and review the portfolio risk signal.
2. Follow the Sentra onboarding risk into the at-risk roadmap initiative.
3. Inspect the linked blocked analytics issue.
4. Review the AI recommendation to reduce scope or prioritize dependency resolution.

Supporting flows:

- Reson8 shows validation-stage ambiguity with clarify and split recommendations.
- Internal Ops shows stable operating work with continue recommendations.
- Venture switching scopes dashboard, issues, roadmap, and assistant context instantly.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Validate the project:

```bash
npm run lint
npm run build
```

## Core Routes

- `/dashboard` - portfolio and venture-level operational overview
- `/issues` - Linear-inspired issue list and board workflows
- `/roadmap` - Now / Next / Later strategic execution board
- `/assistant` - deterministic operational intelligence workspace

## Architecture

Foundary uses the Next.js App Router with a persistent application shell. The shell owns the sidebar, top bar, venture switcher, page transitions, and global drawer.

The app is organized around feature-local components:

- `src/features/dashboard` for metrics, risk panels, venture health, and activity
- `src/features/issues` for list, board, issue cards, quick create, and drawer content
- `src/features/roadmap` for roadmap board, cards, confidence summaries, and drawer content
- `src/features/assistant` for AI insight cards, recommendations, summaries, and analysis utilities
- `src/features/synchronization` for derived cross-surface state

State is held in small Zustand stores:

- venture context
- issue state
- roadmap state
- UI drawer state

Mock data initializes the stores, then dashboard, roadmap, assistant, and drawer surfaces derive their visible state from the current local store state. Synchronization is intentionally render-time and selector-driven rather than an event bus or backend simulation.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- shadcn/Radix UI primitives
- Zustand
- dnd-kit
- Framer Motion
- Recharts
- Lucide icons

## Mocked vs Real Systems

Implemented:

- mocked ventures, issues, roadmap items, users, tags, and AI insights
- Zustand-backed local runtime state
- deterministic AI-style recommendations and risk signals
- derived issue, roadmap, dashboard, and assistant synchronization
- local drag-and-drop issue movement
- global contextual drawers
- route loading states, skeletons, empty states, and restrained motion

Not implemented by design:

- backend API routes
- database persistence
- authentication or RBAC
- multi-user collaboration
- realtime sockets
- notifications or comments
- real LLM calls, streaming, chat threads, or fake typing states
- production deployment infrastructure

This scope is deliberate. The prototype is meant to demonstrate a coherent product direction and believable operational sophistication, not production infrastructure completeness.

## Delivery Notes

- Product rationale: see `product-note.md`.
- AI-assisted development process: see `ai-usage-note.md`.

## One Studio Assignment: Strategic Execution Roadmap

This roadmap explains how the assignment was approached: first as a strategic product problem, then as a focused execution system, and finally as a reviewer-ready product narrative.

> Success is not "a nice frontend." Success is showing how modern AI-native venture studios could operate with more clarity, speed, and strategic discipline.

### Roadmap Overview

| Phase | Focus | Outcome |
| --- | --- | --- |
| Phase A | Strategic foundation | Define the operating philosophy before building UI. |
| Phase B | Execution and building | Turn the strategy into believable product workflows. |
| Phase C | Storytelling and delivery | Present the product as strategic thinking, not only implementation. |

### Phase A: Strategic Foundation

**Guiding principle:** Think before building.

| Step | Decision Area | What It Established |
| --- | --- | --- |
| 1 | Decode One Studio philosophy | AI-native workflows, lean venture operations, async execution, high-velocity culture, and small elite teams. |
| 2 | Product positioning | Foundary as an AI-native venture execution OS. |
| 3 | UX and interaction philosophy | Calm, fast, minimal, focused, and intelligent product behavior. |
| 4 | Venture adaptations | Venture layer, health signals, AI venture assistant, and outcome-oriented roadmaps. |
| 5 | Information architecture | Dashboard, venture switcher, issues, roadmap, and AI assistant as the core product areas. |
| 6 | Scope lock | Prioritize UX quality, operational realism, and demo sophistication over backend breadth. |
| 7 | Technical strategy | Build believable sophistication with Next.js, Tailwind, shadcn/ui, Zustand, dnd-kit, and Recharts. |

**Strategic choices:**

- Position the product around venture execution, not generic project management.
- Make portfolio context visible without turning the app into an enterprise dashboard.
- Use AI as embedded operational intelligence, not as a generic chatbot.
- Keep backend complexity out of scope so the demo can focus on product judgment.

### Phase B: Execution and Building

**Guiding principle:** Transform strategy into believable product quality.

| Step | Product Area | Build Intent |
| --- | --- | --- |
| 8 | Foundation setup | Establish theme, typography, layout tokens, routing, stores, and motion system. |
| 9 | App shell and navigation | Create a stable sidebar, venture switcher, layout shell, drawer system, and route structure. |
| 10 | Dashboard | Surface KPI cards, venture health, portfolio insights, risk visibility, and roadmap overview. |
| 11 | Issues system | Support list view, board view, filters, search, issue drawer, drag and drop, and quick create. |
| 12 | Roadmap system | Organize Now / Next / Later initiatives with confidence, progress, and linked issue visibility. |
| 13 | AI assistant layer | Provide summaries, risk detection, priority suggestions, missing criteria analysis, and continue/kill/split recommendations. |
| 14 | System synchronization | Connect issues, roadmap, dashboard, AI context, and venture-level portfolio metrics. |
| 15 | Polish and motion | Refine typography, hover states, drawer transitions, empty states, skeletons, and micro-interactions. |

**Execution quality signals:**

- The app should feel operationally alive, not static.
- Dashboard views should be executive-readable and venture-aware.
- Issues should feel fast and focused rather than ticket-heavy.
- Roadmap cards should communicate strategic confidence, not just task status.
- AI recommendations should feel grounded in visible product context.

### Phase C: Storytelling and Delivery

**Guiding principle:** Present strategic thinking, not just frontend work.

| Step | Delivery Area | Purpose |
| --- | --- | --- |
| 16 | Product narrative | Explain why Foundary is Linear-inspired, venture-aware, deliberately simple, and intentionally scoped. |
| 17 | Demo optimization | Tune mock data, AI recommendations, venture scenarios, portfolio risk states, and dashboard storytelling. |

**Reviewer takeaway:**

The product should make it clear that the work is not only visual polish. It should show an understanding of how a venture studio can connect execution, strategy, portfolio visibility, and AI-assisted judgment into one coherent operating system.

### Final Success Target

| Reviewer Should Feel | Reviewer Should Not Feel |
| --- | --- |
| "This person understands how modern AI-native venture studios should operate." | "They built a nice frontend." |
