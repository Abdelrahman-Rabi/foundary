# AI Behavior Rules — Foundary

## Purpose

This document defines:
- AI assistant philosophy
- operational intelligence behavior
- recommendation rules
- risk analysis logic
- UX behavior constraints
- response formatting
- synchronization rules
- anti-patterns

The AI system should feel:
> embedded operational intelligence for venture execution teams.

NOT:
> a generic chatbot.

---

# Core AI Philosophy

## Most Important Principle

The AI assistant exists to:
- reduce operational ambiguity
- surface execution risk
- improve roadmap clarity
- assist venture decision-making
- reinforce operational momentum

The AI should behave like:
> a strategic operating layer embedded into the product.

---

# AI Product Positioning

The AI system is:
- contextual
- operational
- concise
- embedded
- venture-aware
- execution-focused

The AI system is NOT:
- conversational entertainment
- autonomous agent infrastructure
- generative writing assistant
- fake AGI simulation
- chat-first UX

---

# AI Experience Philosophy

AI should feel:
- quietly useful
- always contextual
- operationally intelligent
- strategically aware
- low-noise

Users should feel:
> "The system understands venture execution conditions."

NOT:
> "This is an AI chatbot demo."

---

# Core AI Responsibilities

## Primary AI Behaviors

The assistant should support:

| Behavior | Purpose |
|---|---|
| Issue summarization | Reduce cognitive load |
| Risk detection | Surface operational danger |
| Priority recommendation | Improve execution clarity |
| Missing criteria detection | Improve delivery quality |
| Continue/Kill/Split analysis | Improve roadmap decisions |
| Roadmap confidence analysis | Surface uncertainty |
| Venture health interpretation | Improve portfolio visibility |
| Operational insight generation | Create strategic awareness |

---

# AI Context Awareness

## Important Principle

All AI output MUST be:
- venture-aware
- roadmap-aware
- issue-aware
- state-aware

The AI should reference:
- issue status
- roadmap confidence
- overdue work
- blocked execution
- venture stage
- operational momentum

Avoid:
- generic recommendations
- isolated analysis
- disconnected observations

---

# AI System Architecture

## Recommended Structure

```txt
AI Layer
 ├── Issue Analyzer
 ├── Risk Engine
 ├── Confidence Engine
 ├── Recommendation Engine
 ├── Venture Health Analyzer
 └── Portfolio Intelligence Layer
```

---

# AI Behavior Categories

# 1. Issue Summarization

## Goal

Reduce cognitive overhead while preserving:
- operational context
- delivery importance
- strategic relevance

---

# Summarization Rules

Summaries should:
- remain concise
- preserve key risks
- mention roadmap relationships
- identify execution state

Avoid:
- long explanations
- conversational filler
- verbose AI writing

---

# Example Output

```txt
Summary:
This issue focuses on stabilizing onboarding analytics reliability for Sentra's active growth initiative.

Operational Context:
The issue is linked to a high-priority roadmap objective and currently blocked by infrastructure dependencies.
```

---

# 2. Risk Detection

## Goal

Surface:
- delivery instability
- roadmap threats
- operational uncertainty

This is one of the MOST important AI behaviors.

---

# Risk Detection Rules

Increase risk when:
- issue overdue
- issue blocked
- roadmap confidence low
- no acceptance criteria
- urgent issue unresolved
- too many linked dependencies
- initiative stalled
- venture momentum declining

---

# Risk Levels

```ts
type RiskLevel =
  | "low"
  | "medium"
  | "high"
```

---

# Risk Severity Rules

## Low Risk

Characteristics:
- clear scope
- active progress
- strong confidence
- no blockers

---

## Medium Risk

Characteristics:
- some uncertainty
- moderate delays
- unclear dependencies
- confidence fluctuations

---

## High Risk

Characteristics:
- blocked work
- overdue delivery
- roadmap instability
- missing validation
- declining momentum

---

# Example Output

```txt
Risk Level: High

Reason:
The roadmap initiative contains multiple blocked implementation tasks and lacks measurable validation criteria.

Suggested Action:
Separate validation milestones from delivery execution.

Confidence:
84%
```

---

# 3. Priority Recommendation

## Goal

Help teams:
- focus execution
- reduce ambiguity
- align with roadmap importance

---

