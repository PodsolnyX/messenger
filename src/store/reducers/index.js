import userReducer from "./userReducer";
import toasterReducer from "./toasterReducer";
import generalReducer from "./generalReducer";
import filesReducer from "./filesReducer";
import chatReducer from "./chatReducer";
import friendsReducer from "./friendReducer";
import {combineReducers} from "redux";
import {userAPI} from "../../api/userAPI";

const RESET_STORE = "RESET_STORE";

const appReducer = combineReducers({
    user: userReducer,
    toaster: toasterReducer,
    general: generalReducer,
    files: filesReducer,
    chat: chatReducer,
    friends: friendsReducer
});

export const rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }
    return appReducer(state, action)
}

export const logoutUser = (callback) => (dispatch) => {
    userAPI.logoutUser().then(response => {
        if (response.status === 200) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            callback();
            dispatch(resetStore())
        }
    })
}

const resetStore = () => ({type: RESET_STORE});
