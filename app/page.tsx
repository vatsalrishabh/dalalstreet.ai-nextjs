"use client";
// pages/index.jsx
import { useState, useRef } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const screenerRef = useRef<HTMLDivElement | null>(null)

  const handleSample = (text: string) => {
    setQuery(text);
    screenerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const startScreening = () => {
    if (screenerRef.current) {
      screenerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5EE] text-gray-900 relative">
      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-end space-x-8">
        <a href="#features" className="hover:text-orange-600">Features</a>
        <a href="#pricing" className="hover:text-orange-600">Pricing</a>
        <a href="#login" className="hover:text-orange-600">Login</a>
      </nav>

      {/* Hero / Chat Section */}
      <div className="flex flex-col items-center justify-center h-screen px-6 relative z-10">
        <h1 className="text-5xl font-extrabold text-center mb-4 leading-tight">
          Find the right stocks<br />by just having a conversation
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Describe what you need or pick an example to get instant insights.
        </p>
        {/* Input + Samples + CTA */}
        <div className="space-y-4 w-full max-w-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'High dividend yield telecom stocks'"
            className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full 
                       focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition"
          />
          {/* Sample prompts */}
          <div className="flex flex-wrap gap-3">
            {[
              'Screen tech stocks last 6 months',
              'Find low P/E value stocks',
            ].map((txt) => (
              <button
                key={txt}
                onClick={() => handleSample(txt)}
                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium 
                           hover:bg-orange-200 transition"
              >
                {txt}
              </button>
            ))}
          </div>
          {/* Start Screening CTA */}
          <button
            onClick={startScreening}
            className="w-full py-3 mt-4 bg-orange-600 text-white rounded-full font-semibold 
                       shadow-md hover:bg-orange-700 transition"
          >
            Start Screening
          </button>
        </div>
      </div>

      {/* Screener Section */}
      <div
        ref={screenerRef}
        className="min-h-screen px-8 py-12 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Stock Screener
        </h2>

        {/* Filter controls */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {['Sector', 'Market Cap', 'P/E Ratio'].map((label) => (
            <select
              key={label}
              className="p-3 bg-white border border-gray-300 rounded-xl text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition"
              aria-label={label}
            >
              <option className="bg-white">{label}</option>
              {/* …options */}
            </select>
          ))}
        </div>

        {/* Sample results table */}
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl bg-gray-50 shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                {['Ticker', 'Company', 'P/E', 'Market Cap'].map((h) => (
                  <th key={h} className="py-3 px-4 text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { t: 'AAPL', c: 'Apple Inc.', pe: 28.5, m: '$2.3T' },
                { t: 'MSFT', c: 'Microsoft Corp.', pe: 34.2, m: '$2.1T' },
              ].map(({ t, c, pe, m }) => (
                <tr
                  key={t}
                  className="border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4 font-medium">{t}</td>
                  <td className="px-4">{c}</td>
                  <td className="px-4">{pe}</td>
                  <td className="px-4">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}