import { ViewMode } from "../enums/deal";

// Интерфейс для кнопки действия
export interface ActionButton {
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	className?: string;
}


// Пропсы для компонента Header
export interface HeaderProps {
	pageType?: 'home' | 'clients' | 'deals' | 'analytics' | 'employees' | 'settings';
	customConfig?: PageConfig;
    activeView?: ViewMode;
    onViewChange?: (view: ViewMode) => void;
}
export interface ButtonAction {
    type: 'button';
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
}

export interface ViewSwitcherAction {
    type: 'view-switcher';
    options: {
        view: ViewMode;
        label: string;
        icon: React.ReactNode;
    }[];
}


export type PageAction = ButtonAction | ViewSwitcherAction;


// Интерфейс для конфигурации страницы
export interface PageConfig {
	title: string;
	subtitle: string;
	actions?: PageAction[];
}