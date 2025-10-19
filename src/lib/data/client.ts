
import { DealStage } from '../enums/deal';
import { ClientStatus } from '../enums/status'
import { Client, Event } from '../types/types';
export const recentClients: Client[] = [
	{
		id: 1,
		name: 'Иван Петров',
		company: 'ООО "Технологии"',
		email: 'ivan.p@tech.com',
		status: ClientStatus.active,
		number: '+7848350987',
		avatar: '/avatars/01.png',
		stage: DealStage.Closed,
		responsible: 'Иван Петров',
		deadline: '2025-01-01',
		amount: 100000,
		progress: 50,
	},
	{
		id: 2,
		name: 'Мария Сидорова',
		company: 'Строй-Инвест',
		email: 'm.sidorova@stroy.ru',
		status:  ClientStatus.active,
		number: '+704135445',
		avatar: '/avatars/02.png',
		stage: DealStage.New,
		responsible: 'Мария Сидорова',
		deadline: '2025-01-01',
		amount: 100000,
		progress: 50,
	},
	{
		id: 3,
		name: 'Алексей Козлов',
		company: 'Дизайн-Бюро',
		email: 'alex@design.io',
		status:  ClientStatus.inactive,
		number: '+71452455445',
		avatar: '/avatars/03.png',
		stage: DealStage.New,
		responsible: 'Алексей Козлов',
		deadline: '2025-01-01',
		amount: 100000,
		progress: 50,
	},
	{
		id: 4,
		name: 'Елена Новикова',
		company: 'МаркетПлюс',
		email: 'elena.n@market.com',
		status:  ClientStatus.new,
		number: '+7345235445',
		avatar: '/avatars/04.png',
		stage: DealStage.InProgress,
		responsible: 'Елена Новикова',
		deadline: '2025-01-01',
		amount: 100000,
		progress: 50,
	},
];

const recentClient: any[] = [
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
