'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Trash2 } from 'lucide-react';
import { deleteScreen } from '@/services/screenService';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/redux/store';
import { setStockParams } from '@/store/redux/slices/tableSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getLLMResponse } from '@/services/llmServices';
import { setLatestQuery } from '@/store/redux/slices/querySlice';

interface ScreenProps {
  title: string;
  description: string;
  screen_query: string;
  timestamp: string;
  onDelete?: () => void;
}

export default function Screen({
  title,
  description,
  screen_query,
  timestamp,
  onDelete,
}: ScreenProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const formattedTime = new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const CHAT_STORAGE_KEY = 'chatMessages';

  const extractLLMMessage = (response: string) => {
    const lines = response.split('\n').filter(Boolean);
    let query = '';

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
      } catch (_err) {
        console.warn('Failed to parse LLM line:', line);
      }
    });

    return { query };
  };

  const handleQueryClick = async () => {
    dispatch(
      setStockParams({
        title,
        query: screen_query,
        count: 30,
      })
    );

    const firebaseIdToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!firebaseIdToken) return;

    try {
      const response = await getLLMResponse(firebaseIdToken, screen_query, 'rajsppuii99');
      const { query } = extractLLMMessage(response);

      if (query) {
        localStorage.setItem('lastQuery', query);
        dispatch(setLatestQuery(query));
      }
    } catch {
      // You may log the error here or show a toast
    }

    router.push('/stocks');
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handler
    try {
      await navigator.clipboard.writeText(screen_query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('❌ Failed to copy:', err);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handler
    if (!token) {
      toast.error('Please log in to delete screens.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this screen?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteScreen(token, screen_query);
      toast.success('Screen deleted successfully!');
      if (onDelete) onDelete();
    } catch (err) {
      console.error('❌ Error deleting screen:', err);
      toast.error('Failed to delete screen. Check console.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-xl transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-body" onClick={handleQueryClick}>
        <h2 className="card-title text-base-content">{title}</h2>
        <p className="text-sm text-base-content">{description}</p>

        <div className="mt-3 px-3 py-2 bg-base-200 rounded-md text-xs font-mono text-base-content flex justify-between items-center gap-2">
          <span className="break-all">{screen_query}</span>
          <button
            onClick={handleCopy}
            className="tooltip tooltip-left text-primary hover:text-primary-focus"
            data-tip="Copy Query"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            title="Delete Screen"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>

        <div className="text-right mt-2 text-xs text-base-content/50 italic">
          📅 {formattedTime}
        </div>
      </div>
    </motion.div>
  );
}
