<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			document.documentElement.setAttribute('data-reduced-motion', 'true');
		}
	});
</script>

{@render children()}
