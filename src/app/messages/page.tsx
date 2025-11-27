'use client';
import { dataConversations } from '@/entities/message/model/mock';
import { ConversationPanel } from '@/features/chat/ui/ConversationPanel';
import { SocketClient } from '@/lib/api/socket';
import { Message } from '@/lib/interface/message';
import { addMessage, setConversations, setMessages } from '@/shared/store/chatSlice';
import { fetchEmployees } from '@/shared/store/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { MainMessagesPanel } from '@/widgets/messages/ui/MainMessagesPanel';
import { useEffect, useRef } from 'react';

const MessagesPage = () => {
	const dispatch = useAppDispatch();
	const { conversations, activeConversationId, messages } = useAppSelector((state) => state.chat);
	const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;
	const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];
	const currentUser = useAppSelector((state) => state.user.user);

	const socketRef = useRef<SocketClient | null>(null);

	// Load initial data (mock)
	useEffect(() => {
		dispatch(setConversations(dataConversations));
		// Employee'larni yuklash
		dispatch(fetchEmployees());
	}, [dispatch]);

	useEffect(() => {
		// Socketga ulanish
		const socket = new SocketClient('ws://localhost:3000'); // Backend URL
		socket.connect();
		socketRef.current = socket;

		socket.onMessage((msg) => {
			console.log('Received message:', msg);
			if (msg.event === 'message') {
				// Yangi xabar kelganda
				// Hozircha active conversationga qo'shamiz (agar sender ID mos kelsa)
				// Haqiqiy ilovada msg.memberData va boshqa ma'lumotlardan conversationId aniqlanadi
				if (activeConversationId) {
					const newMessage: Message = {
						id: Date.now().toString(), // Vaqtinchalik ID
						senderId: msg.memberData?.id || 'other',
						content: msg.text,
						timestamp: new Date().toISOString(),
						createdAt: new Date().toISOString(),
						type: 'text',
						isRead: false,
					};
					dispatch(addMessage({ conversationId: activeConversationId, message: newMessage }));
				}
			}
		});

		return () => {
			socket.close();
		};
	}, [dispatch, activeConversationId]);

	// Active conversation o'zgarganda xabarlarni yuklash (mock)
	useEffect(() => {
		if (activeConversation) {
			// Agar xabarlar yuklanmagan bo'lsa, mock xabarlarni qo'shamiz
			if (!messages[activeConversation.id] && activeConversation.lastMessage) {
				dispatch(setMessages({ conversationId: activeConversation.id, messages: [activeConversation.lastMessage] }));
			}
		}
	}, [activeConversation, dispatch, messages]);

	const handleCall = () => {
		console.log('call');
	};

	const handleVideoCall = () => {
		console.log('video call');
	};

	const handleNewConversation = () => {
		console.log('new conversation');
	};

	const handleSendMessage = (content: string) => {
		console.log('send message', content);
		if (socketRef.current && activeConversationId) {
			socketRef.current.send(JSON.stringify({ event: 'message', data: content }));

			// Optimistic update
			const newMessage: Message = {
				id: Date.now().toString(),
				senderId: currentUser?.id || 'me',
				content: content,
				timestamp: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				type: 'text',
				isRead: false,
			};
			dispatch(addMessage({ conversationId: activeConversationId, message: newMessage }));
		}
	};

	return (
		<div className="flex bg-background min-h-screen p-6  shadow-lg gap-4 rounded-lg">
			<div className="w-1/3 border border-border rounded-lg rounded-r-none">
				<MainMessagesPanel onNewConversation={handleNewConversation} />
			</div>
			<div className="w-full border border-border rounded-lg rounded-l-none">
				<ConversationPanel
					conversation={activeConversation}
					messages={activeMessages}
					currentUser={currentUser?.id || ''}
					onSendMessage={handleSendMessage}
					onCall={handleCall}
					onVideoCall={handleVideoCall}
				/>
			</div>
		</div>
	);
};

export default MessagesPage;
