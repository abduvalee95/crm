'use client';

import { Button } from '@/components/ui/button';
import { useThemeSettings } from '@/providers/ThemeProvider';
import { Card } from '@/shared/ui/Card';
import { Layout, Moon, Palette, Save, Sun, Type } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSection() {
	const { theme, setTheme } = useTheme();
	const {density, setDensity, fontSize, setFontSize} = useThemeSettings();
	const [mounted, setMounted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log('Theme settings updated:', { theme, fontSize, density });
		setIsLoading(false);
	};

	const themeOptions = [
		{
			value: 'light',
			label: 'Светлая тема',
			description: 'Классический светлый интерфейс',
			icon: <Sun className="w-6 h-6" />,
			preview: 'bg-white text-black',
		},
		{
			value: 'dark',
			label: 'Темная тема',
			description: 'Современный тёмный интерфейс',
			icon: <Moon className="w-6 h-6" />,
			preview: 'bg-gray-900 text-white',
		},
	];

	const fontSizeOptions = [
		{ value: 'small', label: 'Маленький', description: '12px' },
		{ value: 'medium', label: 'Средний', description: '14px' },
		{ value: 'large', label: 'Большой', description: '16px' },
	];

	const densityOptions = [
		{ value: 'compact', label: 'Компактная', description: 'Меньше отступов' },
		{ value: 'comfortable', label: 'Комфортная', description: 'Стандартные отступы' },
		{ value: 'spacious', label: 'Просторная', description: 'Больше отступов' },
	];

	if (!mounted) {
		return (
			<Card className="space-y-8 bg-black text-white border border-gray-700 shadow-xl">
				<div className="flex items-center gap-3">
					<Palette className="w-6 h-6 text-blue-400" />
					<h2 className="text-2xl font-bold">Настройки темы</h2>
				</div>
				<div className="animate-pulse">
					<div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
					<div className="h-32 bg-gray-700 rounded"></div>
				</div>
			</Card>
		);
	}

	return (
		<Card className="space-y-8 bg-black text-white border border-gray-700 shadow-xl">
			<div className="flex items-center gap-3">
				<Palette className="w-6 h-6 text-blue-400" />
				<h2 className="text-2xl font-bold">Настройки темы</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Цветовая схема</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{themeOptions.map((option) => (
							<div
								key={option.value}
								className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
									theme === option.value
										? 'border-blue-500 bg-blue-500/10'
										: 'border-gray-600 bg-gray-800 hover:border-gray-500'
								}`}
								onClick={() => setTheme(option.value)}
							>
								<div className="flex items-center gap-4 mb-4">
									<div className={`p-3 rounded-lg ${theme === option.value ? 'bg-blue-500' : 'bg-gray-700'}`}>
										{option.icon}
									</div>
									<div>
										<h4 className="font-semibold">{option.label}</h4>
										<p className="text-sm text-gray-400">{option.description}</p>
									</div>
								</div>

								{/* Theme Preview */}
								<div className={`${option.preview} p-4 rounded-lg border border-gray-600`}>
									<div className="flex items-center gap-2 mb-2">
										<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
										<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
										<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
									</div>
									<div className="space-y-2">
										<div className="h-2 bg-gray-400 rounded w-3/4"></div>
										<div className="h-2 bg-gray-400 rounded w-1/2"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Font Size */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2 flex items-center gap-2">
						<Type className="w-5 h-5" />
						Размер шрифта
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{fontSizeOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
								className={`p-4 rounded-lg border transition-colors ${
									fontSize === option.value
										? 'bg-blue-600 border-blue-500 text-white'
										: 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
								}`}
							>
								<div className="text-center">
									<h4 className="font-medium">{option.label}</h4>
									<p className="text-sm text-gray-400">{option.description}</p>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Interface Density */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2 flex items-center gap-2">
						<Layout className="w-5 h-5" />
						Плотность интерфейса
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{densityOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => setDensity(option.value as 'compact' | 'comfortable' | 'spacious')}
								className={`p-4 rounded-lg border transition-colors ${
									density === option.value
										? 'bg-blue-600 border-blue-500 text-white'
										: 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
								}`}
							>
								<div className="text-center">
									<h4 className="font-medium">{option.label}</h4>
									<p className="text-sm text-gray-400">{option.description}</p>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end pt-6 border-t border-gray-700">
					<Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
						<Save className="w-4 h-4 mr-2" />
						{isLoading ? 'Сохранение...' : 'Сохранить настройки'}
					</Button>
				</div>
			</form>
		</Card>
	);
}
