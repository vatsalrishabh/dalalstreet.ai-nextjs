// models/stock.model.ts

export interface StockData {
  id: number;
  name: string;
  cmp: number;
  pe: number;
  marketCap: number;
  dividendYield: number;
  npQuarter: number;
  profitVar: number;
  salesQuarter: number;
  salesVar: number;
  roce: number;
  industryPE: number;
  cmpBV: number;
}
