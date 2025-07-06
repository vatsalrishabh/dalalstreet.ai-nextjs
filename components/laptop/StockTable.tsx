'use client';

import React from 'react';
import { dummyStocks } from '@/data/stocks.data';
import { StockData } from '@/models/stock.model';

type Props = {
  title?: string;
  count?: number;
};

const formatNumber = (num: number) => Number(num.toFixed(2));

const StockTable: React.FC<Props> = ({ title, count }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title || '📈 Stock Table'}</h2>
        {count && (
          <span className="badge badge-info badge-lg">
            {count} Stocks
          </span>
        )}
      </div>

<div className="overflow-x-auto rounded-xl shadow-md custom-scrollbar">
  <table className="table table-zebra table-sm bg-base-100 text-sm">
          <thead className="bg-base-200 text-base font-medium">
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
            {dummyStocks.map((stock: StockData) => (
              <tr key={stock.id} className="hover">
                <td className="font-bold">{stock.id}</td>
                <td className="text-primary">{stock.name}</td>
                <td>₹{formatNumber(stock.cmp)}</td>
                <td>{formatNumber(stock.pe)}</td>
                <td>{formatNumber(stock.marketCap)}</td>
                <td>
                  <span className="badge badge-ghost">
                    {formatNumber(stock.dividendYield)}%
                  </span>
                </td>
                <td>₹{formatNumber(stock.npQuarter)}</td>
                <td>
                  <span
                    className={`badge ${
                      stock.profitVar > 0
                        ? 'badge-success'
                        : stock.profitVar < 0
                        ? 'badge-error'
                        : 'badge-neutral'
                    }`}
                  >
                    {formatNumber(stock.profitVar)}%
                  </span>
                </td>
                <td>₹{formatNumber(stock.salesQuarter)}</td>
                <td>
                  <span
                    className={`badge ${
                      stock.salesVar > 0
                        ? 'badge-success'
                        : stock.salesVar < 0
                        ? 'badge-error'
                        : 'badge-neutral'
                    }`}
                  >
                    {formatNumber(stock.salesVar)}%
                  </span>
                </td>
                <td>{formatNumber(stock.roce)}%</td>
                <td>{formatNumber(stock.industryPE)}</td>
                <td>{formatNumber(stock.cmpBV)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
