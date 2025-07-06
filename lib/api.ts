// /src/lib/api.ts
import axios from "axios";

const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_Base_URL,
    withCredentials:true
}); // this is an axios instance to create multiple api calls

api.interceptors.response.use(
    (res)=>res,
    (error)=>{
        // can handle token expiry and / redirects
        return Promise.reject(error);
    }
);

export default api;