import {chatAPI} from "../../api/chatAPI";
import {setErrorToast, setInformationToast} from "./toasterReducer";
import {setViewChatList} from "./generalReducer";
import {userAPI} from "../../api/userAPI";
import {messageAPI} from "../../api/messageAPI";
import {SIZE_MESSAGE_PAGE} from "../../helpers/constants";

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
    if (chat.isPrivate || chat.administrators.length === 0) {
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

export const getChatMessages = (chatId, withLoading = true, callback) => (dispatch, getState) => {
    dispatch(setLoadingMessages(true));

    chatAPI.getMessages(chatId, Math.floor(getState().chat.messages.length / SIZE_MESSAGE_PAGE + 1), SIZE_MESSAGE_PAGE)
        .then(response => {
            if (response.status === 200)
                dispatch(setMessages(response.data.items, response.data.pages_amount))
            else if (response.status !== 404) {
                callback();
                dispatch(setErrorToast("Чат не найден"))
            }
            dispatch(setLoadingMessages(false));
        })
}

export const getNewMessage = (chatId) => (dispatch, getState) => {
    if (getState().chat.chatId === chatId) {
        chatAPI.getMessages(getState().chat.chatId, 1, SIZE_MESSAGE_PAGE)
            .then(response => {
                if (response.status === 200)
                    dispatch(setNewMessage(response.data.items[0], response.data.pages_amount))
            })
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
            }
            else dispatch(setErrorToast("Беда"))
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

export const sendMessage = (chatId, textMessage, withLoadingMessages = true) => (dispatch) => {
    dispatch(setLoadingSendMessage(true));
    messageAPI.sendMessage(chatId, textMessage)
        .then(response => {
            if (response.status === 200) {
                dispatch(getNewMessage(chatId));
                dispatch(getPreviewChats(false))
            } else
                dispatch(setErrorToast("Беда"))
            dispatch(setLoadingSendMessage(false));
        })
}

export const viewMessage = (messageId) => (dispatch) => {
    messageAPI.viewMessage(messageId)
        .then(response => {
            if (response.status === 200)
                dispatch(getPreviewChats(false))
        })
}

export default chatReducer;