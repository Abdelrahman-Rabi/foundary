# Feature Specification — Copy Hierarchy & Product Language

## Purpose

This file defines the copy hierarchy, naming system, microcopy rules, and decision-first language patterns for Foundary.

Foundary has evolved from:

> a venture execution workspace

into:

> a studio operating intelligence layer.

The product should now help venture studios decide:

* what to continue
* what to narrow
* what to pause
* what to kill
* where to staff up
* where to defer effort

The purpose of this file is to make sure the UI language clearly communicates that value without requiring verbal explanation.

This is not a marketing copy file.

This is an implementation guide for product language inside the application.

---

# Core Copy Goal

The app should make the user understand:

> Foundary helps venture studios decide where to focus next.

Every major piece of UI copy should support that idea.

The interface should not sound like:

> project management software.

It should sound like:

> evidence-backed studio decision support.

---

# The Main Clarity Problem

Foundary currently contains strong product ideas, but the language can still feel too abstract or too close to generic PM tooling.

The user should not need to ask:

* What is this product?
* What should I do first?
* Why is this different from Linear?
* How do Evidence, Bets, Command Center, and Studio Analyst connect?
* What is the actual decision I should make?

The copy must reduce this confusion.

---

# Target Aha Moment

Within 30 seconds, the user should understand:

```txt
Foundary shows which venture needs attention, why it needs attention, what move is recommended, what evidence supports that move, and what capacity tradeoff is involved.
```

The target user feeling:

> “I can see where the studio should focus next.”

---

# Global Copy Principles

## 1. Decision Language Over Tool Language

Prefer language that helps the studio decide.

Use:

```txt
Recommended Move
Missing Proof
Capacity Impact
Evidence Behind This
Ventures Needing Attention
Bets Losing Confidence
```

Avoid:

```txt
Task
Ticket
Project
Workflow
Analytics
Report
AI Output
Insight Feed
```

---

## 2. Evidence Language Over Issue Language

Foundary should not feel like an issue tracker with renamed pages.

When possible, frame work as evidence.

Use:

```txt
Evidence Item
Supports
Evidence Role
Decision Impact
Proof Needed
Validation Signal
```

Avoid overusing:

```txt
Issue
Task
Ticket
Priority
Epic
Story
```

---

## 3. Studio Moves Over Generic Status

The product should normalize venture studio decisions.

Use:

```txt
Continue
Narrow
Pause
Kill
Staff up
Defer
Partner review
```

Avoid:

```txt
Open
Closed
Active
Inactive
Completed
Archived
```

Generic statuses may still exist internally, but user-facing language should prioritize studio decisions.

---

## 4. Clear Before Clever

The UI should be easy to understand before it feels sophisticated.

Prefer:

```txt
Why now
What changed
Missing proof
Capacity affected
Next action
```

Avoid:

```txt
Strategic operating vector
Decision intelligence stream
Portfolio cognition
Validation telemetry
```

The product note can carry deeper strategic language.

The app UI must help users act.

---

## 5. Calm Operational Tone

The tone should feel:

* concise
* calm
* serious
* operational
* evidence-backed
* confident

Avoid:

* playful copy
* hype language
* emojis
* celebratory wording
* motivational phrases
* AI-personality language

Good:

```txt
Evidence added.
```

Bad:

```txt
Great work! Your evidence is now live 🚀
```

---

# Global Decision Pattern

Every major surface should support this pattern:

