'use client';

import { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
}

const ChatInput = ({ onSend }: Props) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
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
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} className="btn btn-primary">Send</button>
    </div>
  );
};

export default ChatInput;
