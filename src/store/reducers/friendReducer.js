import {friendAPI} from "../../api/friendAPI";
import {setErrorToast, setInformationToast, setSuccessToast} from "./toasterReducer";
import {userAPI} from "../../api/userAPI";

const SET_FRIENDS_LIST = "SET_FRIENDS_LIST",
    SET_LOADING_FRIENDS = "SET_LOADING_FRIEND";

let initialState = {
    friendsList: [],
    isLoading: false
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS_LIST:
            return {
                ...state,
                friendsList: action.friendsList
            }
        case SET_LOADING_FRIENDS:
            return {
                ...state,
                isLoading: action.value
            }
        default:
            return state;
    }
}

export const setFriendsList = (friendsList) => ({type: SET_FRIENDS_LIST, friendsList});
export const setLoadingFriends = (isLoading) => ({type: SET_LOADING_FRIENDS, isLoading});

export const getFriendsList = () => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.getFriends()
        .then(response => {
            if (response.status === 200) {
                userAPI.getUsersListDetails(response.data.items)
                    .then(response => {
                        dispatch(setFriendsList(response.data))
                    })
            }
            else if (response.status === 404)
                dispatch(setFriendsList([]))
            setLoadingFriends(false);
        })
}

export const getFriendshipRequests = () => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.getFriendshipRequests()
        .then(response => {
            if (response.status === 200)
                dispatch(setFriendsList(response.data))
            else if (response.status === 404)
                dispatch(setFriendsList([]))
            setLoadingFriends(false);
        })
}

export const sendFriendshipRequest = (id) => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.sendFriendshipRequest(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Приглашение отправлено"))
            else if (response.status === 409)
                dispatch(setInformationToast("Вы уже отправили приглашение этому пользователю"))
            else
                dispatch(setErrorToast("Беда"))
            setLoadingFriends(false);
        })
}

export const deleteFriend = (id) => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.deleteFriend(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Друг удалён"))
            else
                dispatch(setErrorToast("Беда"))
            setLoadingFriends(false);
        })
}

export const acceptFriendshipRequest = (id) => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.acceptFriendshipRequest(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Приглашение принято"))
            else
                dispatch(setErrorToast("Беда"))
            setLoadingFriends(false);
        })
}

export const rejectFriendshipRequest = (id) => (dispatch) => {
    setLoadingFriends(true);
    friendAPI.rejectFriendshipRequest(id)
        .then(response => {
            if (response.status === 200)
                dispatch(setSuccessToast("Приглашение отклонено"))
            else
                dispatch(setErrorToast("Беда"))
            setLoadingFriends(false);
        })
}

export default friendsReducer;