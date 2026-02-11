<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { EventData } from '$lib/data/mock-data';
	import { animateLiveFeedItem } from '$lib/motion/widget-transitions';
	
	let { data, title }: { data: EventData[]; title: string } = $props();

	let events = $state<EventData[]>([]);
	
	$effect(() => {
		events = data.slice(0, 10);
	});
	
	let itemRefs: HTMLElement[] = [];

	const severityColors = {
		info: 'border-institutional-accent-info',
		warn: 'border-institutional-accent-warning',
		high: 'border-institutional-accent-danger',
		critical: 'border-institutional-accent-danger'
	};

	const severityBg = {
		info: 'bg-institutional-accent-info',
		warn: 'bg-institutional-accent-warning',
		high: 'bg-institutional-accent-danger',
		critical: 'bg-institutional-accent-danger'
	};

	function formatTime(date: Date): string {
		const now = Date.now();
		const diff = now - date.getTime();
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		return `${hours}h ago`;
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (events.length < data.length) {
				const nextEvent = data[events.length];
				events = [nextEvent, ...events].slice(0, 10);
			}
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="live-event-tape p-md h-full flex flex-col">
	<div class="flex items-center justify-between mb-md">
		<h3 class="text-heading-md font-heading text-institutional-text-primary">{title}</h3>
		<div class="live-indicator flex items-center gap-xs">
			<div class="w-2 h-2 rounded-full bg-institutional-accent-success animate-pulse"></div>
			<span class="text-label-sm text-institutional-text-secondary">Live</span>
		</div>
	</div>

	<div class="event-list flex-1 overflow-y-auto space-y-xs">
		{#each events as event (event.id)}
			<div 
				class="event-item bg-institutional-surface-raised border-l-2 {severityColors[event.severity]} rounded-md p-sm hover:bg-institutional-surface-interactive transition-colors duration-fast cursor-pointer"
			>
				<div class="flex items-start justify-between mb-xs">
					<div class="flex items-center gap-xs">
						<div class="w-1.5 h-1.5 rounded-full {severityBg[event.severity]} opacity-70"></div>
						<span class="text-label-sm text-institutional-text-tertiary uppercase">{event.type}</span>
					</div>
					<span class="text-label-sm text-institutional-text-tertiary">{formatTime(event.timestamp)}</span>
				</div>
				<p class="text-body-sm text-institutional-text-primary">{event.message}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.event-list {
		scrollbar-width: thin;
		scrollbar-color: var(--color-border-default) transparent;
	}

	.event-list::-webkit-scrollbar {
		width: 6px;
	}

	.event-list::-webkit-scrollbar-track {
		background: transparent;
	}

	.event-list::-webkit-scrollbar-thumb {
		background-color: var(--color-border-default);
		border-radius: var(--radius-full);
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
