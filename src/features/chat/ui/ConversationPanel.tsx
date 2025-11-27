
'use client';

import { Conversation, Message } from '@/lib/interface/message';
import { ConversationHeader } from '@/widgets/messages/ui/ConversationHeader';
import { MessageList } from '@/widgets/messages/ui/MessageList';
import React, { useEffect, useRef, useState } from 'react';
import { MessageInput } from './MessageInput';

interface ConversationPanelProps {
	conversation: Conversation | null;
	messages: Message[];
	currentUser: string;
	onSendMessage: (content: string) => void;
	onCall: () => void;
	onVideoCall: () => void;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
	conversation,
	messages,
	currentUser,
	onSendMessage,
	onCall,
	onVideoCall,
}) => {
	const [inputValue, setInputValue] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMessage = () => {
		if (inputValue.trim()) {
			onSendMessage(inputValue.trim());
			setInputValue('');
		}
	};

	if (!conversation) {
		return (
			<div className="flex-1 flex items-center justify-center bg-background/50 h-full">
				<div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
					<div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
						<span className="text-4xl">💬</span>
					</div>
					<h3 className="text-xl font-semibold text-card-foreground mb-2">Выберите чат</h3>
					<p className="text-gray-400 max-w-xs mx-auto">
						Начните новую беседу или выберите существующую из списка слева
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col h-full bg-background/50 relative">
			{/* Header */}
			<ConversationHeader conversation={conversation} onCall={onCall} onVideoCall={onVideoCall} />

			{/* Messages Area */}
			<div className="flex-1 overflow-hidden relative flex flex-col">
				<div className="flex-1 overflow-y-auto custom-scrollbar px-2">
					<MessageList messages={messages} currentUserId={currentUser} />
					<div ref={messagesEndRef} className="h-4" />
				</div>
			</div>

			{/* Message Input Area */}
			<div className="p-4 bg-background border-t border-gray-700">
				<MessageInput
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSendMessage}
					placeholder="Напишите сообщение..."
				/>
			</div>
		</div>
	);
};