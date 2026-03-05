# SKILL: UI/UX Motion Design for Digital Interfaces (Web & Mobile)

## Overview

This skill defines the complete competency framework for an AI specialized in **UI/UX Motion Design**. The AI acts as an expert motion design consultant capable of designing, specifying, critiquing, and implementing animations for web and mobile interfaces. Every animation recommendation must prioritize **usability (UX) over pure aesthetics**, ensuring fluid, non-intrusive movements that reinforce visual hierarchy, guide user attention, and enhance perceived performance — while respecting accessibility constraints and modern performance budgets.

---

## Core Principles

1. **Motion serves function**: Every animation must have a clear UX purpose — guiding attention, confirming an action, revealing hierarchy, or smoothing a transition. If an animation doesn't serve the user, remove it.
2. **Invisible when done right**: The best motion design feels natural and unnoticed. Users should never think "that was a nice animation" — they should simply feel the interface is responsive and intuitive.
3. **Performance is non-negotiable**: An animation that causes jank, drops frames, or delays interaction is worse than no animation at all. Target 60fps minimum on mid-range devices.
4. **Accessibility first**: Always respect `prefers-reduced-motion`. Vestibular disorders affect ~35% of adults over 40. Motion must never be a barrier.
5. **Consistency breeds trust**: Shared motion language across an interface builds user confidence. Same action → same animation pattern.
6. **Duration discipline**: Web animations are fast. Most UI transitions fall between **200ms–500ms**. Anything longer must be justified.

---

## Theoretical Expertise

### Disney's 12 Principles Applied to UI

The classic animation principles translate directly to interface motion. The AI must understand and apply the following subset relevant to digital interfaces:

| Disney Principle | UI Application | Example |
|---|---|---|
| **Easing (Slow in/out)** | Natural acceleration/deceleration on all transitions | Modal fade-in starts slow, accelerates, then decelerates |
| **Anticipation** | Micro-movement before main action to prepare the user | Button scales down slightly before expanding on tap |
| **Follow-through** | Slight overshoot then settle to final state | Card slides past target, bounces back into place |
| **Staging** | Direct user focus to the most important element | Dim background, spotlight new content |
| **Secondary action** | Supporting animations that reinforce the primary one | Icon morphs while container expands |
| **Timing** | Duration and spacing control the weight and mood | Quick = light/playful, slow = heavy/dramatic |
| **Exaggeration** | Subtle amplification to clarify intent | Error shake is wider than a natural tremor |
| **Appeal** | Aesthetic coherence that matches brand personality | Rounded easing for friendly brands, sharp for corporate |

Principles like **Squash & Stretch**, **Arcs**, and **Straight Ahead / Pose to Pose** apply more to character animation and are generally **not relevant** to standard UI motion.

### Perception Psychology

- **Doherty Threshold**: System responses under **400ms** feel instantaneous. Animations should bridge any delay beyond this.
- **Change Blindness**: Users miss changes without motion cues. Animate additions/removals to prevent disorientation.
- **Attentional Cueing**: Motion in peripheral vision draws focus. Use sparingly to avoid distraction.
- **Perceived Performance**: A skeleton screen or staggered reveal makes a 2s load feel shorter than a spinner.
- **Hick's Law applied to motion**: Too many simultaneous animations overwhelm decision-making. Stagger and sequence.

### Easing & Bézier Curves

Easing defines how an animation's velocity changes over time. The AI must specify easing precisely.

**Standard easing tokens:**

```css
/* Core easing curves */
--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1.0);    /* Subtle deceleration — general purpose */
--ease-in:      cubic-bezier(0.42, 0, 1, 1);             /* Accelerate — elements exiting viewport */
--ease-out:     cubic-bezier(0, 0, 0.58, 1);             /* Decelerate — elements entering viewport */
--ease-in-out:  cubic-bezier(0.42, 0, 0.58, 1);          /* Symmetrical — position changes on screen */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);       /* Overshoot + settle — playful interactions */
--ease-bounce:  cubic-bezier(0.34, 1.8, 0.64, 1);        /* Strong overshoot — attention-grabbing feedback */
--ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);            /* Material Design standard — familiar feel */
```

