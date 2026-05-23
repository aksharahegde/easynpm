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
				'error-container': '#ffdad6',
				'surface-variant': '#e1e3e4',
				'surface-border': '#E5E7EB',
				'slate-text': '#111827',
				'primary-fixed': '#ffdbce',
				'on-tertiary-fixed': '#121c2a',
				'secondary-container': '#d9dff5',
				outline: '#8e7166',
				'on-tertiary-container': '#fefcff',
				'on-surface': '#191c1d',
				'surface-dim': '#d9dadb',
				'on-primary-fixed-variant': '#7f2b00',
				'surface-container-lowest': '#ffffff',
				'tertiary-fixed': '#d9e3f7',
				'surface-container-high': '#e7e8e9',
				'accent-orange-hover': '#C2410C',
				'outline-variant': '#e2bfb2',
				'surface-container-highest': '#e1e3e4',
				'tertiary-fixed-dim': '#bdc7db',
				'secondary-fixed-dim': '#c0c6db',
				'slate-muted': '#6B7280',
				'on-error': '#ffffff',
				'on-surface-variant': '#5a4138',
				'on-secondary-fixed': '#141b2b',
				'on-secondary': '#ffffff',
				'inverse-surface': '#2e3132',
				'on-secondary-fixed-variant': '#404758',
				'on-primary-fixed': '#370e00',
				'on-tertiary-fixed-variant': '#3d4757',
				'surface-container-low': '#f3f4f5',
				background: '#f8f9fa',
				'on-primary-container': '#fffbff',
				'secondary-fixed': '#dce2f7',
				'inverse-primary': '#ffb599',
				secondary: '#575e70',
				'primary-container': '#cc4900',
				surface: '#f8f9fa',
				'tertiary-container': '#6b7587',
				'surface-bright': '#f8f9fa',
				'surface-tint': '#a73a00',
				'on-tertiary': '#ffffff',
				error: '#ba1a1a',
				'on-secondary-container': '#5c6274',
				'on-error-container': '#93000a',
				'inverse-on-surface': '#f0f1f2',
				'primary-fixed-dim': '#ffb599',
				tertiary: '#525c6d',
				'code-bg': '#F3F4F6',
				'surface-container': '#edeeef',
				'on-primary': '#ffffff',
				'on-background': '#191c1d'
			},
			borderRadius: {
				DEFAULT: '0.125rem',
				lg: '0.25rem',
				xl: '0.5rem',
				full: '0.75rem'
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
			fontFamily: {
				'headline-lg': ['Hanken Grotesk', 'sans-serif'],
				'code-snippet': ['JetBrains Mono', 'monospace'],
				'headline-lg-mobile': ['Hanken Grotesk', 'sans-serif'],
				'body-md': ['Inter', 'sans-serif'],
				'label-caps': ['Inter', 'sans-serif'],
				'body-sm': ['Inter', 'sans-serif'],
				'headline-xl': ['Hanken Grotesk', 'sans-serif']
			},
			fontSize: {
				'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
				'code-snippet': ['14px', { lineHeight: '20px', fontWeight: '500' }],
				'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
				'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
				'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }]
			},
			maxWidth: {
				'container-max': '1280px'
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')]
};
