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
  bse_code: number;
  // Add all other fields with proper types
  ticker?: string;
  industry?: string;
  volume?: number;
  eps?: number;
  peg_ratio?: number;
  price_to_sales?: number;
  price_to_free_cash_flow?: number;
  return_on_equity?: number;
  return_on_assets?: number;
  average_return_on_equity_3years?: number;
  average_return_on_equity_5years?: number;
  profit_growth?: number;
  profit_growth_3years?: number;
  profit_growth_5years?: number;
  sales_growth?: number;
  sales_growth_3years?: number;
  sales_growth_5years?: number;
  opm?: number;
  opm_last_year?: number;
  interest_coverage_ratio?: number;
  quick_ratio?: number;
  current_ratio?: number;
  inventory_turnover_ratio?: number;
  macd?: number;
  rsi?: number;
  change_in_promoter_holding?: number;
  promoter_holding?: number;
  pledged_percentage?: number;
  debt?: number;
  debt_to_equity?: number;
  enterprise_value?: number;
  evebitda?: number;
  earnings_yield?: number;
  return_over_1year?: number;
  return_over_3months?: number;
  return_over_6months?: number;
  return_over_3years?: number;
  return_over_5years?: number;
  net_profit?: number;
  profit_after_tax?: number;
  profit_after_tax_last_year?: number;
  profit_after_tax_latest_quarter?: number;
  profit_before_tax_last_year?: number;
  sales?: number;
  sales_preceding_year?: number;
  working_capital?: number;
}

export interface StockApiResponse {
  total: number;
  page: number;
  data: StockRaw[];
}


