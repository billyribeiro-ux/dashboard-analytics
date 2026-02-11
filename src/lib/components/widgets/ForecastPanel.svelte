<script lang="ts">
	let { title }: { title: string } = $props();

	const forecast = {
		current: 2847392,
		predicted: 3124500,
		confidence: 0.87,
		upperBound: 3285000,
		lowerBound: 2964000,
		growthRate: 9.7
	};
</script>

<div class="forecast-panel p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="forecast-main mb-md">
		<div class="text-display-sm font-display text-institutional-text-primary mb-xs">
			${(forecast.predicted / 1000000).toFixed(2)}M
		</div>
		<div class="flex items-center gap-xs">
			<span class="text-body-md text-institutional-accent-success font-emphasis">+{forecast.growthRate.toFixed(1)}%</span>
			<span class="text-body-sm text-institutional-text-secondary">predicted growth</span>
		</div>
	</div>

	<div class="confidence-band bg-institutional-surface-sunken rounded-md p-md mb-md">
		<div class="flex items-center justify-between text-label-sm mb-xs">
			<span class="text-institutional-text-tertiary">Lower Bound</span>
			<span class="text-institutional-text-tertiary">Upper Bound</span>
		</div>
		<div class="band-visual relative h-8 bg-institutional-surface-raised rounded-full overflow-hidden mb-xs">
			<div class="confidence-region absolute top-0 bottom-0 bg-institutional-accent-primary/30" style="left: 20%; right: 20%;"></div>
			<div class="prediction-marker absolute top-0 bottom-0 w-0.5 bg-institutional-accent-primary" style="left: 50%;"></div>
		</div>
		<div class="flex items-center justify-between text-body-sm">
			<span class="text-institutional-text-secondary">${(forecast.lowerBound / 1000000).toFixed(2)}M</span>
			<span class="text-institutional-text-primary font-emphasis">${(forecast.predicted / 1000000).toFixed(2)}M</span>
			<span class="text-institutional-text-secondary">${(forecast.upperBound / 1000000).toFixed(2)}M</span>
		</div>
	</div>

	<div class="confidence-indicator flex items-center gap-xs">
		<div class="flex-1 h-2 bg-institutional-surface-sunken rounded-full overflow-hidden">
			<div class="h-full bg-institutional-accent-success rounded-full" style="width: {forecast.confidence * 100}%"></div>
		</div>
		<span class="text-label-sm text-institutional-text-secondary">{(forecast.confidence * 100).toFixed(0)}% confidence</span>
	</div>
</div>

<style>
	.forecast-panel {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
