import {instance} from "./instance";

const registerUser = (userData) => {
    return instance.post("auth/register", {
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        birthDate: `${userData.birthDate}T00:00:00.000Z`
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
            console.log("Токен обновлён")
            return response;
        })
        .catch(error => error.response);
}

const getProfile = () => {
    return instance.get("account")
        .then(response => response)
        .catch(error => error.response);
}

const getUsersList = (searchString) => {
    return instance.get(`account/users?fullname=${searchString}`)
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

const changePassword = (data) => {
    return instance.put("auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    })
        .then(response => response)
        .catch(error => error.response);
}

const editProfile = (data) => {
    return instance.put("account", {
        fullName: data.fullName,
        photoId: data.photoId,
        birthDate: data.birthDate
    })
        .then(response => response)
        .catch(error => error.response);
}

export const userAPI = {
    registerUser,
    loginUser,
    refreshToken,
    getProfile,
    getUsersList,
    logoutUser,
    changePassword,
    editProfile
};

