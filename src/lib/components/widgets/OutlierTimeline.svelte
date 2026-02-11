<script lang="ts">
	let { title }: { title: string } = $props();

	const outliers = [
		{ timestamp: new Date(Date.now() - 86400000 * 2), metric: 'Revenue', value: 145000, expected: 95000, deviation: 52.6 },
		{ timestamp: new Date(Date.now() - 86400000 * 5), metric: 'Signups', value: 2847, expected: 1200, deviation: 137.3 },
		{ timestamp: new Date(Date.now() - 86400000 * 8), metric: 'Churn', value: 8.2, expected: 2.1, deviation: 290.5 }
	];

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div class="outlier-timeline p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="timeline-container relative">
		<div class="timeline-line absolute left-4 top-0 bottom-0 w-0.5 bg-institutional-border-subtle"></div>

		<div class="outlier-list space-y-md">
			{#each outliers as outlier, i}
				<div class="outlier-item relative pl-12">
					<div class="timeline-dot absolute left-2 w-4 h-4 rounded-full border-2 border-institutional-accent-danger bg-institutional-surface-base"></div>
					
					<div class="outlier-card bg-institutional-surface-raised border border-institutional-border-subtle rounded-md p-sm hover:bg-institutional-surface-interactive transition-colors duration-fast">
						<div class="flex items-center justify-between mb-xs">
							<span class="text-label-sm text-institutional-text-tertiary">{formatDate(outlier.timestamp)}</span>
							<span class="text-label-sm px-xs py-micro rounded-micro bg-institutional-accent-danger/20 text-institutional-accent-danger">
								+{outlier.deviation.toFixed(1)}%
							</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-body-sm font-emphasis text-institutional-text-primary">{outlier.metric}</span>
							<div class="text-right">
								<div class="text-body-sm text-institutional-accent-danger">{typeof outlier.value === 'number' && outlier.value > 1000 ? outlier.value.toLocaleString() : outlier.value}</div>
								<div class="text-label-sm text-institutional-text-tertiary">Expected: {typeof outlier.expected === 'number' && outlier.expected > 1000 ? outlier.expected.toLocaleString() : outlier.expected}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.outlier-timeline {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}

	.timeline-dot {
		z-index: 10;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
