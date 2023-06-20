import {instance} from "./instance";
import {NULL_NAME, NULL_PHOTO} from "../helpers/constants";

const getPreviewChats = () => {
    return instance.get(`/backend/chats/preview`)
        .then(response =>  response)
        .catch(error => error.response);
}

const getMessages = (id, page, pageSize) => {
    return instance.get(`/backend/chat/${id}/messages?pageSize=${pageSize}&page=${page}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const getChatDetails = (id) => {
    return instance.get(`/backend/chat/${id}/details`)
        .then(response =>  response)
        .catch(error => error.response);
}

const editChatDetails = (id, data) => {
    console.log(data)
    return instance.put(`/backend/chat/${id}`, {
        avatarId: data.avatarId,
        chatName: data.chatName
    })
        .then(response =>  response)
        .catch(error => error.response);
}

const getNotificationPreference = (chatId) => {
    return instance.get(`/backend/chat/${chatId}/notification-preference`)
        .then(response =>  response)
        .catch(error => error.response);
}

const editNotificationPreference = (chatId, preferenceType) => {
    return instance.put(`/backend/chat/${chatId}/notification-preference?preferenceType=${preferenceType}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const createPrivateChat = (userId) => {
    return instance.post(`/backend/chat/private/create`,
        {
            userId: userId,
            avatarId: NULL_PHOTO,
            chatName: NULL_NAME
        })
        .then(response =>  response)
        .catch(error => error.response);
}

const createGroupChat = (data) => {
    return instance.post(`/backend/chat/group/create`,
        {
            users: data.users,
            avatarId: data.avatarId,
            chatName: data.chatName
        })
        .then(response =>  response)
        .catch(error => error.response);
}

const deleteChat = (id) => {
    return instance.delete(`/backend/chat/group/${id}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const leaveGroupChat = (id) => {
    return instance.delete(`/backend/chat/group/${id}/leave`)
        .then(response =>  response)
        .catch(error => error.response);
}

const leavePrivateChat = (id) => {
    return instance.delete(`/backend/chat/private/${id}/leave`)
        .then(response =>  response)
        .catch(error => error.response);
}

const addUserToChat = (chatId, userId) => {
    return instance.post(`/backend/chat/group/${chatId}/user/${userId}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const deleteUserFromChat = (chatId, userId) => {
    return instance.delete(`/backend/chat/group/${chatId}/user/${userId}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const makeUserAdmin = (chatId, userId) => {
    return instance.post(`/backend/chat/${chatId}/user/${userId}/admin`)
        .then(response =>  response)
        .catch(error => error.response);
}

export const chatAPI = {
    getPreviewChats,
    getMessages,
    getChatDetails,
    editChatDetails,
    getNotificationPreference,
    editNotificationPreference,
    createPrivateChat,
    createGroupChat,
    deleteChat,
    leaveGroupChat,
    leavePrivateChat,
    addUserToChat,
    deleteUserFromChat,
    makeUserAdmin
};