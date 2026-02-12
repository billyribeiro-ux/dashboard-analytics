<script lang="ts">
	import '../app.css';
	import { MediaQuery } from 'svelte/reactivity';

	let { children } = $props();

	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce', false);

	$effect(() => {
		document.documentElement.toggleAttribute('data-reduced-motion', reducedMotion.current);
	});
</script>

{@render children()}
