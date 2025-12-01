import { formatAvatarUrl } from '@/lib/config/config';
import { Conversation } from '@/lib/interface/message';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MoreVertical, Phone, Video } from 'lucide-react';
import React from 'react';

interface ConversationHeaderProps {
	conversation: Conversation;
	onCall: () => void;
	onVideoCall: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation, onCall, onVideoCall }) => {
	return (
		<div className="px-6 py-4 border-b border-border/50 bg-card/30 flex items-center justify-between sticky top-0 z-10 shadow-sm">
			{/* User Info */}
			<div className="flex items-center gap-4">
				<div className="relative">
					<Avatar className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 ">
						<AvatarImage src={formatAvatarUrl(conversation.avatar)} className="w-10 h-10 object-cover rounded-full" />
						<AvatarFallback className="w-10 h-10 flex items-center justify-center text-white font-bold text-sm bg-blue-600">
							{conversation.title.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					{/* Online Status */}
					<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
				</div>

				<div>
					<h3 className="text-card-foreground font-semibold text-base">{conversation.title}</h3>
					<p className="text-green-500 text-xs font-medium flex items-center gap-1.5">
						<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />В сети
					</p>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex items-center gap-1">
				<button
					onClick={onCall}
					className="p-2.5 hover:bg-gray-700/50 rounded-full transition-all duration-200 text-gray-400 hover:text-blue-400"
					title="Звонок"
				>
					<Phone className="w-5 h-5" />
				</button>
				<button
					onClick={onVideoCall}
					className="p-2.5 hover:bg-gray-700/50 rounded-full transition-all duration-200 text-gray-400 hover:text-blue-400"
					title="Видеозвонок"
				>
					<Video className="w-5 h-5" />
				</button>
				<button className="p-2.5 hover:bg-gray-700/50 rounded-full transition-all duration-200 text-gray-400 hover:text-card-foreground">
					<MoreVertical className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};
