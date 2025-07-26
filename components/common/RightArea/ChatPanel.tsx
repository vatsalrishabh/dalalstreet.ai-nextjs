import React from 'react';
import { X, TrendingUp } from 'lucide-react';

type ChatPanelProps = {
  activePanel: string | null;
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

const ChatPanel: React.FC<ChatPanelProps> = ({ activePanel, setActivePanel, theme }) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between p-6 border-b border-gray-800">
      <h2 className="text-lg font-medium">Chat</h2>
      <button
        onClick={() => setActivePanel(null)}
        className={`${theme.textMuted} hover:${theme.text} transition-colors`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {[
          "I can help you analyze stocks and create custom screeners. What would you like to know?",
          "I understand you're looking for analysis. Let me help you with that.",
          "You can ask me about market trends, stock analysis, or help with building custom screening criteria.",
          "I can also help you understand financial ratios, sector analysis, and investment strategies.",
        ].map((text, idx) => (
          <div key={idx} className={`${theme.accent} p-4 rounded-xl`}>
            <p className="text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-neutral-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask me anything about stocks..."
            className={`w-full p-3 pr-12 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors">
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ChatPanel;
