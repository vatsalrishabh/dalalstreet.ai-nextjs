'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setScreen } from '@/store/redux/slices/screenSlice';
import { RootState } from '@/store/redux/store';
import {
  BarChart2,
  MessageCircle,
  LayoutGrid,
} from 'lucide-react';

const BottomTabNav = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);

  const isActive = (screen: string) => currentScreen === screen;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-50 sm:hidden">
      <div className="flex justify-around items-center h-14">
        <button
          onClick={() => dispatch(setScreen('screens'))}
          className={`flex flex-col items-center text-xs ${isActive('screens') ? 'text-primary' : 'text-base-content'}`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-xs mt-1">Screens</span>
        </button>

        <button
          onClick={() => dispatch(setScreen('charts'))}
          className={`flex flex-col items-center text-xs ${isActive('charts') ? 'text-primary' : 'text-base-content'}`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-xs mt-1">Charts</span>
        </button>

        <button
          onClick={() => dispatch(setScreen('chatbot'))}
          className={`flex flex-col items-center text-xs ${isActive('chatbot') ? 'text-primary' : 'text-base-content'}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs mt-1">Chatbot</span>
        </button>
      </div>
    </div>
  );
};

export default BottomTabNav;
