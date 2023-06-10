import {instance} from "./instance";

const registerUser = (userData) => {
    return instance.post("auth/register", {
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        birthDate: `${userData.birthDate}T10:12:10.412Z`
    })
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            return response;
        })
        .catch(error => error.response);
}

const loginUser = (userData) => {
    return instance.post("auth/login", {
        email: userData.email,
        password: userData.password
    })
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            return response;
        })
        .catch(error => error.response);
}

const refreshToken = () => {
    return instance.post("auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
        accessToken: localStorage.getItem("accessToken")
    })
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
            localStorage.setItem('accessToken', response.data.accessToken);
            return response;
        })
        .catch(error => error.response);
}

const getProfile = () => {
    return instance.get("account")
        .then(response => response)
        .catch(error => error.response);
}

const logoutUser = () => {
    return instance.post("auth/logout")
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer`;
            return response;
        })
        .catch(error => error.response);
}

export const userAPI = {
    registerUser,
    loginUser,
    refreshToken,
    getProfile,
    logoutUser
};

