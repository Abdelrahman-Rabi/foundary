# Feature Specification — Polish & Submission Readiness

## Purpose

This file defines the final polish, quality, and submission-readiness standards for Foundary.

At this stage, the product should already have:

* Command Center
* Evidence
* Bets
* Studio Analyst
* seeded demo story
* cross-screen decision narrative
* decision-first copy hierarchy

The goal now is not to add more features.

The goal is to make the existing product feel:

> clear, premium, coherent, fast, and submission-ready.

This file should guide the AI coding agent through final refinement without introducing unnecessary scope.

---

# Final Product Quality Goal

Foundary should feel like:

> a calm, AI-native studio command center for venture operators.

It should not feel like:

> a dashboard-heavy project management clone.

The reviewer should quickly understand:

```txt id="b8gd71"
Foundary helps a venture studio decide what to continue, narrow, pause, kill, staff up, or defer based on evidence, validation confidence, and shared team capacity.
```

---

# Final Readiness North Star

The product is ready when a first-time reviewer can understand this within 30 seconds:

```txt id="q3s4c1"
Reson8 is moving, but proof is weak.
Foundary recommends narrowing the work before more capacity is wasted.
The recommendation is supported by evidence, a low-confidence bet, and capacity pressure.
```

That is the Aha moment.

---

# What This Phase Is

This phase is:

* copy cleanup
* hierarchy refinement
* interaction polish
* motion restraint
* visual consistency
* seeded data tuning
* cross-screen QA
* demo flow validation
* submission-readiness pass

---

# What This Phase Is Not

This phase is not:

* feature expansion
* redesign
* architecture rewrite
* backend implementation
* real AI integration
* database setup
* onboarding design
* settings expansion
* enterprise workflow buildout

Do not introduce new product scope.

---

# Final Product Principles

## 1. Clarity Before Cleverness

Every screen should be understandable without explanation.

Prefer:

```txt id="lmhq0f"
Recommended Move
Why
Evidence
Capacity Impact
Next Action
```

Avoid:

```txt id="my90i3"
Strategic signal intelligence matrix
Portfolio cognition layer
Operating telemetry engine
```

Deep strategy can live in the README and Product Note.

The app UI must help the user act quickly.

---

## 2. Decision-First Hierarchy

Every major screen should make the decision visible.

The user should not have to infer the decision from scattered metrics.

Use this order:

```txt id="yxaeqc"
1. What should the studio do?
2. Why?
3. What evidence supports it?
4. What capacity is affected?
5. What is the next action?
```

---

## 3. Evidence-Backed Trust

Every major recommendation should feel supported.

Recommendations should cite:

* source evidence
* connected bet
* validation confidence
* capacity impact
* next action

Avoid unsupported AI insight cards.

---

## 4. Linear-Inspired Restraint

Foundary should remain:

* compact
* calm
* fast
* dark-first
* scannable
* drawer-based
* low-friction
* premium
* operational

Avoid visual drama.

The product should feel like serious builder software.

---

## 5. Believable Sophistication Over Feature Quantity

The reviewer should feel product maturity because:

* workflows are connected
* data feels realistic
* AI is contextual
* motion is disciplined
* copy is clear
* decisions are source-linked

Not because the app has many features.

---

# Final Screen QA

Use this section to review each main screen.

---

# 1. Command Center QA

## Purpose

Command Center should create the Aha moment.

It should answer:

```txt id="z3bm3j"
What should the studio focus on next?
```

---

## Must Be True

Command Center is ready when:

* the first viewport shows one dominant Recommended Move
* Reson8 appears as the primary attention-needed venture
* the user can see why Reson8 needs attention
* supporting evidence is visible
* capacity impact is visible
* primary action is “Inspect evidence”
* secondary action is “Open bet”
* supporting panels explain the hero decision
* it does not feel like a generic KPI dashboard

---

## Required Hero Pattern

Use:

```txt id="m3v8mv"
Recommended Move: Narrow Reson8

Why now
Retention evidence is weak while product and engineering capacity are actively being consumed.

Studio decision
Stop broad onboarding buildout. Continue only retained-creator threshold validation.

Supporting evidence
Validation confidence: 23%
Capacity pressure: High
Missing proof: Weekly retained creator signal

Capacity impact
Protects product and engineering capacity for higher-confidence Sentra activation work.

Primary action
Inspect evidence
```

---

## Command Center Anti-Patterns

Do not allow:

* KPI cards to dominate the page
* multiple equal-weight hero cards
* vague “AI insight” panels
* generic dashboard language
* decorative charts
* onboarding banners
* long explanatory copy

---

# 2. Evidence QA

## Purpose

Evidence should show the source proof behind studio decisions.

It should answer:

```txt id="n8m0md"
What evidence supports or challenges this decision?
```

