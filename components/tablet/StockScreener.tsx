"use client";
import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, BarChart3, TrendingUp, TrendingDown, Settings, ChevronDown, Check, X } from 'lucide-react';
import themes from '@/components/tablet/theme'; // Assuming you have a themes.js file with theme definitions

const StockScreener = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [currentTab, setCurrentTab] = useState('explore');
  const [currentTheme, setCurrentTheme] = useState('matte-black'); //1. theme name state
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({
    marketCap: { smallcap: false, midcap: false, largecap: false },
    marketCapRange: { min: '', max: '' },
    peRatioRange: { min: '', max: '' }
  });
  const [queryBuilderQuery, setQueryBuilderQuery] = useState(`Market_Capitalization >500 AND
Price_to_Earning < Industry_PE AND
Change_in_promoter_holding >= 0 AND
Change_in_FII_holding +
Change_in_DII_holding >= 0 AND
Pledged_percentage <= 5 AND
Price_to_Earning <= 25`);
  
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    stock: true,
    exchange: true,
    value: true,
    change: true,
    open: true,
    high: true,
    low: false,
    volume: false,
    marketCap: false,
    peRatio: false
  });
  
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

  
//   const themes = {
//     'matte-black': {
//       name: 'Matte Black',
//       bg: 'bg-neutral-950',
//       surface: 'bg-neutral-900',
//       surfaceHover: 'bg-neutral-800',
//       border: 'border-neutral-800',
//       text: 'text-neutral-50',
//       textMuted: 'text-neutral-400',
//       accent: 'bg-neutral-800',
//       header: 'bg-neutral-800'
//     },
//     'nord': {
//       name: 'Nord',
//       bg: 'bg-slate-900',
//       surface: 'bg-slate-800',
//       surfaceHover: 'bg-slate-700',
//       border: 'border-slate-700',
//       text: 'text-slate-100',
//       textMuted: 'text-slate-400',
//       accent: 'bg-slate-600',
//       header: 'bg-slate-700'
//     },
//     'dracula': {
//       name: 'Dracula',
//       bg: 'bg-purple-950',
//       surface: 'bg-purple-900',
//       surfaceHover: 'bg-purple-800',
//       border: 'border-purple-800',
//       text: 'text-purple-100',
//       textMuted: 'text-purple-300',
//       accent: 'bg-purple-700',
//       header: 'bg-purple-800'
//     }
//   };

  const theme = themes;

  const stockData = [
    { stock: '20MICRONS', exchange: 'NSE', value: 259.40, change: 15.32, changePercent: 15.32, open: 228.00, high: 267.99, low: 225.50, volume: '1.2M', marketCap: '₹850Cr', peRatio: 12.5 },
    { stock: '360ONE', exchange: 'NSE', value: 1197.60, change: 0.03, changePercent: 0.03, open: 1200.00, high: 1201.50, low: 1180.20, volume: '890K', marketCap: '₹15.2KCr', peRatio: 18.7 },
    { stock: '63MOONS', exchange: 'NSE', value: 1093.90, change: 1.90, changePercent: 1.90, open: 1073.50, high: 1106.90, low: 1070.00, volume: '445K', marketCap: '₹2.8KCr', peRatio: 22.1 },
    { stock: 'A', exchange: 'NYSE', value: 113.43, change: 0.43, changePercent: 0.43, open: 113.46, high: 114.46, low: 112.80, volume: '2.1M', marketCap: '$45.7B', peRatio: 15.2 },
    { stock: 'A2ZINFRA', exchange: 'NSE', value: 19.76, change: -1.30, changePercent: -1.30, open: 20.09, high: 20.23, low: 19.50, volume: '1.8M', marketCap: '₹156Cr', peRatio: 8.9 },
    { stock: 'AA', exchange: 'NYSE', value: 29.67, change: 3.89, changePercent: 3.89, open: 29.12, high: 30.12, low: 28.95, volume: '3.2M', marketCap: '$5.4B', peRatio: 11.3 },
    { stock: 'AACIU', exchange: 'NASDAQ', value: 10.16, change: -0.49, changePercent: -0.49, open: 10.16, high: 10.16, low: 10.10, volume: '125K', marketCap: '$1.2B', peRatio: 9.8 },
    { stock: 'IOTC/KNWN', exchange: 'NYSE', value: 2.69, change: 0.37, changePercent: 0.37, open: 2.71, high: 2.71, low: 2.65, volume: '890K', marketCap: '$85M', peRatio: 5.4 },
    { stock: 'RELIANCE', exchange: 'NSE', value: 2847.60, change: 25.80, changePercent: 0.91, open: 2825.00, high: 2855.70, low: 2820.30, volume: '2.8M', marketCap: '₹19.2LCr', peRatio: 24.1 },
    { stock: 'TCS', exchange: 'NSE', value: 3456.75, change: -12.45, changePercent: -0.36, open: 3470.20, high: 3478.90, low: 3442.15, volume: '1.9M', marketCap: '₹12.6LCr', peRatio: 28.3 },
    { stock: 'INFY', exchange: 'NSE', value: 1678.30, change: 8.95, changePercent: 0.54, open: 1670.00, high: 1685.40, low: 1665.80, volume: '3.1M', marketCap: '₹6.9LCr', peRatio: 26.7 },
    { stock: 'HDFCBANK', exchange: 'NSE', value: 1542.85, change: -7.65, changePercent: -0.49, open: 1550.50, high: 1558.20, low: 1538.90, volume: '2.4M', marketCap: '₹11.7LCr', peRatio: 18.9 },
    { stock: 'ICICIBANK', exchange: 'NSE', value: 1089.40, change: 15.30, changePercent: 1.42, open: 1075.00, high: 1095.60, low: 1072.20, volume: '4.2M', marketCap: '₹7.6LCr', peRatio: 16.4 }
  ];

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const formatValue = (value) => {
    if (typeof value === 'string') return value;
    return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change, changePercent) => {
    const isPositive = change >= 0;
    const arrow = isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
    const color = isPositive ? 'text-emerald-400' : 'text-rose-400';
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {arrow}
        <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
        <span className="text-xs opacity-75">({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
      </div>
    );
  };

  const columnOptions = [
    { key: 'srNo', label: 'Sr. No.' },
    { key: 'stock', label: 'Stock' },
    { key: 'exchange', label: 'Exchange' },
    { key: 'value', label: 'Value' },
    { key: 'change', label: 'Change' },
    { key: 'open', label: 'Open' },
    { key: 'high', label: 'High' },
    { key: 'low', label: 'Low' },
    { key: 'volume', label: 'Volume' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'peRatio', label: 'P/E Ratio' }
  ];

  const visibleColumnsList = columnOptions.filter(col => visibleColumns[col.key]);

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortColumn !== columnKey) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const sortedStockData = useMemo(() => {
    if (!sortColumn) return stockData;
    
    return [...stockData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [sortColumn, sortDirection]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    // const rect = document.body.getBoundingClientRect();
    const newWidth = window.innerWidth - e.clientX + 10; // Add small offset
    setPanelWidth(Math.max(300, Math.min(window.innerWidth * 0.6, newWidth))); // Max 60% of screen
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('selectstart', (e) => e.preventDefault());
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className={`h-screen ${theme.bg} ${theme.text} font-sans flex flex-col overflow-hidden`}>
      {/* Header/ Navbar */}
      <div className={`flex items-center justify-between px-8 py-4 ${theme.border} border-b`}>
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-medium tracking-tight">Stock Screener</h1>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentTab('explore')}
              className={`text-sm font-medium transition-colors ${
                currentTab === 'explore' ? theme.text : theme.textMuted + ' hover:' + theme.text
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => setCurrentTab('my-screens')}
              className={`text-sm font-medium transition-colors ${
                currentTab === 'my-screens' ? theme.text : theme.textMuted + ' hover:' + theme.text
              }`}
            >
              My Screens
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className={`flex items-center gap-2 px-3 py-1.5 ${theme.accent} rounded-lg text-sm font-medium transition-colors hover:opacity-80`}
            >
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              {themes[currentTheme].name}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showThemeDropdown && (
              <div className={`absolute right-0 top-full mt-2 w-48 ${theme.surface} ${theme.border} border rounded-xl shadow-2xl z-20`}>
                <div className="p-2">
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setCurrentTheme(key);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentTheme === key ? theme.accent : 'hover:' + theme.surfaceHover
                      }`}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Settings className={`w-5 h-5 ${theme.textMuted} hover:${theme.text} cursor-pointer transition-colors`} />
        </div>
      </div>

        {/* Header/ Navbar ends */}



      <div className="flex">
        {/* Left Toolbar */}
        
        {currentTab === 'explore' && (
          <div className="flex flex-col justify-center items-center py-8 gap-4 px-4 min-h-screen">
            <button 
              onClick={() => togglePanel('screener')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activePanel === 'screener' ? theme.accent + ' shadow-lg' : 'hover:' + theme.accent
              }`}
              title="Screener"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => togglePanel('query')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activePanel === 'query' ? theme.accent + ' shadow-lg' : 'hover:' + theme.accent
              }`}
              title="Query Builder"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => togglePanel('filters')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activePanel === 'filters' ? theme.accent + ' shadow-lg' : 'hover:' + theme.accent
              }`}
              title="Filters"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => togglePanel('chat')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activePanel === 'chat' ? theme.accent + ' shadow-lg' : 'hover:' + theme.accent
              }`}
              title="Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {/* Column Configuration */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowColumnConfig(!showColumnConfig)}
                  className={`flex items-center gap-2 px-4 py-2 ${theme.accent} rounded-xl text-sm font-medium transition-colors hover:opacity-80`}
                >
                  <Settings className="w-4 h-4" />
                  Configure Columns
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showColumnConfig && (
                  <div className={`absolute right-0 top-full mt-2 w-64 ${theme.surface} ${theme.border} border rounded-xl shadow-2xl z-10`}>
                    <div className="p-4">
                      <h3 className="text-sm font-medium mb-4">Select Columns</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {columnOptions.map(option => (
                          <label key={option.key} className={`flex items-center gap-3 cursor-pointer hover:${theme.surfaceHover} p-2 rounded-lg transition-colors`}>
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={visibleColumns[option.key]}
                                onChange={(e) => setVisibleColumns(prev => ({...prev, [option.key]: e.target.checked}))}
                                className="sr-only"
                              />
                              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                                visibleColumns[option.key] 
                                  ? 'bg-emerald-500 border-emerald-500' 
                                  : `border-gray-500 ${theme.surfaceHover}`
                              }`}>
                                {visibleColumns[option.key] && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stock Table */}
            <div className={`${theme.surface} rounded-2xl overflow-hidden`}>
              <div className="h-96 overflow-auto">
                <table className="w-full min-w-max">
                  <thead className="sticky top-0 z-10">
                    <tr className={`${theme.header}`}>
                      {visibleColumnsList.map(col => (
                        <th 
                          key={col.key} 
                          onClick={() => handleSort(col.key)}
                          className={`text-left px-6 py-4 ${theme.textMuted} font-medium text-sm tracking-wide uppercase cursor-pointer hover:${theme.text} transition-colors select-none whitespace-nowrap`}
                        >
                          <div className="flex items-center gap-2">
                            {col.label}
                            {getSortIcon(col.key) && (
                              <span className="text-xs opacity-75">{getSortIcon(col.key)}</span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Repeat data multiple times for infinite scroll demo */}
                    {Array.from({ length: 20 }, (_, repeatIndex) => 
                      sortedStockData.map((stock, index) => (
                        <tr key={`${stock.stock}-${repeatIndex}-${index}`} className={`transition-colors hover:${theme.surfaceHover} group`}>
                          {visibleColumns.srNo && (
                            <td className={`px-6 py-4 ${theme.textMuted} text-sm font-mono whitespace-nowrap`}>{repeatIndex * sortedStockData.length + index + 1}</td>
                          )}
                          {visibleColumns.stock && (
                            <td className="px-6 py-4 font-medium text-base whitespace-nowrap">{stock.stock}</td>
                          )}
                          {visibleColumns.exchange && (
                            <td className={`px-6 py-4 ${theme.textMuted} text-sm font-mono whitespace-nowrap`}>{stock.exchange}</td>
                          )}
                          {visibleColumns.value && (
                            <td className="px-6 py-4 font-semibold whitespace-nowrap">₹{formatValue(stock.value)}</td>
                          )}
                          {visibleColumns.change && (
                            <td className="px-6 py-4 whitespace-nowrap">{formatChange(stock.change, stock.changePercent)}</td>
                          )}
                          {visibleColumns.open && (
                            <td className={`px-6 py-4 ${theme.textMuted} whitespace-nowrap`}>₹{formatValue(stock.open)}</td>
                          )}
                          {visibleColumns.high && (
                            <td className={`px-6 py-4 ${theme.textMuted} whitespace-nowrap`}>₹{formatValue(stock.high)}</td>
                          )}
                          {visibleColumns.low && (
                            <td className={`px-6 py-4 ${theme.textMuted} whitespace-nowrap`}>₹{formatValue(stock.low)}</td>
                          )}
                          {visibleColumns.volume && (
                            <td className={`px-6 py-4 ${theme.textMuted} font-mono text-sm whitespace-nowrap`}>{stock.volume}</td>
                          )}
                          {visibleColumns.marketCap && (
                            <td className={`px-6 py-4 ${theme.textMuted} font-mono text-sm whitespace-nowrap`}>{stock.marketCap}</td>
                          )}
                          {visibleColumns.peRatio && (
                            <td className={`px-6 py-4 ${theme.textMuted} font-mono text-sm whitespace-nowrap`}>{stock.peRatio}</td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {activePanel && (
          <>
            {/* Resizable Panel Divider */}
            <div 
              className="w-1 bg-neutral-600 hover:bg-emerald-500 cursor-col-resize transition-colors flex-shrink-0"
              onMouseDown={handleMouseDown}
              style={{ 
                zIndex: 50,
                backgroundColor: isResizing ? '#10b981' : '#525252'
              }}
            ></div>
            
            <div 
              className={`${theme.surface} ${theme.border} border-l h-screen overflow-hidden flex-shrink-0`}
              style={{ width: `${panelWidth}px` }}
            >
              {/* Query Builder Panel */}
              {activePanel === 'query' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-lg font-medium">Query Builder</h2>
                    <button 
                      onClick={() => setActivePanel(null)}
                      className={`${theme.textMuted} hover:${theme.text} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Query Builder</label>
                      <textarea
                        value={queryBuilderQuery}
                        onChange={(e) => setQueryBuilderQuery(e.target.value)}
                        className={`w-full h-48 p-4 ${theme.accent} ${theme.border} border rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                        placeholder="Enter your query..."
                      />
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                      Run Query
                    </button>
                  </div>
                </div>
              )}

              {/* Filters Panel */}
              {activePanel === 'filters' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button 
                      onClick={() => setActivePanel(null)}
                      className={`${theme.textMuted} hover:${theme.text} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 p-6 space-y-8">
                    <div>
                      <label className="block text-sm font-medium mb-4">Market Cap</label>
                      <div className="flex gap-2 mb-4">
                        {['Smallcap', 'Midcap', 'Largecap'].map(cap => (
                          <button
                            key={cap}
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              marketCap: {...prev.marketCap, [cap.toLowerCase()]: !prev.marketCap[cap.toLowerCase()]}
                            }))}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                              filters.marketCap[cap.toLowerCase()] 
                                ? 'bg-emerald-600 text-white' 
                                : `${theme.accent} ${theme.textMuted} hover:${theme.text}`
                            }`}
                          >
                            {cap}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Min"
                          className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                          value={filters.marketCapRange.min}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            marketCapRange: {...prev.marketCapRange, min: e.target.value}
                          }))}
                        />
                        <span className={`self-center ${theme.textMuted} text-sm`}>to</span>
                        <input
                          type="text"
                          placeholder="Max"
                          className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                          value={filters.marketCapRange.max}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            marketCapRange: {...prev.marketCapRange, max: e.target.value}
                          }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-4">PE Ratio</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Min"
                          className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                          value={filters.peRatioRange.min}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            peRatioRange: {...prev.peRatioRange, min: e.target.value}
                          }))}
                        />
                        <span className={`self-center ${theme.textMuted} text-sm`}>to</span>
                        <input
                          type="text"
                          placeholder="Max"
                          className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                          value={filters.peRatioRange.max}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            peRatioRange: {...prev.peRatioRange, max: e.target.value}
                          }))}
                        />
                      </div>
                    </div>

                    <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors font-medium">
                      + Add Filter
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Panel */}
              {activePanel === 'chat' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-lg font-medium">Chat</h2>
                    <button 
                      onClick={() => setActivePanel(null)}
                      className={`${theme.textMuted} hover:${theme.text} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      <div className={`${theme.accent} p-4 rounded-xl`}>
                        <p className="text-sm leading-relaxed">I can help you analyze stocks and create custom screeners. What would you like to know?</p>
                      </div>
                      <div className={`${theme.accent} p-4 rounded-xl`}>
                        <p className="text-sm leading-relaxed">I understand you're looking for analysis. Let me help you with that.</p>
                      </div>
                      <div className={`${theme.accent} p-4 rounded-xl`}>
                        <p className="text-sm leading-relaxed">You can ask me about market trends, stock analysis, or help with building custom screening criteria.</p>
                      </div>
                      <div className={`${theme.accent} p-4 rounded-xl`}>
                        <p className="text-sm leading-relaxed">I can also help you understand financial ratios, sector analysis, and investment strategies.</p>
                      </div>
                    </div>
                    <div className="p-4 border-t border-neutral-800">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Ask me anything about stocks..."
                          className={`w-full p-3 pr-12 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <TrendingUp className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StockScreener;