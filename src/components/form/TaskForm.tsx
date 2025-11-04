import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskStatus } from '@/lib/enums/status';
import { useState } from 'react';
import { z } from 'zod';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (r?: any) => void };

const schema = z.object({
	title: z.string().min(2, 'Название задачи обязательно'),
	description: z.string().optional(),
	assignee: z.string().optional(),
	status: z.nativeEnum(TaskStatus),
	priority: z.enum(['low', 'medium', 'high']).optional(),
	deadline: z.string().optional(),
});

export default function TaskForm({ type, data, onCancel, onSuccess }: FormProps) {
	const [form, setForm] = useState({
		title: data?.title ?? '',
		description: data?.description ?? '',
		assignee: data?.assignee ?? '',
		status: (data?.status as TaskStatus) ?? TaskStatus.Todo,
		priority: (data?.priority as 'low' | 'medium' | 'high') ?? 'medium',
		deadline: data?.deadline ?? '',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
	const [submitting, setSubmitting] = useState(false);

	const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm((prev) => ({ ...prev, [key]: e.target.value }));

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});

		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			const fieldErrors: Partial<Record<keyof z.infer<typeof schema>, string>> = {};
			for (const issue of parsed.error.issues) {
				const field = issue.path[0] as keyof z.infer<typeof schema>;
				if (!fieldErrors[field]) fieldErrors[field] = issue.message;
			}
			setErrors(fieldErrors);
			setSubmitting(false);
			return;
		}

		onSuccess?.(parsed.data);
		setSubmitting(false);
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Input placeholder="Название" value={form.title} onChange={update('title')} aria-invalid={!!errors.title} />
					{errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
				</div>
				<div>
					<Input placeholder="Исполнитель" value={form.assignee} onChange={update('assignee')} />
				</div>
				<div>
					<select
						value={form.status}
						onChange={update('status')}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
						aria-invalid={!!errors.status}
					>
						<option value={TaskStatus.Todo}>To do</option>
						<option value={TaskStatus.InProgress}>In progress</option>
						<option value={TaskStatus.Blocked}>Blocked</option>
						<option value={TaskStatus.Done}>Done</option>
					</select>
					{errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
				</div>
				<div>
					<select
						value={form.priority}
						onChange={update('priority')}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
					>
						<option value="low">Низкий</option>
						<option value="medium">Средний</option>
						<option value="high">Высокий</option>
					</select>
				</div>
				<div>
					<Input placeholder="Дедлайн" type="date" value={form.deadline} onChange={update('deadline')} />
				</div>
				<div className="md:col-span-2">
					<textarea
						placeholder="Описание"
						value={form.description}
						onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
						rows={4}
					/>
				</div>
			</div>

			<div className="flex justify-end gap-3 pt-2">
				<Button type="button" variant="outline" onClick={() => onCancel?.()}>
					Отмена
				</Button>
				<Button type="submit" disabled={submitting}>
					{type === 'create' ? 'Добавить' : 'Сохранить'}
				</Button>
			</div>
		</form>
	);
}
