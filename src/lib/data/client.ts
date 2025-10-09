
import { Client, Event } from '../types/types';
const recentClients: Client[] = [
	{
		name: 'Иван Петров',
		company: 'ООО "Технологии"',
		email: 'ivan.p@tech.com',
		status: 'active',
		lastContact: '2 дня назад',
		avatar: '/avatars/01.png',
	},
	{
		name: 'Мария Сидорова',
		company: 'Строй-Инвест',
		email: 'm.sidorova@stroy.ru',
		status: 'new',
		lastContact: '5 часов назад',
		avatar: '/avatars/02.png',
	},
	{
		name: 'Алексей Козлов',
		company: 'Дизайн-Бюро',
		email: 'alex@design.io',
		status: 'active',
		lastContact: 'вчера',
		avatar: '/avatars/03.png',
	},
	{
		name: 'Елена Новикова',
		company: 'МаркетПлюс',
		email: 'elena.n@market.com',
		status: 'inactive',
		lastContact: '1 неделя назад',
		avatar: '/avatars/04.png',
	},
];

const recentClient: Client[] = [
	{
		name: 'Иван Петров',
		company: 'ООО "Технологии"',
		email: 'ivan.p@tech.com',
		status: 'active',
		lastContact: '2 дня назад',
		avatar: '/avatars/01.png',
	},
	{
		name: 'Мария Сидорова',
		company: 'Строй-Инвест',
		email: 'm.sidorova@stroy.ru',
		status: 'new',
		lastContact: '5 часов назад',
		avatar: '/avatars/02.png',
	},
	{
		name: 'Алексей Козлов',
		company: 'Дизайн-Бюро',
		email: 'alex@design.io',
		status: 'active',
		lastContact: 'вчера',
		avatar: '/avatars/03.png',
	},
	{
		name: 'Елена Новикова',
		company: 'МаркетПлюс',
		email: 'elena.n@market.com',
		status: 'inactive',
		lastContact: '1 неделя назад',
		avatar: '/avatars/04.png',
	},
];

export const upcomingEvents: Event[] = [
	{ time: '10:00', title: 'Встреча с ООО "Технологии"', description: 'Обсуждение нового проекта' },
	{ time: '14:30', title: 'Звонок клиенту - Строй-Инвест', description: 'Уточнение деталей по сделке' },
	{ time: '16:00', title: 'Отправка предложения', description: 'Подготовить и отправить КП для "Дизайн-Бюро"' },
	{ time: '18:00', title: 'Планерка с командой', description: 'Итоги недели' },
];
