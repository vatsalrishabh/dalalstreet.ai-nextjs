import React from 'react';

type MarketCapOptions = 'smallcap' | 'midcap' | 'largecap';

interface FilterPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface Filters {
  marketCap: {
    smallcap: boolean;
    midcap: boolean;
    largecap: boolean;
  };
  marketCapRange: {
    min: string;
    max: string;
  };
  peRatioRange: {
    min: string;
    max: string;
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const toggleMarketCap = (cap: MarketCapOptions) => {
    setFilters((prev) => ({
      ...prev,
      marketCap: {
        ...prev.marketCap,
        [cap]: !prev.marketCap[cap],
      },
    }));
  };

  const handleRangeChange = (
    key: 'marketCapRange' | 'peRatioRange',
    minOrMax: 'min' | 'max',
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [minOrMax]: value,
      },
    }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Stocks</h2>

      {/* Market Cap Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Market Cap</h3>
        <div className="flex flex-col gap-2">
          {(['smallcap', 'midcap', 'largecap'] as MarketCapOptions[]).map((cap) => (
            <label key={cap} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.marketCap[cap]}
                onChange={() => toggleMarketCap(cap)}
                className="form-checkbox h-5 w-5 text-blue-600 transition-all duration-150"
              />
              <span className="capitalize text-gray-600">{cap}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Market Cap Range */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Market Cap Range (₹)</h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.marketCapRange.min}
            onChange={(e) => handleRangeChange('marketCapRange', 'min', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.marketCapRange.max}
            onChange={(e) => handleRangeChange('marketCapRange', 'max', e.target.value)}
          />
        </div>
      </div>

      {/* PE Ratio Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">P/E Ratio Range</h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.peRatioRange.min}
            onChange={(e) => handleRangeChange('peRatioRange', 'min', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.peRatioRange.max}
            onChange={(e) => handleRangeChange('peRatioRange', 'max', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
