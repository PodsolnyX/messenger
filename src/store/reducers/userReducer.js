import {userAPI} from "../../api/userAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";
import {FILE_TYPE} from "../../helpers/constants";
import {filesAPI} from "../../api/filesAPI";
import {convertFileToFormData} from "../../helpers/helpers";

const SET_USER_DATA = "SET_USER_DATA",
    CLEAR_USER_DATA = "CLEAR_USER_DATA",
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_LOADING_USER = "SET_LOADING_USER",
    SET_USERS_LIST = "SET_USERS_LIST",
    SET_USER_SEARCH_STRING = "SET_USER_SEARCH_STRING"
;

let initialState = {
    userData: null,
    isLoading: false,
    usersList: {},
    searchString: "",
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
        case SET_USERS_LIST:
            return {
                ...state,
                usersList: action.usersList
            };
        case SET_USER_SEARCH_STRING:
            return {
                ...state,
                searchString: action.searchString
            };
        default:
            return state;
    }
}

export const setUserProfile = (userData) => ({type: SET_USER_DATA, userData});
export const setIsAuth = (value) => ({type: SET_IS_AUTH, value});
export const clearUserData = () => ({type: CLEAR_USER_DATA});
export const setLoadingUser = (isLoading) => ({type: SET_LOADING_USER, isLoading});
export const setUsersList = (usersList) => ({type: SET_USERS_LIST, usersList});
export const setUserSearchString = (searchString) => ({type: SET_USER_SEARCH_STRING, searchString});

export const getUserProfile = () => (dispatch) => {
    userAPI.getProfile()
        .then(response => {
            console.log(response.data)
            if (response.status === 200)
                dispatch(setUserProfile(response.data));
            else dispatch(clearUserData())
        })
}

export const getUserList = (searchString) => (dispatch) => {
    userAPI.getUsersList(searchString)
        .then(response => {
            console.log(response.data)
            if (response.status === 200)
                dispatch(setUsersList(response.data))
            else if (response.status === 404)
                dispatch(setUsersList({}))
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
        } else dispatch(setErrorToast("Неверный логин или пароль"));

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
        } else if (response.status === 409)
            dispatch(setErrorToast("Аккаунт с данным email-адресом уже существует"));
        else dispatch(setErrorToast("Неверный формат данных"));

        dispatch(setLoadingUser(false))
    });

}

export const changePassword = (data) => (dispatch) => {
    dispatch(setLoadingUser(true));
    userAPI.changePassword(data).then(response => {
        if (response.status === 200)
            dispatch(setSuccessToast("Пароль успешно изменён"));
        else
            dispatch(setErrorToast(response.data.Message))

        dispatch(setLoadingUser(false))
    })
}

export const editInfoProfile = (data) => (dispatch, getState) => {
    dispatch(setLoadingUser(true));

    data = {
        fullName: data.fullName,
        photoId: getState().user.userData.photoId,
        birthDate: `${data.birthDate}T00:00:00.000Z`
    }

    editProfile(dispatch, data);
}

export const editAvatarProfile = (avatarFile) => (dispatch, getState) => {
    dispatch(setLoadingUser(true));

    const formData = convertFileToFormData(avatarFile);
    filesAPI.uploadFile(formData, FILE_TYPE.IMAGE, true)
        .then(response => {
            const data = {
                fullName: getState().user.userData.fullName,
                photoId: response.data,
                birthDate: getState().user.userData.birthDate
            };
            editProfile(dispatch, data);
        })
}

const editProfile = (dispatch, data) => {
    userAPI.editProfile(data).then(response => {
        if (response.status === 200) {
            dispatch(getUserProfile());
            dispatch(setSuccessToast("Профиль успешно изменён"));
        } else if (response.status === 400)
            dispatch(setErrorToast("Неверный формат данных"))

        dispatch(setLoadingUser(false))
    })
}

export default userReducer;