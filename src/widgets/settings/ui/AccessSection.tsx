'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import type { ApiError } from '@/lib/api/client';
import { accessControlService, type RoleInfo } from '@/lib/services/accessControlService';
import {
	securitySettingsService,
	type SecuritySettingsResponse,
	type UpdateSecuritySettingsPayload,
} from '@/lib/services/securitySettingsService';
import { useEffect, useState } from 'react';

const AccessSection = () => {
	const [roles, setRoles] = useState<RoleInfo[]>([]);
	const [rolesLoading, setRolesLoading] = useState<boolean>(true);
	const [rolesError, setRolesError] = useState<string | null>(null);

	const [securitySettings, setSecuritySettings] = useState<SecuritySettingsResponse | null>(null);
	const [securityLoading, setSecurityLoading] = useState<boolean>(true);
	const [securitySaving, setSecuritySaving] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);
	const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);

	// Load roles
	useEffect(() => {
		fetchRoles();
	}, []);

	// Load security settings
	useEffect(() => {
		fetchSecuritySettings();
	}, []);

	const fetchRoles = async () => {
		setRolesLoading(true);
		setRolesError(null);
		try {
			const data = await accessControlService.getRoles();
			setRoles(data);
		} catch (err) {
			console.error('Error fetching roles:', err);
			const apiError = err as ApiError;
			setRolesError(apiError?.message || 'Не удалось загрузить роли');
		} finally {
			setRolesLoading(false);
		}
	};

	const fetchSecuritySettings = async () => {
		setSecurityLoading(true);
		setError(null);
		try {
			const data = await securitySettingsService.getSettings();
			setSecuritySettings(data);
		} catch (err) {
			console.error('Error fetching security settings:', err);
			const apiError = err as ApiError;
			setError(apiError?.message || 'Не удалось загрузить настройки безопасности');
		} finally {
			setSecurityLoading(false);
		}
	};

	const toggleSecuritySetting = async (field: 'twoFactorAuth' | 'activityLogging') => {
		if (!securitySettings) return;

		const newValue = !securitySettings[field];
		const updatedSettings = { ...securitySettings, [field]: newValue };
		setSecuritySettings(updatedSettings);

		// Optimistic update - backendga yuborish
		try {
			const payload: UpdateSecuritySettingsPayload = {
				[field]: newValue,
			};
			await securitySettingsService.updateSettings(payload);
		} catch (err) {
			// Agar xato bo'lsa, eski qiymatga qaytarish
			setSecuritySettings(securitySettings);
			const apiError = err as ApiError;
			setError(apiError?.message || 'Не удалось обновить настройку');
		}
	};

	const handleSaveSecuritySettings = async () => {
		if (!securitySettings) return;

		setSecuritySaving(true);
		setError(null);
		setSuccess(null);

		try {
			const payload: UpdateSecuritySettingsPayload = {
				twoFactorAuth: securitySettings.twoFactorAuth,
				autoLogoutMinutes: securitySettings.autoLogoutMinutes,
				activityLogging: securitySettings.activityLogging,
			};

			const updated = await securitySettingsService.updateSettings(payload);
			setSecuritySettings(updated);
			setSuccess('Настройки безопасности успешно сохранены');
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError?.message || 'Не удалось сохранить настройки');
		} finally {
			setSecuritySaving(false);
		}
	};

	const handleRoleConfigure = (role: RoleInfo) => {
		setSelectedRole(role);
		setIsRoleModalOpen(true);
	};

	return (
		<div className="space-y-8">
			{/* Roles and Permissions Section */}
			<div className="bg-background text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-background">
					<h2 className="text-lg font-semibold">Роли и разрешения</h2>
					<p className="text-sm text-muted-foreground mt-1">Системные роли</p>
				</div>

				<div className="p-6">
					{rolesLoading ? (
						<div className="text-center py-4 text-muted-foreground">Загрузка ролей...</div>
					) : rolesError ? (
						<div className="text-center py-4 text-red-500">{rolesError}</div>
					) : (
						<div className="grid gap-4">
							{roles.map((role) => (
								<div
									key={role.role}
									className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
								>
									<div className="flex items-center gap-4 flex-1">
										<div className="flex-1">
											<h3 className="font-medium">{role.name}</h3>
											<p className="text-sm text-muted-foreground">{role.description}</p>
											{role.permissions && role.permissions.length > 0 && (
												<div className="mt-2 flex flex-wrap gap-1">
													{role.permissions.slice(0, 3).map((permission, idx) => (
														<span key={idx} className="text-xs px-2 py-1  rounded text-muted-foreground">
															{permission}
														</span>
													))}
													{role.permissions.length > 3 && (
														<span className="text-xs px-2 py-1 rounded text-foreground">
															+{role.permissions.length - 3} еще
														</span>
													)}
												</div>
											)}
										</div>
									</div>

									<Button
										onClick={() => handleRoleConfigure(role)}
										className="px-4 py-2 text-sm font-medium text-foreground hover:bg-background hover:text-foreground rounded-lg transition-colors duration-200 border border-border"
									>
										Настроить
									</Button>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="px-6 py-4 border-t border-border bg-background">
					<h2 className="text-lg font-semibold">Настройки безопасности</h2>
				</div>

				<div className="p-6">
					{securityLoading ? (
						<div className="text-center py-4 text-muted-foreground">Загрузка настроек...</div>
					) : !securitySettings ? (
						<div className="text-center py-4 text-red-500">Ошибка загрузки настроек</div>
					) : (
						<div className="space-y-4">
							{/* Two Factor Auth */}
							<div className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors duration-200">
								<div className="flex items-center gap-4">
									<div>
										<h3 className="font-medium">Двухфакторная аутентификация</h3>
										<p className="text-sm text-muted-foreground">Дополнительная защита учетной записи</p>
									</div>
								</div>
								<Switch
									checked={securitySettings.twoFactorAuth}
									onCheckedChange={() => toggleSecuritySetting('twoFactorAuth')}
									aria-label="Двухфакторная аутентификация"
								/>
							</div>

							{/* Auto Logout */}
							<div className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors duration-200">
								<div className="flex items-center gap-4">
									<div>
										<h3 className="font-medium">Автоматический выход</h3>
										<p className="text-sm text-muted-foreground">
											Выход после {securitySettings.autoLogoutMinutes} минут неактивности
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min="5"
										max="480"
										value={securitySettings.autoLogoutMinutes}
										onChange={(e) =>
											setSecuritySettings((prev) =>
												prev ? { ...prev, autoLogoutMinutes: parseInt(e.target.value) || 30 } : null,
											)
										}
										className="w-20 px-2 py-1 text-sm border border-border rounded bg-background text-card-foreground"
									/>
									<span className="text-sm text-muted-foreground">мин</span>
								</div>
							</div>

							{/* Activity Logging */}
							<div className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors duration-200">
								<div className="flex items-center gap-4">
									<div>
										<h3 className="font-medium">Логирование действий</h3>
										<p className="text-sm text-muted-foreground">Ведение журнала активности пользователей</p>
									</div>
								</div>
								<Switch
									checked={securitySettings.activityLogging}
									onCheckedChange={() => toggleSecuritySetting('activityLogging')}
									aria-label="Логирование действий"
								/>
							</div>
						</div>
					)}
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

			{/* Actions */}
			<div className="flex gap-4">
				<Button
					onClick={handleSaveSecuritySettings}
					disabled={securitySaving || !securitySettings}
					className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
				>
					{securitySaving ? 'Сохранение...' : 'Сохранить изменения'}
				</Button>
			</div>

			{/* Role Details Modal */}
			{isRoleModalOpen && selectedRole && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					onClick={() => setIsRoleModalOpen(false)}
				>
					<div
						className="bg-background border border-border rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6 border-b border-border">
							<div className="flex items-center justify-between">
								<div>
									<h2 className="text-2xl font-bold text-card-foreground">{selectedRole.name}</h2>
									<p className="text-sm text-muted-foreground mt-1">{selectedRole.description}</p>
								</div>
								<Button
									variant="ghost"
									onClick={() => setIsRoleModalOpen(false)}
									className="text-muted-foreground hover:text-foreground"
								>
									✕
								</Button>
							</div>
						</div>

						<div className="p-6">
							<h3 className="text-lg font-semibold mb-4 text-card-foreground">Разрешения</h3>
							{selectedRole.permissions && selectedRole.permissions.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{selectedRole.permissions.map((permission, idx) => (
										<div key={idx} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/50">
											<svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
											<span className="text-sm text-card-foreground">{permission}</span>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">Нет разрешений</p>
							)}
						</div>

						<div className="p-6 border-t border-border flex justify-end gap-3">
							<Button variant="outline" onClick={() => setIsRoleModalOpen(false)}>
								Закрыть
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AccessSection;
