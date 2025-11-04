import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DealStage } from '@/lib/enums/deal';
import { ChevronDown } from 'lucide-react';
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

	const getStageLabel = (stage: DealStage) => {
		switch (stage) {
			case DealStage.New:
				return 'Новый';
			case DealStage.InProgress:
				return 'В работе';
			case DealStage.Closed:
				return 'Закрыт';
			default:
				return stage;
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="flex flex-col gap-6">
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
					<label className="text-sm font-medium mb-2 block">Стадия сделки</label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
							>
								{getStageLabel(form.stage)}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full bg-background border-border text-card-foreground">
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, stage: DealStage.New }))}>
								Новый
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, stage: DealStage.InProgress }))}>
								В работе
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setForm((prev) => ({ ...prev, stage: DealStage.Closed }))}>
								Закрыт
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
