import {chatAPI} from "../../api/chatAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";
import {setViewChatList} from "./generalReducer";
import {userAPI} from "../../api/userAPI";
import {messageAPI} from "../../api/messageAPI";

const SET_PREVIEW_CHATS = "SET_PREVIEW_CHATS",
    SET_MESSAGES = "SET_MESSAGES",
    SET_LOADING_CHAT = "SET_LOADING_CHAT",
    SET_LOADING_MESSAGES = "SET_LOADING_MESSAGES"
;

let initialState = {
    previewChats: [],
    messages: [],
    isLoading: false,
    isLoadingMessages: false
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
                messages: action.messages
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
        default:
            return state;
    }
}

export const setPreviewChats = (previewChats) => ({type: SET_PREVIEW_CHATS, previewChats});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});
export const setLoadingChat = (isLoading) => ({type: SET_LOADING_CHAT, isLoading});
export const setLoadingMessages = (isLoading) => ({type: SET_LOADING_MESSAGES, isLoading});

async function getChatsWithParsedPrivateChats (chat, userId) {
    if (chat.isPrivate) {
        const chatUserId = chat.users[0] !== userId ? chat.users[0] : chat.users[1];
        const response = await userAPI.getUserDetails(chatUserId);
        return {
            ...chat,
            chatAvatarId: response.data.photoId,
            chatName: response.data.fullName
        }
    } else return chat
}

export const getPreviewChats = () => async (dispatch, getState) => {
    dispatch(setLoadingChat(true));

    const response = await chatAPI.getPreviewChats();
    if (response.status === 200) {
        const userId = getState().user.userData?.id;
        if (userId) {
            const data = await Promise.all(response.data.userChats.items.map(async (chat) =>
                await getChatsWithParsedPrivateChats(chat, userId)
            ))
            dispatch(setPreviewChats(data))
            dispatch(setLoadingChat(false));
        }
    }
    else if (response.status === 404) {
        dispatch(setPreviewChats([]))
        dispatch(setLoadingChat(false));
    }
    else dispatch(setLoadingChat(false));
}

export const getChatMessages = (id, callback) => (dispatch) => {
    dispatch(setLoadingMessages(true));
    chatAPI.getMessages(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setMessages(response.data.items))
            else if (response.status === 404)
                dispatch(setMessages([]))
            else {
                callback();
                dispatch(setErrorToast("Чат не найден"))
            }
            dispatch(setLoadingMessages(false));
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

export const sendMessage = (chatId, textMessage) => (dispatch) => {
    messageAPI.sendMessage(chatId, textMessage)
        .then(response => {
            if (response.status === 200) {
                dispatch(getChatMessages(chatId));
            } else
                dispatch(setErrorToast("Беда"))
        })
}

export default chatReducer;