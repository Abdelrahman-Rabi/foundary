# Feature Specification — AI Assistant System

## Purpose

The AI Assistant System is:
> the embedded operational intelligence layer of Foundary.

Its role is NOT to:
- replace users
- simulate AGI
- act like a chatbot
- create flashy AI theatrics

Its role IS to:
- reduce ambiguity
- surface operational risks
- improve execution clarity
- support strategic decisions
- reinforce venture awareness
- provide contextual intelligence

The AI system should feel:
- calm
- embedded
- operational
- strategic
- believable
- quietly useful

---

# AI Philosophy

## Core Principle

The AI assistant should behave like:
> venture operating intelligence.

NOT:
> conversational AI entertainment.

This distinction is extremely important.

---

# AI Should Help Users

- understand execution risk
- identify ambiguity
- improve prioritization
- evaluate roadmap confidence
- detect operational bottlenecks
- make better venture decisions

---

# AI Should NOT

- behave emotionally
- use conversational filler
- generate long essays
- simulate autonomous agents
- pretend to be human
- overwhelm users with analysis
- create constant interruptions

---

# Core UX Goals

Users should feel:
- supported
- informed
- strategically aware
- operationally confident

The AI system should answer:

| Question | Purpose |
|---|---|
| What is risky? | Operational awareness |
| What lacks clarity? | Execution quality |
| What may slip? | Delivery visibility |
| Which initiatives are weak? | Strategic evaluation |
| What should be split? | Scope refinement |
| What should be stopped? | Venture discipline |

---

# Experience Principles

## 1. Embedded Intelligence

AI should feel:
- integrated into workflows
- context-aware
- ambient

NOT:
- isolated in a chatbot window

The AI should appear:
- within issues
- within roadmap items
- within dashboard insights
- within operational context

---

## 2. Concise Operational Output

AI outputs should be:
- compact
- readable
- strategically useful
- operationally actionable

Avoid:
- verbose explanations
- excessive reasoning chains
- generic AI language

---

## 3. Calm Strategic Tone

AI tone should feel:
- operational
- focused
- confident
- restrained

Avoid:
- excitement
- humor
- emotional tone
- marketing language

---

## 4. Believable Intelligence

The AI should feel:
> operationally intelligent.

NOT:
> magically omniscient.

Avoid:
- fake predictive certainty
- unrealistic AI claims
- exaggerated intelligence

---

# AI System Architecture Philosophy

## AI Type

The system uses:
> mocked operational intelligence.

There is NO requirement for:
- real LLM integration
- inference infrastructure
- streaming responses
- conversational memory
- autonomous agents

The focus is:
> believable product behavior.

---

# AI Context Sources

AI insights should derive from:
- issue metadata
- roadmap state
- overdue work
- linked dependencies
- confidence changes
- venture conditions
- execution patterns

---

# AI Operating Areas

The AI system operates across:
- Issues
- Roadmap
- Dashboard
- Venture health visibility

---

# Core AI Behaviors

# 1. Issue Summarization

## Purpose

Help users:
- quickly understand issues
- reduce scanning overhead
- improve async collaboration

---

# Example Output

```txt
Summary:
User onboarding redesign initiative focused on reducing first-session drop-off through simplified activation flow improvements.
```

---

# Trigger Conditions

Summaries may appear:
- inside issue drawers
- inside AI panels
- on hover previews
- within dashboard insights

---

# UX Rules

Summaries should:
- remain concise
- preserve operational clarity
- avoid excessive detail

---

# 2. Delivery Risk Detection

## Purpose

Surface:
- execution concerns
- operational blockers
- delivery instability

This is one of the MOST important AI behaviors.

---

# Risk Detection Signals

AI can evaluate:
- overdue issues
- blocked dependencies
- missing acceptance criteria
- excessive scope
- unresolved research work
- roadmap confidence decline

---

# Risk Levels

```ts
type RiskLevel =
  | "low"
  | "medium"
  | "high"
```

---

# Example Output

```txt
Risk Level: High

Reason:
The initiative contains unresolved research dependencies and accumulated overdue implementation work.

Suggested Action:
Separate validation work from delivery execution.
```

---

# UX Rules

Risk insights should:
- feel calm
- avoid alarm fatigue
- remain actionable
- stay concise

Avoid:
- aggressive warnings
- panic language
- enterprise alert styling

---

# 3. Missing Acceptance Criteria Detection

## Purpose

Help improve:
- execution clarity
- delivery readiness
- scope definition

---

# Detection Signals

AI can identify:
- vague issue descriptions
- missing success metrics
- unclear validation goals
- undefined outcomes

---

# Example Output

```txt
Missing Criteria Detected:
The issue does not define measurable onboarding success metrics.
```

---

# Suggested Recommendations

AI may suggest:
- adding metrics
- defining outcomes
- splitting ambiguity
- clarifying scope

---

# 4. Priority Recommendations

## Purpose

Support:
- execution prioritization
- operational focus
- delivery sequencing

---

# Recommendation Signals

AI may evaluate:
- roadmap importance
- overdue state
- linked initiative risk
- issue dependencies
- venture momentum

---

# Example Output

```txt
Suggested Priority: High

Reason:
The issue is linked to an active onboarding initiative with declining confidence.
```

---

# Important UX Rule

Recommendations should feel:
- advisory
- contextual
- operational

NOT:
- authoritative
- prescriptive
- absolute

---

# 5. Continue / Split / Kill Recommendations

## Purpose

This is a CORE differentiator.

The AI should help teams:
- reduce wasted execution
- improve focus
- normalize strategic discipline

This strongly aligns with:
- venture-building philosophy
- lean execution
- rapid validation culture

---

# Continue Recommendations

Used when:
- execution momentum is healthy
- confidence remains stable
- progress is consistent

