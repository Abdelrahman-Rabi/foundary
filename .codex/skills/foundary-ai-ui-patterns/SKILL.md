---
name: foundary-ai-ui-patterns
description: Apply Foundary's embedded operational intelligence UI standards when implementing or refining AI insight cards, AI assistant panels, risk analysis blocks, confidence indicators, recommendation systems, AI summaries, operational intelligence UI, dashboard AI, issue AI, roadmap AI, AI loading states, empty states, motion, tone, and visual styling. Use for Foundary frontend AI UI implementation, review, or polish tasks.
---

# Foundary AI UI Patterns

## Purpose

Use this skill when implementing AI insight cards, AI assistant panels, risk analysis blocks, confidence indicators, recommendation systems, AI summaries, and operational intelligence UI.

The goal is embedded operational intelligence, not chatbot UX.

## AI UI Philosophy

Foundary AI should feel quiet, contextual, operational, and strategically useful.

Use inspiration from Linear AI, Notion AI side-assist patterns, and modern embedded intelligence systems.

AI should feel integrated into workflows, lightweight, actionable, and believable.

Avoid assistant personalities, chatbot theatrics, AI entertainment UX, and fake conversational behavior.

## Core Principles

AI is infrastructure, not character. It should behave like operational intelligence, execution support, and contextual reasoning.

Avoid avatars, names, conversational greetings, playful tone, virtual coworker framing, and chat companion behavior.

AI should reduce cognitive load by summarizing, clarifying, surfacing risk, reducing ambiguity, and accelerating decisions.

Avoid verbose analysis, information overload, and speculative explanations.

AI must feel grounded. Outputs should feel believable, operationally reasonable, context-aware, and constrained.

Avoid magical AI behavior, overconfident recommendations, and fake predictive intelligence.

## UX Positioning

AI should appear embedded within workflows, contextual to user actions, and secondary to core operational UI.

AI should support Issues, Roadmap, Dashboard, venture health, and risk visibility.

Avoid isolated AI experiences and standalone chatbot-first flows.

## Layout

AI UI should feel compact, structured, calm, and readable.

Prefer cards, panels, inline recommendations, and insight summaries.

Avoid long conversations, giant prose blocks, and excessive AI chrome.

## Surface Types

Use insight cards for operational observations, delivery concerns, confidence summaries, and execution insights.

Recommended structure:

```tsx
<AiInsightCard>
  <InsightHeader />
  <InsightSummary />
  <InsightRecommendation />
  <InsightConfidence />
</AiInsightCard>
```

Use risk panels for overdue work, blocked initiatives, declining confidence, and delivery concerns. They should feel focused, operational, and actionable.

Avoid alarm-heavy UI, alert fatigue, and warning overload.

Use recommendation blocks for continue, split, kill, reprioritize, and reduce-scope decisions. Recommendations should feel concise, strategic, and low-drama.

Use AI summary sections for issue summaries, roadmap summaries, and venture health explanations. Summaries should reduce reading effort, surface operational meaning, and remain compact.

Avoid rewriting entire issue descriptions and verbose paragraphs.

## Tone

AI tone should feel:

```txt
operational
strategic
calm
concise
grounded
```

Avoid:

```txt
playful
excited
motivational
human-like
emotional
overly conversational
```

Good examples:

```txt
Delivery confidence declined due to unresolved research dependencies.
This initiative may benefit from splitting discovery work from implementation.
Overdue issues are beginning to affect roadmap confidence.
```

Bad examples:

```txt
Looks like this project is in trouble!
I think you should totally rethink this strategy!
Great job! Everything looks amazing!
```

## Typography

AI typography should feel compact, structured, and secondary to core content.

Recommended pattern:

```txt
Insight title:          text-sm font-medium
AI body:                text-sm
Confidence label:       text-xs
Metadata:               text-xs text-muted-foreground
```

Avoid giant AI headings, marketing copy hierarchy, and oversized analysis blocks.

## Card Styling

AI cards should feel embedded, subtle, and premium.

Recommended pattern:

```tsx
<div className="rounded-xl border border-border/60 bg-muted/20 p-4">
  ...
</div>
```

Avoid glowing AI cards, bright gradients, neon AI styling, and visually isolated assistant UI.

