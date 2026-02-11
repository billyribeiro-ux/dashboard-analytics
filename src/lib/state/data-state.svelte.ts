import { z } from 'zod';

export const DataStatusSchema = z.enum(['idle', 'loading', 'success', 'error', 'stale']);
export type DataStatus = z.infer<typeof DataStatusSchema>;

export const DataSourceSchema = z.object({
	id: z.string(),
	name: z.string(),
	status: DataStatusSchema,
	lastUpdated: z.date().optional(),
	latency: z.number().optional(),
	error: z.string().optional()
});
export type DataSource = z.infer<typeof DataSourceSchema>;

class DataState {
	sources = $state<Map<string, DataSource>>(new Map());
	globalStatus = $derived.by(() => {
		const statuses = Array.from(this.sources.values()).map(s => s.status);
		if (statuses.some(s => s === 'error')) return 'error';
		if (statuses.some(s => s === 'loading')) return 'loading';
		if (statuses.some(s => s === 'stale')) return 'stale';
		if (statuses.every(s => s === 'success')) return 'success';
		return 'idle';
	});
	averageLatency = $derived.by(() => {
		const latencies = Array.from(this.sources.values())
			.map(s => s.latency)
			.filter((l): l is number => l !== undefined);
		if (latencies.length === 0) return 0;
		return latencies.reduce((sum, l) => sum + l, 0) / latencies.length;
	});

	registerSource(source: DataSource) {
		this.sources.set(source.id, source);
	}

	updateSource(sourceId: string, updates: Partial<DataSource>) {
		const source = this.sources.get(sourceId);
		if (source) {
			this.sources.set(sourceId, { ...source, ...updates });
		}
	}

	setSourceStatus(sourceId: string, status: DataStatus) {
		this.updateSource(sourceId, { status, lastUpdated: new Date() });
	}

	setSourceError(sourceId: string, error: string) {
		this.updateSource(sourceId, { status: 'error', error });
	}

	setSourceLatency(sourceId: string, latency: number) {
		this.updateSource(sourceId, { latency });
	}

	markSourceStale(sourceId: string) {
		this.updateSource(sourceId, { status: 'stale' });
	}

	getSource(sourceId: string): DataSource | undefined {
		return this.sources.get(sourceId);
	}

	getAllSources(): DataSource[] {
		return Array.from(this.sources.values());
	}
}

export const dataState = new DataState();