```txt
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

This pattern should appear across:

* Command Center
* Evidence
* Bets
* Studio Analyst
* drawers
* cards
* empty states
* action panels

---

# Product Naming Rules

## Product Category

Use:

```txt
Studio operating system
Studio command center
Evidence-backed venture decisions
Studio operating intelligence
```

Use carefully:

```txt
Venture execution platform
AI-native venture execution OS
```

Avoid in UI:

```txt
Project management
Task management
Dashboard software
Roadmap tracker
AI chatbot
```

---

# Primary Navigation Labels

Use this navigation language:

```txt
Command Center
Evidence
Bets
Studio Analyst
```

Do not use:

```txt
Dashboard
Issues
Roadmap
AI Assistant
```

Those older labels may exist in code internally, but user-facing labels should reflect the repositioned product.

---

# Navigation Label Meaning

## Command Center

Meaning:

> The decision overview layer.

Purpose:

* shows the most important studio move
* surfaces ventures needing attention
* connects evidence, confidence, and capacity
* helps the studio decide where to focus next

Avoid describing it as:

```txt
Dashboard
Analytics
Overview
Reports
```

---

## Evidence

Meaning:

> The work and signals behind studio decisions.

Purpose:

* shows what is proving traction
* shows what is exposing risk
* shows what is consuming capacity
* links execution to bets and decisions

Avoid describing it as:

```txt
Issues
Tasks
Tickets
Work items
```

---

## Bets

Meaning:

> Venture initiatives being tested before committing more capacity.

Purpose:

* shows what the studio is testing
* shows confidence
* shows missing proof
* shows recommended studio moves

Avoid describing it as:

```txt
Roadmap
Projects
Features
Epics
```

---

## Studio Analyst

Meaning:

> The decision-support layer.

Purpose:

* recommends studio moves
* explains reasoning
* links to evidence
* highlights capacity tradeoffs

Avoid describing it as:

```txt
AI Assistant
Chatbot
AI Feed
Insights Bot
```

---

# Global Label Replacement Map

Use these replacements consistently.

| Old / Generic Label           | New UI Label               |
| ----------------------------- | -------------------------- |
| Dashboard                     | Command Center             |
| Issues                        | Evidence                   |
| Issue                         | Evidence Item              |
| New Issue                     | Add Evidence               |
| Roadmap                       | Bets                       |
| Roadmap Item                  | Bet                        |
| New Roadmap Item              | Add Bet                    |
| AI Assistant                  | Studio Analyst             |
| AI Insight                    | Analyst Recommendation     |
| Studio Analyst Recommendation | Recommended Move           |
| Portfolio Attention Queue     | Ventures Needing Attention |
| Validation Gates              | Validation Checkpoints     |
| Execution Evidence            | Evidence                   |
| Operator Capacity             | Team Capacity              |
| Evidence Gaps                 | Missing Proof              |
| High-risk Signals             | Urgent Decisions           |
| Declining Initiatives         | Bets Losing Confidence     |
| Open Issue                    | View Evidence              |
| Open Roadmap                  | Open Bet                   |
| Inspect Signal                | Inspect Reasoning          |
| Priority                      | Decision Impact            |
| Type                          | Evidence Role              |
| Linked Roadmap                | Supported Bet              |
| Progress                      | Execution Progress         |
| Confidence                    | Validation Confidence      |

---

# Recommended Move Language

## Allowed Move Values

```ts
type RecommendedMove =
  | "continue"
  | "narrow"
  | "pause"
  | "kill"
  | "staff-up"
  | "defer"
  | "partner-review"
