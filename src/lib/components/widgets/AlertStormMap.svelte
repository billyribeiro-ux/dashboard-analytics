<script lang="ts">
	let { title }: { title: string } = $props();

	const alertClusters = [
		{ region: 'us-east-1', count: 3, severity: 'high', x: 75, y: 40 },
		{ region: 'us-west-2', count: 1, severity: 'warn', x: 20, y: 45 },
		{ region: 'eu-west-1', count: 5, severity: 'critical', x: 50, y: 30 },
		{ region: 'ap-southeast-1', count: 2, severity: 'info', x: 80, y: 70 }
	];

	const severityColors = {
		info: 'bg-institutional-accent-info',
		warn: 'bg-institutional-accent-warning',
		high: 'bg-institutional-accent-danger',
		critical: 'bg-institutional-accent-danger'
	};

	const severitySizes = {
		info: 'w-3 h-3',
		warn: 'w-4 h-4',
		high: 'w-5 h-5',
		critical: 'w-6 h-6'
	};
</script>

<div class="alert-storm-map p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="map-container relative h-48 bg-institutional-surface-sunken rounded-lg overflow-hidden">
		<div class="world-map absolute inset-0 opacity-20">
			<svg viewBox="0 0 100 50" class="w-full h-full" preserveAspectRatio="none">
				<rect fill="currentColor" class="text-institutional-text-secondary" width="100" height="50"/>
			</svg>
		</div>

		{#each alertClusters as cluster}
			<div 
				class="alert-cluster absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-fast"
				style="left: {cluster.x}%; top: {cluster.y}%"
			>
				<div class="relative">
					<div class="{severitySizes[cluster.severity]} {severityColors[cluster.severity]} rounded-full animate-pulse opacity-70"></div>
					<div class="absolute -top-1 -right-1 min-w-4 h-4 bg-institutional-surface-elevated rounded-full flex items-center justify-center text-label-sm text-institutional-text-inverse border border-institutional-border-default">
						{cluster.count}
					</div>
				</div>
				<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-xs whitespace-nowrap">
					<span class="text-label-sm text-institutional-text-secondary bg-institutional-surface-elevated px-xs py-micro rounded-micro">{cluster.region}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="alert-summary flex justify-between mt-md pt-md border-t border-institutional-border-subtle">
		<div class="text-center">
			<div class="text-body-md font-emphasis text-institutional-accent-critical">12</div>
			<div class="text-label-sm text-institutional-text-tertiary">Critical</div>
		</div>
		<div class="text-center">
			<div class="text-body-md font-emphasis text-institutional-accent-danger">8</div>
			<div class="text-label-sm text-institutional-text-tertiary">High</div>
		</div>
		<div class="text-center">
			<div class="text-body-md font-emphasis text-institutional-accent-warning">15</div>
			<div class="text-label-sm text-institutional-text-tertiary">Warn</div>
		</div>
		<div class="text-center">
			<div class="text-body-md font-emphasis text-institutional-accent-info">23</div>
			<div class="text-label-sm text-institutional-text-tertiary">Info</div>
		</div>
	</div>
</div>

<style>
	.alert-storm-map {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.7;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
