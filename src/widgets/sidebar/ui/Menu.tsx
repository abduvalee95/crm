'use client';

import { logOut } from '@/features/auth';
import { formatAvatarUrl } from '@/lib/config/config';
import { Role } from '@/lib/enums/status';
import { useThemeSettings } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { toggleSidebar } from '@/shared/store/uiSlice';
import { fetchCurrentUser } from '@/shared/store/userSlice';
import { LogIn, LogOut, PanelLeftClose, PanelRight, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

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
	const user = useAppSelector((state) => state.user.user);
	const isLoading = useAppSelector((state) => state.user.isLoading);

	// Client-side mounted
	useEffect(() => {
		// Bu useEffect faqat mount
		if (typeof window === 'undefined') return;

		const token = localStorage.getItem('token');
		console.log('Menu useEffect - token :', token);

		if (token && token.trim() && !user && !isLoading) {
			console.log('Dispatching fetchCurrentUser from Menu');
			dispatch(fetchCurrentUser());
		}
	}, [dispatch, user, isLoading]);

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

	const getRoleLabel = (role?: Role): string => {
		if (!role) return '';
		const roleLabels: Record<Role, string> = {
			[Role.ADMIN]: 'Администратор',
			[Role.MANAGER]: 'Менеджер',
			[Role.ANALYST]: 'Аналитик',
			[Role.SUPPORT]: 'Поддержка',
			[Role.USER]: 'Пользователь',
		};
		return roleLabels[role] || role;
	};

	return (
		<aside
			aria-label="Боковая панель навигации"
			className={`flex h-full flex-col justify-between  p-4 text-card-foreground transition-colors ${
				sidebarOpen ? 'w-64' : 'w-20'
			}`}
			data-collapsed={!sidebarOpen}
		>
			<div>
				<div className="flex items-center justify-between pb-4">
					<div className="flex items-center gap-2">
						{sidebarOpen && <span className="text-xl font-semibold">CRM Система</span>}
					</div>
					<button
						type="button"
						className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-primary hover:text-primary"
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
									isActive ? 'bg-primary' : 'hover:bg-accent'
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
				{user?.avatar && formatAvatarUrl(user?.avatar) ? (
					<Image
						src={formatAvatarUrl(user?.avatar)}
						alt={user.fullName || 'User'}
						width={32}
						height={32}
						className="rounded-full object-cover w-8 h-8"
					/>
				) : (
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
						{user?.fullName
							? user.fullName
									.split(' ')
									.map((n) => n[0])
									.join('')
									.toUpperCase()
									.slice(0, 2)
							: 'U'}
					</div>
				)}
				{sidebarOpen && (
					<div className="flex flex-col gap-2 flex-1 min-w-0">
						{user ? (
							<>
								<div className="flex flex-col min-w-0">
									<span className={`${fontSizeClass} font-semibold leading-tight truncate`}>{user.fullName}</span>
									{user.role && (
										<span className="text-xs text-muted-foreground truncate">{getRoleLabel(user.role)}</span>
									)}
									{user.position && <span className="text-xs text-muted-foreground truncate">{user.position}</span>}
								</div>
								<button
									onClick={() => logOut(dispatch)}
									className="flex items-center gap-2 px-3 py-2 rounded-lg text-white transition hover:bg-accent mt-1"
									aria-label="Выйти из системы"
								>
									<LogOut className="h-4 w-4" />
									<span className={`${fontSizeClass} leading-tight`}>Выйти</span>
								</button>
							</>
						) : isLoading ? (
							<div className="text-sm text-muted-foreground">Загрузка...</div>
						) : (
							<div className="flex flex-col gap-2">
								<Link
									href="/login"
									className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white transition ${
										pathname === '/login' ? 'bg-primary' : 'hover:bg-accent'
									}`}
									aria-current={pathname === '/login' ? 'page' : undefined}
								>
									<LogIn className="h-4 w-4" />
									<span className={`${fontSizeClass} leading-tight`}>Войти</span>
								</Link>
								<Link
									href="/register"
									className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white transition ${
										pathname === '/register' ? 'bg-primary' : 'hover:bg-accent'
									}`}
									aria-current={pathname === '/register' ? 'page' : undefined}
								>
									<UserPlus className="h-4 w-4" />
									<span className={`${fontSizeClass} leading-tight`}>Регистрация</span>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</aside>
	);
};

export default Menu;
