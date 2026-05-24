/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				// Hallmark Plume tokens
				paper: 'var(--color-paper)',
				'paper-2': 'var(--color-paper-2)',
				'paper-3': 'var(--color-paper-3)',
				rule: 'var(--color-rule)',
				neutral: 'var(--color-neutral)',
				muted: 'var(--color-muted)',
				ink: 'var(--color-ink)',
				accent: {
					DEFAULT: 'var(--color-accent)',
					hover: 'var(--color-accent-hover)',
					soft: 'var(--color-accent-soft)'
				},
				// Legacy tokens (search page)
				primary: {
					DEFAULT: '#a33900',
					50: '#fff5f2',
					100: '#ffdbce',
					200: '#ffb599',
					300: '#ff8a5c',
					400: '#e85a1a',
					500: '#cc4900',
					600: '#a33900',
					700: '#7f2b00',
					800: '#5c1f00',
					900: '#370e00'
				},
				'surface-border': '#E5E7EB',
				'slate-text': '#111827',
				'slate-muted': '#6B7280',
				'on-surface': '#191c1d',
				surface: '#f8f9fa',
				'surface-container-lowest': '#ffffff',
				'surface-container-low': '#f3f4f5',
				'surface-container': '#edeeef',
				'surface-container-high': '#e7e8e9',
				'surface-container-highest': '#e1e3e4',
				'code-bg': '#F3F4F6',
				'primary-fixed': '#ffdbce',
				'primary-fixed-dim': '#ffb599',
				'on-primary-fixed-variant': '#7f2b00',
				'on-primary-fixed': '#370e00',
				'on-primary': '#ffffff',
				'primary-container': '#cc4900',
				'on-primary-container': '#fffbff',
				secondary: '#575e70',
				'on-secondary': '#ffffff',
				'secondary-container': '#d9dff5',
				'on-secondary-container': '#5c6274',
				'secondary-fixed': '#dce2f7',
				'secondary-fixed-dim': '#c0c6db',
				'on-secondary-fixed': '#141b2b',
				'on-secondary-fixed-variant': '#404758',
				outline: '#8e7166',
				'outline-variant': '#e2bfb2',
				error: '#ba1a1a',
				'on-error': '#ffffff',
				'error-container': '#ffdad6',
				'on-error-container': '#93000a',
				tertiary: '#525c6d',
				'on-tertiary': '#ffffff',
				'tertiary-container': '#6b7587',
				'on-tertiary-container': '#fefcff',
				'tertiary-fixed': '#d9e3f7',
				'tertiary-fixed-dim': '#bdc7db',
				'on-tertiary-fixed': '#121c2a',
				'on-tertiary-fixed-variant': '#3d4757',
				background: '#f8f9fa',
				'on-background': '#191c1d',
				'surface-variant': '#e1e3e4',
				'on-surface-variant': '#5a4138',
				'surface-dim': '#d9dadb',
				'surface-bright': '#f8f9fa',
				'surface-tint': '#a73a00',
				'inverse-surface': '#2e3132',
				'inverse-on-surface': '#f0f1f2',
				'inverse-primary': '#ffb599',
				'accent-orange-hover': '#C2410C'
			},
			fontFamily: {
				display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
				body: ['Satoshi', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
				// Legacy names → new fonts
				'headline-lg': ['Bricolage Grotesque', 'sans-serif'],
				'headline-xl': ['Bricolage Grotesque', 'sans-serif'],
				'headline-lg-mobile': ['Bricolage Grotesque', 'sans-serif'],
				'body-md': ['Satoshi', 'sans-serif'],
				'body-sm': ['Satoshi', 'sans-serif'],
				'label-caps': ['Satoshi', 'sans-serif'],
				'code-snippet': ['JetBrains Mono', 'monospace']
			},
			fontSize: {
				display: [
					'clamp(2.75rem, 5vw + 1rem, 5.25rem)',
					{ lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }
				],
				// Legacy sizes (search page)
				'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'code-snippet': ['14px', { lineHeight: '20px', fontWeight: '500' }],
				'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
				'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'label-caps': [
					'12px',
					{ lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }
				],
				'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'headline-xl': [
					'48px',
					{ lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }
				]
			},
			spacing: {
				'container-max': '1280px',
				'stack-lg': '48px',
				'margin-mobile': '16px',
				gutter: '24px',
				'section-gap': '96px',
				'stack-sm': '8px',
				'stack-md': '16px'
			},
			maxWidth: {
				'container-max': '1280px',
				page: 'var(--page-max)'
			},
			borderRadius: {
				sm: '6px',
				DEFAULT: '10px',
				lg: '14px',
				xl: '20px',
				pill: '999px',
				full: '9999px'
			},
			boxShadow: {
				whisper: 'var(--shadow-whisper)',
				lifted: 'var(--shadow-lifted)'
			},
			keyframes: {
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.5s var(--ease-out) both',
				'fade-in': 'fade-in 0.4s var(--ease-out) both'
			},
			transitionTimingFunction: {
				smooth: 'var(--ease-out)'
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')]
};
