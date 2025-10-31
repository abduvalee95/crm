'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
	fontSize: 'small' | 'medium' | 'large';
	setFontSize: (size: 'small' | 'medium' | 'large') => void;
	density: 'compact' | 'comfortable' | 'spacious';
	setDensity: (density: 'compact' | 'comfortable' | 'spacious') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//bu erda context fontlarni ozgartiradi
export function useThemeSettings() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeSettings must be used within ThemeProvider');
	}
	return context;
}

export function ThemeProvider({ children, ...props }: any) {
	const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
	const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');

	useEffect(() => {
		const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large';
		const savedDensity = localStorage.getItem('density') as 'compact' | 'comfortable' | 'spacious';

		if (savedFontSize) setFontSize(savedFontSize);
	}, []);

	useEffect(() => {
		// Apply font size to document
		document.documentElement.style.setProperty(
			'--font-size-base',
			fontSize === 'small' ? '12px' : fontSize === 'medium' ? '14px' : '16px',
		);

		// Apply density to document
		document.documentElement.style.setProperty(
			'--spacing-base',
			density === 'compact' ? '0.5rem' : density === 'comfortable' ? '1rem' : '1.5rem',
		);

		// Save to localStorage
		localStorage.setItem('fontSize', fontSize);
		localStorage.setItem('density', density);
	}, [fontSize, density]);

	return (
		<NextThemesProvider {...props}>
			<ThemeContext.Provider value={{ fontSize, setFontSize, density, setDensity }}>{children}</ThemeContext.Provider>
		</NextThemesProvider>
	);
}
