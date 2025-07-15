'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  MessageCircle,
  LayoutGrid,
} from 'lucide-react'; // or use react-icons if preferred

const BottomTabNav = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-50 sm:hidden">
      <div className="flex justify-around items-center h-14">
        <Link href="/screens" className="flex flex-col items-center text-xs">
          <button
            className={`btn btn-ghost btn-sm ${
              isActive('/screens') ? 'text-primary' : 'text-base-content'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <span className="text-xs mt-1">Screens</span>
        </Link>

        <Link href="/charts" className="flex flex-col items-center text-xs">
          <button
            className={`btn btn-ghost btn-sm ${
              isActive('/charts') ? 'text-primary' : 'text-base-content'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
          </button>
          <span className="text-xs mt-1">Charts</span>
        </Link>

        <Link href="/chatbot" className="flex flex-col items-center text-xs">
          <button
            className={`btn btn-ghost btn-sm ${
              isActive('/chatbot') ? 'text-primary' : 'text-base-content'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <span className="text-xs mt-1">Chatbot</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomTabNav;
