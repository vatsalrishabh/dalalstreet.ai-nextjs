import React, { useEffect, useState } from 'react';
import ColumnConfigurator from './ColumnConfigurator';
import StockTable from './StockTable';
import theme from '@/components/tablet/theme';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/redux/store';
import { fetchStocks } from '@/store/redux/slices/stockSlice';
import { saveScreen } from '@/services/screenService';

type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
  query: string;
};

const MainStockView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [firebaseIdToken, setFirebaseIdToken] = useState(useSelector((state: RootState) => state.auth.token));
  const query = useSelector((state: RootState) => state.table.query);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({
    srNo: true,
    stock: true,
    exchange: true,
    value: true,
    change: true,
    open: true,
    high: true,
    low: true,
    volume: true,
    marketCap: true,
    peRatio: true
  });

  const activeTheme = theme['matte-black']; // or 'matte-black', 'dracula', nord.

  useEffect(() => {
    if (firebaseIdToken) {
      dispatch(fetchStocks({ token: firebaseIdToken, query }));
    }
  }, [firebaseIdToken, query, dispatch]);

  return (
    <div className="flex-1">
      <div className="p-8">
        <ColumnConfigurator
          theme={activeTheme}
          show={showColumnConfig}
          toggle={() => setShowColumnConfig(prev => !prev)}
          columnOptions={[
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
          ]}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />

        <StockTable
          theme={activeTheme}
          visibleColumnsList={Object.entries(visibleColumns)
            .filter(([_, visible]) => visible)
            .map(([key]) => ({ key, label: key }))}
          visibleColumns={visibleColumns}
          sortedStockData={[]} // replace with your actual data
          handleSort={() => {}} // your sorting handler
          getSortIcon={() => null} // your sort icon function
          formatValue={(val) => val.toFixed(2)}
          formatChange={(change, percent) => <span>{change} ({percent}%)</span>}
        />
      </div>
    </div>
  );
};

export default MainStockView;
