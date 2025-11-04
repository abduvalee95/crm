import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableCell } from '@/components/ui/table';
import { TaskStatus } from '@/lib/enums/status';
import { TaskViewProps } from '@/lib/interface/task';
import React from 'react';

const statusLabel = (status: TaskStatus) => {
	switch (status) {
		case TaskStatus.Todo:
			return (
				<Badge variant="default" className="bg-blue-600/20 text-blue-400 border-none p-2">
					Новый
				</Badge>
			);
		case TaskStatus.InProgress:
			return (
				<Badge variant="default" className="bg-green-600/20 text-green-400 border-none p-2">
					В работе
				</Badge>
			);
		case TaskStatus.Blocked:
			return (
				<Badge variant="destructive" className="bg-red-600/20 text-red-400 border-none p-2">
					Заблокировано
				</Badge>
			);
		case TaskStatus.Done:
			return (
				<Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none p-2">
					Готово
				</Badge>
			);
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};

const TaskTableView: React.FC<TaskViewProps> = ({ tasks }) => {
	return (
		<Card className="bg-background border-border text-card-foreground">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>
					Список задач
					{tasks.length === tasks.length && `(${tasks.length})`}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{tasks.map((task) => (
					<div
						key={task.id}
						className="flex gap-4 justify-between border border-border rounded-lg items-center hover:bg-accent transition-colors p-2 cursor-pointer "
					>
						<div className="flex justify-between item-center p-3 hover:bg-gray-900/50 transition-colors flex-col">
							<div>
								<div className="flex items-center justify-between">
									<span className="font-medium">{task.title}</span>
								</div>
								{task.description && <span className="text-muted-foreground text-sm">{task.description}</span>}
							</div>
							<div className="flex items-center gap-3 text-muted-foreground text-sm mt-2">
								<span>{task.assignee ?? '—'}</span>
								<span className="uppercase">{task.priority ?? 'medium'}</span>
								<span>{task.deadline ?? ''}</span>
							</div>
						</div>
						<TableCell className="text-right">
							<span>{statusLabel(task.status)} </span>
						</TableCell>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default TaskTableView;
