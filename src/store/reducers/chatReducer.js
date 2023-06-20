import {chatAPI} from "../../api/chatAPI";
import {setErrorToast, setInformationToast, setSuccessToast} from "./toasterReducer";
import {setViewChatList, setViewMessagesArea} from "./generalReducer";
import {userAPI} from "../../api/userAPI";
import {messageAPI} from "../../api/messageAPI";
import {FILE_TYPE, FILE_TYPE_RATIO, NULL_PHOTO, SIZE_MESSAGE_PAGE} from "../../helpers/constants";
import {filesAPI} from "../../api/filesAPI";
import {convertFileToFormData} from "../../helpers/helpers";

const SET_PREVIEW_CHATS = "SET_PREVIEW_CHATS",
    SET_MESSAGES = "SET_MESSAGES",
    SET_NEW_MESSAGE = "SET_NEW_MESSAGE",
    SET_LOADING_CHAT = "SET_LOADING_CHAT",
    SET_LOADING_MESSAGES = "SET_LOADING_MESSAGES",
    SET_LOADING_SEND_MESSAGE = "SET_LOADING_SEND_MESSAGE",
    RESET_CHAT = "RESET_CHAT",
    SET_CHAT_DETAILS = "SET_CHAT_DETAILS",
    SET_NOTE_PREFERENCE = "SET_NOTE_PREFERENCE"
;

let initialState = {
    previewChats: [],
    messages: [],
    messagesPageCount: 1,
    chatId: "",
    chatDetails: {},
    notePreference: "All",
    isLoading: false,
    isLoadingMessages: false,
    isLoadingSendMessage: false
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PREVIEW_CHATS:
            return {
                ...state,
                previewChats: action.previewChats
            }
        case SET_MESSAGES:
            return {
                ...state,
                messagesPageCount: action.messagesPageCount,
                messages: [
                    ...state.messages.slice(0, Math.floor(state.messages.length / SIZE_MESSAGE_PAGE) * SIZE_MESSAGE_PAGE),
                    ...action.messages
                ]
            }
        case SET_NEW_MESSAGE:
            return {
                ...state,
                messagesPageCount: action.messagesPageCount,
                messages: [
                    action.message,
                    ...state.messages
                ]
            }
        case RESET_CHAT:
            return {
                ...state,
                chatId: action.chatId,
                chatDetails: {},
                messages: [],
                messagesPageCount: 1
            }
        case SET_CHAT_DETAILS:
            return {
                ...state,
                chatDetails: action.chatDetails
            }
        case SET_NOTE_PREFERENCE:
            return {
                ...state,
                notePreference: action.notePreference
            }
        case SET_LOADING_CHAT:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_LOADING_MESSAGES:
            return {
                ...state,
                isLoadingMessages: action.isLoading
            }
        case SET_LOADING_SEND_MESSAGE:
            return {
                ...state,
                isLoadingSendMessage: action.isLoading
            }
        default:
            return state;
    }
}

export const setPreviewChats = (previewChats) => ({type: SET_PREVIEW_CHATS, previewChats});
export const setMessages = (messages, messagesPageCount) => ({type: SET_MESSAGES, messages, messagesPageCount});
export const setNewMessage = (message, messagesPageCount) => ({type: SET_NEW_MESSAGE, message, messagesPageCount});
export const resetChat = (chatId) => ({type: RESET_CHAT, chatId});
export const setChatDetails = (chatDetails) => ({type: SET_CHAT_DETAILS, chatDetails});
export const setNotificationPreference = (notePreference) => ({type: SET_NOTE_PREFERENCE, notePreference});
export const setLoadingChat = (isLoading) => ({type: SET_LOADING_CHAT, isLoading});
export const setLoadingMessages = (isLoading) => ({type: SET_LOADING_MESSAGES, isLoading});
export const setLoadingSendMessage = (isLoading) => ({type: SET_LOADING_SEND_MESSAGE, isLoading});


