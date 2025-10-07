import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bla: 'var(--bla)',
				card: 'var(--card)',
				muted: 'var(--muted)',
				accent: 'var(--accent-blue)',
				success: 'var(--accent-green)',
			},
			borderRadius: { xl: 'var(--radius)' },
			boxShadow: { soft: 'var(--shadow-soft)' },
		},
	},
	plugins: [],
};
export default config;
