import gsap from 'gsap';
import { MOTION_TOKENS, getMotionDuration, getMotionEasing } from './tokens';

export class DashboardOrchestrator {
	private timeline: gsap.core.Timeline | null = null;
	private isReduced = false;

	constructor() {
		if (typeof window !== 'undefined') {
			this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		}
	}

	orchestrateEntrance(elements: {
		shell?: HTMLElement;
		intelligenceBar?: HTMLElement;
		kpiRow?: HTMLElement;
		primaryCharts?: HTMLElement[];
		secondaryPanels?: HTMLElement[];
		dataTables?: HTMLElement[];
	}): gsap.core.Timeline {
		this.timeline = gsap.timeline({
			defaults: {
				ease: getMotionEasing('cinematicOut')
			}
		});

		if (this.isReduced) {
			Object.values(elements).flat().forEach(el => {
				if (el) gsap.set(el, { opacity: 1 });
			});
			return this.timeline;
		}

		if (elements.shell) {
			this.timeline.from(elements.shell, {
				opacity: 0,
				duration: getMotionDuration('fast')
			});
		}

		if (elements.intelligenceBar) {
			this.timeline.from(
				elements.intelligenceBar,
				{
					y: -20,
					opacity: 0,
					duration: getMotionDuration('normal')
				},
				'-=0.1'
			);
		}

		if (elements.kpiRow) {
			this.timeline.from(
				elements.kpiRow,
				{
					y: 20,
					opacity: 0,
					duration: getMotionDuration('normal')
				},
				'-=0.15'
			);
		}

		if (elements.primaryCharts && elements.primaryCharts.length > 0) {
			this.timeline.from(
				elements.primaryCharts,
				{
					y: 30,
					opacity: 0,
					duration: getMotionDuration('slow'),
					stagger: MOTION_TOKENS.stagger.normal
				},
				'-=0.2'
			);
		}

		if (elements.secondaryPanels && elements.secondaryPanels.length > 0) {
			this.timeline.from(
				elements.secondaryPanels,
				{
					y: 20,
					opacity: 0,
					duration: getMotionDuration('normal'),
					stagger: MOTION_TOKENS.stagger.tight
				},
				'-=0.3'
			);
		}

		if (elements.dataTables && elements.dataTables.length > 0) {
			this.timeline.from(
				elements.dataTables,
				{
					y: 20,
					opacity: 0,
					duration: getMotionDuration('normal'),
					stagger: MOTION_TOKENS.stagger.tight
				},
				'-=0.25'
			);
		}

		return this.timeline;
	}

	kill(): void {
		if (this.timeline) {
			this.timeline.kill();
			this.timeline = null;
		}
	}
}
