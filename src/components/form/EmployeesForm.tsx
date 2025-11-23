'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmployeeStatus, Role } from '@/lib/enums/status';
import { createEmployee, updateEmployee } from '@/shared/store/employeeSlice';
import { useAppDispatch } from '@/shared/store/hooks';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (r?: any) => void };

const schema = z.object({
	fullName: z.string().min(2, 'Имя обязательно'),
	position: z.string().min(2, 'Должность обязательна'),
	email: z.string().email('Неверный email'),
	phone: z.string().min(7, 'Телефон обязателен'),
	department: z.string().min(2, 'Отдел обязателен'),
	role: z.enum(['admin', 'manager', 'analyst', 'support', 'user']),
	status: z.enum(['active', 'on_leave']).optional(),
});

const getRoleLabel = (role: string) => {
	const labels: Record<string, string> = {
		admin: 'Админ',
		manager: 'Менеджер',
		analyst: 'Аналитик',
		support: 'Поддержка',
		user: 'Пользователь',
	};
	return labels[role] || role;
};

const getStatusLabel = (status: string) => {
	const labels: Record<string, string> = {
		active: 'Активен',
		on_leave: 'В отпуске',
	};
	return labels[status] || status;
};

export default function EmployeesForm({ type, data, onCancel, onSuccess }: FormProps) {
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		fullName: data?.fullName ?? data?.name ?? '',
		position: data?.position ?? '',
		email: data?.email ?? '',
		phone: data?.phone ?? '',
		department: data?.department ?? '',
		role: (data?.role as 'admin' | 'manager' | 'analyst' | 'support' | 'user') ?? 'user',
		status: (data?.status as 'active' | 'on_leave') ?? 'active',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema> | '_general', string>>>({});
	const [submitting, setSubmitting] = useState(false);

	const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm((prev) => ({ ...prev, [key]: e.target.value }));

	const onSubmit = async (e: React.FormEvent) => {
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

		try {
			const cleanData = {
				fullName: form.fullName.trim(),
				email: form.email.trim().toLowerCase(),
				phone: form.phone.trim() || undefined,
				position: form.position.trim() || undefined,
				department: form.department.trim() || undefined,
				role: form.role as Role,
				status: form.status as EmployeeStatus,
			};

			if (type === 'create') {
				const result = await dispatch(createEmployee(cleanData));
				if (createEmployee.fulfilled.match(result)) {
					onSuccess?.(result.payload);
				} else {
					const errorMessage = (result.payload as string) || 'Ошибка создания сотрудника';
					setErrors({ _general: errorMessage });
				}
			} else {
				const result = await dispatch(updateEmployee({ id: data?.id || data?._id, ...cleanData }));
				if (updateEmployee.fulfilled.match(result)) {
					onSuccess?.(result.payload);
				} else {
					const errorMessage = (result.payload as string) || 'Ошибка обновления сотрудника';
					setErrors({ _general: errorMessage });
				}
			}
		} catch (error: any) {
			console.error('Error saving employee:', error);
			const errorMessage = error?.message || error?.toString() || 'Ошибка сохранения сотрудника';
			setErrors({ _general: errorMessage });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{errors._general && (
				<div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
					{errors._general}
				</div>
			)}
			<div className="flex flex-col gap-4">
				<div>
					<Input
						placeholder="Имя"
						value={form.fullName}
						onChange={update('fullName')}
						aria-invalid={!!errors.fullName}
					/>
					{errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
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
								{getRoleLabel(form.role)}
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
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: 'user' }))}>
								Пользователь
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
							>
								{getStatusLabel(form.status)}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full bg-background border-border text-card-foreground">
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, status: 'active' }))}>
								Активен
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, status: 'on_leave' }))}>
								В отпуске
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex justify-end gap-3 pt-2">
				<Button type="button" variant="outline" onClick={() => onCancel?.()} disabled={submitting}>
					Отмена
				</Button>
				<Button type="submit" disabled={submitting}>
					{submitting
						? type === 'create'
							? 'Добавление...'
							: 'Сохранение...'
						: type === 'create'
						? 'Добавить'
						: 'Сохранить'}
				</Button>
			</div>
		</form>
	);
}