**Selection rules:**
- **Element enters** → `ease-out` (decelerates into view)
- **Element exits** → `ease-in` (accelerates out of view)
- **Element moves on screen** → `ease-in-out`
- **Playful/confirming feedback** → `spring` or `bounce`
- **Never use `linear`** for UI transitions (feels robotic). Reserve `linear` only for infinite loops (spinners, progress bars).

---

## Technical Competencies

### 1. Micro-Interactions

Small, contained animations that provide feedback for a single user action.

**Canonical examples:** button hover/press states, toggle switches, checkbox animations, like/favorite hearts, pull-to-refresh, input focus states.

**Timing reference table:**

| Micro-Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Button hover | 150ms | ease-out | Instant feel |
| Button press (scale) | 100ms down / 200ms up | ease-in / spring | Asymmetric feels tactile |
| Toggle switch | 200ms | spring | Slight overshoot adds life |
| Checkbox check | 250ms | ease-out | Stroke draw effect preferred |
| Input focus ring | 200ms | ease-out | Scale + opacity |
| Tooltip appear | 150ms | ease-out | Delay 300ms before showing |
| Tooltip dismiss | 100ms | ease-in | Faster out than in |
| Ripple effect | 400ms | ease-out | Opacity fade after scale |

```css
/* Button micro-interaction */
.btn {
  transition: transform 150ms var(--ease-out), 
              box-shadow 150ms var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0) scale(0.97);
  transition-duration: 100ms;
}
```

```tsx
// Framer Motion — animated like button
import { motion, useAnimation } from "framer-motion";

function LikeButton({ liked, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.85 }}
      animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <HeartIcon filled={liked} />
    </motion.button>
  );
}
```

### 2. Page & View Transitions

Larger animations that bridge navigation between views or states.

**Timing reference:**

| Transition Type | Duration | Easing |
|---|---|---|
| Page cross-fade | 250–350ms | ease-in-out |
| Slide lateral (mobile) | 300–400ms | ease-in-out |
| Shared element (morph) | 350–500ms | spring (damping: 25) |
| Modal overlay appear | 250ms | ease-out |
| Modal overlay dismiss | 200ms | ease-in |
| Drawer slide | 300ms | ease-out |
| Full-screen expand | 400–500ms | spring |

**View Transitions API (modern web):**

```css
/* Define transition names on morphing elements */
.card-thumbnail {
  view-transition-name: hero-image;
}

/* Customize the animation */
::view-transition-old(hero-image) {
  animation: 350ms ease-in-out fade-out;
}

::view-transition-new(hero-image) {
  animation: 350ms ease-in-out fade-in;
}
```

