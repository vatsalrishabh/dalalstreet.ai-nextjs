'use client';
// the main logic of the page is it displays table and chatbot side by side for laptop 
// for smartphone I will set the entire Laptop-view to hidden and display other componets coming from /smartphne folder instead
// this is done to make the page responsive and also to make it look good on laptop and
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';
import { useEffect, useRef, useState } from 'react';


import StockTable from '@/components/laptop/StockTable';
import ChatPage from '@/components/laptop/ChatPage';
// import Navbar from '@/components/common/Navbar/Navbar';
import LeftBadgeOne from '@/components/common/Drawer/LeftBadgeOne';
import LeftBadgeTwo from '@/components/common/Drawer/LeftBadgeTwo';

// import { dummyStocks } from '@/data/stocks.data';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/redux/store';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';
import Loader from '@/components/common/Loader';
import BottomTabNav from '@/components/smartphone/BottomTabNav';

export default function Dashboard() {
  // const theme = useSelector((state: RootState) => state.theme.mode);
  const firebaseIdToken = useSelector((state: RootState) => state.auth.token); // firebase 
  const { query, title, count } = useSelector((state: RootState) => state.table);
  const rightPanelRef = useRef<ImperativePanelHandle | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  const toggleChatPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.resize(chatOpen ? 0 : 30);
      setChatOpen(!chatOpen);
    }
  };
useEffect(() => {
  console.log("Firebase ID Token:", firebaseIdToken);
}, [firebaseIdToken]);

if (!firebaseIdToken) {
  return   <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>;
}


  return (
    <div  className="Main-all-App">
      <DaisyNavbar/>       {/* universal navbar for all devices */}
      <LeftBadgeOne />
      <LeftBadgeTwo />

{/* the laptop view is  below and smarpthone view is below the laptop view  */}
      <div className="Laptop-view lg:block hidden lg:h-[91vh] w-screen overflow-hidden bg-base-100 text-base-content">
        <main className="h-full w-full">
          <PanelGroup direction="horizontal" className="h-full w-full">
            {/* Left Panel */}
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full bg-base-200 border-r border-base-300 rounded-l-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4 text-base-content">
                  Stock Table
                </h2>
              {firebaseIdToken && (
  <StockTable
    firebaseIdToken={firebaseIdToken}
    query={query}
    title={title}
    count={count}
  />
)}


              </div>
            </Panel>

            {/* Toggle Icon Centered */}
            <div className="flex flex-col justify-center items-center bg-base-200">
              <button
                onClick={toggleChatPanel}
                className="p-2 rounded-full text-base-content hover:text-primary transition-colors"
                title={chatOpen ? 'Hide Chat' : 'Show Chat'}
              >
                {chatOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Resize Handle */}
            <PanelResizeHandle>
              <div className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            </PanelResizeHandle>

            {/* Right Panel */}
           {/* Right Panel */}
<Panel ref={rightPanelRef} defaultSize={30} minSize={0}>
  <div className="h-full bg-base-200 rounded-r-xl shadow-inner ">
    <h2 className="text-xl font-semibold mb-4 text-base-content">
      💬 Chat Assistant
    </h2>
    {firebaseIdToken && (
      <ChatPage firebaseIdToken={firebaseIdToken} />
    )}
  </div>
</Panel>

          </PanelGroup>
        </main>
      </div>
{/* the laptop view is above, below is only smarpthone view */}
<BottomTabNav/>

{firebaseIdToken && (
  <StockTable
    firebaseIdToken={firebaseIdToken}
    query={query}
    title={title}
    count={count}
  />
)}

 <div className="h-full bg-base-200 rounded-r-xl shadow-inner ">
    <h2 className="text-xl font-semibold mb-4 text-base-content">
      💬 Chat Assistant
    </h2>
    {firebaseIdToken && (
      <ChatPage firebaseIdToken={firebaseIdToken} />
    )}
  </div>


    </div>
  );
}
