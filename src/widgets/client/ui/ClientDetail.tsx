'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getStatusBadge } from '@/features/client/labels';
import { recentClients } from '@/lib/data/client';
import {
	clientDeals,
	clientDocuments,
	clientInteractions,
	clientTasks,
	InteractionType,
} from '@/lib/data/clientInteractions';
import * as Avatar from '@radix-ui/react-avatar';
import { ArrowLeft, Building2, Calendar, FileText, Mail, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface ClientDetailProps {
	clientId: number;
	onBack?: () => void;
}

type TabType = 'interactions' | 'deals' | 'tasks' | 'documents';

const ClientDetail = ({ clientId, onBack }: ClientDetailProps) => {
	const [activeTab, setActiveTab] = useState<TabType>('interactions');

	const client = useMemo(() => {
		return recentClients.find((c) => c.id === clientId);
	}, [clientId]);

	const interactions = useMemo(() => {
		return clientInteractions[clientId] || [];
	}, [clientId]);

	const deals = useMemo(() => {
		return clientDeals[clientId] || [];
	}, [clientId]);

	const tasks = useMemo(() => {
		return clientTasks[clientId] || [];
	}, [clientId]);

	const documents = useMemo(() => {
		return clientDocuments[clientId] || [];
	}, [clientId]);

	if (!client) {
		return (
			<div className="flex-1 min-h-screen p-6 bg-black text-white">
				<div className="text-center py-8">
					<p className="text-gray-400">Клиент не найден</p>
					{onBack && (
						<Button onClick={onBack} variant="outline" className="mt-4">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Назад
						</Button>
					)}
				</div>
			</div>
		);
	}

	const getInteractionIcon = (type: InteractionType) => {
		switch (type) {
			case 'call':
				return <Phone className="w-4 h-4" />;
			case 'email':
				return <Mail className="w-4 h-4" />;
			case 'meeting':
				return <Calendar className="w-4 h-4" />;
			case 'message':
				return <MessageCircle className="w-4 h-4" />;
			default:
				return <FileText className="w-4 h-4" />;
		}
	};

	const getInitials = (name: string) => {
		const parts = name.split(' ');
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	const renderInteractions = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-white mb-4">История взаимодействий</h3>
			{interactions.length === 0 ? (
				<p className="text-gray-400 text-center py-8">Нет взаимодействий</p>
			) : (
				interactions.map((interaction) => (
					<div
						key={interaction.id}
						className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
					>
						<div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
							{getInteractionIcon(interaction.type)}
						</div>
						<div className="flex-1">
							<h4 className="font-medium text-white mb-1">{interaction.title}</h4>
							{interaction.description && <p className="text-sm text-gray-400 mb-2">{interaction.description}</p>}
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<span>{interaction.date}</span>
								{interaction.user && (
									<>
										<span>•</span>
										<span>{interaction.user}</span>
									</>
								)}
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);

	const renderDeals = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-white mb-4">Сделки</h3>
			{deals.length === 0 ? (
				<p className="text-gray-400 text-center py-8">Нет сделок</p>
			) : (
				deals.map((deal) => (
					<div
						key={deal.id}
						className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
					>
						<div className="flex items-start justify-between mb-2">
							<h4 className="font-medium text-white">{deal.name}</h4>
							<span className="text-green-400 font-semibold">₽{deal.amount.toLocaleString()}</span>
						</div>
						<div className="flex items-center gap-4 text-sm text-gray-400">
							<span>Стадия: {deal.stage}</span>
							{deal.responsible && (
								<>
									<span>•</span>
									<span>Ответственный: {deal.responsible}</span>
								</>
							)}
							<span>•</span>
							<span>Создана: {deal.createdAt}</span>
						</div>
					</div>
				))
			)}
		</div>
	);

	const renderTasks = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-white mb-4">Задачи</h3>
			{tasks.length === 0 ? (
				<p className="text-gray-400 text-center py-8">Нет задач</p>
			) : (
				tasks.map((task) => (
					<div
						key={task.id}
						className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
					>
						<div className="flex items-start justify-between mb-2">
							<h4 className="font-medium text-white">{task.title}</h4>
							<span
								className={`px-2 py-1 rounded-full text-xs font-medium ${
									task.status === 'Выполнено'
										? 'bg-green-500/20 text-green-400'
										: task.status === 'В работе'
										? 'bg-blue-500/20 text-blue-400'
										: 'bg-gray-500/20 text-gray-400'
								}`}
							>
								{task.status}
							</span>
						</div>
						<div className="flex items-center gap-4 text-sm text-gray-400">
							<span>Срок: {task.deadline}</span>
							{task.responsible && (
								<>
									<span>•</span>
									<span>Ответственный: {task.responsible}</span>
								</>
							)}
						</div>
					</div>
				))
			)}
		</div>
	);

	const renderDocuments = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-white mb-4">Документы</h3>
			{documents.length === 0 ? (
				<p className="text-gray-400 text-center py-8">Нет документов</p>
			) : (
				documents.map((doc) => (
					<div
						key={doc.id}
						className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
								<FileText className="w-5 h-5 text-white" />
							</div>
							<div>
								<h4 className="font-medium text-white">{doc.name}</h4>
								<p className="text-sm text-gray-400">
									{doc.type} • {doc.size} • {doc.uploadedAt}
								</p>
							</div>
						</div>
						<Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
							Скачать
						</Button>
					</div>
				))
			)}
		</div>
	);

	const tabs = [
		{ id: 'interactions' as TabType, label: 'История взаимодействий' },
		{ id: 'deals' as TabType, label: 'Сделки' },
		{ id: 'tasks' as TabType, label: 'Задачи' },
		{ id: 'documents' as TabType, label: 'Документы' },
	];

	return (
		<div className="flex-1 min-h-screen bg-background text-foreground p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					{onBack ? (
						<Button onClick={onBack} variant="ghost" size="sm" className="text-white hover:bg-gray-800">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Назад
						</Button>
					) : (
						<Link href="/clients">
							<Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Назад
							</Button>
						</Link>
					)}
					<div>
						<h1 className="text-2xl font-bold text-white">{client.name}</h1>
						<p className="text-gray-400 mt-1">Директор по развитию</p>
						<p className="text-gray-400">{client.company}</p>
					</div>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700 text-white">
					<MessageCircle className="w-4 h-4 mr-2" />
					Написать в чат
				</Button>
			</div>

			{/* Client Info Card */}
			<Card className="bg-card border-border text-card-foreground mb-6">
				<CardContent className="p-6">
					<div className="flex items-start gap-6">
						<Avatar.Root className="w-24 h-24 border-2 border-gray-600 rounded-full overflow-hidden">
							<Avatar.Image src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
							<Avatar.Fallback className="bg-gray-700 text-white text-xl w-full h-full flex items-center justify-center">
								{getInitials(client.name)}
							</Avatar.Fallback>
						</Avatar.Root>
						<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Building2 className="w-4 h-4" />
									<span>{client.company}</span>
								</div>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Phone className="w-4 h-4" />
									<span>{client.number}</span>
								</div>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Mail className="w-4 h-4" />
									<span>{client.email}</span>
								</div>
							</div>
							<div className="space-y-3">
								<div>
									<span className="text-muted-foreground text-sm">Статус: </span>
									{getStatusBadge(client.status)}
								</div>
								<div>
									<span className="text-muted-foreground text-sm">Ответственный: </span>
									<span>{client.responsible || 'Юсуф'}</span>
								</div>
								{client.amount && (
									<div>
										<span className="text-muted-foreground text-sm">Сумма сделок: </span>
										<span className="text-green-400 font-semibold">₽{client.amount.toLocaleString()}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Tabs */}
			<div className="flex gap-2 mb-6 border-b border-gray-700">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`px-4 py-2 font-medium transition-colors ${
							activeTab === tab.id
								? 'text-white border-b-2 border-blue-600 bg-gray-800/50'
								: 'text-gray-400 hover:text-white hover:bg-gray-800/30'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="mt-6">
				{activeTab === 'interactions' && renderInteractions()}
				{activeTab === 'deals' && renderDeals()}
				{activeTab === 'tasks' && renderTasks()}
				{activeTab === 'documents' && renderDocuments()}
			</div>
		</div>
	);
};

export default ClientDetail;
