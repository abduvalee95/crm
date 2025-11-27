'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginData } from '@/lib/interface/user';
import { useAppDispatch } from '@/shared/store/hooks';
import { loginUser } from '@/shared/store/userSlice';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

type LoginFormProps = {
	onCancel?: () => void;
	onSuccess?: (result?: unknown) => void;
};

const schema = z.object({
	email: z.string().email('Неверный email'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

export default function LoginForm({ onCancel, onSuccess }: LoginFormProps) {
	const dispatch = useAppDispatch();
	const [form, setForm] = useState<LoginData>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
	const [submitting, setSubmitting] = useState(false);
	const [apiError, setApiError] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);

	const update = (key: keyof LoginData) => (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm((prev) => ({ ...prev, [key]: e.target.value }));

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});
		setApiError('');

		const result = schema.safeParse(form);
		if (!result.success) {
			const fieldErrors: Partial<Record<keyof LoginData, string>> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof LoginData;
				if (!fieldErrors[field]) fieldErrors[field] = issue.message;
			}
			setErrors(fieldErrors);
			setSubmitting(false);
			return;
		}

		try {
			const result = await dispatch(loginUser(form));

			if (loginUser.fulfilled.match(result)) {
				onSuccess?.(result.payload);
			} else {
				// Ошибка из Redux
				const errorMessage = (result.payload as string) || 'Ошибка входа. Проверьте email и пароль.';
				setApiError(errorMessage);
			}
		} catch (error) {
			console.error('Ошибка входа:', error);
			setApiError('Ошибка входа. Проверьте email и пароль.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{apiError && (
				<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
					{apiError}
				</div>
			)}

			<div className="space-y-2">
				<label htmlFor="email" className="text-sm font-medium">
					Email
				</label>
				<div className="relative">
					<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						id="email"
						type="email"
						placeholder="example@mail.com"
						value={form.email}
						onChange={update('email')}
						className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
						aria-invalid={!!errors.email}
						disabled={submitting}
					/>
				</div>
				{errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
			</div>

			<div className="space-y-2">
				<label htmlFor="password" className="text-sm font-medium">
					Пароль
				</label>
				<div className="relative">
					<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Введите пароль"
						value={form.password}
						onChange={update('password')}
						className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
						aria-invalid={!!errors.password}
						disabled={submitting}
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						tabIndex={-1}
					>
						{showPassword ? (
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							</svg>
						) : (
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						)}
					</button>
				</div>
				{errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
			</div>

			<div className="flex gap-3 pt-2">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={submitting}>
						Отмена
					</Button>
				)}
				<Button type="submit" className="flex-1" disabled={submitting}>
					{submitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Вход...
						</>
					) : (
						'Войти'
					)}
				</Button>
			</div>
		</form>
	);
}
