import api from '@/lib/api';
import { StockScreenResponse } from '@/types/stockScreensResponse';

export const getStockScreenResults = async (
  token: string ,
  query: string,
  page: number = 1,
  limit: number = 99
): Promise<StockScreenResponse> => {
  try {
    const res = await api.post<StockScreenResponse>(
      '/api/v1/stocks/screen',
      { query, page, limit }, // "market_capitalization > 10000 , 2 , 10`
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('✅ Stocks fetched:', res.data);
    return res.data;
  } catch (err: any) {
    console.error('❌ Error fetching stocks:', err?.response?.data || err?.message || err);
    throw err;
  }
};




type UpdatePreferredColumnsPayload = {
  preferred_columns: string[];
};

export const updateSavedScreen = async (
  token: string,
  preferredColumns: string[]
): Promise<void> => {
  try {
    const payload: UpdatePreferredColumnsPayload = {
      preferred_columns: preferredColumns,
    };

    const res = await api.put(
      '/api/v1/stocks/save-preferred-columns', // Make sure this endpoint is correct
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Preferred columns updated:', res.data);
  } catch (err: any) {
    console.error(
      '❌ Error updating preferred columns:',
      err?.response?.data || err?.message || err
    );
    throw err;
  }
};