---

## Must Be True

Evidence is ready when:

* user-facing language says Evidence, not Issues
* primary CTA says Add Evidence
* every row/card shows what it supports
* every row/card shows evidence role
* priority is replaced by decision impact
* connected bet is visible in drawer
* filtered state from Command Center is clear
* Reson8 evidence explains the Narrow recommendation
* board view remains fast and Linear-inspired

---

## Required Table Direction

Use:

```txt id="jmc9ms"
Evidence Item | Supports | Role | Status | Owner | Impact | Venture
```

Avoid:

```txt id="rgh5tc"
Issue | Priority | Type | Due | Roadmap
```

---

## Evidence Anti-Patterns

Do not allow:

* generic issue-tracker language
* hidden Supports field
* priority dominating decision impact
* due date dominating source linkage
* Jira-like dense metadata
* generic ticket drawers
* unrelated placeholder evidence

---

# 3. Bets QA

## Purpose

Bets should show validation decisions, not roadmap cards.

It should answer:

```txt id="aeqowv"
What is the studio testing before committing more capacity?
```

---

## Must Be True

Bets is ready when:

* page title says Bets
* subtitle explains bets as capacity commitments being tested
* Now / Next / Later remain visible
* every card shows testing statement
* every card shows validation confidence
* every card shows recommended move
* every card shows missing proof
* execution progress is secondary to validation confidence
* linked evidence is visible
* capacity impact is visible where relevant
* Reson8 shows low confidence despite active execution

---

## Required Reson8 Tension

The Reson8 bet should clearly show:

```txt id="d7nch1"
Execution progress: 41%
Validation confidence: 23%
Recommended move: Narrow
```

Use the warning copy:

```txt id="w4l9fn"
Execution is moving, but validation confidence remains weak.
```

---

## Bets Anti-Patterns

Do not allow:

* roadmap language in user-facing UI
* progress to dominate confidence
* generic project cards
* Gantt visuals
* timeline planning complexity
* hidden recommended move
* hidden missing proof

---

# 4. Studio Analyst QA

## Purpose

Studio Analyst should explain the reasoning behind the studio decision.

It should answer:

```txt id="dijmt7"
Why is this move recommended?
```

---

## Must Be True

Studio Analyst is ready when:

* page title says Studio Analyst
* first viewport has one dominant recommendation
* top recommendation is Narrow Reson8
* source evidence count is visible
* connected bet is visible
* capacity impact is visible
* confidence is visible
* actions include Inspect evidence and Open bet
* the feed supports the hero instead of competing with it
* no chatbot UI exists

---

## Required Hero Pattern

Use:

```txt id="hvs3um"
Recommended Move
Narrow Reson8

Why
Retention evidence is weak while product and engineering capacity are actively being consumed.

Next
Stop broad onboarding buildout. Continue only retained-creator threshold validation.

Source evidence
4 evidence items · 1 bet · 2 capacity signals

Capacity impact
Protects product and engineering capacity for Sentra activation work.

Confidence
82%
```

---

## Studio Analyst Anti-Patterns

Do not allow:

* chat bubbles
* prompt input as the main interaction
* assistant avatar
* fake typing
* fake streaming
* “AI says” language
* long generic AI paragraphs
* unsupported recommendations
* model/debug terminology

---

# 5. Cross-Screen Narrative QA

## Purpose

The product should feel systemic.

It should answer:

```txt id="h8l5ot"
How do Command Center, Evidence, Bets, and Studio Analyst connect?
```

---

## Must Be True

Cross-screen narrative is ready when:

* Command Center links to filtered Evidence
* Command Center opens connected Bet
* Evidence links to connected Bet
* Bets links to filtered Evidence
* Studio Analyst links to Evidence and Bet
* context banners appear when navigating with decision context
* selected source objects are highlighted
* the same Recommended Move language appears everywhere
* source evidence names are consistent
* the Reson8 decision chain is fully connected

---

## Required Demo Flow

This flow must work:

```txt id="qbz9xw"
1. Command Center shows Recommended Move: Narrow Reson8.
2. User clicks Inspect evidence.
3. Evidence opens filtered to Creator Retention Signal.
4. User opens Weekly creator cohort analysis.
5. Drawer shows Connected Bet: Creator Retention Signal Validation.
6. User opens the Bet.
7. Bet shows 23% validation confidence and Missing Proof.
8. User opens Studio Analyst reasoning.
9. Studio Analyst explains evidence, capacity impact, and next action.
```

---

# Visual Polish Rules

## Overall Visual Feel

Foundary should feel:

* premium
* calm
* compact
* focused
* operational
* dark-first
* modern
* restrained

---

## Avoid

Avoid:

