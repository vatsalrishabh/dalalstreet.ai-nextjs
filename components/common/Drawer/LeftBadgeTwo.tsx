'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const LeftBadgeTwo = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleRunQuery = () => {
    setResult(`🟢 Executed:\n${query}`);
  };

  return (
    <div className="drawer hidden lg:block">
      <input id="left-drawer-two" type="checkbox" className="drawer-toggle" />

      {/* Toggle Button - Lower Left */}
      <div className="drawer-content">
        <label
          htmlFor="left-drawer-two"
          className="fixed top-[60%] left-0 z-50 transform -translate-y-1/2 h-14 w-3 px-0 rounded-r-lg bg-black/70 hover:bg-black/90 transition-colors duration-200 flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronRight className="w-4 h-5 text-primary drop-shadow" strokeWidth={2.5} />
        </label>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side z-40">
        <label htmlFor="left-drawer-two" aria-label="close sidebar" className="drawer-overlay" />
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-5 space-y-4">
          <h2 className="text-xl font-bold text-primary">🧠 SQL Query Chat</h2>

          <textarea
            className="textarea textarea-bordered w-full h-32 resize-none"
            placeholder="Write SQL query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleRunQuery}
            className="btn btn-primary btn-block gap-2"
          >
            ▶️ Run Query
          </button>

          <div className="bg-base-100 p-4 rounded-lg shadow-inner text-sm whitespace-pre-wrap min-h-[80px] border border-base-300">
            {result || '💬 Query results will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBadgeTwo;
