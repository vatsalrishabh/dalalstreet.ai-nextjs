import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import ResizableDivider from '@/components/common/RightArea/ResizableDivider';
import QueryPanel from './QueryPanel';
import FilterPanel from './FilterPanel';
import ChatPanel from './ChatPanel';
import ExtraPanel from './ExtraPanel';
import theme from '@/components/tablet/theme';

type RightPanelProps = {
  queryBuilderQuery: any;
  setQueryBuilderQuery: (query: any) => void;
  filters: any;
  setFilters: (filters: any) => void;
  setActivePanel: (panel: string | null) => void;

};

const RightPanel: React.FC<RightPanelProps> = ({
  queryBuilderQuery,
  setQueryBuilderQuery,
  filters,
  setFilters,
  setActivePanel,
}) => {
  const { activePanel, panelWidth,  } = useSelector(
    (state: RootState) => state.ui
  );

  if (!activePanel) return null;

  const currentTheme = theme['matte-black']; // fallback if undefined

  return (
    <>
      <ResizableDivider />
      <div
        className={`${currentTheme.surface} ${currentTheme.border} border-l h-screen overflow-hidden flex-shrink-0`}
        style={{ width: `${panelWidth}px` }}
      >
        {activePanel === 'query' && (
<QueryPanel
    queryBuilderQuery={queryBuilderQuery}
    setQueryBuilderQuery={setQueryBuilderQuery}
    setActivePanel={setActivePanel}
    theme={currentTheme}
  />
        )}
        {activePanel === 'filters' && (
           <FilterPanel
    filters={filters}
    setFilters={setFilters}
    setActivePanel={setActivePanel}
    theme={currentTheme}
  />
        )}
        {activePanel === 'chat' && (
          <ChatPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            theme={currentTheme}
          />
        )}
        {activePanel === 'screener' &&  <ExtraPanel
    setActivePanel={setActivePanel}
    theme={currentTheme}
  />}
      </div>
    </>
  );
};

export default RightPanel;
