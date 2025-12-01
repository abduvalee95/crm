'use client';

import { Button } from '@/components/ui/button';
import { deleteClient } from '@/shared/store/clientSlice';
import { deleteDeal } from '@/shared/store/dealSlice';
import { deleteEmployee } from '@/shared/store/employeeSlice';
import { useAppDispatch } from '@/shared/store/hooks';
import { Loader2, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

type FormProps = { type: 'create' | 'update'; data?: any; onCancel?: () => void; onSuccess?: (result?: any) => void };

const ClientForm = dynamic<FormProps>(() => import('@/components/form/ClientForm'));
const DealForm = dynamic<FormProps>(() => import('@/components/form/DealForm'));
const TaskForm = dynamic<FormProps>(() => import('@/components/form/TaskForm'));
const EmployeesForm = dynamic<FormProps>(() => import('@/components/form/EmployeesForm'));

const forms: {
	[key: string]: (
		type: 'create' | 'update',
		data: any,
		onCancel: () => void,
		onSuccess: (r?: any) => void,
	) => React.ReactNode;
} = {
	client: (type, data, onCancel, onSuccess) => (
		<ClientForm type={type} data={data} onCancel={onCancel} onSuccess={onSuccess} />
	),
	deal: (type, data, onCancel, onSuccess) => (
		<DealForm type={type} data={data} onCancel={onCancel} onSuccess={onSuccess} />
	),
	task: (type, data, onCancel, onSuccess) => (
		<TaskForm type={type} data={data} onCancel={onCancel} onSuccess={onSuccess} />
	),
	employees: (type, data, onCancel, onSuccess) => (
		<EmployeesForm type={type} data={data} onCancel={onCancel} onSuccess={onSuccess} />
	),
};

const FormModal = ({
	table,
	type,
	data,
	id,
	open: controlledOpen,
	onOpenChange,
}: {
	table: 'client' | 'deal' | 'task' | 'employees';
	type: 'create' | 'update' | 'delete';
	data?: any;
	id?: string | number;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const dispatch = useAppDispatch();

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setOpen = (value: boolean) => {
		if (controlledOpen === undefined) {
			setInternalOpen(value);
		}
		onOpenChange?.(value);
	};

	const handleCancel = () => setOpen(false);
	const handleSuccess = () => setOpen(false);

	const handleDelete = async () => {
		if (!id || typeof id !== 'string') return;
		setDeleting(true);
		try {
			if (table === 'deal') {
				await dispatch(deleteDeal(id)).unwrap();
			} else if (table === 'client') {
				await dispatch(deleteClient(id)).unwrap();
			} else if (table === 'employees') {
				// await dispatch(deleteEmployee(id)).unwrap(); // Employee slice da deleteEmployee thunk bo'lishi kerak
			}
			// Add other tables here if needed
			handleSuccess();
		} catch (error: any) {
			console.error('Delete error:', error);
			// Error is handled by Redux state
		} finally {
			setDeleting(false);
		}
	};

	const getModalTitle = () => {
		if (type === 'delete') return 'Удаление';
		if (type === 'create') {
			const titles = {
				client: 'Создать клиента',
				deal: 'Создать сделку',
				task: 'Создать задачу',
				employees: 'Добавить сотрудника',
			};
			return titles[table] || 'Создать';
		}
		if (type === 'update') {
			const titles = {
				client: 'Редактировать клиента',
				deal: 'Редактировать сделку',
				task: 'Редактировать задачу',
				employees: 'Редактировать сотрудника',
			};
			return titles[table] || 'Изменить';
		}
		return 'Форма';
	};

	const Form = () => {
		return type === 'delete' && id ? (
			<div className="flex flex-col gap-6">
				<div className="text-center space-y-2">
					<p className="text-lg font-medium">Вы уверены?</p>
					<p className="text-sm text-muted-foreground">
						Все данные будут потеряны. Вы уверены, что хотите удалить этот {table}?
					</p>
				</div>
				<div className="flex gap-3 justify-end">
					<Button variant="outline" onClick={handleCancel} disabled={deleting}>
						Отмена
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={deleting}>
						{deleting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Удаление...
							</>
						) : (
							'Удалить'
						)}
					</Button>
				</div>
			</div>
		) : type === 'update' || type === 'create' ? (
			forms[table](type, data, handleCancel, handleSuccess)
		) : (
			<div className="text-center py-8 text-muted-foreground">Форма не найдена</div>
		);
	};

	return (
		<>
			{controlledOpen === undefined && (
				<Button size="sm" onClick={() => setOpen(true)}>
					{type === 'create' ? 'Создать' : type === 'update' ? 'Изменить' : 'Удалить'}
				</Button>
			)}
			{open && (
				<div
					className="w-screen h-screen fixed top-0 left-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
					onClick={(e) => {
						if (e.target === e.currentTarget) setOpen(false);
					}}
				>
					<div className="relative w-[90%] md:w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto rounded-lg bg-card text-card-foreground border border-border shadow-2xl">
						{/* Header */}
						<div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
							<h2 className="text-xl font-semibold">{getModalTitle()}</h2>
							<button
								aria-label="Close"
								className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
								onClick={() => setOpen(false)}
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							<Form />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