## Color

Use color carefully. Prefer muted surfaces, subtle borders, and restrained risk indicators.

Avoid bright purple AI branding everywhere, rainbow confidence indicators, and flashy AI visuals.

AI should visually integrate with dashboard, issues, and roadmap surfaces.

## Confidence Indicators

Confidence should feel lightweight, informative, and non-theatrical.

Recommended text pattern:

```txt
Confidence: 72%
Trend: Declining
```

Use subtle progress bars, small indicators, and muted labels.

Avoid giant gauges, futuristic AI visualizations, and fake precision systems.

## Risk Indicators

Risk should communicate operational concern, execution friction, and strategic uncertainty.

Use compact labels, muted warning colors, and concise explanations.

Avoid aggressive alert systems, blinking warnings, and red-heavy enterprise dashboards.

## Recommendations

Recommendations should be actionable, concise, and restrained.

Recommended format:

```txt
Suggested Action:
Reduce scope and validate assumptions before continuing execution.
```

Avoid giant recommendation paragraphs, consultant-style writing, and motivational framing.

## AI Panels

If using an AI side panel, make it contextual, secondary, and operationally useful.

Recommended contents include insights, risks, recommendations, and confidence analysis.

Avoid open-ended chat UX, infinite conversations, and full-screen AI workspaces.

## Interactions

AI interactions should feel immediate, lightweight, and low-friction.

Use inline refresh, contextual updates, and smooth content transitions.

Avoid fake typing animations, loading theatrics, and delayed AI reveal animations.

## Empty States

AI empty states should feel operational, intentional, and calm.

Good examples:

```txt
No significant delivery risks detected.
No confidence concerns identified for this initiative.
```

Avoid:

```txt
Your AI assistant is waiting to help!
Ask AI anything!
```

## Loading

Loading should feel lightweight, stable, and integrated.

Use skeleton insight blocks and subtle opacity transitions.

Avoid giant loading animations, chatbot typing indicators, and animated thinking states.

## Feature Rules

Dashboard AI should summarize operational state, surface venture risks, and highlight execution concerns.

Avoid analytics overload, giant AI summaries, and noisy recommendation feeds.

Issue AI should identify ambiguity, detect risk, surface missing criteria, and recommend scope adjustments.

Avoid rewriting tickets, generating massive documentation, and excessive AI verbosity.

Roadmap AI should analyze confidence, surface strategic risk, identify blocked momentum, and recommend continue/split/kill decisions.

Avoid fake predictive planning, unrealistic AI forecasting, and overconfident strategic claims.

## Motion

AI motion should be restrained, subtle, and fast.

Use fade transitions and lightweight content updates.

Avoid streaming simulation, chatbot typing dots, and animated AI personalities.

## Consistency

All AI surfaces should share tone, spacing, visual structure, confidence presentation, and recommendation format.

Avoid each feature inventing new AI UX patterns, inconsistent AI voice, and mixed AI interaction styles.

## Suggested Components

```txt
AiInsightCard
AiRiskPanel
AiRecommendation
AiConfidenceIndicator
AiSummaryBlock
AiOperationalInsight
AiAnalysisSection
AiRiskBadge
AiConfidenceBar
```

## Anti-Patterns

Never introduce chatbot-first UI, AI avatars, assistant personalities, fake streaming, typing animations, motivational AI, AI-generated noise, futuristic AI aesthetics, glowing AI interfaces, or excessive AI branding.

## AI Quality Checklist

Before finalizing AI UI, verify:

```txt
[ ] AI feels embedded
[ ] Tone is operational
[ ] Recommendations are concise
[ ] Visuals remain calm
[ ] No chatbot feeling
[ ] Confidence is believable
[ ] AI reduces cognitive load
[ ] Risk indicators are restrained
[ ] AI supports workflows
[ ] AI feels operationally useful
```

## Default Bias

When uncertain, choose embedded over isolated, structured over conversational, concise over verbose, grounded over magical, operational over playful, and subtle over futuristic.

## North Star

Foundary AI should feel like operational intelligence quietly embedded into venture execution workflows.

Users should feel more informed, more confident, and less cognitively overloaded. Never make them feel trapped inside an AI product demo.
