import axios from "axios";
import { useAuth } from "../context/AuthContext";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const isAuthRoute = config.url.includes("/auth/login") || config.url.includes("/auth/register");
    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;