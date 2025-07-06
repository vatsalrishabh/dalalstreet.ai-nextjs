'use client';

import React, { useState } from 'react';

const LeftBadgeTwo = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleRunQuery = () => {
    setResult(`🟢 Executed:\n${query}`);
  };

  return (
    <div className="drawer">
      <input id="left-drawer-two" type="checkbox" className="drawer-toggle" />

      {/* Toggle Button - Lower Left */}
      <div className="drawer-content">
        <label
          htmlFor="left-drawer-two"
          className="fixed top-3/5 left-0 z-50 transform -translate-y-1/2 h-14 w-6 min-h-0 px-0 rounded-r-lg bg-black/70 hover:bg-black/80 transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-4 text-primary drop-shadow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </label>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="left-drawer-two" aria-label="close sidebar" className="drawer-overlay" />
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
          <h2 className="text-xl font-bold">🧠 SQL Query Chat</h2>
          <textarea
            className="textarea textarea-bordered w-full h-32 resize-none"
            placeholder="Write SQL query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleRunQuery} className="btn btn-primary w-full">▶️ Run Query</button>
          <div className="bg-base-100 p-3 rounded-box shadow-inner text-sm whitespace-pre-wrap min-h-[80px]">
            {result || 'Query results will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBadgeTwo;
