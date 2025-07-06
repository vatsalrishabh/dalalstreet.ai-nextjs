'use client';

import { useState } from 'react';
import { ChatMessageType } from '@/models/chat';
import ChatHeader from '@/components/common/ChatHeader';
import ChatMessage from '@/components/common/ChatMessage';
import ChatInput from '@/components/common/ChatInput';

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      sender: 'bot',
      content: 'Welcome to DalalStreet AI! Ask me anything about stocks ',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSend = (text: string) => {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      sender: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const botReply: ChatMessageType = {
      id: crypto.randomUUID(),
      sender: 'bot',
      content: `📉 This is a sample reply for "${text}"`,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
  };

  return (
    <div className="h-full pb-5 flex flex-col bg-base-100 shadow-lg rounded-lg overflow-hidden">
      <ChatHeader />
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
