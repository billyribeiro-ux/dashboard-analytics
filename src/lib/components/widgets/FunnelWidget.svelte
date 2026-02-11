<script lang="ts">
	import type { FunnelStageData } from '$lib/data/mock-data';
	
	let { data, title }: { data: FunnelStageData[]; title: string } = $props();

	const maxValue = $derived(Math.max(...data.map(d => d.value)));
</script>

<div class="funnel-widget p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="funnel-stages space-y-sm">
		{#each data as stage, index}
			{@const width = (stage.value / maxValue) * 100}
			<div class="funnel-stage">
				<div class="flex items-center justify-between mb-xs">
					<span class="text-body-md text-institutional-text-primary font-emphasis">{stage.stage}</span>
					<div class="flex items-center gap-md">
						<span class="text-body-sm text-institutional-text-secondary">{stage.value.toLocaleString()}</span>
						{#if index > 0}
							<span class="text-label-sm text-institutional-accent-{stage.conversionRate >= 50 ? 'success' : 'warning'}">
								{stage.conversionRate.toFixed(1)}% conversion
							</span>
						{/if}
					</div>
				</div>
				<div class="funnel-bar-container h-8 bg-institutional-surface-sunken rounded-md overflow-hidden">
					<div 
						class="funnel-bar h-full bg-institutional-accent-primary transition-all duration-slow"
						style="width: {width}%"
					></div>
				</div>
				{#if index < data.length - 1}
					<div class="dropoff-indicator text-label-sm text-institutional-text-tertiary mt-xs">
						↓ {stage.dropoff.toFixed(1)}% drop-off
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.funnel-stage {
		position: relative;
	}

	.funnel-bar {
		background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
	}
</style>
