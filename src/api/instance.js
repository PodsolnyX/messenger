import axios from "axios";

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
        return Promise.reject(error);
    });