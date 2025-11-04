'use client';
import { dataConversations } from '@/entities/message/model/mock';
import { ConversationPanel } from '@/features/chat/ui/ConversationPanel';
import { Conversation, Message } from '@/lib/interface/message';
import { MainMessagesPanel } from '@/widgets/messages/ui/MainMessagesPanel';
import { useEffect, useMemo, useState } from 'react';

const MessagesPage = () => {
	const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const activeMessage = useMemo(
		() => messages.find((message) => message.id === activeConversation?.id),
		[messages, activeConversation],
	);
	useEffect(() => {
		if (activeConversation) {
			setMessages(activeConversation.lastMessage ? [activeConversation.lastMessage] : []);
		}
	}, [activeConversation]);

	const handleCall = () => {
		console.log('call');
	};

	const handleVideoCall = () => {
		console.log('video call');
	};

	const handleConversationSelect = (conversationId: string) => {
		setActiveConversation(dataConversations.find((conversation) => conversation.id === conversationId) || null);
	};

	const handleNewConversation = () => {
		console.log('new conversation');
	};
	const handleSendMessage = (content: string) => {
		console.log('send message', content);
	};
	return (
		<div className="flex bg-background min-h-screen p-6  shadow-lg gap-4 rounded-lg">
			<div className="w-1/3 border border-border rounded-lg rounded-r-none">
				<MainMessagesPanel
					conversations={dataConversations}
					onConversationSelect={handleConversationSelect}
					activeConversationId={activeConversation?.id || ''}
					onNewConversation={handleNewConversation}
				/>
			</div>
			<div className="w-full border border-border rounded-lg rounded-l-none">
				<ConversationPanel
					conversation={activeConversation}
					messages={messages}
					currentUser={activeConversation?.id || ''}
					onSendMessage={handleSendMessage}
					onCall={handleCall}
					onVideoCall={handleVideoCall}
				/>
			</div>
		</div>
	);
};

export default MessagesPage;
