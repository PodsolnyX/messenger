import {instance} from "./instance";

const getFriends = () => {
    return instance.get(`/backend/friends`)
        .then(response =>  response)
        .catch(error => error.response);
}

export const friendAPI = {
    getFriends
};