```

---

## Move Definitions

### Continue

Use when:

* validation confidence is healthy
* evidence supports the current direction
* capacity usage is justified

UI copy:

```txt
Continue
Evidence supports the current direction.
```

---

### Narrow

Use when:

* there is some signal
* scope is too broad
* capacity is being consumed faster than proof is improving

UI copy:

```txt
Narrow
Reduce scope and focus only on the strongest validation path.
```

---

### Pause

Use when:

* confidence is weak
* execution is active
* capacity is at risk
* more evidence is needed before continuing

UI copy:

```txt
Pause
Stop broad execution until the missing proof is resolved.
```

---

### Kill

Use when:

* confidence is low
* evidence contradicts the bet
* continued execution would waste capacity

UI copy:

```txt
Kill
Stop this bet and redirect capacity.
```

---

### Staff up

Use when:

* confidence is strong
* the opportunity is constrained by limited team capacity

UI copy:

```txt
Staff up
Add capacity to avoid slowing a validated opportunity.
```

---

### Defer

Use when:

* the idea may be useful later
* now is not the right time
* capacity is better used elsewhere

UI copy:

```txt
Defer
Keep the bet visible, but do not spend capacity now.
```

---

### Partner review

Use when:

* the decision requires leadership judgment
* the tradeoff is strategic
* evidence is mixed or high-stakes

UI copy:

```txt
Partner review
Escalate for a studio-level decision.
```

---

# Screen Copy System

## 1. Command Center

### Screen Purpose

The Command Center should answer:

```txt
What should the studio do next?
```

It should not feel like a KPI dashboard.

It should feel like the first place a studio operator goes to decide where attention should move.

---

## Command Center Page Title

Use:

```txt
Command Center
```

---

## Command Center Subtitle

Use:

```txt
Decide which ventures deserve more studio attention — and which ones are consuming capacity without enough evidence.
```

Alternative shorter version:

```txt
Decide where the studio should focus next.
```

Avoid:

```txt
Portfolio dashboard and operational metrics.
```

---

## Command Center Hero Pattern

The first viewport should prioritize one dominant decision.

Use this structure:

```txt
Recommended Move: Narrow Reson8

Why now
Reson8 is consuming product and engineering capacity, but retention evidence is still weak.

Studio decision
Pause broad buildout. Continue only the retained-creator threshold experiment.

Supporting evidence
Validation confidence: 23%
Capacity pressure: High
Missing proof: Retained creator signal

Next action
Inspect evidence
```

---

## Command Center Section Labels

Use:

```txt
Recommended Move
Why Now
Ventures Needing Attention
Evidence Behind This Decision
Validation Checkpoints
Team Capacity Pressure
Supporting Signals
Next Action
```

Avoid:

```txt
Portfolio Overview
KPI Summary
Analytics
Reports
AI Insights
Operational Metrics
```

---

## Command Center CTA Labels

Use:

```txt
Inspect evidence
Open bet
Review reasoning
Compare ventures
View capacity impact
```

Avoid:

```txt
Open issue
Open roadmap
View details
Learn more
Analyze now
```

---

# 2. Evidence Screen

## Screen Purpose

Evidence should answer:

```txt
What work or signal supports the studio decision?
```

It should feel familiar like Linear, but its language must make clear that work exists to prove, disprove, unblock, or de-risk a decision.

---

## Evidence Page Title

Use:

```txt
Evidence
```

---

## Evidence Subtitle

Use:

```txt
Track the work behind each studio decision — what is proving traction, exposing risk, or consuming capacity without enough evidence.
```

Shorter version:

```txt
Track the signals behind each studio decision.
```

Avoid:

```txt
Manage issues and execution tasks.
```

---

## Evidence Table Columns

Use:

```txt
Evidence Item
Supports
Role
Status
Owner
Impact
Venture
```

Avoid:

```txt
Issue
Priority
Type
Due Date
Linked Roadmap
```

Due date can still appear as secondary metadata, but it should not dominate the table.

---

## Evidence Role Values

Use:

```txt
Proving
Disproving
Unlocking
De-risking
Challenging
Capacity Cost
```

---

## Evidence Role Definitions

### Proving

Use when the work supports the bet.

```txt
Proving
This evidence strengthens the bet.
```

---

### Disproving

Use when the work weakens or contradicts the bet.

```txt
Disproving
This evidence challenges the current direction.
```

---

### Unlocking

Use when the work removes a blocker.

```txt
Unlocking
This work unlocks the next decision or delivery step.
```

---

### De-risking

Use when the work reduces uncertainty.

```txt
De-risking
This work reduces execution or validation risk.
```

---

### Challenging

Use when the work creates a decision concern.

```txt
Challenging
This signal may force a change in direction.
```

---

### Capacity Cost

Use when the item mainly represents effort pressure.

```txt
Capacity Cost
This work is consuming team capacity.
```

---

## Evidence CTA Labels

Use:

```txt
Add Evidence
View Evidence
Link to Bet
Inspect Reasoning
Review Source
```

Avoid:

```txt
New Issue
Open Issue
Create Task
View Ticket
```

---

## Evidence Card Pattern

For board cards, use this information order:

```txt
Evidence title

