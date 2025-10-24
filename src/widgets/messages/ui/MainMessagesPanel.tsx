'use client'
import { Conversation } from '@/lib/interface/message'
import { MoreVertical, Plus, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { ConversationItem } from './ConversationItem'
import { SearchInput } from '@/features/search/SearchMessage'

interface MainMessagesPanelProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
}

export const MainMessagesPanel: React.FC<MainMessagesPanelProps> = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    if (!searchQuery) return conversations;
    
    return conversations.filter(conversation =>
      conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.participants.some(participant => 
        participant.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [conversations, searchQuery]);

  return (
    <div className=" border-r border-gray-700 flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Сообщения</h2>
        </div>
        
        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск чатов..."
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onClick={() => onConversationSelect(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
};