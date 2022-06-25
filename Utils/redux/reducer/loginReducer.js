import {ActionType} from "../actions/types";

const initialState = {
    userLogin: [],
    userInfo: [],
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.USER_LOGIN: {
            return {...state, userLogin: action.payload}
        }
        case ActionType.USER_INFO: {
            return {...state, userInfo: action.payload}
        }
        case ActionType.USER_LOGOUT: {
            return {...state, userLogin: null, cart: {cart: []}}
        }
        default:
            return state
    }
}