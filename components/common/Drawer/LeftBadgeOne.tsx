'use client';

import React from 'react';
import { ChevronRight  } from 'lucide-react';

const LeftBadgeOne = () => {
  return (
    <div className="drawer hidden lg:block">
      <input id="left-drawer-one" type="checkbox" className="drawer-toggle" />

      {/* Toggle Button - Left Center */}
      <div className="drawer-content">
        <label
          htmlFor="left-drawer-one"
          className="fixed top-1/2 left-0 z-50 transform -translate-y-1/2 h-14 w-3 px-0 rounded-r-lg bg-black/70 hover:bg-black/90 transition-colors duration-200 flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronRight  className="h-5 w-4 text-primary drop-shadow" strokeWidth={2.5} />
        </label>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side z-40">
        <label htmlFor="left-drawer-one" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <li><a className="btn btn-ghost text-left">📊 Dashboard</a></li>
          <li><a className="btn btn-ghost text-left">📈 Stocks</a></li>
          <li><a className="btn btn-ghost text-left">📰 News</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBadgeOne;
