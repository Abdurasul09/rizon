import {ActionType} from "../actions/types";

const defaultState = {
    cart: [],
    cartLoc: [],
    productPrice: []
}

export const CartReducer = (state = defaultState, action) => {
    switch (action.type){
        case ActionType.ADD_TO_CARD: {
                const findProduct = state.cart?.find(el => el.id === action.payload.id)
                if (findProduct) {
                    return {
                        ...state, cart: state.cart.map(el => el.id === action.payload.id ?
                            {...el, quantity: el.quantity + 1} : el)
                    }
                } else {
                    return {...state, cart: [...state.cart, {...action.payload, quantity: 1}]};

                }

        }
        case ActionType.DELETE_FROM_CARD: {
            return {...state, cart: state.cart.filter((el) => el.id !== action.payload)};
        }
        case ActionType.DEC_TO_QUANTITY: {
            const findProduct = state.cart?.find(el => el.id === action.payload)
            if (findProduct.quantity > 1)
                return {
                    ...state, cart: state.cart.map((el) => el.id === action.payload ?
                        {...el, quantity: el.quantity - 1} : el)
                }
        }
        // eslint-disable-next-line no-fallthrough
        case ActionType.GET_CART: {
            return {...state, cart: action.payload};
        }
        case ActionType.ADD_TO_CART_PRODUCT_PRICE: {
            return {...state, productPrice: action.payload}
        }
        default:
            return state
    }
}