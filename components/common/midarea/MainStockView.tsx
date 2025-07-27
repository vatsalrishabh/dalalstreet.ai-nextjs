import React, { useEffect, useState } from 'react';
import ColumnConfigurator from './ColumnConfigurator';
import StockTable from './StockTable';
import theme from '@/components/tablet/theme';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/redux/store';
import { fetchStocks } from '@/store/redux/slices/stockSlice';
import { saveScreen } from '@/services/screenService';
import {toast} from 'react-toastify';
import SaveScreen from './SaveScreen';



type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
  query: string;
};

const MainStockView = () => {
  const dispatch = useDispatch<AppDispatch>();
const firebaseIdToken = useSelector((state: RootState) => state.auth.token);

const query = useSelector((state: RootState) => state.query.latestQuery)
  || localStorage.getItem("lastQuery")
  || "market_capitalization > 10000";


 const allStocks = useSelector((state: RootState) => state.stocks.data);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({
  name: true,
  ticker: true,
  industry: true,
  bse_code: true,
  current_price: true,
  market_capitalization: true,
  volume: true,
  eps: true,
  dividend_yield: true,
  peg_ratio: true,
  price_to_earning: true,
  price_to_book_value: true,
  price_to_sales: true,
  price_to_free_cash_flow: true,
  return_on_equity: true,
  return_on_assets: true,
  return_on_capital_employed: true,
  average_return_on_equity_3years: true,
  average_return_on_equity_5years: true,
  profit_growth: true,
  profit_growth_3years: true,
  profit_growth_5years: true,
  sales_growth: true,
  sales_growth_3years: true,
  sales_growth_5years: true,
  opm: true,
  opm_last_year: true,
  interest_coverage_ratio: true,
  quick_ratio: true,
  current_ratio: true,
  inventory_turnover_ratio: true,
  macd: true,
  rsi: true,
  change_in_promoter_holding: true,
  promoter_holding: true,
  pledged_percentage: true,
  debt: true,
  debt_to_equity: true,
  enterprise_value: true,
  evebitda: true,
  earnings_yield: true,
  return_over_1year: true,
  return_over_3months: true,
  return_over_6months: true,
  return_over_3years: true,
  return_over_5years: true,
  net_profit: true,
  net_profit_latest_quarter: true,
  profit_after_tax: true,
  profit_after_tax_last_year: true,
  profit_after_tax_latest_quarter: true,
  profit_before_tax_last_year: true,
  sales: true,
  sales_latest_quarter: true,
  sales_preceding_year: true,
  yoy_quarterly_sales_growth: true,
  yoy_quarterly_profit_growth: true,
  working_capital: true,
});

  const activeTheme = theme['matte-black']; // or 'matte-black', 'dracula', nord.
  console.log('allStocks:', allStocks);


useEffect(() => {
  if (firebaseIdToken && query) {
    dispatch(fetchStocks({ token: firebaseIdToken, query }));
  }
}, [firebaseIdToken, query, dispatch]);


const handleSaveScreen = async () => {
    const title = prompt('Enter a title for this screen:');
    if (!title) return;

    const description = prompt('Enter a description (optional):') || '';

    const selectedColumns = Object.entries(visibleColumns)
      .filter(([_, isVisible]) => isVisible)
      .map(([key]) => key);

    try {
      if(firebaseIdToken){
 await saveScreen(firebaseIdToken, {
        title,
        description,
        screen_query: query,
        columns: selectedColumns,
      });
      }
     
      toast.success('✅ Screen saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to save screen.');
    }
  };


  return (
    <div className="flex-1 z-0">
      <div className="p-8">
     
<div className='flex lg:justify-end w-full space-x-2 '>
 <SaveScreen
  theme={{
    accent: 'bg-emerald-600 text-white',
    surface: 'bg-black',
    surfaceHover: 'bg-gray-900',
    border: 'border-green-500'
  }}
  onSave={async (title, description) => {
    const selectedColumns = Object.entries(visibleColumns)
      .filter(([_, isVisible]) => isVisible)
      .map(([key]) => key);

    try {
      if (firebaseIdToken) {
        await saveScreen(firebaseIdToken, {
          title,
          description,
          screen_query: query,
          columns: selectedColumns,
        });

        toast.success('✅ Screen saved successfully!');
      } else {
        toast.error('❌ Missing authentication token.');
      }
    } catch (err) {
      console.error('Failed to save screen:', err);
      toast.error('❌ Failed to save screen.');
    }
  }}
/>

<ColumnConfigurator
          theme={activeTheme}
          show={showColumnConfig}
          toggle={() => setShowColumnConfig(prev => !prev)}
          columnOptions={[
  { key: 'name', label: 'Name' },
  { key: 'ticker', label: 'Ticker' },
  { key: 'industry', label: 'Industry' },
  { key: 'bse_code', label: 'BSE Code' },
  { key: 'current_price', label: 'Current Price' },
  { key: 'market_capitalization', label: 'Market Cap' },
  { key: 'volume', label: 'Volume' },
  { key: 'eps', label: 'EPS' },
  { key: 'dividend_yield', label: 'Dividend Yield (%)' },
  { key: 'peg_ratio', label: 'PEG Ratio' },
  { key: 'price_to_earning', label: 'P/E Ratio' },
  { key: 'price_to_book_value', label: 'P/B Ratio' },
  { key: 'price_to_sales', label: 'P/S Ratio' },
  { key: 'price_to_free_cash_flow', label: 'P/FCF Ratio' },
  { key: 'return_on_equity', label: 'ROE (%)' },
  { key: 'return_on_assets', label: 'ROA (%)' },
  { key: 'return_on_capital_employed', label: 'ROCE (%)' },
  { key: 'average_return_on_equity_3years', label: 'Avg ROE (3Y)' },
  { key: 'average_return_on_equity_5years', label: 'Avg ROE (5Y)' },
  { key: 'profit_growth', label: 'Profit Growth (%)' },
  { key: 'profit_growth_3years', label: 'Profit Growth (3Y)' },
  { key: 'profit_growth_5years', label: 'Profit Growth (5Y)' },
  { key: 'sales_growth', label: 'Sales Growth (%)' },
  { key: 'sales_growth_3years', label: 'Sales Growth (3Y)' },
  { key: 'sales_growth_5years', label: 'Sales Growth (5Y)' },
  { key: 'opm', label: 'Operating Profit Margin (%)' },
  { key: 'opm_last_year', label: 'OPM (Last Year)' },
  { key: 'interest_coverage_ratio', label: 'Interest Coverage Ratio' },
  { key: 'quick_ratio', label: 'Quick Ratio' },
  { key: 'current_ratio', label: 'Current Ratio' },
  { key: 'inventory_turnover_ratio', label: 'Inventory Turnover' },
  { key: 'macd', label: 'MACD' },
  { key: 'rsi', label: 'RSI' },
  { key: 'change_in_promoter_holding', label: 'Change in Promoter Holding (%)' },
  { key: 'promoter_holding', label: 'Promoter Holding (%)' },
  { key: 'pledged_percentage', label: 'Pledged Promoter Holding (%)' },
  { key: 'debt', label: 'Debt' },
  { key: 'debt_to_equity', label: 'Debt to Equity' },
  { key: 'enterprise_value', label: 'Enterprise Value' },
  { key: 'evebitda', label: 'EV/EBITDA' },
  { key: 'earnings_yield', label: 'Earnings Yield' },
  { key: 'return_over_1year', label: 'Return (1Y)' },
  { key: 'return_over_3months', label: 'Return (3M)' },
  { key: 'return_over_6months', label: 'Return (6M)' },
  { key: 'return_over_3years', label: 'Return (3Y)' },
  { key: 'return_over_5years', label: 'Return (5Y)' },
  { key: 'net_profit', label: 'Net Profit' },
  { key: 'net_profit_latest_quarter', label: 'Net Profit (Latest Qtr)' },
  { key: 'profit_after_tax', label: 'PAT' },
  { key: 'profit_after_tax_last_year', label: 'PAT (Last Year)' },
  { key: 'profit_after_tax_latest_quarter', label: 'PAT (Latest Qtr)' },
  { key: 'profit_before_tax_last_year', label: 'PBT (Last Year)' },
  { key: 'sales', label: 'Sales' },
  { key: 'sales_latest_quarter', label: 'Sales (Latest Qtr)' },
  { key: 'sales_preceding_year', label: 'Sales (Last Year)' },
  { key: 'yoy_quarterly_sales_growth', label: 'YoY Sales Growth (Qtr)' },
  { key: 'yoy_quarterly_profit_growth', label: 'YoY Profit Growth (Qtr)' },
  { key: 'working_capital', label: 'Working Capital' },
]}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
</div>

        

        <StockTable
          theme={activeTheme}
          visibleColumnsList={Object.entries(visibleColumns)// {name :boolean,name: boolean}
            .filter(([_, visible]) => visible)
            .map(([key]) => ({ key, label: key }))}
          visibleColumns={visibleColumns}
         sortedStockData={allStocks?.slice(0, 50) || []} // replace with your actual data
          handleSort={() => {}} // your sorting handler
          getSortIcon={() => null} // your sort icon function
       formatValue={(val) => (typeof val === 'number' ? val.toFixed(2) : val ?? '--')}

          formatChange={(change, percent) => <span>{change} ({percent}%)</span>}
        />
      </div>
    </div>
  );
};

export default MainStockView;
