import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/redux/store';
import ResizableDivider from '@/components/common/RightArea/ResizableDivider';
import QueryPanel from './QueryPanel';
import ChatPanel from './ChatPanel';
import themes from '@/components/tablet/theme';
import { setActivePanel } from '@/store/redux/slices/uiSlice';

type QueryBuilderQuery = string;

type RightPanelProps = {
  queryBuilderQuery: QueryBuilderQuery;
  setQueryBuilderQuery: (query: QueryBuilderQuery) => void;
  filters: Record<string, unknown>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

const RightPanel: React.FC<RightPanelProps> = ({
  queryBuilderQuery,
  setQueryBuilderQuery,
}) => {
  const dispatch = useDispatch();
  const { activePanel, panelWidth } = useSelector((state: RootState) => state.ui);

  if (!activePanel) return null;

  const currentTheme = themes['matte-black'];

  const handleSetActivePanel = (panel: string | null) => {
    dispatch(setActivePanel(panel));
  };

  return (
    <>
      {/* Desktop Resizable Divider */}
      <div className="hidden lg:block">
        <ResizableDivider />
      </div>

      {/* Mobile/Tablet Overlay Panel */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-black border-l border-gray-700 shadow-2xl">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold capitalize">{activePanel}</h3>
            <button
              onClick={() => handleSetActivePanel(null)}
              className="text-gray-400 hover:text-white p-2"
            >
              ✕
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            {activePanel === 'query' && (
              <QueryPanel
                queryBuilderQuery={queryBuilderQuery}
                setQueryBuilderQuery={setQueryBuilderQuery}
                setActivePanel={handleSetActivePanel}
                theme={currentTheme}
              />
            )}
            {activePanel === 'chat' && (
              <ChatPanel
                setActivePanel={handleSetActivePanel}
                theme={currentTheme}
                activePanel={activePanel}
              />
            )}
            {activePanel === 'screener' && (
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Stock Screener</h3>
                <p className="text-gray-400">Screener functionality coming soon...</p>
              </div>
            )}
            {activePanel === 'filters' && (
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <p className="text-gray-400">Filter functionality coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Fixed Panel */}
      <div
        className={`hidden lg:block ${currentTheme?.surface ?? ''} ${currentTheme?.border ?? ''} border-l h-[92vh] overflow-hidden flex-shrink-0`}
        style={{ width: `${panelWidth}px` }}
      >
        {activePanel === 'query' && (
          <QueryPanel
            queryBuilderQuery={queryBuilderQuery}
            setQueryBuilderQuery={setQueryBuilderQuery}
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
          />
        )}
        {activePanel === 'chat' && (
          <ChatPanel
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
            activePanel={activePanel}
          />
        )}
        {activePanel === 'screener' && (
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-4">Stock Screener</h3>
            <p className="text-gray-400">Screener functionality coming soon...</p>
          </div>
        )}
        {activePanel === 'filters' && (
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <p className="text-gray-400">Filter functionality coming soon...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RightPanel;
