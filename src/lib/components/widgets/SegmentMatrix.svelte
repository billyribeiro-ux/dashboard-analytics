<script lang="ts">
	import type { SegmentData } from '$lib/data/mock-data';
	
	let { data, title }: { data: SegmentData[]; title: string } = $props();

	const metrics = ['revenue', 'users', 'ltv', 'churn'];
	const metricLabels: Record<string, string> = {
		revenue: 'Revenue',
		users: 'Users',
		ltv: 'LTV',
		churn: 'Churn'
	};

	function formatMetric(key: string, value: number): string {
		if (key === 'revenue') return `$${(value / 1000).toFixed(0)}k`;
		if (key === 'ltv') return `$${value.toFixed(0)}`;
		if (key === 'churn') return `${value.toFixed(1)}%`;
		return value.toLocaleString();
	}

	function getMetricColor(key: string, value: number): string {
		if (key === 'churn') {
			return value < 3 ? 'text-institutional-accent-success' : value < 5 ? 'text-institutional-accent-warning' : 'text-institutional-accent-danger';
		}
		return 'text-institutional-text-primary';
	}
</script>

<div class="segment-matrix p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="matrix-container overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-institutional-border-default">
					<th class="text-left p-sm text-label-md font-label text-institutional-text-secondary">Segment</th>
					{#each metrics as metric}
						<th class="text-right p-sm text-label-md font-label text-institutional-text-secondary">{metricLabels[metric]}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as segment}
					<tr class="border-b border-institutional-border-subtle hover:bg-institutional-surface-interactive transition-colors duration-fast">
						<td class="p-sm text-body-sm font-emphasis text-institutional-text-primary">{segment.segment}</td>
						{#each metrics as metric}
							<td class="p-sm text-right text-body-sm {getMetricColor(metric, segment.metrics[metric])}">
								{formatMetric(metric, segment.metrics[metric])}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.segment-matrix {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
