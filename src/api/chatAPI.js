import {instance} from "./instance";
import {NULL_NAME, NULL_PHOTO} from "../helpers/constants";

const getPreviewChats = () => {
    return instance.get(`/backend/chats/preview`)
        .then(response =>  response)
        .catch(error => error.response);
}

const getMessages = (id) => {
    return instance.get(`/backend/chat/${id}/messages?pageSize=50`)
        .then(response =>  response)
        .catch(error => error.response);
}

const getChatDetails = (id) => {
    return instance.get(`/backend/chat/${id}/details`)
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

const leavePrivateChat = (id) => {
    return instance.delete(`/backend/chat/private/${id}/leave`)
        .then(response =>  response)
        .catch(error => error.response);
}

export const chatAPI = {
    getPreviewChats,
    getMessages,
    getChatDetails,
    createPrivateChat,
    createGroupChat,
    deleteChat,
    leavePrivateChat
};