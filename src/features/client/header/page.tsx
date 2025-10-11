import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";

const HeaderClient = () => (
	<header className="mt-5 flex justify-between px-6">
		<div>
			<h1 className="text-2xl font-bold text-white">Клиенты</h1>
			<p className="text-gray-400 mt-1">Управление базой клиентов</p>
		</div>
		<div className="flex items-center space-x-4 px-8">
			<Button variant="ghost" size="icon" className=" text-gray-200 hover:text-white hover:bg-gray-700">
				<span className="  bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700">
					<Plus /> Добавить клиента
				</span>
			</Button>
		</div>
	</header>
);
export default HeaderClient;