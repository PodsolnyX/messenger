import {useEffect, useState} from "react";
import {userAPI} from "../api/userAPI";
import {useAuth} from "./useAuth";

export function useRefreshToken() {

    const [interval, setRefreshInterval] = useState();
    const user = useAuth();

    useEffect(() => {
        if (user.isAuth) {
            userAPI.refreshToken().then((response) => {
                if (response.status === 200)
                    console.log("Токен обновлён")
            })
            setRefreshInterval(
                setInterval(() => {
                    userAPI.refreshToken().then((response) => {
                        if (response.status === 200)
                            console.log("Токен обновлён")
                    })
                }, 120000))
        }
        else {
            clearInterval(interval)
        }
    }, [user.isAuth])
}