# Priority Recommendation Rules

Increase priority when:
- linked to active roadmap initiative
- impacts onboarding or growth
- blocks multiple issues
- affects operational reliability
- linked to declining confidence roadmap

Lower priority when:
- disconnected from roadmap
- exploratory only
- low operational impact

---

# Example Output

```txt
Recommendation:
Elevate issue priority to High.

Reason:
The issue impacts onboarding conversion for an active growth-stage initiative.
```

---

# 4. Missing Acceptance Criteria Detection

## Goal

Improve:
- execution clarity
- delivery confidence
- implementation quality

---

# Detection Rules

Flag issues when:
- acceptance criteria empty
- success metric missing
- outcome unclear
- ambiguous implementation scope

---

# Example Output

```txt
Observation:
The issue lacks measurable completion criteria.

Suggested Action:
Define validation conditions and expected delivery outcomes before implementation begins.
```

---

# 5. Continue / Kill / Split Analysis

## Goal

Support:
- venture experimentation
- roadmap prioritization
- lean execution philosophy

This behavior strongly reinforces:
> venture-builder operational thinking.

---

# Continue Rules

Recommend Continue when:
- roadmap confidence high
- progress improving
- issue completion velocity strong
- operational momentum positive

---

# Kill Rules

Recommend Kill when:
- confidence extremely low
- repeated stagnation
- validation failure
- strategic misalignment
- high execution cost with low signal

---

# Split Rules

Recommend Split when:
- initiative scope too broad
- discovery and implementation mixed
- confidence uncertain
- validation incomplete

---

# Example Continue Output

```txt
Recommendation: Continue

Reason:
Execution momentum remains stable and onboarding conversion metrics continue improving.

Confidence:
81%
```

---

# Example Kill Output

```txt
Recommendation: Kill

Reason:
The initiative has remained stalled for multiple cycles and lacks measurable validation progress.

Confidence:
73%
```

---

# Example Split Output

```txt
Recommendation: Split Initiative

Reason:
Discovery validation and implementation delivery are currently coupled, increasing operational ambiguity.

Suggested Split:
1. Validation milestone
2. Delivery implementation milestone

Confidence:
86%
```

---

# 6. Roadmap Confidence Analysis

## Goal

Represent:
- strategic certainty
- delivery predictability
- execution health

Roadmap confidence is a core product differentiator.

---

# Confidence Calculation Inputs

Confidence should derive from:
- issue completion velocity
- blocked issue count
- overdue work
- roadmap stagnation
- operational momentum
- unresolved dependencies

---

# Confidence Bands

## Strong Confidence

```txt
80–100
```

Signals:
- active progress
- low blockers
- healthy execution

---

## Moderate Confidence

```txt
50–79
```

Signals:
- manageable uncertainty
- moderate risk
- mixed momentum

---

## Weak Confidence

```txt
0–49
```

Signals:
- blocked execution
- stalled progress
- strategic ambiguity

---

# Example Output

```txt
Roadmap Confidence: Declining

Reason:
Blocked implementation work increased while roadmap progress slowed over the last execution cycle.

Suggested Action:
Reduce concurrent initiative scope and prioritize validation milestones.
```

---

# 7. Venture Health Intelligence

## Goal

Provide:
- portfolio awareness
- operational visibility
- venture-level strategic understanding

---

# Venture Health Rules

Health should evaluate:
- roadmap confidence
- blocked work
- overdue issues
- delivery velocity
- operational momentum

---

# Health States

```ts
type VentureHealth =
  | "strong"
  | "stable"
  | "at-risk"
  | "critical"
```

---

# Example Output

```txt
Venture Health: At Risk

Reason:
Multiple high-priority roadmap initiatives show declining confidence and blocked implementation dependencies.

Suggested Action:
Reduce initiative concurrency and stabilize execution focus.
```

---

# 8. Portfolio Intelligence

## Goal

Surface:
- cross-venture operational patterns
- portfolio bottlenecks
- strategic resource pressure

This creates:
> venture studio sophistication.

---

# Portfolio Insight Examples

```txt
Observation:
Growth-stage ventures are accumulating implementation debt faster than roadmap completion velocity.

Suggested Action:
Temporarily reduce experimental initiative concurrency.
```

---

# AI Output Style Rules

## Tone

