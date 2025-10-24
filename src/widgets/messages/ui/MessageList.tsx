import { Message } from '@/lib/interface/message';
import React from 'react';
import { MessageItem } from './Message';

interface MessageListProps {
	messages?: Message[];
	currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{(Array.isArray(messages) ? messages : messages ? [messages] : []).map((message) => (
				<MessageItem key={message.id} message={message} isOwn={message.senderId === currentUserId} />
			))}
		</div>
	);
};
