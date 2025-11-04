import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

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
			<div className="flex flex-col gap-4">
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
							>
								{form.role}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full bg-background border-border text-card-foreground">
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: 'admin' }))}>Админ</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: 'manager' }))}>
								Менеджер
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: 'analyst' }))}>
								Аналитик
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: 'support' }))}>
								Поддержка
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div>
					<DropdownMenu>
						{' '}
						<DropdownMenuTrigger>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
							>
								{form.status}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>{' '}
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full bg-background border-border text-card-foreground">
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, status: 'active' }))}>
								Активен
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, status: 'inactive' }))}>
								Неактивен
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, status: 'on_leave' }))}>
								В отпуске
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
