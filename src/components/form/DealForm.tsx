'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DealStage } from '@/lib/enums/deal';
import { CreateDealData, UpdateDealData } from '@/lib/interface/deal';
import { fetchClients } from '@/shared/store/clientSlice';
import { createDeal, deleteDeal, updateDeal } from '@/shared/store/dealSlice';
import { fetchEmployees } from '@/shared/store/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (r?: any) => void };

const schema = z.object({
	title: z.string().min(2, 'Название сделки обязательно'), // Backend bilan moslash (name o'rniga)
	clientId: z.string().uuid('Неверный ID клиента'), // Backend bilan moslash (company o'rniga)
	amount: z
		.union([z.string().trim().optional(), z.number().optional()])
		.transform((v) => (typeof v === 'string' ? (v ? Number(v) : undefined) : v))
		.refine((v) => v === undefined || (!Number.isNaN(v) && v >= 0), 'Сумма должна быть положительной'),
	stage: z.nativeEnum(DealStage),
	assignedToId: z.string().uuid().optional(), // Backend bilan moslash (responsible o'rniga)
	// Frontend uchun qo'shimcha maydonlar (optional)
	company: z.string().optional(), // Client dan olinadi
	responsible: z.string().optional(), // User dan olinadi
	deadline: z.string().optional(), // Frontend uchun
});

