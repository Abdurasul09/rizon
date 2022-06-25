import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducer"
import {composeWithDevTools} from "redux-devtools-extension";

const middleware = [thunk]
const initialState = {}
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    ));
