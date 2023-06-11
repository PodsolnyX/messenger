import axios from "axios";
import {toast} from "react-toastify";
import {toastError} from "../helpers/toaster";

export const instance = axios.create({
    baseURL: "http://chat.markridge.space/api/",
    headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
});

instance.interceptors.response.use(response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.pathname = "/login";
        }
        else if (error.response?.status === 500) {
            toastError("Ошибка сервера")
        }
        return Promise.reject(error);
    });