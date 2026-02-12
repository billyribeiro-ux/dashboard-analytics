<script lang="ts">
	import { onMount } from 'svelte';
	import IntelligenceBar from './shell/IntelligenceBar.svelte';
	import StrategicNav from './shell/StrategicNav.svelte';
	import Warboard from './shell/Warboard.svelte';
	import InsightRail from './shell/InsightRail.svelte';
	import CommandPalette from './advanced/CommandPalette.svelte';
	import { DashboardOrchestrator } from '$lib/motion/dashboard-orchestrator';

	let shellRef = $state<HTMLElement | null>(null);
	let intelligenceBarRef = $state<HTMLElement | null>(null);
	let kpiRowRef = $state<HTMLElement | null>(null);
	let showCommandPalette = $state(false);

	function handleKeyDown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			showCommandPalette = !showCommandPalette;
		}
	}

	onMount(() => {
		const orchestrator = new DashboardOrchestrator();

		const timeout = setTimeout(() => {
			orchestrator.orchestrateEntrance({
				shell: shellRef ?? undefined,
				intelligenceBar: intelligenceBarRef ?? undefined,
				kpiRow: kpiRowRef ?? undefined
			});
		}, 100);

		return () => {
			clearTimeout(timeout);
			orchestrator.kill();
		};
	});
</script>

<svelte:window onkeydown={handleKeyDown} />

<div 
	bind:this={shellRef}
	class="dashboard-shell min-h-screen bg-institutional-bg-primary text-institutional-text-primary"
>
	<IntelligenceBar bind:element={intelligenceBarRef} />
	
	<div class="dashboard-layout flex">
		<StrategicNav />
		
		<main class="dashboard-main flex-1 overflow-auto">
			<Warboard bind:kpiRowRef />
		</main>
		
		<InsightRail />
	</div>
</div>

{#if showCommandPalette}
	<CommandPalette onClose={() => showCommandPalette = false} />
{/if}

<style>
	.dashboard-shell {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100vh;
	}

	.dashboard-layout {
		overflow: hidden;
	}

	.dashboard-main {
		position: relative;
	}
</style>
