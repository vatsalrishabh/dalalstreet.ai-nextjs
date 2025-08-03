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
    console.log('SidebarNav: Clicking panel:', id, 'Current active:', activePanel);
    dispatch(setActivePanel(activePanel === id ? null : id));
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Inspired by desktop sidebar design */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-700 shadow-2xl">
        <div className="flex justify-around items-center px-2 py-3">
          {buttons.map(({ id, icon, title }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                activePanel === id 
                  ? 'bg-emerald-600 text-white shadow-lg scale-110' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title={title}
            >
              {icon}
              <span className="text-xs mt-1 font-medium tracking-wide">{title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:justify-start lg:items-center lg:py-8 lg:px-2 lg:gap-6 lg:h-full lg:bg-black lg:border-r lg:border-gray-700">
        {buttons.map(({ id, icon, title }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activePanel === id 
                ? `${theme.accent} shadow-lg text-white` 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title={title}
          >
            {icon}
          </button>
        ))}
      </div>
    </>
  );
};

export default SidebarNav;
