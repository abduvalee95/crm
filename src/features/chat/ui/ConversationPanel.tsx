
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Send } from 'lucide-react';
import { Conversation, Message } from '@/lib/interface/message'
import { ConversationHeader } from '@/widgets/messages/ui/ConversationHeader'
import { MessageInput } from './MessageInput'
import { MessageList } from '@/widgets/messages/ui/MessageList'


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
  onVideoCall
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
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-gray-400">💬</span>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            Выберите чат
          </h3>
          <p className="text-gray-400">
            Начните новую беседу или выберите существующую
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <ConversationHeader
        conversation={conversation}
        onCall={onCall}
        onVideoCall={onVideoCall}
      />

      {/* Messages */}
      <MessageList
        messages={messages}
        currentUserId={currentUser}
      />

      {/* Message Input */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        placeholder="Введите сообщение..."
      />

      <div ref={messagesEndRef} />
    </div>
  );
};