import {useEffect, useState} from "react";
import {userAPI} from "../api/userAPI";
import {useAuth} from "./useAuth";

export function useRefreshToken() {

    const [interval, setRefreshInterval] = useState();
    const user = useAuth();

    useEffect(() => {
        if (user.isAuth) {
            userAPI.refreshToken()
            setRefreshInterval(
                setInterval(() => {
                    userAPI.refreshToken()
                }, 120000))
        }
        else {
            clearInterval(interval)
        }
    }, [user.isAuth])
}