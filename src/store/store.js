import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import ThunkMiddleware from "redux-thunk";
import {rootReducer} from "./reducers";

let store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export default store;