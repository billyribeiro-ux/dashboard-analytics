import gsap from 'gsap';
import { MOTION_TOKENS, getMotionDuration, getMotionEasing } from './tokens';

export function animateWidgetInsert(element: HTMLElement): gsap.core.Tween {
	return gsap.from(element, {
		scale: 0.95,
		opacity: 0,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('bounce')
	});
}

export function animateWidgetRemove(element: HTMLElement): gsap.core.Tween {
	return gsap.to(element, {
		scale: 0.95,
		opacity: 0,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('cinematicIn')
	});
}

export function animateWidgetReorder(element: HTMLElement, newPosition: { x: number; y: number }): gsap.core.Tween {
	return gsap.to(element, {
		x: newPosition.x,
		y: newPosition.y,
		duration: getMotionDuration('slow'),
		ease: getMotionEasing('cinematicInOut')
	});
}

export function animateWidgetResize(element: HTMLElement, newSize: { width: number; height: number }): gsap.core.Tween {
	return gsap.to(element, {
		width: newSize.width,
		height: newSize.height,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('institutional')
	});
}

export function animateDataUpdate(element: HTMLElement): gsap.core.Timeline {
	const tl = gsap.timeline();
	
	tl.to(element, {
		opacity: MOTION_TOKENS.opacity.muted,
		duration: getMotionDuration('instant'),
		ease: getMotionEasing('institutional')
	}).to(element, {
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	});

	return tl;
}

export function animateFilterApply(elements: HTMLElement[]): gsap.core.Timeline {
	const tl = gsap.timeline();

	tl.to(elements, {
		opacity: MOTION_TOKENS.opacity.ghost,
		scale: MOTION_TOKENS.transform.scaleSubtle,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	}).to(elements, {
		opacity: MOTION_TOKENS.opacity.visible,
		scale: 1,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('bounce'),
		stagger: MOTION_TOKENS.stagger.tight
	});

	return tl;
}

export function animateAlertPulse(element: HTMLElement, severity: 'info' | 'warn' | 'high' | 'critical'): gsap.core.Timeline {
	const intensityMap = {
		info: 1.02,
		warn: 1.03,
		high: 1.04,
		critical: 1.05
	};

	const tl = gsap.timeline({ repeat: 2 });

	tl.to(element, {
		scale: intensityMap[severity],
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	}).to(element, {
		scale: 1,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	});

	return tl;
}

export function animateLiveFeedItem(element: HTMLElement): gsap.core.Timeline {
	const tl = gsap.timeline();

	tl.from(element, {
		x: -20,
		opacity: 0,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}).to(element, {
		backgroundColor: 'rgba(74, 158, 255, 0.1)',
		duration: getMotionDuration('fast')
	}).to(element, {
		backgroundColor: 'transparent',
		duration: getMotionDuration('slow')
	});

	return tl;
}
