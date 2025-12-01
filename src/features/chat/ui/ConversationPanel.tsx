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
			<div className="flex-1 flex items-center justify-center h-full bg-transparent">
				<div className="text-center p-8 bg-card/30 rounded-3xl border border-border/50 backdrop-blur-md shadow-xl max-w-md w-full mx-4">
					<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse border border-primary/20">
						<span className="text-4xl">💬</span>
					</div>
					<h3 className="text-xl font-bold text-foreground mb-2">Выберите чат</h3>
					<p className="text-muted-foreground">Начните новую беседу или выберите существующую из списка слева</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col h-full bg-transparent relative">
			{/* Header */}
			<div className="bg-card/30 backdrop-blur-md border-b border-border/50 z-10">
				<ConversationHeader conversation={conversation} onCall={onCall} onVideoCall={onVideoCall} />
			</div>

			{/* Messages Area */}
			<div className="flex-1 overflow-hidden relative flex flex-col">
				{/* Background Pattern or Gradient */}
				<div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]" />

				<div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 z-0">
					<MessageList messages={messages} currentUserId={currentUser} />
					<div ref={messagesEndRef} className="h-4" />
				</div>
			</div>

			{/* Message Input Area */}
			<div className="p-4 bg-card/30 backdrop-blur-md border-t border-border/50 z-10">
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
