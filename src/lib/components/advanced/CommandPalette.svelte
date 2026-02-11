<script lang="ts">
	import { onMount } from 'svelte';
	
	let { onClose }: { onClose: () => void } = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);

	const commands = [
		{ id: 'jump-revenue', label: 'Jump to Revenue Widget', category: 'Navigation', shortcut: '⌘1' },
		{ id: 'jump-users', label: 'Jump to Users Widget', category: 'Navigation', shortcut: '⌘2' },
		{ id: 'apply-view', label: 'Apply Saved View: Executive Summary', category: 'Views', shortcut: '' },
		{ id: 'toggle-focus', label: 'Toggle Focus Mode', category: 'Display', shortcut: '⌘F' },
		{ id: 'toggle-compare', label: 'Run Compare Period', category: 'Analysis', shortcut: '⌘C' },
		{ id: 'open-anomaly', label: 'Open Anomaly Detail: Revenue Spike', category: 'Alerts', shortcut: '' },
		{ id: 'export-data', label: 'Export Dashboard Data', category: 'Actions', shortcut: '⌘E' },
		{ id: 'refresh', label: 'Refresh All Data', category: 'Actions', shortcut: '⌘R' }
	];

	const filteredCommands = $derived(
		searchQuery 
			? commands.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
								  c.category.toLowerCase().includes(searchQuery.toLowerCase()))
			: commands
	);

	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
			} else if (e.key === 'Enter') {
				e.preventDefault();
				const command = filteredCommands[selectedIndex];
				if (command) {
					console.log('Executing:', command.id);
					onClose();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div
	role="dialog"
	aria-modal="true"
	aria-label="Command palette"
	class="command-palette fixed inset-0 z-50 flex items-start justify-center pt-24 bg-institutional-bg-overlay"
	onclick={(e) => e.target === e.currentTarget && onClose()}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
	tabindex="-1"
>
	<div class="palette-container w-full max-w-2xl bg-institutional-surface-base border border-institutional-border-default rounded-lg shadow-depth-4 overflow-hidden">
		<div class="search-input-container p-md border-b border-institutional-border-default">
			<div class="flex items-center gap-sm">
				<svg class="w-5 h-5 text-institutional-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					class="flex-1 bg-transparent border-none outline-none text-body-lg text-institutional-text-primary placeholder-institutional-text-tertiary"
					placeholder="Search commands..."
					bind:value={searchQuery}
				/>
				<kbd class="px-xs py-micro bg-institutional-surface-sunken rounded-micro text-label-sm text-institutional-text-tertiary">ESC</kbd>
			</div>
		</div>

		<div class="command-list max-h-96 overflow-y-auto">
			{#if filteredCommands.length === 0}
				<div class="p-lg text-center text-body-sm text-institutional-text-tertiary">
					No commands found
				</div>
			{:else}
				{@const grouped = filteredCommands.reduce((acc, cmd) => {
					acc[cmd.category] = acc[cmd.category] || [];
					acc[cmd.category].push(cmd);
					return acc;
				}, {} as Record<string, typeof commands>)}
				
				{#each Object.entries(grouped) as [category, items], catIndex}
					<div class="command-category">
						<div class="px-md py-sm text-label-sm text-institutional-text-tertiary uppercase tracking-wide bg-institutional-surface-sunken">
							{category}
						</div>
						{#each items as command, cmdIndex}
							{@const globalIndex = filteredCommands.findIndex(c => c.id === command.id)}
							<button
								class="command-item w-full px-md py-sm flex items-center justify-between hover:bg-institutional-surface-interactive transition-colors duration-fast text-left"
								class:bg-institutional-surface-interactive={selectedIndex === globalIndex}
								onclick={() => { console.log('Executing:', command.id); onClose(); }}
								onmouseenter={() => selectedIndex = globalIndex}
							>
								<span class="text-body-md text-institutional-text-primary">{command.label}</span>
								{#if command.shortcut}
									<kbd class="px-xs py-micro bg-institutional-surface-sunken rounded-micro text-label-sm text-institutional-text-tertiary">
										{command.shortcut}
									</kbd>
								{/if}
							</button>
						{/each}
					</div>
				{/each}
			{/if}
		</div>

		<div class="palette-footer px-md py-sm border-t border-institutional-border-default flex items-center justify-between text-label-sm text-institutional-text-tertiary">
			<div class="flex items-center gap-md">
				<span>↑↓ to navigate</span>
				<span>↵ to select</span>
			</div>
			<span>{filteredCommands.length} commands</span>
		</div>
	</div>
</div>

<style>
	.command-palette {
		backdrop-filter: blur(8px);
	}

	.command-item:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: -2px;
	}

	.command-list {
		scrollbar-width: thin;
		scrollbar-color: var(--color-border-default) transparent;
	}
</style>
