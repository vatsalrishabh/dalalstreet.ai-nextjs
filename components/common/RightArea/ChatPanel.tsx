'use client';

import React, { useEffect, useState } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { getLLMResponse } from '@/services/llmServices';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDispatch } from 'react-redux';
import { setLatestQuery } from '@/store/redux/slices/querySlice'; // ✅ Ensure this is correct

type ChatPanelProps = {
  
  setActivePanel: (panel: string | null) => void;
  
  theme: {
    name: string;
    bg: string;
    surface: string;
    surfaceHover: string;
    border: string;
    text: string;
    textMuted: string;
    accent: string;
    header: string;
  };
};

type Message = {
  type: 'user' | 'bot';
  content: string;
};

const CHAT_STORAGE_KEY = 'chatMessages';

const ChatPanel: React.FC<ChatPanelProps> = ({ setActivePanel, theme }) => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  const firebaseIdToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Load chat history and query
  useEffect(() => {
    const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (err) {
        console.error('Failed to parse stored messages', err);
      }
    }

    const storedQuery = localStorage.getItem('lastQuery');
    if (storedQuery) setLastQuery(storedQuery);
  }, []);

  const extractLLMMessage = (response: string) => {
    const lines = response.split('\n').filter(Boolean);
    let query = '';
    let message = '';

    lines.forEach((line) => {
      try {
        const data = JSON.parse(line.replace(/^data:\s*/, ''));
        if (data.action_type === 'screen_stock' && data.query) {
          localStorage.setItem('lastQuery', data.query);
          query = data.query;

          const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
          if (storedMessages) {
            const parsedMessages = JSON.parse(storedMessages);
            if (parsedMessages.length >= 10) {
              parsedMessages.shift();
              localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(parsedMessages));
            }
          }
        }
        if (data.action_type === 'llm_response' && data.message) {
          message += data.message;
        }
      } catch (_err) {
        console.warn('Failed to parse LLM line:',_err+ line);
      }
    });

    return { query, message };
  };

  const handleSendMessage = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || !firebaseIdToken) return;

    const userMessage: Message = { type: 'user', content: trimmedPrompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');

    try {
      const response = await getLLMResponse(firebaseIdToken, trimmedPrompt, 'randomuu');
      const { query, message } = extractLLMMessage(response);

      if (query) {
        setLastQuery(query);
        localStorage.setItem('lastQuery', query);
        dispatch(setLatestQuery(query)); // ✅ Corrected name
      }

      const botMessage: Message = {
        type: 'bot',
        content: message || 'No response found.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching LLM response:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: '⚠️ Failed to get response. Please try again later.' },
      ]);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full lg:h-[92vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-lg font-medium">Chat</h2>
        <button
          onClick={() => setActivePanel(null)}
          className={`${theme.textMuted} hover:${theme.text} transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {lastQuery && (
            <div className="text-sm text-gray-400 border-l-4 border-emerald-400 pl-4 mb-4">
              <strong>Last Query:</strong> <code>{lastQuery}</code>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.type === 'bot'
                  ? `${theme.accent} text-white`
                  : 'bg-emerald-900 text-white self-end ml-auto'
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-neutral-800">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask me anything about stocks..."
              className={`w-full p-3 pr-12 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
