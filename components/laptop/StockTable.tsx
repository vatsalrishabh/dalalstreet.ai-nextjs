'use client';

import React, { useEffect, useState } from 'react';
import { StockRaw } from '@/models/stock.model';
import { getStockScreenResults } from '@/services/stockServices';

type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
};

const formatNumber = (num: number) => Number(num.toFixed(2));

const StockTable: React.FC<Props> = ({ title = 'Top Stocks', count = 10, firebaseIdToken }) => {
  const [stocks, setStocks] = useState<StockRaw[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await getStockScreenResults(firebaseIdToken);

        // Make sure result.data is an array
        if (!Array.isArray(result?.data)) {
          console.error("Unexpected API response:", result);
          return;
        }

        setStocks(result.data.slice(0, count));
      } catch (error) {
        console.error('❌ Failed to fetch stocks:', error);
      }
    };

    fetchStocks();
  }, [firebaseIdToken, count]);

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-lg text-base-content">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title || ' Stock Table'}</h2>
        {count && (
          <span className="px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-base shadow-md border border-primary/30">
            {count} Stocks
          </span>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl custom-scrollbar border border-base-300">
        <table className="table table-zebra table-sm bg-base-100 text-sm">
          <thead className="bg-base-200 text-base font-semibold text-base-content">
            <tr>
              <th></th>
              <th>Name</th>
              <th>CMP ₹</th>
              <th>P/E</th>
              <th>Market Cap ₹Cr</th>
              <th>Div Yld %</th>
              <th>NP Qtr ₹Cr</th>
              <th>Profit Var %</th>
              <th>Sales Qtr ₹Cr</th>
              <th>Sales Var %</th>
              <th>ROCE %</th>
              <th>Ind PE</th>
              <th>CMP/BV</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={stock.bse_code || index} className="hover:bg-base-300/20 transition-colors">
                <td className="font-bold">{index + 1}</td>
                <td className="text-primary">{stock.name}</td>
                <td>₹{formatNumber(stock.current_price)}</td>
                <td>{formatNumber(stock.price_to_earning)}</td>
                <td>{formatNumber(stock.market_capitalization)}</td>
                <td>{formatNumber(stock.dividend_yield)}%</td>
                <td>₹{formatNumber(stock.net_profit_latest_quarter)}</td>
                <td
                  className={
                    stock.yoy_quarterly_profit_growth > 0
                      ? 'text-success'
                      : stock.yoy_quarterly_profit_growth < 0
                      ? 'text-error'
                      : ''
                  }
                >
                  {formatNumber(stock.yoy_quarterly_profit_growth)}%
                </td>
                <td>₹{formatNumber(stock.sales_latest_quarter)}</td>
                <td
                  className={
                    stock.yoy_quarterly_sales_growth > 0
                      ? 'text-success'
                      : stock.yoy_quarterly_sales_growth < 0
                      ? 'text-error'
                      : ''
                  }
                >
                  {formatNumber(stock.yoy_quarterly_sales_growth)}%
                </td>
                <td>{formatNumber(stock.return_on_capital_employed)}%</td>
                <td>{formatNumber(stock.industry_pe)}</td>
                <td>{formatNumber(stock.price_to_book_value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
