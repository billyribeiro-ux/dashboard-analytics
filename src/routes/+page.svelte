<script lang="ts">
	import { onMount } from 'svelte';
	import DashboardShell from '$lib/components/DashboardShell.svelte';
	import { dashboardState } from '$lib/state/dashboard-state.svelte';
	import { alertState } from '$lib/state/alert-state.svelte';
	import { dataState } from '$lib/state/data-state.svelte';
	import { generateMockKPIs, generateMockTimeSeries, generateMockEventStream } from '$lib/data/mock-data';
	import type { Alert } from '$lib/state/alert-state.svelte';

	onMount(() => {
		dataState.registerSource({
			id: 'main-api',
			name: 'Main API',
			status: 'success',
			lastUpdated: new Date(),
			latency: 145
		});

		const mockAlerts: Alert[] = [
			{
				id: 'alert-1',
				severity: 'critical',
				status: 'active',
				title: 'Revenue Drop Detected',
				message: 'Revenue has dropped 15% in the last hour',
				timestamp: new Date(Date.now() - 300000),
				affectedMetrics: ['revenue'],
				deepLink: '/dashboard/revenue'
			},
			{
				id: 'alert-2',
				severity: 'warn',
				status: 'active',
				title: 'High API Latency',
				message: 'API response time exceeds 500ms threshold',
				timestamp: new Date(Date.now() - 600000),
				affectedMetrics: ['latency']
			}
		];

		mockAlerts.forEach(alert => alertState.addAlert(alert));
	});
</script>

<svelte:head>
	<title>Command Center | Dashboard Analytics</title>
</svelte:head>

<DashboardShell />
