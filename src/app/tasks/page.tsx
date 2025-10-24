import { mockTasks } from '@/lib/data/tasks';
import TaskTableView from '@/shared/table/TaskTableView';

export default function TasksPage() {
	return <TaskTableView tasks={mockTasks} />;
}
