import {chatAPI} from "../../api/chatAPI";

const SET_PREVIEW_CHATS = "SET_PREVIEW_CHATS",
    SET_LOADING_CHAT = "SET_LOADING_CHAT";

let initialState = {
    previewChats: [],
    isLoading: false
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PREVIEW_CHATS:
            return {
                ...state,
                previewChats: action.previewChats
            }
        case SET_LOADING_CHAT:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

export const setLastUploadFileId = (previewChats) => ({type: SET_PREVIEW_CHATS, previewChats});
export const setLoadingUser = (isLoading) => ({type: SET_LOADING_CHAT, isLoading});

export const getPreviewChats = () => (dispatch) => {
    dispatch(setLoadingUser(true));
    chatAPI.getPreviewChats()
        .then(response => {
            if (response.status === 200) {
                dispatch(setLastUploadFileId(response.data))
            }
            else if (response.status === 404) {
                dispatch(setLastUploadFileId([]))
            }
            dispatch(setLoadingUser(false));
        })
}

export default chatReducer;