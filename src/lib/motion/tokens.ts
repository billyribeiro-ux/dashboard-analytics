export const MOTION_TOKENS = {
	duration: {
		instant: 0.1,
		fast: 0.15,
		normal: 0.25,
		slow: 0.35,
		slower: 0.5,
		cinematic: 0.8,
		epic: 1.2
	},
	easing: {
		institutional: 'power2.out',
		cinematicIn: 'power3.in',
		cinematicOut: 'power3.out',
		cinematicInOut: 'power3.inOut',
		elastic: 'elastic.out(1, 0.5)',
		bounce: 'back.out(1.7)',
		smooth: 'power1.inOut'
	},
	stagger: {
		micro: 0.02,
		tight: 0.05,
		normal: 0.08,
		loose: 0.12,
		dramatic: 0.2
	},
	transform: {
		slideDistance: 24,
		liftDistance: 8,
		scaleSubtle: 0.98,
		scaleHover: 1.02,
		scalePress: 0.96
	},
	opacity: {
		hidden: 0,
		ghost: 0.3,
		muted: 0.6,
		visible: 1
	}
} as const;

export const REDUCED_MOTION_DURATION = 0.01;

export function getMotionDuration(key: keyof typeof MOTION_TOKENS.duration): number {
	if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return REDUCED_MOTION_DURATION;
	}
	return MOTION_TOKENS.duration[key];
}

export function getMotionEasing(key: keyof typeof MOTION_TOKENS.easing): string {
	if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return 'none';
	}
	return MOTION_TOKENS.easing[key];
}
