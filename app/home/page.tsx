'use client';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import StockTable from '@/components/laptop/StockTable';
import ChatPage from '@/components/laptop/ChatPage';
import LeftBadgeOne from '@/components/common/Drawer/LeftBadgeOne';
import LeftBadgeTwo from '@/components/common/Drawer/LeftBadgeTwo';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';
import BottomTabNav from '@/components/smartphone/BottomTabNav';
import SavedScreens from '@/components/common/Screens/SavedScreens';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/redux/store';
import { setScreen } from '@/store/redux/slices/screenSlice';
import { ArrowLeft } from 'lucide-react';

export default function MainResponsivePage() {
  const firebaseIdToken = useSelector((state: RootState) => state.auth.token);
  const { query, title, count } = useSelector((state: RootState) => state.table);
  const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);
  const dispatch = useDispatch();

  const rightPanelRef = useRef<ImperativePanelHandle | null>(null);
  const [chatOpen, setChatOpen] = useState(true);

  const toggleChatPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.resize(chatOpen ? 0 : 30);
      setChatOpen(!chatOpen);
    }
  };

  useEffect(() => {
    console.log('Firebase ID Token:', firebaseIdToken);
  }, [firebaseIdToken]);

  return (
    <div className="Main-all-App min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      {currentScreen !== 'chatbot' && <DaisyNavbar />}

      {/* Drawer Badges */}
      <LeftBadgeOne />
      <LeftBadgeTwo />

      {/* Laptop View */}
      <div className="Laptop-view hidden lg:block lg:h-[91vh] w-full overflow-hidden">
        <main className="h-full w-full">
          <PanelGroup direction="horizontal" className="h-full w-full">
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full bg-base-200 border-r border-base-300 rounded-l-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4">📈 Stock Table</h2>
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

            <div className="flex flex-col justify-center items-center bg-base-200 px-2">
              <div
                className="tooltip tooltip-right"
                data-tip={chatOpen ? 'Hide Chat' : 'Show Chat'}
              >
                <button
                  onClick={toggleChatPanel}
                  className="p-2 rounded-full bg-base-100 shadow-md hover:bg-primary hover:text-white transition-colors"
                  title="Toggle Chat"
                >
                  {chatOpen ? (
                    <ArrowLeft className="w-5 h-5" />
                  ) : (
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  )}
                </button>
              </div>
            </div>

            <PanelResizeHandle>
              <div className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            </PanelResizeHandle>

            <Panel ref={rightPanelRef} defaultSize={30} minSize={0}>
              <div className="h-full bg-base-200 rounded-r-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4">💬 Chat Assistant</h2>
                {firebaseIdToken && <ChatPage firebaseIdToken={firebaseIdToken} />}
              </div>
            </Panel>
          </PanelGroup>
        </main>
      </div>

      {/* Smartphone View */}
      <div className="lg:hidden px-4 py-4 min-h-screen space-y-6">
        {currentScreen === 'charts' && firebaseIdToken && (
          <StockTable
            firebaseIdToken={firebaseIdToken}
            query={query}
            title={title}
            count={count}
          />
        )}

        {currentScreen === 'chatbot' && firebaseIdToken && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-base-200 rounded-xl shadow-inner p-4"
          >
            <div className="sticky top-0 z-10 bg-base-200 py-2">
              <div
                onClick={() => dispatch(setScreen('charts'))}
                className="flex items-center text-sm cursor-pointer text-primary hover:underline"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Charts
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-4">💬 Chat Assistant</h2>
            <ChatPage firebaseIdToken={firebaseIdToken} />
          </motion.div>
        )}

        {currentScreen === 'screens' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-base-200 rounded-xl shadow-xl p-4"
          >
            <SavedScreens />
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'chatbot' && <BottomTabNav />}
    </div>
  );
}
