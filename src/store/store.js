import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import ThunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";
import toasterReducer from "./reducers/toasterReducer";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    user: userReducer,
    toaster: toasterReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;