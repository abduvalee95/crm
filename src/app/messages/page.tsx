'use client';
import { dataConversations } from '@/entities/message/model/mock';
import { ConversationPanel } from '@/features/chat/ui/ConversationPanel';
import { SocketClient } from '@/lib/api/socket';
import { Message } from '@/lib/interface/message';
import { addMessage, setConversations, setMessages, updateUserStatus } from '@/shared/store/chatSlice';
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

	// Request notification permission
	useEffect(() => {
		if (typeof window !== 'undefined' && 'Notification' in window) {
			if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
				Notification.requestPermission();
			}
		}
	}, []);

	useEffect(() => {
		// Socketga ulanish
		// baseUrl dan WS URL yasash (http -> ws, https -> wss)
		const wsUrl = 'ws://localhost:3000'; // Vaqtinchalik, configdan olish kerak
		const socket = new SocketClient(wsUrl);
		socket.connect();
		socketRef.current = socket;

		socket.onMessage((msg) => {
			// Handle user status events
			if (msg.event === 'user_online') {
				dispatch(updateUserStatus({ userId: msg.data.userId, isOnline: true }));
			}
			if (msg.event === 'user_offline') {
				dispatch(updateUserStatus({ userId: msg.data.userId, isOnline: false }));
			}

			// message_received eventini tekshirish
			if (msg.event === 'message_received') {
				const messageData = msg.data;

				const senderId = messageData.userId || msg.memberData?.id || 'other';

				// Show notification if message is from someone else
				if (senderId !== currentUser?.id && 'Notification' in window && Notification.permission === 'granted') {
					new Notification('Новое сообщение', {
						body: messageData.text || msg.text,
						icon: 'https://cdn-icons-png.flaticon.com/512/2867/2867297.png', // Path to your icon
					});
				}

				// Yangi xabar kelganda
				if (activeConversationId) {
					console.log('Adding message to conversation:', activeConversationId);
					const newMessage: Message = {
						id: Date.now().toString(),
						senderId: senderId,
						content: messageData.text || msg.text || messageData, // Fallback
						timestamp: new Date().toISOString(),
						createdAt: new Date().toISOString(),
						type: 'text',
						isRead: false,
					};
					// console.log('New Message Object:', newMessage);
					dispatch(addMessage({ conversationId: activeConversationId, message: newMessage }));
				} else {
					console.log('No active conversation, skipping addMessage');
				}
			}
		});

		// Cleanup function
		return () => {
			// Biz socketni yopmaymiz, chunki u global ref da saqlanishi mumkin
			// Lekin agar component unmount bo'lsa va biz socketni faqat shu page uchun ishlatsak, yopish kerak.
			// Hozirgi holatda strict mode sababli yopilishi mumkin, shuning uchun ehtiyot bo'lamiz.
			// socket.close();
			// socketRef.current = null;
		};
	}, [dispatch, activeConversationId, currentUser]);

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
		<div className="flex bg-background h-[calc(100vh-2rem)] p-6 shadow-lg gap-4 rounded-lg overflow-hidden">
			<div className="w-[350px] border border-border rounded-2xl bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
				<MainMessagesPanel onNewConversation={handleNewConversation} />
			</div>
			<div className="flex-1 border border-border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden relative">
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
