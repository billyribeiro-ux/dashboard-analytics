<script lang="ts">
	import type { CohortData } from '$lib/data/mock-data';
	
	let { data, title }: { data: CohortData[]; title: string } = $props();

	const maxPeriods = $derived(Math.max(...data.map(d => d.periods.length)));
	const allValues = $derived(data.flatMap(d => d.periods));
	const minValue = $derived(Math.min(...allValues));
	const maxValue = $derived(Math.max(...allValues));

	function getColor(value: number): string {
		const normalized = (value - minValue) / (maxValue - minValue);
		if (normalized > 0.8) return 'bg-institutional-accent-success';
		if (normalized > 0.6) return 'bg-institutional-data-3';
		if (normalized > 0.4) return 'bg-institutional-accent-warning';
		if (normalized > 0.2) return 'bg-institutional-data-4';
		return 'bg-institutional-accent-danger';
	}

	function getOpacity(value: number): number {
		return 0.3 + ((value - minValue) / (maxValue - minValue)) * 0.7;
	}
</script>

<div class="cohort-heatmap p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="heatmap-container overflow-x-auto">
		<div class="heatmap-grid">
			<div class="heatmap-header flex">
				<div class="cohort-label w-24 text-label-sm text-institutional-text-tertiary font-emphasis">Cohort</div>
				{#each Array(maxPeriods) as _, i}
					<div class="period-label w-12 text-center text-label-sm text-institutional-text-tertiary">
						{i === 0 ? 'M0' : `M${i}`}
					</div>
				{/each}
			</div>

			{#each data as cohort}
				<div class="heatmap-row flex items-center">
					<div class="cohort-label w-24 text-label-sm text-institutional-text-primary">{cohort.cohort}</div>
					{#each cohort.periods as value, i}
						<div 
							class="heatmap-cell w-12 h-10 flex items-center justify-center text-label-sm text-institutional-text-primary font-emphasis rounded-sm transition-all duration-fast hover:scale-110 cursor-pointer"
							class:opacity-30={value < 40}
							class:opacity-50={value >= 40 && value < 60}
							class:opacity-70={value >= 60 && value < 80}
							class:opacity-100={value >= 80}
							style="background-color: {value >= 80 ? 'var(--color-accent-success)' : value >= 60 ? 'var(--color-data-3)' : value >= 40 ? 'var(--color-accent-warning)' : 'var(--color-accent-danger)'}"
							title="{value}% retention"
						>
							{value}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="legend flex items-center gap-md mt-md">
		<span class="text-label-sm text-institutional-text-tertiary">Retention:</span>
		<div class="flex items-center gap-xs">
			<div class="w-4 h-4 rounded-sm bg-institutional-accent-danger opacity-50"></div>
			<span class="text-label-sm text-institutional-text-secondary">Low</span>
		</div>
		<div class="flex items-center gap-xs">
			<div class="w-4 h-4 rounded-sm bg-institutional-accent-warning opacity-70"></div>
			<span class="text-label-sm text-institutional-text-secondary">Medium</span>
		</div>
		<div class="flex items-center gap-xs">
			<div class="w-4 h-4 rounded-sm bg-institutional-accent-success opacity-100"></div>
			<span class="text-label-sm text-institutional-text-secondary">High</span>
		</div>
	</div>
</div>

<style>
	.heatmap-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.heatmap-cell {
		position: relative;
	}

	.heatmap-cell:hover {
		box-shadow: var(--shadow-depth-2);
		z-index: 10;
	}
</style>
