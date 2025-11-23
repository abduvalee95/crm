'use client';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface Role {
	id: string;
	name: string;
	description: string;
}

interface SecuritySetting {
	id: string;
	title: string;
	description: string;
	enabled: boolean;
}

const AccessSection = () => {
	const [roles] = useState<Role[]>([
		{
			id: 'admin',
			name: 'Администратор',
			description: 'Полный доступ ко всем функциям',
		},
		{
			id: 'manager',
			name: 'Менеджер',
			description: 'Управление клиентами и сделками',
		},
		{
			id: 'analyst',
			name: 'Аналитик',
			description: 'Доступ к отчетам и аналитике',
		},
		{
			id: 'support',
			name: 'Поддержка',
			description: 'Работа с обращениями клиентов',
		},
	]);

	const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
		{
			id: 'two-factor',
			title: 'Двухфакторная аутентификация',
			description: 'Дополнительная защита учетной записи',
			enabled: true,
		},
		{
			id: 'auto-logout',
			title: 'Автоматический выход',
			description: 'Выход после 30 минут неактивности',
			enabled: true,
		},
		{
			id: 'activity-logging',
			title: 'Логирование действий',
			description: 'Ведение журнала активности пользователей',
			enabled: false,
		},
	]);

	const toggleSecuritySetting = (id: string) => {
		setSecuritySettings((prev) =>
			prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
		);
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
					<div className="grid gap-4">
						{roles.map((role) => (
							<div
								key={role.id}
								className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
							>
								<div className="flex items-center gap-4">
									<div>
										<h3 className="font-medium">{role.name}</h3>
										<p className="text-sm text-muted-foreground">{role.description}</p>
									</div>
								</div>

								<button className="px-4 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200 border border-border">
									Настроить
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="px-6 py-4 border-t border-border bg-background">
					<h2 className="text-lg font-semibold">Настройки безопасности</h2>
				</div>

				<div className="p-6">
					<div className="space-y-4">
						{securitySettings.map((setting) => (
							<div
								key={setting.id}
								className="flex items-center justify-between p-4 rounded-lg border border-border transition-colors duration-200"
							>
								<div className="flex items-center gap-4">
									<div>
										<h3 className="font-medium">{setting.title}</h3>
										<p className="text-sm text-muted-foreground">{setting.description}</p>
									</div>
								</div>

								<Switch
									checked={setting.enabled}
									onCheckedChange={() => toggleSecuritySetting(setting.id)}
									aria-label={setting.title}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Actions */}
			<div className="flex gap-4">
				<button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
					Сохранить изменения
				</button>
				<button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors duration-200 font-medium">
					Отменить
				</button>
			</div>
		</div>
	);
};

export default AccessSection;
