export interface Message {
	id: string;
	content: string;
	isRead: boolean;
	clientId?: string; // Backend bilan moslash
	employeeId?: string; // Backend bilan moslash
	createdAt?: string; // Backend bilan moslash
	updatedAt?: string; // Backend bilan moslash
	// Frontend uchun qo'shimcha maydonlar (optional)
	senderId?: string; // Frontend uchun
	receiverId?: string; // Frontend uchun
	timestamp?: string; // Frontend uchun (ISO string format)
	type?: 'text' | 'image' | 'file'; // Frontend uchun
}
export interface Conversation {
	id: string;
	participants: string[];
	lastMessage?: Message;
	unreadCount: number;
	title: string;
	avatar?: string;
}
