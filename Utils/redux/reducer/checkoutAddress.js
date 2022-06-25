import {ActionType} from "../actions/types";

const initialState = {
    formAddress: {}
}

export const checkoutAddress = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CHECKOUT_ADDRESS:
            return{...state, formAddress: action.payload}
        default: 
            return state
    }
}