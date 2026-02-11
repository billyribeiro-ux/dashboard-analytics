<script lang="ts">
	const navGroups = [
		{
			label: 'Overview',
			items: [
				{ id: 'dashboard', label: 'Dashboard', icon: 'grid', active: true },
				{ id: 'analytics', label: 'Analytics', icon: 'chart' },
				{ id: 'reports', label: 'Reports', icon: 'document' }
			]
		},
		{
			label: 'Metrics',
			items: [
				{ id: 'revenue', label: 'Revenue', icon: 'currency' },
				{ id: 'users', label: 'Users', icon: 'users' },
				{ id: 'engagement', label: 'Engagement', icon: 'activity' },
				{ id: 'retention', label: 'Retention', icon: 'refresh' }
			]
		},
		{
			label: 'Operations',
			items: [
				{ id: 'alerts', label: 'Alerts', icon: 'bell' },
				{ id: 'experiments', label: 'Experiments', icon: 'beaker' },
				{ id: 'segments', label: 'Segments', icon: 'filter' }
			]
		}
	];

	const pinnedItems = [
		{ id: 'revenue-deep', label: 'Revenue Deep Dive', icon: 'star' },
		{ id: 'cohort-analysis', label: 'Cohort Analysis', icon: 'star' }
	];
</script>

<nav class="strategic-nav w-64 bg-institutional-surface-base border-r border-institutional-border-default overflow-y-auto">
	<div class="p-md">
		<div class="pinned-section mb-lg">
			<h2 class="text-label-sm text-institutional-text-tertiary uppercase tracking-wide mb-sm">Pinned</h2>
			<ul class="space-y-micro">
				{#each pinnedItems as item}
					<li>
						<button class="nav-item w-full px-sm py-xs rounded-md hover:bg-institutional-surface-interactive transition-colors duration-fast text-left flex items-center gap-sm">
							<span class="text-institutional-accent-warning">★</span>
							<span class="text-body-sm text-institutional-text-primary">{item.label}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>

		{#each navGroups as group}
			<div class="nav-group mb-lg">
				<h2 class="text-label-sm text-institutional-text-tertiary uppercase tracking-wide mb-sm">{group.label}</h2>
				<ul class="space-y-micro">
					{#each group.items as item}
						<li>
							<button 
								class="nav-item w-full px-sm py-xs rounded-md transition-colors duration-fast text-left flex items-center gap-sm {item.active ? 'bg-institutional-surface-interactive text-institutional-text-primary' : 'hover:bg-institutional-surface-interactive text-institutional-text-secondary'}"
							>
								<span class="w-4 h-4 flex items-center justify-center">
									{#if item.icon === 'grid'}
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
									{:else if item.icon === 'chart'}
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
									{:else}
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /></svg>
									{/if}
								</span>
								<span class="text-body-sm">{item.label}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</nav>

<style>
	.strategic-nav {
		height: calc(100vh - 56px);
	}

	.nav-item {
		font-weight: var(--font-weight-body);
	}

	.nav-item:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}
</style>
