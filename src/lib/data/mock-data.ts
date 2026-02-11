export interface KPIData {
	id: string;
	label: string;
	value: number;
	delta: number;
	deltaPercent: number;
	trend: 'up' | 'down' | 'flat';
	confidence: number;
	sparkline: number[];
	unit?: string;
	format?: 'number' | 'currency' | 'percent';
}

export interface TimeSeriesPoint {
	timestamp: Date;
	value: number;
	label?: string;
}

export interface TimeSeriesData {
	id: string;
	label: string;
	data: TimeSeriesPoint[];
	color?: string;
}

export interface FunnelStageData {
	stage: string;
	value: number;
	conversionRate: number;
	dropoff: number;
}

export interface CohortData {
	cohort: string;
	periods: number[];
}

export interface SegmentData {
	segment: string;
	metrics: Record<string, number>;
}

export function generateMockKPIs(): KPIData[] {
	return [
		{
			id: 'revenue',
			label: 'Total Revenue',
			value: 2847392,
			delta: 142847,
			deltaPercent: 5.3,
			trend: 'up',
			confidence: 0.94,
			sparkline: [2.1, 2.3, 2.2, 2.5, 2.7, 2.6, 2.8],
			unit: '$',
			format: 'currency'
		},
		{
			id: 'users',
			label: 'Active Users',
			value: 48392,
			delta: -1203,
			deltaPercent: -2.4,
			trend: 'down',
			confidence: 0.89,
			sparkline: [45, 47, 49, 50, 48, 47, 48],
			format: 'number'
		},
		{
			id: 'conversion',
			label: 'Conversion Rate',
			value: 3.42,
			delta: 0.18,
			deltaPercent: 5.6,
			trend: 'up',
			confidence: 0.92,
			sparkline: [3.1, 3.2, 3.3, 3.2, 3.4, 3.5, 3.4],
			unit: '%',
			format: 'percent'
		},
		{
			id: 'churn',
			label: 'Churn Rate',
			value: 2.1,
			delta: -0.3,
			deltaPercent: -12.5,
			trend: 'down',
			confidence: 0.87,
			sparkline: [2.8, 2.6, 2.4, 2.3, 2.2, 2.1, 2.1],
			unit: '%',
			format: 'percent'
		}
	];
}

export function generateMockTimeSeries(): TimeSeriesData[] {
	const now = Date.now();
	const dayMs = 24 * 60 * 60 * 1000;

	return [
		{
			id: 'series1',
			label: 'Revenue',
			color: '#4a9eff',
			data: Array.from({ length: 30 }, (_, i) => ({
				timestamp: new Date(now - (29 - i) * dayMs),
				value: 80000 + Math.random() * 40000 + i * 1000
			}))
		},
		{
			id: 'series2',
			label: 'Target',
			color: '#3fb950',
			data: Array.from({ length: 30 }, (_, i) => ({
				timestamp: new Date(now - (29 - i) * dayMs),
				value: 90000 + i * 1200
			}))
		}
	];
}

export function generateMockFunnelData(): FunnelStageData[] {
	return [
		{ stage: 'Awareness', value: 100000, conversionRate: 100, dropoff: 0 },
		{ stage: 'Interest', value: 45000, conversionRate: 45, dropoff: 55 },
		{ stage: 'Consideration', value: 18000, conversionRate: 40, dropoff: 60 },
		{ stage: 'Intent', value: 7200, conversionRate: 40, dropoff: 60 },
		{ stage: 'Purchase', value: 3420, conversionRate: 47.5, dropoff: 52.5 }
	];
}

export function generateMockCohortData(): CohortData[] {
	return [
		{ cohort: 'Jan 2026', periods: [100, 85, 72, 65, 58, 52, 48, 45, 42, 40, 38, 36] },
		{ cohort: 'Dec 2025', periods: [100, 82, 68, 60, 54, 49, 45, 42, 39, 37, 35] },
		{ cohort: 'Nov 2025', periods: [100, 88, 75, 68, 62, 57, 53, 50, 47, 45] },
		{ cohort: 'Oct 2025', periods: [100, 84, 70, 63, 56, 51, 47, 44, 41] },
		{ cohort: 'Sep 2025', periods: [100, 86, 73, 66, 59, 54, 50, 47] },
		{ cohort: 'Aug 2025', periods: [100, 83, 69, 61, 55, 50, 46] }
	];
}

export function generateMockSegmentData(): SegmentData[] {
	return [
		{ segment: 'Enterprise', metrics: { revenue: 1200000, users: 450, ltv: 2667, churn: 1.2 } },
		{ segment: 'Mid-Market', metrics: { revenue: 850000, users: 1200, ltv: 708, churn: 2.5 } },
		{ segment: 'SMB', metrics: { revenue: 650000, users: 4800, ltv: 135, churn: 4.8 } },
		{ segment: 'Startup', metrics: { revenue: 147392, users: 1942, ltv: 76, churn: 8.2 } }
	];
}

export interface EventData {
	id: string;
	timestamp: Date;
	type: string;
	severity: 'info' | 'warn' | 'high' | 'critical';
	message: string;
	metadata?: Record<string, unknown>;
}

export function generateMockEventStream(): EventData[] {
	const now = Date.now();
	const events: EventData[] = [];

	for (let i = 0; i < 50; i++) {
		events.push({
			id: `event-${i}`,
			timestamp: new Date(now - i * 60000),
			type: ['user_action', 'system_event', 'metric_threshold', 'anomaly'][Math.floor(Math.random() * 4)],
			severity: ['info', 'warn', 'high', 'critical'][Math.floor(Math.random() * 4)] as EventData['severity'],
			message: `Event ${i}: ${['User signup', 'Payment processed', 'Threshold exceeded', 'Anomaly detected'][Math.floor(Math.random() * 4)]}`
		});
	}

	return events;
}
