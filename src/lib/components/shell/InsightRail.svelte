<script lang="ts">
	import { alertState } from '$lib/state/alert-state.svelte';

	const insights = [
		{
			type: 'anomaly',
			severity: 'high',
			title: 'Revenue Spike Detected',
			message: 'Revenue increased 23% above forecast in the last 2 hours',
			timestamp: new Date(Date.now() - 120000),
			confidence: 0.94
		},
		{
			type: 'change',
			severity: 'info',
			title: 'User Behavior Shift',
			message: 'Mobile traffic increased from 45% to 58%',
			timestamp: new Date(Date.now() - 300000),
			confidence: 0.89
		},
		{
			type: 'recommendation',
			severity: 'info',
			title: 'Optimization Opportunity',
			message: 'Consider increasing ad spend on high-performing segments',
			timestamp: new Date(Date.now() - 600000),
			confidence: 0.82
		}
	];

	const actions = [
		{ label: 'Review Revenue Anomaly', action: 'drill-revenue' },
		{ label: 'Analyze Mobile Traffic', action: 'analyze-mobile' },
		{ label: 'Export Segment Report', action: 'export-segments' }
	];
</script>

<aside class="insight-rail w-80 bg-institutional-surface-base border-l border-institutional-border-default overflow-y-auto">
	<div class="p-md">
		<div class="rail-section mb-lg">
			<h2 class="text-heading-sm font-heading text-institutional-text-primary mb-md">Insights</h2>
			
			<div class="space-y-sm">
				{#each insights as insight}
					<div class="insight-card bg-institutional-surface-raised border border-institutional-border-subtle rounded-md p-sm">
						<div class="flex items-start justify-between mb-xs">
							<span class="text-label-sm text-institutional-accent-{insight.severity === 'high' ? 'danger' : 'info'} uppercase">
								{insight.type}
							</span>
							<span class="text-label-sm text-institutional-text-tertiary">
								{Math.floor((Date.now() - insight.timestamp.getTime()) / 60000)}m ago
							</span>
						</div>
						<h3 class="text-body-md font-emphasis text-institutional-text-primary mb-xs">{insight.title}</h3>
						<p class="text-body-sm text-institutional-text-secondary mb-sm">{insight.message}</p>
						<div class="flex items-center justify-between">
							<span class="text-label-sm text-institutional-text-tertiary">
								{(insight.confidence * 100).toFixed(0)}% confidence
							</span>
							<button class="text-label-sm text-institutional-accent-primary hover:underline">
								Investigate →
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="rail-section mb-lg">
			<h2 class="text-heading-sm font-heading text-institutional-text-primary mb-md">What Changed</h2>
			
			<div class="space-y-sm">
				<div class="change-item border-l-2 border-institutional-accent-success pl-sm py-xs">
					<p class="text-body-sm text-institutional-text-primary font-emphasis">+5.3% Revenue</p>
					<p class="text-label-sm text-institutional-text-tertiary">vs. last period</p>
				</div>
				<div class="change-item border-l-2 border-institutional-accent-danger pl-sm py-xs">
					<p class="text-body-sm text-institutional-text-primary font-emphasis">-2.4% Active Users</p>
					<p class="text-label-sm text-institutional-text-tertiary">vs. last period</p>
				</div>
				<div class="change-item border-l-2 border-institutional-accent-success pl-sm py-xs">
					<p class="text-body-sm text-institutional-text-primary font-emphasis">+5.6% Conversion</p>
					<p class="text-label-sm text-institutional-text-tertiary">vs. last period</p>
				</div>
			</div>
		</div>

		<div class="rail-section">
			<h2 class="text-heading-sm font-heading text-institutional-text-primary mb-md">Suggested Actions</h2>
			
			<div class="space-y-xs">
				{#each actions as action}
					<button class="action-button w-full px-sm py-sm rounded-md bg-institutional-surface-interactive hover:bg-institutional-surface-interactive-hover transition-colors duration-fast text-left text-body-sm text-institutional-text-primary">
						{action.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</aside>

<style>
	.insight-rail {
		height: calc(100vh - 56px);
	}

	.insight-card {
		transition: all var(--duration-fast) var(--easing-institutional);
	}

	.insight-card:hover {
		border-color: var(--color-border-default);
		box-shadow: var(--shadow-depth-2);
	}

	.action-button:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}
</style>
