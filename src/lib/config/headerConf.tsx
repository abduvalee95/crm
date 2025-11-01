import { ArrowDownToLine, Bell, LayoutGrid, List, Plus } from "lucide-react";
import { PageConfig } from "../interface/header";
import { ViewMode } from "../enums/deal";
import cvsDownloader, { downloadCSV } from '../cvsDownloader'
import { Employee, employeesData } from '../data/emloyers'
import { analyticsData } from '../data/mock'



// Конфигурации для разных страниц
const pageConfigs: Record<string, PageConfig> = {
	home: {
		title: "Добро пожаловать, Юсуф 👋",
		subtitle: "Вот что происходит в вашей CRM сегодня",
		actions: [
			{
				type:'button',
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
				type:'button',
				label: "Добавить клиента",
				icon: <Plus />,
				onClick: () => console.log("Add client clicked"),
				className: "bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700"
			}
		]
	},
	deals: { 
        title: "Сделки",
        subtitle: "Управление воронкой продаж",
        actions: [
            {
                type: 'view-switcher',
                options: [
                    { view: ViewMode.Kanban, label: "Канбан", icon: <LayoutGrid size={16} /> },
                    { view: ViewMode.Table, label: "Таблица", icon: <List size={16} /> }
                ]
            },
            {
                type: 'button',
                label: "Добавить сделку",
                icon: <Plus />,
                onClick: () => alert("Yangi kelishuv qo'shish formasi ochildi!"),
                className: "bg-white text-black flex items-center gap-2 border p-2 rounded-lg border-gray-700"
            }
        ]
    },
	analytics: {
		title: "Аналитика",
		subtitle: "Отчеты и статистика",
		actions: [
			{
				type:'button',
				label: "Экспорт данных",
				icon: <ArrowDownToLine />,		
				onClick: () => downloadCSV(analyticsData.clientPerformance),
				className: "flex items-center gap-2 border p-2 rounded-lg bg-card border-gray-700"
			},
			{
				type:'button',
				label: "За год",
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
				type:'button',
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