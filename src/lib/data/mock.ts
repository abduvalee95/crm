import { StatCardData } from '../types/types';

export const statCardsData: StatCardData[] = [
	{ title: 'Всего клиентов', value: '2,847', change: '+12% с прошлого месяца', icon: '/clients.png' },
	{ title: 'Активные сделки', value: '156', change: '+4 новых на этой неделе', icon: '/deal.png' },
	{ title: 'Новые задачи', value: '23', change: '5 просроченных', icon: '/tasks.png' },
	{ title: 'Доход за месяц', value: '₽1,247,000', change: '+18% к цели', icon: '/dollor.png' },
];

export const salesChartData = [
	{ name: 'Пн', sales: 15000 },
	{ name: 'Вт', sales: 52000 },
	{ name: 'Ср', sales: 41000 },
	{ name: 'Чт', sales: 62000 },
	{ name: 'Пт', sales: 68000 },
	{ name: 'Сб', sales: 35000 },
	{ name: 'Вс', sales: 45000 },
];

export const salesChart = [
	{ name: 'янв', sales: 15000 },
	{ name: 'фев', sales: 52000 },
	{ name: 'мар', sales: 41000 },
	{ name: 'апр', sales: 62000 },
	{ name: 'май', sales: 68000 },
	{ name: 'июн', sales: 35000 },
	{ name: 'июл', sales: 45000 },
	{ name: 'авг', sales: 62000 },
	{ name: 'сен', sales: 68000 },
	{ name: 'окт', sales: 35000 },
	{ name: 'ноя', sales: 45000 },
	{ name: 'дек', sales: 68000 },
];
export const conversion = [
	{ name: 'Янв', sales: 12 },
	{ name: 'Фев', sales: 18 },
	{ name: 'Мар', sales: 15 },
	{ name: 'Апр', sales: 22 },
	{ name: 'Май', sales: 28 },
	{ name: 'Июн', sales: 25 },
	{ name: 'Июл', sales: 31 },
	{ name: 'Авг', sales: 27 },
	{ name: 'Сен', sales: 33 },
	{ name: 'Окт', sales: 29 },
	{ name: 'Ноя', sales: 35 },
	{ name: 'Дек', sales: 38 },
];

// Analytics Dashboard Data
export const analyticsData = {
	// Revenue by month (in thousands)
	revenueData: [
		{ name: 'Янв', revenue: 1250, profit: 320 },
		{ name: 'Фев', revenue: 1890, profit: 480 },
		{ name: 'Мар', revenue: 2100, profit: 520 },
		{ name: 'Апр', revenue: 2450, profit: 610 },
		{ name: 'Май', revenue: 2800, profit: 720 },
		{ name: 'Июн', revenue: 3200, profit: 850 },
		{ name: 'Июл', revenue: 2950, profit: 780 },
		{ name: 'Авг', revenue: 3100, profit: 820 },
		{ name: 'Сен', revenue: 3400, profit: 920 },
		{ name: 'Окт', revenue: 3650, profit: 980 },
		{ name: 'Ноя', revenue: 3800, profit: 1020 },
		{ name: 'Дек', revenue: 4200, profit: 1150 },
	],

	// Lead sources data
	leadSources: [
		{ name: 'Реклама в интернете', value: 35, color: '#3B82F6' },
		{ name: 'Рекомендации', value: 25, color: '#10B981' },
		{ name: 'Холодные звонки', value: 15, color: '#F59E0B' },
		{ name: 'Выставки', value: 12, color: '#EF4444' },
		{ name: 'Партнеры', value: 8, color: '#8B5CF6' },
		{ name: 'Другие', value: 5, color: '#06B6D4' },
	],

	// Conversion funnel data
	conversionFunnel: [
		{ name: 'Лиды', value: 1000, color: '#3B82F6' },
		{ name: 'Квалифицированные', value: 750, color: '#10B981' },
		{ name: 'Презентации', value: 450, color: '#F59E0B' },
		{ name: 'Предложения', value: 280, color: '#EF4444' },
		{ name: 'Переговоры', value: 180, color: '#8B5CF6' },
		{ name: 'Закрытые сделки', value: 95, color: '#06B6D4' },
	],

	// Client performance data
	clientPerformance: [
		{ name: 'ООО "ТехноСтар"', company: 'IT-решения', revenue: 1250000, deals: 8, status: 'active' },
		{ name: 'ИП Иванов И.И.', company: 'Консалтинг', revenue: 890000, deals: 5, status: 'active' },
		{ name: 'АО "Инновации"', company: 'Разработка', revenue: 2100000, deals: 12, status: 'new' },
		{ name: 'ООО "СтройМир"', company: 'Строительство', revenue: 1560000, deals: 6, status: 'active' },
		{ name: 'ИП Петров П.П.', company: 'Торговля', revenue: 670000, deals: 3, status: 'inactive' },
		{ name: 'ООО "МедиаГрупп"', company: 'Маркетинг', revenue: 1340000, deals: 7, status: 'active' },
		{ name: 'АО "Финансы+"', company: 'Банкинг', revenue: 980000, deals: 4, status: 'new' },
		{ name: 'ООО "Логистика"', company: 'Транспорт', revenue: 1120000, deals: 5, status: 'active' },
	],

	// Monthly metrics
	monthlyMetrics: {
		totalRevenue: 42500000,
		totalClients: 2847,
		activeDeals: 156,
		conversionRate: 9.5,
		averageDealSize: 272000,
		newClients: 89,
		closedDeals: 23,
	},
};
