import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

// Шапка сайта
const Header = () => (
	<header className="mt-5 flex justify-between px-6">
		<div>
			<h1 className="text-2xl font-bold text-white">Добро пожаловать, Юсуф 👋</h1>
			<p className="text-gray-400 mt-1">Вот что происходит в вашей CRM сегодня</p>
		</div>
		<div className="flex items-center space-x-4 px-8">
			<Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-gray-700">
				<span className="flex items-center gap-2 border p-2 rounded-lg  bg-card border-gray-700">
					<Bell /> Уведомления
				</span>
			</Button>
		</div>
	</header>
);
export default Header;
