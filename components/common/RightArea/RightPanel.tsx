import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/redux/store';
import ResizableDivider from '@/components/common/RightArea/ResizableDivider';
import QueryPanel from './QueryPanel';
// import FilterPanel from './FilterPanel';
import ChatPanel from './ChatPanel';
// import ExtraPanel from './ExtraPanel';
import themes from '@/components/tablet/theme';
import { setActivePanel } from '@/store/redux/slices/uiSlice';

// Replace these with actual types if available
type QueryBuilderQuery = string;

type RightPanelProps = {
  queryBuilderQuery: QueryBuilderQuery;
  setQueryBuilderQuery: (query: QueryBuilderQuery) => void;
    filters: Record<string, unknown>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  // Removed filters and setFilters as they are unused
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
      <ResizableDivider />
      <div
        className={`${currentTheme?.surface ?? ''} ${currentTheme?.border ?? ''} border-l lg:h-[92vh] overflow-hidden flex-shrink-0`}
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

        {/* Uncomment only if you use FilterPanel */}
        {/* {activePanel === 'filters' && (
          <FilterPanel filters={filters} setFilters={setFilters} />
        )} */}

        {activePanel === 'chat' && (
          <ChatPanel
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
            activePanel={activePanel}
          />
        )}

        {/* Uncomment if using ExtraPanel */}
        {/* {activePanel === 'screener' && (
          <ExtraPanel
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
            activePanel={activePanel}
          />
        )} */}
      </div>
    </>
  );
};

export default RightPanel;
