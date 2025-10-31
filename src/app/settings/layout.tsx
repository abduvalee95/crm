'use client';

import { cn } from '@/lib/utils';
import Header from '@/widgets/header/ui/Header'
import { Bell, Palette, User,Link2, LockKeyhole } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SETTINGS_NAV_ITEMS = [
	{ href: '/settings/profile', label: 'Профиль', icon: <User /> },
	{ href: '/settings/notifications', label: 'Уведомления', icon: <Bell /> },
	{ href: '/settings/theme', label: 'Тема', icon: <Palette /> },
	{ href: '/settings/access', label: 'Доступы', icon: <LockKeyhole /> },
	{ href: '/settings/integration', label: 'Интеграции', icon: <Link2 /> },
] as const;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex-1 bg-background min-h-screen p-4 space-y-6">
			<Header pageType="settings" />
			{/* Navigation Bar */}
			<nav className="flex bg-gray-800 rounded-lg justify-around items-center py-3 gap-4">
				{SETTINGS_NAV_ITEMS.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								// Base styles
								'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200',
								// Active state
								isActive
									? 'bg-primary text-primary-foreground font-medium shadow-lg'
									: 'text-gray-400 hover:text-white hover:bg-gray-700',
							)}
						>
							<span>{item.icon}</span>
							<span className="text-sm">{item.label}</span>
						</Link>
					);
				})}
			</nav>
			<div className="mt-6">{children}</div>
		</div>
	);
}
