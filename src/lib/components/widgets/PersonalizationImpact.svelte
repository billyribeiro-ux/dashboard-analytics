<script lang="ts">
	let { title }: { title: string } = $props();

	const personalizationMetrics = [
		{ feature: 'Recommendation Engine', impact: 23.5, users: 42000, status: 'active' },
		{ feature: 'Dynamic Pricing', impact: 15.2, users: 28000, status: 'active' },
		{ feature: 'A/B Test: Landing', impact: 8.7, users: 15000, status: 'running' },
		{ feature: 'Smart Notifications', impact: 12.3, users: 35000, status: 'active' }
	];
</script>

<div class="personalization-impact p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="impact-list space-y-sm">
		{#each personalizationMetrics as metric}
			<div class="impact-card bg-institutional-surface-raised border border-institutional-border-subtle rounded-md p-sm">
				<div class="flex items-center justify-between mb-xs">
					<span class="text-body-sm font-emphasis text-institutional-text-primary">{metric.feature}</span>
					<span class="text-label-sm px-xs py-micro rounded-full {metric.status === 'active' ? 'bg-institutional-accent-success/20 text-institutional-accent-success' : 'bg-institutional-accent-info/20 text-institutional-accent-info'}">
						{metric.status}
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-label-sm text-institutional-text-secondary">{metric.users.toLocaleString()} users</span>
					<span class="text-body-md font-heading text-institutional-accent-success">
						+{metric.impact.toFixed(1)}%
					</span>
				</div>
				<div class="impact-bar mt-xs h-1 bg-institutional-surface-sunken rounded-full overflow-hidden">
					<div class="h-full bg-institutional-accent-success rounded-full" style="width: {Math.min(metric.impact * 2, 100)}%"></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="impact-summary mt-md pt-md border-t border-institutional-border-subtle">
		<div class="flex items-center justify-between">
			<span class="text-body-sm text-institutional-text-secondary">Total Impact</span>
			<span class="text-heading-sm font-heading text-institutional-accent-success">
				+{personalizationMetrics.reduce((sum, m) => sum + m.impact, 0).toFixed(1)}%
			</span>
		</div>
	</div>
</div>

<style>
	.personalization-impact {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
