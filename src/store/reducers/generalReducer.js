import {VIEWS} from "../../helpers/constants";

const
    SET_VIEW_PROFILE = "SET_VIEW_PROFILE",
    SET_VIEW_CHAT_LIST = "SET_VIEW_CHAT_LIST",
    SET_VIEW_CHANGE_PASSWORD = "SET_VIEW_CHANGE_PASSWORD",
    SET_VIEW_EDIT_PROFILE = "SET_VIEW_EDIT_PROFILE",
    SET_VIEW_USERS_LIST = "SET_VIEW_USERS_LIST",
    SET_VIEW_FRIENDS_LIST = "SET_VIEW_FRIENDS_LIST",
    SET_VIEW_FRIENDSHIP_REQUESTS_LIST = "SET_VIEW_FRIENDSHIP_REQUESTS_LIST",
    SET_VIEW_EMPTY_MAIN_BAR = "SET_VIEW_EMPTY_MAIN_BAR",
    SET_VIEW_MESSAGES_AREA = "SET_VIEW_MESSAGES_AREA"
;

let initialState = {
    currentSideBarView: VIEWS.CHATS_LIST,
    currentMessagesArea: VIEWS.EMPTY_MAIN_BAR
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_EMPTY_MAIN_BAR:
            return {
                ...state,
                currentMessagesArea: VIEWS.EMPTY_MAIN_BAR
            };
        case SET_VIEW_MESSAGES_AREA:
            return {
                ...state,
                currentMessagesArea: VIEWS.MESSAGES_AREA
            };
        case SET_VIEW_PROFILE:
            return {
                ...state,
                currentSideBarView: VIEWS.PROFILE
            };
        case SET_VIEW_CHAT_LIST:
            return {
                ...state,
                currentSideBarView: VIEWS.CHATS_LIST
            };
        case SET_VIEW_CHANGE_PASSWORD:
            return {
                ...state,
                currentSideBarView: VIEWS.CHANGE_PASSWORD
            };
        case SET_VIEW_EDIT_PROFILE:
            return {
                ...state,
                currentSideBarView: VIEWS.EDIT_PROFILE
            };
        case SET_VIEW_USERS_LIST:
            return {
                ...state,
                currentSideBarView: VIEWS.USERS_LIST
            };
        case SET_VIEW_FRIENDS_LIST:
            return {
                ...state,
                currentSideBarView: VIEWS.FRIENDS_LIST
            };
        case SET_VIEW_FRIENDSHIP_REQUESTS_LIST:
            return {
                ...state,
                currentSideBarView: VIEWS.FRIENDSHIP_REQUESTS_LIST
            };
        default:
            return state;
    }
}

export const setViewProfile = () => ({type: SET_VIEW_PROFILE});
export const setViewEmptyMainBar = () => ({type: SET_VIEW_EMPTY_MAIN_BAR});
export const setViewMessagesArea = () => ({type: SET_VIEW_MESSAGES_AREA});
export const setViewChatList = () => ({type: SET_VIEW_CHAT_LIST});
export const setViewUsersList = () => ({type: SET_VIEW_USERS_LIST});
export const setViewFriendsList = () => ({type: SET_VIEW_FRIENDS_LIST});
export const setViewChangePassword = () => ({type: SET_VIEW_CHANGE_PASSWORD});
export const setViewEditProfile = () => ({type: SET_VIEW_EDIT_PROFILE});
export const setViewFriendshipRequests = () => ({type: SET_VIEW_FRIENDSHIP_REQUESTS_LIST});

export default generalReducer;