import { BackendUser } from '@/types/auth';

// middleare to store the data into localstorage 
export const persistAuthToLocalStorage = (user: BackendUser, token: string) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ user, token })
  );
};


//middleware to remove data from localstorage
export const clearAuthFromLocalStorage = () => {
  localStorage.removeItem('userInfo');
};


export const getUserInfoFromLocalStorage = (): { user: BackendUser; token: string } | null => {
  try {
    const data = localStorage.getItem('userInfo');
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Optionally validate shape
    if (parsed.user && parsed.token) {
      return parsed;
    }

    return null;
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage:', error);
    return null;
  }
};
