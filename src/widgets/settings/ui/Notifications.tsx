'use client';

import { Button } from '@/components/ui/button'
import type { ApiError } from '@/lib/api/client'
import { NotificationCategory, NotificationChannel, NotificationFrequency } from '@/lib/enums/notification'
import {
	notificationService,
	type NotificationSettingsResponse,
	type UpdateNotificationSettingsPayload,
} from '@/lib/services/notificationService'
import { Card } from '@/shared/ui/Card'
import { Switch } from '@/shared/ui/Switch'
import { Bell, Mail, Monitor, Save, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Notifications() {
	const [settings, setSettings] = useState<NotificationSettingsResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	// Load settings on mount
	useEffect(() => {
		fetchSettings();
	}, []);

	const fetchSettings = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await notificationService.getSettings();
			console.log('Notification settings loaded:', data);
			setSettings(data);
		} catch (err) {
			console.error('Error fetching notification settings:', err);
			const apiError = err as ApiError;
			console.error('API Error details:', {
				message: apiError?.message,
				status: apiError?.status,
				errors: apiError?.errors,
			});

			// 404 yoki 401 xatolari uchun maxsus xabar
			if (apiError?.status === 404) {
				setError('Настройки не найдены. Попробуйте обновить страницу.');
			} else if (apiError?.status === 401) {
				setError('Требуется авторизация. Пожалуйста, войдите в систему.');
			} else {
				setError(apiError?.message || 'Не удалось загрузить настройки. Проверьте подключение к серверу.');
			}
		} finally {
			setIsLoading(false);
		}
	};
	const handleChannelToggle = (channel: NotificationChannel) => {
		if (!settings) return;
		setSettings((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				channels: {
					...prev.channels,
					[channel]: !prev.channels[channel],
				},
			};
		});
	};

	const handleCategoryToggle = (category: NotificationCategory) => {
		if (!settings) return;
		setSettings((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				categories: {
					...prev.categories,
					[category]: !prev.categories[category],
				},
			};
		});
	};

	const handleFrequencyChange = (frequency: NotificationFrequency) => {
		if (!settings) return;
		setSettings((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				frequency,
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!settings) return;

		setIsSaving(true);
		setError(null);
		setSuccess(null);

		try {
			const payload: UpdateNotificationSettingsPayload = {
				channels: settings.channels,
				categories: settings.categories,
				frequency: settings.frequency,
			};

			const updated = await notificationService.updateSettings(payload);
			setSettings(updated);
			setSuccess('Настройки успешно сохранены');
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError?.message || 'Не удалось сохранить настройки');
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<Card className="space-y-8 bg-background text-card-foreground border border-gray-700 shadow-xl">
				<div className="flex items-center justify-center py-8">
					<div className="text-muted-foreground">Загрузка настроек...</div>
				</div>
			</Card>
		);
	}

	if (!settings) {
		return (
			<Card className="space-y-8 bg-background text-card-foreground border border-gray-700 shadow-xl">
				<div className="flex items-center justify-center py-8">
					<div className="text-red-500">Ошибка загрузки настроек</div>
				</div>
			</Card>
		);
	}

	return (
		<Card className="space-y-8 bg-background text-card-foreground border border-gray-700 shadow-xl">
			<div className="flex items-center gap-3">
				<Bell className="w-6 h-6 text-blue-400" />
				<h2 className="text-2xl font-bold">Настройки уведомлений</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Notification Channels */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-card-foreground border-b border-gray-700 pb-2">
						Каналы уведомлений
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Email Notifications */}
						<div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Mail className="w-5 h-5 text-blue-400" />
								<div>
									<h4 className="font-medium">Email уведомления</h4>
									<p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
								</div>
							</div>
							<Switch
								checked={settings.channels[NotificationChannel.EMAIL]}
								onCheckedChange={() => handleChannelToggle(NotificationChannel.EMAIL)}
							/>
						</div>

						{/* Push Notifications */}
						<div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Bell className="w-5 h-5 text-green-400" />
								<div>
									<h4 className="font-medium">Push уведомления</h4>
									<p className="text-sm text-muted-foreground">Уведомления в браузере</p>
								</div>
							</div>
							<Switch
								checked={settings.channels[NotificationChannel.PUSH]}
								onCheckedChange={() => handleChannelToggle(NotificationChannel.PUSH)}
							/>
						</div>

						{/* SMS Notifications */}
						<div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Smartphone className="w-5 h-5 text-purple-400" />
								<div>
									<h4 className="font-medium">SMS уведомления</h4>
									<p className="text-sm text-muted-foreground">Важные уведомления по SMS</p>
								</div>
							</div>
							<Switch
								checked={settings.channels[NotificationChannel.SMS]}
								onCheckedChange={() => handleChannelToggle(NotificationChannel.SMS)}
							/>
						</div>

						{/* Desktop Notifications */}
						<div className="flex items-center justify-between p-4 bg-background rounded-lg border border-gray-600">
							<div className="flex items-center gap-3">
								<Monitor className="w-5 h-5 text-orange-400" />
								<div>
									<h4 className="font-medium">Desktop уведомления</h4>
									<p className="text-sm text-muted-foreground">Уведомления на рабочем столе</p>
								</div>
							</div>
							<Switch
								checked={settings.channels[NotificationChannel.DESKTOP]}
								onCheckedChange={() => handleChannelToggle(NotificationChannel.DESKTOP)}
							/>
						</div>
					</div>
				</div>

				{/* Notification Categories */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-card-foreground border-b border-gray-700 pb-2">
						Категории уведомлений
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Object.entries(settings.categories).map(([category, enabled]) => (
							<div
								key={category}
								className="flex items-center justify-between p-3 bg-background rounded-lg border border-gray-600"
							>
								<div>
									<h4 className="font-medium capitalize">{category}</h4>
									<p className="text-sm text-muted-foreground">
										{category === NotificationCategory.DEALS && 'Новые сделки и обновления'}
										{category === NotificationCategory.TASKS && 'Напоминания о задачах'}
										{category === NotificationCategory.MESSAGES && 'Новые сообщения'}
										{category === NotificationCategory.SYSTEM && 'Системные уведомления'}
										{category === NotificationCategory.MARKETING && 'Маркетинговые предложения'}
									</p>
								</div>
								<Switch
									checked={enabled}
									onCheckedChange={() => handleCategoryToggle(category as NotificationCategory)}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Frequency Settings */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-card-foreground border-b border-gray-700 pb-2">
						Частота уведомлений
					</h3>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{ value: NotificationFrequency.INSTANT, label: 'Мгновенно' },
							{ value: NotificationFrequency.DAILY, label: 'Ежедневно' },
							{ value: NotificationFrequency.WEEKLY, label: 'Еженедельно' },
							{ value: NotificationFrequency.NEVER, label: 'Никогда' },
						].map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleFrequencyChange(option.value)}
								className={`p-3 rounded-lg border transition-colors ${
									settings.frequency === option.value
										? 'bg-blue-600 border-blue-500 text-white'
										: 'bg-background border-gray-600 text-card-foreground hover:bg-gray-700'
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				{/* Error/Success Messages */}
				{(error || success) && (
					<div
						className={`rounded-md px-4 py-3 text-sm ${
							error
								? 'bg-red-50 text-red-700 border border-red-200'
								: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
						}`}
					>
						{error || success}
					</div>
				)}

				{/* Submit Button */}
				<div className="flex justify-end pt-6 border-t border-gray-700">
					<Button
						type="submit"
						disabled={isSaving}
						className="bg-blue-600 hover:bg-blue-700 text-card-foreground px-8 py-2"
					>
						<Save className="w-4 h-4 mr-2" />
						{isSaving ? 'Сохранение...' : 'Сохранить настройки'}
					</Button>
				</div>
			</form>
		</Card>
	);
}
