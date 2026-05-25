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

## ONE STUDIO ASSIGNMENT — STRATEGIC EXECUTION ROADMAP

┌─────────────────────────────────────────────────────────────┐
│ PHASE A — STRATEGIC FOUNDATION                             │
│ "Think before building"                                    │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 1 — Decode One Studio Philosophy                      │
│-------------------------------------------------------------│
│ Understand:                                                 │
│ • AI-native workflows                                       │
│ • Lean venture operations                                   │
│ • Async execution                                           │
│ • High-velocity product culture                             │
│ • Small elite teams                                         │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 2 — Product Positioning                               │
│-------------------------------------------------------------│
│ Define the product as:                                      │
│                                                             │
│ "AI-native Venture Execution OS"                            │
│                                                             │
│ Key Concepts:                                               │
│ • Venture-aware workflows                                   │
│ • Portfolio visibility                                      │
│ • Outcome-oriented execution                                │
│ • Operational clarity                                       │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 3 — UX & Interaction Philosophy                       │
│-------------------------------------------------------------│
│ UX Principles:                                              │
│ • Calm                                                      │
│ • Fast                                                      │
│ • Minimal                                                    │
│ • Focused                                                   │
│ • Intelligent                                               │
│                                                             │
│ Avoid:                                                      │
│ • Jira complexity                                           │
│ • Enterprise density                                        │
│ • Workflow clutter                                          │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 4 — Core Venture Adaptations                          │
│-------------------------------------------------------------│
│ Introduce:                                                  │
│ • Venture Layer                                             │
│ • Venture Health Signals                                    │
│ • AI Venture Assistant                                      │
│ • Outcome-Oriented Roadmaps                                 │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 5 — Information Architecture                          │
│-------------------------------------------------------------│
│ Main Product Areas:                                         │
│                                                             │
│ • Dashboard                                                 │
│ • Venture Switcher                                          │
│ • Issues                                                    │
│ • Roadmap                                                   │
│ • AI Assistant                                              │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 6 — Scope Lock                                        │
│-------------------------------------------------------------│
│ Decide:                                                     │
│ • What exists in MVP                                        │
│ • What is intentionally excluded                            │
│                                                             │
│ Prioritize:                                                 │
│ • UX quality                                                │
│ • Operational realism                                       │
│ • Demo sophistication                                       │
│                                                             │
│ Avoid:                                                      │
│ • Overengineering                                           │
│ • Enterprise features                                       │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 7 — Technical Strategy                                │
│-------------------------------------------------------------│
│ Stack:                                                      │
│ • Next.js                                                   │
│ • Tailwind                                                  │
│ • shadcn/ui                                                 │
│ • Zustand                                                   │
│ • dnd-kit                                                   │
│ • Recharts                                                  │
│                                                             │
│ Philosophy:                                                 │
│ "Believable sophistication > backend complexity"            │
└─────────────────────────────────────────────────────────────┘
                │
                ▼


