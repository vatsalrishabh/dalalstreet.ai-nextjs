//services/stockServices.ts
import api from '@/lib/api';

export const getStockScreenResults = async (
  token: string,
  query: string = 'market_capitalization > 10000',
  page: number = 1,
  limit: number = 50
) => {
  try {
    const res = await api.post(
      '/api/v1/stocks/screen',
      {
        query,
        page,
        limit,
      },
      {
        headers: {
    
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('✅ Stocks fetched:', res.data);
    return res.data;
  } catch (err: any) {
    console.error('❌ Error fetching stocks:', err?.response || err);
    throw err;
  }
};
