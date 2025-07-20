// lib/lastQueryLocal.ts
const STOCK_QUERY_HISTORY_KEY = 'stock_query_history';

export interface StockQueryHistoryItem {
  stream_id: string;
  query: string;
}

export const saveQueryToLocalHistory = (stream_id: string, query: string) => {
  if (typeof window === 'undefined') return;

  const current = JSON.parse(localStorage.getItem(STOCK_QUERY_HISTORY_KEY) || '[]');

  const updated = [
    { stream_id, query },
    ...current.filter((item: StockQueryHistoryItem) => item.query !== query),
  ].slice(0, 10); // Keep only 10 items

  localStorage.setItem(STOCK_QUERY_HISTORY_KEY, JSON.stringify(updated));
};

export const getQueryHistory = (): StockQueryHistoryItem[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STOCK_QUERY_HISTORY_KEY) || '[]');
};
