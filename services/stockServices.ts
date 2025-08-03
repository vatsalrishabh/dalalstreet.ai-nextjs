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

// Get saved column preferences
export const getSavedColumnPreferences = async (
  token: string
): Promise<string[]> => {
  try {
    const res = await api.get('/api/v1/screen/get-preferred-columns', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('✅ Column preferences fetched:', res.data);
    return res.data?.preferred_columns || [];
  } catch (err: any) {
    console.error('❌ Error fetching column preferences:', err?.response?.data || err?.message || err);
    
    // Return empty array if no preferences saved yet
    return [];
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

    console.log('Sending payload:', payload); // Debug log
    console.log('Base URL:', process.env.NEXT_PUBLIC_Base_URL); // Debug base URL
    console.log('Token available:', !!token); // Debug token

    // Use the correct API endpoint
    const res = await api.put(
      '/api/v1/screen/save-preferred-columns', // Correct endpoint
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
    
    // More detailed error logging
    if (err?.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
      console.error('Response headers:', err.response.headers);
    } else if (err?.request) {
      console.error('Request was made but no response received:', err.request);
    } else {
      console.error('Error setting up request:', err.message);
    }
    
    throw err;
  }
};