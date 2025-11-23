'use client';
// src/widgets/messages/ui/ConversationItem.tsx
import { Conversation } from '@/lib/interface/message';
import { formatTime } from '@/shared/utils/dateUtils';
import React from 'react';

interface ConversationItemProps {
	conversation: Conversation;
	isActive: boolean;
	onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`p-4 cursor-pointer transition-colors rounded-lg ${
				isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
			}`}
		>
			<div className="flex items-start gap-4">
				{/* Avatar with Online Status */}
				<div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
					<span
					// name={conversation.title}
					// avatar={conversation.avatar}
					className="text-white text-2xl font-bold"
					>
						{conversation.title.slice(0,1).toUpperCase()}
					</span>
					{/* Online Indicator */}
					<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
				</div>

				{/* Conversation Info */}
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between mb-1">
						<h3 className="text-card-foreground font-medium truncate">{conversation.title}</h3>
						{conversation.lastMessage && (
							<span className="text-xs text-white">{formatTime(new Date(conversation.lastMessage.createdAt as string))}</span>
						)}
					</div>

					<p className="text-sm text-gray-400 truncate">{conversation.lastMessage?.content || 'Нет сообщений'}</p>

					{/* Unread Count */}
					{conversation.unreadCount > 0 && (
						<div className="flex justify-end mt-1">
							<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{conversation.unreadCount}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
