import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import ThunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";
import toasterReducer from "./reducers/toasterReducer";
import generalReducer from "./reducers/generalReducer";
import filesReducer from "./reducers/filesReducer";
import chatReducer from "./reducers/chatReducer";
import friendsReducer from "./reducers/friendReducer";

let reducers = combineReducers({
    user: userReducer,
    toaster: toasterReducer,
    general: generalReducer,
    files: filesReducer,
    chat: chatReducer,
    friends: friendsReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;