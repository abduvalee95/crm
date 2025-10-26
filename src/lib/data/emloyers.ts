export interface Employee {
	id: string;
	name: string;
	position: string;
	email: string;
	phone: string;
	status: 'active' | 'inactive' | 'on_leave';
	lastActivity: string;
	deals?: number;
	revenue?: number;
	department: string;
	avatar?: string;
	hireDate: string;
	performance: 'excellent' | 'good' | 'average' | 'needs_improvement';
	role: 'admin' | 'manager' | 'analyst' | 'support';
}

export const employeesData: Employee[] = [
	{
		id: '1',
		name: 'Юсуф Администратор',
		position: 'Администратор',
		email: 'yusuf@crm.ru',
		phone: '+7 (999) 100-10-01',
		status: 'active',
		lastActivity: '2024-10-04T14:30:00',
		department: 'IT',
		hireDate: '2023-01-15',
		performance: 'excellent',
		role: 'admin',
	},
	{
		id: '2',
		name: 'Анна Петрова',
		position: 'Менеджер по продажам',
		email: 'anna@crm.ru',
		phone: '+7 (999) 200-20-02',
		status: 'active',
		lastActivity: '2024-10-04T13:45:00',
		deals: 22,
		revenue: 980000,
		department: 'Продажи',
		hireDate: '2023-03-20',
		performance: 'excellent',
		role: 'manager',
	},
	{
		id: '3',
		name: 'Петр Сидоров',
		position: 'Старший менеджер',
		email: 'petr@crm.ru',
		phone: '+7 (999) 300-30-03',
		status: 'active',
		lastActivity: '2024-10-04T12:20:00',
		deals: 19,
		revenue: 1200000,
		department: 'Продажи',
		hireDate: '2022-11-10',
		performance: 'excellent',
		role: 'manager',
	},
	{
		id: '4',
		name: 'Мария Козлова',
		position: 'Аналитик данных',
		email: 'maria@crm.ru',
		phone: '+7 (999) 400-40-04',
		status: 'active',
		lastActivity: '2024-10-04T11:15:00',
		department: 'Аналитика',
		hireDate: '2023-06-01',
		performance: 'good',
		role: 'analyst',
	},
	{
		id: '5',
		name: 'Игорь Волков',
		position: 'Специалист поддержки',
		email: 'igor@crm.ru',
		phone: '+7 (999) 500-50-05',
		status: 'inactive',
		lastActivity: '2024-09-15T09:00:00',
		department: 'Поддержка',
		hireDate: '2023-02-14',
		performance: 'average',
		role: 'support',
	},
	{
		id: '6',
		name: 'Елена Смирнова',
		position: 'Менеджер по работе с клиентами',
		email: 'elena@crm.ru',
		phone: '+7 (999) 600-60-06',
		status: 'active',
		lastActivity: '2024-10-04T15:20:00',
		deals: 15,
		revenue: 750000,
		department: 'Продажи',
		hireDate: '2023-08-01',
		performance: 'good',
		role: 'manager',
	},
	{
		id: '7',
		name: 'Алексей Новиков',
		position: 'Разработчик',
		email: 'alexey@crm.ru',
		phone: '+7 (999) 700-70-07',
		status: 'active',
		lastActivity: '2024-10-04T16:45:00',
		department: 'IT',
		hireDate: '2023-04-10',
		performance: 'excellent',
		role: 'admin',
	},
	{
		id: '8',
		name: 'Ольга Морозова',
		position: 'HR-менеджер',
		email: 'olga@crm.ru',
		phone: '+7 (999) 800-80-08',
		status: 'active',
		lastActivity: '2024-10-04T14:10:00',
		department: 'HR',
		hireDate: '2022-12-01',
		performance: 'good',
		role: 'manager',
	},
	{
		id: '9',
		name: 'Дмитрий Федоров',
		position: 'Финансовый аналитик',
		email: 'dmitry@crm.ru',
		phone: '+7 (999) 900-90-09',
		status: 'active',
		lastActivity: '2024-10-04T13:30:00',
		department: 'Финансы',
		hireDate: '2023-01-20',
		performance: 'excellent',
		role: 'manager',
	},
	{
		id: '10',
		name: 'Татьяна Лебедева',
		position: 'Маркетинг-менеджер',
		email: 'tatyana@crm.ru',
		phone: '+7 (999) 100-10-10',
		status: 'on_leave',
		lastActivity: '2024-09-28T17:00:00',
		department: 'Маркетинг',
		hireDate: '2023-05-15',
		performance: 'good',
		role: 'manager',
	},
];

// Employee statistics
export const employeeStats = {
	total: employeesData.length,
	active: employeesData.filter((emp) => emp.status === 'active').length,
	inactive: employeesData.filter((emp) => emp.status === 'inactive').length,
	onLeave: employeesData.filter((emp) => emp.status === 'on_leave').length,
	totalRevenue: employeesData.reduce((sum, emp) => sum + (emp.revenue || 0), 0),
	totalDeals: employeesData.reduce((sum, emp) => sum + (emp.deals || 0), 0),
	departments: {
		Продажи: employeesData.filter((emp) => emp.department === 'Продажи').length,
		IT: employeesData.filter((emp) => emp.department === 'IT').length,
		Аналитика: employeesData.filter((emp) => emp.department === 'Аналитика').length,
		Поддержка: employeesData.filter((emp) => emp.department === 'Поддержка').length,
		HR: employeesData.filter((emp) => emp.department === 'HR').length,
		Финансы: employeesData.filter((emp) => emp.department === 'Финансы').length,
		Маркетинг: employeesData.filter((emp) => emp.department === 'Маркетинг').length,
	},
};
