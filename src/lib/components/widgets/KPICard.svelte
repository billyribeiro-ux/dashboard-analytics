<script lang="ts">
	import type { KPIData } from '$lib/data/mock-data';
	
	let { data }: { data: KPIData } = $props();

	function formatValue(value: number, format?: string, unit?: string): string {
		if (format === 'currency') {
			return `$${(value / 1000).toFixed(1)}k`;
		}
		if (format === 'percent') {
			return `${value.toFixed(2)}%`;
		}
		return value.toLocaleString();
	}

	const trendColor = $derived(data.trend === 'up' ? 'text-institutional-accent-success' : data.trend === 'down' ? 'text-institutional-accent-danger' : 'text-institutional-text-tertiary');
	const trendIcon = $derived(data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→');
</script>

<div class="kpi-card bg-institutional-surface-base border border-institutional-border-default rounded-lg p-md hover:border-institutional-border-strong transition-all duration-normal">
	<div class="flex items-start justify-between mb-sm">
		<h3 class="text-label-md text-institutional-text-secondary uppercase tracking-wide">{data.label}</h3>
		<span class="text-label-sm text-institutional-text-tertiary">{(data.confidence * 100).toFixed(0)}%</span>
	</div>

	<div class="mb-sm">
		<div class="text-display-sm font-display text-institutional-text-primary">
			{formatValue(data.value, data.format, data.unit)}
		</div>
		<div class="flex items-center gap-xs mt-xs">
			<span class="{trendColor} text-body-sm font-emphasis flex items-center gap-micro">
				<span class="text-heading-sm">{trendIcon}</span>
				{data.deltaPercent > 0 ? '+' : ''}{data.deltaPercent.toFixed(1)}%
			</span>
			<span class="text-body-sm text-institutional-text-tertiary">
				vs. last period
			</span>
		</div>
	</div>

	<div class="sparkline h-12 relative">
		<svg class="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
			<polyline
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class="{trendColor}"
				points={data.sparkline.map((v, i) => `${(i / (data.sparkline.length - 1)) * 100},${40 - (v / Math.max(...data.sparkline)) * 35}`).join(' ')}
			/>
		</svg>
	</div>
</div>

<style>
	.kpi-card {
		box-shadow: var(--shadow-depth-1);
	}

	.kpi-card:hover {
		box-shadow: var(--shadow-depth-2);
		transform: translateY(-2px);
	}
</style>
