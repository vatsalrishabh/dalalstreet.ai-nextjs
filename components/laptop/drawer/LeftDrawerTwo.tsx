'use client';
import React from 'react';

const LeftDrawerTwo = () => {
  return (
    <div className="hidden lg:block fixed top-0 left-0 w-64 h-full bg-base-200 shadow-md z-40 p-4">
      <h2 className="font-bold text-lg mb-4">📁 Left Drawer Two</h2>
      <ul className="menu">
        <li><a>Filters</a></li>
        <li><a>Portfolio</a></li>
      </ul>
    </div>
  );
};

export default LeftDrawerTwo;
