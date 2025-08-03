'use client';
import SidebarNav from '@/components/common/SideNavbar/SideBarNav';
import React, { useState } from 'react';
import themes from '@/components/tablet/theme';
import MainStockView from '@/components/common/midarea/MainStockView';
import RightPanel from '@/components/common/RightArea/RightPanel';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

const Page = () => {
  const [currentTab] = useState('explore');
  // Remove hardcoded activePanel - let Redux manage it
  const [queryBuilderQuery, setQueryBuilderQuery] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const activeTheme = themes['matte-black'];

  return (
    <>
      {/* Navbar - Fixed height on all screens */}
      <div className='h-[8vh] min-h-[60px]'>
        <DaisyNavbar />
      </div>

      {/* Main Content - Responsive layout */}
      <div className='flex flex-col lg:flex-row h-[92vh] w-full relative'>
        {/* Sidebar - Hidden on mobile, visible on larger screens */}
        <div className='hidden lg:block lg:w-[4%] min-w-[60px]'>
          <SidebarNav
            theme={activeTheme}
            currentTab={currentTab}
            activePanel=""
          />
        </div>

        {/* Main Table - Full width on mobile, 70% on desktop */}
        <div className='w-full lg:w-[70%] bg-black flex-1 min-h-0'>
          <MainStockView />
        </div>

        {/* Right Panel - Responsive overlay/panel */}
        <div className='hidden lg:block lg:w-[26%] min-w-[300px] bg-black'>
          <RightPanel
            queryBuilderQuery={queryBuilderQuery}
            setQueryBuilderQuery={setQueryBuilderQuery}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation - Always visible on mobile */}
      <div className='lg:hidden'>
        <SidebarNav
          theme={activeTheme}
          currentTab={currentTab}
          activePanel=""
        />
      </div>

      {/* Mobile/Tablet Right Panel Overlay */}
      <div className='lg:hidden'>
        <RightPanel
          queryBuilderQuery={queryBuilderQuery}
          setQueryBuilderQuery={setQueryBuilderQuery}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </>
  );
};

export default Page;
