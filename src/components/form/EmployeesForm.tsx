import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { z } from 'zod';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (r?: any) => void };

const schema = z.object({
	name: z.string().min(2, 'Имя обязательно'),
	position: z.string().min(2, 'Должность обязательна'),
	email: z.string().email('Неверный email'),
	phone: z.string().min(7, 'Телефон обязателен'),
	department: z.string().min(2, 'Отдел обязателен'),
	role: z.enum(['admin', 'manager', 'analyst', 'support']),
	status: z.enum(['active', 'inactive', 'on_leave']).optional(),
});

export default function EmployeesForm({ type, data, onCancel, onSuccess }: FormProps) {
	const [form, setForm] = useState({
		name: data?.name ?? '',
		position: data?.position ?? '',
		email: data?.email ?? '',
		phone: data?.phone ?? '',
		department: data?.department ?? '',
		role: (data?.role as 'admin' | 'manager' | 'analyst' | 'support') ?? 'manager',
		status: (data?.status as 'active' | 'inactive' | 'on_leave') ?? 'active',
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
			<div>
				<h2 className="text-lg font-semibold">
					{type === 'create' ? 'Добавить сотрудника' : 'Редактировать сотрудника'}
				</h2>
				<p className="text-sm text-muted-foreground">Заполните данные сотрудника</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Input placeholder="Имя" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} />
					{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
				</div>
				<div>
					<Input
						placeholder="Должность"
						value={form.position}
						onChange={update('position')}
						aria-invalid={!!errors.position}
					/>
					{errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
				</div>
				<div>
					<Input placeholder="Email" value={form.email} onChange={update('email')} aria-invalid={!!errors.email} />
					{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
				</div>
				<div>
					<Input placeholder="Телефон" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} />
					{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
				</div>
				<div>
					<Input
						placeholder="Отдел"
						value={form.department}
						onChange={update('department')}
						aria-invalid={!!errors.department}
					/>
					{errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
				</div>
				<div>
					<select
						value={form.role}
						onChange={update('role')}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
					>
						<option value="admin">Админ</option>
						<option value="manager">Менеджер</option>
						<option value="analyst">Аналитик</option>
						<option value="support">Поддержка</option>
					</select>
				</div>
				<div>
					<select
						value={form.status}
						onChange={update('status')}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
					>
						<option value="active">Активен</option>
						<option value="inactive">Неактивен</option>
						<option value="on_leave">В отпуске</option>
					</select>
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
