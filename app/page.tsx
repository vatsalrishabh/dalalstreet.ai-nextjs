"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useRef, useState } from "react";

import StockTable from "@/components/laptop/StockTable";
import ChatPage from "@/components/laptop/ChatPage";
import Navbar from "@/components/common/Navbar/Navbar";

import { dummyStocks } from "@/data/stocks.data";
import LeftBadgeOne from "@/components/common/Drawer/LeftBadgeOne";
import LeftBadgeTwo from "@/components/common/Drawer/LeftBadgeTwo";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/redux/store";

export default function Dashboard() {
const theme = useSelector((state:RootState) => state.theme.mode);
const dispatch = useDispatch();

  const rightPanelRef = useRef<any>(null);
  const [chatOpen, setChatOpen] = useState(true);

  const toggleChatPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.resize(chatOpen ? 0 : 30);
      setChatOpen(!chatOpen);
    }
  };



  return (
    <div data-theme={theme}  className="Main-all-App">   {/* <-----Tailwind UI theme is being rendered here */}
   
      <Navbar />
      <LeftBadgeOne />
      <LeftBadgeTwo />

      <div className="h-screen w-screen overflow-hidden bg-base-100 text-base-content">
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

            {/* Toggle Icon Centered */}
            <div className="flex flex-col justify-center items-center bg-base-200">
              <button
                onClick={toggleChatPanel}
                className="p- rounded-full text-base-content hover:text-primary transition-colors"
                title={chatOpen ? "Hide Chat" : "Show Chat"}
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
            <Panel ref={rightPanelRef} defaultSize={30} minSize={0}>
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
    </div>
  );
}
