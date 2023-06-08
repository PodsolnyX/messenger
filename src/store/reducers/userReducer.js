import {userAPI} from "../../api/userAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";
import {toastError} from "../../helpers/toaster";

const SET_USER_DATA = "SET_USER_DATA",
    CLEAR_USER_DATA = "CLEAR_USER_DATA",
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_USERS = "SET_USERS",
    SET_LOADING_LOGIN = "SET_LOADING_LOGIN",
    SET_LOADING_REGISTER = "SET_LOADING_REGISTER"
;

let initialState = {
    userData: {},
    userRoles: [],
    users: [],
    isAuth: !!localStorage.getItem("token")
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
                isAuth: true
            };
        case CLEAR_USER_DATA:
            return {
                ...state,
                userRoles: {},
                userData: [],
                isAuth: false
            };
        case SET_USERS:
            action.data.forEach((el) => {
                Object.assign(el, {
                    ["value"]: el["id"],
                    ["label"]: el["fullName"],
                })
            });
            return {
                ...state,
                users: action.data
            };
        case SET_LOADING_LOGIN:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_LOADING_REGISTER:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}

export const setUserProfile = (userData) => ({type: SET_USER_DATA, userData});
export const setIsAuth = () => ({type: SET_IS_AUTH});
export const clearUserProfile = () => ({type: CLEAR_USER_DATA});
export const setUsers = (data) => ({type: SET_USERS, data});
export const setLoadingLogin = (isLoading) => ({type: SET_LOADING_LOGIN, isLoading});
export const setLoadingRegister = (isLoading) => ({type: SET_LOADING_REGISTER, isLoading});

export const getUserProfile = () => (dispatch) => {
    userAPI.getProfile()
        .then(response => {
            if (response.status === 200)
                dispatch(setUserProfile(response.data));
            else dispatch(clearUserProfile())
        })
}

export const loginUser = () => (dispatch, getState) => {
    // dispatch(setLoadingLogin(true));
    userAPI.loginUser(getState().user.loginFormData).then(response => {
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.token);
            // dispatch(setIsAuth());
            // dispatch(getUserProfile());
            // dispatch(setSuccessToast("Вы успешно авторизовались!"));
        }
        // else dispatch(setErrorToast("Неверный логин или пароль"));

        // dispatch(setLoadingLogin(false));
    });

}

export const registerUser = () => (dispatch, getState) => {
    // dispatch(setLoadingRegister(true))

    userAPI.registerUser(getState().user.registrationFormData).then(response => {
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.token);
            // dispatch(setSuccessToast("Вы успешно зарегистрировались!"));
            // dispatch(setIsAuth());
            // dispatch(getUserProfile());
        }
        // else if (response.status === 409)
            // dispatch(setErrorToast("Аккаунт с данным email-адресом уже существует"));
        // else dispatch(setErrorToast("Неверный формат данных"));

        // dispatch(setLoadingRegister(false))
    });

}

export const logoutUser = () => (dispatch) => {
    userAPI.logoutUser().then(response => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            dispatch(clearUserProfile());
        }
    })
}

export const getUsers = () => (dispatch) => {
    userAPI.getUsers().then(response => {
        if (response.status === 200)
            dispatch(setUsers(response.data));
    })
}

export default userReducer;