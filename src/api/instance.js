import axios from "axios";
import {userAPI} from "./userAPI";

export const instance = axios.create({
    baseURL: "http://chat.markridge.space/api/",
    headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
});

instance.interceptors.response.use(response => response,
    error => {
        if (error.response?.status === 401) {
            userAPI.refreshToken().then((response) => {
                if (response.status === 200)
                    console.log("Токен успешно обновлён")
                else {
                    alert("Ошибка!")
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    //window.location.pathname = "/login";
                }
            })
        }
        return Promise.reject(error);
    });