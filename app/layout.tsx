import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import DaisyUiThemeProvider from "@/providers/DaisyUiThemeProvider";
import SessionHandler from "@/components/common/Signup/SessionHandler";
import DynamicTitle from "@/components/common/DynamicTitle";
import StructuredData from "@/components/common/StructuredData";
import MetaTags from "@/components/common/MetaTags";
import "animate.css";
import GoogleOAuth from "@/providers/GoogleOAuth";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: {
    default: "DalalStreet.ai - AI-Powered Stock Screening & Analysis",
    template: "%s | DalalStreet.ai"
  },
  description: "Discover the right stocks just by talking. AI-powered stock screening, analysis, and insights for Indian markets. Get real-time stock data, technical analysis, and personalized recommendations.",
  keywords: [
    "stock screening",
    "AI stock analysis", 
    "Indian stock market",
    "stock research",
    "investment analysis",
    "portfolio management",
    "technical analysis",
    "fundamental analysis",
    "stock recommendations",
    "market insights",
    "trading tools",
    "investment platform"
  ],
  authors: [{ name: "DalalStreet.ai Team" }],
  creator: "DalalStreet.ai",
  publisher: "DalalStreet.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dalalstreet.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dalalstreet.ai',
    title: 'DalalStreet.ai - AI-Powered Stock Screening & Analysis',
    description: 'Discover the right stocks just by talking. AI-powered stock screening, analysis, and insights for Indian markets.',
    siteName: 'DalalStreet.ai',
    images: [
      {
        url: '/assets/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'DalalStreet.ai Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DalalStreet.ai - AI-Powered Stock Screening & Analysis',
    description: 'Discover the right stocks just by talking. AI-powered stock screening, analysis, and insights for Indian markets.',
    images: ['/assets/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/assets/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/assets/images/logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#FF6A00',
    'theme-color': '#FF6A00',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
        <link rel="apple-touch-icon" href="/assets/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6A00" />
        <meta name="msapplication-TileColor" content="#FF6A00" />
      </head>
      <body
        className="antialiased"
      >
        <ReduxProvider>
          <DaisyUiThemeProvider>
            <SessionHandler />
            <DynamicTitle />
            <StructuredData />
            <MetaTags />
            <GoogleOAuth>
              {children}
            </GoogleOAuth>
            <ToastContainer position="top-right" autoClose={3000} />
          </DaisyUiThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
