import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getMotionDuration, getMotionEasing } from './tokens';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export class ScrollNarrative {
	private triggers: ScrollTrigger[] = [];

	createChapterReveal(
		element: HTMLElement,
		options: {
			start?: string;
			end?: string;
			scrub?: boolean;
			pin?: boolean;
		} = {}
	): ScrollTrigger {
		const trigger = ScrollTrigger.create({
			trigger: element,
			start: options.start || 'top 80%',
			end: options.end || 'bottom 20%',
			scrub: options.scrub || false,
			pin: options.pin || false,
			animation: gsap.from(element, {
				y: 40,
				opacity: 0,
				duration: getMotionDuration('slow'),
				ease: getMotionEasing('cinematicOut')
			}),
			onEnter: () => element.classList.add('is-visible'),
			onLeave: () => element.classList.remove('is-visible'),
			onEnterBack: () => element.classList.add('is-visible'),
			onLeaveBack: () => element.classList.remove('is-visible')
		});

		this.triggers.push(trigger);
		return trigger;
	}

	createParallaxLayer(
		element: HTMLElement,
		speed: number = 0.5
	): ScrollTrigger {
		const trigger = ScrollTrigger.create({
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
			animation: gsap.to(element, {
				y: () => -(element.offsetHeight * speed),
				ease: 'none'
			})
		});

		this.triggers.push(trigger);
		return trigger;
	}

	createPinnedSection(
		element: HTMLElement,
		options: {
			start?: string;
			end?: string;
			pinSpacing?: boolean;
		} = {}
	): ScrollTrigger {
		const trigger = ScrollTrigger.create({
			trigger: element,
			start: options.start || 'top top',
			end: options.end || 'bottom top',
			pin: true,
			pinSpacing: options.pinSpacing !== false
		});

		this.triggers.push(trigger);
		return trigger;
	}

	killAll(): void {
		this.triggers.forEach(trigger => trigger.kill());
		this.triggers = [];
	}

	refresh(): void {
		ScrollTrigger.refresh();
	}
}

export function createScrollNarrative(): ScrollNarrative {
	return new ScrollNarrative();
}
