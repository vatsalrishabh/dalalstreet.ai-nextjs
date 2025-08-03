'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const StructuredData = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data based on current page
    let structuredData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "DalalStreet.ai",
      "description": "AI-Powered Stock Screening & Analysis Platform",
      "url": "https://dalalstreet.ai",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "author": {
        "@type": "Organization",
        "name": "DalalStreet.ai"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DalalStreet.ai"
      }
    };

    // Add page-specific structured data
    if (pathname === '/') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "DalalStreet.ai",
        "description": "AI-Powered Stock Screening & Analysis",
        "url": "https://dalalstreet.ai",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://dalalstreet.ai/stocks?query={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
    } else if (pathname === '/stocks') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Stock Screening & Analysis",
        "description": "Advanced stock screening and analysis tools",
        "url": "https://dalalstreet.ai/stocks",
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "Stock Screener",
          "description": "AI-powered stock screening tool",
          "applicationCategory": "FinanceApplication"
        }
      };
    } else if (pathname === '/payment') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Payment Plans",
        "description": "Choose your payment plan for premium features",
        "url": "https://dalalstreet.ai/payment",
        "mainEntity": {
          "@type": "Offer",
          "name": "Premium Stock Screening",
          "description": "Access to premium stock screening features"
        }
      };
    }

    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [pathname]);

  return null;
};

export default StructuredData; 