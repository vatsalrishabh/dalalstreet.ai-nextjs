//services/stockServices.ts
import api from '@/lib/api';  // basically to fetch the data for the table 
// it will have a default case and then based upon user input --> llm response will be used to fetch the data

// fuction with axios and parameters to fetch the data
export const getStockScreenResults = async (
  token: string, // randomly generated chat token to distinguish chat 
  query: string = 'market_capitalization > 10000',
  page: number = 1,
  limit: number = 999
) => {
  try {
    console.log('📤 Sending to API:', {
      query,
      page,
      limit,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await api.post(
      '/api/v1/stocks/screen',
      { query, page, limit },
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

