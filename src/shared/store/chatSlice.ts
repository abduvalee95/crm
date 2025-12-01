import { Conversation, Message } from '@/lib/interface/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
	conversations: Conversation[];
	activeConversationId: string | null;
	messages: Record<string, Message[]>; // conversationId -> messages
	onlineUsers: string[]; // Online user IDs
	isLoading: boolean;
	error: string | null;
}

const initialState: ChatState = {
	conversations: [],
	activeConversationId: null,
	messages: {},
	onlineUsers: [],
	isLoading: false,
	error: null,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setConversations(state, action: PayloadAction<Conversation[]>) {
			state.conversations = action.payload;
		},
		addConversation(state, action: PayloadAction<Conversation>) {
			// Agar conversation allaqachon mavjud bo'lsa, qo'shmaslik
			const existingIndex = state.conversations.findIndex((c) => c.id === action.payload.id);
			if (existingIndex === -1) {
				state.conversations.unshift(action.payload);
			}
		},
		setActiveConversation(state, action: PayloadAction<string | null>) {
			state.activeConversationId = action.payload;
		},
		setMessages(state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) {
			const { conversationId, messages } = action.payload;
			// Ensure all timestamps are strings
			const sanitizedMessages = messages.map((msg) => ({
				...msg,
				timestamp: msg.timestamp || msg.createdAt || new Date().toISOString(),
				createdAt: msg.createdAt || msg.timestamp || new Date().toISOString(),
			}));
			state.messages[conversationId] = sanitizedMessages;
		},
		addMessage(state, action: PayloadAction<{ conversationId: string; message: Message }>) {
			const { conversationId, message } = action.payload;

			// Ensure timestamp is string (not Date object)
			const sanitizedMessage: Message = {
				...message,
				timestamp: message.timestamp || message.createdAt || new Date().toISOString(),
				createdAt: message.createdAt || message.timestamp || new Date().toISOString(),
			};

			if (!state.messages[conversationId]) {
				state.messages[conversationId] = [];
			}
			state.messages[conversationId].push(sanitizedMessage);

			// Update last message in conversation list
			const conversationIndex = state.conversations.findIndex((c) => c.id === conversationId);
			if (conversationIndex !== -1) {
				state.conversations[conversationIndex].lastMessage = sanitizedMessage;
				// Move conversation to top
				const conversation = state.conversations.splice(conversationIndex, 1)[0];
				state.conversations.unshift(conversation);
			}
		},
		updateMessageStatus(
			state,
			action: PayloadAction<{ conversationId: string; messageId: string; status: 'sent' | 'delivered' | 'read' }>,
		) {
			const { conversationId, messageId, status } = action.payload;
			const message = state.messages[conversationId]?.find((m) => m.id === messageId);
			if (message) {
				message.isRead = status === 'read';
				message.updatedAt = new Date().toISOString();
			}
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setOnlineUsers(state, action: PayloadAction<string[]>) {
			state.onlineUsers = action.payload;
		},
		updateUserStatus(state, action: PayloadAction<{ userId: string; isOnline: boolean }>) {
			const { userId, isOnline } = action.payload;
			if (isOnline) {
				if (!state.onlineUsers.includes(userId)) {
					state.onlineUsers.push(userId);
				}
			} else {
				state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
			}
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
	},
});

export const {
	setConversations,
	addConversation,
	setActiveConversation,
	setMessages,
	addMessage,
	updateMessageStatus,
	setLoading,
	setOnlineUsers,
	updateUserStatus,
	setError,
} = chatSlice.actions;

export default chatSlice.reducer;
