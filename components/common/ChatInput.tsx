'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: Props) => {
  const latestQuery = useSelector((state: RootState) => state.query.latestQuery);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const hasAutoSent = useRef(false); // ✅ prevent double send


  
  useEffect(() => {
    console.log('Latest Query from Redux:', latestQuery);
    const query = searchParams.get('query');

    if (query && !hasAutoSent.current) {
      setInput(query);
      hasAutoSent.current = true; // ✅ ensure this happens only once
    }
  }, [searchParams,latestQuery]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    router.push(`/home/?query=${encodeURIComponent(input.trim())}`);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
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
        onKeyDown={handleKeyDown}
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
