'use client';

import { Button } from '@/components/ui/button';
import pageConfigs from '@/lib/config/headerConf';
import { ViewMode } from '@/lib/enums/deal';
import { HeaderProps } from '@/lib/interface/header';
import FormModal from '@/widgets/ModalForm/FormModal';

const Header: React.FC<HeaderProps> = ({
	pageType = 'deals',
	customConfig,
	activeView = ViewMode.Kanban,
	onViewChange,
}) => {
	// Используем кастомную конфигурацию или конфигурацию по типу страницы
	const config = customConfig || pageConfigs[pageType];

	const tableForPage = (pt: HeaderProps['pageType']): 'client' | 'deal' | 'task' | 'employees' | null => {
		switch (pt) {
			case 'clients':
				return 'client';
			case 'deals':
				return 'deal';
			case 'employees':
				return 'employees';
			// если появится страница задач
			default:
				return null;
		}
	};

	return (
		<header className="mt-5 flex justify-between px-6">
			<div>
				<h1 className="text-2xl font-bold text-white">{config.title}</h1>
				<p className="text-gray-400 mt-1">{config.subtitle}</p>
			</div>
			<div className="flex items-center space-x-4 px-8">
				{config.actions?.map((action, index) => {
					switch (action.type) {
						case 'button': {
							const table = tableForPage(pageType);
							const isAddAction = typeof action.label === 'string' && action.label.toLowerCase().includes('добавить');
							if (isAddAction && table) {
								return <FormModal key={index} table={table} type="create" />;
							}
							return (
								<Button key={index} onClick={action.onClick} className={action.className}>
									{action.icon}
									{action.label}
								</Button>
							);
						}

						case 'view-switcher':
							return (
								<div key={index} className="flex items-center p-1 bg-card rounded-lg border border-gray-700">
									{action.options.map((option) => (
										<Button
											key={option.view}
											variant={activeView === option.view ? 'secondary' : 'default'} // korinishni ajratib korsatish
											size="sm"
											onClick={() => onViewChange?.(option.view)} // OnClick orqali holatni o'zgartirish
											className="gap-2"
										>
											{option.icon}
											{option.label}
										</Button>
									))}
								</div>
							);

						default:
							return null; // Agar nomalum tur kelsa, hech narsa chizmaymiz
					}
				})}
			</div>
		</header>
	);
};

export default Header;
