'use client';
import SidebarNav from '@/components/common/SideNavbar/SideBarNav';
import React, { useState } from 'react';
import themes from '@/components/tablet/theme';
import MainStockView from '@/components/common/midarea/MainStockView';
import RightPanel from '@/components/common/RightArea/RightPanel';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

const Page = () => {
  const [currentTab] = useState('explore');
  const [activePanel] = useState<string | null>('screener');

  const [queryBuilderQuery, setQueryBuilderQuery] = useState<Record<string, unknown>>({});
const [filters, setFilters] = useState<Record<string, unknown>>({});
;

  const activeTheme = themes['matte-black'];

  return (
    <>
      <div className='h-[8vh]'>
        <DaisyNavbar />
      </div>

      <div className='lg:flex sm:block lg:h-[92vh] w-full'>
        {/* Sidebar */}
        <div className='lg:w-[4%]'>
          <SidebarNav
            theme={activeTheme}
            currentTab={currentTab}
            activePanel={activePanel || ''}
          />
        </div>

        {/* Main Table */}
        <div className='w-[70%] bg-black'>
          <MainStockView />
        </div>

        {/* Right Panel */}
        <div className='w-[26%] bg-black'>
          <RightPanel
            queryBuilderQuery={queryBuilderQuery}
            setQueryBuilderQuery={setQueryBuilderQuery}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
