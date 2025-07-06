'use client';

import Link from 'next/link';
import React from 'react';
import SignupModal from '../Signup/SignupModal';
import Logo from '@/components/logo/Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-semibold text-primary">
          <Logo />
          <span className="hidden sm:inline-block tracking-tight">DalalStreet AI</span>
        </Link>
      </div>

      {/* Middle - Nav Menu */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Main Links */}
        <Link href="/" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">Home</Link>
        <Link href="/screens" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">Screens</Link>
        <Link href="/tools" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">Tools</Link>

        {/* Group: Create Stock Screen */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">
            Create Screen
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-72">
            <li>
              <Link href="/queries">
                <div>
                  <span className="font-medium text-base">📊 Run Queries</span>
                  <p className="text-sm text-base-content/60">
                    Explore 10 years of financials
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/premium">
                <div>
                  <span className="font-medium text-base">💎 Premium Features</span>
                  <p className="text-sm text-base-content/60">
                    Screeners, alerts & exports
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Group: Commodity Prices */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">
            Commodities
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-72">
            <li>
              <Link href="/commodities">
                <div>
                  <span className="font-medium text-base">📈 Price Trends</span>
                  <p className="text-sm text-base-content/60">
                    10,000+ commodities data
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Group: Shareholders */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">
            Shareholders
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-72">
            <li>
              <Link href="/shareholders">
                <div>
                  <span className="font-medium text-base">🔍 Ownership Search</span>
                  <p className="text-sm text-base-content/60">
                    Find people holding {`>`}1%
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Announcements */}
        <Link href="/announcements" className="btn btn-ghost btn-sm rounded-btn text-base font-normal">
          Announcements
        </Link>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/premium"
          className="btn btn-sm btn-outline btn-accent hidden md:inline-flex"
        >
          🚀 Upgrade
        </Link>
        <Link
          href="/login"
          className="btn btn-sm btn-ghost text-base-content hover:text-primary"
        >
          Login
        </Link>
      </div>

      <SignupModal />
    </nav>
  );
};

export default Navbar;