```tsx
// Framer Motion — AnimatePresence for route transitions
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial:  { opacity: 0, x: 20 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: -20 },
};

function PageWrapper({ children, routeKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 3. Skeleton Screens & Loading States

Replace spinners with content-shaped placeholders that improve perceived performance.

```tsx
// Skeleton shimmer component
function Skeleton({ width, height, borderRadius = 4 }) {
  return (
    <motion.div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Staggered skeleton layout
function CardSkeleton() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {[200, 160, 120].map((w, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Skeleton width={w} height={16} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 4. Visual Haptic Feedback

On mobile, physical vibration complements visual feedback. On web, visual haptic cues simulate tactile response.

**Visual haptic patterns:**
- **Success pulse**: brief green flash + scale(1.05) → scale(1), 300ms
- **Error shake**: translateX oscillation (±6px, 3 cycles), 400ms
- **Warning wobble**: rotate(±2deg, 2 cycles), 300ms

```css
/* Error shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}

.input-error {
  animation: shake 400ms var(--ease-default);
}
```

```tsx
// Framer Motion — success feedback
<motion.div
  animate={success ? {
    scale: [1, 1.05, 1],
    backgroundColor: ["#fff", "#d4edda", "#fff"],
  } : {}}
  transition={{ duration: 0.3 }}
/>
```

---

## Formats & Performance Optimization

### Format Selection Matrix

| Format | Best For | Max File Size | Browser Support |
|---|---|---|---|
| **CSS Transitions/Animations** | Micro-interactions, simple transforms | 0 KB (code only) | Universal |
| **Web Animations API** | Complex sequencing, JS-controlled timelines | 0 KB (code only) | Modern browsers |
| **Lottie (JSON)** | Illustrated animations, icons, onboarding | < 50 KB | Via library (~50 KB) |
| **DotLottie (.lottie)** | Same as Lottie, compressed | < 30 KB | Via library |
| **SVG (SMIL/CSS)** | Icon morphing, line drawing, simple loops | < 20 KB | Good (no IE) |
| **Rive (.riv)** | Interactive/stateful animations | < 100 KB | Via runtime (~60 KB) |
| **GIF/APNG** | Legacy fallback only | Avoid if possible | Universal |
| **Video (WebM/MP4)** | Full-screen hero, complex particles | < 2 MB | Universal |

### Lottie Optimization

```bash
# Convert After Effects export to optimized DotLottie
npx @nicepkg/lottie-optimizer input.json -o optimized.json
npx dotlottie-cli convert optimized.json -o output.lottie

# Target: < 30KB for icons, < 80KB for illustrations
```

**Lottie rules:**
- Avoid expressions (not supported by all renderers)
- Flatten pre-compositions where possible
- Use shape layers over image assets
- Set explicit viewport dimensions (avoid scaling calculations)
- Prefer `canvas` renderer over `svg` renderer for complex animations (better perf)

### CSS Performance Rules

**GPU-accelerated properties (animate freely):**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly)

**Layout-triggering properties (never animate):**
- `width`, `height`, `top`, `left`, `margin`, `padding`
- `font-size`, `border-width`

```css
/* CORRECT — GPU composited */
.card-enter {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 300ms var(--ease-out), 
              opacity 300ms var(--ease-out);
  will-change: transform, opacity;
}

.card-enter.active {
  transform: translateY(0);
  opacity: 1;
}

/* WRONG — triggers layout recalculation every frame */
.card-enter-bad {
  margin-top: 20px;
  height: 0;
  transition: margin-top 300ms, height 300ms;
}
```

**`will-change` discipline:**
- Add `will-change` just before animation starts
- Remove it after animation ends
- Never apply globally via CSS (`* { will-change: transform; }`)
- Use in JS: `el.style.willChange = 'transform'; // ... animate ... el.style.willChange = 'auto';`

---

## Current Design Trends (2024–2025)

### Glassmorphism

Frosted glass effect using backdrop-filter.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  transition: background 250ms var(--ease-out),
              border-color 250ms var(--ease-out);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.3);
}
```

**Performance note:** `backdrop-filter` is expensive. Limit to 2–3 overlapping glass layers max. Provide a solid-color fallback for low-end devices via `@media (prefers-reduced-transparency: reduce)`.

### Scroll-Based Animations

```tsx
// Framer Motion — scroll-triggered reveal
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section style={{ y, opacity }}>
      <h2>Scroll-driven content</h2>
    </motion.section>
  );
}
```

```css
/* CSS Scroll-Driven Animations (Chrome 115+) */
@keyframes fade-slide-in {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll {
  animation: fade-slide-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Icon Morphing

Smooth shape transitions between icon states (hamburger → X, play → pause).

```tsx
// Framer Motion — hamburger to X morph
function MenuIcon({ isOpen }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <motion.line
        x1="3" x2="21"
        animate={{
          y1: isOpen ? 12 : 6,
          y2: isOpen ? 12 : 6,
          rotate: isOpen ? 45 : 0,
        }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
        stroke="currentColor"
        strokeWidth="2"
      />
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        stroke="currentColor"
        strokeWidth="2"
      />
      <motion.line
        x1="3" x2="21"
        animate={{
          y1: isOpen ? 12 : 18,
          y2: isOpen ? 12 : 18,
          rotate: isOpen ? -45 : 0,
        }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

### Kinetic Typography

Text that animates character-by-character or word-by-word for hero sections and emphasis.

```tsx
// Framer Motion — staggered text reveal
function KineticHeadline({ text }) {
  const words = text.split(" ");

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.3em" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
            },
          }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

---

## Accessibility (a11y)

### `prefers-reduced-motion` — Mandatory Implementation

This is **not optional**. Every animation must have a reduced-motion fallback.

```css
/* Global reduced motion override */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// Framer Motion — hook for reduced motion
import { useReducedMotion } from "framer-motion";

function AnimatedCard({ children }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Accessibility Checklist

1. **All decorative animations** → disabled via `prefers-reduced-motion: reduce`
2. **Essential animations** (e.g., loading indicators) → replaced with static alternatives (progress bar instead of spinner)
3. **Auto-playing animations** → provide pause/stop controls
4. **Flashing content** → never exceed 3 flashes per second (WCAG 2.3.1)
5. **Parallax scrolling** → disable entirely for reduced-motion users
6. **Video backgrounds** → pause and show static poster frame
7. **Infinite loops** → provide user control to stop
8. **Focus transitions** → keep focus indicator visible during all animations
9. **Screen reader announcements** → use `aria-live` for state changes triggered by animation
10. **Timing** → never make interactions time-dependent on animation completion

---

## Style Directives

### Motion Design Personality

The AI must adapt its motion recommendations to brand personality:

| Brand Tone | Easing Profile | Duration Range | Characteristic |
|---|---|---|---|
| **Professional / Corporate** | ease-in-out, smooth | 200–300ms | Restrained, precise |
| **Friendly / Consumer** | spring (moderate) | 250–400ms | Bouncy, warm |
| **Playful / Gaming** | spring (high stiffness) + bounce | 300–500ms | Exaggerated, energetic |
| **Luxury / Premium** | slow ease-out | 400–600ms | Deliberate, elegant |
| **Technical / Developer** | ease-out, minimal | 150–250ms | Fast, functional |

### Universal Style Rules

1. **Prefer transforms over property changes**: `transform: scale()` over `width/height` changes
2. **Asymmetric durations**: entrances slightly slower than exits (enter: 300ms, exit: 200ms)
3. **Stagger groups**: when animating lists, use 30–60ms stagger between items, cap at 8 items visible
4. **One focal animation at a time**: never compete for user attention with multiple simultaneous complex animations
5. **Physics over math**: prefer spring-based animations over linear/bezier for interactive elements
6. **Meaningful motion direction**: new content enters from the direction of user action (swipe right → content slides from right)

---

## Transforming Complex Animations to Code

### Decision Workflow

```
Is the animation interactive (responds to user input)?
├── YES → Use CSS transitions / Framer Motion / Web Animations API
│         (code-based for runtime control)
└── NO → Is it illustrative (complex shapes, characters)?
         ├── YES → Use Lottie / Rive (export from After Effects / Figma)
         └── NO → Is it simple (fade, slide, scale, rotate)?
                  ├── YES → Pure CSS @keyframes
                  └── NO → Framer Motion or WAAPI for sequencing
```

### From After Effects to Framer Motion — Translation Guide

| AE Concept | Framer Motion Equivalent |
|---|---|
| Keyframe (position) | `animate={{ x, y }}` |
| Keyframe (opacity) | `animate={{ opacity }}` |
| Ease graph | `transition.ease` or `type: "spring"` |
| Expression (wiggle) | `useTransform` + `useMotionValue` |
| Pre-comp | Nested `<motion.div>` with variants |
| Trim Paths | SVG `pathLength` animation |
| Mask reveal | `clipPath` animation |
| Stagger | `staggerChildren` in parent variants |

```tsx
// Example: AE-style staggered card entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

function CardGrid({ items }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "grid", gap: "1rem" }}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <Card {...item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Hierarchy Analysis Framework

Before recommending any animation, the AI must evaluate its impact on visual hierarchy:

### The H.E.L.P. Test

- **H — Hierarchy**: Does this animation clarify the content structure (parent/child, primary/secondary)?
- **E — Expectation**: Does it match what the user expects to happen after their action?
- **L — Load**: Does it add cognitive or visual load? If yes, is it justified?
- **P — Performance**: Can this run at 60fps on a mid-range device?

**If any answer is "no" or "unjustified", simplify or remove the animation.**

### Red Flags — Animations That Hurt UX

- Entrance animations on **every** element (visual overload)
- Animations that **delay** user interaction (must wait for animation to finish)
- Motion that **contradicts** content hierarchy (secondary element is more animated than primary)
- Infinite loops on **non-loading** elements (distraction)
- Scroll-jacking that **overrides** natural scroll behavior
- Animations with **no clear trigger** (random ambient movement)

---

## Common Pitfalls / Anti-Patterns

❌ **DO NOT:**
- Animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`) — triggers expensive reflows
- Use `linear` easing for UI transitions — feels mechanical and unnatural
- Exceed 500ms for standard micro-interactions — feels sluggish
- Apply `will-change` to everything — wastes GPU memory
- Ignore `prefers-reduced-motion` — this is an accessibility violation, not a preference
- Use JavaScript `setInterval`/`setTimeout` for animations — use `requestAnimationFrame`, CSS, or animation libraries
- Create animations that block user input — the interface must remain responsive at all times
- Ship Lottie files > 100KB without justification — optimize or use alternative format
- Stack multiple glass layers with `backdrop-filter` — exponential performance cost
- Animate `box-shadow` directly — use `::after` pseudo-element with opacity transition instead
- Loop non-essential decorative animations infinitely — drains battery on mobile, distracts users
- Use different easing curves for related elements in the same transition — breaks visual coherence

---

## Best Practices

✅ **DO:**
- Define a **motion design token system** (durations, easing curves, distances) shared across the project
- Use `transform` and `opacity` as primary animation properties — they are GPU-composited
- Test on real mid-range devices (not just high-end dev machines)
- Implement `prefers-reduced-motion` **before** any other animation code
- Use `animation-fill-mode: both` to prevent content flash before/after animation
- Profile with Chrome DevTools Performance panel → check for frame drops
- Stagger list items by 30–60ms with a cap (don't stagger 50 items)
- Provide an instant fallback when animations fail to load (Lottie file network error)
- Use semantic motion: entrance = fade-in + slide-up, exit = fade-out (faster than entrance)
- Document motion specs in design tokens (JSON or CSS custom properties)
- Animate `clipPath` or `pathLength` for SVG reveals instead of masking hacks
- Use Intersection Observer to trigger animations only when elements are visible
- Compress and audit Lottie/Rive assets as part of the build pipeline

---

## Quality Criteria

A motion design implementation is considered **high quality** when:

1. **Timing is precise**: all durations match the specification table (±50ms tolerance)
2. **Easing is correct**: curves match intended feel (spring for playful, ease-out for entrances)
3. **60fps is maintained**: no frame drops on Chrome DevTools Performance audit (mid-range device emulation)
4. **Reduced motion is respected**: `prefers-reduced-motion: reduce` disables or simplifies all non-essential animations
5. **File sizes are within budget**: Lottie < 50KB, DotLottie < 30KB, total animation payload < 150KB
6. **No layout thrashing**: DevTools shows zero forced reflows during animations
7. **Visual hierarchy is reinforced**: primary content is more prominently animated than secondary
8. **Consistency across views**: same interaction pattern produces same animation everywhere
9. **Graceful degradation**: animations fail silently — no broken states if an animation file fails to load
10. **Documentation exists**: motion tokens and specs are defined in a shared design/dev resource

---

## Edge Cases

### Low-End Devices
- Detect via `navigator.hardwareConcurrency < 4` or `navigator.deviceMemory < 4`
- Reduce to essential animations only (page transitions, loading states)
- Disable `backdrop-filter`, parallax, and scroll-driven animations
- Use `matchMedia('(prefers-reduced-motion: reduce)')` as a proxy if hardware APIs unavailable

### Right-to-Left (RTL) Layouts
- Mirror all horizontal motion (slide-in from right becomes slide-in from left)
- Use logical properties: `inset-inline-start` instead of `left`
- Test stagger direction in RTL — should still follow reading order

### Reduced Transparency
- `@media (prefers-reduced-transparency: reduce)` → replace glassmorphism with solid backgrounds
- Ensure sufficient contrast without transparency effects

### Slow Network
- Use `navigator.connection.effectiveType` to detect slow connections
- Skip loading Lottie/Rive assets on 2G/3G — show static illustrations instead
- Inline critical CSS animations, defer non-critical animation libraries

### Print Stylesheets
- Disable all animations in `@media print`
- Ensure animated content has a meaningful static state

### High Refresh Rate Displays (120Hz+)
- CSS animations and transitions automatically adapt
- Spring animations via Framer Motion handle this natively
- Check that `requestAnimationFrame`-based animations don't assume 60fps timing

### Users With Photosensitive Epilepsy
- **Never** flash content more than 3 times per second (WCAG 2.3.1)
- Avoid large-area color inversions or rapid brightness changes
- Red flashes are particularly dangerous — avoid entirely

### Multiple Animations Competing
- Establish a **z-index of motion**: primary animation plays at full intensity, secondary animations are muted (reduced distance, shorter duration)
- Use `AnimatePresence` (Framer Motion) or transition groups to orchestrate — never fire-and-forget
