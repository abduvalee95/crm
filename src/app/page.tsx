import Menu from '@/widgets/sidebar/ui/Menu';
import HomePage from './home/page';
import DashboardPage from '@/widgets/dashboard/ui/page'

export default function Home() {
	return (
		<div className="w-full h-screen flex text-white">
			{/* Menu */}
			<div className="flex flex-col w-70  shadow-lg border-l border-gray-800">
				<Menu />
			</div>
			{/* dashboard */}
			<div className="flex-1 bg-black">
				<HomePage />
			</div>
		</div>
	);
}
