'use client';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

import StockTable from '@/components/laptop/StockTable';
import ChatPage from '@/components/laptop/ChatPage';
import Navbar from '@/components/common/Navbar/Navbar';

import LeftDrawerOne from '@/components/laptop/drawer/LeftDrawerOne';
import LeftDrawerTwo from '@/components/laptop/drawer/LeftDrawerTwo';
import RightDrawerOne from '@/components/laptop/drawer/RightDrawerOne';
import { dummyStocks } from '@/data/stocks.data';

export default function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className=" h-screen w-screen overflow-hidden  text-base-content ">
      {/* Fixed Drawers */}
      {/* <LeftDrawerOne />
      <LeftDrawerTwo />
      <RightDrawerOne /> */}

      {/* Main Panel */}
      <main className="h-full bottom-0 w-full">
    <PanelGroup direction="horizontal" className="h-full w-full">
  <Panel defaultSize={70} minSize={20}>
    <div className="h-full border-r border-base-300 bg-base-200 rounded-l-xl shadow-inner p-4">
      <h2 className="text-xl font-semibold mb-4">📊 Stock Table</h2>
 <StockTable title="Top Performing Stocks" count={dummyStocks.length} />

    </div>
  </Panel>

  <PanelResizeHandle>
    <div className="w-2 bg-base-300 hover:bg-primary cursor-col-resize transition-all" />
  </PanelResizeHandle>

  <Panel defaultSize={30} minSize={20}>
    <div className="h-full bg-base-200 rounded-r-xl shadow-inner p-4">
      <h2 className="text-xl font-semibold mb-4">💬 Chat Assistant</h2>
      <ChatPage />
    </div>
  </Panel>
</PanelGroup>

      </main>
    </div>

    </>
  );
}
