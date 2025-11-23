import { TaskStatus } from '../enums/status'
import type { Task } from '../interface/task'

export const mockTasks: Task[] = [
	{
		id: '1',
		title: 'Подготовить КП для ООО "Технологии"',
		description: 'Собрать коммерческое предложение и отправить клиенту',
		assignee: 'Иван Петров',
		status: TaskStatus.IN_PROGRESS,
		priority: 'high',
		deadline: '2025-01-05',
		createdAt: '2025-01-01',
	},
	{
		id: '2',
		title: 'Созвон со Строй-Инвест',
		assignee: 'Мария Сидорова',
		status: TaskStatus.PENDING,
		priority: 'medium',
		deadline: '2025-01-04',
	},
	{
		id: '3',
		title: 'Уточнить условия договора',
		assignee: 'Елена Новикова',
		status: TaskStatus.CANCELLED,
		priority: 'low',
		deadline: '2025-01-10',
	},
	{
		id: '4',
		title: 'Отправить счет на оплату',
		assignee: 'Алексей Козлов',
		status: TaskStatus.COMPLETED,
		priority: 'high',
		deadline: '2024-12-28',
		updatedAt: '2024-12-28',
	},
];
