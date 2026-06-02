# Problem And Solution Space

## Purpose

This document explains how I broke down the product problem before building
Foundary.

It is meant to be interviewer-friendly: concise, visual, and focused on the
thinking behind the solution.

Foundary was not designed as "another task manager." It was designed around one
core question:

> How can a venture studio coordinate multiple ventures with speed, clarity, and
> strategic confidence, without creating operational chaos?

---

## 1. The Venture Builder Problem

![The Venture Builder Problem](../assets/The%20Venture%20Builder%20Problem.png)

Traditional product tools work very well when the model is simple:

- one product
- one team
- one roadmap
- one backlog
- clear priorities

Venture studios are different. They operate across multiple ventures at once.
Each venture may have different goals, risks, teams, maturity, roadmaps, and
experiments.

That means the real problem is not task management. The real problem is
coordination across uncertainty.

### What This Means For The Product

Foundary needed to support:

- multiple venture contexts
- shared builders and PMs
- portfolio-level visibility
- venture-specific roadmaps and issues
- constant learning and reprioritization

The product had to feel calm even though the operating environment is complex.

---

## 2. The Philosophy Shift

![The Philosophy Shift](../assets/The%20Philosophy%20Shift.png)

Linear inspired the execution quality: speed, clarity, focus, and low-friction
workflows.

But the product philosophy had to change.

Linear asks:

> How do we help a team ship software faster?

Foundary asks:

> How do we help multiple ventures find momentum without creating operational
> chaos?

### The Shift

| Linear Mindset | Foundary Mindset |
| --- | --- |
| Build features | Build ventures |
| Product roadmap | Venture roadmap |
| Team visibility | Portfolio visibility |
| Engineering execution | Venture execution |
| Ship work | Validate assumptions |
| Product success | Venture success |
| One context | Many contexts |

### What This Means For The Product

The product should not only show whether work is moving. It should help answer:

- Which ventures are gaining momentum?
- Which initiatives are losing confidence?
- Where should attention go next?
- Which work should continue, split, pause, or stop?

---

## 3. The Product Adaptations

![The Product Adaptations](../assets/The%20Product%20Adaptations.png)

The solution was to adapt a Linear-inspired product into a venture builder
operating system.

The main adaptations were:

1. Venture layer  
   Ventures become the primary operating unit, not projects.

2. Portfolio visibility  
   Operators can see execution and risk across multiple ventures at a glance.

3. Outcome-based roadmaps  
   Roadmaps focus on goals, validation, confidence, and outcomes.

4. Confidence layer  
   Progress alone is not enough. The product also tracks whether confidence is
   rising or falling.

5. AI as operational intelligence  
   AI analyzes context and gives strategic recommendations, not just answers.

6. Normalize killing work  
   Stopping low-value work is treated as learning, not failure.

### What This Means For The Product

Foundary became structured around ventures instead of teams or projects.

Each venture can have:

- dashboard view
- issues
- roadmap
- AI insights

This keeps the product familiar enough to understand quickly, but adapted enough
to feel purpose-built for venture studios.

---

## 4. The Operating Model

![The Operating Model](../assets/The%20Operating%20Model.png)

The final operating model has three connected layers.

| Layer | Purpose | Product Surface |
| --- | --- | --- |
| Portfolio Layer | Understand venture health, risk, and attention areas | Dashboard |
| Strategy Layer | Track goals, outcomes, confidence, and initiative quality | Roadmap |
| Execution Layer | Move daily work forward and unblock delivery | Issues |

AI is embedded across these layers. It is not a chatbot sitting outside the
workflow.

### Information Flow

```txt
Issue updated
-> Roadmap progress changes
-> Venture health updates
-> Dashboard refreshes
-> AI recomputes insights
```

This creates a connected product experience. A change in execution can affect
strategy, portfolio health, and recommended next actions.

### What This Means For The Product

Foundary optimizes for:

- portfolio velocity
- venture outcomes
- execution confidence
- learning and adaptation

It does not only ask:

> What are we building?

It also asks:

> Which ventures are healthy, which initiatives matter, and where should we
> focus next?

---

## What I Intentionally Avoided

I intentionally avoided building a heavy enterprise product.

Foundary does not focus on:

- authentication
- permissions
- billing
- backend infrastructure
- comments
- notifications
- complex settings
- enterprise reporting
- chatbot-first AI
- Mini Jira behavior

Those choices were deliberate. The assignment was stronger if the product stayed
focused on product thinking, operational clarity, and venture studio adaptation.

---

## The Solution In One Sentence

Foundary connects portfolio visibility, outcome-based roadmaps, execution
workflows, and embedded AI intelligence so venture studios can see what needs
attention, why it matters, and what to do next.

---

## Interviewer Takeaway

The product is not only a Linear-inspired interface.

It is my answer to a specific operating problem:

> Venture studios need to coordinate multiple ventures with speed, clarity, and
> strategic confidence, without adding operational weight.
