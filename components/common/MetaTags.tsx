'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';

const MetaTags = () => {
  const pathname = usePathname();
  const activePanel = useSelector((state: RootState) => state.ui.activePanel);

  useEffect(() => {
    // Update meta tags based on current page
    const updateMetaTags = () => {
      let title = 'DalalStreet.ai - AI-Powered Stock Screening & Analysis';
      let description = 'Discover the right stocks just by talking. AI-powered stock screening, analysis, and insights for Indian markets.';
      let keywords = 'stock screening, AI stock analysis, Indian stock market, investment analysis';

      // Page-specific meta tags
      if (pathname === '/') {
        title = 'Home - AI-Powered Stock Screening | DalalStreet.ai';
        description = 'Start your stock screening journey. Discover the right stocks just by talking with our AI-powered platform.';
        keywords = 'stock screening home, AI stock analysis, Indian stock market, investment platform';
      } else if (pathname === '/stocks') {
        title = 'Stock Screening & Analysis | DalalStreet.ai';
        description = 'Advanced stock screening and analysis tools. Get real-time stock data, technical analysis, and AI-powered insights.';
        keywords = 'stock screening, technical analysis, fundamental analysis, stock research, investment tools';
      } else if (pathname === '/home') {
        title = 'Stock Dashboard | DalalStreet.ai';
        description = 'Comprehensive stock dashboard with real-time data, charts, and analysis tools.';
        keywords = 'stock dashboard, real-time data, stock charts, investment dashboard';
      } else if (pathname === '/payment') {
        title = 'Payment Plans | DalalStreet.ai';
        description = 'Choose your payment plan. Access premium stock screening features and AI-powered analysis tools.';
        keywords = 'payment plans, premium features, stock screening, subscription';
      } else if (pathname === '/payment/history') {
        title = 'Payment History | DalalStreet.ai';
        description = 'View your payment history and transaction details.';
        keywords = 'payment history, transactions, billing history';
      } else if (pathname?.startsWith('/payment/receipt/')) {
        title = 'Payment Receipt | DalalStreet.ai';
        description = 'Payment receipt and transaction confirmation.';
        keywords = 'payment receipt, transaction confirmation, billing';
      } else if (pathname === '/admin') {
        title = 'Admin Dashboard | DalalStreet.ai';
        description = 'Administrative dashboard for managing the platform.';
        keywords = 'admin dashboard, platform management, administration';
      }

      // Add panel-specific meta tags for stocks page
      if (pathname === '/stocks' && activePanel) {
        const panelTitles: Record<string, string> = {
          screener: 'Stock Screener',
          query: 'Query Builder',
          filters: 'Filters',
          chat: 'AI Chat Assistant'
        };
        
        const panelTitle = panelTitles[activePanel] || activePanel;
        title = `${panelTitle} - Stock Analysis | DalalStreet.ai`;
        
        if (activePanel === 'chat') {
          description = 'Chat with AI assistant for stock analysis, screening queries, and investment insights.';
          keywords = 'AI chat, stock analysis, investment advice, AI assistant';
        } else if (activePanel === 'screener') {
          description = 'Advanced stock screener with multiple filters and criteria for finding the best investment opportunities.';
          keywords = 'stock screener, filters, investment criteria, stock screening';
        } else if (activePanel === 'query') {
          description = 'Build custom stock queries with our intuitive query builder. Filter stocks by various criteria.';
          keywords = 'query builder, custom filters, stock queries, screening criteria';
        } else if (activePanel === 'filters') {
          description = 'Apply advanced filters to narrow down your stock search. Technical and fundamental analysis filters.';
          keywords = 'stock filters, technical analysis, fundamental analysis, investment filters';
        }
      }

      // Update meta tags
      const metaTags: Array<{ name?: string; property?: string; content: string }> = [
        { name: 'title', content: title },
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { property: 'og:url', content: `https://dalalstreet.ai${pathname}` },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'DalalStreet.ai' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#FF6A00' },
        { name: 'msapplication-TileColor', content: '#FF6A00' },
      ];

      metaTags.forEach(({ name, property, content }) => {
        const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          if (property) {
            meta.setAttribute('property', property);
          } else if (name) {
            meta.setAttribute('name', name);
          }
          document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
      });
    };

    updateMetaTags();
  }, [pathname, activePanel]);

  return null;
};

export default MetaTags; 