* rainbow dashboards
* excessive gradients
* heavy shadows
* pure black harshness
* oversized empty cards
* inconsistent badge styles
* too many competing colors
* aggressive borders
* loud hover states
* marketing SaaS hero styling
* playful UI decorations

---

# Typography QA

Typography should be:

* crisp
* readable
* modern
* compact
* consistent

Check:

```txt id="fdnmji"
Page titles are consistent.
Section titles are concise.
Body text is readable.
Metadata is quieter but still legible.
Long paragraphs are avoided.
Badge text is not cramped.
Numbers and labels align cleanly.
```

Avoid:

* oversized headings everywhere
* weak contrast
* inconsistent font sizes
* too many font weights
* dense long-copy blocks

---

# Spacing QA

Spacing should create calm density.

Check:

```txt id="ibjfxc"
Cards have consistent padding.
Rows are compact but readable.
Sections have clear separation.
Grid gaps are consistent.
Drawer content breathes.
Tables do not feel cramped.
Boards do not feel oversized.
```

Avoid:

* excessive whitespace
* cramped table rows
* inconsistent gaps
* uneven card heights where distracting
* page sections that feel unrelated

---

# Badge & State QA

Badges should communicate decision state clearly.

Required badge families:

```txt id="mr3flu"
Recommended Move
Validation Confidence
Evidence Role
Decision Impact
Capacity Impact
Status
Venture
```

Badge rules:

* use consistent shape
* use restrained color
* avoid rainbow effect
* do not overuse badges in one row
* prioritize decision badges over generic metadata

---

# Motion & Interaction QA

Motion should feel:

* subtle
* fast
* responsive
* intentional
* premium

Use motion for:

* drawer open/close
* hover states
* filtered navigation
* selected object highlight
* board drag and drop
* context banner appearance
* lightweight card transitions

Avoid:

* slow transitions
* dramatic route animations
* playful movement
* bouncing effects
* excessive animation
* fake AI typing
* fake AI streaming

---

# Drawer QA

Drawers are critical to the Linear-inspired feel.

Drawers should:

* open smoothly
* preserve page context
* have clear title and metadata
* expose decision linkage
* avoid modal heaviness
* avoid nested overlay complexity
* include clear source links when relevant

Required drawer types:

```txt id="dw0w99"
Evidence Drawer
Bet Drawer
Analyst Reasoning Drawer
```

---

# Search & Filter QA

Search and filters should feel immediate.

Check:

```txt id="sos0t7"
Search placeholders use correct language.
Filters are compact.
Filters do not dominate the screen.
Context filters are clear.
Clear context is available.
View states do not reset unexpectedly.
```

Avoid:

* advanced query builders
* large filter sidebars
* enterprise filtering panels
* unclear active filters

---

# Empty State QA

Empty states should be calm and operational.

Use:

```txt id="oh856m"
No urgent studio decisions detected.
No evidence matches the current filters.
No bets in this timeframe.
No urgent recommendations detected.
```

Avoid:

```txt id="o8i5sb"
You're all caught up 🎉
Nothing here yet!
Start your journey!
No data available.
```

Empty states should explain what is missing and what to do next.

---

# Loading State QA

Use skeletons over spinners.

Loading copy, if needed:

```txt id="o50gx2"
Refreshing studio signals...
Loading evidence...
Opening bet context...
Updating analyst reasoning...
```

Avoid:

```txt id="ufj6jd"
AI is thinking...
Preparing magic...
Loading roadmap...
Loading issues...
```

---

# Error State QA

Errors should be clear and calm.

Use:

```txt id="ed0le1"
Could not refresh recommendations.
Could not open source evidence.
Could not update bet.
Could not apply decision context.
```

Avoid:

```txt id="k6sots"
Oops!
AI failed!
Something went wrong!!!
```

---

# Seeded Data QA

Seeded data must support the demo story.

Check:

```txt id="eomzjc"
Reson8 is highest urgency.
Sentra is promising but capacity constrained.
Internal Ops is stable and contained.
Reson8 has low confidence.
Sentra has higher confidence.
At least one Reson8 bet has progress higher than confidence.
Evidence links to Bets.
Recommendations cite source evidence.
Capacity impact is visible.
Source names are consistent across screens.
```

---

# Required Seeded Values

Use these anchor values:

```txt id="eqb0h7"
Reson8 validation confidence: 23%
Reson8 execution progress: 41%
Studio Analyst confidence: 82%
Sentra validation confidence: 78%
Internal Ops validation confidence: 71%
```

Do not randomly change these unless the full demo story is updated.

---

# Performance & Responsiveness QA

The app should feel fast.

Check:

```txt id="qhi5uc"
Route transitions are fast.
Drawers open quickly.
Filters apply immediately.
Search does not lag.
Board drag and drop feels stable.
Hover states do not flicker.
Skeletons do not jump layout.
```

