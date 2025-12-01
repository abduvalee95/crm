'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ClientStatus } from '@/lib/enums/status';
import { CreateClientData } from '@/lib/interface/client';
import { clientService } from '@/lib/services/clientService';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

type ClientFormProps = {
	type: 'create' | 'update';
	data?: CreateClientData;
	onCancel?: () => void;
	onSuccess?: (result?: any) => void;
};

const schema = z.object({
	name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
	email: z.string().email('Неверный email'),
	phone: z
		.string()
		.regex(/^[+0-9\-()\s]*$/, 'Неверный формат телефона')
		.optional()
		.or(z.literal('')),
	company: z.string().optional().or(z.literal('')),
	notes: z.string().optional(),
	status: z.nativeEnum(ClientStatus).optional(),
});

export default function ClientForm({ type, data, onCancel, onSuccess }: ClientFormProps) {
	const [formData, setFormData] = useState<CreateClientData>({
		name: data?.name || '',
		email: data?.email || '',
		phone: data?.phone || '',
		company: data?.company || '',
		notes: data?.notes || '',
		status: data?.status || ClientStatus.new,
	});

	const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema> | '_general', string>>>({});
	const [submitting, setSubmitting] = useState(false);

	const handleInputChange =
		(field: keyof CreateClientData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));
			if (errors[field as keyof typeof errors]) {
				setErrors((prev) => ({ ...prev, [field]: undefined }));
			}
		};

	const handleStatusChange = (status: ClientStatus) => {
		setFormData((prev) => ({ ...prev, status }));
	};

	const getStatusLabel = (status: ClientStatus): string => {
		switch (status) {
			case ClientStatus.new:
				return 'Новый';
			case ClientStatus.active:
				return 'Активен';
			case ClientStatus.inactive:
				return 'Неактивен';
			default:
				return 'Новый';
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors({});

		// Validation
		const result = schema.safeParse(formData);
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
			// Clean data - remove empty strings
			const cleanData: CreateClientData = {
				name: formData.name.trim(),
				email: formData.email.trim().toLowerCase(),
				phone: formData.phone?.trim() || undefined,
				company: formData.company?.trim() || undefined,
				notes: formData.notes?.trim() || undefined,
				status: formData.status || ClientStatus.new,
			};

			let result;
			if (type === 'create') {
				result = await clientService.createClient(cleanData);
				console.log('Client created successfully:', result);
			} else if (type === 'update' && data?.id) {
				result = await clientService.updateClient(data?.id, cleanData);
				console.log('Client updated successfully:', result);
			} else {
				throw new Error('Invalid form type or missing client email');
			}

			onSuccess?.(result);
		} catch (error: any) {
			console.error(`Error ${type === 'create' ? 'creating' : 'updating'} client:`, error);
			const errorMessage =
				error?.message || error?.toString() || `Ошибка ${type === 'create' ? 'создания' : 'обновления'} клиента`;
			setErrors({ _general: errorMessage } as any);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{errors._general && (
				<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
					{errors._general}
				</div>
			)}

			<div className="flex flex-col gap-4">
				<div>
					<label className="text-sm font-medium mb-1 block">Имя *</label>
					<Input
						placeholder="Имя"
						value={formData.name}
						onChange={handleInputChange('name')}
						aria-invalid={!!errors.name}
						disabled={submitting}
					/>
					{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
				</div>

				<div>
					<label className="text-sm font-medium mb-1 block">Email *</label>
					<Input
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleInputChange('email')}
						aria-invalid={!!errors.email}
						disabled={submitting}
					/>
					{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
				</div>

				<div>
					<label className="text-sm font-medium mb-1 block">Телефон</label>
					<Input
						placeholder="Телефон"
						value={formData.phone || ''}
						onChange={handleInputChange('phone')}
						aria-invalid={!!errors.phone}
						disabled={submitting}
					/>
					{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
				</div>

				<div>
					<label className="text-sm font-medium mb-1 block">Компания</label>
					<Input
						placeholder="Компания"
						value={formData.company || ''}
						onChange={handleInputChange('company')}
						aria-invalid={!!errors.company}
						disabled={submitting}
					/>
					{errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
				</div>

				<div>
					<label className="text-sm font-medium mb-1 block">Статус</label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full bg-black justify-between h-9 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm hover:bg-accent"
								disabled={submitting}
							>
								<span className="truncate">{getStatusLabel(formData.status || ClientStatus.new)}</span>
								<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] bg-black">
							<DropdownMenuItem onClick={() => handleStatusChange(ClientStatus.new)} className="cursor-pointer">
								{formData.status === ClientStatus.new && <Check className="mr-2 h-4 w-4" />}
								<span className={formData.status === ClientStatus.new ? '' : 'ml-6'}>Новый</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusChange(ClientStatus.active)} className="cursor-pointer">
								{formData.status === ClientStatus.active && <Check className="mr-2 h-4 w-4" />}
								<span className={formData.status === ClientStatus.active ? '' : 'ml-6'}>Активен</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusChange(ClientStatus.inactive)} className="cursor-pointer">
								{formData.status === ClientStatus.inactive && <Check className="mr-2 h-4 w-4" />}
								<span className={formData.status === ClientStatus.inactive ? '' : 'ml-6'}>Неактивен</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div>
				<label className="text-sm font-medium mb-1 block">Дополнительная информация</label>
				<textarea
					placeholder="Дополнительная информация"
					value={formData.notes || ''}
					onChange={handleInputChange('notes')}
					className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
					rows={4}
					disabled={submitting}
				/>
			</div>

			<div className="flex justify-end gap-3 pt-2">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
						Отмена
					</Button>
				)}
				<Button type="submit" disabled={submitting}>
					{submitting ? (
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
		</form>
	);
}
