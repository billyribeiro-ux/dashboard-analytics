# Dashboard Architecture

## Overview

The Intelligence Command Center is a world-class Decision Intelligence platform built with SvelteKit 2 + Svelte 5, featuring institutional-grade design patterns and cinematic motion systems.

## Core Architecture

### Multi-Zone Shell Design

The dashboard implements a spatial zoning architecture:

- **Top Intelligence Bar**: Global command palette, universal search, alert bell with severity counts, system health pill, live data status + latency, workspace switcher
- **Left Strategic Nav**: Grouped domains, pinned favorites, quick-jump navigation
- **Main Warboard Area**: Modular widgets, scenario overlays, primary visualization space
- **Right Insight Rail**: Anomaly feed, "what changed" narrative, action recommendations

### State Management

The dashboard uses Svelte 5 runes for reactive state management:

```typescript
// Core dashboard state in src/lib/state/dashboard-state.svelte.ts
class DashboardState {
  densityMode = $state<DensityMode>('analyst');
  isEditMode = $state(false);
  activeFilters = $state<Filter[]>([]);
  timeRange = $state<TimeRange>({...});
  // ... additional state properties
}
```

### Data Layer

Three primary state stores:

1. **DashboardState**: Layout, filters, time range, widget configuration, drilldown stack
2. **AlertState**: Alert management, acknowledgment, severity tracking
3. **DataState**: Data source health, latency tracking, sync status

## Component Hierarchy

```
DashboardShell
├── IntelligenceBar
├── StrategicNav
├── Warboard
│   ├── KPICard[] (4 instances)
│   ├── TimeSeriesChart
│   ├── FunnelWidget
│   ├── CohortHeatmap
│   ├── LiveEventTape
│   └── SegmentMatrix
└── InsightRail
```

## Technical Stack

- **Framework**: SvelteKit 2.x with Svelte 5.x runes
- **Styling**: Tailwind CSS v4 with CSS-first design tokens
- **Motion**: GSAP + ScrollTrigger for cinematic animations
- **Validation**: Zod for runtime type checking
- **Testing**: Vitest + Playwright

## Design System

### Color Tokens

All colors use CSS custom properties for theming support:

```css
--color-bg-primary: #0a0e14;
--color-surface-base: #1a1f28;
--color-accent-primary: #4a9eff;
--color-text-primary: #e6edf3;
```

### Typography Hierarchy

- Display: 48/36/28px for hero metrics
- Heading: 24/20/16px for section titles
- Body: 16/14/12px for content
- Label: 14/12/11px for metadata

### Spacing System

Grid-based spacing using 4px units:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

## Performance Considerations

- Lazy loading of heavy widget modules
- Memoized derived state computations
- GSAP timeline cleanup on component destroy
- Reduced motion support for accessibility
