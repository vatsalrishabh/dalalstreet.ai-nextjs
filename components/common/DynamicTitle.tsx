'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import { usePathname } from 'next/navigation';

const DynamicTitle = () => {
  const pathname = usePathname();
  const activePanel = useSelector((state: RootState) => state.ui.activePanel);
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    let title = 'DalalStreet.ai - AI-Powered Stock Screening & Analysis';

    // Base title based on pathname
    if (pathname === '/') {
      title = 'Home - AI-Powered Stock Screening | DalalStreet.ai';
    } else if (pathname === '/stocks') {
      title = 'Stock Screening & Analysis | DalalStreet.ai';
    } else if (pathname === '/home') {
      title = 'Stock Dashboard | DalalStreet.ai';
    } else if (pathname === '/payment') {
      title = 'Payment Plans | DalalStreet.ai';
    } else if (pathname === '/payment/history') {
      title = 'Payment History | DalalStreet.ai';
    } else if (pathname?.startsWith('/payment/receipt/')) {
      title = 'Payment Receipt | DalalStreet.ai';
    } else if (pathname === '/admin') {
      title = 'Admin Dashboard | DalalStreet.ai';
    }

    // Add active panel to title if on stocks page
    if (pathname === '/stocks' && activePanel) {
      const panelTitles: Record<string, string> = {
        screener: 'Stock Screener',
        query: 'Query Builder',
        filters: 'Filters',
        chat: 'AI Chat Assistant'
      };
      
      const panelTitle = panelTitles[activePanel] || activePanel;
      title = `${panelTitle} - Stock Analysis | DalalStreet.ai`;
    }

    // Update document title
    document.title = title;

    // Update meta description based on current page
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      let description = 'Discover the right stocks just by talking. AI-powered stock screening, analysis, and insights for Indian markets.';
      
      if (pathname === '/') {
        description = 'Start your stock screening journey. Discover the right stocks just by talking with our AI-powered platform.';
      } else if (pathname === '/stocks') {
        description = 'Advanced stock screening and analysis tools. Get real-time stock data, technical analysis, and AI-powered insights.';
      } else if (pathname === '/payment') {
        description = 'Choose your payment plan. Access premium stock screening features and AI-powered analysis tools.';
      } else if (activePanel === 'chat') {
        description = 'Chat with AI assistant for stock analysis, screening queries, and investment insights.';
      } else if (activePanel === 'screener') {
        description = 'Advanced stock screener with multiple filters and criteria for finding the best investment opportunities.';
      } else if (activePanel === 'query') {
        description = 'Build custom stock queries with our intuitive query builder. Filter stocks by various criteria.';
      } else if (activePanel === 'filters') {
        description = 'Apply advanced filters to narrow down your stock search. Technical and fundamental analysis filters.';
      }
      
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

  }, [pathname, activePanel, theme]);

  return null; // This component doesn't render anything
};

export default DynamicTitle; 