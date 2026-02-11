<script lang="ts">
	let { title }: { title: string } = $props();

	let upliftScenario = $state(5);
	let downsideScenario = $state(-10);

	const baseMetrics = {
		revenue: 2847392,
		users: 48392,
		conversion: 3.42,
		churn: 2.1
	};

	function applyScenario(scenario: number) {
		return {
			revenue: baseMetrics.revenue * (1 + scenario / 100),
			users: baseMetrics.users * (1 + scenario / 100),
			conversion: baseMetrics.conversion * (1 + scenario / 100),
			churn: baseMetrics.churn * (1 + scenario / 100)
		};
	}

	const upliftMetrics = $derived(applyScenario(upliftScenario));
	const downsideMetrics = $derived(applyScenario(downsideScenario));
</script>

<div class="scenario-simulator p-md">
	<div class="flex items-center justify-between mb-md">
		<h3 class="text-heading-md font-heading text-institutional-text-primary">{title}</h3>
		<span class="text-label-sm px-xs py-micro rounded-md bg-institutional-accent-warning/20 text-institutional-accent-warning">Simulation</span>
	</div>

	<div class="scenario-controls space-y-md mb-md">
		<div class="scenario-control">
			<div class="flex items-center justify-between mb-xs">
				<label class="text-body-sm text-institutional-text-secondary">Uplift Scenario</label>
				<span class="text-body-sm font-emphasis text-institutional-accent-success">+{upliftScenario}%</span>
			</div>
			<input
				type="range"
				min="0"
				max="50"
				step="1"
				bind:value={upliftScenario}
				class="w-full h-2 bg-institutional-surface-sunken rounded-full appearance-none cursor-pointer"
			/>
		</div>

		<div class="scenario-control">
			<div class="flex items-center justify-between mb-xs">
				<label class="text-body-sm text-institutional-text-secondary">Downside Scenario</label>
				<span class="text-body-sm font-emphasis text-institutional-accent-danger">{downsideScenario}%</span>
			</div>
			<input
				type="range"
				min="-50"
				max="0"
				step="1"
				bind:value={downsideScenario}
				class="w-full h-2 bg-institutional-surface-sunken rounded-full appearance-none cursor-pointer"
			/>
		</div>
	</div>

	<div class="scenario-results space-y-sm">
		<div class="scenario-row flex items-center justify-between py-xs">
			<span class="text-label-sm text-institutional-text-tertiary">Current</span>
			<span class="text-label-sm text-institutional-text-secondary">${(baseMetrics.revenue / 1000000).toFixed(2)}M</span>
		</div>
		<div class="scenario-row flex items-center justify-between py-xs px-sm bg-institutional-accent-success/10 rounded-md">
			<span class="text-label-sm text-institutional-text-secondary">Uplift Impact</span>
			<span class="text-body-sm font-emphasis text-institutional-accent-success">
				+${((upliftMetrics.revenue - baseMetrics.revenue) / 1000).toFixed(0)}k
			</span>
		</div>
		<div class="scenario-row flex items-center justify-between py-xs px-sm bg-institutional-accent-danger/10 rounded-md">
			<span class="text-label-sm text-institutional-text-secondary">Downside Impact</span>
			<span class="text-body-sm font-emphasis text-institutional-accent-danger">
				${((downsideMetrics.revenue - baseMetrics.revenue) / 1000).toFixed(0)}k
			</span>
		</div>
	</div>

	<div class="scenario-actions flex gap-sm mt-md pt-md border-t border-institutional-border-subtle">
		<button class="flex-1 px-sm py-sm rounded-md bg-institutional-accent-primary text-institutional-text-inverse text-label-md hover:opacity-90 transition-opacity">
			Apply to Dashboard
		</button>
		<button class="px-sm py-sm rounded-md border border-institutional-border-default text-institutional-text-primary text-label-md hover:bg-institutional-surface-interactive transition-colors">
			Reset
		</button>
	</div>
</div>

<style>
	.scenario-simulator {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}

	input[type="range"]::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-accent-primary);
		cursor: pointer;
	}

	input[type="range"]::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-accent-primary);
		cursor: pointer;
		border: none;
	}
</style>
