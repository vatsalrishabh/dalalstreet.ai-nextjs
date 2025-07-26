"use client";
import SidebarNav from '@/components/common/SideNavbar/SideBarNav';
import React, { useState } from 'react';
import themes from '@/components/tablet/theme';
import MainStockView from '@/components/common/midarea/MainStockView';
import RightPanel from '@/components/common/RightArea/RightPanel';
import { useDispatch } from 'react-redux';
import { setActivePanel as setActivePanelRedux } from '@/store/redux/slices/uiSlice';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

const Page = () => {
  const [currentTab, setCurrentTab] = useState('explore');
  const [activePanel, setActivePanel] = useState<string | null>('screener');
  const dispatch = useDispatch();

  const [queryBuilderQuery, setQueryBuilderQuery] = useState<any>(null);
  const [filters, setFilters] = useState<any>([]);

  const activeTheme = themes['matte-black'];

  const togglePanel = (panel: string) => {
    const newPanel = panel === activePanel ? null : panel;
    setActivePanel(newPanel);
    dispatch(setActivePanelRedux(newPanel));
  };

  return (
    <>
   <DaisyNavbar/>
    <div className='lg:flex sm:block h-screen'>
      {/* 1. SidebarNav */}
      <SidebarNav
        theme={activeTheme}
        currentTab={currentTab}
        activePanel={activePanel || ''}
        togglePanel={togglePanel}
      />

      {/* 2. Main Table Area */}
      <MainStockView />

      {/* 3. Right Panel Area */}
      <RightPanel
        queryBuilderQuery={queryBuilderQuery}
        setQueryBuilderQuery={setQueryBuilderQuery}
        filters={filters}
        setFilters={setFilters}
        setActivePanel={setActivePanel}
        activePanel={activePanel}
      />
    </div>

     </>
  );
};

export default Page;
