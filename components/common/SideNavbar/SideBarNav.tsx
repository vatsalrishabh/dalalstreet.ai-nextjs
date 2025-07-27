import React from 'react';
import { BarChart3, Search, Filter, MessageCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/redux/store';
import { setActivePanel } from '@/store/redux/slices/uiSlice';

type SidebarNavProps = {
  theme: {
    accent: string;
  };
  currentTab: string;
  activePanel?: string;
};

const SidebarNav: React.FC<SidebarNavProps> = ({ theme, currentTab }) => {
  const activePanel = useSelector((state: RootState) => state.ui.activePanel);
  const dispatch = useDispatch();

  if (currentTab !== 'explore') return null;

  const buttons = [
    { id: 'screener', icon: <BarChart3 className="w-5 h-5" />, title: 'Screener' },
    { id: 'query', icon: <Search className="w-5 h-5" />, title: 'Query Builder' },
    { id: 'filters', icon: <Filter className="w-5 h-5" />, title: 'Filters' },
    { id: 'chat', icon: <MessageCircle className="w-5 h-5" />, title: 'Chat' },
  ];

  const handleClick = (id: string) => {
    dispatch(setActivePanel(activePanel === id ? null : id));
  };

  return (
    <div
      className={`
        flex justify-center items-center lg:gap-4 px-4 py-2
        fixed bottom-0 w-full bg-gray-800 border-t z-50
        sm:relative sm:flex-col sm:py-8 h-full sm:w-auto sm:border-t-0 sm:bg-black 
      `}
    >
      {buttons.map(({ id, icon, title }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`p-3 rounded-xl transition-all duration-200 ${
            activePanel === id ? `${theme.accent} shadow-lg` : `hover:${theme.accent}`
          }`}
          title={title}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default SidebarNav;
