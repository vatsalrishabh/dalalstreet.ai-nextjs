import React from 'react';
import { X } from 'lucide-react';

type Filters = {
  marketCap: {
    smallcap: boolean;
    midcap: boolean;
    largecap: boolean;
    [key: string]: boolean;
  };
  marketCapRange: {
    min: string;
    max: string;
  };
  peRatioRange: {
    min: string;
    max: string;
  };
};

type Theme = {
  textMuted: string;
  text: string;
  accent: string;
  border: string;
};

type FiltersPanelProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setActivePanel: (panel: string | null) => void;
  theme: Theme;
};

const FilterPanel: React.FC<FiltersPanelProps> = ({
  filters,
  setFilters,
  setActivePanel,
  theme,
}) => (
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
      {/* Market Cap Filter */}
      <div>
        <label className="block text-sm font-medium mb-4">Market Cap</label>
        <div className="flex gap-2 mb-4">
          {['Smallcap', 'Midcap', 'Largecap'].map(cap => (
            <button
              key={cap}
              onClick={() =>
                setFilters(prev => ({
                  ...prev,
                  marketCap: {
                    ...prev.marketCap,
                    [cap.toLowerCase()]: !prev.marketCap[cap.toLowerCase()],
                  },
                }))
              }
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
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                marketCapRange: { ...prev.marketCapRange, min: e.target.value },
              }))
            }
          />
          <span className={`self-center ${theme.textMuted} text-sm`}>to</span>
          <input
            type="text"
            placeholder="Max"
            className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
            value={filters.marketCapRange.max}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                marketCapRange: { ...prev.marketCapRange, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      {/* PE Ratio Filter */}
      <div>
        <label className="block text-sm font-medium mb-4">PE Ratio</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Min"
            className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
            value={filters.peRatioRange.min}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                peRatioRange: { ...prev.peRatioRange, min: e.target.value },
              }))
            }
          />
          <span className={`self-center ${theme.textMuted} text-sm`}>to</span>
          <input
            type="text"
            placeholder="Max"
            className={`flex-1 p-3 ${theme.accent} ${theme.border} border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
            value={filters.peRatioRange.max}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                peRatioRange: { ...prev.peRatioRange, max: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors font-medium">
        + Add Filter
      </button>
    </div>
  </div>
);

export default FilterPanel;
