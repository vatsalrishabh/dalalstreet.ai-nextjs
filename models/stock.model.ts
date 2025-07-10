// models/stock.model.ts

export interface StockRaw {
  name: string;
  current_price: number;
  price_to_earning: number;
  market_capitalization: number;
  dividend_yield: number;
  net_profit_latest_quarter: number;
  yoy_quarterly_profit_growth: number;
  sales_latest_quarter: number;
  yoy_quarterly_sales_growth: number;
  return_on_capital_employed: number;
  industry_pe: number;
  price_to_book_value: number;
  bse_code: string;
  [key: string]: any;
}

export interface StockApiResponse {
  total: number;
  page: number;
  limit: number;
  data: StockRaw[];
}


