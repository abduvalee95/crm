'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileForm from './ProfileForm'

const Nav = [
	{ href: '/profile', label: 'Профиль', component:<ProfileForm/>},
	{ href: '/settings/notifications', label: 'Уведомления' },
	{ href: '/settings/theme', label: 'Тема' },
	{ href: '/settings/access', label: 'Доступы' },
	{ href: '/settings/integrations', label: 'Интеграции' },
];

export function SettingsNav() {
	const pathname = usePathname()
	return (
		<nav className="flex bg-gray-800 rounded-lg justify-around item-center">
			{Nav.map((item) => (
				<Link
					href={item.href}
					key={item.label}
					className={cn(
						'pb-2 transition-colors hover:text-primary',
						pathname === item.href ? 'text-primary border-b-2 border-primary font-medium' : 'text-muted-foreground',
					)}
				>
					{item.label}
				</Link>
			))}
		</nav>
	);
}
