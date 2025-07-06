'use client';
import React from 'react';

const RightDrawerOne = () => {
  return (
    <div className="drawer drawer-end z-50 fixed md:block">
      <input id="right-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="right-drawer" className="btn btn-accent m-2">⚙️ Open Right</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="right-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <li><a>Settings</a></li>
          <li><a>Preferences</a></li>
        </ul>
      </div>
    </div>
  );
};

export default RightDrawerOne;
