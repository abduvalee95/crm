'use client';

import { useThemeSettings } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { toggleSidebar } from '@/shared/store/uiSlice';
import { Menu as MenuIcon, PanelLeftClose, PanelRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
	{ href: '/', icon: '/home.png', label: 'Главная' },
	{ href: '/clients', icon: '/clients.png', label: 'Клиенты' },
	{ href: '/deals', icon: '/deal.png', label: 'Сделки' },
	{ href: '/tasks', icon: '/tasks.png', label: 'Задачи' },
	{ href: '/messages', icon: '/message.png', label: 'Сообщения' },
	{ href: '/analytics', icon: '/analytics.png', label: 'Аналитика' },
	{ href: '/employees', icon: '/employee.png', label: 'Сотрудники' },
	{ href: '/settings', icon: '/settings.png', label: 'Настройки' },
];

const Menu = () => {
	const pathname = usePathname();
	const { fontSize, density } = useThemeSettings();
	const dispatch = useAppDispatch();
	const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

	const getFontSizeClass = () => {
		switch (fontSize) {
			case 'small':
				return 'text-sm';
			case 'medium':
				return 'text-base';
			case 'large':
				return 'text-lg';
			default:
				return 'text-base';
		}
	};

	const getSpacingClass = () => {
		switch (density) {
			case 'compact':
				return 'gap-1';
			case 'comfortable':
				return 'gap-2';
			case 'spacious':
				return 'gap-3';
			default:
				return 'gap-2';
		}
	};

	const fontSizeClass = getFontSizeClass();
	const spacingClass = getSpacingClass();
	const linkBaseClasses = sidebarOpen ? 'justify-start gap-3 px-4' : 'justify-center px-3';

	return (
		<aside
			aria-label="Боковая панель"
			className="flex h-full flex-col justify-between bg-card p-4 text-white transition-colors"
			data-collapsed={!sidebarOpen}
		>
			<div>
				<div className="flex items-center justify-between pb-4">
					<div className="flex items-center gap-2">
						{/* <MenuIcon aria-hidden className="h-5 w-5" /> */}
						{sidebarOpen && <span className="text-xl font-semibold">CRM Система</span>}
					</div>
					<button
						type="button"
						className="rounded-lg border border-gray-700 p-2 text-gray-300 transition hover:border-gray-500 hover:text-white"
						onClick={() => dispatch(toggleSidebar())}
						aria-label={sidebarOpen ? 'Свернуть боковую панель' : 'Развернуть боковую панель'}
						aria-pressed={sidebarOpen}
					>
						{sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
					</button>
				</div>
				<div className="border-t border-gray-700" aria-hidden="true" />
				<nav aria-label="Основные разделы" className={`mt-4 flex flex-col ${spacingClass}`}>
					{items.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								href={item.href}
								key={item.href}
								className={`flex w-full items-center ${linkBaseClasses} py-2 rounded-lg text-white transition ${
									isActive ? 'bg-blue-600' : 'hover:bg-[#222]'
								}`}
								aria-current={isActive ? 'page' : undefined}
							>
								<Image src={item.icon} alt={item.label} width={22} height={22} className="invert" />
								{sidebarOpen && <span className={`${fontSizeClass} leading-tight`}>{item.label}</span>}
							</Link>
						);
					})}
				</nav>
			</div>

			<div
				className={`flex items-center border-t border-gray-700 pt-3 transition-[gap] ${
					sidebarOpen ? 'gap-3' : 'justify-center'
				}`}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
					Ю
				</div>
				{sidebarOpen && (
					<div>
						<p className="text-sm font-medium text-white">Юсуф</p>
						<p className="text-xs text-gray-400">Администратор</p>
					</div>
				)}
			</div>
		</aside>
	);
};

export default Menu;
