import { TaskStatus } from '../enums/status'

export interface Task {
	id: string; // UUID
	title: string;
	description?: string;
	status: TaskStatus;
	dueDate?: string; // Backend bilan moslash (deadline o'rniga)
	assignedToId?: string; // Backend bilan moslash (assignee o'rniga)
	clientId?: string; // Backend bilan moslash
	dealId?: string; // Backend bilan moslash
	createdAt?: string;
	updatedAt?: string;
	// Frontend uchun qo'shimcha maydonlar (optional)
	assignee?: string; // User dan olinadi
	priority?: 'low' | 'medium' | 'high'; // Frontend uchun
	deadline?: string; // Frontend uchun (dueDate alias)
}

export interface TaskViewProps {
	tasks: Task[];
}
