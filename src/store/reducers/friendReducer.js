import {friendAPI} from "../../api/friendAPI";
import {setErrorToast, setInformationToast, setSuccessToast} from "./toasterReducer";
import {userAPI} from "../../api/userAPI";
import {setLoadingUser} from "./userReducer";

const
    SET_FRIENDS_LIST = "SET_FRIENDS_LIST",
    SET_IS_USER_REQUESTS = "SET_IS_USER_REQUESTS",
    SET_LOADING_FRIENDS = "SET_LOADING_FRIENDS";

let initialState = {
    friendsList: [],
    isUserRequests: "false",
    isLoading: false
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS_LIST:
            return {
                ...state,
                friendsList: action.friendsList
            }
        case SET_IS_USER_REQUESTS:
            return {
                ...state,
                isUserRequests: action.isUserRequests
            }
        case SET_LOADING_FRIENDS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

export const setFriendsList = (friendsList) => ({type: SET_FRIENDS_LIST, friendsList});
export const setLoadingFriends = (isLoading) => ({type: SET_LOADING_FRIENDS, isLoading});
export const setIsUserRequests = (isUserRequests) => ({type: SET_IS_USER_REQUESTS, isUserRequests});

const getAndSetFriendUsersFromListId = (dispatch, response) => {
    if (response.status === 200) {
        userAPI.getUsersListDetails(response.data.items)
            .then(response => {
                dispatch(setFriendsList(response.data))
                dispatch(setLoadingFriends(false));
            })
    }
    else if (response.status === 404) {
        dispatch(setFriendsList([]))
        dispatch(setLoadingFriends(false));
    }
    else {
        dispatch(setLoadingFriends(false));
    }
}

export const getFriendsList = () => (dispatch) => {
    dispatch(setLoadingFriends(true));
    dispatch(setFriendsList([]))
    friendAPI.getFriends()
        .then(response => getAndSetFriendUsersFromListId(dispatch, response))
}

export const getFriendshipRequests = (isUserRequests) => (dispatch) => {
    dispatch(setLoadingFriends(true));
    dispatch(setFriendsList([]))
    friendAPI.getFriendshipRequests(isUserRequests)
        .then(response => getAndSetFriendUsersFromListId(dispatch, response))
}

export const sendFriendshipRequest = (id) => (dispatch) => {
    dispatch(setLoadingUser(true));
    friendAPI.sendFriendshipRequest(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Приглашение отправлено"))
            else if (response.status === 409)
                dispatch(setInformationToast("Вы уже отправили приглашение этому пользователю"))
            else
                dispatch(setErrorToast("Беда"))
            dispatch(setLoadingUser(false));
        })
}

export const deleteFriend = (id) => (dispatch) => {
    dispatch(setLoadingFriends(true));
    friendAPI.deleteFriend(id)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Друг удалён"))
                dispatch(getFriendsList())
            }
            else
                dispatch(setErrorToast("Беда"))
        })
}

export const acceptFriendshipRequest = (id) => (dispatch) => {
    dispatch(setLoadingFriends(true));
    friendAPI.acceptFriendshipRequest(id)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Приглашение принято"));
                dispatch(getFriendshipRequests());
            }
            else
                dispatch(setErrorToast("Беда"))
        })
}

export const rejectFriendshipRequest = (id) => (dispatch) => {
    dispatch(setLoadingFriends(true));
    friendAPI.rejectFriendshipRequest(id)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSuccessToast("Приглашение отклонено"));
                dispatch(getFriendshipRequests());
            }
            else
                dispatch(setErrorToast("Беда"))
        })
}

export default friendsReducer;