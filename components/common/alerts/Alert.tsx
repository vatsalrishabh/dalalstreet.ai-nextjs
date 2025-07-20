import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  statusCode?: number;
}

const Alert: React.FC<AlertProps> = ({
  show,
  message,
  type = 'success',
  statusCode,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            role="alert"
            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-lg text-sm font-medium text-white ${
              type === 'success'
                ? 'bg-green-600'
                : type === 'error'
                ? 'bg-red-600'
                : 'bg-blue-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 stroke-current text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {statusCode && <strong>{statusCode}: </strong>}
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