export const setChatId = (chatId) => (dispatch) => {
    dispatch(setViewMessagesArea());
    dispatch(resetChat(chatId));
}

async function getChatWithParsedPrivateChats(chat, userId) {
    if (chat.isPrivate || chat.administrators?.length === 0) {
        const chatUserId = chat.users[0] !== userId ? chat.users[0] : chat.users[1];

        const response = await userAPI.getUserDetails(chatUserId);
        return {
            ...chat,
            chatAvatarId: response.data.photoId,
            chatName: response.data.fullName
        }
    } else return chat
}

export const getPreviewChats = (withLoading = true) => async (dispatch, getState) => {
    dispatch(setLoadingChat(withLoading));
    const response = await chatAPI.getPreviewChats();
    if (response.status === 200) {
        const userId = getState().user.userData?.id;
        if (userId) {
            const data = await Promise.all(response.data.userChats.items.map(async (chat) =>
                await getChatWithParsedPrivateChats(chat, userId)
            ))

            dispatch(setPreviewChats(data))
            dispatch(setLoadingChat(false));
        }
    } else if (response.status === 404) {
        dispatch(setPreviewChats([]))
        dispatch(setLoadingChat(false));
    } else dispatch(setLoadingChat(false));
}

async function getMessageWithFiles(message) {
    if (message.fileIds.length !== 0) {
        message.files = await Promise.all(message.fileIds.map(async id => {
            const response = await filesAPI.getFileInfo(id)
            if (response.status === 200) return response.data
            else return {}
        }));
    }
    return message;
}

export const getChatMessages = (chatId, withLoading = true, callback) => async (dispatch, getState) => {
    dispatch(setLoadingMessages(true));

    const response = await chatAPI.getMessages(chatId, Math.floor(getState().chat.messages.length / SIZE_MESSAGE_PAGE + 1), SIZE_MESSAGE_PAGE)

    if (response.status === 200) {
        const messages = await Promise.all(response.data.items.map(async (message) =>
            await getMessageWithFiles(message)
        ))
        dispatch(setMessages(messages, response.data.pages_amount))
    } else if (response.status !== 404) {
        callback();
        dispatch(setErrorToast("Чат не найден"))
    }
    dispatch(setLoadingMessages(false));

}

export const getNewMessage = (chatId, isMuted = false) => async (dispatch, getState) => {

    if (getState().chat.chatId === chatId) {
        const response = await chatAPI.getMessages(getState().chat.chatId, 1, SIZE_MESSAGE_PAGE)
        const message = await getMessageWithFiles(response.data.items[0]);
        if (response.status === 200)
            dispatch(setNewMessage(message, response.data.pages_amount))
    } else {
        if (!isMuted) dispatch(setInformationToast("Вам пришло сообщение"))
    }
}

export const getChatDetails = (chatId) => async (dispatch, getState) => {
    dispatch(setLoadingMessages(true))
    const response = await chatAPI.getChatDetails(chatId)
    if (response.status === 200) {
        const userId = getState().user.userData?.id;
        const chat = await getChatWithParsedPrivateChats(response.data, userId)
        const userResponse = await userAPI.getUsersListDetails(chat.users)
        chat.usersDetails = userResponse.data;

        dispatch(setChatDetails(chat))

    } else dispatch(setErrorToast("Беда"))

}

export const getNotificationPreference = (chatId) => (dispatch) => {
    chatAPI.getNotificationPreference(chatId)
        .then(response => {
            if (response.status === 200)
                dispatch(setNotificationPreference(response.data))
        })
}

export const editNotificationPreference = (chatId, preferenceType) => (dispatch) => {
    chatAPI.editNotificationPreference(chatId, preferenceType)
        .then(response => {
            if (response.status === 200) {
                dispatch(setNotificationPreference(preferenceType));
                dispatch(setSuccessToast("Успешно"))
            }
            else {
                dispatch(setErrorToast("Ошибка"))
            }
        })
}