Supports: Creator Retention Signal
Role: Challenging
Decision impact: May force Narrow
Owner: Lina
```

The board should still feel operational, but every card should answer:

```txt
Evidence for what?
```

---

## Evidence Drawer Copy Pattern

The drawer should include:

```txt
Decision Supported
What this evidence is testing
Evidence Role
Capacity Impact
Connected Bet
Recommended Next Action
```

Avoid drawer sections like:

```txt
Task Details
Issue Info
Ticket Metadata
```

---

# 3. Bets Screen

## Screen Purpose

Bets should answer:

```txt
What is the studio testing before committing more time, talent, or capital?
```

Bets should not feel like a generic roadmap.

They should feel like validation commitments.

---

## Bets Page Title

Use:

```txt
Bets
```

---

## Bets Subtitle

Use:

```txt
Bets are the venture initiatives your studio is testing before committing more time, talent, or capital.
```

Shorter version:

```txt
Track what the studio is testing before committing more capacity.
```

Avoid:

```txt
Roadmap items grouped by Now, Next, Later.
```

---

## Bet Card Information Order

Each bet card should show:

```txt
Title
Testing statement
Validation Confidence
Execution Progress
Recommended Move
Missing Proof
Evidence Count
Capacity Impact
```

---

## Bet Card Example

```txt
Creator Retention Signal Validation

Testing
Define the retained-creator threshold for a continue, narrow, or stop decision.

Validation confidence
23%

Execution progress
0%

Recommended move
Narrow

Missing proof
Weekly retained creator signal

Capacity impact
Product + Engineering

4 evidence items · 0 complete
```

---

## Bet Section Labels

Use:

```txt
Now
Next
Later
```

Keep these because they are simple and Linear-inspired.

But make sure cards explain:

```txt
what is being tested
what proof is missing
what move is recommended
```

---

## Bets CTA Labels

Use:

```txt
Add Bet
Open Bet
Review Missing Proof
View Evidence
Inspect Capacity Impact
```

Avoid:

```txt
Create Roadmap
Open Roadmap
Add Initiative
View Project
```

---

## Bets Filter Labels

Use:

```txt
All moves
Continue
Narrow
Pause
Kill
Staff up
Defer
Partner review
```

Optional secondary filters:

```txt
Low confidence
Missing proof
High capacity impact
Needs review
```

---

## Progress vs Confidence Copy Rule

When progress is higher than validation confidence, expose it clearly.

Use:

```txt
Execution is moving, but validation confidence remains weak.
```

Alternative:

```txt
Work is progressing faster than proof.
```

Avoid hiding this tension.

This tension is one of Foundary’s strongest differentiators.

---

# 4. Studio Analyst Screen

## Screen Purpose

Studio Analyst should answer:

```txt
What is the highest-leverage studio move, and why?
```

It should not feel like a chatbot or generic AI assistant.

---

## Studio Analyst Page Title

Use:

```txt
Studio Analyst
```

---

## Studio Analyst Subtitle

Use:

```txt
Review recommended studio moves, the evidence behind them, and the capacity tradeoffs they create.
```

Shorter version:

```txt
Review what the studio should do next — and why.
```

Avoid:

```txt
AI assistant insights and recommendations.
```

---

## Studio Analyst Hero Pattern

The page should open with one dominant recommendation.

Use:

```txt
Recommended Move

Pause Reson8 build and narrow validation focus.

Why
Retention evidence is weak while engineering and design capacity are being consumed.

Next
Stop broad build work. Continue only retained-creator threshold validation.

Source evidence
3 evidence items · 1 bet · 2 capacity signals