AI should sound:
- concise
- calm
- strategic
- operational
- analytical

Avoid:
- excitement
- hype
- marketing language
- emotional phrasing

---

# Preferred Writing Style

Prefer:
- short paragraphs
- structured observations
- actionable recommendations
- operational vocabulary

---

# Avoid These Styles

Avoid:
- storytelling AI
- long conversational paragraphs
- excessive formatting
- assistant personality simulation

---

# AI UI Behavior Rules

## Most Important Principle

AI should feel:
> embedded into workflows.

NOT:
> separated from workflows.

---

# Preferred UI Patterns

Use:
- insight cards
- recommendation panels
- contextual sidebars
- embedded analysis blocks
- confidence indicators

---

# Avoid

Do NOT implement:
- chat bubbles
- typing animations
- fake streaming responses
- avatar-based assistants
- prompt playground UX
- conversational thread interfaces

---

# AI Trigger Rules

## Automatic Triggers

AI should update when:
- issue status changes
- roadmap confidence changes
- blocked work appears
- overdue issues increase
- venture changes
- roadmap progress changes

---

# Manual Triggers

Allow users to:
- summarize issue
- analyze roadmap
- request risk evaluation

---

# Synchronization Rules

## Issue → AI

Issue changes should affect:
- risk analysis
- confidence analysis
- recommendations

---

## Roadmap → AI

Roadmap changes should affect:
- initiative confidence
- strategic recommendations
- delivery risk

---

## Venture → AI

Venture changes should affect:
- portfolio context
- momentum analysis
- operational interpretation

---

# AI Confidence Rules

## Important Principle

Every recommendation should include:
- confidence score
- reasoning
- contextual evidence

---

# Confidence Distribution

Avoid:
- always high confidence
- unrealistic certainty

Use:
- nuanced confidence variation

---

# Example Distribution

```txt
High Certainty:
82–91%

Moderate Certainty:
61–79%

Low Certainty:
38–55%
```

---

# AI Realism Rules

## Most Important Principle

AI outputs should feel:
> operationally believable.

---

# Recommended Behaviors

AI should:
- mention actual venture conditions
- reference roadmap state
- reflect issue metadata
- vary phrasing naturally
- adapt severity appropriately

---

# Avoid Generic Outputs

DO NOT generate:

```txt
This issue may be risky.

Please review the issue carefully.
```

Too vague.
Too generic.
Too fake.

---

# Better Example

```txt
Risk Level: Medium

Reason:
The initiative depends on unresolved analytics infrastructure work and roadmap confidence declined over the last delivery cycle.

Suggested Action:
Resolve infrastructure dependencies before expanding onboarding experimentation.
```

---

# AI State Design

## Important Principle

AI should feel:
- reactive
- contextual
- synchronized

The system should appear:
> operationally aware.

---

# AI Store Structure

## Recommended Zustand Store

```txt
/use-ai-store
  ├── issueInsights
  ├── roadmapInsights
  ├── ventureInsights
  ├── portfolioInsights
  └── recommendationEngine
```

---

# Performance Rules

AI should remain:
- lightweight
- frontend-driven
- deterministic

Avoid:
- fake API latency
- unnecessary async complexity
- simulated streaming

---

# Demo Optimization Rules

## Important Principle

AI should amplify:
> perceived product sophistication.

---

# Best Demo AI Moments

## Recommended Hero Flow

```txt
Dashboard risk signal
  ↓
Roadmap confidence decline
  ↓
Open roadmap initiative
  ↓
Linked blocked issue
  ↓
AI recommends splitting initiative
```

This creates:
- operational realism
- venture intelligence
- AI-native sophistication

---

# Anti-Patterns

## NEVER INTRODUCE

Do NOT:
- build ChatGPT clone UX
- simulate fake LLM streaming
- generate excessive text
- create AI-first workflows
- overwhelm interfaces with AI
- prioritize novelty over utility
- introduce autonomous agent theatrics

---

# Final AI Philosophy

The AI system should feel like:
> embedded operational intelligence for modern venture execution teams.

The assistant should reinforce:
- operational clarity
- execution confidence
- venture awareness
- strategic focus
- lean decision-making

The reviewer should feel:
> "The AI meaningfully improves venture coordination and execution visibility."

NOT:
> "This product added AI because AI is trendy."