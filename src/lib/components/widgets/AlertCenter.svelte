<script lang="ts">
	import { alertState } from '$lib/state/alert-state.svelte';
	let { title }: { title: string } = $props();

	const activeAlerts = $derived(alertState.getActiveAlerts().slice(0, 5));
</script>

<div class="alert-center p-md">
	<div class="flex items-center justify-between mb-md">
		<h3 class="text-heading-md font-heading text-institutional-text-primary">{title}</h3>
		{#if alertState.unreadCount > 0}
			<span class="text-label-sm px-xs py-micro rounded-full bg-institutional-accent-danger text-institutional-text-inverse">
				{alertState.unreadCount} active
			</span>
		{/if}
	</div>

	<div class="alert-list space-y-sm">
		{#each activeAlerts as alert}
			<div class="alert-card bg-institutional-surface-raised border-l-2 {alert.severity === 'critical' || alert.severity === 'high' ? 'border-institutional-accent-danger' : alert.severity === 'warn' ? 'border-institutional-accent-warning' : 'border-institutional-accent-info'} rounded-md p-sm hover:bg-institutional-surface-interactive transition-colors duration-fast">
				<div class="flex items-start justify-between mb-xs">
					<span class="text-body-sm font-emphasis text-institutional-text-primary">{alert.title}</span>
					<span class="text-label-sm text-institutional-text-tertiary">
						{Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
					</span>
				</div>
				<p class="text-body-sm text-institutional-text-secondary mb-sm">{alert.message}</p>
				<div class="flex items-center gap-xs">
					<button 
						class="px-xs py-micro rounded-micro bg-institutional-surface-sunken text-label-sm text-institutional-text-secondary hover:bg-institutional-accent-primary hover:text-institutional-text-inverse transition-colors"
						onclick={() => alertState.acknowledgeAlert(alert.id)}
					>
						Acknowledge
					</button>
					{#if alert.deepLink}
						<a href={alert.deepLink} class="px-xs py-micro rounded-micro bg-institutional-accent-primary text-label-sm text-institutional-text-inverse hover:opacity-90 transition-opacity">
							View Details →
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if activeAlerts.length === 0}
		<div class="empty-state p-lg text-center">
			<div class="w-12 h-12 mx-auto mb-sm rounded-full bg-institutional-surface-raised flex items-center justify-center">
				<svg class="w-6 h-6 text-institutional-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<p class="text-body-sm text-institutional-text-secondary">All alerts acknowledged</p>
		</div>
	{/if}
</div>

<style>
	.alert-center {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}

	.empty-state {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