export const createPrivateChat = (userId, callback) => (dispatch) => {
    dispatch(setLoadingChat(true));
    chatAPI.createPrivateChat(userId)
        .then(response => {
            if (response.status === 200) {
                callback(response.data);
                dispatch(setViewChatList())
            } else
                dispatch(setErrorToast("Беда"))
            dispatch(setLoadingChat(false));
        })
}

const uploadAvatar = async (avatarFile) => {
    if (avatarFile) {
        const formData = convertFileToFormData(avatarFile);
        const response = await filesAPI.uploadFile(formData, FILE_TYPE.IMAGE, true);
        if (response.status === 201)
            return response.data
        else return NULL_PHOTO
    } else return NULL_PHOTO
}

export const createGroupChat = (users, avatarFile, chatName) => async (dispatch) => {
    dispatch(setLoadingChat(true));

    const avatarId = await uploadAvatar(avatarFile);
    const response = await chatAPI.createGroupChat({
        users: users,
        avatarId: avatarId,
        chatName: chatName
    })

    if (response.status === 200) {
        dispatch(setViewChatList())
    } else
        dispatch(setErrorToast("Беда"))
    dispatch(setLoadingChat(false));
}

async function uploadFile(file, isPublic = false) {

    const fileType = FILE_TYPE_RATIO[file.type.split("/")[0]] || FILE_TYPE.UNKNOWN;
    const formData = convertFileToFormData(file);

    const response = await filesAPI.uploadFile(formData, fileType, isPublic)

    if (response.status === 201) return response.data
    else return ""
}

export const sendMessage = (chatId, textMessage, files) => async (dispatch, getState) => {
    dispatch(setLoadingSendMessage(true));

    const filesIdList = await Promise.all(files.map(async (file) =>
        await uploadFile(file)
    ))

    const clearFilesList = filesIdList.filter(id => id !== '');

    const response = await messageAPI.sendMessage(chatId, textMessage, clearFilesList)

    if (response.status === 200) {
        dispatch(getNewMessage(chatId));
        dispatch(getPreviewChats(false))
    } else
        dispatch(setErrorToast("Беда"))

    dispatch(setLoadingSendMessage(false));
}

export const viewMessage = (messageId) => (dispatch) => {
    messageAPI.viewMessage(messageId)
        .then(response => {
            if (response.status === 200)
                dispatch(getPreviewChats(false))
        })
}

export const deleteChat = (chatId) => (dispatch) => {
    chatAPI.deleteChat(chatId)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Чат успешно удалён"))
                dispatch(getChatDetails(chatId));
            }
            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export const leaveGroupChat = (chatId, callback) => (dispatch) => {
    chatAPI.leaveGroupChat(chatId)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Вы успешно вышли из чата"))
                callback();
                dispatch(getPreviewChats())
            }
            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export const leavePrivateChat = (chatId) => (dispatch) => {
    chatAPI.leavePrivateChat(chatId)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Вы успешно вышли из чата"))
            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export const deleteUserFromChat = (chatId, userId) => (dispatch) => {
    chatAPI.deleteUserFromChat(chatId, userId)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Пользователь исключен из чата"));
                dispatch(getChatDetails(chatId));
            }
            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export const addUserToChat = (chatId, userId) => (dispatch) => {
    chatAPI.addUserToChat(chatId, userId)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Пользователь приглашён в чат"))
                dispatch(getChatDetails(chatId));
            }
            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export const makeUserAdmin = (chatId, userId) => (dispatch) => {
    chatAPI.makeUserAdmin(chatId, userId)
        .then(response => {
            if (response.status === 200) {
                dispatch(getChatDetails(chatId));
                dispatch(setSuccessToast("Пользователь стал администратором"))
            }

            else
                dispatch(setErrorToast("Ошибка"))
        })
}

export default chatReducer;