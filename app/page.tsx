'use client';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

import StockTable from '@/components/laptop/StockTable';
import ChatPage from '@/components/laptop/ChatPage';
import Navbar from '@/components/common/Navbar/Navbar';

import { dummyStocks } from '@/data/stocks.data';
import LeftBadgeOne from '@/components/common/Drawer/LeftBadgeOne';
import LeftBadgeTwo from '@/components/common/Drawer/LeftBadgeTwo';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <LeftBadgeOne/>
      <LeftBadgeTwo/>

      <div className="h-screen w-screen overflow-hidden bg-base-100 text-base-content">
        {/* Main Content Panel */}
        <main className="h-full w-full">
          <PanelGroup direction="horizontal" className="h-full w-full">
            {/* Left Panel */}
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full bg-base-200 border-r border-base-300 rounded-l-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4 text-base-content">
                   Stock Table
                </h2>
                <StockTable
                  title="Top Performing Stocks"
                  count={dummyStocks.length}
                />
              </div>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle>
              <div className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            </PanelResizeHandle>

            {/* Right Panel */}
            <Panel defaultSize={30} minSize={20}>
              <div className="h-full bg-base-200 rounded-r-xl shadow-inner p-4">
                <h2 className="text-xl font-semibold mb-4 text-base-content">
                  💬 Chat Assistant
                </h2>
                <ChatPage />
              </div>
            </Panel>
          </PanelGroup>
        </main>
      </div>
    </>
  );
}
