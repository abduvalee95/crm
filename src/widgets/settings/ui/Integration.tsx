'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useEffect, useMemo, useState } from 'react';
import type { ApiError } from '@/lib/api/client';
import {
	integrationService,
	type TelegramSettingsResponse,
} from '@/lib/services/integrationService';

const Integration = () => {
	// Telegram state
	const [telegramEnabled, setTelegramEnabled] = useState<boolean>(false);
	const [telegramBotToken, setTelegramBotToken] = useState<string>('');
	const [telegramChatId, setTelegramChatId] = useState<string>('');
	const [telegramMaskedToken, setTelegramMaskedToken] = useState<string | null>(null);
	const [telegramLoading, setTelegramLoading] = useState<boolean>(true);
	const [telegramSaving, setTelegramSaving] = useState<boolean>(false);
	const [telegramTesting, setTelegramTesting] = useState<boolean>(false);
	const [telegramMeta, setTelegramMeta] = useState<
		Pick<TelegramSettingsResponse, 'source' | 'updatedAt'> | null
	>(null);
	const [telegramStatus, setTelegramStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(
		null,
	);

	const [whatsAppEnabled, setWhatsAppEnabled] = useState<boolean>(false);
	const [whatsAppApiKey, setWhatsAppApiKey] = useState<string>('');
	const [whatsAppPhone, setWhatsAppPhone] = useState<string>('');

	// Email
	const [smtpServer, setSmtpServer] = useState<string>('');
	const [smtpPort, setSmtpPort] = useState<string>('');
	const [smtpUser, setSmtpUser] = useState<string>('');
	const [smtpPassword, setSmtpPassword] = useState<string>('');
	const [useTLS, setUseTLS] = useState<boolean>(true);
	const [useSSL, setUseSSL] = useState<boolean>(false);
	const [fromName, setFromName] = useState<string>('');
	const [fromEmail, setFromEmail] = useState<string>('');

	// API
	const [apiBaseUrl, setApiBaseUrl] = useState<string>('');
	const [apiKey, setApiKey] = useState<string>('');
	const [webhookUrl, setWebhookUrl] = useState<string>('');
	const [retryAttempts, setRetryAttempts] = useState<string>('3');
	const [enableWebhooks, setEnableWebhooks] = useState<boolean>(false);

	const formatError = (error: unknown): string => {
		const apiError = error as ApiError;
		return apiError?.message || 'Не удалось выполнить запрос. Попробуйте еще раз.';
	};

	const fetchTelegramSettings = async () => {
		setTelegramLoading(true);
		setTelegramStatus(null);
		try {
			const data = await integrationService.getTelegramSettings();
			setTelegramEnabled(data.enabled);
			setTelegramMaskedToken(data.botTokenPreview);
			setTelegramChatId(data.defaultChatId ?? '');
			setTelegramMeta({ source: data.source, updatedAt: data.updatedAt });
			setTelegramBotToken(''); // никогда не показываем сохранённый токен полностью
		} catch (error) {
			setTelegramStatus({ type: 'error', message: formatError(error) });
		} finally {
			setTelegramLoading(false);
		}
	};

	useEffect(() => {
		void fetchTelegramSettings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSaveMessengers = async () => {
		setTelegramSaving(true);
		setTelegramStatus(null);
		try {
			await integrationService.updateTelegramSettings({
				enabled: telegramEnabled,
				botToken: telegramBotToken.trim() || undefined,
				defaultChatId: telegramChatId.trim() || undefined,
			});
			setTelegramStatus({ type: 'success', message: 'Настройки Telegram успешно сохранены' });
			await fetchTelegramSettings();
		} catch (error) {
			setTelegramStatus({ type: 'error', message: formatError(error) });
		} finally {
			setTelegramSaving(false);
		}
	};

	const handleTestTelegram = async () => {
		setTelegramTesting(true);
		setTelegramStatus(null);
		try {
			await integrationService.testTelegramSettings({
				enabled: telegramEnabled,
				botToken: telegramBotToken.trim() || undefined,
				defaultChatId: telegramChatId.trim() || undefined,
				message: 'CRM Telegram integration ',
			});
			setTelegramStatus({ type: 'success', message: 'Тестовое сообщение отправлено в Telegram' });
		} catch (error) {
			setTelegramStatus({ type: 'error', message: formatError(error) });
		} finally {
			setTelegramTesting(false);
		}
	};

	const telegramPlaceholder = useMemo(() => {
		if (telegramBotToken) {
			return undefined;
		}
		if (!telegramMaskedToken) {
			return 'Bot token';
		}
		return `Сохранено: ${telegramMaskedToken}`;
	}, [telegramBotToken, telegramMaskedToken]);

	const handleSaveEmail = () => {
		console.log('Save Email', {
			smtpServer,
			smtpPort,
			smtpUser,
			smtpPassword,
			useTLS,
			useSSL,
			fromName,
			fromEmail,
		});
	};

	const handleTestEmail = () => {
		console.log('Test email sending...');
	};

	const handleSaveApi = () => {
		console.log('Save API', {
			apiBaseUrl,
			apiKey,
			webhookUrl,
			retryAttempts,
			enableWebhooks,
		});
	};

	return (
		<div className="space-y-8">
			{/* Messengers */}
			<div className="bg-background text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-background">
					<h2 className="text-lg font-semibold">Мессенджеры</h2>
					<p className="text-sm text-muted-foreground mt-1">Подключения для уведомлений и общения</p>
				</div>
				<div className="p-6 space-y-6">
					{/* Telegram */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Telegram</p>
								<p className="text-sm text-muted-foreground">Уведомления и управление через бота</p>
							</div>
							<Switch
								checked={telegramEnabled}
								onCheckedChange={setTelegramEnabled}
								aria-label="Telegram enable"
								disabled={telegramLoading}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								placeholder={telegramPlaceholder}
								value={telegramBotToken}
								onChange={(e) => setTelegramBotToken(e.target.value)}
								disabled={telegramLoading}
							/>
							<Input
								placeholder="Chat ID"
								value={telegramChatId}
								onChange={(e) => setTelegramChatId(e.target.value)}
								disabled={telegramLoading}
							/>
						</div>
						<div className="flex flex-col gap-2 text-xs text-muted-foreground">
							{telegramMeta?.updatedAt && (
								<span>
									Последнее обновление:{' '}
									{new Date(telegramMeta.updatedAt).toLocaleString()}
								</span>
							)}
							{telegramMeta?.source && (
								<span>
									Источник данных:{' '}
									{telegramMeta.source === 'database'
										? 'CRM база данных'
										: telegramMeta.source === 'env'
											? '.env'
											: 'не настроено'}
								</span>
							)}
						</div>
						{telegramStatus && (
							<div
								className={`rounded-md px-3 py-2 text-sm ${
									telegramStatus.type === 'success'
										? 'bg-emerald-50 text-emerald-700'
										: 'bg-red-50 text-red-700'
								}`}
								role="status"
								aria-live="polite"
							>
								{telegramStatus.message}
							</div>
						)}
					</div>

					{/* WhatsApp Business */}
					<div className="space-y-3 pt-4 border-t border-border">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">WhatsApp Business</p>
								<p className="text-sm text-muted-foreground">Коммуникации с клиентами</p>
							</div>
							<Switch checked={whatsAppEnabled} onCheckedChange={setWhatsAppEnabled} aria-label="WhatsApp enable" />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input placeholder="API key" value={whatsAppApiKey} onChange={(e) => setWhatsAppApiKey(e.target.value)} />
							<Input
								placeholder="Business phone"
								value={whatsAppPhone}
								onChange={(e) => setWhatsAppPhone(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex flex-wrap justify-end gap-3 pt-2">
						<Button
							variant="outline"
							onClick={handleTestTelegram}
							disabled={telegramTesting || telegramLoading}
						>
							{telegramTesting ? 'Отправка...' : 'Тест Telegram'}
						</Button>
						<Button onClick={handleSaveMessengers} disabled={telegramSaving || telegramLoading}>
							{telegramSaving ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</div>
				</div>
			</div>

			{/* Email */}
			<div className="bg-background text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-background">
					<h2 className="text-lg font-semibold">Email</h2>
					<p className="text-sm text-muted-foreground mt-1">Параметры SMTP сервера</p>
				</div>
				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input placeholder="Server" value={smtpServer} onChange={(e) => setSmtpServer(e.target.value)} />
						<Input placeholder="Port" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
						<Input placeholder="Username" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
						<Input
							placeholder="Password"
							type="password"
							value={smtpPassword}
							onChange={(e) => setSmtpPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-wrap items-center gap-6">
						<label className="flex items-center gap-2">
							<Switch checked={useTLS} onCheckedChange={setUseTLS} aria-label="Use TLS" />
							<span className="text-sm text-muted-foreground">TLS</span>
						</label>
						<label className="flex items-center gap-2">
							<Switch checked={useSSL} onCheckedChange={setUseSSL} aria-label="Use SSL" />
							<span className="text-sm text-muted-foreground">SSL</span>
						</label>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input placeholder="From name" value={fromName} onChange={(e) => setFromName(e.target.value)} />
						<Input placeholder="From email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<Button variant="outline" onClick={handleTestEmail}>
							Отправить тест
						</Button>
						<Button onClick={handleSaveEmail}>Сохранить</Button>
					</div>
				</div>
			</div>

			{/* API integration */}
			{/*		<div className="bg-background text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-background">
					<h2 className="text-lg font-semibold">API интеграция</h2>
					<p className="text-sm text-muted-foreground mt-1">Подключение к внешним сервисам</p>
				</div>
				 <div className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input placeholder="Base URL" value={apiBaseUrl} onChange={(e) => setApiBaseUrl(e.target.value)} />
						<Input placeholder="API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
						<Input placeholder="Webhook URL" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
						<Input
							placeholder="Retry attempts"
							value={retryAttempts}
							onChange={(e) => setRetryAttempts(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Switch checked={enableWebhooks} onCheckedChange={setEnableWebhooks} aria-label="Enable webhooks" />
						<span className="text-sm text-muted-foreground">Включить вебхуки</span>
					</div>
					<div className="flex justify-end gap-3 pt-2">
						<Button onClick={handleSaveApi}>Сохранить</Button>
						<Button variant="outline">Отменить</Button>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Integration;
