# Dashboard Motion Language

## GSAP Cinematic Motion System

### Core Architecture

The motion system is built on GSAP with Svelte 5 integration:

```
src/lib/motion/
├── tokens.ts              # Motion duration/easing constants
├── cinematic-presets.ts   # Pre-configured animation presets
├── dashboard-orchestrator.ts  # Entrance choreography
├── widget-transitions.ts  # Widget lifecycle animations
├── scroll-narratives.ts   # ScrollTrigger integration
└── reduced-motion.ts      # Accessibility support
```

### Motion Tokens

Centralized timing and easing values:

```typescript
export const MOTION_TOKENS = {
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.25,
    slow: 0.35,
    slower: 0.5,
    cinematic: 0.8,
    epic: 1.2
  },
  easing: {
    institutional: 'power2.out',
    cinematicIn: 'power3.in',
    cinematicOut: 'power3.out',
    cinematicInOut: 'power3.inOut',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)'
  }
};
```

### Entrance Cinematic

Staged reveal hierarchy for dashboard load:

1. Shell container fade (0.1s)
2. Intelligence bar slide down (0.25s, -0.1s overlap)
3. KPI row slide up (0.25s, -0.15s overlap)
4. Primary charts staggered reveal (0.35s, -0.2s overlap)
5. Secondary panels staggered (0.25s, -0.3s overlap)
6. Data tables final reveal (0.25s, -0.25s overlap)

### Widget Transitions

- **Insert**: Scale from 0.95 + fade, bounce easing
- **Remove**: Scale to 0.95 + fade, cinematicIn easing
- **Reorder**: Smooth position interpolation
- **Resize**: Width/height interpolation
- **Data Update**: Flash transition (opacity pulse)

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```typescript
export function getMotionDuration(key: string): number {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0.01; // Near-instant
  }
  return MOTION_TOKENS.duration[key];
}
```

### Performance Guidelines

- Use `transform` and `opacity` only for animations
- Clean up GSAP timelines on component destroy
- Batch DOM reads/writes
- Avoid animating during scroll
