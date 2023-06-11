import {friendAPI} from "../../api/friendAPI";

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
                dispatch(setFriendsList(response.data))
            }
            else if (response.status === 404) {
                dispatch(setFriendsList([]))
            }
            setLoadingFriends(false);
        })
}

export default friendsReducer;