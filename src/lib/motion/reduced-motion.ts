import { writable } from 'svelte/store';

export const reducedMotion = writable(false);

if (typeof window !== 'undefined') {
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	
	reducedMotion.set(mediaQuery.matches);
	
	mediaQuery.addEventListener('change', (e) => {
		reducedMotion.set(e.matches);
	});
}

export function shouldReduceMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
