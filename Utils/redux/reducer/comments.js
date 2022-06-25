import {ActionType} from "../actions/types";

const initialState = {
    commentState: {}
}


export const Comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.DELETE_COMMENT:{
            return {...state, commentState: action.payload}
        }
        default:
            return state
    }
}