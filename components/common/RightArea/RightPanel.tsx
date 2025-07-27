import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/redux/store';
import ResizableDivider from '@/components/common/RightArea/ResizableDivider';
import QueryPanel from './QueryPanel';
import FilterPanel from './FilterPanel';
import ChatPanel from './ChatPanel';
import ExtraPanel from './ExtraPanel';
import theme from '@/components/tablet/theme';
import { setActivePanel  } from '@/store/redux/slices/uiSlice';

type RightPanelProps = {
  queryBuilderQuery: any;
  setQueryBuilderQuery: (query: any) => void;
  filters: any;
  setFilters: (filters: any) => void;
};

const RightPanel: React.FC<RightPanelProps> = ({
  queryBuilderQuery,
  setQueryBuilderQuery,
  filters,
  setFilters,
}) => {
  const dispatch = useDispatch();
  const { activePanel, panelWidth } = useSelector((state: RootState) => state.ui);

  if (!activePanel) return null;

  const currentTheme = theme['matte-black'];

  const handleSetActivePanel = (panel: string | null) => {
    dispatch(setActivePanel(panel));
  };

  return (
    <>
      <ResizableDivider />
      <div
        className={`${currentTheme.surface} ${currentTheme.border} border-l lg:h-[92vh] overflow-hidden flex-shrink-0`}
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
        {activePanel === 'filters' && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
          />
        )}
        {activePanel === 'chat' && (
          <ChatPanel
            activePanel={activePanel}
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
          />
        )}
        {activePanel === 'screener' && (
          <ExtraPanel
            setActivePanel={handleSetActivePanel}
            theme={currentTheme}
          />
        )}
      </div>
    </>
  );
};

export default RightPanel;
