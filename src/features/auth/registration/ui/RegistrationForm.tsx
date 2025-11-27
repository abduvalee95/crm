'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { RegistrationData } from '@/lib/api/client';
import { Role } from '@/lib/enums/status';
import { userService, type ApiError } from '@/lib/services/userService';
import { useAppDispatch } from '@/shared/store/hooks';
import { fetchCurrentUser } from '@/shared/store/userSlice';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

type RegistrationFormProps = {
	onCancel?: () => void;
	onSuccess?: (result?: unknown) => void;
};

const schema = z
	.object({
		fullName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
		email: z.string().email('Неверный email'),
		password: z
			.union([z.string(), z.number()])
			.refine((v) => (typeof v === 'string' ? v.length >= 6 : v >= 6), 'Пароль должен содержать минимум 6 символов'),
		confirmPassword: z.string().or(z.number()),
		role: z.enum(['admin', 'manager', 'analyst', 'support']).optional(),
		position: z.string().optional(),
		phone: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export default function RegistrationForm({ onCancel, onSuccess }: RegistrationFormProps) {
	const [form, setForm] = useState<RegistrationData & { confirmPassword: string }>({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: Role.MANAGER,
		position: '',
		phone: '',
	});
	const dispatch = useAppDispatch();
	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
	const [submitting, setSubmitting] = useState(false);
	const [apiError, setApiError] = useState<string>('');

	const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm((prev) => ({ ...prev, [key]: e.target.value }));

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});
		setApiError('');

		const result = schema.safeParse(form);
		if (!result.success) {
			const fieldErrors: Partial<Record<keyof z.infer<typeof schema>, string>> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof z.infer<typeof schema>;
				if (!fieldErrors[field]) fieldErrors[field] = issue.message;
			}
			setErrors(fieldErrors);
			setSubmitting(false);
			return;
		}

		try {
			const { confirmPassword, ...registrationData } = form;

			// Убираем пустые опциональные поля перед отправкой
			const cleanData: RegistrationData = {
				fullName: registrationData.fullName.trim(),
				email: registrationData.email.trim().toLowerCase(),
				password: registrationData.password,
				role: registrationData.role,
			};

			// Добавляем опциональные поля только если они заполнены
			if (registrationData.phone && registrationData.phone.trim()) {
				cleanData.phone = registrationData.phone.trim();
			}
			if (registrationData.position && registrationData.position.trim()) {
				cleanData.position = registrationData.position.trim();
			}

			const response = await userService.register(cleanData);

			// Check if response has token (handle both RegistrationResponse and SignupResponse formats)
			if (response.token) {
				localStorage.setItem('token', response.token);
			}

			dispatch(fetchCurrentUser());

			onSuccess?.(response);
		} catch (error) {
			console.error('Ошибка регистрации:', error);

			// Better error handling
			if (error && typeof error === 'object' && 'status' in error) {
				const apiErr = error as ApiError;

				// Handle field-specific errors
				if (apiErr.errors) {
					const fieldErrors: Partial<Record<keyof z.infer<typeof schema>, string>> = {};
					for (const [field, messages] of Object.entries(apiErr.errors)) {
						// Map API field names to form field names if needed
						const formField = field as keyof z.infer<typeof schema>;
						if (messages && messages.length > 0) {
							fieldErrors[formField] = messages[0];
						}
					}
					setErrors(fieldErrors);
				} else {
					// General error message
					setApiError(apiErr.message || 'Ошибка при регистрации. Проверьте подключение к серверу.');
				}
			} else {
				// Network or unexpected errors
				setApiError('Ошибка при регистрации. Проверьте подключение к серверу.');
			}
		} finally {
			setSubmitting(false);
		}
	};

	const roleLabels: Record<string, string> = {
		[Role.ADMIN]: 'Администратор',
		[Role.MANAGER]: 'Менеджер',
		[Role.ANALYST]: 'Аналитик',
		[Role.SUPPORT]: 'Поддержка',
		[Role.USER]: 'Пользователь',
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="flex flex-col gap-4">
				<div>
					<Input
						placeholder="Имя"
						value={form.fullName}
						onChange={update('fullName')}
						aria-invalid={!!errors.fullName}
						type="text"
					/>
					{errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
				</div>

				<div>
					<Input
						placeholder="Email"
						value={form.email}
						onChange={update('email')}
						aria-invalid={!!errors.email}
						type="email"
					/>
					{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
				</div>

				<div>
					<Input
						placeholder="Пароль"
						value={form.password}
						onChange={update('password')}
						aria-invalid={!!errors.password}
						type="password"
					/>
					{errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
				</div>

				<div>
					<Input
						placeholder="Подтвердите пароль"
						value={form.confirmPassword}
						onChange={update('confirmPassword')}
						aria-invalid={!!errors.confirmPassword}
						type="password"
					/>
					{errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
				</div>

				<div>
					<Input
						placeholder="Телефон (необязательно)"
						value={form.phone}
						onChange={update('phone')}
						aria-invalid={!!errors.phone}
						type="tel"
					/>
					{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
				</div>

				<div>
					<Input
						placeholder="Должность (необязательно)"
						value={form.position}
						onChange={update('position')}
						aria-invalid={!!errors.position}
						type="text"
					/>
					{errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
				</div>

				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
							>
								{form.role ? roleLabels[form.role] : 'Выберите роль'}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full bg-background border-border text-card-foreground">
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: Role.ADMIN }))}>
								Администратор
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: Role.MANAGER }))}>
								Менеджер
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: Role.ANALYST }))}>
								Аналитик
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, role: Role.SUPPORT }))}>
								Поддержка
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
				</div>
			</div>

			{apiError && <p className="text-sm text-red-500">{apiError}</p>}

			<div className="flex justify-end gap-3 pt-2">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel}>
						Отмена
					</Button>
				)}
				<Button type="submit" disabled={submitting}>
					{submitting ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>
			</div>
		</form>
	);
}
