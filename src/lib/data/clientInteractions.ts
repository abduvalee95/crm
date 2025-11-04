export type InteractionType = 'call' | 'email' | 'meeting' | 'message' | 'document' | 'task';

export interface Interaction {
	id: string;
	type: InteractionType;
	title: string;
	description?: string;
	date: string;
	user?: string;
}

export interface ClientDeal {
	id: number;
	name: string;
	stage: string;
	amount: number;
	createdAt: string;
	responsible?: string;
}

export interface ClientTask {
	id: number;
	title: string;
	status: string;
	deadline: string;
	responsible?: string;
}

export interface ClientDocument {
	id: number;
	name: string;
	type: string;
	size: string;
	uploadedAt: string;
	url: string;
}

// Mock interactions data for clients
export const clientInteractions: Record<number, Interaction[]> = {
	1: [
		{
			id: '1',
			type: 'call',
			title: 'Звонок - обсуждение потребностей',
			date: '10/1/2024',
			user: 'Юсуф',
		},
		{
			id: '2',
			type: 'email',
			title: 'Отправлено коммерческое предложение',
			date: '9/28/2024',
			user: 'Юсуф',
		},
		{
			id: '3',
			type: 'meeting',
			title: 'Встреча в офисе клиента',
			description: 'Обсуждение деталей проекта и требований',
			date: '9/25/2024',
			user: 'Юсуф',
		},
		{
			id: '4',
			type: 'message',
			title: 'Сообщение в чате',
			description: 'Уточнение сроков выполнения',
			date: '9/20/2024',
			user: 'Юсуф',
		},
	],
	2: [
		{
			id: '5',
			type: 'call',
			title: 'Первый контакт',
			date: '9/15/2024',
			user: 'Мария',
		},
		{
			id: '6',
			type: 'email',
			title: 'Ответ на запрос',
			date: '9/10/2024',
			user: 'Мария',
		},
	],
	3: [
		{
			id: '7',
			type: 'meeting',
			title: 'Презентация решения',
			date: '8/20/2024',
			user: 'Алексей',
		},
	],
	4: [
		{
			id: '8',
			type: 'email',
			title: 'Коммерческое предложение',
			date: '9/5/2024',
			user: 'Елена',
		},
		{
			id: '9',
			type: 'call',
			title: 'Обсуждение условий',
			date: '9/3/2024',
			user: 'Елена',
		},
	],
};

// Mock deals for clients
export const clientDeals: Record<number, ClientDeal[]> = {
	1: [
		{
			id: 1,
			name: 'Внедрение CRM системы',
			stage: 'В работе',
			amount: 500000,
			createdAt: '2024-09-01',
			responsible: 'Юсуф',
		},
		{
			id: 2,
			name: 'Обслуживание ПО',
			stage: 'Закрыта',
			amount: 150000,
			createdAt: '2024-08-15',
			responsible: 'Юсуф',
		},
	],
	2: [
		{
			id: 3,
			name: 'Разработка сайта',
			stage: 'Новая',
			amount: 300000,
			createdAt: '2024-09-10',
			responsible: 'Мария',
		},
	],
	3: [
		{
			id: 4,
			name: 'Ребрендинг',
			stage: 'В работе',
			amount: 200000,
			createdAt: '2024-08-25',
			responsible: 'Алексей',
		},
	],
	4: [
		{
			id: 5,
			name: 'Маркетинговая кампания',
			stage: 'Предложение',
			amount: 400000,
			createdAt: '2024-09-05',
			responsible: 'Елена',
		},
	],
};

// Mock tasks for clients
export const clientTasks: Record<number, ClientTask[]> = {
	1: [
		{
			id: 1,
			title: 'Подготовить коммерческое предложение',
			status: 'Выполнено',
			deadline: '2024-09-28',
			responsible: 'Юсуф',
		},
		{
			id: 2,
			title: 'Согласовать техническое задание',
			status: 'В работе',
			deadline: '2024-10-05',
			responsible: 'Юсуф',
		},
		{
			id: 3,
			title: 'Встреча с клиентом',
			status: 'В работе',
			deadline: '2024-10-10',
			responsible: 'Юсуф',
		},
	],
	2: [
		{
			id: 4,
			title: 'Отправить макеты на согласование',
			status: 'В работе',
			deadline: '2024-10-01',
			responsible: 'Мария',
		},
	],
	3: [
		{
			id: 5,
			title: 'Презентация концепции',
			status: 'Выполнено',
			deadline: '2024-08-20',
			responsible: 'Алексей',
		},
	],
	4: [
		{
			id: 6,
			title: 'Подготовить стратегию',
			status: 'В работе',
			deadline: '2024-10-15',
			responsible: 'Елена',
		},
	],
};

// Mock documents for clients
export const clientDocuments: Record<number, ClientDocument[]> = {
	1: [
		{
			id: 1,
			name: 'Коммерческое предложение.pdf',
			type: 'PDF',
			size: '2.4 MB',
			uploadedAt: '2024-09-28',
			url: '#',
		},
		{
			id: 2,
			name: 'Договор.docx',
			type: 'DOCX',
			size: '1.2 MB',
			uploadedAt: '2024-09-25',
			url: '#',
		},
		{
			id: 3,
			name: 'Техническое задание.pdf',
			type: 'PDF',
			size: '3.1 MB',
			uploadedAt: '2024-09-20',
			url: '#',
		},
	],
	2: [
		{
			id: 4,
			name: 'Макеты дизайна.psd',
			type: 'PSD',
			size: '15.8 MB',
			uploadedAt: '2024-09-15',
			url: '#',
		},
	],
	3: [
		{
			id: 5,
			name: 'Презентация.pptx',
			type: 'PPTX',
			size: '8.5 MB',
			uploadedAt: '2024-08-20',
			url: '#',
		},
	],
	4: [
		{
			id: 6,
			name: 'Маркетинговая стратегия.pdf',
			type: 'PDF',
			size: '4.2 MB',
			uploadedAt: '2024-09-05',
			url: '#',
		},
	],
};
