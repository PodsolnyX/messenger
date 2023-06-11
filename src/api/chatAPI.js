import {instance} from "./instance";

const getPreviewChats = () => {
    return instance.get(`/backend/chats/preview`)
        .then(response =>  response)
        .catch(error => error.response);
}

export const chatAPI = {
    getPreviewChats
};