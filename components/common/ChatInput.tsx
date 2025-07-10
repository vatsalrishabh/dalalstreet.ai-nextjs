'use client';

import { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: Props) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="p-4 border-t bg-base-100 flex gap-2">
      <input
        type="text"
        placeholder="Ask something about stocks..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input input-bordered w-full"
        disabled={disabled}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="btn btn-primary"
      >
        {disabled ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
