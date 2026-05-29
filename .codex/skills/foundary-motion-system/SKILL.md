---
name: foundary-motion-system
description: Apply Foundary's restrained motion language when implementing or refining transitions, hover states, drawer animations, drag and drop interactions, loading states, route transitions, micro-interactions, skeletons, AI updates, dashboards, and reduced-motion behavior. Use for Foundary frontend motion implementation, review, or polish tasks.
---

# Foundary Motion System

## Purpose

Use this skill when implementing transitions, hover states, drawer animations, drag and drop interactions, loading states, route transitions, and micro-interactions.

Motion should reinforce operational clarity, responsiveness, premium quality, and interaction continuity. Do not use motion for entertainment, spectacle, or playful movement.

## Motion Philosophy

Foundary motion should feel restrained, smooth, responsive, and intentional.

Use inspiration from Linear, Raycast, and Vercel.

Motion should reduce cognitive friction, preserve spatial continuity, reinforce momentum, and make interactions feel stable.

Avoid dramatic animation, bounce-heavy transitions, flashy movement, and decorative motion.

## Core Principles

Use motion to support function. Every animation should improve orientation, continuity, responsiveness, or interaction clarity. Avoid animation that exists only for aesthetics.

Prefer fast interfaces. Use short durations, low-latency interactions, and subtle transitions. Foundary is a high-velocity operational product, so motion should never slow workflows down.

Choose stability over spectacle. The UI should feel grounded, stable, and reliable. Avoid floating motion, exaggerated scaling, elastic bouncing, and dramatic entrance effects.

## Timing

Recommended defaults:

```ts
fast:     120ms
normal:   180ms
slow:     240ms
drawer:   260ms
```

Avoid transitions longer than 300ms, inconsistent durations, and ultra-fast flickering transitions.

## Easing

Recommended easing:

```ts
ease-out
ease-in-out
```

Preferred cubic bezier:

```ts
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid bounce easing, elastic easing, and spring-heavy motion everywhere. Use springs only where interaction realism matters.

## Hover Motion

Hover states should feel lightweight, responsive, and calm.

Use subtle background shifts, soft opacity changes, minimal `translateY`, and subtle border emphasis.

Recommended examples:

```tsx
hover:bg-muted/40
hover:border-border
transition-colors duration-150
```

Optional:

```tsx
hover:-translate-y-[1px]
```

Avoid large hover movement, dramatic scaling, glowing effects, and hover jitter.

## Button Motion

Buttons should feel immediate, stable, and tactile.

Use opacity transitions, subtle background shifts, and slight scale reduction on press.

Recommended example:

```tsx
active:scale-[0.98]
transition-all duration-150
```

Avoid bounce clicks, exaggerated scaling, and delayed response.

## Card Motion

Cards should feel stable and maintain layout continuity.

Use subtle hover background, slight border emphasis, and soft shadow adjustment only if necessary.

Recommended pattern:

```tsx
transition-all duration-150 hover:bg-muted/30
```

Avoid floating cards, dramatic lift, and oversized shadows.

## Drawer Motion

Treat drawers as high-priority interactions. They should feel smooth, premium, uninterrupted, and spatially coherent.

Use a slide plus fade combination, subtle opacity transition, and smooth easing. Preserve background context, avoid harsh snapping, and maintain responsiveness.

Recommended drawer timing: `220ms` to `280ms`.

Backdrop should dim gently while preserving environmental awareness:

```tsx
bg-background/80 backdrop-blur-sm
```

Avoid heavy black overlays, dramatic blur, and full visual isolation.

Drawers should avoid content jumping, preserve internal spacing, and animate consistently across features. Issue drawer, roadmap drawer, and AI drawer should share timing, easing, and spacing rhythm.

## Drag And Drop Motion

Treat drag and drop quality as critical because it heavily affects sophistication perception.

DnD should feel fluid, stable, responsive, and low-friction. Avoid laggy dragging, snapping glitches, layout collapse, and unstable columns.

While dragging, preserve card dimensions, maintain spatial continuity, and animate surrounding items smoothly.

Recommended drag affordance:

```tsx
scale: 1.01
opacity: 0.96
```

Use subtle shadow increase, light opacity reduction, and small scale increase.

Avoid large rotation, floating effects, and exaggerated scaling.

Dropping should settle quickly, update state immediately, and avoid delayed snapping. Prefer optimistic UI updates and minimal transition delay.

## Lists And Tables

Rows should respond subtly on hover, maintain layout stability, and avoid shifting content.

Use background fades and lightweight hover transitions.

Avoid row expansion animations, dramatic movement, and layout jumping.

## Route Transitions

Route transitions should be subtle, fast, and low-noise.

Use fade transitions with slight vertical offset:

```tsx
initial={{ opacity: 0, y: 4 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -2 }}
```

Avoid full-page slide transitions, dramatic scene changes, and mobile-app style transitions.

## Loading Motion

Loading should feel calm, stable, and premium.

Use shimmer skeletons, opacity fades, and lightweight placeholders.

Avoid spinners everywhere, large animated loaders, and flashy loading effects.

Skeletons should preserve layout structure, prevent content jumping, and match final component dimensions. Use low-contrast shimmer and muted surfaces.

Avoid bright shimmer effects and fast flashing animation.

## AI Motion

AI interactions should feel embedded, contextual, and operational.

Use fade-in insight blocks, smooth recommendation updates, and lightweight content transitions.

Avoid fake typing animation, streaming simulation, and chatbot theatrics.

## Dashboard Motion

Dashboard motion should feel calm, executive-readable, and stable.

Use subtle refresh transitions, smooth card updates, and restrained hover states.

Avoid animated charts everywhere, constantly moving widgets, and dashboard noise.

## Consistency

All Foundary motion should share consistent easing, consistent timing, and a consistent hover philosophy.

Avoid each feature having different motion behavior, inconsistent transition timing, and mixed animation styles.

## Framer Motion

Use Framer Motion for drawers, drag and drop enhancements, route transitions, and subtle layout animations.

Avoid wrapping every component in `motion.div`, over-animating the app, and deeply nested animation trees.

## Reduced Motion

Respect reduced motion preferences.

Disable non-essential animation, preserve usability, and keep transitions minimal.

Avoid forcing heavy motion or blocking interaction due to animation.

## Motion Quality Checklist

Before finalizing interactions, verify:

```txt
[ ] Motion improves clarity
[ ] Interactions feel responsive
[ ] Hover states are subtle
[ ] Drawers feel smooth
[ ] DnD feels stable
[ ] Layout remains stable during transitions
[ ] No flashy animation
[ ] No excessive movement
[ ] Motion feels premium and restrained
[ ] Motion supports operational UX
```

## Default Bias

When uncertain, choose subtle over dramatic, fast over slow, stable over flashy, fade over bounce, continuity over spectacle, and responsive over decorative.

## North Star

Foundary motion should feel like quiet confidence in motion.

The interface should move just enough to preserve continuity, reinforce momentum, improve usability, and elevate perceived quality. Never move enough to distract from execution.
