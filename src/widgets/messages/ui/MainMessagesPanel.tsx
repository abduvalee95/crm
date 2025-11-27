'use client';
import { SearchInput } from '@/features/search/SearchMessage';
import { Conversation } from '@/lib/interface/message';
import { addConversation, setActiveConversation } from '@/shared/store/chatSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { Edit, Users } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ConversationItem } from './ConversationItem';

interface MainMessagesPanelProps {
	onNewConversation?: () => void;
}

export const MainMessagesPanel: React.FC<MainMessagesPanelProps> = ({ onNewConversation }) => {
	const dispatch = useAppDispatch();
	const { conversations, activeConversationId } = useAppSelector((state) => state.chat);
	const employees = useAppSelector((state) => state.employee.employees);
	const currentUser = useAppSelector((state) => state.user.user);
	const [searchQuery, setSearchQuery] = useState('');
	const [showEmployees, setShowEmployees] = useState(false);

	// Filter conversations based on search
	const filteredConversations = useMemo(() => {
		if (!searchQuery) return conversations;

		return conversations.filter(
			(conversation) =>
				conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				conversation.participants.some((participant) => participant.toLowerCase().includes(searchQuery.toLowerCase())),
		);
	}, [conversations, searchQuery]);

	// Filter employees based on search
	const filteredEmployees = useMemo(() => {
		if (!searchQuery) return employees;

		return employees.filter(
			(employee) =>
				employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				employee.position?.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [employees, searchQuery]);

	const handleConversationSelect = (conversationId: string) => {
		dispatch(setActiveConversation(conversationId));
	};

	const handleEmployeeSelect = (employeeId: string) => {
		// Employee bilan conversation yaratish yoki topish
		const existingConversation = conversations.find(
			(conv) => conv.participants.includes(employeeId) && conv.participants.includes(currentUser?.id || ''),
		);

		if (existingConversation) {
			dispatch(setActiveConversation(existingConversation.id));
		} else {
			// Yangi conversation yaratish
			const employee = employees.find((emp) => emp.id === employeeId);
			if (employee) {
				const newConversation: Conversation = {
					id: `employee-${employeeId}`,
					title: employee.fullName,
					participants: [currentUser?.id || '', employeeId],
					unreadCount: 0,
					avatar: employee.avatar,
				};
				dispatch(addConversation(newConversation));
				dispatch(setActiveConversation(newConversation.id));
			}
		}
		setShowEmployees(false);
	};

	return (
		<div className="border-r border-gray-700 flex flex-col h-full w-full bg-background/50">
			{/* Header */}
			<div className="p-4 border-b border-gray-700 space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-card-foreground">Сообщения</h2>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setShowEmployees(!showEmployees)}
							className={`p-2 rounded-full transition-colors ${
								showEmployees ? 'bg-blue-600 text-white' : 'hover:bg-gray-700/50 text-gray-400 hover:text-blue-500'
							}`}
							title="Сотрудники"
						>
							<Users className="w-5 h-5" />
						</button>
						<button
							onClick={onNewConversation}
							className="p-2 hover:bg-gray-700/50 rounded-full text-blue-500 transition-colors"
							title="Новый чат"
						>
							<Edit className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Search */}
				<div className="relative">
					<SearchInput
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder={showEmployees ? 'Поиск сотрудников...' : 'Поиск чатов...'}
					/>
				</div>
			</div>

			{/* Conversations/Employees List */}
			<div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
				{showEmployees ? (
					// Employees List
					filteredEmployees.length === 0 ? (
						<div className="text-center py-8 text-gray-500 text-sm">
							{searchQuery ? 'Сотрудники не найдены' : 'Нет сотрудников'}
						</div>
					) : (
						filteredEmployees.map((employee) => {
							// Employee bilan conversation mavjudligini tekshirish
							const existingConv = conversations.find(
								(conv) => conv.participants.includes(employee.id) && conv.participants.includes(currentUser?.id || ''),
							);

							return (
								<div
									key={employee.id}
									onClick={() => handleEmployeeSelect(employee.id)}
									className={`p-3 cursor-pointer transition-all duration-200 rounded-xl group ${
										existingConv?.id === activeConversationId
											? 'bg-blue-600/10 border border-blue-600/20'
											: 'hover:bg-gray-800/50 border border-transparent'
									}`}
								>
									<div className="flex items-center gap-3">
										<div className="relative">
											<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 flex items-center justify-center">
												{employee.avatar ? (
													<img src={employee.avatar} alt={employee.fullName} className="w-full h-full object-cover" />
												) : (
													<span className="text-white font-bold text-sm">
														{employee.fullName.slice(0, 1).toUpperCase()}
													</span>
												)}
											</div>
											<div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
										</div>

										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between mb-0.5">
												<h3
													className={`font-semibold text-sm truncate ${
														existingConv?.id === activeConversationId
															? 'text-blue-400'
															: 'text-card-foreground group-hover:text-blue-400 transition-colors'
													}`}
												>
													{employee.fullName}
												</h3>
											</div>
											<p className="text-xs text-gray-400 truncate">{employee.position || employee.email}</p>
										</div>
									</div>
								</div>
							);
						})
					)
				) : // Conversations List
				filteredConversations.length === 0 ? (
					<div className="text-center py-8 text-gray-500 text-sm">
						{searchQuery ? 'Ничего не найдено' : 'Нет чатов'}
					</div>
				) : (
					filteredConversations.map((conversation) => (
						<ConversationItem
							key={conversation.id}
							conversation={conversation}
							isActive={conversation.id === activeConversationId}
							onClick={() => handleConversationSelect(conversation.id)}
						/>
					))
				)}
			</div>
		</div>
	);
};
