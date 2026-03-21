# Scroll-Driven Animation Architecture — Design Spec

**Date:** 2026-03-20
**Status:** Approved
**Approach:** Centralized Animation Controller (Approach A)

---

## Overview

Replace the IntersectionObserver reveal system with a GSAP ScrollTrigger-powered scroll-driven animation architecture. Four features, one centralized `useScrollAnimations()` hook.

**Dependencies:** `gsap` (already in package.json as `^3.14.2`) with `ScrollTrigger` plugin (free tier, already registered).

---

## Architecture

### Centralized Controller: `useScrollAnimations()`

A single hook in `page.tsx` that initializes all four GSAP ScrollTrigger systems after mount. Components remain pure markup — they render elements with `data-*` attributes or CSS classes that the controller targets via `querySelectorAll`.

**Initialization:**
- Runs in a `useEffect` after mount
- Checks `prefers-reduced-motion` — if true, skips all GSAP setup (elements render visible via CSS fallback)
- Uses `gsap.context()` scoped to `<main>` for clean teardown
- Calls `ScrollTrigger.refresh()` once after all triggers are created

**Lenis Integration:**
- Update `LenisProvider` to call `ScrollTrigger.update()` on each Lenis scroll event
- This syncs GSAP's scroll position with Lenis's smooth scroll

### What Gets Removed

- The `useReveal()` IntersectionObserver hook — replaced by GSAP-driven reveals
- The `.reveal` CSS class system stays in CSS as a fallback (for reduced-motion and no-JS)
- Manual `window.addEventListener("scroll", ...)` parallax in SplitLeft/SplitRight — replaced by GSAP ScrollTrigger
- Manual scroll-progress tracking in ThresholdStatement — replaced by GSAP ScrollTrigger pinning + scrubbed timeline
- The existing GSAP code in Process (horizontal scroll) — stays, but moves into the centralized controller

---

## Feature 1: Word-by-Word Scroll-Scrubbed Text Reveal

### Targets
Section headlines that currently use `.reveal`:
- SplitLeft h2: "There are moments when something begins to shift beneath the surface."
- SplitRight h2: "A structured threshold."
- WhatThisRequires h2: "This work asks something real of you."
- WhoItsFor h2: "Not designed for everyone."
- Outcomes h2: "The reorganization is felt from the inside out."
- Guides h2: "Foundations for the crossing"
- Testimonials h2: "Words from the threshold"
- Offer h2: "Soul Initiation Program"
- FAQ h2: "Questions at the Threshold"
- FinalCTA h2: "The threshold is here."

