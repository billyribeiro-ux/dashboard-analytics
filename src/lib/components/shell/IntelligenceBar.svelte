<script lang="ts">
	import { alertState } from '$lib/state/alert-state.svelte';
	import { dataState } from '$lib/state/data-state.svelte';
	import { dashboardState } from '$lib/state/dashboard-state.svelte';

	let { element = $bindable() }: { element?: HTMLElement } = $props();

	const severityColors = {
		info: 'bg-institutional-accent-info',
		warn: 'bg-institutional-accent-warning',
		high: 'bg-institutional-accent-danger',
		critical: 'bg-institutional-accent-danger'
	};

	const statusColors = {
		idle: 'text-institutional-text-tertiary',
		loading: 'text-institutional-accent-info',
		success: 'text-institutional-accent-success',
		error: 'text-institutional-accent-danger',
		stale: 'text-institutional-accent-warning'
	};
</script>

<header 
	bind:this={element}
	class="intelligence-bar bg-institutional-surface-base border-b border-institutional-border-default px-lg py-sm flex items-center justify-between"
>
	<div class="flex items-center gap-lg">
		<div class="brand flex items-center gap-sm">
			<div class="w-8 h-8 bg-institutional-accent-primary rounded-md flex items-center justify-center">
				<span class="text-institutional-text-inverse font-heading text-label-lg">IC</span>
			</div>
			<h1 class="text-heading-sm font-heading">Intelligence Command</h1>
		</div>

		<button 
			class="search-trigger bg-institutional-surface-interactive hover:bg-institutional-surface-interactive-hover px-md py-xs rounded-md border border-institutional-border-subtle flex items-center gap-sm transition-colors duration-fast"
			aria-label="Open command palette"
		>
			<span class="text-institutional-text-tertiary text-body-sm">Search or jump to...</span>
			<kbd class="px-xs py-micro bg-institutional-surface-sunken rounded-micro text-label-sm text-institutional-text-tertiary">⌘K</kbd>
		</button>
	</div>

	<div class="flex items-center gap-md">
		<div class="data-status flex items-center gap-xs px-sm py-xs rounded-md bg-institutional-surface-sunken">
			<div class="w-2 h-2 rounded-full {statusColors[dataState.globalStatus]} animate-pulse"></div>
			<span class="text-label-sm text-institutional-text-secondary">
				{dataState.averageLatency.toFixed(0)}ms
			</span>
		</div>

		<button 
			class="alert-bell relative px-sm py-xs rounded-md hover:bg-institutional-surface-interactive transition-colors duration-fast"
			aria-label="View alerts"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
			</svg>
			{#if alertState.unreadCount > 0}
				<span class="absolute -top-1 -right-1 w-5 h-5 bg-institutional-accent-danger rounded-full flex items-center justify-center text-label-sm text-institutional-text-inverse">
					{alertState.unreadCount}
				</span>
			{/if}
		</button>

		<div class="workspace-switcher px-sm py-xs rounded-md bg-institutional-surface-interactive flex items-center gap-xs">
			<span class="text-label-md text-institutional-text-primary">Production</span>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</div>

		<button 
			class="density-toggle px-sm py-xs rounded-md hover:bg-institutional-surface-interactive transition-colors duration-fast"
			onclick={() => {
				const modes = ['focus', 'analyst', 'executive'] as const;
				const currentIndex = modes.indexOf(dashboardState.densityMode);
				const nextMode = modes[(currentIndex + 1) % modes.length];
				dashboardState.setDensityMode(nextMode);
			}}
			aria-label="Toggle density mode"
		>
			<span class="text-label-sm text-institutional-text-secondary capitalize">{dashboardState.densityMode}</span>
		</button>
	</div>
</header>

<style>
	.intelligence-bar {
		backdrop-filter: blur(8px);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.search-trigger {
		min-width: 280px;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