┌─────────────────────────────────────────────────────────────┐
│ PHASE B — EXECUTION & BUILDING                             │
│ "Transform strategy into believable product quality"       │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 8 — Foundation Setup                                  │
│-------------------------------------------------------------│
│ Setup:                                                      │
│ • Theme                                                     │
│ • Typography                                                │
│ • Layout tokens                                             │
│ • App Router                                                │
│ • Zustand stores                                            │
│ • Motion system                                             │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 9 — App Shell & Navigation                            │
│-------------------------------------------------------------│
│ Build:                                                      │
│ • Sidebar                                                   │
│ • Venture Switcher                                          │
│ • Layout shell                                              │
│ • Drawer system                                             │
│ • Routing structure                                         │
│                                                             │
│ Goal:                                                       │
│ "Feel like real operational software early"                 │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 10 — Dashboard                                        │
│-------------------------------------------------------------│
│ Create:                                                     │
│ • KPI cards                                                 │
│ • Venture health                                            │
│ • Portfolio insights                                        │
│ • Risk visibility                                           │
│ • Roadmap overview                                          │
│                                                             │
│ Goal:                                                       │
│ "Executive-readable operational intelligence"               │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 11 — Issues System                                    │
│-------------------------------------------------------------│
│ Build:                                                      │
│ • List view                                                 │
│ • Kanban board                                              │
│ • Filters & search                                          │
│ • Issue drawer                                              │
│ • Drag & drop                                               │
│ • Quick create                                              │
│                                                             │
│ Most Important Signal:                                      │
│ "Operationally alive workflows"                             │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 12 — Roadmap System                                   │
│-------------------------------------------------------------│
│ Build:                                                      │
│ • Now / Next / Later                                        │
│ • Goal-oriented roadmap cards                               │
│ • Confidence indicators                                     │
│ • Linked issues                                             │
│ • Progress visibility                                       │
│                                                             │
│ Goal:                                                       │
│ "Strategic execution visibility"                            │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 13 — AI Assistant Layer                               │
│-------------------------------------------------------------│
│ AI Behaviors:                                               │
│ • Summaries                                                 │
│ • Risk detection                                            │
│ • Priority suggestions                                      │
│ • Missing criteria analysis                                 │
│ • Continue/Kill/Split recommendations                       │
│                                                             │
│ AI Philosophy:                                              │
│ "Embedded operational intelligence"                         │
│                                                             │
│ NOT:                                                        │
│ • Generic chatbot                                           │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 14 — System Synchronization                           │
│-------------------------------------------------------------│
│ Connect everything:                                         │
│ • Issues → Roadmap                                          │
│ • Roadmap → Dashboard                                       │
│ • AI → Contextual insights                                  │
│ • Venture → Portfolio metrics                               │
│                                                             │
│ Goal:                                                       │
│ "Product feels alive and interconnected"                    │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 15 — Polish & Motion                                  │
│-------------------------------------------------------------│
│ Refine:                                                     │
│ • Motion                                                    │
│ • Typography                                                │
│ • Hover states                                              │
│ • Drawer transitions                                        │
│ • Empty states                                              │
│ • Skeleton loaders                                          │
│ • Micro-interactions                                        │
│                                                             │
│ Goal:                                                       │
│ "Premium AI-native SaaS feel"                               │
└─────────────────────────────────────────────────────────────┘
                │
                ▼


┌─────────────────────────────────────────────────────────────┐
│ PHASE C — STORYTELLING & DELIVERY                          │
│ "Present strategic thinking, not just frontend work"       │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 16 — Product Narrative                                │
│-------------------------------------------------------------│
│ Write:                                                      │
│ • README                                                    │
│ • Product Note                                              │
│ • AI Usage Note                                             │
│                                                             │
│ Explain:                                                    │
│ • Why Linear inspired the system                            │
│ • Why venture-awareness matters                             │
│ • Why simplicity was prioritized                            │
│ • What was intentionally excluded                           │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ STEP 17 — Demo Optimization                                │
│-------------------------------------------------------------│
│ Tune:                                                       │
│ • Mock data realism                                         │
│ • AI recommendations                                        │
│ • Venture scenarios                                         │
│ • Portfolio risk states                                     │
│ • Dashboard storytelling                                    │
│                                                             │
│ Goal:                                                       │
│ "Believable venture operating system realism"               │
└─────────────────────────────────────────────────────────────┘
                │
                ▼

┌─────────────────────────────────────────────────────────────┐
│ FINAL SUCCESS TARGET                                       │
│-------------------------------------------------------------│
│ Reviewer should feel:                                       │
│                                                             │
│ "This person understands how modern AI-native               │
│ venture studios should operate."                            │
│                                                             │
│ NOT:                                                        │
│ "They built a nice frontend."                               │
└─────────────────────────────────────────────────────────────┘