import {ActionType} from "../actions/types";

const initialState = {
    user: {
        email: "",
        phone:""
    },
}


export const ChangeUserReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.CHANGE_USER:
            return {
                ...state,
                user: {
                    email: action.payload.email,
                    phone: action.payload.phone
                }
            }
        case ActionType.SAVE_USERS:
            return {...state, users: action.payload}
        case ActionType.EMAIL_HANDLER:
            return {
                ...state,
                singleUser: action.payload
            }
        default:
            return state
    }
}