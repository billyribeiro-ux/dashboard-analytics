<script lang="ts">
	import '../app.css';

	let { children } = $props();

	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

		function update(matches: boolean) {
			document.documentElement.toggleAttribute('data-reduced-motion', matches);
		}

		update(mq.matches);
		const handler = (e: MediaQueryListEvent) => update(e.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});
</script>

{@render children()}
