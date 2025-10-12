
// Интерфейс для кнопки действия
export interface ActionButton {
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	className?: string;
}

// Интерфейс для конфигурации страницы
export interface PageConfig {
	title: string;
	subtitle: string;
	actions?: ActionButton[];
}



// Пропсы для компонента Header
export interface HeaderProps {
	pageType?: 'home' | 'clients' | 'deals' | 'analytics' | 'employees' | 'settings';
	customConfig?: PageConfig;
}