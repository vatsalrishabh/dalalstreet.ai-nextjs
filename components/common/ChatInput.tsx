'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setInput(query);
      // Automatically send after setting input
      onSend(query.trim());
    }
  }, [searchParams]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
      router.push(`/home/?query=${encodeURIComponent(input.trim())}`);
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
        id="autoSend"
      >
        {disabled ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
