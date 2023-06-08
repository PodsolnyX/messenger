import {instance} from "./instance";

const registerUser = (userData) => {
    console.log(userData);
    return instance.post("auth/register", {
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        birthDate: `${userData.birthDate}T10:12:10.412Z`
    })
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
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
            instance.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
            return response;
        })
        .catch(error => error.response);
}

const getProfile = () => {
    return instance.get("profile")
        .then(response => response)
        .catch(error => error.response);
}

const getRoles = () => {
    return instance.get("roles")
        .then(response => response)
        .catch(error => error.response);
}

const getUsers = () => {
    return instance.get("users")
        .then(response => response)
        .catch(error => error.response);
}

const logoutUser = () => {
    return instance.post("logout")
        .then(response => {
            instance.defaults.headers["Authorization"] = `Bearer`;
            return response;
        })
        .catch(error => error.response);
}

const editUserProfile = (userData) => {
    return instance.put("profile", {
        fullName: userData.fullName.trimEnd(),
        birthDate: userData.birthDate
    })
        .then(response => response)
        .catch(error => error.response);
}

export const userAPI = {
    registerUser,
    loginUser,
    getProfile,
    getRoles,
    logoutUser,
    editUserProfile,
    getUsers
};

