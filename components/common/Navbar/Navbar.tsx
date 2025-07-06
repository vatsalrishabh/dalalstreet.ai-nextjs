'use client';

import Link from 'next/link';
import React from 'react';
import SignupModal from '../Signup/SignupModal';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-primary">
         DalalStreet.ai
        </Link>
      </div>

      {/* Middle - Nav Menu (desktop only) */}
      <div className="hidden lg:flex gap-2 items-center">
        <Link href="/" className="btn btn-ghost btn-sm rounded-btn">Home</Link>
        <Link href="/screens" className="btn btn-ghost btn-sm rounded-btn">Screens</Link>
        <Link href="/tools" className="btn btn-ghost btn-sm rounded-btn">Tools</Link>

        {/* Dropdown: Create a stock screen */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn">
            Create a stock screen
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 z-50">
            <li>
              <Link href="/queries">Run queries on 10 years of financial data</Link>
            </li>
            <li>
              <Link href="/premium">Premium features</Link>
            </li>
          </ul>
        </div>

        {/* Dropdown: Commodity Prices */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn">
            Commodity Prices
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 z-50">
            <li>
              <Link href="/commodities">Analyze price trends for 10,000+ commodities</Link>
            </li>
          </ul>
        </div>

        {/* Dropdown: Shareholders */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn">
            Search shareholders
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 z-50">
            <li>
              <Link href="/shareholders">Find all companies where a person owns more than 1%</Link>
            </li>
          </ul>
        </div>

        <Link href="/announcements" className="btn btn-ghost btn-sm rounded-btn">
          Company Announcements
        </Link>
      </div>

      {/* Right - Auth / CTA */}
      <div className="flex-none gap-2">
        <Link href="/premium" className="btn btn-outline btn-sm hidden md:inline-flex">
          Upgrade to Premium
        </Link>
        <Link href="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>
        <Link href="/register" className="btn btn-primary btn-sm">
          Get free account
        </Link>
      </div>
      <SignupModal/>
    </div>
  );
};

export default Navbar;
