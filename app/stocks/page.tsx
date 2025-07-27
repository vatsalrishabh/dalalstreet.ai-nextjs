"use client";
import SidebarNav from '@/components/common/SideNavbar/SideBarNav';
import React, { useState } from 'react';
import themes from '@/components/tablet/theme';
import MainStockView from '@/components/common/midarea/MainStockView';
import RightPanel from '@/components/common/RightArea/RightPanel';
// import { useDispatch } from 'react-redux';
// import { setActivePanel as setActivePanelRedux } from '@/store/redux/slices/uiSlice';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

const Page = () => {
  const [currentTab ] = useState('explore');
 const [activePanel] = useState<string | null>('screener');

  // const dispatch = useDispatch();

const [queryBuilderQuery, setQueryBuilderQuery] = useState<Record<string, unknown> | null>(null);
const [filters, setFilters] = useState<Record<string, unknown>[]>([]);


  const activeTheme = themes['matte-black'];

  // const togglePanel = (panel: string) => {
  //   const newPanel = panel === activePanel ? null : panel;
  //   setActivePanel(newPanel);
  //   dispatch(setActivePanelRedux(newPanel));
  // };

  return (
    <>
    <div className='h-[8vh]'>
<DaisyNavbar/>
    </div>
   
    <div className='lg:flex sm:block lg:h-[92vh] w-full'>
      {/* 1. SidebarNav */}
       <div className='lg:w-[4%]'>
              <SidebarNav
        theme={activeTheme}
        currentTab={currentTab}
        activePanel={activePanel || ''}
      
      />
      </div>
     

      {/* 2. Main Table Area */}
      <div className={`w-[70%] bg-black`}>
              <MainStockView />
      </div>


      {/* 3. Right Panel Area */}
      <div className={`w-[26%] bg-black`}>
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
