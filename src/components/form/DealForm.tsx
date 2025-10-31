import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DealStage } from '@/lib/enums/deal';
import { useState } from 'react';
import { z } from 'zod';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (r?: any) => void };

const schema = z.object({
	name: z.string().min(2, 'Название сделки обязательно'),
	company: z.string().min(2, 'Компания обязательна'),
	amount: z
		.union([z.string().trim().optional(), z.number().optional()])
		.transform((v) => (typeof v === 'string' ? (v ? Number(v) : undefined) : v))
		.refine((v) => v === undefined || (!Number.isNaN(v) && v >= 0), 'Сумма должна быть положительной'),
	stage: z.nativeEnum(DealStage),
	responsible: z.string().optional(),
	deadline: z.string().optional(),
});

export default function DealForm({ type, data, onCancel, onSuccess }: FormProps) {
	const [form, setForm] = useState({
		name: data?.name ?? '',
		company: data?.company ?? '',
		amount: data?.amount?.toString?.() ?? '',
		stage: (data?.stage as DealStage) ?? DealStage.New,
		responsible: data?.responsible ?? '',
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

		const parsed = schema.safeParse({
			name: form.name,
			company: form.company,
			amount: form.amount as any,
			stage: form.stage,
			responsible: form.responsible,
			deadline: form.deadline,
		});

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
				<h2 className="text-lg font-semibold">{type === 'create' ? 'Добавить сделку' : 'Редактировать сделку'}</h2>
				<p className="text-sm text-muted-foreground">Заполните данные сделки</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Input placeholder="Название" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} />
					{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
				</div>
				<div>
					<Input
						placeholder="Компания"
						value={form.company}
						onChange={update('company')}
						aria-invalid={!!errors.company}
					/>
					{errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
				</div>
				<div>
					<Input placeholder="Сумма" value={form.amount} onChange={update('amount')} aria-invalid={!!errors.amount} />
					{errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
				</div>
				<div>
					<select
						value={form.stage}
						onChange={update('stage')}
						className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
						aria-invalid={!!errors.stage}
					>
						<option value={DealStage.New}>Новый</option>
						<option value={DealStage.InProgress}>В работе</option>
						<option value={DealStage.Closed}>Закрыт</option>
					</select>
					{errors.stage && <p className="mt-1 text-xs text-red-500">{errors.stage}</p>}
				</div>
				<div>
					<Input placeholder="Ответственный" value={form.responsible} onChange={update('responsible')} />
				</div>
				<div>
					<Input placeholder="Дедлайн" type="date" value={form.deadline} onChange={update('deadline')} />
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
