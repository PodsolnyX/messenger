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
    SET_VIEW_MESSAGES_AREA = "SET_VIEW_MESSAGES_AREA",
    SET_IS_MOBILE = "SET_IS_MOBILE",
    SET_MOBILE_REF = "SET_MOBILE_REF",
    SET_VIEW_CREATE_GROUP_CHAT = "SET_VIEW_CREATE_GROUP_CHAT",
    SET_VIEW_CHAT_SETTINGS = "SET_VIEW_CHAT_SETTINGS"
;

let initialState = {
    currentSideBarView: VIEWS.CHATS_LIST,
    messageAreaView: VIEWS.MESSAGES_AREA,
    isMobile: false,
    mobileRef: null
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_MOBILE:
            return {
                ...state,
                isMobile: action.isMobile
            }
        case SET_MOBILE_REF:
            return {
                ...state,
                mobileRef: action.mobileRef
            }
        case SET_VIEW_EMPTY_MAIN_BAR:
            return {
                ...state,
                messageAreaView: VIEWS.EMPTY_MAIN_BAR
            };
        case SET_VIEW_MESSAGES_AREA:
            return {
                ...state,
                messageAreaView: VIEWS.MESSAGES_AREA
            };
        case SET_VIEW_CHAT_SETTINGS:
            return {
                ...state,
                messageAreaView: VIEWS.CHAT_SETTINGS
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
        case SET_VIEW_CREATE_GROUP_CHAT:
            return {
                ...state,
                currentSideBarView: VIEWS.CREATE_GROUP_CHAT
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

export const setIsMobile = (isMobile) => ({type: SET_IS_MOBILE, isMobile})
export const setMobileRef = (mobileRef) => ({type: SET_MOBILE_REF, mobileRef})
export const setViewProfile = () => ({type: SET_VIEW_PROFILE});
export const setViewEmptyMainBar = () => ({type: SET_VIEW_EMPTY_MAIN_BAR});
export const setViewMessagesArea = () => ({type: SET_VIEW_MESSAGES_AREA});
export const setViewChatSettings = () => ({type: SET_VIEW_CHAT_SETTINGS});
export const setViewChatList = () => ({type: SET_VIEW_CHAT_LIST});
export const setViewUsersList = () => ({type: SET_VIEW_USERS_LIST});
export const setViewCreateGroupChat = () => ({type: SET_VIEW_CREATE_GROUP_CHAT});
export const setViewFriendsList = () => ({type: SET_VIEW_FRIENDS_LIST});
export const setViewChangePassword = () => ({type: SET_VIEW_CHANGE_PASSWORD});
export const setViewEditProfile = () => ({type: SET_VIEW_EDIT_PROFILE});
export const setViewFriendshipRequests = () => ({type: SET_VIEW_FRIENDSHIP_REQUESTS_LIST});

export default generalReducer;