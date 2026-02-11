import { MOTION_TOKENS, getMotionDuration, getMotionEasing } from './tokens';
import gsap from 'gsap';

export const CINEMATIC_PRESETS = {
	fadeIn: (): gsap.TweenVars => ({
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}),

	fadeOut: (): gsap.TweenVars => ({
		opacity: MOTION_TOKENS.opacity.hidden,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('cinematicIn')
	}),

	slideInUp: (): gsap.TweenVars => ({
		y: 0,
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}),

	slideInDown: (): gsap.TweenVars => ({
		y: 0,
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}),

	slideInLeft: (): gsap.TweenVars => ({
		x: 0,
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}),

	slideInRight: (): gsap.TweenVars => ({
		x: 0,
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('cinematicOut')
	}),

	scaleIn: (): gsap.TweenVars => ({
		scale: 1,
		opacity: MOTION_TOKENS.opacity.visible,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('bounce')
	}),

	lift: (): gsap.TweenVars => ({
		y: -MOTION_TOKENS.transform.liftDistance,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	}),

	drop: (): gsap.TweenVars => ({
		y: 0,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	}),

	press: (): gsap.TweenVars => ({
		scale: MOTION_TOKENS.transform.scalePress,
		duration: getMotionDuration('instant'),
		ease: getMotionEasing('institutional')
	}),

	release: (): gsap.TweenVars => ({
		scale: 1,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('bounce')
	}),

	magneticHover: (): gsap.TweenVars => ({
		scale: MOTION_TOKENS.transform.scaleHover,
		duration: getMotionDuration('fast'),
		ease: getMotionEasing('institutional')
	}),

	magneticLeave: (): gsap.TweenVars => ({
		scale: 1,
		x: 0,
		y: 0,
		duration: getMotionDuration('normal'),
		ease: getMotionEasing('elastic')
	})
} as const;

export function getInitialState(preset: keyof typeof CINEMATIC_PRESETS): gsap.TweenVars {
	const states: Record<string, gsap.TweenVars> = {
		fadeIn: { opacity: MOTION_TOKENS.opacity.hidden },
		fadeOut: { opacity: MOTION_TOKENS.opacity.visible },
		slideInUp: { y: MOTION_TOKENS.transform.slideDistance, opacity: MOTION_TOKENS.opacity.hidden },
		slideInDown: { y: -MOTION_TOKENS.transform.slideDistance, opacity: MOTION_TOKENS.opacity.hidden },
		slideInLeft: { x: MOTION_TOKENS.transform.slideDistance, opacity: MOTION_TOKENS.opacity.hidden },
		slideInRight: { x: -MOTION_TOKENS.transform.slideDistance, opacity: MOTION_TOKENS.opacity.hidden },
		scaleIn: { scale: MOTION_TOKENS.transform.scaleSubtle, opacity: MOTION_TOKENS.opacity.hidden },
		lift: { y: 0 },
		drop: { y: -MOTION_TOKENS.transform.liftDistance },
		press: { scale: 1 },
		release: { scale: MOTION_TOKENS.transform.scalePress },
		magneticHover: { scale: 1 },
		magneticLeave: { scale: MOTION_TOKENS.transform.scaleHover, x: 0, y: 0 }
	};
	return states[preset] || {};
}
