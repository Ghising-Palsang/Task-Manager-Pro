import axios, { AxiosError, type AxiosResponse } from "axios";
import authSvc from "../service/auth.service";

let accessToken: string | null = null;
// console.log(accessToken, "accessToken")

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getToken = () => {
  return accessToken;
};

export const refreshAccessToken = async () => {
 try {
     const response = await authSvc.refreshAccessToken();
     const newToken = response.data.data.newAcessToken;
    //  console.log(newToken, "newtoken")

      setAccessToken(newToken);
      return newToken;
     
 } catch (error) {
    setAccessToken(null)
    throw error
 }
};

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server Timeout ...",
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use((config) => {
    const token = getToken();
    // console.log(token, "token")
  if (token) {
    config.headers.Authorization = "Bearer "+token;
  }
  return config;
});

export interface ApiSuccess {
  // eslint-disable-next-line
  data: any;
  message: string;
  status: string;
  // eslint-disable-next-line
  options: any;
}

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  async (error:AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest: any = error.config;

    // request only on 401k only once
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true

        try{
          const newToken =   await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosConfig(originalRequest)
        }catch{
            setAccessToken(null)
            return Promise.reject(error);
        }
    }
      return Promise.reject(error);
  }

  
);

export default axiosConfig;
