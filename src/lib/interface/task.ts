import { TaskStatus } from '../enums/status'

export interface Task {
	id: number;
	title: string;
	description?: string;
	assignee?: string;
	status: TaskStatus;
	priority?: 'low' | 'medium' | 'high';
	deadline?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface TaskViewProps {
	tasks: Task[];
}
