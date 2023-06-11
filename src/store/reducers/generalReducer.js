import {VIEWS} from "../../helpers/constants";

const
    SET_VIEW_PROFILE = "SET_VIEW_PROFILE",
    SET_VIEW_CHAT_LIST = "SET_VIEW_CHAT_LIST",
    SET_VIEW_CHANGE_PASSWORD = "SET_VIEW_CHANGE_PASSWORD",
    SET_VIEW_EDIT_PROFILE = "SET_VIEW_EDIT_PROFILE",
    SET_VIEW_USERS_LIST = "SET_VIEW_USERS_LIST"
;

let initialState = {
    currentView: VIEWS.CHATS_LIST
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_PROFILE:
            return {
                ...state,
                currentView: VIEWS.PROFILE
            };
        case SET_VIEW_CHAT_LIST:
            return {
                ...state,
                currentView: VIEWS.CHATS_LIST
            };
        case SET_VIEW_CHANGE_PASSWORD:
            return {
                ...state,
                currentView: VIEWS.CHANGE_PASSWORD
            };
        case SET_VIEW_EDIT_PROFILE:
            return {
                ...state,
                currentView: VIEWS.EDIT_PROFILE
            };
        case SET_VIEW_USERS_LIST:
            return {
                ...state,
                currentView: VIEWS.USERS_LIST
            };
        default:
            return state;
    }
}

export const setViewProfile = () => ({type: SET_VIEW_PROFILE});
export const setViewChatList = () => ({type: SET_VIEW_CHAT_LIST});
export const setViewUsersList = () => ({type: SET_VIEW_USERS_LIST});
export const setViewChangePassword = () => ({type: SET_VIEW_CHANGE_PASSWORD});
export const setViewEditProfile = () => ({type: SET_VIEW_EDIT_PROFILE});

export default generalReducer;