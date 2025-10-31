import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
			},
			borderRadius: { xl: 'var(--radius)' },
			boxShadow: { soft: 'var(--shadow-soft)' },
			fontSize: {
        'small': 'var(--font-size-small)',
        'medium': 'var(--font-size-medium)',
        'large': 'var(--font-size-large)',
      },
			spacing: {
        'compact': 'var(--spacing-compact)',
        'comfortable': 'var(--spacing-comfortable)',
        'spacious': 'var(--spacing-spacious)',
      },
		},
	},
	plugins: [],
};
export default config;
