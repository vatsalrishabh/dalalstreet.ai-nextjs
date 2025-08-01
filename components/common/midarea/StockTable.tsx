import React from 'react';
import { StockItem } from '@/types/stockScreensResponse';


// type StockData = {
//   [key: string]: string | number | null | undefined;
//   bse_code: string; // Or the actual expected keys and types
// };

type StockTableProps = {
 theme: { [key: string]: string };
  visibleColumnsList: { key: string; label: string }[];
  visibleColumns: Record<string, boolean>;
  sortedStockData: StockItem[];
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

}) => {


  console.log(visibleColumnsList) // th : th
  

  return (
    <div className={`${theme.surface} rounded-2xl overflow-hidden`}>
      <div className="lg:h-[70vh] overflow-auto">
        <table className="w-full min-w-max">
          <thead className="sticky top-0 ">
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
  {sortedStockData.map((stock, index) => (
    <tr key={`${stock.bse_code}-${index}`} className={`transition-colors hover:${theme.surfaceHover} group`}>
      {visibleColumnsList.map(({ key }) => {
        if (!visibleColumns[key]) return null;
        return (
          <td key={key} className={`px-6 py-4 ${theme.textMuted} whitespace-nowrap`}>
            {stock[key] ?? '—'}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default StockTable;
