<script lang="ts">
	let { title }: { title: string } = $props();

	const goals = [
		{ name: 'Revenue Target', actual: 2.85, target: 3.0, unit: 'M' },
		{ name: 'User Growth', actual: 48392, target: 50000, unit: '' },
		{ name: 'Conversion Rate', actual: 3.42, target: 4.0, unit: '%' }
	];

	function getProgress(actual: number, target: number): number {
		return Math.min((actual / target) * 100, 100);
	}
</script>

<div class="goal-bullet-chart p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="goal-list space-y-md">
		{#each goals as goal}
			{@const progress = getProgress(goal.actual, goal.target)}
			<div class="goal-item">
				<div class="flex items-center justify-between mb-xs">
					<span class="text-body-sm text-institutional-text-primary">{goal.name}</span>
					<span class="text-body-sm text-institutional-text-secondary">
						{goal.unit === 'M' ? `$${goal.actual.toFixed(2)}M` : goal.unit === '%' ? `${goal.actual.toFixed(2)}%` : goal.actual.toLocaleString()}
						/ {goal.unit === 'M' ? `$${goal.target.toFixed(2)}M` : goal.unit === '%' ? `${goal.target.toFixed(2)}%` : goal.target.toLocaleString()}
					</span>
				</div>
				<div class="bullet-container relative h-4 bg-institutional-surface-sunken rounded-full overflow-hidden">
					<div class="target-marker absolute top-0 bottom-0 w-0.5 bg-institutional-text-tertiary z-10" style="left: 100%"></div>
					<div 
						class="actual-bar h-full rounded-full transition-all duration-slow {progress >= 100 ? 'bg-institutional-accent-success' : progress >= 70 ? 'bg-institutional-accent-warning' : 'bg-institutional-accent-danger'}"
						style="width: {progress}%"
					></div>
				</div>
				<div class="flex justify-between mt-xs">
					<span class="text-label-sm text-institutional-text-tertiary">0</span>
					<span class="text-label-sm text-institutional-text-secondary font-emphasis">{progress.toFixed(1)}%</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.goal-bullet-chart {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
