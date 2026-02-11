import { z } from 'zod';

export const DensityModeSchema = z.enum(['focus', 'analyst', 'executive']);
export type DensityMode = z.infer<typeof DensityModeSchema>;

export const FilterSchema = z.object({
	id: z.string(),
	field: z.string(),
	operator: z.enum(['equals', 'contains', 'greaterThan', 'lessThan', 'between', 'in']),
	value: z.unknown(),
	isPinned: z.boolean().default(false),
	isTemp: z.boolean().default(false)
});
export type Filter = z.infer<typeof FilterSchema>;

export const TimeRangeSchema = z.object({
	start: z.date(),
	end: z.date(),
	preset: z.enum(['today', 'yesterday', 'last7days', 'last30days', 'last90days', 'custom']).optional()
});
export type TimeRange = z.infer<typeof TimeRangeSchema>;

export const WidgetConfigSchema = z.object({
	id: z.string(),
	type: z.string(),
	title: z.string(),
	position: z.object({ x: z.number(), y: z.number() }),
	size: z.object({ width: z.number(), height: z.number() }),
	config: z.record(z.unknown()).optional()
});
export type WidgetConfig = z.infer<typeof WidgetConfigSchema>;

export const LayoutPresetSchema = z.object({
	id: z.string(),
	name: z.string(),
	densityMode: DensityModeSchema,
	widgets: z.array(WidgetConfigSchema),
	isDefault: z.boolean().default(false),
	isLocked: z.boolean().default(false)
});
export type LayoutPreset = z.infer<typeof LayoutPresetSchema>;

class DashboardState {
	densityMode = $state<DensityMode>('analyst');
	isEditMode = $state(false);
	activeFilters = $state<Filter[]>([]);
	timeRange = $state<TimeRange>({
		start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
		end: new Date(),
		preset: 'last7days'
	});
	widgets = $state<WidgetConfig[]>([]);
	activePreset = $state<string | null>(null);
	compareMode = $state(false);
	comparePeriod = $state<TimeRange | null>(null);
	selectedDataPoint = $state<{ widgetId: string; data: unknown } | null>(null);
	drilldownStack = $state<Array<{ widgetId: string; context: unknown }>>([]);

	addFilter(filter: Filter) {
		this.activeFilters.push(filter);
	}

	removeFilter(filterId: string) {
		this.activeFilters = this.activeFilters.filter(f => f.id !== filterId);
	}

	updateFilter(filterId: string, updates: Partial<Filter>) {
		const index = this.activeFilters.findIndex(f => f.id === filterId);
		if (index !== -1) {
			this.activeFilters[index] = { ...this.activeFilters[index], ...updates };
		}
	}

	clearTempFilters() {
		this.activeFilters = this.activeFilters.filter(f => !f.isTemp);
	}

	setTimeRange(range: TimeRange) {
		this.timeRange = range;
	}

	toggleCompareMode() {
		this.compareMode = !this.compareMode;
		if (this.compareMode && !this.comparePeriod) {
			const duration = this.timeRange.end.getTime() - this.timeRange.start.getTime();
			this.comparePeriod = {
				start: new Date(this.timeRange.start.getTime() - duration),
				end: new Date(this.timeRange.start.getTime()),
				preset: 'custom'
			};
		}
	}

	setDensityMode(mode: DensityMode) {
		this.densityMode = mode;
	}

	toggleEditMode() {
		this.isEditMode = !this.isEditMode;
	}

	addWidget(widget: WidgetConfig) {
		this.widgets.push(widget);
	}

	removeWidget(widgetId: string) {
		this.widgets = this.widgets.filter(w => w.id !== widgetId);
	}

	updateWidget(widgetId: string, updates: Partial<WidgetConfig>) {
		const index = this.widgets.findIndex(w => w.id === widgetId);
		if (index !== -1) {
			this.widgets[index] = { ...this.widgets[index], ...updates };
		}
	}

	selectDataPoint(widgetId: string, data: unknown) {
		this.selectedDataPoint = { widgetId, data };
	}

	clearSelection() {
		this.selectedDataPoint = null;
	}

	pushDrilldown(widgetId: string, context: unknown) {
		this.drilldownStack.push({ widgetId, context });
	}

	popDrilldown() {
		this.drilldownStack.pop();
	}

	clearDrilldown() {
		this.drilldownStack = [];
	}
}

export const dashboardState = new DashboardState();
