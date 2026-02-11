<script lang="ts">
	let { title }: { title: string } = $props();

	const riskFactors = [
		{ category: 'Revenue Concentration', score: 65, maxScore: 100, severity: 'medium' },
		{ category: 'Churn Risk', score: 28, maxScore: 100, severity: 'low' },
		{ category: 'Latency Exposure', score: 82, maxScore: 100, severity: 'high' },
		{ category: 'Dependency Risk', score: 45, maxScore: 100, severity: 'low' },
		{ category: 'Security Posture', score: 91, maxScore: 100, severity: 'critical' }
	];

	function getSeverityColor(severity: string): string {
		const colors = {
			low: 'bg-institutional-accent-success',
			medium: 'bg-institutional-accent-warning',
			high: 'bg-institutional-accent-danger',
			critical: 'bg-institutional-accent-danger'
		};
		return colors[severity as keyof typeof colors] || 'bg-institutional-text-tertiary';
	}

	function getSeverityOpacity(severity: string): number {
		const opacities = {
			low: 0.4,
			medium: 0.6,
			high: 0.8,
			critical: 1
		};
		return opacities[severity as keyof typeof opacities] || 0.5;
	}
</script>

<div class="risk-radar p-md">
	<h3 class="text-heading-md font-heading text-institutional-text-primary mb-md">{title}</h3>

	<div class="risk-list space-y-md">
		{#each riskFactors as risk}
			<div class="risk-item">
				<div class="flex items-center justify-between mb-xs">
					<span class="text-body-sm text-institutional-text-primary">{risk.category}</span>
					<span class="text-label-sm text-institutional-text-secondary">{risk.score}/{risk.maxScore}</span>
				</div>
				<div class="risk-bar-bg h-2 bg-institutional-surface-sunken rounded-full overflow-hidden">
					<div 
						class="risk-bar h-full {getSeverityColor(risk.severity)} transition-all duration-slow"
						style="width: {(risk.score / risk.maxScore) * 100}%; opacity: {getSeverityOpacity(risk.severity)}"
					></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="risk-summary mt-md pt-md border-t border-institutional-border-subtle">
		<div class="flex items-center justify-between">
			<span class="text-body-sm text-institutional-text-secondary">Overall Risk Score</span>
			<span class="text-heading-sm font-heading text-institutional-accent-warning">62.2</span>
		</div>
	</div>
</div>

<style>
	.risk-radar {
		background: var(--color-surface-base);
		border-radius: var(--radius-lg);
	}
</style>
