'use client';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';
import { useEffect, useRef, useState } from 'react';

import StockTable from '@/components/laptop/StockTable';
import ChatPage from '@/components/laptop/ChatPage';
import LeftBadgeOne from '@/components/common/Drawer/LeftBadgeOne';
import LeftBadgeTwo from '@/components/common/Drawer/LeftBadgeTwo';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';
import BottomTabNav from '@/components/smartphone/BottomTabNav';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/redux/store';
import { setScreen } from '@/store/redux/slices/screenSlice';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import SavedScreens from '@/components/common/Screens/SavedScreens';

export default function MainResponsivePage() {
  const firebaseIdToken = useSelector((state: RootState) => state.auth.token);
  const { query, title, count } = useSelector((state: RootState) => state.table);


  const rightPanelRef = useRef<ImperativePanelHandle | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

    const dispatch = useDispatch();
  const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);

  const isActive = (screen: string) => currentScreen === screen;

  const toggleChatPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.resize(chatOpen ? 0 : 30);
      setChatOpen(!chatOpen);
    }
  };

  useEffect(() => {
    console.log("Firebase ID Token:", firebaseIdToken);
  }, [firebaseIdToken]);

  return (
    <div className="Main-all-App">
       {
        !(currentScreen === 'chatbot') && (
         <DaisyNavbar />
        )
      }
  
      <LeftBadgeOne />
      <LeftBadgeTwo />

      {/* Laptop View */}
      <div className="Laptop-view lg:block hidden lg:h-[91vh] w-screen overflow-hidden bg-base-100 text-base-content">
        <main className="h-full w-full">
          <PanelGroup direction="horizontal" className="h-full w-full">
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full bg-base-200 border-r border-base-300 rounded-l-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4 text-base-content">Stock Table</h2>
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

            <div className="flex flex-col justify-center items-center bg-base-200">
              <button
                onClick={toggleChatPanel}
                className="p-2 rounded-full text-base-content hover:text-primary transition-colors"
                title={chatOpen ? 'Hide Chat' : 'Show Chat'}
              >
                {chatOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </button>
            </div>

            <PanelResizeHandle>
              <div className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            </PanelResizeHandle>

            <Panel ref={rightPanelRef} defaultSize={30} minSize={0}>
              <div className="h-full bg-base-200 rounded-r-xl shadow-inner">
                <h2 className="text-xl font-semibold mb-4 text-base-content">💬 Chat Assistant</h2>
                {firebaseIdToken && (
                  <ChatPage firebaseIdToken={firebaseIdToken} />
                )}
              </div>
            </Panel>
          </PanelGroup>
        </main>
      </div>

      {/* Smartphone View */}
      <div className="lg:hidden px-4 py-2">
        {currentScreen === 'charts' && firebaseIdToken && (
          <StockTable
            firebaseIdToken={firebaseIdToken}
            query={query}
            title={title}
            count={count}
          />
        )}

{currentScreen === 'chatbot' && firebaseIdToken && (
  <div className="bg-base-200 rounded-xl shadow-inner p-4 pb-8">
    {/* Sticky Back Icon Navbar */}
    <div className="sticky top-0 z-10 bg-base-200 py-2">
      <div
        onClick={() => dispatch(setScreen('charts'))}
        className="flex items-center text-sm cursor-pointer text-primary hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Charts
      </div>
    </div>

    {/* Content Below */}
    <h2 className="text-xl font-semibold mt-4 mb-4 text-base-content">💬 Chat Assistant</h2>
    <ChatPage firebaseIdToken={firebaseIdToken} />
  </div>
)}


        {currentScreen === 'screens' && (
          <div className="bg-base-200 rounded-xl shadow-inner">
    <SavedScreens />
  </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {
        !(currentScreen === 'chatbot') && (
          <BottomTabNav />
        )
      }
     
    </div>
  );
}
