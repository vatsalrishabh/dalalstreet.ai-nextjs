
// services/screenService.ts 
import api from '@/lib/api';


// @hit- /api/v1/screen/save        {Content-Type}
// method - POST 
// access - users
export const saveScreen = async (
    token: string,
    screenData: {
        title: string;
        description: string;
        screen_query: string;
    }
    ): Promise<string> => {
    try {
        const res = await api.post(
        '/api/v1/screen/save',
        screenData,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log('✅ Screen saved successfully:', res.data);
        return res.data || 'Screen saved successfully.';
    } catch (error: any) {
        console.error('❌ Error saving screen:', error?.response || error);
        throw error;
    }
    }


// @hit- /api/v1/screen/get-all        {Content-Type}
// method - GET 
// access - users
export const getAllScreens = async (token: string): Promise<any[]> => {
    try {
        const res = await api.get('/api/v1/screen/get-all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Screens fetched successfully:', res.data);
        return res.data || [];
    } catch (error: any) {
        console.error('❌ Error fetching screens:', error?.response || error);
        throw error;
    }
};



// @hit- /api/v1/screen/delete        {Content-Type}
// method - DELETE 
// access - users

export const deleteScreen = async (token: string, screen_query: string): Promise<string> => {
  try {
    const res = await api.delete('/api/v1/screen/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        screen_query, // put query inside data
      },
    });

    console.log('✅ Screen deleted successfully:', res.data);
    return res.data || 'Screen deleted successfully.';
  } catch (error: any) {
    console.error('❌ Error deleting screen:', error?.response || error);
    throw error;
  }
};

