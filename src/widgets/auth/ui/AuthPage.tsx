'use client';

import LoginForm from '@/features/auth/login/ui/LoginForm';
import RegistrationForm from '@/features/auth/registration/ui/RegistrationForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AuthPageProps = {
	mode: 'login' | 'register';
};

export default function AuthPage({ mode }: AuthPageProps) {
	const router = useRouter();
	const [success, setSuccess] = useState(false);

	const handleSuccess = async (result?: any) => {
		setSuccess(true);
		setTimeout(() => {
			router.push('/');
		}, 1500);
	};

	const handleCancel = () => {
		router.push('/');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-lg border border-border p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold mb-2">
						{mode === 'login' ? 'Вход в систему' : 'Регистрация'}
					</h1>
					<p className="text-sm text-muted-foreground mb-3">
						{mode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
					</p>
					{mode === 'login' ? (
						<a href="/register" className="text-primary hover:underline focus:outline-none focus:underline text-sm">
							Нет аккаунта? Зарегистрироваться
						</a>
					) : (
						<a href="/login" className="text-primary hover:underline focus:outline-none focus:underline text-sm">
							Уже есть аккаунт? Войти
						</a>
					)}
				</div>

				{success ? (
					<div className="text-center py-8">
						<div className="mb-4">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
								<svg
									className="w-8 h-8 text-green-600 dark:text-green-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h2 className="text-xl font-semibold mb-2">
								{mode === 'login' ? 'Вход выполнен успешно!' : 'Регистрация успешна!'}
							</h2>
							<p className="text-sm text-muted-foreground">Вы будете перенаправлены на главную страницу...</p>
						</div>
					</div>
				) : (
					<>
						{mode === 'login' ? (
							<LoginForm onCancel={handleCancel} onSuccess={handleSuccess} />
						) : (
							<RegistrationForm onCancel={handleCancel} onSuccess={handleSuccess} />
						)}
					</>
				)}
			</div>
		</div>
	);
}

