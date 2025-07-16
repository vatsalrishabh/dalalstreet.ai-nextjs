'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Trash2 } from 'lucide-react';
import { deleteScreen } from '@/services/screenService';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/redux/store';

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
  const formattedTime = new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const token = useSelector((state: RootState) => state.auth.token);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(screen_query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('❌ Failed to copy:', err);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      alert('⚠️ Please log in to delete screens.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this screen?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteScreen(token, screen_query);
      alert('✅ Screen deleted successfully!');
      if (onDelete) onDelete();
    } catch (err) {
      console.error('❌ Error deleting screen:', err);
      alert('Failed to delete screen. Check console.');
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
      <div className="card-body">
        <h2 className="card-title text-base-content">{title}</h2>
        <p className="text-sm text-base-content">{description}</p>

        {/* Query + Copy Button */}
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

        {/* Delete Button - Styled with Hot Color */}
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

        {/* Timestamp */}
        <div className="text-right mt-2 text-xs text-base-content/50 italic">
          📅 {formattedTime}
        </div>
      </div>
    </motion.div>
  );
}
