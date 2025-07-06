'use client';
import React from 'react';

const LeftDrawerOne = () => {
  return (
    <div className="drawer z-50 fixed lg:hidden">
      <input id="left-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="left-drawer" className="btn btn-primary m-2">📂 Open Left</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="left-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <li><a>Dashboard</a></li>
          <li><a>Watchlist</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawerOne;
