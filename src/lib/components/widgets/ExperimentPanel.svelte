<script lang="ts">
	let { title }: { title: string } = $props();

	const experiments = [
		{ id: 'exp-1', name: 'New Landing Page', variant: 'A', lift: 8.3, confidence: 0.95, status: 'running' },
		{ id: 'exp-2', name: 'Pricing Test', variant: 'B', lift: -2.1, confidence: 0.82, status: 'running' },
		{ id: 'exp-3', name: 'Checkout Flow', variant: 'A', lift: 12.7, confidence: 0.98, status: 'concluded' }
	];

	function getLiftColor(lift: number): string {
		return lift > 0 ? 'text-institutional-accent-success' : lift < 0 ? 'text-institutional-accent-danger' : 'text-institutional-text-secondary';
	}
</script>

<div class="experiment-panel p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="experiment-list space-y-sm">
		{#each experiments as exp}
			<div class="experiment-card bg-institutional-surface-raised border border-institutional-border-subtle rounded-md p-sm">
				<div class="flex items-center justify-between mb-xs">
					<span class="text-body-sm font-emphasis text-institutional-text-primary">{exp.name}</span>
					<span class="text-label-sm px-xs py-micro rounded-full {exp.status === 'running' ? 'bg-institutional-accent-info/20 text-institutional-accent-info' : 'bg-institutional-accent-success/20 text-institutional-accent-success'}">
						{exp.status}
					</span>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-md">
						<span class="text-label-sm text-institutional-text-secondary">Variant {exp.variant}</span>
						<span class="text-label-sm text-institutional-text-tertiary">{(exp.confidence * 100).toFixed(0)}% confidence</span>
					</div>
					<span class="text-body-md font-heading {getLiftColor(exp.lift)}">
						{exp.lift > 0 ? '+' : ''}{exp.lift.toFixed(1)}%
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.experiment-panel {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
