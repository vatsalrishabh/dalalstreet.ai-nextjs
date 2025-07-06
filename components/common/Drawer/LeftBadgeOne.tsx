'use client';

import React from 'react';

const LeftBadgeOne = () => {
  return (
    <div className="drawer">
      <input id="left-drawer-one" type="checkbox" className="drawer-toggle" />

      {/* Toggle Button - Left Center */}
      <div className="drawer-content">
       <label
          htmlFor="left-drawer-one"
          className="fixed top-1/2 left-0 z-50 transform -translate-y-1/2 h-14 w-6 min-h-0 px-0 rounded-r-lg bg-black/70 hover:bg-black/80 transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
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
        <label htmlFor="left-drawer-one" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <li><a className="btn btn-ghost">Dashboard</a></li>
          <li><a className="btn btn-ghost">Stocks</a></li>
          <li><a className="btn btn-ghost">News</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBadgeOne;
