import { Conversation } from '@/lib/interface/message';
import { MoreVertical, Phone, Video } from 'lucide-react';
import React from 'react';

interface ConversationHeaderProps {
	conversation: Conversation;
	onCall: () => void;
	onVideoCall: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation, onCall, onVideoCall }) => {
	return (
		<div className="p-4 border-b border-gray-700 bg-gray-800">
			<div className="flex items-center justify-between">
				{/* User Info */}
				<div className="flex items-center gap-4 justify-center">
					<div className="relative w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
						<span className="text-white text-2xl font-bold">{conversation.title.slice(0, 1).toUpperCase()}</span>
						{/* Online Status */}
						<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full" />
					</div>

					<div>
						<h3 className="text-white font-medium text-lg">{conversation.title}</h3>
						<p className="text-green-400 text-sm flex items-center gap-1">
							<span className="w-2 h-2 bg-green-400 rounded-full" />В сети
						</p>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-2">
					<button onClick={onCall} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Звонок">
						<Phone className="w-5 h-5 text-gray-400" />
					</button>
					<button
						onClick={onVideoCall}
						className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
						title="Видеозвонок"
					>
						<Video className="w-5 h-5 text-gray-400" />
					</button>
					<button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
						<MoreVertical className="w-5 h-5 text-gray-400" />
					</button>
				</div>
			</div>
		</div>
	);
};
