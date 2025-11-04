import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { z } from 'zod';

type ClientFormProps = {
	type: 'create' | 'update';
	data?: {
		name?: string;
		company?: string;
		phone?: string;
		email?: string;
		manager?: string;
		notes?: string;
	};
	onCancel?: () => void;
	onSuccess?: (result?: any) => void;
};

const schema = z.object({
	name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
	company: z.string().min(2, 'Компания обязательна'),
	phone: z
		.string()
		.min(7, 'Телефон обязателен')
		.regex(/^[+0-9\-()\s]+$/, 'Неверный формат телефона'),
	email: z.string().email('Неверный email'),
	manager: z.string().min(2, 'Менеджер обязателен'),
	notes: z.string().optional(),
});

export default function ClientForm({ type, data, onCancel, onSuccess }: ClientFormProps) {
	const [name, setName] = useState<string>(data?.name ?? '');
	const [company, setCompany] = useState<string>(data?.company ?? '');
	const [phone, setPhone] = useState<string>(data?.phone ?? '');
	const [email, setEmail] = useState<string>(data?.email ?? '');
	const [manager, setManager] = useState<string>(data?.manager ?? '');
	const [notes, setNotes] = useState<string>(data?.notes ?? '');
	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});

		const result = schema.safeParse({ name, company, phone, email, manager, notes });
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

		console.log('Client submit', result.data);
		onSuccess?.(result.data);
		setSubmitting(false);
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="flex flex-col gap-4">
				<div>
					<Input
						placeholder="Имя"
						value={name}
						onChange={(e) => setName(e.target.value)}
						aria-invalid={!!errors.name}
					/>
					{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
				</div>
				<div>
					<Input
						placeholder="Компания"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
						aria-invalid={!!errors.company}
					/>
					{errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
				</div>
				<div>
					<Input
						placeholder="Телефон"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						aria-invalid={!!errors.phone}
					/>
					{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
				</div>
				<div>
					<Input
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						aria-invalid={!!errors.email}
					/>
					{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
				</div>
				<div>
					<Input
						placeholder="Менеджер"
						value={manager}
						onChange={(e) => setManager(e.target.value)}
						aria-invalid={!!errors.manager}
					/>
					{errors.manager && <p className="mt-1 text-xs text-red-500">{errors.manager}</p>}
				</div>
			</div>

			<div>
				<textarea
					placeholder="Дополнительная информация"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
					rows={4}
				/>
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
