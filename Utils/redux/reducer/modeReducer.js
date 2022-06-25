import {ActionType} from "../actions/types";

const initialState = {
    darkMode: false,
}
export const ModeReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.DARK_MODE_ON:
            return {...state, darkMode: true};
        case ActionType.DARK_MODE_OF:
            return {...state, darkMode: false};
        default:
            return state
    }
}