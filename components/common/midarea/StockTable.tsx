import React from 'react';

type StockTableProps = {
  theme: any;
  visibleColumnsList: { key: string; label: string }[];
  visibleColumns: Record<string, boolean>;
  sortedStockData: any[];
  handleSort: (key: string) => void;
  getSortIcon: (key: string) => string | null;
  formatValue: (val: number) => string;
  formatChange: (change: number, percent: number) => React.ReactNode;
};

const StockTable: React.FC<StockTableProps> = ({
  theme,
  visibleColumnsList,
  visibleColumns,
  sortedStockData,
  handleSort,
  getSortIcon,
  formatValue,
  formatChange
}) => {
  return (
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
            {Array.from({ length: 20 }, (_, repeatIndex) =>
              sortedStockData.map((stock, index) => (
                <tr
                  key={`${stock.stock}-${repeatIndex}-${index}`}
                  className={`transition-colors hover:${theme.surfaceHover} group`}
                >
                  {visibleColumns.srNo && (
                    <td className={`px-6 py-4 ${theme.textMuted} text-sm font-mono whitespace-nowrap`}>
                      {repeatIndex * sortedStockData.length + index + 1}
                    </td>
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
  );
};

export default StockTable;
