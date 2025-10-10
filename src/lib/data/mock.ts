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
