import { Message } from '@/lib/interface/message';
import { formatTime } from '@/shared/utils/dateUtils';
import React from 'react';

interface MessageItemProps {
	message: Message;
	isOwn: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn }) => {
	const time = message.timestamp || message.createdAt 
		? new Date(message.timestamp || message.createdAt || '')
		: new Date();

	return (
		<div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
			<div
				className={`max-w-[70%] lg:max-w-[60%] px-4 py-2 rounded-2xl shadow-md ${
					isOwn
						? 'bg-blue-600 text-white rounded-br-none'
						: 'bg-gray-700 text-gray-100 rounded-bl-none'
				}`}
			>
				<p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
				<div className={`flex items-center justify-end gap-1 mt-1`}>
					<p className={`text-[10px] ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
						{formatTime(time)}
					</p>
					{isOwn && (
						<span className="text-[10px] text-blue-100">
							{/* Read status indicator could go here */}
							{message.isRead ? '✓✓' : '✓'}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};