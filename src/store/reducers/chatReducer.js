import {chatAPI} from "../../api/chatAPI";
import {setErrorToast, setInformationToast} from "./toasterReducer";
import {setViewChatList} from "./generalReducer";
import {userAPI} from "../../api/userAPI";
import {messageAPI} from "../../api/messageAPI";
import {FILE_TYPE, FILE_TYPE_RATIO, SIZE_MESSAGE_PAGE} from "../../helpers/constants";
import {filesAPI} from "../../api/filesAPI";
import {convertFileToFormData} from "../../helpers/helpers";

const SET_PREVIEW_CHATS = "SET_PREVIEW_CHATS",
    SET_MESSAGES = "SET_MESSAGES",
    SET_NEW_MESSAGE = "SET_NEW_MESSAGE",
    SET_LOADING_CHAT = "SET_LOADING_CHAT",
    SET_LOADING_MESSAGES = "SET_LOADING_MESSAGES",
    SET_LOADING_SEND_MESSAGE = "SET_LOADING_SEND_MESSAGE",
    SET_CHAT_ID = "SET_CHAT_ID",
    SET_CHAT_DETAILS = "SET_CHAT_DETAILS"
;

let initialState = {
    previewChats: [],
    messages: [],
    messagesPageCount: 1,
    chatId: "",
    chatDetails: {},
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
        case SET_CHAT_ID:
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
export const setChatId = (chatId) => ({type: SET_CHAT_ID, chatId});
export const setChatDetails = (chatDetails) => ({type: SET_CHAT_DETAILS, chatDetails});
export const setLoadingChat = (isLoading) => ({type: SET_LOADING_CHAT, isLoading});
export const setLoadingMessages = (isLoading) => ({type: SET_LOADING_MESSAGES, isLoading});
export const setLoadingSendMessage = (isLoading) => ({type: SET_LOADING_SEND_MESSAGE, isLoading});

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
    console.log(response)
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
            console.log(response)
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
    }

    else if (response.status !== 404) {
        callback();
        dispatch(setErrorToast("Чат не найден"))
    }
    dispatch(setLoadingMessages(false));

}

export const getNewMessage = (chatId) => async (dispatch, getState) => {
    if (getState().chat.chatId === chatId) {
        const response = await chatAPI.getMessages(getState().chat.chatId, 1, SIZE_MESSAGE_PAGE)
        const message = await getMessageWithFiles(response.data.items[0]);
        if (response.status === 200)
            dispatch(setNewMessage(message, response.data.pages_amount))
    } else if (getState().chat.chatId || chatId) {
        dispatch(setInformationToast("Вам пришло сообщение"))
    }
}

export const getChatDetails = (chatId) => (dispatch, getState) => {
    dispatch(setLoadingMessages(true))
    chatAPI.getChatDetails(chatId)
        .then(response => {
            if (response.status === 200) {
                const userId = getState().user.userData?.id;
                getChatWithParsedPrivateChats(response.data, userId)
                    .then(chat => dispatch(setChatDetails(chat)));
            } else dispatch(setErrorToast("Беда"))
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

export default chatReducer;