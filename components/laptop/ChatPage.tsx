'use client';

import { useState, useEffect, useRef } from 'react';
import ChatInput from '../common/ChatInput';
import { getLLMResponse } from '@/services/llmServices';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  }, [messages]);

  const handleSend = async (prompt: string) => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', content: prompt }]);
    setIsResponding(true);

    try {
      const response = await getLLMResponse(firebaseIdToken, prompt, 'sample');

      // Parse full structured response (single markdown message expected)
      const lines = response.split('\n').map((line) => line.trim());

      const fullResponse = lines
        .filter((line) => line.startsWith('data:'))
        .map((line) => {
          try {
            const parsed = JSON.parse(line.replace('data: ', ''));
            if (parsed.action_type === 'llm_response' && parsed.message) {
              return parsed.message;
            }
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean)
        .join('\n\n');

      setMessages((prev) => [...prev, { sender: 'ai', content: fullResponse || '❌ No response.' }]);
    } catch (err) {
      console.error('❌ Error getting response:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', content: '❌ AI failed to respond.' },
      ]);
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-base-200">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 pb-28 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl shadow-md max-w-[90%] text-sm whitespace-pre-wrap leading-relaxed tracking-wide ${
              msg.sender === 'user'
                ? 'bg-primary text-primary-content self-end'
                : 'bg-white text-gray-800 self-start border border-gray-200'
            }`}
          >
            <div className="font-semibold mb-2">
              {msg.sender === 'user' ? '🧑‍💼 You:' : '🤖 AI:'}
            </div>

            {msg.sender === 'ai' ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    ul: (props) => (
                      <ul className="list-disc list-inside space-y-1 text-sm" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="list-decimal list-inside space-y-1 text-sm" {...props} />
                    ),
                    li: (props) => <li className="ml-2" {...props} />,
                    strong: (props) => (
                      <strong className="font-semibold text-gray-900" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-2 text-sm text-gray-700" {...props} />
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        ))}

        {isResponding && (
          <div className="flex items-center gap-2 p-3 bg-neutral text-neutral-content rounded-lg w-fit animate-pulse">
            <span className="font-semibold">🤖 AI:</span>
            <span className="loading loading-dots loading-md"></span>
            <span className="text-sm">Thinking...</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-12 left-0 right-0 bg-base-100 shadow-md">
        <ChatInput onSend={handleSend} disabled={isResponding} />
      </div>
    </div>
  );
};

export default ChatPage;
