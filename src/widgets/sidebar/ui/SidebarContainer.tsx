'use client';

import { useAppSelector } from '@/shared/store/hooks';
import Menu from './Menu';

const expandedWidth = 'w-70';
const collapsedWidth = 'w-20';

const SidebarContainer = () => {
	const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
	const widthClass = sidebarOpen ? expandedWidth : collapsedWidth;

	return (
		<div
			className={`sticky top-0 flex h-screen flex-shrink-0 flex-col overflow-y-auto border-r border-gray-800 bg-card/40 transition-[width] duration-800 ease-in-out ${widthClass} cursor-pointer`}
		>
			<Menu />
		</div>
	);
};

export default SidebarContainer;
