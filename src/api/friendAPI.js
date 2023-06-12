import {instance} from "./instance";

const getFriends = () => {
    return instance.get(`/backend/friends`)
        .then(response =>  response)
        .catch(error => error.response);
}

const getFriendshipRequests = () => {
    return instance.get(`/backend/friendship/requests?myRequests=${false}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const sendFriendshipRequest = (id) => {
    return instance.post(`/backend/friend/${id}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const deleteFriend = (id) => {
    return instance.delete(`/backend/friend/${id}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const acceptFriendshipRequest = (id) => {
    return instance.post(`/backend/friendship/request/${id}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const rejectFriendshipRequest = (id) => {
    return instance.delete(`/backend/friendship/request/${id}`)
        .then(response =>  response)
        .catch(error => error.response);
}

export const friendAPI = {
    getFriends,
    getFriendshipRequests,
    sendFriendshipRequest,
    deleteFriend,
    acceptFriendshipRequest,
    rejectFriendshipRequest
};