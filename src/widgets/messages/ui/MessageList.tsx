import { Message } from '@/lib/interface/message';
import { useAppSelector } from '@/shared/store/hooks';
import React from 'react';
import { MessageItem } from './Message';

interface MessageListProps {
	messages?: Message[];
	currentUserId?: string; // Optional, agar Redux'dan olsa
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
	// Redux'dan user ma'lumotlarini olish
	const currentUser = useAppSelector((state) => state.user.user);
	const userId = currentUserId || currentUser?.id || '';

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{(Array.isArray(messages) ? messages : messages ? [messages] : []).map((message) => (
				<MessageItem key={message.id} message={message} isOwn={message.senderId === userId} />
			))}
		</div>
	);
};
