import {instance} from "./instance";

const sendMessage = (chatId, textMessage) => {
    return instance.post(`/backend/message/chat/${chatId}`,
        {
            textMessage: textMessage,
            fileIds: []
        })
        .then(response =>  response)
        .catch(error => error.response);
}

const editMessage = (chatId, textMessage) => {
    return instance.put(`/backend/message/chat/${chatId}`,
        {
            textMessage: textMessage,
            fileIds: []
        })
        .then(response =>  response)
        .catch(error => error.response);
}

const deleteMessage = (chatId) => {
    return instance.put(`/backend/message/chat/${chatId}`)
        .then(response =>  response)
        .catch(error => error.response);
}

const viewMessage = (messages) => {
    return instance.post(`/backend/message/messages/view`, messages)
        .then(response =>  response)
        .catch(error => error.response);
}


export const messageAPI = {
    sendMessage,
    editMessage,
    deleteMessage,
    viewMessage
};