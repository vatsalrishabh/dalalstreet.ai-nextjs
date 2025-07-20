'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ChatInput from '../common/ChatInput';
import { getLLMResponse } from '@/services/llmServices';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDispatch } from 'react-redux';
import { setStockParams } from '@/store/redux/slices/tableSlice';
import { saveQueryToLocalHistory } from '@/lib/lastQueryLocal';

interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
}

const LOCAL_STORAGE_KEY = 'chat_history';

const ChatPage = ({ firebaseIdToken }: { firebaseIdToken: string }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // ✅ Load chat from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setMessages(parsed);
      } catch (e) {
        console.error('Invalid localStorage data', e);
      }
    }
  }, []);

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Helper to update messages AND localStorage
  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => {
      const updated = [...prev, msg].slice(-10); // Only last 10
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSend = useCallback(
    async (prompt: string) => {
      if (!prompt.trim()) return;

      const userMessage: ChatMessage = { sender: 'user', content: prompt };
      addMessage(userMessage);
      setIsResponding(true);

      try {
        const response = await getLLMResponse(firebaseIdToken, prompt, 'sample');
        const lines = response.split('\n').map((line) => line.trim());

        let fullResponse = '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const json = JSON.parse(line.replace('data: ', ''));

              if (json.action_type === 'screen_stock' && json.query) {
                saveQueryToLocalHistory(json.stream_id || Date.now().toString(), json.query);
                dispatch(
                  setStockParams({
                    query: json.query,
                    title: 'AI Suggested Stocks',
                    count: 10,
                  })
                );
              }

              if (json.action_type === 'llm_response' && json.message) {
                fullResponse += `${json.message}\n\n`;
              }
            } catch (err) {
              console.error('❌ JSON parse error in LLM response:', err);
            }
          }
        }

        addMessage({
          sender: 'ai',
          content: fullResponse.trim() || '❌ No response.',
        });
      } catch (err) {
        console.error('❌ Error getting response:', err);
        addMessage({
          sender: 'ai',
          content: '❌ AI failed to respond.',
        });
      } finally {
        setIsResponding(false);
      }
    },
    [firebaseIdToken, dispatch]
  );

  return (
    <div className="flex flex-col h-full relative bg-base-200">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 pb-28 scroll-smooth">
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
                    ul: (props) => <ul className="list-disc list-inside space-y-1 text-sm" {...props} />,
                    ol: (props) => <ol className="list-decimal list-inside space-y-1 text-sm" {...props} />,
                    li: (props) => <li className="ml-2" {...props} />,
                    strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
                    p: (props) => <p className="mb-2 text-sm text-gray-700" {...props} />,
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

      <div className="lg:absolute lg:bottom-12 lg:left-0 lg:right-0 bg-base-100 shadow-md fixed bottom-0 left-0 right-0">
        <ChatInput onSend={handleSend} disabled={isResponding} />
      </div>
    </div>
  );
};

export default ChatPage;
