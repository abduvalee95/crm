import { Button } from '@/components/ui/button';
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
}: {
	table: 'client' | 'deal' | 'task' | 'employees';
	type: 'create' | 'update' | 'delete';
	data?: any;
	id?: string | number;
}) => {
	const [open, setOpen] = useState(false);

	const handleCancel = () => setOpen(false);
	const handleSuccess = () => setOpen(false);

	const Form = () => {
		return type === 'delete' && id ? (
			<form action="" className="p-4 flex flex-col gap-4">
				<span className="text-center font-medium">
					All data will be lost. Are you sure you want delete this {table} ?{' '}
				</span>
				<Button variant="destructive" className="w-max self-center">
					Delete
				</Button>
			</form>
		) : type === 'update' || type === 'create' ? (
			forms[table](type, data, handleCancel, handleSuccess)
		) : (
			'Form not found'
		);
	};
	return (
		<>
			<Button size="sm" onClick={() => setOpen(true)}>
				{type === 'create' ? 'Создать' : type === 'update' ? 'Изменить' : 'Удалить'}
			</Button>
			{open && (
				<div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-50">
					<div className="relative w-[90%] md:w-[70%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] rounded-lg bg-card text-card-foreground border border-border p-4">
						<Form />
						<button
							aria-label="Close"
							className="absolute top-2 right-2 px-2 text-muted-foreground hover:text-foreground"
							onClick={() => setOpen(false)}
						>
							×
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default FormModal;
