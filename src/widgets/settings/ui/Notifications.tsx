'use client';

import { Button } from '@/components/ui/button';
import { NotificationPreferences } from '@/lib/interface/settings';
import { Card } from '@/shared/ui/Card';
import { Switch } from '@/shared/ui/Switch';
import { Bell, Mail, Monitor, Save, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function Notifications() {
	const [preferences, setPreferences] = useState<NotificationPreferences>({
		email: true,
		push: true,
		sms: false,
		desktop: true,
		categories: {
			deals: true,
			tasks: true,
			messages: false,
			system: true,
			marketing: false,
		},
		frequency: 'immediate',
	});

	const [isLoading, setIsLoading] = useState(false);
	//bu erda email sms larga notificationlarga ozgartiradi
	const handleChannelToggle = (channel: keyof Pick<NotificationPreferences, 'email' | 'push' | 'sms' | 'desktop'>) => {
		setPreferences((prev) => ({
			...prev,
			[channel]: !prev[channel],
		}));
	};
	//bu erda categoriyalar ozgaradi
	const handleCategoryToggle = (category: keyof NotificationPreferences['categories']) => {
		setPreferences((prev) => ({
			...prev,
			categories: {
				...prev.categories,
				[category]: !prev.categories[category],
			},
		}));
	};
	//bu erda tezlik  ozgaradi kun  oy haftaga
	const handleFrequencyChange = (frequency: NotificationPreferences['frequency']) => {
		setPreferences((prev) => ({
			...prev,
			frequency,
		}));
	};
	//bu submit bosilganda saqlab qoladi
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// bu api ni chaqiradi
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log('Notification preferences updated:', preferences);
		setIsLoading(false);
	};

	return (
		<Card className="space-y-8 bg-black text-white border border-gray-700 shadow-xl">
			<div className="flex items-center gap-3">
				<Bell className="w-6 h-6 text-blue-400" />
				<h2 className="text-2xl font-bold">Настройки уведомлений</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Notification Channels */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Каналы уведомлений</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Email Notifications */}
						<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-blue-400" />
								<div>
									<h4 className="font-medium">Email уведомления</h4>
									<p className="text-sm text-gray-400">Получать уведомления на почту</p>
								</div>
							</div>
							<Switch checked={preferences.email} onCheckedChange={() => handleChannelToggle('email')} />
						</div>

						{/* Push Notifications */}
						<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Bell className="w-5 h-5 text-green-400" />
								<div>
									<h4 className="font-medium">Push уведомления</h4>
									<p className="text-sm text-gray-400">Уведомления в браузере</p>
								</div>
							</div>
							<Switch checked={preferences.push} onCheckedChange={() => handleChannelToggle('push')} />
						</div>

						{/* SMS Notifications */}
						<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Smartphone className="w-5 h-5 text-purple-400" />
								<div>
									<h4 className="font-medium">SMS уведомления</h4>
									<p className="text-sm text-gray-400">Важные уведомления по SMS</p>
								</div>
							</div>
							<Switch checked={preferences.sms} onCheckedChange={() => handleChannelToggle('sms')} />
						</div>

						{/* Desktop Notifications */}
						<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Monitor className="w-5 h-5 text-orange-400" />
								<div>
									<h4 className="font-medium">Desktop уведомления</h4>
									<p className="text-sm text-gray-400">Уведомления на рабочем столе</p>
								</div>
							</div>
							<Switch checked={preferences.desktop} onCheckedChange={() => handleChannelToggle('desktop')} />
						</div>
					</div>
				</div>

				{/* Notification Categories */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Категории уведомлений</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Object.entries(preferences.categories).map(([category, enabled]) => (
							<div
								key={category}
								className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600"
							>
								<div>
									<h4 className="font-medium capitalize">{category}</h4>
									<p className="text-sm text-gray-400">
										{category === 'deals' && 'Новые сделки и обновления'}
										{category === 'tasks' && 'Напоминания о задачах'}
										{category === 'messages' && 'Новые сообщения'}
										{category === 'system' && 'Системные уведомления'}
										{category === 'marketing' && 'Маркетинговые предложения'}
									</p>
								</div>
								<Switch
									checked={enabled}
									onCheckedChange={() => handleCategoryToggle(category as keyof NotificationPreferences['categories'])}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Frequency Settings */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Частота уведомлений</h3>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{ value: 'immediate', label: 'Мгновенно' },
							{ value: 'daily', label: 'Ежедневно' },
							{ value: 'weekly', label: 'Еженедельно' },
							{ value: 'never', label: 'Никогда' },
						].map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleFrequencyChange(option.value as NotificationPreferences['frequency'])}
								className={`p-3 rounded-lg border transition-colors ${
									preferences.frequency === option.value
										? 'bg-blue-600 border-blue-500 text-white'
										: 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
								}`}
							>
								{option.label}
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
