import React from 'react';
import { formatTime } from '@/shared/utils/dateUtils';
import { Message } from '@/lib/interface/message'


interface MessageItemProps {
  message: Message;
  isOwn: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isOwn
}) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-white'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${
          isOwn ? 'text-blue-100' : 'text-gray-400'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};