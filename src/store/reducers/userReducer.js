import {userAPI} from "../../api/userAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";
import {toastError} from "../../helpers/toaster";

const SET_USER_DATA = "SET_USER_DATA",
    CLEAR_USER_DATA = "CLEAR_USER_DATA",
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_LOADING_USER = "SET_LOADING_USER"
;

let initialState = {
    userData: null,
    isLoading: false,
    isAuth: !!localStorage.getItem("accessToken")
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            };
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.value
            };
        case CLEAR_USER_DATA:
            return {
                ...state,
                userData: null,
                isAuth: false
            };
        case SET_LOADING_USER:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}

export const setUserProfile = (userData) => ({type: SET_USER_DATA, userData});
export const setIsAuth = (value) => ({type: SET_IS_AUTH, value});
export const clearUserData = () => ({type: CLEAR_USER_DATA});
export const setLoadingUser = (isLoading) => ({type: SET_LOADING_USER, isLoading});

export const getUserProfile = () => (dispatch) => {
    userAPI.getProfile()
        .then(response => {
            console.log(response)
            if (response.status === 200)
                dispatch(setUserProfile(response.data));
            else dispatch(clearUserData())
        })
}

export const loginUser = (userData, callback) => (dispatch) => {
    dispatch(setLoadingUser(true));
    userAPI.loginUser(userData).then(response => {
        if (response.status === 200) {
            console.log(response)
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(setIsAuth(true));
            callback();
        }
        //else dispatch(setErrorToast("Неверный логин или пароль"));

        dispatch(setLoadingUser(false));
    });

}

export const registerUser = (userData, callback) => (dispatch) => {
    dispatch(setLoadingUser(true));
    userAPI.registerUser(userData).then(response => {
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(setIsAuth(true));
            callback();
        }
        // else if (response.status === 409)
        //     dispatch(setErrorToast("Аккаунт с данным email-адресом уже существует"));
        // else dispatch(setErrorToast("Неверный формат данных"));

        dispatch(setLoadingUser(false))
    });

}

export const logoutUser = (callback) => (dispatch) => {
    userAPI.logoutUser().then(response => {
        if (response.status === 200) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setIsAuth(false));
            dispatch(clearUserData());
            callback();
        }
    })
}



export default userReducer;