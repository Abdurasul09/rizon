import {ActionType} from "../actions/types";

const initialState = {
    orderProduct: 'courier'
}
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ORDER_TRUE: {
            return {...state, orderProduct: action.payload}
        }
        default:
            return state
    }
}