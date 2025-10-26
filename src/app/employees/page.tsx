import EmployeesList from '@/widgets/employees/ui/EmployeesList';
import EmployeesStat from '@/widgets/employees/ui/EmployeesStat';
import EmployeesSearch from '@/widgets/employees/ui/EmpoyeesSearch';
import Header from '@/widgets/header/ui/Header';

export default function EmployeePage() {
	return (
		<div className="bg-black flex-1 min-h-screen p-4 space-y-6 shadow-lg">
			<Header pageType="employees" />
			<div className='flex flex-col gap-6 p-4'>
				<EmployeesStat />
				{/* <EmployeesSearch /> */}
				<EmployeesList />
			</div>
		</div>
	);
}
