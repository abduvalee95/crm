import { Bell, Plus } from "lucide-react";
import { PageConfig } from "../interface/header";

// Конфигурации для разных страниц
const pageConfigs: Record<string, PageConfig> = {
	home: {
		title: "Добро пожаловать, Юсуф 👋",
		subtitle: "Вот что происходит в вашей CRM сегодня",
		actions: [
			{
				label: "Уведомления",
				icon: <Bell />,
				onClick: () => console.log("Notifications clicked"),
				className: "flex items-center gap-2 border p-2 rounded-lg bg-card border-gray-700"
			}
		]
	},
	clients: {
		title: "Клиенты",
		subtitle: "Управление базой клиентов",
		actions: [
			{
				label: "Добавить клиента",
				icon: <Plus />,
				onClick: () => console.log("Add client clicked"),
				className: "bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700"
			}
		]
	},
	deals: {
		title: "Сделки",
		subtitle: "Управление сделками",
		actions: [
			{
				label: "Добавить сделку",
				icon: <Plus />,
				onClick: () => console.log("Add deal clicked"),
				className: "bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700"
			}
		]
	},
	analytics: {
		title: "Аналитика",
		subtitle: "Отчеты и статистика",
		actions: [
			{
				label: "Экспорт данных",
				icon: <Bell />,
				onClick: () => console.log("Export data clicked"),
				className: "flex items-center gap-2 border p-2 rounded-lg bg-card border-gray-700"
			}
		]
	},
	employees: {
		title: "Сотрудники",
		subtitle: "Управление персоналом",
		actions: [
			{
				label: "Добавить сотрудника",
				icon: <Plus />,
				onClick: () => console.log("Add employee clicked"),
				className: "bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700"
			}
		]
	},
	settings: {
		title: "Настройки",
		subtitle: "Управление параметрами системы"
	}
};
export default pageConfigs