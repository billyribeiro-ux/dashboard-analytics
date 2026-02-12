<script lang="ts">
	import KPICard from '../widgets/KPICard.svelte';
	import TimeSeriesChart from '../widgets/TimeSeriesChart.svelte';
	import FunnelWidget from '../widgets/FunnelWidget.svelte';
	import CohortHeatmap from '../widgets/CohortHeatmap.svelte';
	import LiveEventTape from '../widgets/LiveEventTape.svelte';
	import SegmentMatrix from '../widgets/SegmentMatrix.svelte';
	import { generateMockKPIs, generateMockTimeSeries, generateMockFunnelData, generateMockCohortData, generateMockEventStream, generateMockSegmentData } from '$lib/data/mock-data';
	import { dashboardState } from '$lib/state/dashboard-state.svelte';

	let { kpiRowRef = $bindable() }: { kpiRowRef?: HTMLElement } = $props();

	const kpis = generateMockKPIs();
	const timeSeries = generateMockTimeSeries();
	const funnelData = generateMockFunnelData();
	const cohortData = generateMockCohortData();
	const eventStream = generateMockEventStream();
	const segmentData = generateMockSegmentData();

	let primaryChartsRefs = $state<HTMLElement[]>([]);
</script>

<div class="warboard p-lg space-y-lg">
	<div class="warboard-header flex items-center justify-between mb-md">
		<div>
			<h1 class="text-heading-lg font-heading text-institutional-text-primary">Command Center</h1>
			<p class="text-body-sm text-institutional-text-secondary mt-xs">Real-time intelligence dashboard</p>
		</div>
		
		<div class="flex items-center gap-sm">
			<button 
				class="px-md py-sm rounded-md border border-institutional-border-default hover:bg-institutional-surface-interactive transition-colors duration-fast text-body-sm"
				onclick={() => dashboardState.toggleCompareMode()}
			>
				{dashboardState.compareMode ? 'Exit Compare' : 'Compare Period'}
			</button>
			<button 
				class="px-md py-sm rounded-md border border-institutional-border-default hover:bg-institutional-surface-interactive transition-colors duration-fast text-body-sm"
				onclick={() => dashboardState.toggleEditMode()}
			>
				{dashboardState.isEditMode ? 'Lock Layout' : 'Edit Layout'}
			</button>
		</div>
	</div>

	<div bind:this={kpiRowRef} class="kpi-row grid grid-cols-4 gap-md">
		{#each kpis as kpi}
			<svelte:boundary>
				<KPICard data={kpi} />
				{#snippet failed(error, reset)}
					<div class="widget-error p-md text-body-sm text-institutional-accent-danger">
						<p>Widget failed to render</p>
						<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
					</div>
				{/snippet}
			</svelte:boundary>
		{/each}
	</div>

	<div class="primary-charts grid grid-cols-2 gap-md">
		<div bind:this={primaryChartsRefs[0]} class="chart-container">
			<svelte:boundary>
				<TimeSeriesChart data={timeSeries} title="Revenue Trend" />
				{#snippet failed(error, reset)}
					<div class="widget-error p-lg text-body-sm text-institutional-accent-danger">
						<p>Chart failed to render</p>
						<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
					</div>
				{/snippet}
			</svelte:boundary>
		</div>
		<div bind:this={primaryChartsRefs[1]} class="chart-container">
			<svelte:boundary>
				<FunnelWidget data={funnelData} title="Conversion Funnel" />
				{#snippet failed(error, reset)}
					<div class="widget-error p-lg text-body-sm text-institutional-accent-danger">
						<p>Chart failed to render</p>
						<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
					</div>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>

	<div class="secondary-panels grid grid-cols-3 gap-md">
		<div class="panel-container col-span-2">
			<svelte:boundary>
				<CohortHeatmap data={cohortData} title="Retention Cohorts" />
				{#snippet failed(error, reset)}
					<div class="widget-error p-lg text-body-sm text-institutional-accent-danger">
						<p>Panel failed to render</p>
						<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
					</div>
				{/snippet}
			</svelte:boundary>
		</div>
		<div class="panel-container">
			<svelte:boundary>
				<LiveEventTape data={eventStream} title="Live Events" />
				{#snippet failed(error, reset)}
					<div class="widget-error p-lg text-body-sm text-institutional-accent-danger">
						<p>Panel failed to render</p>
						<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
					</div>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>

	<div class="tertiary-section">
		<svelte:boundary>
			<SegmentMatrix data={segmentData} title="Segment Performance" />
			{#snippet failed(error, reset)}
				<div class="widget-error p-lg text-body-sm text-institutional-accent-danger">
					<p>Table failed to render</p>
					<button class="text-institutional-accent-primary text-label-sm mt-xs" onclick={reset}>Retry</button>
				</div>
			{/snippet}
		</svelte:boundary>
	</div>
</div>

<style>
	.warboard {
		max-width: 1800px;
		margin: 0 auto;
	}

	.chart-container,
	.panel-container {
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
</style>