---

# Split Recommendations

Used when:
- scope is too broad
- ambiguity is high
- discovery and delivery are mixed

---

# Kill Recommendations

Used when:
- confidence collapses
- execution stagnates
- validation weakens
- strategic value decreases

---

# Example Output

```txt
Recommendation: Split Initiative

Reason:
Research uncertainty and implementation delivery are currently combined into a single roadmap initiative.

Suggested Structure:
- Discovery validation initiative
- Delivery implementation initiative

Confidence:
84%
```

---

# AI Dashboard Insights

## Purpose

Provide:
- portfolio awareness
- strategic observations
- operational intelligence summaries

---

# Example Dashboard Insights

```txt
Sentra execution confidence declined after accumulation of unresolved onboarding research work.
```

```txt
Internal Ops momentum improved after reducing active work-in-progress load.
```

```txt
Reson8 contains multiple roadmap initiatives with declining confidence trends.
```

---

# Insight Philosophy

Insights should feel:
- strategic
- observational
- concise
- operationally grounded

---

# AI Roadmap Analysis

## Purpose

Help users:
- evaluate initiative health
- understand uncertainty
- identify execution risk

---

# Roadmap AI Signals

AI may analyze:
- confidence decline
- overdue execution
- blocked dependencies
- issue completion velocity
- initiative fragmentation

---

# Example Output

```txt
Confidence Trend: Declining

Reason:
Execution progress slowed after unresolved dependency accumulation across linked implementation tasks.
```

---

# AI UI Structure

# Primary AI Presentation Modes

## Embedded Insight Cards

Used inside:
- issue drawers
- roadmap drawers
- dashboard panels

---

## Contextual Analysis Panels

Used for:
- risk visibility
- recommendation summaries
- confidence explanations

---

## Lightweight Assistant Sidebar

Optional persistent operational intelligence layer.

Should feel:
- quiet
- supportive
- contextual

---

# AI UI Rules

Avoid:
- chat bubbles
- avatars
- typing animations
- fake streaming
- conversational windows
- anthropomorphic behavior

Prefer:
- structured blocks
- operational cards
- concise panels
- contextual insights

---

# AI Response Structure

## Recommended Format

```txt
Observation:
...

Reason:
...

Suggested Action:
...

Confidence:
...
```

---

# AI Tone Guidelines

## Must Feel

- operational
- calm
- intelligent
- concise
- strategic

---

## Must Avoid

- excitement
- emotional language
- emoji usage
- motivational copy
- conversational filler
- marketing tone

---

# Example Good Output

```txt
Observation:
Roadmap confidence declined due to unresolved onboarding dependencies.

Suggested Action:
Reduce active scope and prioritize dependency resolution.

Confidence:
79%
```

---

# Example Bad Output

```txt
🚨 Big problem detected!

Your roadmap is struggling badly and needs immediate attention ASAP!
```

---

# AI Confidence Philosophy

Confidence scores should feel:
- lightweight
- directional
- believable

NOT:
- mathematically precise
- predictive
- scientific

---

# Confidence Scale

```ts
0 → 100
```

---

# Confidence Interpretation

| Range | Meaning |
|---|---|
| 80–100 | Strong confidence |
| 60–79 | Moderate confidence |
| 40–59 | Uncertain |
| 0–39 | High risk |

---

# AI Synchronization Rules

# Issue Changes Affect

- AI risk analysis
- priority recommendations
- roadmap confidence
- venture health

---

# Roadmap Changes Affect

- confidence analysis
- strategic recommendations
- dashboard observations

---

# Overdue Work Affects

- risk escalation
- confidence decline
- delivery concern signals

---

# Venture Switching Affects

- AI operational context
- dashboard observations
- roadmap recommendations
- issue analysis

Transitions should feel:
- instant
- contextual
- stable

---

# Suggested AI Components

```txt
AiInsightCard
AiRiskPanel
AiRecommendationBlock
AiConfidenceIndicator
AiIssueSummary
AiRoadmapAnalysis
AiOperationalInsights
AiRecommendationBadge
AiAttentionPanel
```

---

# Visual Design Rules

## Must Feel

- embedded
- premium
- calm
- operational
- strategically intelligent

---

## Must Avoid

- chatbot styling
- flashy AI branding
- glowing animations
- anthropomorphic AI
- noisy notifications
- excessive AI surfaces

---

# Motion Rules

Motion should feel:
- restrained
- subtle
- contextual

Use motion for:
- insight reveal
- contextual transitions
- confidence updates
- panel transitions

Avoid:
- typing animations
- streaming theatrics
- flashy AI movement

---

# Empty States

AI empty states should feel:
- intentional
- calm
- operational

Example:

```txt
No significant operational risks detected.
```

NOT:

```txt
🤖 Everything looks amazing today!
```

---

# Loading States

Use:
- subtle shimmer
- lightweight placeholders
- calm transitions

Loading should feel:
- stable
- premium
- non-disruptive

---

# Anti-Patterns

DO NOT:
- build chatbot-first UX
- simulate autonomous agents
- add fake streaming responses
- create AI gimmicks
- overload users with analysis
- create overly verbose recommendations
- use anthropomorphic language
- pretend AI is always correct
- generate excessive insights

---

# Success Criteria

The AI Assistant succeeds when users feel:

> "The system helps me make better operational decisions."

AND:

> "The intelligence feels contextual and believable."

NOT:

> "This is another flashy AI chatbot."

---

# Final AI Assistant North Star

The AI Assistant should feel like:

> "A quiet layer of operational intelligence embedded inside venture execution workflows."

Every implementation decision should reinforce:
- strategic clarity
- operational usefulness
- venture awareness
- believable intelligence
- calm UX
- premium restraint