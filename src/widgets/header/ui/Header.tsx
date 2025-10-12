"use client";

import { Button } from '@/components/ui/button';
import pageConfigs from '@/lib/config/headerConf';
import { HeaderProps } from '@/lib/interface/header';
import React from 'react';


const Header: React.FC<HeaderProps> = ({ pageType = 'home', customConfig }) => {
	// Используем кастомную конфигурацию или конфигурацию по типу страницы
	const config = customConfig || pageConfigs[pageType];

	return (
		<header className="mt-5 flex justify-between px-6">
			<div>
				<h1 className="text-2xl font-bold text-white">{config.title}</h1>
				<p className="text-gray-400 mt-1">{config.subtitle}</p>
			</div>
			<div className="flex items-center space-x-4 px-8">
				{config.actions?.map((action, index) => (
					<Button 
						key={index}
						variant="ghost" 
						size="icon" 
						className="text-gray-200 hover:text-white hover:bg-gray-700"
						onClick={action.onClick}
					>
						<span className={action.className}>
							{action.icon} {action.label}
						</span>
					</Button>
				))}
			</div>
		</header>
	);
};

export default Header;
