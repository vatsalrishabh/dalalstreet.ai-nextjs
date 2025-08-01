// types/stocks.ts
export interface StockItem {
  name: string;
  average_return_on_equity_3years: number;
  average_return_on_equity_5years: number;
  bse_code: string;
  change_in_promoter_holding: number;
  current_price: number;
  current_ratio: number;
  debt: number;
  debt_to_equity: number;
  dividend_yield: number;
  earnings_yield: number;
  enterprise_value: number;
  eps: number;
  evebitda: number;
  industry: string;
  industry_pe: number;
  interest_coverage_ratio: number;
  inventory_turnover_ratio: number;
  macd: number;
  market_capitalization: number;
  net_profit: number;
  net_profit_latest_quarter: number;
  opm: number;
  opm_last_year: number;
  peg_ratio: number;
  pledged_percentage: number;
  price_to_book_value: number;
  price_to_earning: number;
  price_to_free_cash_flow: number;
  price_to_sales: number;
  profit_after_tax: number;
  profit_after_tax_last_year: number;
  profit_after_tax_latest_quarter: number;
  profit_before_tax_last_year: number;
  profit_growth: number;
  profit_growth_3years: number;
  profit_growth_5years: number;
  promoter_holding: number;
  quick_ratio: number;
  return_on_assets: number;
  return_on_capital_employed: number;
  return_on_equity: number;
  return_over_1year: number;
  return_over_3months: number;
  return_over_3years: number;
  return_over_5years: number;
  return_over_6months: number;
  rsi: number;
  sales: number;
  sales_growth: number;
  sales_growth_3years: number;
  sales_growth_5years: number;
  sales_latest_quarter: number;
  sales_preceding_year: number;
  ticker: string;
  volume: number;
  working_capital: number;
  yoy_quarterly_profit_growth: number;
  yoy_quarterly_sales_growth: number;
   [key: string]: string | number | null | undefined;
}

export interface StockScreenResponse {
  data:[StockItem[]] ;
  total: number;
  page: number;
  limit: number;
}

