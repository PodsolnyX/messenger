import {chatAPI} from "../../api/chatAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";

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

export const getPreviewChats = () => (dispatch) => {
    dispatch(setLoadingChat(true));
    chatAPI.getPreviewChats()
        .then(response => {
            if (response.status === 200)
                dispatch(setPreviewChats(response.data.userChats.items))
            else if (response.status === 404)
                dispatch(setPreviewChats([]))
            dispatch(setLoadingChat(false));
        })
}

export const getChatMessages = (id) => (dispatch) => {
    dispatch(setLoadingMessages(true));
    chatAPI.getMessages(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setMessages(response.data.items))
            else if (response.status === 404)
                dispatch(setMessages([]))
            dispatch(setLoadingMessages(false));
        })
}

export const createPrivateChat = (data) => (dispatch) => {
    dispatch(setLoadingChat(true));
    chatAPI.createPrivateChat(data)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Чат создан"))
            else
                dispatch(setErrorToast("Беда"))
            dispatch(setLoadingChat(false));
        })
}

export default chatReducer;