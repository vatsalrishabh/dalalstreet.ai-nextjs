'use client';

import { ChatMessageType } from '@/models/chat';

interface Props {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className={`chat-bubble ${isUser ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}>
        {message.content}
      </div>
      <div className="text-xs opacity-50 mt-1">
         {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
