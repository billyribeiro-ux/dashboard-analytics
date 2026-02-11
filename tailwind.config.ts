import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				institutional: {
					bg: {
						primary: 'var(--color-bg-primary)',
						secondary: 'var(--color-bg-secondary)',
						tertiary: 'var(--color-bg-tertiary)',
						elevated: 'var(--color-bg-elevated)',
						overlay: 'var(--color-bg-overlay)'
					},
					surface: {
						base: 'var(--color-surface-base)',
						raised: 'var(--color-surface-raised)',
						sunken: 'var(--color-surface-sunken)',
						interactive: 'var(--color-surface-interactive)',
						'interactive-hover': 'var(--color-surface-interactive-hover)'
					},
					border: {
						subtle: 'var(--color-border-subtle)',
						default: 'var(--color-border-default)',
						strong: 'var(--color-border-strong)',
						focus: 'var(--color-border-focus)'
					},
					text: {
						primary: 'var(--color-text-primary)',
						secondary: 'var(--color-text-secondary)',
						tertiary: 'var(--color-text-tertiary)',
						inverse: 'var(--color-text-inverse)',
						disabled: 'var(--color-text-disabled)'
					},
					accent: {
						primary: 'var(--color-accent-primary)',
						secondary: 'var(--color-accent-secondary)',
						success: 'var(--color-accent-success)',
						warning: 'var(--color-accent-warning)',
						danger: 'var(--color-accent-danger)',
						info: 'var(--color-accent-info)'
					},
					data: {
						1: 'var(--color-data-1)',
						2: 'var(--color-data-2)',
						3: 'var(--color-data-3)',
						4: 'var(--color-data-4)',
						5: 'var(--color-data-5)',
						6: 'var(--color-data-6)',
						7: 'var(--color-data-7)',
						8: 'var(--color-data-8)'
					}
				}
			},
			spacing: {
				'grid-unit': 'var(--spacing-grid-unit)',
				'micro': 'var(--spacing-micro)',
				'xs': 'var(--spacing-xs)',
				'sm': 'var(--spacing-sm)',
				'md': 'var(--spacing-md)',
				'lg': 'var(--spacing-lg)',
				'xl': 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)'
			},
			fontSize: {
				'display-lg': ['var(--font-size-display-lg)', { lineHeight: 'var(--line-height-display-lg)' }],
				'display-md': ['var(--font-size-display-md)', { lineHeight: 'var(--line-height-display-md)' }],
				'display-sm': ['var(--font-size-display-sm)', { lineHeight: 'var(--line-height-display-sm)' }],
				'heading-lg': ['var(--font-size-heading-lg)', { lineHeight: 'var(--line-height-heading-lg)' }],
				'heading-md': ['var(--font-size-heading-md)', { lineHeight: 'var(--line-height-heading-md)' }],
				'heading-sm': ['var(--font-size-heading-sm)', { lineHeight: 'var(--line-height-heading-sm)' }],
				'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body-lg)' }],
				'body-md': ['var(--font-size-body-md)', { lineHeight: 'var(--line-height-body-md)' }],
				'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--line-height-body-sm)' }],
				'label-lg': ['var(--font-size-label-lg)', { lineHeight: 'var(--line-height-label-lg)' }],
				'label-md': ['var(--font-size-label-md)', { lineHeight: 'var(--line-height-label-md)' }],
				'label-sm': ['var(--font-size-label-sm)', { lineHeight: 'var(--line-height-label-sm)' }]
			},
			fontWeight: {
				'display': 'var(--font-weight-display)',
				'heading': 'var(--font-weight-heading)',
				'body': 'var(--font-weight-body)',
				'label': 'var(--font-weight-label)',
				'emphasis': 'var(--font-weight-emphasis)'
			},
			borderRadius: {
				'micro': 'var(--radius-micro)',
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'full': 'var(--radius-full)'
			},
			boxShadow: {
				'depth-1': 'var(--shadow-depth-1)',
				'depth-2': 'var(--shadow-depth-2)',
				'depth-3': 'var(--shadow-depth-3)',
				'depth-4': 'var(--shadow-depth-4)',
				'glow-subtle': 'var(--shadow-glow-subtle)',
				'glow-strong': 'var(--shadow-glow-strong)'
			},
			transitionDuration: {
				'instant': 'var(--duration-instant)',
				'fast': 'var(--duration-fast)',
				'normal': 'var(--duration-normal)',
				'slow': 'var(--duration-slow)',
				'slower': 'var(--duration-slower)'
			},
			transitionTimingFunction: {
				'ease-institutional': 'var(--easing-institutional)',
				'ease-cinematic': 'var(--easing-cinematic)',
				'ease-bounce': 'var(--easing-bounce)'
			}
		}
	}
} satisfies Config;
