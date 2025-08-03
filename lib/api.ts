// /src/lib/api.ts
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_Base_URL,
    withCredentials: true,
    timeout: 10000, // 10 second timeout
}); 

// Request interceptor for adding auth headers
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - clear localStorage and redirect
            if (typeof window !== 'undefined') {
                localStorage.clear();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default api;