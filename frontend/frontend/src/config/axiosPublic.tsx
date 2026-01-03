import axios from "axios"


export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timeout....",
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})