Capacity impact
Protects engineering capacity for Sentra activation work.

Actions
Inspect evidence
Open bet
```

---

## Analyst Feed Labels

Use:

```txt
Recommendations
Urgent Decisions
Missing Proof
Bets Losing Confidence
Capacity Tradeoffs
Source Evidence
```

Avoid:

```txt
AI Feed
AI Output
Signals
High-risk Signals
Insight Stream
```

---

## Studio Analyst CTA Labels

Use:

```txt
Inspect evidence
Open bet
Review source
Inspect reasoning
View capacity impact
```

Avoid:

```txt
Ask AI
Chat
Generate
Explain more
Open issue
Open roadmap
```

---

## AI Framing Rules

Do not use:

```txt
AI says
The assistant thinks
Chat with AI
Ask me anything
```

Use:

```txt
Recommended move
Reasoning
Source evidence
Capacity impact
Confidence
```

The analyst should feel like embedded operating intelligence.

---

# 5. Drawers

## Drawer Copy Purpose

Drawers should preserve context and explain the decision linkage.

Every drawer should make the user understand:

```txt
Why does this item matter?
What decision is it connected to?
What should happen next?
```

---

## Evidence Drawer Sections

Use:

```txt
Decision Supported
Evidence Role
What This Tests
Source Notes
Capacity Impact
Connected Bet
Recommended Next Action
```

---

## Bet Drawer Sections

Use:

```txt
What We Are Testing
Validation Confidence
Missing Proof
Evidence Linked
Capacity Impact
Recommended Move
Next Action
```

---

## Analyst Drawer Sections

Use:

```txt
Recommended Move
Why
Source Evidence
Capacity Impact
Confidence
Next Action
```

---

# 6. Empty States

## Empty State Rules

Empty states should be calm and operational.

They should explain what is missing and what to do next.

Avoid playful or celebratory language.

---

## Good Empty States

### Command Center

```txt
No urgent studio decisions detected.
```

```txt
All active ventures have enough evidence for their current level of capacity.
```

---

### Evidence

```txt
No evidence matches the current filters.
```

```txt
Add evidence to connect execution work to a studio decision.
```

---

### Bets

```txt
No bets in this timeframe.
```

```txt
Add a bet when the studio is testing whether to continue, narrow, pause, or kill an initiative.
```

---

### Studio Analyst

```txt
No urgent recommendations detected.
```

```txt
Recommendations appear when evidence, confidence, or capacity signals suggest a studio move.
```

---

## Bad Empty States

Do not use:

```txt
Nothing here yet!
```

```txt
You're all caught up 🎉
```

```txt
Start your journey!
```

```txt
No data available.
```

---

# 7. Toasts & Feedback

## Toast Tone

Toasts should be:

* short
* calm
* action-confirming
* non-celebratory

---

## Toast Examples

Use:

```txt
Evidence added.
Bet updated.
Recommended move saved.
Filters applied.
Evidence linked to bet.
Capacity impact updated.
```

Avoid:

```txt
Awesome!
Great job!
Successfully completed your amazing action!
```

---

# 8. Loading States

## Loading Copy

Use loading copy sparingly.

Prefer skeletons and subtle transitions.

If text is needed, use:

```txt
Loading evidence...
Updating recommendation...
Refreshing studio signals...
```

Avoid:

```txt
Working magic...
AI is thinking...
Preparing awesomeness...
```

---

# 9. Error States

## Error Tone

Errors should be clear and calm.

Use:

```txt
Could not update evidence. Try again.
Could not refresh recommendations.
Could not open this bet.
```

Avoid:

```txt
Oops!
Something went wrong!!!
The AI failed.
```

---

# 10. Confirmation Copy

Avoid excessive confirmations.

Use confirmations only for destructive or strategic actions.

---

## Kill Bet Confirmation

Use:

```txt
Kill this bet?

This will mark the bet as intentionally stopped and release its planned capacity.