**NOT targeted:** Hero headline (keeps its existing load-triggered cinematic animation). ThresholdStatement h2 (handled by Feature 3's pinned timeline).

### Implementation
1. Add `data-word-reveal` attribute to target h2 elements
2. In the controller, select all `[data-word-reveal]` elements
3. For each, split `textContent` into `<span>` wrappers per word (preserve existing HTML structure like `<em>`, `<br>`)
4. Create a GSAP timeline with `scrollTrigger: { scrub: true, start: "top 85%", end: "top 45%" }`
5. Animate each word span: `{ opacity: 0, y: 12 }` → `{ opacity: 1, y: 0 }` with stagger
6. Remove `.reveal` class from these h2 elements (GSAP controls them now)

### Character-by-Character Variant
For key emphasis phrases, use `data-char-reveal` attribute instead. Same mechanics but splits by character with tighter stagger timing. Applied to: FinalCTA h2 "The threshold is here."

---

## Feature 2: Scrubbed Parallax on Images

### Targets
All `.split-img` image containers (SplitLeft, SplitRight, WhoItsFor) and the hero background.

### Implementation
1. Replace the manual `window.addEventListener("scroll", ...)` parallax in SplitLeft and SplitRight with GSAP ScrollTrigger
2. Target: the inner image wrapper (currently `inset-[-15%]` div)
3. ScrollTrigger config: `{ trigger: container, start: "top bottom", end: "bottom top", scrub: true }`
4. Animation: `y` from `-15%` to `15%` of container height (equivalent to 0.85x scroll speed)
5. The `inset-[-15%]` overflow already exists — this gives the image room to move without gaps
6. Hero background: same treatment on the hero image/video container, but subtler (`y: -5%` to `5%`)

### What Changes
- Remove the manual parallax `useEffect` from SplitLeft and SplitRight components
- Move parallax logic into the centralized controller
- Add `data-parallax` attribute to image wrapper divs
- Add `data-parallax-hero` to hero background for the subtler variant

---

## Feature 3: ThresholdStatement Section Pinning

### Current State
Already has a manual implementation: 200vh wrapper + `position: sticky` + manual scroll progress tracking via `useState(progress)` + CSS transitions driven by progress thresholds.

### What Changes
Replace the manual implementation with GSAP ScrollTrigger pinning + a scrubbed timeline.

### Implementation
1. Remove the 200vh wrapper div and sticky positioning
2. Use ScrollTrigger `pin: true` on the section with `end: "+=200vh"`
3. Create a scrubbed GSAP timeline that sequences:
   - **0%–15%:** Overline "This Is Not Confusion" fades in + slides up
   - **10%–30%:** "It's a" fades in + slides up
   - **25%–45%:** "Threshold." slides in from right + color shifts to gold + text-shadow glow
   - **50%–100%:** Bottom content grid (quote + modern collapse) fades in + slides up
4. All driven by `scrub: 1` — smooth, reversible, tied to scroll position
5. Remove `useState(progress)` and the manual scroll listener

### Benefits Over Current
- No React re-renders on every scroll frame (was calling `setProgress` 60fps)
- Smoother — GSAP scrub handles interpolation
- Reversible by nature (scroll up = animation reverses)
- Pinning handled natively by ScrollTrigger (no CSS sticky hacks)

---

## Feature 4: Horizontal Scroll Panel (Process Section)

### Current State
Already implemented with GSAP ScrollTrigger. The Process component has its own `useEffect` with `gsap.context()` handling:
- Horizontal scroll via `gsap.to(track, { x: -totalScroll })` with `pin: true` + `scrub: 1`
- Progress connector line via `scaleX` scrub
- Node dot activation per phase
- Ghost numeral fade-in

### What Changes
Move this existing GSAP logic from Process's local `useEffect` into the centralized `useScrollAnimations()` controller. No behavioral changes — just architectural consolidation.

### Implementation
1. Remove the GSAP `useEffect` from the Process component
2. Add the same ScrollTrigger setup to the centralized controller, targeting `.arc-section`, `.arc-track`, etc.
3. Keep the mobile fallback (vertical layout when `< 768px`) — the controller skips horizontal scroll setup on mobile
4. Keep all existing animations: ghost numerals, connector line, node dots

---

## CSS Changes

### New CSS additions (globals.css)
```css
/* Word reveal — initial hidden state for split words */
[data-word-reveal] .word-span,
[data-char-reveal] .char-span {
  opacity: 0;
  transform: translateY(12px);
  display: inline-block;
}

/* Reduced motion: show everything immediately */
@media (prefers-reduced-motion: reduce) {
  [data-word-reveal] .word-span,
  [data-char-reveal] .char-span {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### Existing CSS kept
- `.reveal` system stays for non-headline elements (body copy, overlines, cards, etc.)
- All hover choreography stays unchanged
- All existing GSAP-related CSS (`.arc-section`, `.arc-node`, etc.) stays

---

## Reduced Motion Strategy

1. CSS: existing `@media (prefers-reduced-motion: reduce)` rules handle fallback visibility
2. JS: `useScrollAnimations()` checks `matchMedia('(prefers-reduced-motion: reduce)')` at init — if true, returns early without creating any ScrollTrigger instances
3. Result: all text visible, no pinning, no parallax, no horizontal scroll — page renders as a standard vertical scroll

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/app/page.tsx` | Add `useScrollAnimations()` hook, add `data-*` attributes to targets, remove manual parallax/progress useEffects, remove `.reveal` from GSAP-controlled headlines, move Process GSAP into controller |
| `src/components/LenisProvider.tsx` | Add `ScrollTrigger.update()` sync on Lenis scroll events |
| `src/app/globals.css` | Add word/char reveal initial states, keep existing systems |

---

## Mobile Behavior

- **Word-by-word reveal:** Works on mobile (scrub-driven, touch scroll works with Lenis)
- **Parallax:** Active on mobile (subtler — GSAP handles touch scroll via Lenis sync)
- **Section pinning (ThresholdStatement):** Active on mobile
- **Horizontal scroll (Process):** Falls back to vertical layout on mobile (< 768px) — same as current behavior
