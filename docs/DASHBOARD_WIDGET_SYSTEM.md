# Dashboard Widget System

## Widget Arsenal (15 Required Components)

### 1. Executive KPI Cards
**File**: `src/lib/components/widgets/KPICard.svelte`
- Sparkline visualization
- Delta percentage with trend indicator
- Confidence index display
- Hover lift animation
- Format support: number, currency, percent

### 2. Multi-Axis Time-Series Cockpit
**File**: `src/lib/components/widgets/TimeSeriesChart.svelte`
- SVG-based chart rendering
- Legend with toggle behavior
- Multiple series support
- Responsive scaling

### 3. Funnel Degradation Monitor
**File**: `src/lib/components/widgets/FunnelWidget.svelte`
- Stage-by-stage visualization
- Conversion rate indicators
- Drop-off percentage display
- Gradient bar styling

### 4. Cohort Retention Heat Table
**File**: `src/lib/components/widgets/CohortHeatmap.svelte`
- Color-coded retention cells
- Hover scale animation
- Period comparison (M0-M11)
- Legend for retention levels

### 5. Live Event Tape
**File**: `src/lib/components/widgets/LiveEventTape.svelte`
- Real-time event streaming simulation
- Severity-based color coding
- Auto-scrolling with new entries
- "Live" pulse indicator

### 6. Segment Comparison Matrix
**File**: `src/lib/components/widgets/SegmentMatrix.svelte`
- Multi-metric comparison table
- Conditional formatting
- Hover row highlighting
- Sortable columns ready

### 7. Alert Storm Map
**File**: `src/lib/components/widgets/AlertStormMap.svelte`
- Geographic visualization
- Cluster-based alert grouping
- Severity-based sizing
- Pulsing animation for active alerts

### 8. Goal vs Actual Bullet Charts
**File**: `src/lib/components/widgets/GoalBulletChart.svelte`
- Target marker visualization
- Progress bar with thresholds
- Multi-metric support
- Percentage completion display

### 9. Forecast Panel with Confidence Bands
**File**: `src/lib/components/widgets/ForecastPanel.svelte`
- Prediction visualization
- Upper/lower bound display
- Confidence percentage
- Growth rate projection

### 10. Experiment Lift Panel
**File**: `src/lib/components/widgets/ExperimentPanel.svelte`
- A/B test results display
- Lift percentage with confidence
- Status indicators (running/concluded)
- Variant assignment

### 11. Personalization Impact Panel
**File**: `src/lib/components/widgets/PersonalizationImpact.svelte`
- Feature impact tracking
- User count per feature
- Aggregated total impact
- Status-based filtering

### 12. Risk Radar Panel
**File**: `src/lib/components/widgets/RiskRadar.svelte`
- Risk factor scoring
- Severity-based coloring
- Overall risk calculation
- Category breakdown

### 13. Outlier/Anomaly Timeline
**File**: `src/lib/components/widgets/OutlierTimeline.svelte`
- Chronological outlier display
- Deviation percentage
- Expected vs actual comparison
- Visual timeline connector

### 14. Scenario Simulator
**File**: `src/lib/components/widgets/ScenarioSimulator.svelte`
- What-if analysis controls
- Uplift/downside scenarios
- Impact calculation
- Apply/reset actions

### 15. Alert Intelligence Center
**File**: `src/lib/components/widgets/AlertCenter.svelte`
- Active alert list
- Acknowledge actions
- Severity filtering
- Deep linking support

## Widget Registry

Widgets are registered in the dashboard state and can be dynamically added/removed:

```typescript
interface WidgetConfig {
  id: string;
  type: keyof typeof WIDGET_REGISTRY;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  config?: Record<string, unknown>;
}
```

## Widget Transitions

All widgets support cinematic transitions via the widget-transitions module:

- `animateWidgetInsert`: Scale + fade entrance
- `animateWidgetRemove`: Scale + fade exit
- `animateDataUpdate`: Flash transition for data refresh
- `animateFilterApply`: Coordinated filter application

## Styling Consistency

All widgets follow institutional design standards:
- Border radius: `--radius-lg` (8px)
- Background: `--color-surface-base`
- Border: `--color-border-default`
- Shadow: `--shadow-depth-1` (elevated on hover)
