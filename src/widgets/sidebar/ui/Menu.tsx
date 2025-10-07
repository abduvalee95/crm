'use client';

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

	return (
		<aside className="flex flex-col justify-between h-screen w-64 bg-card p-4 border-r">
			{/* Title */}
			<div>
				<h1 className="text-white text-xl font-semibold mb-5 ml-2 pt-2">CRM Система</h1>
				<div className="border-t border-gray-700 p-2"/>

				<nav className="flex flex-col gap-1">
					{items.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								href={item.href}
								key={item.href}
								className={` flex items-center gap-3 px-4 py-2 rounded-lg text-white transition ${
									isActive ? 'bg-blue-600' : 'hover:bg-[#222]'
								}`}
							>
								<Image src={item.icon} alt={item.label} width={22} height={22} className="invert" />
								<span className="text-[16px]">{item.label}</span>
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Profile Section */}
			<div className="border-t border-gray-700 pt-3 flex items-center gap-3">
				<div className="flex items-center justify-center bg-blue-600 rounded-full w-8 h-8 text-white text-sm font-bold">
					Ю
				</div>
				<div>
					<p className="text-white text-sm font-medium">Юсуф</p>
					<p className="text-gray-400 text-xs">Администратор</p>
				</div>
			</div>
		</aside>
	);
};

export default Menu;
