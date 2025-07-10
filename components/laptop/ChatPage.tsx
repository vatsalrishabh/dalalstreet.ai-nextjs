'use client';

import { useState, useEffect, useRef } from 'react';
import ChatInput from '../common/ChatInput';
import { getLLMResponse } from '@/services/llmServices';

interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
}

const ChatPage = ({ firebaseIdToken }: { firebaseIdToken: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isResponding]);

  const handleSend = async (prompt: string) => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', content: prompt }]);
    setIsResponding(true);

    try {
      const response = await getLLMResponse(firebaseIdToken, prompt, 'sample');
      const lines = response.split('\n').map((line) => line.trim());

      const chunks: string[] = [];

      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const parsed = JSON.parse(line.replace('data: ', ''));
            if (parsed.action_type === 'llm_response' && parsed.message) {
              const msgParts = parsed.message
                .split(/\n{2,}|\n(?=\d+\.)/)
                .map((m:String) => m.trim())
                .filter(Boolean);
              chunks.push(...msgParts);
            }
          } catch (_) {
           
            console.warn('❌ Failed to parse JSON:', line);
          }
        }
      }

      for (let i = 0; i < chunks.length; i++) {
        await new Promise((res) => setTimeout(res, 500));
        setMessages((prev) => [...prev, { sender: 'ai', content: chunks[i] }]);
      }
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', content: '❌ AI failed to respond.' },
      ]);
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <div className="flex flex-col h-screen relative bg-base-200">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 pb-28 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg shadow-md whitespace-pre-wrap text-sm max-w-[85%] ${
              msg.sender === 'user'
                ? 'bg-primary text-primary-content self-end'
                : 'bg-neutral text-neutral-content self-start'
            }`}
          >
            <span className="font-semibold">
              {msg.sender === 'user' ? '🧑‍💼 You:' : '🤖 AI:'}
            </span>{' '}
            {msg.content}
          </div>
        ))}

        {/* Typing indicator */}
        {isResponding && (
          <div className="flex items-center gap-2 p-3 bg-neutral text-neutral-content rounded-lg w-fit animate-pulse">
            <span className="font-semibold">🤖 AI:</span>
            <span className="loading loading-dots loading-md"></span>
            <span className="text-sm">Thinking...</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-0 right-0 bg-base-100 shadow-md">
        <ChatInput onSend={handleSend} disabled={isResponding} />
      </div>
    </div>
  );
};

export default ChatPage;
