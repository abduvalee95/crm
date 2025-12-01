'use client';
// src/widgets/messages/ui/ConversationItem.tsx
import { Conversation } from '@/lib/interface/message';
import { useAppSelector } from '@/shared/store/hooks';
import { formatTime } from '@/shared/utils/dateUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

interface ConversationItemProps {
	conversation: Conversation;
	isActive: boolean;
	onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
	const currentUser = useAppSelector((state) => state.user.user);
	const currentUserId = currentUser?.id || '';
	const lastMessageTime = conversation.lastMessage?.createdAt
		? new Date(conversation.lastMessage.createdAt as string)
		: new Date();

	return (
		<div
			onClick={onClick}
			className={`p-3 cursor-pointer transition-all duration-200 rounded-xl group ${
				isActive ? 'bg-blue-600/10 border border-blue-600/20' : 'hover:bg-gray-800/50 border border-transparent'
			}`}
		>
			<div className="flex items-center gap-3">
				{/* Avatar with Online Status */}
				<div className="relative">
					<Avatar className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
						<AvatarImage src={conversation.avatar} className="w-12 h-12 object-cover rounded-full" />
						<AvatarFallback className="w-12 h-12 flex items-center justify-center text-white font-bold bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
							{conversation.title.slice(0, 1).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					{/* Online Indicator - could be dynamic */}
					<div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
				</div>

				{/* Conversation Info */}
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-0.5">
						<h3
							className={`font-semibold text-sm truncate ${
								isActive ? 'text-blue-400' : 'text-card-foreground group-hover:text-blue-400 transition-colors'
							}`}
						>
							{conversation.title}
						</h3>
						{conversation.lastMessage && (
							<span className="text-[10px] text-gray-500 font-medium">{formatTime(lastMessageTime)}</span>
						)}
					</div>

					<div className="flex items-center justify-between">
						<p className="text-xs text-gray-400 truncate max-w-[180px]">
							{conversation.lastMessage?.senderId === currentUserId && <span className="text-blue-400">Вы: </span>}
							{conversation.lastMessage?.content || 'Нет сообщений'}
						</p>

						{/* Unread Count */}
						{conversation.unreadCount > 0 && (
							<span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
								{conversation.unreadCount}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
