// data/stocks.data.ts

import { StockData } from "@/models/stock.model";

export const dummyStocks: StockData[] = [
  {
    id: 1,
    name: "Satia Industries",
    cmp: 91.2,
    pe: 7.69,
    marketCap: 912,
    dividendYield: 1.1,
    npQuarter: 35.43,
    profitVar: -10.19,
    salesQuarter: 396.67,
    salesVar: -7.88,
    roce: 10.39,
    industryPE: 17.01,
    cmpBV: 0.87,
  },
  {
    id: 2,
    name: "Wim Plast",
    cmp: 506.85,
    pe: 9.43,
    marketCap: 608.39,
    dividendYield: 1.97,
    npQuarter: 17.62,
    profitVar: 8.23,
    salesQuarter: 105.76,
    salesVar: 7.82,
    roce: 16.38,
    industryPE: 75.36,
    cmpBV: 1.12,
  },
  // Add more stocks as needed...
];
