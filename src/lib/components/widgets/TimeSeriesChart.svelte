<script lang="ts">
	import type { TimeSeriesData } from '$lib/data/mock-data';
	
	let { data, title }: { data: TimeSeriesData[]; title: string } = $props();

	let visibleSeries = $state<Set<string>>(new Set());
	
	$effect(() => {
		visibleSeries = new Set(data.map(s => s.id));
	});

	function getViewBox(data: TimeSeriesData[]): string {
		const allValues = data.flatMap(series => series.data.map(d => d.value));
		const minValue = Math.min(...allValues);
		const maxValue = Math.max(...allValues);
		return `0 ${minValue * 0.9} 100 ${(maxValue - minValue) * 1.2}`;
	}

	function getPath(series: TimeSeriesData): string {
		const points = series.data.map((point, i) => {
			const x = (i / (series.data.length - 1)) * 100;
			const y = point.value;
			return `${x},${y}`;
		});
		return points.join(' ');
	}

	function toggleSeries(id: string) {
		if (visibleSeries.has(id)) {
			visibleSeries.delete(id);
		} else {
			visibleSeries.add(id);
		}
		visibleSeries = new Set(visibleSeries);
	}
</script>

<div class="time-series-chart p-md">
	<div class="flex items-center justify-between mb-md">
		<h3 class="text-heading-md font-heading text-institutional-text-primary">{title}</h3>
		<div class="legend flex gap-md">
			{#each data as series}
				<button
					class="legend-item flex items-center gap-xs px-sm py-xs rounded-md hover:bg-institutional-surface-interactive transition-colors duration-fast"
					class:opacity-50={!visibleSeries.has(series.id)}
					onclick={() => toggleSeries(series.id)}
				>
					<div class="w-3 h-3 rounded-full" style="background-color: {series.color}"></div>
					<span class="text-label-md text-institutional-text-primary">{series.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="chart-container h-64 relative">
		<svg class="w-full h-full" viewBox={getViewBox(data)} preserveAspectRatio="none">
			<defs>
				{#each data as series}
					<linearGradient id="gradient-{series.id}" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" style="stop-color:{series.color};stop-opacity:0.2" />
						<stop offset="100%" style="stop-color:{series.color};stop-opacity:0" />
					</linearGradient>
				{/each}
			</defs>

			{#each data as series}
				{#if visibleSeries.has(series.id)}
					<polyline
						fill="none"
						stroke={series.color}
						stroke-width="0.5"
						points={getPath(series)}
						class="transition-opacity duration-normal"
					/>
				{/if}
			{/each}
		</svg>

		<div class="axis-labels absolute inset-0 pointer-events-none">
			<div class="flex justify-between text-label-sm text-institutional-text-tertiary px-sm pb-sm absolute bottom-0 left-0 right-0">
				<span>30d ago</span>
				<span>15d ago</span>
				<span>Today</span>
			</div>
		</div>
	</div>
</div>

<style>
	.chart-container {
		position: relative;
	}

	.legend-item {
		cursor: pointer;
	}
</style>