Avoid:

* artificial delays
* fake loading where not needed
* heavy chart rendering
* layout shift
* route flicker

---

# Desktop-First QA

This product is desktop-first operational software.

Priority:

```txt id="rj75ve"
Desktop
Large tablet
Basic mobile tolerance
```

Do not over-invest in mobile parity.

Check:

* desktop layout is polished
* sidebar works
* drawers fit properly
* board remains usable
* tables remain readable
* narrow widths do not completely break

---

# Accessibility Practical QA

Keep practical accessibility quality.

Check:

```txt id="obgdy4"
Text contrast is readable.
Interactive elements have visible focus.
Buttons have clear labels.
Badges do not rely only on color.
Drawer close is accessible.
Keyboard escape closes drawer.
Clickable rows have clear affordance.
```

Do not overbuild complex accessibility systems.

---

# Final Build QA

Before submission, run:

```txt id="rgr8ba"
npm run lint
npm run build
```

Fix:

* TypeScript errors
* lint errors
* broken imports
* unused dead components if obvious
* layout-breaking console errors

For documentation-only changes, run:

```txt id="msq4pb"
git diff --check
```

---

# Final Product Note Alignment

Before submission, make sure the product note can truthfully say:

```txt id="rekm67"
Foundary was inspired by Linear’s speed, focus, and calm execution UX.

I adapted that model for venture studios by making the product venture-aware, evidence-backed, confidence-aware, and capacity-sensitive.

The main design choice was to move from tracking work to supporting studio decisions.

The app intentionally avoids backend complexity, permissions, onboarding systems, and enterprise workflows because the assignment rewards clarity, speed, and product judgment.
```

---

# Final README Alignment

README should clearly explain:

* what Foundary is
* how to run it
* tech stack
* what is mocked
* what is real
* core screens
* demo flow
* intentional tradeoffs

Avoid a generic README that only lists setup commands.

---

# Final AI Usage Note Alignment

AI usage note should explain:

* AI was used to accelerate implementation
* product strategy and UX hierarchy were human-directed
* AI helped scaffold components and refine code
* manual work focused on taste, interaction quality, copy, and coherence
* AI outputs were reviewed and corrected

Do not say:

```txt id="m0o9vg"
AI built the app.
```

Say:

```txt id="p4t63d"
AI accelerated implementation, while product judgment, scope, UX hierarchy, and final quality control were manually directed.
```

---

# Final Demo Script

Use this concise demo flow:

```txt id="q0aymp"
1. Start on Command Center.
2. Show that Foundary recommends Narrow Reson8.
3. Explain that Reson8 is consuming capacity while retention evidence is weak.
4. Click Inspect evidence.
5. Show evidence filtered to Creator Retention Signal.
6. Open one evidence item and show the connected Bet.
7. Open the Bet and show 23% confidence vs 41% execution progress.
8. Open Studio Analyst and show reasoning, source evidence, and capacity impact.
9. Contrast Sentra as stronger confidence but capacity constrained.
10. Close by saying Foundary helps studios prevent wasted execution.
```

---

# Final Reviewer Impression Target

The reviewer should feel:

```txt id="pmkgxj"
This person understands not only how to build a polished frontend, but how AI-native venture studios should decide where to spend execution capacity.
```

Not:

```txt id="ll2tae"
This person built a nice Linear clone.
```

---

# Final Anti-Patterns

Do NOT add:

* authentication
* RBAC
* billing
* settings pages
* notifications
* comments
* real-time collaboration
* real database
* real AI provider integration
* onboarding tours
* coach marks
* wizards
* finance / LP reporting
* cap table workflows
* resource scheduling
* Gantt charts
* enterprise portfolio management
* chatbot UI
* fake AI streaming
* complex configuration

The product should remain:

> small, sharp, local-first, decision-led, and demo-ready.

---

# Final Acceptance Criteria

The product is submission-ready when:

* Command Center explains the product within 30 seconds
* Evidence feels like source proof, not issue tracking
* Bets feel like validation decisions, not roadmap cards
* Studio Analyst feels like decision reasoning, not chatbot AI
* Reson8 decision chain is fully connected
* Sentra and Internal Ops provide clear portfolio contrast
* seeded data feels realistic and coherent
* cross-screen links work
* context banners orient the user
* copy uses decision language consistently
* visual hierarchy is calm and focused
* motion is restrained and useful
* no unnecessary complexity was added
* lint and build pass
* README, Product Note, and AI Usage Note align with the product story

---

# Final Polish North Star

The polish pass succeeds when the product feels:

> obvious, premium, and inevitable.

The reviewer should not need to ask:

```txt id="xunfb5"
What does this product do?
Why is this different from Linear?
Why does a venture studio need this?
```

The UI should already answer those questions.
