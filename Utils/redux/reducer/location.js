import {ActionType} from "../actions/types";

const initialState = {
    location: {}
}

export const Location = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ADD_LOCATION: {
            return {...state, location: action.payload}
        }
        default: {
            return state
        }
    }
}