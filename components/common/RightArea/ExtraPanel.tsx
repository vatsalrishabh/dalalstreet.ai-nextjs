import React from 'react';
import { X } from 'lucide-react';

type ExtraPanelProps = {
  setActivePanel: (panel: string | null) => void;
  theme: {
    textMuted: string;
    text: string;
  };
};

const ExtraPanel: React.FC<ExtraPanelProps> = ({ setActivePanel, theme }) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between p-6 border-b border-gray-800">
      <h2 className="text-lg font-medium">Extra Panel</h2>
      <button
        onClick={() => setActivePanel(null)}
        className={`${theme.textMuted} hover:${theme.text} transition-colors`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 p-6 text-sm text-neutral-400">
      Add your extra panel logic here.
    </div>
  </div>
);

export default ExtraPanel;
