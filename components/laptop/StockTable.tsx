'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/redux/store';
import { fetchStocks } from '@/store/redux/slices/stockSlice';

type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
  query: string;
};

const formatNumber = (num: any): string => {
  const parsed = typeof num === 'number' ? num : parseFloat(num);
  if (isNaN(parsed)) return 'N/A';
  return parsed.toFixed(2);
};

const StockTable: React.FC<Props> = ({
  title = 'Top Stocks',
  count = 10,
  firebaseIdToken,
  query,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: stocks, loading, error } = useSelector((state: RootState) => state.stocks);

  useEffect(() => {
    if (firebaseIdToken) {
      dispatch(
        fetchStocks({
          token: firebaseIdToken,
          query: query || 'market_capitalization > 10000',
        })
      );
    }
  }, [firebaseIdToken, query, dispatch]);

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-lg text-base-content">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {count && (
          <span className="px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-base shadow-md border border-primary/30">
            {count} Stocks
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10 text-primary">🔄 Loading stocks...</div>
      ) : error ? (
        <div className="text-center text-error py-10">❌ {error}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl custom-scrollbar border border-base-300">
          <table className="table table-zebra table-sm bg-base-100 text-sm">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr>
                <th>#</th>
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
              {stocks?.slice(0, count).map((stock, index) => (
                <tr key={stock.bse_code || index} className="hover:bg-base-300/20 transition-colors">
                  <td className="font-bold">{index + 1}</td>
                  <td className="text-primary">{stock.name || 'N/A'}</td>
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
      )}
    </div>
  );
};

export default StockTable;