You can still view its evidence later.
```

CTA:

```txt
Kill bet
Cancel
```

---

## Pause Bet Confirmation

Use:

```txt
Pause this bet?

This will stop broad execution until missing proof is resolved.
```

CTA:

```txt
Pause bet
Cancel
```

---

# 11. Search & Filter Copy

## Search Placeholders

### Evidence

```txt
Search evidence, owner, venture, or supported bet...
```

### Bets

```txt
Search bets, ventures, proof, or recommended moves...
```

### Studio Analyst

```txt
Search recommendations, evidence, or ventures...
```

---

## Filter Labels

Use:

```txt
Move
Venture
Confidence
Impact
Evidence Role
Capacity
Status
```

Avoid complex labels like:

```txt
Advanced filtering
Query builder
Workflow state
```

---

# 12. Data Field Naming

## Evidence Fields

Use:

```ts
evidenceTitle
supports
evidenceRole
decisionImpact
capacityImpact
connectedBetId
recommendedMove
```

Prefer these for user-facing fields.

Existing internal fields like `issue`, `priority`, or `roadmapId` can remain only if refactoring is not worth it.

---

## Bet Fields

Use:

```ts
betTitle
testingStatement
validationConfidence
executionProgress
recommendedMove
missingProof
capacityImpact
linkedEvidenceIds
```

---

## Analyst Fields

Use:

```ts
recommendedMove
why
sourceEvidence
capacityImpact
confidence
nextAction
```

---

# 13. Microcopy Anti-Patterns

Do not use:

* chatbot language
* playful AI copy
* generic PM language
* enterprise reporting language
* unclear strategy jargon
* excessive abstraction
* celebratory UX
* fake urgency
* vague insights
* decorative copy

---

# 14. Preferred Vocabulary

Use frequently:

```txt
decision
evidence
proof
capacity
confidence
move
focus
narrow
pause
continue
kill
validation
signal
reasoning
source
tradeoff
```

Use carefully:

```txt
strategy
portfolio
intelligence
operating system
command center
```

Avoid overusing:

```txt
AI
dashboard
analytics
project
task
issue
ticket
epic
workflow
automation
```

---

# 15. Screen-to-Screen Narrative

The copy should support this demo story:

```txt
1. Command Center recommends narrowing Reson8.

2. Evidence shows which work and signals caused that recommendation.

3. Bets shows the validation bet losing confidence.

4. Studio Analyst explains the reasoning, capacity tradeoff, and recommended next action.
```

All links and CTAs should reinforce this narrative.

---

# 16. Implementation Guidance For Agents

When editing UI copy:

1. Replace generic PM labels with decision-first labels.
2. Keep the UI compact and calm.
3. Do not add onboarding tours or explanatory modals.
4. Do not add new product areas.
5. Use the same decision pattern across screens.
6. Make evidence and capacity visible where possible.
7. Preserve the Linear-inspired speed and density.
8. Avoid chatbot-style AI language.
9. Ensure every main screen answers: what should we do next and why?
10. Prefer small copy changes before layout rewrites.

---

# 17. Acceptance Criteria

This feature is complete when:

* primary navigation uses Command Center, Evidence, Bets, and Studio Analyst
* generic labels like Issues, Roadmap, and AI Assistant are removed from user-facing UI
* Command Center opens with a clear recommended move
* Evidence items clearly show what decision or bet they support
* Bets show recommended move, missing proof, confidence, and capacity impact
* Studio Analyst starts with one dominant recommendation
* all major surfaces use decision-first language
* empty states, toasts, and errors use calm operational copy
* no chatbot-style AI language appears
* no playful or celebratory copy appears
* the product is easier to understand without adding feature complexity

---

# Final Copy North Star

Foundary copy should make the product feel like:

> a compact, Linear-inspired command center for evidence-backed venture studio decisions.

Every sentence should help the user understand:

```txt
What should the studio do next?
Why?
What evidence supports it?
What capacity is affected?
What is the next action?
```
