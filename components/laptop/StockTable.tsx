'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/redux/store';
import { fetchStocks } from '@/store/redux/slices/stockSlice';
import { saveScreen } from '@/services/screenService';
import { X } from 'lucide-react';
import { FixedSizeList as List } from 'react-window';


type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
  query: string;
};

const formatNumber = (num: number | string | null | undefined): string => {
  const parsed = typeof num === 'number' ? num : parseFloat(String(num));
  if (isNaN(parsed)) return 'N/A';
  return parsed.toFixed(2);
};

const StockTable: React.FC<Props> = ({
  title = 'Top Stocks',
  firebaseIdToken,
  query,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: stocks, loading, error } = useSelector((state: RootState) => state.stocks);

  const [state, setState] = useState({
    screenTitle: title,
    screenDescription: 'Saved screen from query result',
    alert: {
      message: '',
      type: 'success' as 'success' | 'error' | 'info',
      statusCode: undefined as number | undefined,
      active: false,
    },
  });

  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  useEffect(() => {
    if (error) {
      setState((prev) => ({
        ...prev,
        alert: {
          message: 'Failed to fetch stocks',
          type: 'error',
          statusCode: 500,
          active: true,
        },
      }));
    }
  }, [error]);

  const openModal = () => {
    setState((prev) => ({
      ...prev,
      screenTitle: title,
      screenDescription: 'Saved screen from query result',
    }));
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleSave = async () => {
    try {
      await saveScreen(firebaseIdToken, {
        title: state.screenTitle || 'Untitled Screen',
        description: state.screenDescription || 'No description',
        screen_query: query,
      });

      setState((prev) => ({
        ...prev,
        alert: {
          message: '✅ Screen saved successfully!',
          type: 'success',
          statusCode: 200,
          active: true,
        },
      }));

      closeModal();
    } catch (error: any) {
      const status = error?.status || error?.response?.status;

      if (status === 409) {
        setState((prev) => ({
          ...prev,
          alert: {
            message: '❌ A screen with this title already exists. Please use a different title.',
            type: 'error',
            statusCode: 409,
            active: true,
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          alert: {
            message: '❌ Failed to save screen. Please check the console or try again later.',
            type: 'error',
            statusCode: status || 500,
            active: true,
          },
        }));
      }

      console.error('❌ Failed to save screen:', error);
    }
  };

  const Row = ({ index, style, data }: any) => {
    const stock = data[index];
    return (
      <tr key={stock.bse_code || index} style={style} className="hover:bg-base-300/20 transition-colors">
        <td className="font-bold">{index + 1}</td>
        <td className="text-primary">{stock.name || 'N/A'}</td>
        <td>₹{formatNumber(stock.current_price)}</td>
        <td>{formatNumber(stock.price_to_earning)}</td>
        <td>{formatNumber(stock.market_capitalization)}</td>
        <td>{formatNumber(stock.dividend_yield)}%</td>
        <td>₹{formatNumber(stock.net_profit_latest_quarter)}</td>
        <td className={stock.yoy_quarterly_profit_growth > 0 ? 'text-success' : stock.yoy_quarterly_profit_growth < 0 ? 'text-error' : ''}>
          {formatNumber(stock.yoy_quarterly_profit_growth)}%
        </td>
        <td>₹{formatNumber(stock.sales_latest_quarter)}</td>
        <td className={stock.yoy_quarterly_sales_growth > 0 ? 'text-success' : stock.yoy_quarterly_sales_growth < 0 ? 'text-error' : ''}>
          {formatNumber(stock.yoy_quarterly_sales_growth)}%
        </td>
        <td>{formatNumber(stock.return_on_capital_employed)}%</td>
        <td>{formatNumber(stock.industry_pe)}</td>
        <td>{formatNumber(stock.price_to_book_value)}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="bg-base-100 p-4 rounded-xl shadow-lg text-base-content">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-4">
            {stocks?.length > 0 && (
              <span className="px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-base shadow-md border border-primary/30">
                {stocks.length} Stocks
              </span>
            )}
            <button onClick={openModal} className="btn btn-sm btn-primary gap-2">
              💾 Save Screen
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-primary">🔄 Loading stocks...</div>
        ) : error ? (
          <div className="text-center text-error py-10">❌ {error}</div>
        ) : (
          <div className="overflow-x-auto rounded-xl custom-scrollbar border border-base-300">
            <table className="table table-zebra table-sm bg-base-100 text-sm">
              <thead className="bg-base-200 text-base font-semibold text-base-content sticky top-0 z-10">
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
                <tr>
                  <td colSpan={13} className="p-0">
                    <List
                      height={610}
                      itemCount={stocks.length}
                      itemSize={48}
                      width="100%"
                      itemData={stocks}
                    >
                      {Row}
                    </List>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box bg-base-100 border border-primary/30 shadow-xl">
            <form method="dialog" className="flex justify-end">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                <X className="w-4 h-4" />
              </button>
            </form>
            <h3 className="font-bold text-lg mb-4 text-primary">💾 Save This Screen</h3>

            <div className="form-control mb-3">
              <label className="label text-sm font-semibold">Title</label>
              <input
                type="text"
                placeholder="Screen title"
                className="input input-bordered"
                value={state.screenTitle}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, screenTitle: e.target.value }))
                }
              />
            </div>

            <div className="form-control mb-3">
              <label className="label text-sm font-semibold">Description</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Screen description"
                value={state.screenDescription}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, screenDescription: e.target.value }))
                }
              />
            </div>

            <div className="modal-action">
              <button onClick={handleSave} className="btn btn-primary">
                ✅ Save
              </button>
              <form method="dialog">
                <button className="btn">❌ Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Animated Alert using Framer Motion */}
     
        
  
    </>
  );
};

export default StockTable;