export default function DealForm({ type, data, onCancel, onSuccess }: FormProps) {
	const dispatch = useAppDispatch();
	const clients = useAppSelector((state) => state.client.clients);
	const clientsLoading = useAppSelector((state) => state.client.isLoading);
	const clientsError = useAppSelector((state) => state.client.error);
	const dealLoading = useAppSelector((state) => state.deal.isLoading);
	const dealError = useAppSelector((state) => state.deal.error);
	const employees = useAppSelector((state) => state.employee.employees);
	const employeesLoading = useAppSelector((state) => state.employee.isLoading);
	const employeesError = useAppSelector((state) => state.employee.error);

	// Debug: Check if we have the necessary data for delete button
	const canDelete = type === 'update' && (data?.id || data?._id);

	const [form, setForm] = useState({
		title: data?.title ?? data?.name ?? '', // Backend bilan moslash
		clientId: data?.clientId ?? '', // Backend bilan moslash
		amount: data?.amount?.toString?.() ?? '',
		stage: (data?.stage as DealStage) ?? DealStage.New,
		assignedToId: data?.responsible ?? data?.assignedToId ?? '', // Backend bilan moslash
		// Frontend uchun qo'shimcha maydonlar
		company: data?.company ?? '',
		responsibleName: data?.responsibleName ?? '',
		deadline: data?.deadline ?? '',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema> | '_general', string>>>({});
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	useEffect(() => {
		if (employees.length === 0 && !employeesLoading) {
			dispatch(fetchEmployees());
		}
	}, [dispatch, employees.length, employeesLoading]);

	// Show deal error if exists
	useEffect(() => {
		if (dealError) {
			setErrors((prev) => ({ ...prev, _general: dealError }));
		}
	}, [dealError]);

	useEffect(() => {
		if (clients.length === 0 && !clientsLoading) {
			dispatch(fetchClients());
		}
	}, [dispatch, clients.length, clientsLoading]);

	const selectedClient = useMemo(() => clients.find((client) => client.id === form.clientId), [clients, form.clientId]);

	const selectedEmployee = useMemo(
		() => employees.find((employee) => employee.id === form.assignedToId),
		[employees, form.assignedToId],
	);

	const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setForm((prev) => ({ ...prev, [key]: e.target.value }));

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});

		const parsed = schema.safeParse({
			title: form.title, // Backend bilan moslash
			clientId: form.clientId, // Backend bilan moslash
			amount: form.amount as any,
			stage: form.stage,
			assignedToId: form.assignedToId || undefined, // Backend bilan moslash
			// Frontend uchun qo'shimcha maydonlar
			company: form.company,
			responsible: form.responsibleName,
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

		try {
			if (type === 'create') {
				const payload: CreateDealData = {
					title: parsed.data.title.trim(),
					clientId: parsed.data.clientId.trim(),
					amount: parsed.data.amount,
					stage: parsed.data.stage,
					responsible: parsed.data.assignedToId?.trim() || undefined,
				};

				const result = await dispatch(createDeal(payload)).unwrap();
				onSuccess?.(result);
			} else if (type === 'update' && data?.id) {
				const payload: UpdateDealData = {
					title: parsed.data.title.trim(),
					clientId: parsed.data.clientId.trim(),
					amount: parsed.data.amount,
					stage: parsed.data.stage,
					responsible: parsed.data.assignedToId?.trim() || undefined,
				};

				const result = await dispatch(updateDeal({ id: data.id, data: payload })).unwrap();
				onSuccess?.(result);
			}
		} catch (error: any) {
			const message =
				error?.message ||
				error?.toString() ||
				(type === 'create' ? 'Ошибка создания сделки' : 'Ошибка обновления сделки');
			setErrors((prev) => ({ ...prev, _general: message }));
		} finally {
			setSubmitting(false);
		}
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

	const handleDelete = async () => {
		const dealId = data?.id || data?._id;
		if (!dealId || type !== 'update') {
			console.error('Cannot delete: missing id or wrong type', { dealId, type, data });
			return;
		}

		setDeleting(true);
		setErrors({});

		try {
			await dispatch(deleteDeal(dealId)).unwrap();
			onSuccess?.();
			onCancel?.();
		} catch (error: any) {
			const message = error?.message || error?.toString() || 'Ошибка удаления сделки';
			setErrors((prev) => ({ ...prev, _general: message }));
		} finally {
			setDeleting(false);
			setShowDeleteConfirm(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{errors._general && (
				<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
					{errors._general}
				</div>
			)}

			<div className="flex flex-col gap-6">
				<div>
					<Input
						placeholder="Название сделки"
						value={form.title}
						onChange={update('title')}
						aria-invalid={!!errors.title}
						disabled={submitting}
					/>
					{errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium block">Клиент *</label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
								disabled={submitting || clientsLoading}
							>
								{clientsLoading
									? 'Загрузка клиентов...'
									: selectedClient
									? `${selectedClient.name}${selectedClient.company ? ` • ${selectedClient.company}` : ''}`
									: 'Выберите клиента'}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="max-h-64 overflow-y-auto w-full bg-background border-border text-card-foreground">
							{clients.length === 0 ? (
								<div className="px-3 py-2 text-sm text-muted-foreground">Клиенты не найдены</div>
							) : (
								clients.map((client) => (
									<DropdownMenuItem
										key={client.id}
										onClick={() => setForm((prev) => ({ ...prev, clientId: client.id }))}
										className="flex items-center justify-between gap-2"
									>
										<span className="flex flex-col">
											<span className="font-medium">{client.name}</span>
											<span className="text-xs text-muted-foreground">
												{client.company || client.email || client.phone || client.id}
											</span>
										</span>
										{form.clientId === client.id && <Check className="w-4 h-4 text-primary" />}
									</DropdownMenuItem>
								))
							)}
						</DropdownMenuContent>
					</DropdownMenu>
					{errors.clientId && <p className="mt-1 text-xs text-red-500">{errors.clientId}</p>}
					{clientsError && <p className="text-xs text-red-400">{clientsError}</p>}
				</div>
				<div>
					<Input
						placeholder="Компания (опционально)"
						value={form.company}
						onChange={update('company')}
						disabled={submitting}
					/>
				</div>
				<div>
					<Input
						placeholder="Сумма"
						value={form.amount}
						onChange={update('amount')}
						aria-invalid={!!errors.amount}
						disabled={submitting}
					/>
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
								disabled={submitting}
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
				<div className="space-y-2">
					<label className="text-sm font-medium block">Ответственный</label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-between bg-background border-border text-card-foreground hover:bg-accent"
								type="button"
								disabled={submitting || employeesLoading}
							>
								{employeesLoading
									? 'Загрузка сотрудников...'
									: selectedEmployee
									? `${selectedEmployee.fullName}${selectedEmployee.email ? ` • ${selectedEmployee.email}` : ''}`
									: 'Выберите ответственного'}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="max-h-64 overflow-y-auto w-full bg-background border-border text-card-foreground">
							{employees.length === 0 ? (
								<div className="px-3 py-2 text-sm text-muted-foreground">Сотрудники не найдены</div>
							) : (
								<>
									<DropdownMenuItem
										onClick={() => setForm((prev) => ({ ...prev, assignedToId: '' }))}
										className="flex items-center justify-between gap-2"
									>
										<span className="text-muted-foreground">Не назначен</span>
										{!form.assignedToId && <Check className="w-4 h-4 text-primary" />}
									</DropdownMenuItem>
									{employees.map((employee) => (
										<DropdownMenuItem
											key={employee.id}
											onClick={() => setForm((prev) => ({ ...prev, assignedToId: employee.id }))}
											className="flex items-center justify-between gap-2"
										>
											<span className="flex flex-col">
												<span className="font-medium">{employee.fullName}</span>
												<span className="text-xs text-muted-foreground">
													{employee.email || employee.phone || employee.id}
												</span>
											</span>
											{form.assignedToId === employee.id && <Check className="w-4 h-4 text-primary" />}
										</DropdownMenuItem>
									))}
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
					{errors.assignedToId && <p className="mt-1 text-xs text-red-500">{errors.assignedToId}</p>}
					{employeesError && <p className="text-xs text-red-400">{employeesError}</p>}
				</div>
				<div>
					<Input
						placeholder="Дедлайн"
						type="date"
						value={form.deadline}
						onChange={update('deadline')}
						disabled={submitting}
					/>
				</div>
			</div>

			<div className="flex justify-between items-center pt-2">
				{canDelete && (
					<div>
						{!showDeleteConfirm ? (
							<Button
								type="button"
								variant="destructive"
								onClick={() => setShowDeleteConfirm(true)}
								disabled={submitting || deleting || dealLoading}
							>
								Удалить
							</Button>
						) : (
							<div className="flex gap-2 items-center">
								<span className="text-sm text-muted-foreground">Удалить?</span>
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={handleDelete}
									disabled={submitting || deleting || dealLoading}
								>
									{deleting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Удаление...
										</>
									) : (
										'Да'
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => setShowDeleteConfirm(false)}
									disabled={submitting || deleting || dealLoading}
								>
									Нет
								</Button>
							</div>
						)}
					</div>
				)}
				<div className="flex justify-end gap-3 ml-auto">
					<Button
						type="button"
						variant="outline"
						onClick={() => onCancel?.()}
						disabled={submitting || deleting || dealLoading}
					>
						Отмена
					</Button>
					<Button type="submit" disabled={submitting || deleting || dealLoading}>
						{submitting || dealLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								{type === 'create' ? 'Создание...' : 'Сохранение...'}
							</>
						) : type === 'create' ? (
							'Добавить'
						) : (
							'Сохранить'
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}
