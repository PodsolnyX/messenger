import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUserOnlinePreference, getUserProfile} from "../store/reducers/userReducer";
import {useAuth} from "./useAuth";

export function useUserInformation () {
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        if (user.isAuth) {
            dispatch(getUserProfile());
            dispatch(getUserOnlinePreference())
        }
    }, [user.isAuth])
}